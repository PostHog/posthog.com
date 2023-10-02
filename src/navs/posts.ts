import { IMenu } from 'components/PostLayout/types'

export const postsMenu: IMenu[] = [
    {
        name: 'Blog',
        url: '/blog',
        children: [
            {
                name: 'Product updates',
                url: '/blog/product-updates',
            },
        ],
    },
    {
        name: 'Guides',
        url: '/tutorials',
        children: [
            {
                name: 'Actions',
                url: '/tutorials/actions',
            },
        ],
    },
]
