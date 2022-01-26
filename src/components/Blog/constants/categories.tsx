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
        title: 'Product Updates',
        slug: 'product-updates',
        link: '/blog/categories/product-updates',
    },
    {
        title: 'Engineering',
        slug: 'engineering',
        link: '/blog/categories/engineering',
    },
    {
        title: 'Product Analytics',
        slug: 'product-analytics',
        link: '/blog/categories/product-analytics',
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
