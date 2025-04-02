import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppWindow } from './Window'

interface AppContextType {
    windows: AppWindow[]
    handleClose: (item: AppWindow) => void
    bringToFront: (item: AppWindow) => void
    setWindowTitle: (appWindow: AppWindow, title: string) => void
    focusedWindow?: AppWindow
}

interface AppProviderProps {
    children: React.ReactNode
    element: {
        element: React.ReactNode
        key: string
    }
}

export const Context = createContext<AppContextType>({
    windows: [],
    handleClose: () => {},
    bringToFront: () => {},
    setWindowTitle: () => null,
    focusedWindow: undefined,
})

export const Provider = ({ children, element }: AppProviderProps) => {
    const [windows, setWindows] = useState<AppWindow[]>([])
    const focusedWindow = windows.reduce<AppWindow | undefined>(
        (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
        undefined
    )

    const handleClose = (item: AppWindow) => {
        const newWindows = windows.filter((el) => el !== item)
        setWindows(newWindows)
    }

    const bringToFront = (item: AppWindow) => {
        const newWindows = windows.map((el) => ({
            ...el,
            zIndex: el === item ? windows.length : el.zIndex < item.zIndex ? el.zIndex : el.zIndex - 1,
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

    useEffect(() => {
        const existingWindow = windows.find((w) => w.key === element.key)
        const newWindow: AppWindow = {
            element,
            zIndex: windows.length,
            key: element.key,
        }

        if (existingWindow) {
            bringToFront(existingWindow)
        } else {
            replaceFocusedWindow(newWindow)
        }
    }, [element])

    return (
        <Context.Provider value={{ windows, handleClose, bringToFront, setWindowTitle, focusedWindow }}>
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
