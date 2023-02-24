import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

export interface ITopic {
    name: string
    url: string
    state?: any
}

export interface IContributor {
    image: IGatsbyImageData | undefined
    name: string
    url?: string
    state?: any
}

export interface IMenu {
    icon?: string
    name: string
    url?: string
    children?: IMenu[]
    className?: string
    handleLinkClick?: () => void
    topLevel?: boolean
    menuType?: 'scroll' | 'standard'
    badge?: {
        title: string
        className?: string
    }
}

export interface ICrumb {
    name: string
    url: string
}

export interface ISidebarAction {
    children: React.ReactNode
    title: string
    width?: number | string
    className?: string
    href?: string
    onClick?: () => void
}

export interface INextPost {
    contentContainerClasses?: string
    excerpt: string
    frontmatter?: {
        title: string
    }
    fields?: {
        slug: string
    }
}

export interface IProps {
    tableOfContents?: {
        url: string
        value: string
        depth: number
    }[]
    sidebar?: React.ReactNode
    contentWidth?: number | string
    questions?: React.ReactNode
    menu?: IMenu[]
    title: string
    filePath?: string
    breadcrumb?: ICrumb[]
    hideSidebar?: boolean
    nextPost?: INextPost
    hideSurvey?: boolean
    hideSearch?: boolean
    contentContainerClassName?: string
    menuType?: 'scroll' | 'standard'
    menuWidth?: {
        left?: number
        right?: number
    }
    searchFilter?: string
    mobileMenu?: boolean
    darkMode?: boolean
    fullWidthContent?: boolean
    setFullWidthContent?: (fullWidth: boolean) => void
    contentContainerClasses?: string
    stickySidebar?: boolean
}
