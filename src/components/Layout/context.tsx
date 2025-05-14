import React, { createContext, useEffect, useMemo, useState } from 'react'
import menu, { docsMenu, getFilteredCompanyMenu } from '../../navs'
import { IMenu } from 'components/PostLayout/types'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { useActions } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import { useIsTeamMember } from 'hooks/useIsTeamMember'

export const Context = createContext<any>(undefined)

// Extend window type to include PostHog-specific properties
declare global {
    interface Window {
        __theme: string
        __onThemeChange: () => void
        __setPreferredTheme: (theme: string) => void
    }
}

function recursiveSearch(array: any[], value: string): boolean {
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
    const { pathname, search } = useLocation()
    const { setWebsiteTheme } = useActions(layoutLogic)
    const compact = typeof window !== 'undefined' && window !== window.parent
    const [fullWidthContent, setFullWidthContent] = useState<boolean>(
        compact || (typeof window !== 'undefined' && localStorage.getItem('full-width-content') === 'true')
    )
    const isTeamMember = useIsTeamMember()
    
    // Filter the menu items to only show Hogsites to team members
    const filteredMenu = useMemo(() => {
        return menu.map(menuItem => {
            if (menuItem.name === 'Company') {
                return getFilteredCompanyMenu(isTeamMember)
            }
            return menuItem
        })
    }, [isTeamMember])

    const hedgehogModeLocalStorage = useMemo(() => {
        // Only default it to be on if it's April 1st but still respect if they turned it off
        const today = new Date()
        const isAprilFirst = today.getMonth() === 3 && today.getDate() === 1
        let hedgehogModeLocalStorage = typeof window !== 'undefined' && localStorage.getItem('hedgehog-mode-enabled')

        if (isAprilFirst && typeof hedgehogModeLocalStorage !== 'string') {
            hedgehogModeLocalStorage = 'true'
        }

        return hedgehogModeLocalStorage
    }, [])


    const [hedgehogModeEnabled, _setHedgehogModeEnabled] = useState<boolean>(hedgehogModeLocalStorage === 'true')
    const [enterpriseMode, setEnterpriseMode] = useState(false)
    const [theoMode, setTheoMode] = useState(false)
    const [post, setPost] = useState<boolean>(false)
    
    // Use the filtered menu to find the parent
    const parent = useMemo(() => {
        if (other.parent) {
            return other.parent;
        }
        
        // Use type assertion to help TypeScript understand the structure
        return filteredMenu.find((menuItem: any) => {
            const currentURL = pathname;
            // Add type safety checks
            const menuUrl = menuItem?.url;
            const children = menuItem?.children;
            
            if (menuUrl && currentURL === menuUrl.split('?')[0]) {
                return true;
            }
            
            if (children) {
                return recursiveSearch(children, currentURL);
            }
            
            return false;
        });
    }, [other.parent, pathname, filteredMenu]);

    // Get the internal menu from the parent
    const internalMenu = parent ? (parent as any).children : undefined;

    // Find the active internal menu item
    const activeInternalMenu = useMemo(() => {
        if (other.activeInternalMenu) {
            return other.activeInternalMenu;
        }
        
        if (!internalMenu) {
            return undefined;
        }
        
        return internalMenu.find((menuItem: any) => {
            const currentURL = pathname;
            const menuUrl = menuItem?.url;
            const children = menuItem?.children;
            
            if (menuUrl && currentURL === menuUrl.split('?')[0]) {
                return true;
            }
            
            if (children) {
                return recursiveSearch(children, currentURL);
            }
            
            return false;
        });
    }, [other.activeInternalMenu, internalMenu, pathname]);

    useEffect(() => {
        localStorage.setItem('full-width-content', fullWidthContent + '')
    }, [fullWidthContent])


    const setHedgehogModeEnabled = (enabled: boolean) => {
        _setHedgehogModeEnabled(enabled)
        localStorage.setItem('hedgehog-mode-enabled', enabled + '')
    }

    useEffect(() => {
        if (compact) {
            window.parent.postMessage(
                {
                    type: 'internal-navigation',
                    url: pathname,
                },
                '*'
            )
        }
    }, [pathname])

    useEffect(() => {
        if (compact) {
            window.parent.postMessage(
                {
                    type: 'docs-active-menu',
                    activeMenuName: activeInternalMenu?.name,
                },
                '*'
            )
        }
    }, [activeInternalMenu])

    useEffect(() => {
        if (window) {
            setWebsiteTheme(window.__theme)
            window.__onThemeChange = () => {
                setWebsiteTheme(window.__theme)
            }
        }
        if (compact) {
            window.parent.postMessage(
                {
                    type: 'docs-ready',
                },
                '*'
            )

            window.parent.postMessage(
                {
                    type: 'docs-menu',
                    menu: docsMenu.children,
                },
                '*'
            )
        }

        const onMessage = (e: MessageEvent): void => {
            if (e.data.type === 'theme-toggle') {
                window.__setPreferredTheme(e.data.isDarkModeOn ? 'dark' : 'light')
                return
            }
            if (e.data.type === 'navigate') {
                navigate(e.data.url)
            }
        }

        window.addEventListener('message', onMessage)

        return () => window.removeEventListener('message', onMessage)
    }, [])

    useEffect(() => {
        if (enterpriseMode) {
            document.querySelector('body')?.setAttribute('style', 'font-family: Verdana !important')
        } else {
            document.querySelector('body')?.removeAttribute('style')
        }
    }, [enterpriseMode])

    useEffect(() => {
        if (pathname !== '/') {
            setEnterpriseMode(false)
        }
        if (pathname === '/' && search.includes('synergy=true')) {
            setEnterpriseMode(true)
        }
        if (
            ['/blog/', '/founders/', '/product-engineers/', '/newsletter/'].some((prefix) =>
                pathname.startsWith(prefix)
            )
        ) {
            setPost(true)
        } else {
            setPost(false)
            setTheoMode(false)
        }
    }, [pathname])

    // Log filteredMenu in dev mode for debugging
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('Layout Context: isTeamMember =', isTeamMember);
            console.log('Layout Context: filteredMenu =', filteredMenu);
        }
    }, [isTeamMember, filteredMenu]);

    return (
        <Context.Provider
            value={{
                menu: filteredMenu,
                parent,
                internalMenu,
                activeInternalMenu,
                fullWidthContent,
                setFullWidthContent,
                compact,
                enterpriseMode,
                setEnterpriseMode,
                theoMode,
                setTheoMode,
                post,
                hedgehogModeEnabled,
                setHedgehogModeEnabled,
            }}
        >
            {children}
        </Context.Provider>
    )
}
