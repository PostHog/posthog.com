import twitterIcon from '../../../images/icons/twitter.svg'
import linkedInIcon from '../../../images/icons/linkedin.svg'
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
        title: 'Company & culture',
        slug: 'company-and-culture',
        link: '/blog/categories/company-and-culture',
    },
    {
        title: 'Engineering',
        slug: 'engineering',
        link: '/blog/categories/engineering',
    },
    {
        title: 'Release notes',
        slug: 'release-notes',
        link: '/blog/categories/release-notes',
    },
]

interface LinksInterface {
    icon: string
    label: string
}
interface SocialLinksInterface {
    [key: string]: LinksInterface
}

export const socialLinks: SocialLinksInterface = {
    twitter: { icon: twitterIcon, label: 'Twitter' },
    linkedin: { icon: linkedInIcon, label: 'LinkedIn' },
}
