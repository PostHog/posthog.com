import { IMenu } from 'components/PostLayout/types'
import React, { createContext, useContext } from 'react'
import { AppSetting, MenuItem } from './App'
import { MenuItemType } from 'components/RadixUI/MenuBar'

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
    location?: Location
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
    setPageOptions: (pageOptions: MenuItemType[]) => void
    setActiveInternalMenu: (activeInternalMenu: MenuItem) => void
    internalMenu: MenuItem[]
    activeInternalMenu?: MenuItem
    parent: MenuItem
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
    setPageOptions: (pageOptions: MenuItemType[]) => void
    setActiveInternalMenu: (activeInternalMenu: MenuItem) => void
    internalMenu: MenuItem[]
    activeInternalMenu?: MenuItem
    parent: MenuItem
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
    setPageOptions: () => {
        // No-op default implementation
    },
    setActiveInternalMenu: () => {
        // No-op default implementation
    },
    internalMenu: [],
    activeInternalMenu: {
        name: '',
        url: '',
    },
    parent: {
        name: '',
        url: '',
        children: [],
    },
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
    setPageOptions,
    setActiveInternalMenu,
    internalMenu,
    activeInternalMenu,
    parent,
}: WindowProviderProps) => {
    return (
        <Context.Provider
            value={{
                appWindow,
                menu,
                setMenu,
                goBack,
                goForward,
                canGoBack,
                canGoForward,
                dragControls,
                setPageOptions,
                setActiveInternalMenu,
                internalMenu,
                activeInternalMenu,
                parent,
            }}
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
