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
