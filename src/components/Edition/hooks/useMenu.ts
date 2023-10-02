import { IMenu } from 'components/PostLayout/types'
import { useLocation } from '@reach/router'
import { useEffect, useMemo, useState } from 'react'
import { postsMenu } from '../../../navs/posts'

const existsInMenu = (pathname: string, children?: IMenu[]): boolean | undefined => {
    const root = pathname.split('/')[1]
    return (
        children &&
        children.some((child: IMenu) => pathname.startsWith(`/${root}`) || existsInMenu(pathname, child.children))
    )
}

export default function useMenu(): { activeMenu: IMenu[]; defaultMenu: IMenu[] } {
    const { pathname } = useLocation()

    const defaultMenu = useMemo(() => [{ name: 'All posts', url: '/posts' }, ...postsMenu], [])
    const getActiveMenu = () => {
        const menu = postsMenu.filter(
            ({ url, children }) =>
                url.startsWith(`/${pathname.split('/')[1]}`) ||
                children?.some(({ url }) => url.startsWith(`/${pathname.split('/')[1]}`))
        )
        if (menu.length === 1) return [{ name: menu[0].name }, ...(menu[0].children || [])] || defaultMenu
        return menu
    }
    const [activeMenu, setActiveMenu] = useState(getActiveMenu())

    useEffect(() => {
        if (pathname === '/posts') {
            setActiveMenu(defaultMenu)
        }
    }, [pathname])

    return { activeMenu, defaultMenu }
}
