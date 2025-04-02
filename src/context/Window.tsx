import React, { createContext, useContext } from 'react'

export interface AppWindow {
    element: React.ReactNode
    key: string
    zIndex: number
    meta?: {
        title: string
    }
    coordinates?: {
        x: number
        y: number
    }
}

interface WindowProviderProps {
    children: React.ReactNode
    appWindow: AppWindow
}

interface WindowContextType {
    appWindow?: AppWindow
}

export const Context = createContext<WindowContextType>({})

export const Provider = ({ appWindow, children }: WindowProviderProps) => {
    return <Context.Provider value={{ appWindow }}>{children}</Context.Provider>
}

export const useWindow = (): WindowContextType => {
    const context = useContext(Context)

    if (!context) {
        throw new Error('useWindow must be used within a WindowProvider')
    }

    return context
}
