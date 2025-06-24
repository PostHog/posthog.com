import { IMenu } from 'components/PostLayout/types'
import React, { createContext, useContext } from 'react'
import { AppSetting } from './App'

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
    path: string
    fromHistory?: boolean
    props: any
    ref?: React.RefObject<HTMLDivElement>
    sizeConstraints: {
        min: {
            width: number
            height: number
        }
        max: {
            width: number
            height: number
        }
    }
    positionDefaults?: {
        x: number
        y: number
    }
    size: {
        width: number
        height: number
    }
    previousSize: {
        width: number
        height: number
    }
    position: {
        x: number
        y: number
    }
    previousPosition: {
        x: number
        y: number
    }
    fixedSize: boolean
    fromOrigin?: {
        x: number
        y: number
    }
    minimal: boolean
    appSettings?: AppSetting
}

interface WindowProviderProps {
    children: React.ReactNode
    appWindow: AppWindow
    menu: IMenu[]
    setMenu: (menu: IMenu[]) => void
    goBack: () => void
    goForward: () => void
    canGoBack: boolean
    canGoForward: boolean
    dragControls?: any
}

interface WindowContextType {
    appWindow?: AppWindow
    menu?: IMenu[]
    setMenu?: (menu: IMenu[]) => void
    goBack: () => void
    goForward: () => void
    canGoBack: boolean
    canGoForward: boolean
    dragControls?: any
}

export const Context = createContext<WindowContextType>({
    goBack: () => {
        // No-op default implementation
    },
    goForward: () => {
        // No-op default implementation
    },
    canGoBack: false,
    canGoForward: false,
})

export const Provider = ({
    appWindow,
    menu,
    setMenu,
    children,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    dragControls,
}: WindowProviderProps) => {
    return (
        <Context.Provider
            value={{ appWindow, menu, setMenu, goBack, goForward, canGoBack, canGoForward, dragControls }}
        >
            {children}
        </Context.Provider>
    )
}

export const useWindow = (): WindowContextType => {
    const context = useContext(Context)

    if (!context) {
        throw new Error('useWindow must be used within a WindowProvider')
    }

    return context
}
