import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { AppWindow } from './Window'

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
        updates: { position?: { x?: number; y?: number }; size?: { width?: number; height?: number } }
    ) => void
    getPositionDefaults: (
        key: string,
        size: { width: number; height: number },
        windows: AppWindow[]
    ) => { x: number; y: number }
    getSizeDefaults: (key: string) => { max: { width: number; height: number }; min: { width: number; height: number } }
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
    getSizeDefaults: () => ({ max: { width: 0, height: 0 }, min: { width: 0, height: 0 } }),
})

const appSettings = {
    '/': {
        sizeDefaults: {
            min: {
                width: 700,
                height: 500,
            },
            max: {
                width: 800,
                height: 1000,
            },
        },
        fixedSize: true,
    },
    '/start': {
        sizeDefaults: {
            max: {
                width: 850,
                height: 580,
            },
            min: {
                width: 850,
                height: 580,
            },
        },
        fixedSize: true,
    },
    '/signup': {
        sizeDefaults: {
            max: {
                width: 900,
                height: 750,
            },
            min: {
                width: 900,
                height: 750,
            },
        },
        fixedSize: true,
    },
    '/display-options': {
        sizeDefaults: {
            max: {
                width: 600,
                height: 400,
            },
            min: {
                width: 600,
                height: 400,
            },
        },
        fixedSize: true,
    },
    '/why': {
        sizeDefaults: {
            max: {
                width: 750,
                height: 575,
            },
            min: {
                width: 750,
                height: 575,
            },
        },
        fixedSize: true,
    },
    '/demo': {
        sizeDefaults: {
            max: {
                width: 960,
                height: 682,
            },
            min: {
                width: 960,
                height: 682,
            },
        },
        fixedSize: true,
    },
    'ask-max': {
        sizeDefaults: {
            max: {
                width: 400,
                height: 600,
            },
            min: {
                width: 400,
                height: 600,
            },
        },
    },
    'community-auth': {
        sizeDefaults: {
            max: {
                width: 400,
                height: 369,
            },
            min: {
                width: 400,
                height: 369,
            },
        },
        fixedSize: true,
    },
} as const

export const Provider = ({ children, element, location }: AppProviderProps) => {
    const [taskbarHeight, setTaskbarHeight] = useState(0)
    const [windows, setWindows] = useState<AppWindow[]>([])
    const focusedWindow = useMemo(() => {
        return windows.reduce<AppWindow | undefined>(
            (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
            undefined
        )
    }, [windows])

    const closeWindow = useCallback((item: AppWindow) => {
        setWindows((windows) => windows.filter((el) => el.key !== item.key))
    }, [])

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

    const getSizeDefaults = (
        key: string
    ): { max: { width: number; height: number }; min: { width: number; height: number } } => {
        return (
            appSettings[key]?.sizeDefaults ||
            (key.startsWith('ask-max')
                ? appSettings['ask-max']?.sizeDefaults
                : {
                      max: {
                          width: window.innerWidth * 0.9,
                          height: window.innerHeight * 0.9,
                      },
                      min: {
                          width: window.innerWidth * 0.2,
                          height: window.innerHeight * 0.2,
                      },
                  })
        )
    }

    const getPositionDefaults = (key: string, size: { width: number; height: number }, windows: AppWindow[]) => {
        if (key.startsWith('ask-max')) {
            return {
                x: window.innerWidth - size.width - 20,
                y: window.innerHeight - size.height - 20,
            }
        }

        const sortedWindows = [...windows].sort((a, b) => b.zIndex - a.zIndex)
        const previousWindow = sortedWindows[0]

        if (previousWindow && !previousWindow.key.startsWith('ask-max')) {
            const ref = previousWindow.ref?.current
            if (ref) {
                const rect = ref.getBoundingClientRect()
                return {
                    x: rect.left + 10,
                    y: rect.top + 10,
                }
            }
        }

        return {
            x: window.innerWidth / 2 - size.width / 2,
            y: window.innerHeight / 2 - size.height / 2,
        }
    }

    const updatePages = (element: WindowElement) => {
        const existingWindow = windows.find((w) => w.path === element.props.location.pathname)
        const sizeDefaults = getSizeDefaults(element.key)
        const size = sizeDefaults.max
        const position = getPositionDefaults(element.key, size, windows)

        const newWindow: AppWindow = {
            element,
            zIndex: windows.length,
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
            position,
            sizeDefaults,
            fixedSize: appSettings[element.key]?.fixedSize || false,
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
                      }
                    : w
            )
        )
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
                getSizeDefaults,
                updateWindow,
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
