import { IMenu } from 'components/PostLayout/types'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import { useLocation } from '@reach/router'
import { useEffect, useMemo, useState } from 'react'

const existsInMenu = (pathname: string, children?: IMenu[]): boolean | undefined => {
    const root = pathname.split('/')[1]
    return (
        children &&
        children.some((child: IMenu) => pathname.startsWith(`/${root}`) || existsInMenu(pathname, child.children))
    )
}

export default function useMenu(): { activeMenu: IMenu[]; defaultMenu: IMenu[] } {
    const { pathname } = useLocation()
    const { categories } = useStaticQuery(graphql`
        {
            categories: allPostCategory(
                filter: { attributes: { posts: { data: { elemMatch: { id: { ne: null } } } } } }
            ) {
                nodes {
                    attributes {
                        label
                        folder
                        post_tags {
                            data {
                                attributes {
                                    label
                                    folder
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    const categoryMenu = categories.nodes.map(({ attributes: { label, folder: categoryFolder, post_tags } }) => {
        const children = post_tags?.data.map(({ attributes: { label } }) => {
            return {
                name: label,
                url: `/${categoryFolder}/${slugify(label, { lower: true, strict: true })}`,
            }
        })
        return {
            name: label,
            url: `/${categoryFolder}`,
            ...(children.length > 0 ? { children } : null),
        }
    })

    const defaultMenu = useMemo(() => [{ name: 'All posts', url: '/posts' }, ...categoryMenu], [])
    const getActiveMenu = () => {
        const menu = categoryMenu.filter(
            ({ url, children }) =>
                url.startsWith(`/${pathname.split('/')[1]}`) ||
                children?.some(({ url }) => url.startsWith(`/${pathname.split('/')[1]}`))
        )
        if (menu.length === 1) return menu[0].children || defaultMenu
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
