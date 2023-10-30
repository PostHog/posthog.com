import React, { createContext, useEffect, useState } from 'react'
import { IProps } from './types'
import { useLayoutData } from 'components/Layout/hooks'

export const Context = createContext<IProps | undefined>(undefined)

type ProviderProps = {
    value: IProps
    children: React.ReactNode
}

export const defaultMenuWidth = { left: 265, right: 265 }

export const PostProvider: React.FC<ProviderProps> = ({
    value: {
        menuWidth = defaultMenuWidth,
        contentContainerClassName = '',
        menuType = 'standard',
        mobileMenu = true,
        darkMode = true,
        hideSidebar,
        sidebar,
        ...other
    },
    children,
}) => {
    const { activeInternalMenu, fullWidthContent } = useLayoutData()

    const menu = other.menu || activeInternalMenu?.children

    const tableOfContents = other.tableOfContents?.filter((item) => item.depth > -1 && item.depth < 2)
    const contentContainerClasses =
        contentContainerClassName ||
        `px-5 lg:px-6 xl:px-12 pt-6 pb-12 transition-all ${menu ? 'mx-auto' : 'lg:ml-auto'}`

    return (
        <Context.Provider
            value={{
                ...other,
                menuWidth,
                contentContainerClassName,
                menuType,
                mobileMenu,
                darkMode,
                fullWidthContent: other.fullWidthContent ?? fullWidthContent,
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
