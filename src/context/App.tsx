/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { AppWindow } from './Window'
import { WindowSearchUI } from 'components/SearchUI'
import { navigate } from 'gatsby'
import SignIn from 'components/Squeak/components/Classic/SignIn'
import Register from 'components/Squeak/components/Classic/Register'
import ForgotPassword from 'components/Squeak/components/Classic/ForgotPassword'
import { User } from 'hooks/useUser'
import { ChatProvider } from 'hooks/useChat'
import Start from 'components/Start'
import useDataPipelinesNav from '../navs/useDataPipelinesNav'
import initialMenu from '../navs'
import { useToast } from './Toast'
import { IconDay, IconLaptop, IconNight } from '@posthog/icons'
import { themeOptions } from '../hooks/useTheme'
import ContactSales from 'components/ContactSales'
import qs from 'qs'
import usePostHog from '../hooks/usePostHog'

declare global {
    interface Window {
        __setPreferredTheme: (theme: string) => string
        __onThemeChange: (theme: string) => void
    }
}

export interface MenuItem {
    name: string
    url?: string
    icon?: React.ReactNode
    color?: string
    children?: MenuItem[]
}

export type Menu = MenuItem[]

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
        pageContext: Record<string, unknown>
        data: Record<string, unknown>
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
    taskbarRef: React.RefObject<HTMLDivElement>
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
        initialQuestion,
        codeSnippet,
    }: {
        path: string
        context?: ChatContext[]
        quickQuestions?: string[]
        chatId?: string
        date?: string
        initialQuestion?: string
        codeSnippet?: { code: string; language: string; sourceUrl: string }
    }) => void
    isNotificationsPanelOpen: boolean
    setIsNotificationsPanelOpen: (isOpen: boolean) => void
    isActiveWindowsPanelOpen: boolean
    setIsActiveWindowsPanelOpen: (isOpen: boolean) => void
    isMobile: boolean
    compact: boolean
    menu: Menu
    openStart: ({ subdomain, initialTab }: { subdomain?: string; initialTab?: string }) => void
    animateClosingAllWindows: () => void
    closingAllWindowsAnimation: boolean
    closeAllWindows: () => void
    setClosingAllWindowsAnimation: (isOpen: boolean) => void
    screensaverPreviewActive: boolean
    setScreensaverPreviewActive: (isActive: boolean) => void
    setConfetti: (isActive: boolean) => void
    confetti: boolean
    posthogInstance?: string
    desktopParams?: string
    copyDesktopParams: () => void
    desktopCopied: boolean
    shareableDesktopURL: string
    windowsInView: AppWindow[]
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
    taskbarRef: { current: null },
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
        screensaverDisabled: true,
        clickBehavior: 'double',
        performanceBoost: false,
    },
    updateSiteSettings: () => {},
    openNewChat: () => {},
    isNotificationsPanelOpen: false,
    setIsNotificationsPanelOpen: () => {},
    isActiveWindowsPanelOpen: false,
    setIsActiveWindowsPanelOpen: () => {},
    isMobile: false,
    compact: false,
    menu: [],
    openStart: () => {},
    animateClosingAllWindows: () => {},
    closingAllWindowsAnimation: false,
    closeAllWindows: () => {},
    setClosingAllWindowsAnimation: () => {},
    screensaverPreviewActive: false,
    setScreensaverPreviewActive: () => {},
    setConfetti: () => {},
    confetti: false,
    posthogInstance: undefined,
    desktopParams: undefined,
    copyDesktopParams: () => {},
    desktopCopied: false,
    shareableDesktopURL: '',
    windowsInView: [],
})

export interface AppSetting {
    experiment?: {
        variant: 'control' | 'test'
        flag: string
    }
    size: {
        min: { width: number; height: number }
        max: { width: number; height: number }
        fixed?: boolean
        autoHeight?: boolean
    }
    position?: {
        center?: boolean // Centers window both horizontally and vertically
        topCenter?: boolean // Centers horizontally, anchors from top (100px desktop only, 0px mobile)
        getPositionDefaults?: (
            size: { width: number; height: number },
            windows: AppWindow[],
            getDesktopCenterPosition: (size: { width: number; height: number }) => { x: number; y: number }
        ) => { x: number; y: number }
    }
}

export interface AppSettings {
    [key: string]: AppSetting
}

const appSettings: AppSettings = {
    '/': {
        experiment: {
            variant: 'control',
            flag: 'homepage-test',
        },
        size: {
            min: {
                width: 700,
                height: 500,
            },
            max: {
                width: 850,
                height: 1000,
            },
            fixed: false,
        },
        position: {
            center: true,
            getPositionDefaults: (size, windows, getDesktopCenterPosition) => {
                if (typeof window === 'undefined') {
                    return {
                        x: 0,
                        y: 0,
                    }
                }

                const { x, y } = getDesktopCenterPosition(size)
                const keyboardGardenImageWidth = 700
                const keyboardGardenImageLeft = window.innerWidth - keyboardGardenImageWidth
                const windowRight = x + size.width
                if (windowRight > keyboardGardenImageLeft) {
                    const newX = x - (windowRight - keyboardGardenImageLeft)
                    return {
                        x: newX < 115 ? x : newX,
                        y,
                    }
                }
                return { x, y }
            },
        },
    },
    'home-test': {
        experiment: {
            variant: 'test',
            flag: 'homepage-test',
        },
        size: {
            min: {
                width: 700,
                height: 500,
            },
            max: {
                width: 1200,
                height: 900,
            },
            fixed: false,
        },
        position: {
            center: true,
            getPositionDefaults: (size, windows, getDesktopCenterPosition) => {
                if (typeof window === 'undefined') {
                    return {
                        x: 0,
                        y: 0,
                    }
                }

                const { x, y } = getDesktopCenterPosition(size)
                const keyboardGardenImageWidth = 700
                const keyboardGardenImageLeft = window.innerWidth - keyboardGardenImageWidth
                const windowRight = x + size.width
                if (windowRight > keyboardGardenImageLeft) {
                    const newX = x - (windowRight - keyboardGardenImageLeft)
                    return {
                        x: newX < 115 ? x : newX,
                        y,
                    }
                }
                return { x, y }
            },
        },
    },
    '/careers-og': {
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
            getPositionDefaults: (size, windows, getDesktopCenterPosition) => {
                if (typeof window === 'undefined') {
                    return {
                        x: 0,
                        y: 0,
                    }
                }

                const { x, y } = getDesktopCenterPosition(size)
                const keyboardGardenImageWidth = 700
                const keyboardGardenImageLeft = window.innerWidth - keyboardGardenImageWidth
                const windowRight = x + size.width
                if (windowRight > keyboardGardenImageLeft) {
                    const newX = x - (windowRight - keyboardGardenImageLeft)
                    return {
                        x: newX < 0 ? x : newX,
                        y,
                    }
                }
                return { x, y }
            },
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
                width: 700,
                height: 552,
            },
            fixed: false,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    '/services': {
        size: {
            min: {
                width: 700,
                height: 500,
            },
            max: {
                width: 850,
                height: 1000,
            },
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
            autoHeight: true,
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
            autoHeight: true,
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    '/about': {
        size: {
            min: {
                width: 750,
                height: 500,
            },
            max: {
                width: 900,
                height: 1000,
            },
            fixed: false,
        },
        position: {
            center: true,
        },
    },
    '/data-stack': {
        size: {
            min: {
                width: 750,
                height: 500,
            },
            max: {
                width: 1000,
                height: 1000,
            },
            fixed: false,
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
                height: 550,
            },
            max: {
                width: 600,
                height: 550,
            },
            fixed: true,
            autoHeight: true,
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
    '/terms': {
        size: {
            min: {
                width: 1,
                height: 1,
            },
            max: {
                width: 10000,
                height: 10000,
            },
        },
        position: {
            center: true,
        },
    },
    '/privacy': {
        size: {
            min: {
                width: 1,
                height: 1,
            },
            max: {
                width: 10000,
                height: 10000,
            },
        },
        position: {
            center: true,
        },
    },
    '/dpa': {
        size: {
            min: {
                width: 1,
                height: 1,
            },
            max: {
                width: 10000,
                height: 10000,
            },
        },
        position: {
            center: true,
        },
    },
    '/baa': {
        size: {
            min: {
                width: 1,
                height: 1,
            },
            max: {
                width: 10000,
                height: 10000,
            },
        },
        position: {
            center: true,
        },
    },
    '/vibe-check': {
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
                height: 700,
            },
            max: {
                width: 300,
                height: 700,
            },
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    '/kbd': {
        size: {
            min: {
                width: 600,
                height: 625,
            },
            max: {
                width: 600,
                height: 625,
            },
            fixed: true,
            autoHeight: true,
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
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    '/changelog-video': {
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
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    '/videos/play': {
        size: {
            min: {
                width: 960,
                height: 480,
            },
            max: {
                width: 1440,
                height: 810,
            },
            fixed: false,
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    '/sales': {
        size: {
            min: {
                width: 875,
                height: 600,
            },
            max: {
                width: 1100,
                height: 900,
            },
            fixed: false,
        },
        position: {
            center: true,
        },
    },
    '/spicy.mov': {
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
                height: 72,
            },
            max: {
                width: 800,
                height: 72,
            },
            fixed: true,
            autoHeight: true,
        },
        position: {
            topCenter: true,
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
                height: 800,
            },
        },
        position: {
            center: true,
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
                width: 600,
                height: 400,
            },
            max: {
                width: 600,
                height: 775,
            },
        },
        position: {
            center: true,
        },
    },
    'signup-embed': {
        size: {
            min: {
                width: 500,
                height: 400,
            },
            max: {
                width: 500,
                height: 400,
            },
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    'ask-a-question': {
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
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    'application-success': {
        size: {
            min: {
                width: 575,
                height: 500,
            },
            max: {
                width: 575,
                height: 1000,
            },
            autoHeight: true,
            fixed: true,
        },
        position: {
            center: true,
        },
    },
    'edit-roadmap': {
        size: {
            min: {
                width: 650,
                height: 500,
            },
            max: {
                width: 650,
                height: 800,
            },
        },
        position: {
            center: true,
        },
    },
    'add-roadmap': {
        size: {
            min: {
                width: 650,
                height: 500,
            },
            max: {
                width: 650,
                height: 800,
            },
        },
        position: {
            center: true,
        },
    },
    '/community/achievements': {
        size: {
            min: {
                width: 500,
                height: 1000,
            },
            max: {
                width: 500,
                height: 1000,
            },
            autoHeight: true,
        },
        position: {
            center: true,
        },
    },
    '/fm': {
        size: {
            min: {
                width: 1100,
                height: 660,
            },
            max: {
                width: 1100,
                height: 660,
            },
            fixed: true,
        },
    },
    'fm/mixtapes': {
        size: {
            min: {
                width: 450,
                height: 709,
            },
            max: {
                width: 450,
                height: 709,
            },
            fixed: true,
        },
    },
    '/fm/mixtapes/new': {
        size: {
            min: {
                width: 850,
                height: 597,
            },
            max: {
                width: 850,
                height: 597,
            },
            fixed: true,
        },
    },
    '/fm/mixtapes/edit/:id': {
        size: {
            min: {
                width: 850,
                height: 597,
            },
            max: {
                width: 850,
                height: 597,
            },
            fixed: true,
        },
    },
    'fm/dance-mode': {
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
    clickBehavior?: 'single' | 'double'
    performanceBoost?: boolean
}

const isLabel = (item: any) => !item?.url && item?.name

const getInitialSiteSettings = (isMobile: boolean, compact: boolean) => {
    const lastReset = typeof window !== 'undefined' ? localStorage.getItem('lastReset') : null
    const siteSettings = {
        experience: 'posthog',
        colorMode: (typeof window !== 'undefined' && (window as any).__theme) || 'light',
        theme: (typeof window !== 'undefined' && (window as any).__theme) || 'light',
        skinMode: 'modern',
        cursor: 'default',
        wallpaper: 'keyboard-garden',
        clickBehavior: 'double',
        performanceBoost: false,
        screensaverDisabled: true,
        ...(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('siteSettings') || '{}') : {}),
        ...(!lastReset ? { experience: 'posthog' } : {}),
    }

    if (isMobile || compact) {
        siteSettings.experience = 'boring'
    }

    return siteSettings
}

export const Provider = ({ children, element, location }: AppProviderProps) => {
    const isSSR = typeof window === 'undefined'
    const compact = typeof window !== 'undefined' && window !== window.parent
    const constraintsRef = useRef<HTMLDivElement>(null)
    const taskbarRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(!isSSR && window.innerWidth < 768)
    const [taskbarHeight, setTaskbarHeight] = useState(38)
    const [lastClickedElementRect, setLastClickedElementRect] = useState<{ x: number; y: number } | null>(null)
    const [desktopCopied, setDesktopCopied] = useState(false)
    const [windowsInView, setWindowsInView] = useState<AppWindow[]>([])
    const urlObj = isSSR ? null : new URL(location.href)
    const queryString = isSSR ? '' : urlObj?.search.substring(1)
    const parsed = isSSR ? {} : qs.parse(queryString)
    const paramsWindows = parsed?.windows
    const stateWindows = element.props?.location?.state?.savedWindows
    const posthog = usePostHog()

    const [windows, setWindows] = useState<AppWindow[]>(
        (location.key === 'initial' && location.pathname === '/' && isMobile) || !!paramsWindows
            ? []
            : getInitialWindows(element)
    )
    const focusedWindow = useMemo(() => {
        return windows.reduce<AppWindow | undefined>(
            (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
            undefined
        )
    }, [windows])
    const [siteSettings, setSiteSettings] = useState<SiteSettings>(getInitialSiteSettings(isMobile, compact))
    const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false)
    const [isActiveWindowsPanelOpen, setIsActiveWindowsPanelOpen] = useState(false)
    const [closingAllWindowsAnimation, setClosingAllWindowsAnimation] = useState(false)
    const [screensaverPreviewActive, setScreensaverPreviewActive] = useState(false)
    const [confetti, setConfetti] = useState(false)
    const [posthogInstance, setPosthogInstance] = useState<string>()
    const { addToast } = useToast()

    const destinationNav = useDataPipelinesNav({ type: 'destination' })
    const transformationNav = useDataPipelinesNav({ type: 'transformation' })
    const sourceWebhooksNav = useDataPipelinesNav({ type: 'source_webhook' })

    const dynamicMenus = useMemo(
        () => ({
            'data-pipeline-destinations': destinationNav,
            'data-pipeline-transformations': transformationNav,
            'data-pipeline-source-webhooks': sourceWebhooksNav,
        }),
        [destinationNav, transformationNav, sourceWebhooksNav]
    )

    const desktopParams = useMemo(() => {
        const innerWidth = isSSR ? 0 : window.innerWidth
        const innerHeight = isSSR ? 0 : window.innerHeight

        const savedWindows = [...windows]
            .filter((win) => !win.minimized && win.path.startsWith('/'))
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((win) => ({
                path: win.path,
                position: {
                    x: (win.position.x / innerWidth) * 100,
                    y: (win.position.y / (innerHeight - taskbarHeight)) * 100,
                },
                size: {
                    width: (win.size.width / innerWidth) * 100,
                    height: (win.size.height / innerHeight) * 100,
                },
                zIndex: win.zIndex,
            }))

        if (savedWindows.length === 0) return undefined

        // Preserve existing query parameters from the current URL
        const currentParams = isSSR ? {} : qs.parse(location.search.substring(1))
        const allParams = {
            ...currentParams,
            windows: savedWindows,
        }

        return `${location.pathname}?${qs.stringify(allParams, { encode: false })}`
    }, [windows, taskbarHeight, location, isSSR])

    const shareableDesktopURL = useMemo(() => {
        const url = `${location.origin}${desktopParams}`
        return url
    }, [location, desktopParams])

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

    const closeWindow = useCallback(
        (item: AppWindow) => {
            setTimeout(() => {
                const windowsFiltered = windows.filter((el) => el.path !== item.path)
                const nextFocusedWindow = windowsFiltered.reduce<AppWindow | undefined>(
                    (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
                    undefined
                )
                if (nextFocusedWindow && !nextFocusedWindow.minimized) {
                    if (nextFocusedWindow.path.startsWith('/')) {
                        navigate(`${nextFocusedWindow.path}${nextFocusedWindow.location?.search || ''}`)
                    } else {
                        bringToFront(nextFocusedWindow)
                    }
                } else {
                    navigate('/', { state: { skipPageUpdate: true } })
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
                                  location: newWindow.location,
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
        setWindows((windows) => windows.map((w) => (w === appWindow ? { ...appWindow, minimized: true } : w)))
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

        if (appSettings[key]?.position?.topCenter) {
            // Check if desktop (screen width >= 768px)
            const isDesktop = !isSSR && window.innerWidth >= 768
            const topOffset = isDesktop ? 100 : 0

            return {
                x: isSSR ? 0 : window.innerWidth / 2 - size.width / 2,
                y: topOffset,
            }
        }

        if (key?.startsWith('ask-max')) {
            return {
                x: isSSR ? 0 : window.innerWidth - size.width - 20,
                y: isSSR ? 0 : window.innerHeight - size.height - 20,
            }
        }

        const sortedWindows = [...windows].sort((a, b) => b.zIndex - a.zIndex)
        const previousWindow = sortedWindows[0]

        if (previousWindow?.key === '/') {
            return getDesktopCenterPosition(size)
        }

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
        return lastClickedElementRect || undefined
    }

    function getInitialWindows(element: any) {
        if (isSSR) return [createNewWindow(element, [], location, isSSR, taskbarHeight)]
        const urlObj = new URL(location.href)
        const contact = urlObj.searchParams.get('contact')
        if (contact) {
            const initialWindowSize = { width: window.innerWidth * 0.58, height: window.innerHeight * 0.8 }
            const formWindowWidth = window.innerWidth * 0.4
            const formWindowSize = {
                width: formWindowWidth,
                height: formWindowWidth <= 545 ? 732 : 568,
            }
            const padding = [65, 20]

            const initialWindow = createNewWindow(element, [], location, isSSR, taskbarHeight, {
                size: initialWindowSize,
                position: { x: padding[0], y: padding[1] },
                zIndex: 2,
            })
            const formWindow = createNewWindow(
                <ContactSales location={{ pathname: `/talk-to-a-human` }} key="/talk-to-a-human" />,
                [],
                { pathname: `talk-to-a-human` },
                isSSR,
                taskbarHeight,
                {
                    size: formWindowSize,
                    position: {
                        x: window.innerWidth - formWindowSize.width - padding[0],
                        y: window.innerHeight - formWindowSize.height - padding[1] - taskbarHeight,
                    },
                    zIndex: 0,
                }
            )
            return [initialWindow, formWindow]
        }
        return [createNewWindow(element, [], location, isSSR, taskbarHeight)]
    }

    function getKey(key: string) {
        const experiment = appSettings[key]?.experiment
        if (!experiment?.flag) return key
        const assignedVariant = posthog?.getFeatureFlag?.(experiment?.flag)
        if (!assignedVariant) return key
        const keyToUse = Object.keys(appSettings).find(
            (key) =>
                appSettings[key]?.experiment?.flag === experiment?.flag &&
                appSettings[key]?.experiment?.variant === assignedVariant
        )
        return keyToUse || key
    }

    function createNewWindow(
        element: WindowElement,
        windows: AppWindow[],
        location: any,
        isSSR: boolean,
        taskbarHeight: number,
        options = {} as {
            size?: { width: number; height: number }
            position?: { x: number; y: number }
            zIndex?: number
        }
    ) {
        const keyToUse = getKey(element.key)
        const size = element.props?.location?.state?.size || element.props.size || getInitialSize(keyToUse)
        const position =
            element.props?.location?.state?.position ||
            element.props.position ||
            appSettings[keyToUse]?.position?.getPositionDefaults?.(size, windows, getDesktopCenterPosition) ||
            getPositionDefaults(keyToUse, size, windows)
        const settings = appSettings[keyToUse]
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
            appSettings: appSettings[keyToUse],
            location,
        }

        // Adjust width if window extends beyond right edge
        if (newWindow.position.x + newWindow.size.width > (isSSR ? 0 : window.innerWidth) - 20) {
            newWindow.size.width = isSSR ? 0 : window.innerWidth - newWindow.position.x - 20
        }

        // Adjust height if window extends beyond bottom edge
        if (newWindow.position.y + newWindow.size.height > (isSSR ? 0 : window.innerHeight) - taskbarHeight - 20) {
            newWindow.size.height = isSSR ? 0 : window.innerHeight - newWindow.position.y - taskbarHeight - 20
        }

        return { ...newWindow, ...options }
    }

    const updatePages = (element: WindowElement) => {
        const existingWindow = windows.find((w) => w.path === element.props.location.pathname)
        const newWindow = createNewWindow(element, windows, location, isSSR, taskbarHeight)

        if (siteSettings.experience === 'boring') {
            if (existingWindow) {
                return bringToFront(existingWindow, element.props.location)
            }
            if (newWindow.key.startsWith('/')) {
                return replaceFocusedWindow(newWindow)
            } else {
                return setWindows([...windows?.filter((w) => w.key !== newWindow.key), newWindow])
            }
        }

        if (existingWindow) {
            bringToFront(existingWindow, element.props.location)
        } else if (
            (element.props.newWindow || location?.state?.newWindow) &&
            !windows.some((w) => w.key === newWindow.key)
        ) {
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

    const openStart = ({ subdomain, initialTab }: { subdomain?: string; initialTab?: string }) => {
        addWindow(
            <Start
                subdomain={subdomain}
                initialTab={initialTab}
                location={{ pathname: `start` }}
                key="start"
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
        initialQuestion,
        codeSnippet,
    }: {
        path: string
        context?: ChatContext[]
        quickQuestions?: string[]
        chatId?: string
        date?: string
        initialQuestion?: string
        codeSnippet?: { code: string; language: string; sourceUrl: string }
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
                initialQuestion={initialQuestion}
                codeSnippet={codeSnippet}
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
        try {
            setSiteSettings(settings)
            const savedSettings = JSON.parse(localStorage.getItem('siteSettings') || '{}')
            localStorage.setItem(
                'siteSettings',
                JSON.stringify({
                    ...settings,
                    experience: compact ? savedSettings.experience || 'posthog' : settings.experience || 'posthog',
                })
            )
        } catch (error) {
            console.error('Failed to update site settings:', error)
        }
    }

    const animateClosingAllWindows = () => {
        setClosingAllWindowsAnimation(true)
    }

    const closeAllWindows = () => {
        setWindows([])
    }

    const copyDesktopParams = () => {
        if (!desktopParams) return
        try {
            navigator.clipboard.writeText(shareableDesktopURL)
            setDesktopCopied(true)
            setTimeout(() => {
                setDesktopCopied(false)
            }, 2000)
        } catch (error) {
            console.error(error)
            addToast({
                error: true,
                description: 'Failed to copy desktop link to clipboard',
                duration: 2000,
            })
        }
    }

    useEffect(() => {
        if (
            (location.key === 'initial' && location.pathname === '/' && isMobile) ||
            paramsWindows ||
            location.state?.skipPageUpdate
        ) {
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
                // Capture immediately on click to avoid forced reflow during window creation
                const rect = target.getBoundingClientRect()
                setLastClickedElementRect({ x: rect.left, y: rect.top })
            }
        }
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement

            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.shadowRoot ||
                (target instanceof HTMLElement && target.closest('.mdxeditor'))
            ) {
                return
            }

            // Global shortcuts
            if (e.key === '/' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                openSearch()
            }
            // Cmd+K (Mac) or Ctrl+K (Windows/Linux) for search
            if (e.key === 'k' && (e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey) {
                e.preventDefault()
                openSearch()
            }
            if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                e.preventDefault()
                openNewChat({ path: 'ask-max' })
            }
            if (e.key === ',' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                // Open display options
                navigate('/display-options', { state: { newWindow: true } })
            }
            if (e.key === '.' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                // Open keyboard shortcuts pane
                navigate('/kbd', { state: { newWindow: true } })
            }

            // Theme toggle with \ key (without Shift)
            if (e.key === '\\' && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                e.stopPropagation()

                // Cycle through system -> light -> dark -> system
                let nextMode: 'system' | 'light' | 'dark'
                let toastMessage: React.ReactNode

                if (siteSettings.colorMode === 'system') {
                    nextMode = 'light'
                    toastMessage = (
                        <>
                            <IconDay className="size-5 inline-block mr-1" />
                            Switched to light mode
                        </>
                    )
                } else if (siteSettings.colorMode === 'light') {
                    nextMode = 'dark'
                    toastMessage = (
                        <>
                            <IconNight className="size-5 inline-block mr-1" />
                            Switched to dark mode
                        </>
                    )
                } else {
                    nextMode = 'system'
                    toastMessage = (
                        <>
                            <IconLaptop className="size-5 inline-block mr-1" />
                            Switched to system mode
                        </>
                    )
                }

                if (typeof window !== 'undefined' && window.__setPreferredTheme) {
                    const newTheme = window.__setPreferredTheme(nextMode)
                    updateSiteSettings({
                        ...siteSettings,
                        theme: newTheme as SiteSettings['theme'],
                        colorMode: nextMode,
                    })
                    // Add toast notification
                    addToast({
                        description: toastMessage,
                        duration: 2000,
                    })
                }
            }

            // Wallpaper cycle with | key (which is Shift + \ on most keyboards)
            if (e.key === '|') {
                e.preventDefault()
                e.stopPropagation()

                // Get current wallpaper index
                const currentIndex = themeOptions.findIndex((theme) => theme.value === siteSettings.wallpaper)
                // Cycle to next wallpaper (wrap around to first if at end)
                const nextIndex = (currentIndex + 1) % themeOptions.length
                const nextWallpaper = themeOptions[nextIndex]

                updateSiteSettings({
                    ...siteSettings,
                    wallpaper: nextWallpaper.value as SiteSettings['wallpaper'],
                })

                // Add toast notification
                addToast({
                    description: `Switched to ${nextWallpaper.label} wallpaper`,
                    duration: 2000,
                })
            }

            // Window-specific shortcuts
            if (e.shiftKey && e.key === 'ArrowLeft') {
                handleSnapToSide('left')
            }
            if (e.shiftKey && e.key === 'ArrowRight') {
                handleSnapToSide('right')
            }
            if (e.shiftKey && e.key === 'ArrowUp') {
                expandWindow()
            }
            if (e.shiftKey && e.key === 'ArrowDown') {
                e.preventDefault()
                if (focusedWindow) {
                    minimizeWindow(focusedWindow)
                }
            }
            if (e.shiftKey && e.key.toLowerCase() === 'w') {
                e.preventDefault()
                if (focusedWindow) {
                    // Trigger the same close animation as clicking the X button
                    const closeEvent = new CustomEvent('windowClose', { detail: { windowKey: focusedWindow.key } })
                    document.dispatchEvent(closeEvent)
                }
            }
            if (e.shiftKey && e.key === 'X') {
                e.preventDefault()
                // Close all windows with animation
                animateClosingAllWindows()
            }
            if (e.shiftKey && e.key === 'Z') {
                e.preventDefault()
                // Start screensaver
                setScreensaverPreviewActive(true)
            }
            if (e.shiftKey && e.key === '<') {
                e.preventDefault()
                // Open active windows panel
                setIsActiveWindowsPanelOpen(true)
            }
            if (e.shiftKey && e.key === '>') {
                e.preventDefault()
                // Cycle to next window
                if (windows.length > 1) {
                    // Find the currently focused window index
                    const currentIndex = windows.findIndex((w) => w === focusedWindow)
                    // Calculate next window index (wrap around to first if at end)
                    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % windows.length
                    const nextWindow = windows[nextIndex]

                    // Navigate to the next window
                    if (nextWindow.path.startsWith('/')) {
                        navigate(`${nextWindow.path}${nextWindow.location?.search || ''}`)
                    } else {
                        bringToFront(nextWindow)
                    }
                }
            }
            if (e.shiftKey && e.key === 'C') {
                e.preventDefault()
                if (!desktopParams) return
                copyDesktopParams()
                addToast({
                    description: 'Desktop link copied to clipboard',
                    duration: 2000,
                })
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [
        handleSnapToSide,
        expandWindow,
        focusedWindow,
        closeWindow,
        openSearch,
        openNewChat,
        siteSettings,
        updateSiteSettings,
        addToast,
        animateClosingAllWindows,
        setScreensaverPreviewActive,
        minimizeWindow,
        setIsActiveWindowsPanelOpen,
        windows,
        bringToFront,
        setConfetti,
        confetti,
    ])

    useEffect(() => {
        if (siteSettings.skinMode) {
            document.body.setAttribute('data-skin', siteSettings.skinMode)
        }
        if (siteSettings.cursor) {
            updateCursor(siteSettings.cursor)
        }
        if (siteSettings.wallpaper) {
            document.body.setAttribute('data-wallpaper', siteSettings.wallpaper)
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
            // nosemgrep: javascript.browser.security.wildcard-postmessage-configuration.wildcard-postmessage-configuration - intentional for docs embedding, parent origin unknown, non-sensitive ready signal
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
            // nosemgrep: javascript.browser.security.wildcard-postmessage-configuration.wildcard-postmessage-configuration - intentional for docs embedding, parent origin unknown, non-sensitive navigation data
            window.parent.postMessage(
                {
                    type: 'internal-navigation',
                    url: location.pathname,
                },
                '*'
            )
        }
    }, [location.pathname])

    useEffect(() => {
        if (window) {
            const instanceCookie = document.cookie
                .split('; ')
                ?.filter((row) => row.startsWith('ph_current_instance='))
                ?.map((c) => c.split('=')?.[1])?.[0]
            if (instanceCookie) {
                setPosthogInstance(instanceCookie)
            }
        }
    }, [])

    const convertWindowsToPixels = (windows: any[]) => {
        const innerWidth = window.innerWidth
        const innerHeight = window.innerHeight

        return windows.map((win) => ({
            ...win,
            size: {
                width: (parseFloat(win.size.width) / 100) * innerWidth,
                height: (parseFloat(win.size.height) / 100) * innerHeight,
            },
            position: {
                x: (parseFloat(win.position.x) / 100) * innerWidth,
                y: (parseFloat(win.position.y) / 100) * (innerHeight - taskbarHeight),
            },
        }))
    }

    useEffect(() => {
        if (isSSR) return

        if (paramsWindows) {
            const [initialWindow, ...rest] = convertWindowsToPixels(parsed.windows)

            // Preserve non-windows query parameters when navigating
            const nonWindowsParams = { ...parsed }
            delete nonWindowsParams.windows
            const queryString =
                Object.keys(nonWindowsParams).length > 0 ? `?${qs.stringify(nonWindowsParams, { encode: false })}` : ''

            navigate(`${initialWindow.path}${queryString}`, {
                state: {
                    newWindow: true,
                    size: initialWindow.size,
                    position: initialWindow.position,
                    savedWindows: rest,
                },
            })
        }

        if (stateWindows) {
            const [nextWindow, ...rest] = stateWindows
            if (!nextWindow) return

            // Preserve query parameters from current URL when navigating to next window
            const currentParams = qs.parse(location.search.substring(1))
            delete currentParams.windows
            const queryString =
                Object.keys(currentParams).length > 0 ? `?${qs.stringify(currentParams, { encode: false })}` : ''

            navigate(`${nextWindow.path}${queryString}`, {
                state: {
                    newWindow: true,
                    size: nextWindow.size,
                    position: nextWindow.position,
                    savedWindows: rest.length > 0 ? rest : undefined,
                },
            })
        }
    }, [stateWindows])

    useEffect(() => {
        try {
            const lastReset = localStorage.getItem('lastReset')
            if (!lastReset) {
                const currentSiteSettings = JSON.parse(localStorage.getItem('siteSettings') || '{}')
                currentSiteSettings.experience = 'posthog'
                localStorage.setItem('lastReset', new Date().toISOString())
                localStorage.setItem('siteSettings', JSON.stringify(currentSiteSettings))
            }
        } catch (error) {
            console.error('Failed to reset site settings:', error)
        }
    }, [])

    useEffect(() => {
        const visibleWindows = windows.filter((window) => {
            if (window.minimized) return false

            const windowsAbove = windows.filter((w) => w !== window && w.zIndex > window.zIndex && !w.minimized)

            let coveredArea = 0
            const currentArea = window.size.width * window.size.height

            for (const windowAbove of windowsAbove) {
                const left = Math.max(window.position.x, windowAbove.position.x)
                const right = Math.min(
                    window.position.x + window.size.width,
                    windowAbove.position.x + windowAbove.size.width
                )
                const top = Math.max(window.position.y, windowAbove.position.y)
                const bottom = Math.min(
                    window.position.y + window.size.height,
                    windowAbove.position.y + windowAbove.size.height
                )

                if (left < right && top < bottom) {
                    coveredArea += (right - left) * (bottom - top)
                }
            }

            const coverageRatio = currentArea > 0 ? coveredArea / currentArea : 0
            return coverageRatio < 0.8
        })

        setWindowsInView(visibleWindows)
    }, [windows])

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
                taskbarRef,
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
                menu,
                openStart,
                animateClosingAllWindows,
                closingAllWindowsAnimation,
                setClosingAllWindowsAnimation,
                closeAllWindows,
                screensaverPreviewActive,
                setScreensaverPreviewActive,
                setConfetti,
                confetti,
                posthogInstance,
                desktopParams,
                copyDesktopParams,
                desktopCopied,
                shareableDesktopURL,
                windowsInView,
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
