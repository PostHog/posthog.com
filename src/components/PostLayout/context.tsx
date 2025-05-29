import React, { createContext, useEffect, useMemo, useState } from 'react'
import { IProps } from './types'
import { useLayoutData } from 'components/Layout/hooks'
import useDataPipelinesNav from '../../navs/useDataPipelinesNav'

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
        askMax = false,
        ...other
    },
    children,
}) => {
    const dynamicMenus = useMemo(
        () => ({
            'data-pipeline-destinations': useDataPipelinesNav({ type: 'destination' }),
            'data-pipeline-transformations': useDataPipelinesNav({ type: 'transformation' }),
        }),
        []
    )
    const { activeInternalMenu, fullWidthContent } = useLayoutData()

    const menu = useMemo(() => {
        const menu = other.menu || activeInternalMenu?.children
        const isLabel = (item: any) => !item?.url && item?.name
        return menu?.map((item) => {
            if (item.dynamicChildren && dynamicMenus[item.dynamicChildren]) {
                const newChildren = []
                for (const child of [...item.children, ...dynamicMenus[item.dynamicChildren]]) {
                    if (isLabel(child)) {
                        newChildren.push([child])
                    } else {
                        const lastMenuItem = newChildren[newChildren.length - 1]
                        if (!lastMenuItem) {
                            newChildren.push([child])
                        } else {
                            const lastChild = lastMenuItem[lastMenuItem.length - 1]
                            if (isLabel(lastChild)) {
                                newChildren.push([child])
                            } else {
                                lastMenuItem.push(child)
                            }
                        }
                    }
                }
                newChildren.forEach((child) => {
                    child.sort((a, b) => {
                        if (!a.url || !b.url) return 0
                        return a.name.localeCompare(b.name)
                    })
                })
                return { ...item, children: newChildren.flat() }
            }
            return item
        })
    }, [other.menu, activeInternalMenu])

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
                askMax,
                contentContainerClasses,
                tableOfContents,
            }}
        >
            {children}
        </Context.Provider>
    )
}
