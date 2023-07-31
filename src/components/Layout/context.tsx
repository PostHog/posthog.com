import React, { createContext, useEffect, useState } from 'react'
import menu from '../../navs'
import { IMenu } from 'components/PostLayout/types'
import { useLocation } from '@reach/router'

export const Context = createContext<any>(undefined)

function recursiveSearch(array, value) {
    for (let i = 0; i < array?.length || 0; i++) {
        const element = array[i]

        if (typeof element === 'string' && element.split('?')[0] === value) {
            return true
        }

        if (typeof element === 'object' && element !== null) {
            const found = recursiveSearch(Object.values(element), value)
            if (found) {
                return true
            }
        }
    }

    return false
}

export interface IProps {
    children: React.ReactNode
    parent?: IMenu
    activeInternalMenu?: IMenu
}

export const LayoutProvider = ({ children, ...other }: IProps) => {
    const { pathname } = useLocation()
    const [fullWidthContent, setFullWidthContent] = useState<boolean>(
        typeof window !== 'undefined' && localStorage.getItem('full-width-content') === 'true'
    )
    const parent =
        other.parent ??
        menu.find(({ children, url }) => {
            const currentURL = pathname
            return currentURL === url.split('?')[0] || recursiveSearch(children, currentURL)
        })

    const internalMenu = parent?.children

    const activeInternalMenu =
        other.activeInternalMenu ??
        internalMenu?.find((menuItem) => {
            const currentURL = pathname
            return currentURL === menuItem.url?.split('?')[0] || recursiveSearch(menuItem.children, currentURL)
        })

    useEffect(() => {
        localStorage.setItem('full-width-content', fullWidthContent + '')
    }, [fullWidthContent])

    return (
        <Context.Provider
            value={{ menu, parent, internalMenu, activeInternalMenu, fullWidthContent, setFullWidthContent }}
        >
            {children}
        </Context.Provider>
    )
}
