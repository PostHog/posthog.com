import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { AppWindow } from './Window'
import { WindowSearchUI } from 'components/SearchUI'
import { navigate } from 'gatsby'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SignIn from 'components/Squeak/components/Classic/SignIn'
import Register from 'components/Squeak/components/Classic/Register'
import ForgotPassword from 'components/Squeak/components/Classic/ForgotPassword'
import { User } from 'hooks/useUser'
import { ChatProvider } from 'hooks/useChat'
import Start from 'components/Start'

interface ChatContext {
    type: 'page'
    value: { path: string; label: string }
}

type WindowElement = React.ReactNode & {
    key: string
    props: {
        location: {
            pathname: string
        }
        pageContext: any
        data: any
        params: any
        path: string
        newWindow: boolean
        minimal: boolean
    }
}

interface AppContextType {
    windows: AppWindow[]
    closeWindow: (item: AppWindow) => void
    bringToFront: (item: AppWindow) => void
    setWindowTitle: (appWindow: AppWindow, title: string) => void
    focusedWindow?: AppWindow
    location: any
    minimizeWindow: (appWindow: AppWindow) => void
    taskbarHeight: number
    addWindow: (element: WindowElement) => void
    updateWindowRef: (appWindow: AppWindow, ref: React.RefObject<HTMLDivElement>) => void
    updateWindow: (
        appWindow: AppWindow,
        updates: {
            position?: { x?: number; y?: number }
            size?: { width?: number; height?: number }
            previousPosition?: { x?: number; y?: number }
            previousSize?: { width?: number; height?: number }
            element?: any
            animating?: boolean
        }
    ) => void
    getPositionDefaults: (
        key: string,
        size: { width: number; height: number },
        windows: AppWindow[]
    ) => { x: number; y: number }
    getDesktopCenterPosition: (size: { width: number; height: number }) => { x: number; y: number }
    openSearch: (initialFilter?: string) => void
    handleSnapToSide: (side: 'left' | 'right') => void
    constraintsRef: React.RefObject<HTMLDivElement>
    expandWindow: () => void
    openSignIn: (onSuccess?: (user: User) => void) => void
    openRegister: () => void
    openForgotPassword: () => void
    siteSettings: SiteSettings
    updateSiteSettings: (settings: SiteSettings) => void
    openNewChat: ({
        path,
        context,
        quickQuestions,
        chatId,
        date,
    }: {
        path: string
        context?: ChatContext[]
        quickQuestions?: string[]
        chatId?: string
        date?: string
    }) => void
    isNotificationsPanelOpen: boolean
    setIsNotificationsPanelOpen: (isOpen: boolean) => void
    isActiveWindowsPanelOpen: boolean
    setIsActiveWindowsPanelOpen: (isOpen: boolean) => void
    isMobile: boolean
    compact: boolean
}

interface AppProviderProps {
    children: React.ReactNode
    location: any
    element: {
        element: React.ReactNode
        key: string
        props: {
            path: string
            pageContext: any
            data: any
            params: any
            location: {
                pathname: string
            }
        }
    }
}

const applyStyles = (content: string) => {
    let styleElement = document.getElementById('custom-cursor-style')
    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'custom-cursor-style'
        document.head.appendChild(styleElement)
    }
    styleElement.textContent = content
}

const updateCursor = (cursor: string) => {
    if (cursor === 'james') {
        applyStyles(`
            :root {
                --cursor-default: url(https://res.cloudinary.com/dmukukwp6/image/upload/james_cursor_default_d6f7983b0a.png), auto;
                --cursor-pointer: url(https://res.cloudinary.com/dmukukwp6/image/upload/james_cursor_pointer_8bf0dd7a15.png), auto;
            }
            * { cursor: var(--cursor-default) !important; }
            button, a { cursor: var(--cursor-pointer) !important; }
        `)
    } else if (cursor === 'xl') {
        // Default XL cursor
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#000" stroke="#fff" stroke-width="5" d="m57.77 96.196.024.01.025.008c.48.177 1.014.286 1.58.286.665 0 1.28-.147 1.837-.392l.012-.006.013-.006 8.8-3.997.002-.001a4.5 4.5 0 0 0 2.225-5.969l-10.73-23.395 16.828-1.446.008-.001a4.504 4.504 0 0 0 2.678-7.78L33.073 8.712a4.51 4.51 0 0 0-4.858-.844l-.011.006A4.499 4.499 0 0 0 25.5 12v66a4.503 4.503 0 0 0 2.715 4.132l.01.004a4.505 4.505 0 0 0 4.86-.859L45.01 70.072l10.259 23.717.005.012.005.011a4.527 4.527 0 0 0 2.492 2.384Z"/></svg>`
        const encodedSvg = encodeURIComponent(svg)
        const cursorUrl = `url('data:image/svg+xml;utf8,${encodedSvg}'), auto`

        // Hand cursor for links/buttons
        const handSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#fff" stroke="#000" stroke-width="5" d="M34.5 12.5V57l-13-7.5L15 57l33.5 32.5H72L84.5 75V39h-13v-6h-24V14L41 9l-6.5 3.5Z"/><path fill="#000" d="M40.625 6.25c-5.139 0-9.375 4.236-9.375 9.375v36.914l-2.05-2.148-.782-.684c-3.601-3.601-9.485-3.601-13.086 0-3.6 3.601-3.6 9.485 0 13.086v.098l25.586 25.293.195.097.098.196c4.212 3.161 9.583 5.273 15.625 5.273h5.371a25.533 25.533 0 0 0 25.586-25.586V43.75c0-5.14-4.236-9.375-9.375-9.375-1.33 0-2.563.366-3.71.879-1.026-4.065-4.725-7.129-9.083-7.129-2.392 0-4.59.94-6.25 2.441-1.66-1.501-3.857-2.441-6.25-2.441-1.099 0-2.136.232-3.125.586V15.625c0-5.14-4.236-9.375-9.375-9.375Zm0 6.25a3.115 3.115 0 0 1 3.125 3.125V50H50V37.5a3.115 3.115 0 0 1 3.125-3.125A3.115 3.115 0 0 1 56.25 37.5V50h6.25V37.5a3.115 3.115 0 0 1 3.125-3.125A3.115 3.115 0 0 1 68.75 37.5V50h6.543v-6.25a3.115 3.115 0 0 1 3.125-3.125 3.115 3.115 0 0 1 3.125 3.125v24.414c0 10.828-8.508 19.336-19.336 19.336h-5.37c-4.579 0-8.534-1.636-11.817-4.102l-25.293-25c-1.392-1.391-1.392-2.905 0-4.296 1.391-1.392 2.905-1.392 4.297 0L37.5 67.578V15.625a3.115 3.115 0 0 1 3.125-3.125Z"/></svg>`
        const encodedHandSvg = encodeURIComponent(handSvg)
        const handCursorUrl = `url('data:image/svg+xml;utf8,${encodedHandSvg}'), auto`

        // Move cursor for draggable elements
        const moveSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#000" stroke="#fff" stroke-width="5" d="M46.836 6.098 35.443 17.365a6.506 6.506 0 0 0-1.795 6.3l.001.004a6.51 6.51 0 0 0 4.617 4.668 6.49 6.49 0 0 0 5.234-.839v8.484a6.477 6.477 0 0 0 3.22 5.682 6.464 6.464 0 0 0 6.56 0 6.477 6.477 0 0 0 3.22-5.682v-8.484a6.49 6.49 0 0 0 5.233.839 6.51 6.51 0 0 0 4.618-4.668v-.003a6.505 6.505 0 0 0-1.794-6.3L53.164 6.097a4.5 4.5 0 0 0-6.328 0Zm31.213 27.418h-.006a6.486 6.486 0 0 0-6.033 4.021 6.49 6.49 0 0 0 .555 6.018h-8.492a6.477 6.477 0 0 0-5.683 3.22 6.464 6.464 0 0 0 0 6.56 6.477 6.477 0 0 0 5.683 3.22h8.484a6.49 6.49 0 0 0-.839 5.233 6.51 6.51 0 0 0 4.668 4.618h.003a6.506 6.506 0 0 0 6.3-1.794l11.268-11.393a4.5 4.5 0 0 0 0-6.329l-11.27-11.394a6.503 6.503 0 0 0-4.638-1.98ZM17.315 64.624l.002.002a6.508 6.508 0 0 0 9.2.049 6.502 6.502 0 0 0 .907-8.12h8.496a6.5 6.5 0 1 0 0-13h-8.485a6.512 6.512 0 0 0 .52-6.1 6.483 6.483 0 0 0-6.196-3.93 6.495 6.495 0 0 0-4.451 1.968l-11.26 11.4a4.5 4.5 0 0 0 0 6.324l11.267 11.407Zm22.622 6.946h-.023a6.516 6.516 0 0 0-5.991 4.091l-.003.006a6.512 6.512 0 0 0 1.518 7.08l9.53 9.422c.285.346.61.671.972.962l.897.884a4.5 4.5 0 0 0 6.327-.005l.88-.872a6.439 6.439 0 0 0 1.01-1l9.502-9.385a6.513 6.513 0 0 0 1.515-7.163 6.5 6.5 0 0 0-6.136-4.027c-1.23.019-2.42.392-3.435 1.056v-8.486a6.499 6.499 0 0 0-1.904-4.674 6.46 6.46 0 0 0-4.703-1.896 6.497 6.497 0 0 0-6.393 6.57v8.492a6.539 6.539 0 0 0-3.563-1.055Z"/></svg>`
        const encodedMoveSvg = encodeURIComponent(moveSvg)
        const moveCursorUrl = `url('data:image/svg+xml;utf8,${encodedMoveSvg}'), auto`

        // Vertical resize cursor
        const verticalResizeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#000" stroke="#fff" stroke-width="5" d="M50 10L30 30H40V60H30L50 80L70 60H60V30H70L50 10Z"/></svg>`
        const encodedVerticalResizeSvg = encodeURIComponent(verticalResizeSvg)
        const verticalResizeCursorUrl = `url('data:image/svg+xml;utf8,${encodedVerticalResizeSvg}'), auto`

        // Horizontal resize cursor
        const horizontalResizeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path fill="#000" stroke="#fff" stroke-width="5" d="M10 50L30 30V40H60V30L80 50L60 70V60H30V70L10 50Z"/></svg>`
        const encodedHorizontalResizeSvg = encodeURIComponent(horizontalResizeSvg)
        const horizontalResizeCursorUrl = `url('data:image/svg+xml;utf8,${encodedHorizontalResizeSvg}'), auto`

        applyStyles(`
            :root {
                --cursor-default: ${cursorUrl};
                --cursor-pointer: ${handCursorUrl};
                --cursor-move: ${moveCursorUrl};
                --cursor-ew-resize: ${horizontalResizeCursorUrl};
                --cursor-ns-resize: ${verticalResizeCursorUrl};
            }
            
            * { cursor: var(--cursor-default); }
            
            a, button, [role="button"], [tabindex="0"],
            input[type="button"], input[type="submit"], input[type="reset"],
            .cursor-pointer { 
                cursor: var(--cursor-pointer) !important; 
            }
            
            [data-draggable="true"], .cursor-move {
                cursor: var(--cursor-move) !important;
            }
            
            .cursor-ew-resize {
                cursor: var(--cursor-ew-resize) !important;
            }
            
            .cursor-ns-resize {
                cursor: var(--cursor-ns-resize) !important;
            }
        `)
    } else {
        const styleElement = document.getElementById('custom-cursor-style')
        if (styleElement) {
            styleElement.remove()
        }
    }
}

export const Context = createContext<AppContextType>({
    windows: [],
    closeWindow: () => {},
    bringToFront: () => {},
    setWindowTitle: () => null,
    focusedWindow: undefined,
    location: {},
    minimizeWindow: () => {},
    taskbarHeight: 0,
    addWindow: () => {},
    updateWindowRef: () => {},
    updateWindow: () => {},
    getPositionDefaults: () => ({ x: 0, y: 0 }),
    getDesktopCenterPosition: () => ({ x: 0, y: 0 }),
    openSearch: () => {},
    handleSnapToSide: () => {},
    constraintsRef: { current: null },
    expandWindow: () => {},
    openSignIn: () => null,
    openRegister: () => {},
    openForgotPassword: () => {},
    siteSettings: {
        theme: 'light',
        experience: 'posthog',
        colorMode: 'light',
        skinMode: 'modern',
        cursor: 'default',
        wallpaper: 'keyboard-garden',
        screensaverDisabled: false,
    },
    updateSiteSettings: () => {},
    openNewChat: () => {},
    isNotificationsPanelOpen: false,
    setIsNotificationsPanelOpen: () => {},
    isActiveWindowsPanelOpen: false,
    setIsActiveWindowsPanelOpen: () => {},
    isMobile: false,
    compact: false,
})

export interface AppSetting {
    size: {
        min: { width: number; height: number }
        max: { width: number; height: number }
        fixed?: boolean
        autoHeight?: boolean
    }
    position?: {
        center?: boolean
    }
}

export interface AppSettings {
    [key: string]: AppSetting
}

const appSettings: AppSettings = {
    '/': {
        size: {
            min: {
                width: 700,
                height: 500,
            },
            max: {
                width: 800,
                height: 1000,
            },
            fixed: false,
        },
        position: {
            center: true,
        },
    },
    '/product-toolkit': {
        size: {
            min: {
                width: 700,
                height: 500,
            },
            max: {
                width: 800,
                height: 1000,
            },
            fixed: false,
        },
        position: {
            center: true,
        },
    },
    '/paint': {
        size: {
            min: {
                width: 850,
                height: 400,
            },
            max: {
                width: 2000,
                height: 2000,
            },
            fixed: false,
        },
    },
    '/talk-to-a-human': {
        size: {
            min: {
                width: 500,
                height: 500,
            },
            max: {
                width: 800,
                height: 1000,
            },
            fixed: false,
        },
        position: {
            center: true,
        },
    },
    start: {
        size: {
            min: {
                width: 850,
                height: 580,
            },
            max: {
                width: 850,
                height: 580,
            },
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    '/start': {
        size: {
            min: {
                width: 850,
                height: 580,
            },
            max: {
                width: 850,
                height: 580,
            },
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    '/signup': {
        size: {
            min: {
                width: 900,
                height: 750,
            },
            max: {
                width: 900,
                height: 750,
            },
            fixed: true,
        },
    },
    '/display-options': {
        size: {
            min: {
                width: 600,
                height: 500,
            },
            max: {
                width: 600,
                height: 500,
            },
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    '/why': {
        size: {
            min: {
                width: 750,
                height: 575,
            },
            max: {
                width: 750,
                height: 575,
            },
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    '/credits': {
        size: {
            min: {
                width: 300,
                height: 625,
            },
            max: {
                width: 300,
                height: 625,
            },
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    '/demo': {
        size: {
            min: {
                width: 960,
                height: 682,
            },
            max: {
                width: 960,
                height: 682,
            },
            fixed: false,
        },
        position: {
            center: true,
        },
    },
    cher: {
        size: {
            min: {
                width: 960,
                height: 682,
            },
            max: {
                width: 960,
                height: 682,
            },
            fixed: false,
        },
        position: {
            center: true,
        },
    },
    'ask-max': {
        size: {
            min: {
                width: 400,
                height: 600,
            },
            max: {
                width: 400,
                height: 600,
            },
            fixed: false,
        },
    },
    'community-auth-signin': {
        size: {
            min: {
                width: 470,
                height: 299,
            },
            max: {
                width: 470,
                height: 299,
            },
            fixed: true,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    'community-auth-register': {
        size: {
            min: {
                width: 470,
                height: 299,
            },
            max: {
                width: 470,
                height: 299,
            },
            fixed: true,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    search: {
        size: {
            min: {
                width: 550,
                height: 369,
            },
            max: {
                width: 550,
                height: 369,
            },
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    '/reset-password': {
        size: {
            min: {
                width: 470,
                height: 299,
            },
            max: {
                width: 470,
                height: 299,
            },
            fixed: true,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    'community-auth-forgot-password': {
        size: {
            min: {
                width: 470,
                height: 299,
            },
            max: {
                width: 470,
                height: 299,
            },
            fixed: true,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    share: {
        size: {
            min: {
                width: 500,
                height: 500,
            },
            max: {
                width: 500,
                height: 500,
            },
            fixed: true,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    'media-upload': {
        size: {
            min: {
                width: 900,
                height: 500,
            },
            max: {
                width: 900,
                height: 500,
            },
            fixed: true,
            autoHeight: true,
        },
    },
    'cool-tech-jobs-issue': {
        size: {
            min: {
                width: 500,
                height: 500,
            },
            max: {
                width: 500,
                height: 500,
            },
            fixed: true,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    'cool-tech-jobs-add-a-job': {
        size: {
            min: {
                width: 500,
                height: 500,
            },
            max: {
                width: 500,
                height: 500,
            },
            fixed: true,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
} as const

export interface SiteSettings {
    experience: 'posthog' | 'boring'
    colorMode: 'light' | 'dark' | 'system'
    theme: 'light' | 'dark'
    skinMode: 'modern' | 'classic'
    cursor: 'default' | 'xl' | 'james'
    wallpaper:
        | 'keyboard-garden'
        | 'hogzilla'
        | 'startup-monopoly'
        | 'office-party'
        | '2001-bliss'
        | 'parade'
        | 'coding-at-night'
    screensaverDisabled?: boolean
}

export const Provider = ({ children, element, location }: AppProviderProps) => {
    const isSSR = typeof window === 'undefined'
    const compact = typeof window !== 'undefined' && window !== window.parent
    const constraintsRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(!isSSR && window.innerWidth < 768)
    const [taskbarHeight, setTaskbarHeight] = useState(38)
    const [lastClickedElement, setLastClickedElement] = useState<HTMLElement | null>(null)
    const [windows, setWindows] = useState<AppWindow[]>(
        location.key === 'initial' && location.pathname === '/' && isMobile
            ? []
            : [createNewWindow(element, [], location, isSSR, taskbarHeight)]
    )
    const focusedWindow = useMemo(() => {
        return windows.reduce<AppWindow | undefined>(
            (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
            undefined
        )
    }, [windows])
    const [siteSettings, setSiteSettings] = useState<SiteSettings>({
        experience: isMobile || compact ? 'boring' : 'posthog',
        colorMode: 'light',
        theme: 'light',
        skinMode: 'modern',
        cursor: 'default',
        wallpaper:
            typeof window !== 'undefined'
                ? JSON.parse(localStorage.getItem('siteSettings') || '{}').wallpaper || 'keyboard-garden'
                : 'keyboard-garden',
    })
    const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false)
    const [isActiveWindowsPanelOpen, setIsActiveWindowsPanelOpen] = useState(false)

    const closeWindow = useCallback(
        (item: AppWindow) => {
            updateWindow(item, { animating: true })
            setTimeout(() => {
                const windowsFiltered = windows.filter((el) => el.path !== item.path)
                const nextFocusedWindow = windowsFiltered.reduce<AppWindow | undefined>(
                    (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
                    undefined
                )
                if (nextFocusedWindow && !nextFocusedWindow.minimized) {
                    if (nextFocusedWindow.path.startsWith('/')) {
                        navigate(nextFocusedWindow.path)
                    } else {
                        bringToFront(nextFocusedWindow)
                    }
                } else {
                    window.history.pushState({}, '', '/')
                }
                setWindows(windowsFiltered)
            }, 0)
        },
        [windows]
    )

    const bringToFront = useCallback((item: AppWindow, location?: Location, position?: { x: number; y: number }) => {
        setWindows((windows) =>
            windows.map((el) => ({
                ...el,
                zIndex: el === item ? windows.length : el.zIndex < item.zIndex ? el.zIndex : el.zIndex - 1,
                minimized: item === el ? false : el.minimized,
                location: item === el ? location || el.location : el.location,
                position: item === el ? position || el.position : el.position,
            }))
        )
    }, [])

    const replaceFocusedWindow = useCallback(
        (newWindow: AppWindow) => {
            if (focusedWindow) {
                setWindows((windows) =>
                    windows.map((w) =>
                        w === focusedWindow
                            ? {
                                  ...w,
                                  element: newWindow.element,
                                  path: newWindow.path,
                                  fromHistory: newWindow.fromHistory,
                                  props: newWindow.props,
                              }
                            : w
                    )
                )
            } else {
                setWindows((windows) => [...windows, newWindow])
            }
        },
        [focusedWindow]
    )

    const setWindowTitle = useCallback((appWindow: AppWindow, title: string) => {
        setWindows((windows) => windows.map((w) => (w === appWindow ? { ...appWindow, meta: { title } } : w)))
    }, [])

    const minimizeWindow = useCallback((appWindow: AppWindow) => {
        setWindows((windows) =>
            windows.map((w) => (w === appWindow ? { ...appWindow, minimized: true, animating: true } : w))
        )
    }, [])

    function getWindowBasedSizeConstraints() {
        return {
            min: {
                width: isSSR ? 0 : window.innerWidth * 0.2,
                height: isSSR ? 0 : window.innerHeight * 0.2,
            },
            max: {
                width: isSSR ? 0 : window.innerWidth * 0.9,
                height: isSSR ? 0 : window.innerHeight * 0.9,
            },
        }
    }

    function getDesktopCenterPosition(size: { width: number; height: number }) {
        return {
            x: isSSR ? 0 : window.innerWidth / 2 - size.width / 2,
            y: isSSR ? 0 : (window.innerHeight - taskbarHeight) / 2 - size.height / 2,
        }
    }

    function getPositionDefaults(key: string, size: { width: number; height: number }, windows: AppWindow[]) {
        if (appSettings[key]?.position?.center) {
            return getDesktopCenterPosition(size)
        }

        if (key?.startsWith('ask-max')) {
            return {
                x: isSSR ? 0 : window.innerWidth - size.width - 20,
                y: isSSR ? 0 : window.innerHeight - size.height - 20,
            }
        }

        const sortedWindows = [...windows].sort((a, b) => b.zIndex - a.zIndex)
        const previousWindow = sortedWindows[0]

        if (previousWindow && !previousWindow.key?.startsWith('ask-max')) {
            const potentialX = previousWindow.position.x + 10

            const screenMidpoint = isSSR ? 0 : window.innerWidth / 2
            const windowRightEdge = potentialX + size.width
            const amountOnRight = Math.max(0, windowRightEdge - screenMidpoint)
            const proportionOnRight = amountOnRight / size.width

            if (proportionOnRight > 2 / 3) {
                return getDesktopCenterPosition(size)
            }

            return {
                x: potentialX,
                y: previousWindow.position.y + 10,
            }
        }

        return getDesktopCenterPosition(size)
    }

    function getInitialSize(key: string) {
        const defaultSize =
            appSettings[key]?.size?.max ||
            (key?.startsWith('ask-max')
                ? appSettings['ask-max']?.size?.max
                : {
                      width: isSSR ? 0 : window.innerWidth * 0.9,
                      height: isSSR ? 0 : window.innerHeight * 0.9,
                  })
        return {
            width: Math.min(defaultSize.width, isSSR ? 0 : window.innerWidth * 0.9),
            height: Math.min(defaultSize.height, isSSR ? 0 : window.innerHeight * 0.9),
        }
    }

    function getLastClickedElementRect() {
        const rect = lastClickedElement?.getBoundingClientRect()
        if (!rect) return undefined
        return {
            x: rect.left,
            y: rect.top,
        }
    }

    function createNewWindow(
        element: WindowElement,
        windows: AppWindow[],
        location: any,
        isSSR: boolean,
        taskbarHeight: number
    ) {
        const size = getInitialSize(element.key)
        const position = element.props.position || getPositionDefaults(element.key, size, windows)
        const settings = appSettings[element.key]
        const lastClickedElementRect = getLastClickedElementRect()

        const newWindow: AppWindow = {
            element,
            zIndex: windows.length + 1,
            key: element.key,
            coordinates: location?.state?.coordinates || { x: 0, y: 0 },
            minimized: false,
            path: element.props.location.pathname,
            fromHistory: location?.state?.fromHistory || false,
            props: {
                pageContext: element.props.pageContext,
                data: element.props.data,
                params: element.props.params,
                path: element.props.location.pathname,
            },
            size,
            previousSize: size,
            position,
            previousPosition: position,
            sizeConstraints: settings?.size?.fixed
                ? { min: settings.size.min, max: settings.size.max }
                : getWindowBasedSizeConstraints(),
            fixedSize: settings?.size.fixed || false,
            fromOrigin: lastClickedElementRect
                ? {
                      x: lastClickedElementRect.x - size.width / 2,
                      y: lastClickedElementRect.y - size.height / 2,
                  }
                : undefined,
            minimal: element.props.minimal ?? false,
            appSettings: appSettings[element.key],
            location,
            animating: true,
        }

        // Adjust width if window extends beyond right edge
        if (newWindow.position.x + newWindow.size.width > (isSSR ? 0 : window.innerWidth) - 20) {
            newWindow.size.width = isSSR ? 0 : window.innerWidth - newWindow.position.x - 20
        }

        // Adjust height if window extends beyond bottom edge
        if (newWindow.position.y + newWindow.size.height > (isSSR ? 0 : window.innerHeight) - taskbarHeight - 20) {
            newWindow.size.height = isSSR ? 0 : window.innerHeight - newWindow.position.y - taskbarHeight - 20
        }

        return newWindow
    }

    const updatePages = (element: WindowElement) => {
        const existingWindow = windows.find((w) => w.path === element.props.location.pathname)
        const newWindow = createNewWindow(element, windows, location, isSSR, taskbarHeight)

        if (siteSettings.experience === 'boring') {
            return replaceFocusedWindow(newWindow)
        }

        if (existingWindow) {
            bringToFront(existingWindow, element.props.location)
        } else if (element.props.newWindow || location?.state?.newWindow) {
            setWindows([...windows, newWindow])
        } else {
            replaceFocusedWindow(newWindow)
        }
    }

    const addWindow = (element: WindowElement) => {
        updatePages(element)
    }

    const updateWindowRef = (appWindow: AppWindow, ref: React.RefObject<HTMLDivElement>) => {
        setWindows((windows) => windows.map((w) => (w === appWindow ? { ...appWindow, ref } : w)))
    }

    const updateWindow = (
        appWindow: AppWindow,
        updates: {
            position?: { x?: number; y?: number }
            size?: { width?: number; height?: number }
            previousPosition?: { x?: number; y?: number }
            previousSize?: { width?: number; height?: number }
            element?: any
            animating?: boolean
        }
    ) => {
        const newAppWindow = {
            ...appWindow,
            position: {
                ...appWindow.position,
                ...(updates.position || {}),
            },
            size: {
                ...appWindow.size,
                ...(updates.size || {}),
            },
            previousPosition: {
                ...appWindow.previousPosition,
                ...(updates.previousPosition || {}),
            },
            previousSize: {
                ...appWindow.previousSize,
                ...(updates.previousSize || {}),
            },
            ...(updates.element ? { element: updates.element } : {}),
            ...('animating' in updates ? { animating: updates.animating } : {}),
        }
        setWindows((windows) => windows.map((w) => (w === appWindow ? newAppWindow : w)))
        return newAppWindow
    }

    const openSearch = (initialFilter?: string) => {
        addWindow(
            <WindowSearchUI
                location={{ pathname: `search` }}
                key={`search`}
                newWindow
                minimal
                initialFilter={initialFilter}
            />
        )
    }

    const openSignIn = (onSuccess?: (user: User) => void) => {
        addWindow(
            <SignIn
                onSuccess={onSuccess}
                location={{ pathname: `community-auth-signin` }}
                key="community-auth-signin"
                newWindow
            />
        )
    }

    const openRegister = () => {
        addWindow(
            <Register location={{ pathname: `community-auth-register` }} key="community-auth-register" newWindow />
        )
    }

    const openForgotPassword = () => {
        addWindow(
            <ForgotPassword
                location={{ pathname: `community-auth-forgot-password` }}
                key="community-auth-forgot-password"
                newWindow
            />
        )
    }

    const openNewChat = ({
        path,
        context,
        quickQuestions,
        chatId,
        date,
    }: {
        path: string
        context?: ChatContext[]
        quickQuestions?: string[]
        chatId?: string
        date?: string
    }) => {
        addWindow(
            <ChatProvider
                location={{
                    pathname: path,
                }}
                key={path}
                newWindow
                context={context}
                quickQuestions={quickQuestions}
                chatId={chatId}
                date={date}
            />
        )
    }

    const handleSnapToSide = (side: 'left' | 'right') => {
        if (!constraintsRef.current || !focusedWindow) return

        const bounds = constraintsRef.current.getBoundingClientRect()
        const x = side === 'left' ? 0 : bounds.width / 2
        const finalWidth = bounds.width / 2
        const size = { width: finalWidth, height: bounds.height }
        const position = { x, y: 0 }

        updateWindow(focusedWindow, {
            position,
            size,
        })
    }

    const expandWindow = () => {
        if (!focusedWindow) return
        updateWindow(focusedWindow, {
            position: { x: 0, y: 0 },
            size: { width: isSSR ? 0 : window.innerWidth, height: isSSR ? 0 : window.innerHeight - taskbarHeight },
            previousSize: focusedWindow.size,
            previousPosition: focusedWindow.position,
        })
    }

    const updateSiteSettings = (settings: SiteSettings) => {
        setSiteSettings(settings)
        localStorage.setItem('siteSettings', JSON.stringify(settings))
    }

    useEffect(() => {
        if (location.key === 'initial' && location.pathname === '/' && isMobile) {
            return
        }
        updatePages(element)
    }, [element])

    useEffect(() => {
        const updateTaskbarHeight = () => {
            const height = document.querySelector('#taskbar')?.getBoundingClientRect().height || 0
            setTaskbarHeight(height)
        }

        updateTaskbarHeight()

        if (!isSSR) {
            window.addEventListener('resize', updateTaskbarHeight)
            return () => window.removeEventListener('resize', updateTaskbarHeight)
        }
    }, [])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a')
            const button = target.closest('button')
            const isClickable = link || button
            if (isClickable) {
                setLastClickedElement(target)
            }
        }
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.shadowRoot ||
                (e.target instanceof HTMLElement && e.target.closest('.mdxeditor'))
            ) {
                return
            }
            if (e.shiftKey && e.key === 'ArrowLeft') {
                handleSnapToSide('left')
            }
            if (e.shiftKey && e.key === 'ArrowRight') {
                handleSnapToSide('right')
            }
            if (e.shiftKey && e.key === 'ArrowUp') {
                expandWindow()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleSnapToSide, expandWindow])

    useEffect(() => {
        const savedSettings = localStorage.getItem('siteSettings')
        if (savedSettings) {
            const settings = JSON.parse(savedSettings)
            if (isMobile && settings.experience === 'posthog') {
                settings.experience = 'boring'
            }
            setSiteSettings({ ...siteSettings, ...settings })
        }
    }, [])

    useEffect(() => {
        if (siteSettings.skinMode) {
            document.body.setAttribute('data-skin', siteSettings.skinMode)
        }
        if (siteSettings.cursor) {
            updateCursor(siteSettings.cursor)
        }
        if (siteSettings.wallpaper) {
            document.body.setAttribute('data-wallpaper', siteSettings.wallpaper)

            // Auto-switch to dark mode for "coding-at-night" wallpaper
            if (siteSettings.wallpaper === 'coding-at-night') {
                if (typeof window !== 'undefined' && (window as any).__setPreferredTheme) {
                    ;(window as any).__setPreferredTheme('dark')
                }
            }
        }
    }, [siteSettings])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (compact) {
            window.parent.postMessage(
                {
                    type: 'docs-ready',
                },
                '*'
            )

            // window.parent.postMessage(
            //     {
            //         type: 'docs-menu',
            //         menu: docsMenu.children,
            //     },
            //     '*'
            // )
        }

        const onMessage = (e: MessageEvent): void => {
            if (e.data.type === 'theme-toggle') {
                window.__setPreferredTheme(e.data.isDarkModeOn ? 'dark' : 'light')
                return
            }
            if (e.data.type === 'navigate') {
                navigate(e.data.url)
            }
        }

        window.__onThemeChange = (theme) => {
            updateSiteSettings({ ...siteSettings, theme })
        }

        window.addEventListener('message', onMessage)

        return () => window.removeEventListener('message', onMessage)
    }, [])

    useEffect(() => {
        if (compact) {
            window.parent.postMessage(
                {
                    type: 'internal-navigation',
                    url: location.pathname,
                },
                '*'
            )
        }
    }, [location.pathname])

    return (
        <Context.Provider
            value={{
                windows,
                closeWindow,
                bringToFront,
                setWindowTitle,
                focusedWindow,
                location,
                minimizeWindow,
                taskbarHeight,
                addWindow,
                updateWindowRef,
                getPositionDefaults,
                updateWindow,
                getDesktopCenterPosition,
                openSearch,
                handleSnapToSide,
                constraintsRef,
                expandWindow,
                openSignIn,
                openRegister,
                openForgotPassword,
                siteSettings,
                updateSiteSettings,
                openNewChat,
                isNotificationsPanelOpen,
                setIsNotificationsPanelOpen,
                isActiveWindowsPanelOpen,
                setIsActiveWindowsPanelOpen,
                isMobile,
                compact,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useApp = (): AppContextType => {
    const context = useContext(Context)

    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }

    return context
}
