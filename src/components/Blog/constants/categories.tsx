export interface CategoryInterface {
    title: string
    slug: string
    link: string
    hideFromNavigation?: boolean
}

export const BlogCategories: CategoryInterface[] = [
    {
        title: 'All',
        slug: 'blog',
        link: '/blog',
    },
    {
        title: 'General',
        slug: 'general',
        link: '/blog/categories/general',
    },
    {
        title: 'Company & Culture',
        slug: 'company-and-culture',
        link: '/blog/categories/company-and-culture',
    },
    {
        title: 'Engineering',
        slug: 'engineering',
        link: '/blog/categories/engineering',
    },
    {
        title: 'Release Notes',
        slug: 'release-notes',
        link: '/blog/categories/release-notes',
    },
]
