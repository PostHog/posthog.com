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
    isBlogArticlePage?: boolean
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
