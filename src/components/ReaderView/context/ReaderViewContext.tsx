import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useWindow } from '../../../context/Window'
import { MenuItem } from '../../../context/App'
import { useApp } from '../../../context/App'

interface ReaderViewContextType {
    isNavVisible: boolean
    isTocVisible: boolean
    isNarrow: boolean
    fullWidthContent: boolean
    setFullWidthContent: (value: boolean) => void
    backgroundImage: string | null
    toggleNav: () => void
    toggleToc: () => void
    setBackgroundImage: (image: string | null) => void
    hasMounted: boolean
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

export function ReaderViewProvider({
    children,
    defaultNavVisible,
}: {
    children: React.ReactNode
    defaultNavVisible?: boolean
}) {
    const { appWindow } = useWindow()
    // @2xl breakpoint for sidebar visibility (equivalent to @2xl/app-reader used in CSS)
    const isWideEnoughForSidebar = appWindow?.size?.width && appWindow?.size?.width >= 672 // 42rem = 672px
    // Below the @2xl threshold the inline sidebar rail eats too much of the
    // reading column, so on mobile we hide it entirely and swap in a floating
    // control cluster + off-canvas drawer. Only treat as narrow once the width
    // is actually known so SSR/first paint defaults to the desktop layout.
    const isNarrow = !!appWindow?.size?.width && appWindow.size.width < 672
    const [isNavVisible, setIsNavVisible] = useState<boolean>(defaultNavVisible ?? true)
    const [navUserToggled, setNavUserToggled] = useState(false)
    // @6xl breakpoint is 72rem = 1152px
    const isLarge = appWindow?.size?.width && appWindow?.size?.width >= 1152
    const [isTocVisible, setIsTocVisible] = useState(true)
    const [tocUserToggled, setTocUserToggled] = useState(false)
    const [fullWidthContent, setFullWidthContent] = useState(false)
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
    const [hasMounted, setHasMounted] = useState(false)

    // Hydrate persisted state after mount
    useEffect(() => {
        const persisted = readPersistedPinned()
        if (persisted !== null) {
            setIsNavVisible(persisted)
            setNavUserToggled(true)
        }
        const savedBackground = localStorage.getItem('background-image')
        if (savedBackground) setBackgroundImage(savedBackground)
    }, [])

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
            setIsTocVisible(!!isLarge)
        }
    }, [isLarge])

    // Monitor container size and update Nav visibility
    useEffect(() => {
        if (!appWindow?.size?.width) return

        // Only update Nav visibility if user hasn't manually toggled it
        if (!navUserToggled) {
            setIsNavVisible(!!isWideEnoughForSidebar)
        }
    }, [isWideEnoughForSidebar, navUserToggled])

    // Enable transitions after the initial render has painted.
    useEffect(() => {
        requestAnimationFrame(() => {
            setHasMounted(true)
        })
    }, [])

    const value = {
        isNavVisible,
        isTocVisible,
        isNarrow,
        fullWidthContent,
        setFullWidthContent,
        backgroundImage,
        toggleNav,
        toggleToc,
        setBackgroundImage: handleBackgroundImageChange,
        hasMounted,
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
