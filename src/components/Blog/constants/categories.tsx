import twitterIcon from '../../../images/icons/twitter-white.svg'
import linkedInIcon from '../../../images/icons/linkedin-white.svg'
import githubIcon from '../../../images/icons/github-white.svg'

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
    {
        title: 'CEO diary',
        slug: 'ceo-diaries',
        link: '/blog/categories/ceo-diaries',
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
    github: { icon: githubIcon, label: 'GitHub' },
}
