import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { AppWindow } from './Window'
import { WindowSearchUI } from 'components/SearchUI'
import { navigate } from 'gatsby'

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
})

const appSettings = {
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
                height: 400,
            },
            max: {
                width: 600,
                height: 400,
            },
            fixed: true,
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
    'community-auth': {
        size: {
            min: {
                width: 400,
                height: 400,
            },
            max: {
                width: 400,
                height: 400,
            },
            fixed: true,
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
    },
} as const

export const Provider = ({ children, element, location }: AppProviderProps) => {
    const constraintsRef = useRef<HTMLDivElement>(null)
    const [taskbarHeight, setTaskbarHeight] = useState(38)
    const [windows, setWindows] = useState<AppWindow[]>([])
    const [lastClickedElement, setLastClickedElement] = useState<HTMLElement | null>(null)
    const focusedWindow = useMemo(() => {
        return windows.reduce<AppWindow | undefined>(
            (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
            undefined
        )
    }, [windows])

    const closeWindow = useCallback(
        (item: AppWindow) => {
            const windowsFiltered = windows.filter((el) => el.key !== item.key)
            const nextFocusedWindow = windowsFiltered.reduce<AppWindow | undefined>(
                (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
                undefined
            )
            if (nextFocusedWindow) {
                navigate(nextFocusedWindow.path)
            } else {
                window.history.pushState({}, '', '/')
            }
            setWindows(windowsFiltered)
        },
        [windows]
    )

    const bringToFront = useCallback((item: AppWindow) => {
        setWindows((windows) =>
            windows.map((el) => ({
                ...el,
                zIndex: el === item ? windows.length : el.zIndex < item.zIndex ? el.zIndex : el.zIndex - 1,
                minimized: item === el ? false : el.minimized,
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
        setWindows((windows) => windows.map((w) => (w === appWindow ? { ...appWindow, minimized: true } : w)))
    }, [])

    const getWindowBasedSizeConstraints = () => {
        return {
            min: {
                width: window.innerWidth * 0.2,
                height: window.innerHeight * 0.2,
            },
            max: {
                width: window.innerWidth * 0.9,
                height: window.innerHeight * 0.9,
            },
        }
    }

    const getDesktopCenterPosition = (size: { width: number; height: number }) => {
        return {
            x: window.innerWidth / 2 - size.width / 2,
            y: (window.innerHeight - taskbarHeight) / 2 - size.height / 2,
        }
    }

    const getPositionDefaults = (key: string, size: { width: number; height: number }, windows: AppWindow[]) => {
        if (key.startsWith('ask-max')) {
            return {
                x: window.innerWidth - size.width - 20,
                y: window.innerHeight - size.height - 20,
            }
        }

        if (key === 'search') {
            return getDesktopCenterPosition(size)
        }

        const sortedWindows = [...windows].sort((a, b) => b.zIndex - a.zIndex)
        const previousWindow = sortedWindows[0]

        if (previousWindow && !previousWindow.key.startsWith('ask-max')) {
            const potentialX = previousWindow.position.x + 10

            const screenMidpoint = window.innerWidth / 2
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

    const getInitialSize = (key: string) => {
        const defaultSize =
            appSettings[key]?.size?.max ||
            (key.startsWith('ask-max')
                ? appSettings['ask-max']?.size?.max
                : {
                      width: window.innerWidth * 0.9,
                      height: window.innerHeight * 0.9,
                  })
        return {
            width: Math.min(defaultSize.width, window.innerWidth * 0.9),
            height: Math.min(defaultSize.height, window.innerHeight * 0.9),
        }
    }

    const getLastClickedElementRect = () => {
        const rect = lastClickedElement?.getBoundingClientRect()
        if (!rect) return undefined
        return {
            x: rect.left,
            y: rect.top,
        }
    }

    const updatePages = (element: WindowElement) => {
        const existingWindow = windows.find((w) => w.path === element.props.location.pathname)
        const size = getInitialSize(element.key)
        const position = getPositionDefaults(element.key, size, windows)
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
                      y: lastClickedElementRect.y - taskbarHeight - size.height / 2,
                  }
                : undefined,
            minimal: element.props.minimal ?? false,
        }

        // Adjust width if window extends beyond right edge
        if (newWindow.position.x + newWindow.size.width > window.innerWidth - 20) {
            newWindow.size.width = window.innerWidth - newWindow.position.x - 20
        }

        // Adjust height if window extends beyond bottom edge
        if (newWindow.position.y + newWindow.size.height > window.innerHeight - taskbarHeight - 20) {
            newWindow.size.height = window.innerHeight - newWindow.position.y - taskbarHeight - 20
        }

        if (existingWindow) {
            bringToFront(existingWindow)
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
        }
    ) => {
        setWindows((windows) =>
            windows.map((w) =>
                w === appWindow
                    ? {
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
                      }
                    : w
            )
        )
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
            size: { width: window.innerWidth, height: window.innerHeight - taskbarHeight },
            previousSize: focusedWindow.size,
            previousPosition: focusedWindow.position,
        })
    }

    useEffect(() => {
        updatePages(element)
    }, [element])

    useEffect(() => {
        const updateTaskbarHeight = () => {
            const height = document.querySelector('#taskbar')?.getBoundingClientRect().height || 0
            setTaskbarHeight(height)
        }

        updateTaskbarHeight()

        window.addEventListener('resize', updateTaskbarHeight)
        return () => window.removeEventListener('resize', updateTaskbarHeight)
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
