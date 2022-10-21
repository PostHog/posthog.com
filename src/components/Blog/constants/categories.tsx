import { GitHub, LinkedIn, Twitter } from 'components/Icons/Icons'
import React from 'react'
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
        title: 'Inside PostHog',
        slug: 'inside-posthog',
        link: '/blog/categories/inside-posthog',
    },
    {
        title: 'Product updates',
        slug: 'product-updates',
        link: '/blog/categories/product-updates',
    },
    {
        title: 'Guides',
        slug: 'guides',
        link: '/blog/categories/guides',
    },
    {
        title: 'Startups',
        slug: 'startups',
        link: '/blog/categories/startups',
    },
    {
        title: 'Open source',
        slug: 'open-source',
        link: '/blog/categories/open-source',
    },
    {
        title: 'CEO diaries',
        slug: 'ceo-diaries',
        link: '/blog/categories/ceo-diaries',
    },
]

interface LinksInterface {
    icon: JSX.Element
    label: string
}
interface SocialLinksInterface {
    [key: string]: LinksInterface
}

export const socialLinks: SocialLinksInterface = {
    twitter: { icon: <Twitter />, label: 'Twitter' },
    linkedin: { icon: <LinkedIn />, label: 'LinkedIn' },
    github: { icon: <GitHub />, label: 'GitHub' },
}
