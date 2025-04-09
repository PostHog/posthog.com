import { IMenu } from 'components/PostLayout/types'
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
    minimized: boolean
}

interface WindowProviderProps {
    children: React.ReactNode
    appWindow: AppWindow
    menu: IMenu[]
    setMenu: (menu: IMenu[]) => void
}

interface WindowContextType {
    appWindow?: AppWindow
    menu?: IMenu[]
    setMenu?: (menu: IMenu[]) => void
}

export const Context = createContext<WindowContextType>({})

export const Provider = ({ appWindow, menu, setMenu, children }: WindowProviderProps) => {
    return <Context.Provider value={{ appWindow, menu, setMenu }}>{children}</Context.Provider>
}

export const useWindow = (): WindowContextType => {
    const context = useContext(Context)

    if (!context) {
        throw new Error('useWindow must be used within a WindowProvider')
    }

    return context
}
