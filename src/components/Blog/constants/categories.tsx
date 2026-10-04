import { GitHub, LinkedIn, Twitter } from 'components/Icons/Icons'
import { InlineCode } from 'components/InlineCode'
import React from 'react'
import blogTaxonomyJson from '@data/content-blog-taxonomy.json'
import type { BlogTaxonomy } from '~/data-layer/queries/content'

const blogTaxonomy = blogTaxonomyJson as BlogTaxonomy

export interface CategoryInterface {
    title: string
    slug: string
    link: string
    hideFromNavigation?: boolean
}

export const homeCategories = [
    'Product growth',
    'Startups',
    'CEO diaries',
    'Inside PostHog',
    'Engineering',
    'Using PostHog',
    'PostHog news',
    'General',
]

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

export const CategoryData = ({ type = 'categories' }: { type: 'categories' | 'tags' }): JSX.Element => {
    return (
        <ul className="list-none m-0 p-0 mt-1">
            {blogTaxonomy[type].map((value) => {
                return (
                    <li key={value}>
                        <InlineCode>{value}</InlineCode>
                    </li>
                )
            })}
        </ul>
    )
}
