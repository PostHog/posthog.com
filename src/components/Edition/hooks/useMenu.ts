import { IMenu } from 'components/PostLayout/types'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import { useLocation } from '@reach/router'
import { useEffect, useState } from 'react'

const existsInMenu = (pathname: string, children?: IMenu[]): boolean | undefined => {
    const root = pathname.split('/')[1]
    return (
        children &&
        children.some((child: IMenu) => pathname.startsWith(`/${root}`) || existsInMenu(pathname, child.children))
    )
}

export default function useMenu(): IMenu[] {
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
        return {
            name: label,
            url: `/${categoryFolder}`,
            children: post_tags?.data.map(({ attributes: { label } }) => {
                return {
                    name: label,
                    url: `/${categoryFolder}/${slugify(label, { lower: true, strict: true })}`,
                }
            }),
        }
    })
    const defaultMenu = [{ name: 'All posts', url: '/posts' }, ...categoryMenu]
    const [activeMenu, setActiveMenu] = useState(
        categoryMenu.filter(({ url }) => url.startsWith(`/${pathname.split('/')[1]}`))
    )

    useEffect(() => {
        if (pathname === '/posts') {
            setActiveMenu(defaultMenu)
        }
    }, [pathname])

    return activeMenu.length > 0 ? activeMenu : defaultMenu
}
