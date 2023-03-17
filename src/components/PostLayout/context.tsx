import React, { createContext, useState } from 'react'
import { IProps } from './types'

export const Context = createContext<IProps | undefined>(undefined)

type ProviderProps = {
    value: IProps
    children: React.ReactNode
}

export const defaultMenuWidth = { left: 265, right: 265 }

export const PostProvider: React.FC<ProviderProps> = ({
    value: {
        contentWidth = 650,
        menuWidth = defaultMenuWidth,
        contentContainerClassName = '',
        menuType = 'standard',
        mobileMenu = true,
        darkMode = true,
        hideSidebar,
        sidebar,
        menu,
        ...other
    },
    children,
}) => {
    const [fullWidthContent, setFullWidthContent] = useState<boolean>(hideSidebar || !sidebar)
    const tableOfContents = other.tableOfContents?.filter((item) => item.depth > -1 && item.depth < 2)
    const contentContainerClasses =
        contentContainerClassName ||
        `px-5 lg:px-6 xl:px-12 w-full transition-all ${
            hideSidebar ? 'lg:max-w-5xl' : !fullWidthContent ? 'lg:max-w-3xl' : 'lg:max-w-full'
        } ${menu ? 'mx-auto' : 'lg:ml-auto'}`
    return (
        <Context.Provider
            value={{
                ...other,
                contentWidth,
                menuWidth,
                contentContainerClassName,
                menuType,
                mobileMenu,
                darkMode,
                fullWidthContent,
                setFullWidthContent,
                hideSidebar,
                sidebar,
                menu,
                contentContainerClasses,
                tableOfContents,
            }}
        >
            {children}
        </Context.Provider>
    )
}
