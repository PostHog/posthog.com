import React, { useMemo } from 'react'
import useProduct from './useProduct'
import { useDocsNavigation } from './useDocsNavigation'
import {
    IconGraph,
    IconRewindPlay,
    IconToggle,
    IconFlask,
    IconMessages,
    IconTarget,
    IconRocket,
    IconBook,
    IconMap,
    IconGraduationCap,
    IconNewspaper,
    IconQuestion,
    IconPeople,
    IconHandMoney,
    IconCode,
    IconSparkles,
    IconHome,
} from '@posthog/icons'

interface NavItem {
    name: string
    url?: string
    icon?: React.ReactNode
    children?: NavItem[]
    type?: 'scroll' | 'link' // scroll = in-page anchor, link = external URL
}

interface DocsNavItem {
    name: string
    url: string
}

interface DocsConfig {
    basePath: string
    children?: DocsNavItem[]
    dynamic?: boolean // If true, fetch from docsMenu
}

interface ProductNavigationConfig {
    // In-page sections (scroll to)
    overview?: boolean
    features?: boolean
    customers?: boolean
    demos?: boolean // videos
    pricing?: boolean
    compare?: boolean
    postHogOnPostHog?: boolean
    pairsWith?: boolean

    // External links - docs can be dynamic
    docs?: string | boolean | DocsConfig
    roadmap?: string | boolean
    tutorials?: string | boolean
    changelog?: string | boolean
    forums?: string | boolean
    people?: string | boolean
    getStarted?: string | boolean
}

interface UseProductNavigationProps {
    productHandle: string
    basePath?: string // e.g., "/llm-analytics"
    config?: ProductNavigationConfig
}

interface ProductNavigation {
    name: string
    url: string
    docsUrl?: string // The docs URL for this product (e.g., /docs/llm-analytics)
    icon?: React.ReactNode
    children: NavItem[]
}

/**
 * Generates product-specific navigation menu
 * Combines in-page scroll sections with external links
 */
// Helper to convert docs nav format to our NavItem format
function convertDocsNavItem(item: any): NavItem {
    // Items without URL are section headers
    if (!item.url) {
        return {
            name: item.name,
            type: 'link',
        }
    }

    const navItem: NavItem = {
        name: item.name,
        url: item.url,
        type: 'link',
    }

    // Recursively convert children
    if (item.children && item.children.length > 0) {
        navItem.children = item.children.map(convertDocsNavItem)
    }

    return navItem
}

export function useProductNavigation({
    productHandle,
    basePath,
    config = {},
}: UseProductNavigationProps): ProductNavigation {
    const productData = useProduct({ handle: productHandle }) as any

    // Get dynamic docs path if configured
    const docsPath =
        typeof config.docs === 'object' && config.docs !== null && 'basePath' in config.docs
            ? config.docs.basePath
            : null
    const useDynamicDocs =
        typeof config.docs === 'object' && config.docs !== null && 'dynamic' in config.docs
            ? config.docs.dynamic
            : false

    // Fetch docs navigation dynamically if configured
    const docsNavigation = useDocsNavigation(useDynamicDocs && docsPath ? docsPath : '')

    const navigation = useMemo(() => {
        if (!productData) {
            return {
                name: 'Loading...',
                url: basePath || '/',
                children: [],
            }
        }

        const productPath = basePath || `/${productData.slug}`
        const children: NavItem[] = []

        // Helper to add section if data exists or explicitly enabled
        const addInPageSection = (key: string, name: string, icon: React.ReactNode, dataCheck: () => boolean) => {
            const configValue = config[key as keyof ProductNavigationConfig]
            if (configValue === false) return // explicitly disabled

            // Check if data exists (unless explicitly enabled)
            if (configValue !== true && !dataCheck()) return

            children.push({
                name,
                url: `${productPath}#${key}`,
                icon,
                type: 'scroll',
            })
        }

        // Helper to add external link
        const addExternalLink = (key: string, name: string, icon: React.ReactNode, defaultUrl: string) => {
            const configValue = config[key as keyof ProductNavigationConfig]
            if (configValue === false) return // explicitly disabled

            let url = defaultUrl
            if (typeof configValue === 'string') {
                url = configValue
            }

            children.push({
                name,
                url,
                icon,
                type: 'link',
            })
        }

        // === In-page scroll sections ===

        // Overview (always show if product has overview data)
        addInPageSection('overview', 'Overview', <IconHome className="size-4 opacity-50" />, () =>
            Boolean(productData?.overview)
        )

        // Features
        addInPageSection('features', 'Features', <IconSparkles className="size-4 opacity-50" />, () =>
            Boolean(productData?.features?.length > 0)
        )

        // Customers
        addInPageSection('customers', 'Customers', <IconTarget className="size-4 opacity-50" />, () =>
            Boolean(productData?.customers && Object.keys(productData.customers).length > 0)
        )

        // Demos (videos section)
        addInPageSection('videos', 'Demos', <IconRewindPlay className="size-4 opacity-50" />, () =>
            Boolean(productData?.videos && Object.keys(productData.videos).length > 0)
        )

        // PostHog on PostHog
        addInPageSection('posthog-on-posthog', 'PostHog on PostHog', <IconRocket className="size-4 opacity-50" />, () =>
            Boolean(productData?.postHogOnPostHog)
        )

        // Pricing
        addInPageSection('pricing', 'Pricing', <IconHandMoney className="size-4 opacity-50" />, () =>
            Boolean(productData?.billingData || productData?.customPricingContent)
        )

        // Compare
        addInPageSection('comparison', 'Compare', <IconGraph className="size-4 opacity-50" />, () =>
            Boolean(productData?.comparison)
        )

        // Pairs with
        addInPageSection('pairs-with', 'Pairs with', <IconToggle className="size-4 opacity-50" />, () =>
            Boolean(productData?.pairsWith?.length > 0)
        )

        // === External links ===

        // Docs - supports nested structure and dynamic loading
        if (config.docs !== false) {
            if (typeof config.docs === 'object' && config.docs !== null && 'basePath' in config.docs) {
                const docsConfig = config.docs as DocsConfig

                if (docsConfig.dynamic && docsNavigation && docsNavigation.length > 0) {
                    // Dynamic docs from docsMenu - include the full navigation tree
                    children.push({
                        name: 'Docs',
                        url: docsConfig.basePath,
                        icon: <IconBook className="size-4 opacity-50" />,
                        type: 'link',
                        children: docsNavigation.map(convertDocsNavItem),
                    })
                } else if (docsConfig.children && docsConfig.children.length > 0) {
                    // Static nested docs with children
                    children.push({
                        name: 'Docs',
                        url: docsConfig.basePath,
                        icon: <IconBook className="size-4 opacity-50" />,
                        type: 'link',
                        children: docsConfig.children.map((child) => ({
                            name: child.name,
                            url: child.url,
                            type: 'link' as const,
                        })),
                    })
                } else {
                    // Just a basePath, no children
                    children.push({
                        name: 'Docs',
                        url: docsConfig.basePath,
                        icon: <IconBook className="size-4 opacity-50" />,
                        type: 'link',
                    })
                }
            } else {
                // Simple docs link (string or boolean)
                const docsUrl =
                    typeof config.docs === 'string'
                        ? config.docs
                        : `/docs/${productData.slug || productHandle.replace(/_/g, '-')}`
                children.push({
                    name: 'Docs',
                    url: docsUrl,
                    icon: <IconBook className="size-4 opacity-50" />,
                    type: 'link',
                })
            }
        }

        // Roadmap
        if (config.roadmap !== false) {
            const roadmapUrl =
                typeof config.roadmap === 'string'
                    ? config.roadmap
                    : `/roadmap?team=${productData.slug || productHandle.replace(/_/g, '-')}`
            addExternalLink('roadmap', 'Roadmap', <IconMap className="size-4 opacity-50" />, roadmapUrl)
        }

        // Tutorials
        if (config.tutorials !== false) {
            const tutorialsUrl =
                typeof config.tutorials === 'string'
                    ? config.tutorials
                    : `/tutorials?filter=${productData.slug || productHandle.replace(/_/g, '-')}`
            addExternalLink('tutorials', 'Tutorials', <IconGraduationCap className="size-4 opacity-50" />, tutorialsUrl)
        }

        // Changelog
        if (config.changelog !== false) {
            const changelogUrl =
                typeof config.changelog === 'string'
                    ? config.changelog
                    : `/changelog/${productData.slug || productHandle.replace(/_/g, '-')}`
            addExternalLink('changelog', 'Changelog', <IconNewspaper className="size-4 opacity-50" />, changelogUrl)
        }

        // Forums
        if (config.forums !== false) {
            const forumsUrl =
                typeof config.forums === 'string'
                    ? config.forums
                    : `/questions/topic/${productData.slug || productHandle.replace(/_/g, '-')}`
            addExternalLink('forums', 'Forums', <IconQuestion className="size-4 opacity-50" />, forumsUrl)
        }

        // People/Team
        if (config.people !== false) {
            const peopleUrl = typeof config.people === 'string' ? config.people : `/teams`
            addExternalLink('people', 'People', <IconPeople className="size-4 opacity-50" />, peopleUrl)
        }

        // Get Started
        if (config.getStarted !== false) {
            const getStartedUrl =
                typeof config.getStarted === 'string'
                    ? config.getStarted
                    : `/docs/ai-engineering/${productData.slug || productHandle.replace(/_/g, '-')}`
            addExternalLink('getStarted', 'Get started', <IconCode className="size-4 opacity-50" />, getStartedUrl)
        }

        return {
            name: productData.name || 'Product',
            url: productPath,
            docsUrl: docsPath || undefined,
            icon: productData.Icon ? <productData.Icon className="size-4" /> : undefined,
            children,
        }
    }, [productData, basePath, config, docsNavigation, docsPath])

    return navigation
}

export default useProductNavigation
