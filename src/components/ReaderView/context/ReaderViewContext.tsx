import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useWindow } from '../../../context/Window'
import { MenuItem } from '../../../context/App'
import { useApp } from '../../../context/App'

interface ReaderViewContextType {
    isNavVisible: boolean
    isTocVisible: boolean
    fullWidthContent: boolean
    setFullWidthContent: (value: boolean) => void
    lineHeightMultiplier: number
    backgroundImage: string | null
    toggleNav: () => void
    toggleToc: () => void
    handleLineHeightChange: (value: number) => void
    setBackgroundImage: (image: string | null) => void
}

const getComputedLineHeight = (selector: string) => {
    const articleContent = document.querySelector('.reader-content-container')
    const elements = articleContent?.querySelectorAll(selector)

    if (!elements?.length) return 1.5

    const computedStyle = window.getComputedStyle(elements[0])
    const lineHeight = computedStyle.lineHeight

    if (lineHeight === 'normal') return 1.5
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

const SIDEBAR_PINNED_KEY = 'reader-sidebar-pinned'

const readPersistedPinned = (): boolean | null => {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem(SIDEBAR_PINNED_KEY)
    if (raw === 'true') return true
    if (raw === 'false') return false
    return null
}

export function ReaderViewProvider({ children }: { children: React.ReactNode }) {
    const { appWindow } = useWindow()
    // @2xl breakpoint for sidebar visibility (equivalent to @2xl/app-reader used in CSS)
    const isWideEnoughForSidebar = appWindow?.size?.width && appWindow?.size?.width >= 672 // 42rem = 672px
    // `isNavVisible` is the user-facing "pinned" state for the LeftSidebar.
    // Persisted to localStorage so the choice survives reloads. On first visit
    // (or with no stored value) it falls back to the width-based default.
    const [isNavVisible, setIsNavVisible] = useState<boolean>(() => {
        const persisted = readPersistedPinned()
        if (persisted !== null) return persisted
        return !!isWideEnoughForSidebar
    })
    const [navUserToggled, setNavUserToggled] = useState(() => readPersistedPinned() !== null)
    // @6xl breakpoint is 72rem = 1152px
    const isLarge = appWindow?.size?.width && appWindow?.size?.width >= 1152
    const [isTocVisible, setIsTocVisible] = useState(isLarge)
    const [tocUserToggled, setTocUserToggled] = useState(false)
    const [fullWidthContent, setFullWidthContent] = useState(false)
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
        setNavUserToggled(true)
        setIsNavVisible((prev) => {
            const next = !prev
            if (typeof window !== 'undefined') {
                localStorage.setItem(SIDEBAR_PINNED_KEY, String(next))
            }
            return next
        })
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
            .reader-content-container p { line-height: ${lineHeightP * lineHeightMultiplier} !important; }
            .reader-content-container li { line-height: ${lineHeightLi * lineHeightMultiplier} !important; }
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

    // Reset ToC toggle state when path changes (Nav stays sticky — persisted to localStorage)
    useEffect(() => {
        setTocUserToggled(false)
    }, [appWindow?.path])

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

        // Only update ToC visibility if user hasn't manually toggled it
        if (!tocUserToggled) {
            setIsTocVisible(isLarge)
        }
    }, [isLarge])

    // Monitor container size and update Nav visibility
    useEffect(() => {
        if (!appWindow?.size?.width) return

        // Only update Nav visibility if user hasn't manually toggled it
        if (!navUserToggled) {
            setIsNavVisible(isWideEnoughForSidebar)
        }
    }, [isWideEnoughForSidebar, navUserToggled])

    const value = {
        isNavVisible,
        isTocVisible,
        fullWidthContent,
        setFullWidthContent,
        lineHeightMultiplier,
        backgroundImage,
        toggleNav,
        toggleToc,
        handleLineHeightChange,
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
