export interface FeaturesPageData {
    key: string
    title: string
    href: string
    icon: string
}

export interface FeatureComparisonData {
    title: string
    posthog: boolean
    amplitude: boolean
    mixpanel: boolean
    heap: boolean
}

export interface LibraryPluginType {
    id: number
    name: string
    description?: string
    url: string
    imageLink: string
    maintainer?: string
}

export interface MenuProps {
    blogArticleSlug?: string
    isHomePage?: boolean
    activeKey: string
}

export interface MenuQueryNodeType {
    node: {
        name: string
        link: string
        a: string
    }
}

export interface MenuQueryType {
    allMenuItemsJson: {
        edges: MenuQueryNodeType[]
    }
}

export interface Contributor {
    login: string
    name: string
    avatar_url: string
    profile: string
    contributions: string[]
    level: number
    mvpWins: number
}

export interface AuthorsData {
    handle: string
    image: string
    link_type: 'twitter' | 'linkedin' | 'github'
    link_url: string
    name: string
    role: string
}

export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
