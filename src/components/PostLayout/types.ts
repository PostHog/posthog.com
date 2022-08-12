import { IGatsbyImageData } from 'gatsby-plugin-image'

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
    name: string
    url?: string
    children?: IMenu[]
    className?: string
    handleLinkClick?: () => void
    topLevel?: boolean
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
    children: React.ReactNode
    sidebar?: React.ReactNode
    contentWidth?: number | string
    questions?: React.ReactNode
    menu?: IMenu[]
    article?: boolean
    title: string
    filePath?: string
    breadcrumb?: ICrumb[]
    hideSidebar?: boolean
    nextPost?: INextPost
    hideSurvey?: boolean
    hideSearch?: boolean
    menuTitle?: string | boolean
    contentContainerClassName?: string
}
