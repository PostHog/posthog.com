import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { AppWindow } from './Window'

interface AppContextType {
    windows: AppWindow[]
    closeWindow: (item: AppWindow) => void
    bringToFront: (item: AppWindow) => void
    setWindowTitle: (appWindow: AppWindow, title: string) => void
    focusedWindow?: AppWindow
    location: any
    minimizeWindow: (appWindow: AppWindow) => void
}

interface AppProviderProps {
    children: React.ReactNode
    location: any
    element: {
        element: React.ReactNode
        key: string
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
})

export const Provider = ({ children, element, location }: AppProviderProps) => {
    const [windows, setWindows] = useState<AppWindow[]>([])
    const focusedWindow = useMemo(() => {
        return windows.reduce<AppWindow | undefined>(
            (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
            undefined
        )
    }, [windows])

    const closeWindow = (item: AppWindow) => {
        const newWindows = windows.filter((el) => el !== item)
        setWindows(newWindows)
    }

    const bringToFront = (item: AppWindow) => {
        const newWindows = windows.map((el) => ({
            ...el,
            zIndex: el === item ? windows.length : el.zIndex < item.zIndex ? el.zIndex : el.zIndex - 1,
            minimized: item === el ? false : el.minimized,
        }))
        setWindows(newWindows)
    }

    const replaceFocusedWindow = (newWindow: AppWindow) => {
        if (focusedWindow) {
            setWindows(windows.map((w) => (w === focusedWindow ? { ...w, element: newWindow.element } : w)))
        } else {
            setWindows([...windows, newWindow])
        }
    }

    const setWindowTitle = (appWindow: AppWindow, title: string) => {
        const newWindows = windows.map((w) => (w === appWindow ? { ...appWindow, meta: { title } } : w))
        setWindows(newWindows)
    }

    const minimizeWindow = (appWindow: AppWindow) => {
        const newWindows = windows.map((w) => (w === appWindow ? { ...appWindow, minimized: true } : w))
        setWindows(newWindows)
    }

    useEffect(() => {
        const existingWindow = windows.find((w) => w.key === element.key)
        const newWindow: AppWindow = {
            element,
            zIndex: windows.length,
            key: element.key,
            coordinates: location?.state?.coordinates || { x: 0, y: 0 },
            minimized: false,
        }

        if (existingWindow) {
            bringToFront(existingWindow)
        } else if (location?.state?.newWindow) {
            setWindows([...windows, newWindow])
        } else {
            replaceFocusedWindow(newWindow)
        }
    }, [element])

    return (
        <Context.Provider
            value={{ windows, closeWindow, bringToFront, setWindowTitle, focusedWindow, location, minimizeWindow }}
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
