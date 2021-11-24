import { GitHub, LinkedIn, Twitter } from 'components/Icons/Icons'
import { graphql } from 'gatsby'
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

export const AuthorsFragment = graphql`
    fragment AuthorsFragment on MarkdownRemark {
        frontmatter {
            authors {
                handle
                name
                role
                image
                link_type
                link_url
            }
        }
        id
    }
`
