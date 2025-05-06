import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useLocation } from '@reach/router'
import { useLayoutData } from 'components/Layout/hooks'
import menu from '../../../navs'
import { useWindow } from '../../../context/Window'

interface ReaderViewContextType {
    isNavVisible: boolean
    isTocVisible: boolean
    fullWidthContent: boolean
    parent: any
    internalMenu: any[]
    activeInternalMenu: any
    lineHeightMultiplier: number
    backgroundImage: string | null
    toggleNav: () => void
    toggleToc: () => void
    handleLineHeightChange: (value: number) => void
    setActiveInternalMenu: (menu: any) => void
    setBackgroundImage: (image: string | null) => void
}

const recursiveSearch = (array: any[], value: string) => {
    for (let i = 0; i < array?.length || 0; i++) {
        const element = array[i]

        if (typeof element === 'string' && element.split('?')[0] === value) {
            return true
        }

        if (typeof element === 'object' && element !== null) {
            const found = recursiveSearch(Object.values(element), value)
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

export function ReaderViewProvider({ children }: { children: React.ReactNode }) {
    const { setMenu } = useWindow()
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isTocVisible, setIsTocVisible] = useState(true)
    const { fullWidthContent } = useLayoutData()
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

    const toggleNav = useCallback(() => {
        setIsNavVisible((prev) => !prev)
    }, [])

    const toggleToc = useCallback(() => {
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

    const parent = menu.find(({ children, url }) => {
        const currentURL = pathname
        return currentURL === url.split('?')[0] || recursiveSearch(children, currentURL)
    })

    const internalMenu = parent?.children

    const [activeInternalMenu, setActiveInternalMenu] = useState(
        internalMenu?.find((menuItem) => {
            const currentURL = pathname
            return currentURL === menuItem.url?.split('?')[0] || recursiveSearch(menuItem.children, currentURL)
        })
    )

    useEffect(() => {
        setMenu?.(internalMenu)
    }, [activeInternalMenu])

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

    const value = {
        isNavVisible,
        isTocVisible,
        fullWidthContent,
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
