import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { useLocation } from '@reach/router'
import { useLayoutData } from 'components/Layout/hooks'
import initialMenu from '../../../navs'
import { useWindow } from '../../../context/Window'
import useDataPipelinesNav from '../../../navs/useDataPipelinesNav'

interface MenuItem {
    name: string
    url?: string
    icon?: React.ReactNode
    color?: string
    children?: MenuItem[]
}

type Menu = MenuItem[]

interface ReaderViewContextType {
    isNavVisible: boolean
    isTocVisible: boolean
    fullWidthContent: boolean
    setFullWidthContent: (value: boolean) => void
    parent: MenuItem
    internalMenu: MenuItem[]
    activeInternalMenu: MenuItem | undefined
    lineHeightMultiplier: number
    backgroundImage: string | null
    toggleNav: () => void
    toggleToc: () => void
    handleLineHeightChange: (value: number) => void
    setActiveInternalMenu: (menu: MenuItem) => void
    setBackgroundImage: (image: string | null) => void
}

const recursiveSearch = (array: MenuItem[] | undefined, value: string): boolean => {
    if (!array) return false

    for (let i = 0; i < array.length; i++) {
        const element = array[i]

        if (element.url?.split('?')[0] === value) {
            return true
        }

        if (element.children) {
            const found = recursiveSearch(element.children, value)
            if (found) {
                return true
            }
        }
    }

    return false
}

const getComputedLineHeight = (selector: string) => {
    const articleContent = document.querySelector('.article-content')
    const elements = articleContent?.querySelectorAll(selector)

    if (!elements?.length) return 1

    const computedStyle = window.getComputedStyle(elements[0])
    const lineHeight = computedStyle.lineHeight

    if (lineHeight === 'normal') return 1.2
    if (lineHeight.endsWith('px')) {
        return parseFloat(lineHeight) / parseFloat(computedStyle.fontSize)
    }
    if (lineHeight.endsWith('%')) {
        return parseFloat(lineHeight) / 100
    }
    return parseFloat(lineHeight)
}

const ReaderViewContext = createContext<ReaderViewContextType | undefined>(undefined)

const isLabel = (item: any) => !item?.url && item?.name

export function ReaderViewProvider({ children }: { children: React.ReactNode }) {
    const { setMenu, appWindow } = useWindow()
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isTocVisible, setIsTocVisible] = useState(false)
    const [tocUserToggled, setTocUserToggled] = useState(false)
    const [fullWidthContent, setFullWidthContent] = useState(false)
    const { pathname } = useLocation()
    const [lineHeightMultiplier, setLineHeightMultiplier] = useState<number>(1)
    const [lineHeightP, setLineHeightP] = useState<number | null>(null)
    const [lineHeightLi, setLineHeightLi] = useState<number | null>(null)
    const [backgroundImage, setBackgroundImage] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            const savedBackground = localStorage.getItem('background-image')
            return savedBackground
        }
        return null
    })

    const destinationNav = useDataPipelinesNav({ type: 'destination' })
    const transformationNav = useDataPipelinesNav({ type: 'transformation' })

    const dynamicMenus = useMemo(
        () => ({
            'data-pipeline-destinations': destinationNav,
            'data-pipeline-transformations': transformationNav,
        }),
        [destinationNav, transformationNav]
    )

    const injectDynamicChildren = useCallback((menu: Menu) => {
        return menu?.map((item) => {
            const processedItem = { ...item }

            if (item.dynamicChildren && dynamicMenus[item.dynamicChildren]) {
                const newChildren = [...(item.children || []), ...dynamicMenus[item.dynamicChildren]].reduce(
                    (acc, child) => {
                        if (isLabel(child)) {
                            acc.push([child])
                        } else {
                            const lastGroup = acc[acc.length - 1]
                            if (!lastGroup || isLabel(lastGroup[lastGroup.length - 1])) {
                                acc.push([child])
                            } else {
                                lastGroup.push(child)
                            }
                        }
                        return acc
                    },
                    []
                )

                newChildren.forEach((group) => {
                    group.sort((a, b) => {
                        if (!a.url || !b.url) return 0
                        return a.name.localeCompare(b.name)
                    })
                })

                processedItem.children = newChildren.flat()
            }

            if (processedItem.children && processedItem.children.length > 0) {
                processedItem.children = injectDynamicChildren(processedItem.children)
            }

            return processedItem
        })
    }, [])

    const menu = injectDynamicChildren(initialMenu)

    const toggleNav = useCallback(() => {
        setIsNavVisible((prev) => !prev)
    }, [])

    const toggleToc = useCallback(() => {
        setTocUserToggled(true)
        setIsTocVisible((prev) => !prev)
    }, [])

    const handleLineHeightChange = (value: number) => {
        setLineHeightMultiplier(value)
    }

    useEffect(() => {
        if (!lineHeightP || !lineHeightLi) return
        const styleId = 'reader-line-height-style'
        let style = document.getElementById(styleId) as HTMLStyleElement

        if (!style) {
            style = document.createElement('style')
            style.id = styleId
            document.head.appendChild(style)
        }

        style.textContent = `
            .article-content p { line-height: ${lineHeightP * lineHeightMultiplier} !important; }
            .article-content li { line-height: ${lineHeightLi * lineHeightMultiplier} !important; }
        `
        localStorage.setItem('lineHeightMultiplier', lineHeightMultiplier.toString())

        return () => {
            style.remove()
        }
    }, [lineHeightMultiplier, lineHeightLi, lineHeightP])

    useEffect(() => {
        const baseLineHeightP = getComputedLineHeight('p')
        const baseLineHeightLi = getComputedLineHeight('li')
        setLineHeightP(baseLineHeightP)
        setLineHeightLi(baseLineHeightLi)
        const storedLineHeightMultiplier = localStorage.getItem('lineHeightMultiplier')
        if (storedLineHeightMultiplier) {
            handleLineHeightChange(parseFloat(storedLineHeightMultiplier))
        }
    }, [])

    const parent = (menu as Menu).find(({ children, url }) => {
        const currentURL = pathname
        return currentURL === url?.split('?')[0] || recursiveSearch(children, currentURL)
    }) || { name: 'Default', children: [] }

    const internalMenu = parent?.children || []

    const [activeInternalMenu, setActiveInternalMenu] = useState<MenuItem | undefined>(
        internalMenu?.find((menuItem: MenuItem) => {
            const currentURL = pathname
            return currentURL === menuItem.url?.split('?')[0] || recursiveSearch(menuItem.children, currentURL)
        })
    )

    useEffect(() => {
        setMenu?.(internalMenu)
    }, [activeInternalMenu])

    // Reset ToC toggle state when path changes
    useEffect(() => {
        setTocUserToggled(false)
    }, [pathname])

    const handleBackgroundImageChange = useCallback((image: string | null) => {
        setBackgroundImage(image)
        if (typeof window !== 'undefined') {
            if (image) {
                localStorage.setItem('background-image', image)
            } else {
                localStorage.removeItem('background-image')
            }
        }
    }, [])

    useEffect(() => {
        const storedFullWidthContent = localStorage.getItem('fullWidthContent')
        if (storedFullWidthContent) {
            setFullWidthContent(storedFullWidthContent === 'true')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('fullWidthContent', fullWidthContent.toString())
    }, [fullWidthContent])

    // Monitor container size and update ToC visibility
    useEffect(() => {
        if (!appWindow?.size?.width) return

        // @6xl breakpoint is 72rem = 1152px
        const isLarge = appWindow?.size?.width >= 1152
        // Only update ToC visibility if user hasn't manually toggled it
        if (!tocUserToggled) {
            setIsTocVisible(isLarge)
        }
    }, [appWindow?.size?.width])

    const value = {
        isNavVisible,
        isTocVisible,
        fullWidthContent,
        setFullWidthContent,
        parent,
        internalMenu,
        activeInternalMenu,
        lineHeightMultiplier,
        backgroundImage,
        toggleNav,
        toggleToc,
        handleLineHeightChange,
        setActiveInternalMenu,
        setBackgroundImage: handleBackgroundImageChange,
    }

    return <ReaderViewContext.Provider value={value}>{children}</ReaderViewContext.Provider>
}

export function useReaderView() {
    const context = useContext(ReaderViewContext)
    if (context === undefined) {
        throw new Error('useReaderView must be used within a ReaderViewProvider')
    }
    return context
}
