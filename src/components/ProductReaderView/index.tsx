import React, { useMemo, useEffect, useState } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import useProduct from 'hooks/useProduct'
import { useProductCategoryNavigation } from 'hooks/useProductCategoryNavigation'
import { useProductNavigation } from 'hooks/useProductNavigation'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'
import ProgressBar from 'components/ProgressBar'
import ProductSidebar from './ProductSidebar'
import { useLocation } from '@reach/router'

// Section components
import OverviewSection from './sections/OverviewSection'
import FeaturesSection from './sections/FeaturesSection'
import VideosSection from './sections/VideosSection'
import PricingSection from './sections/PricingSection'
import CustomersSection from './sections/CustomersSection'
import PairsWithSection from './sections/PairsWithSection'
import PostHogOnPostHogSection from './sections/PostHogOnPostHogSection'
import ComparisonSection from './sections/ComparisonSection'

interface NavigationConfig {
    docs?: string | boolean | { basePath: string; dynamic?: boolean }
    roadmap?: string | boolean
    tutorials?: string | boolean
    changelog?: string | boolean
    forums?: string | boolean
    people?: string | boolean
    getStarted?: string | boolean
}

interface ProductReaderViewProps {
    productHandle: string
    /** Override which sections to show and in what order */
    sections?: string[]
    /** Custom SEO overrides */
    seoOverrides?: {
        title?: string
        description?: string
        image?: string
    }
    /** Use product-centric navigation (product name as parent with sections/links nested) */
    useProductNav?: boolean
    /** Configuration for external navigation links */
    navigationConfig?: NavigationConfig
}

// Define the pages and what sections they contain
const PAGE_DEFINITIONS = {
    overview: {
        name: 'Overview',
        sections: ['overview', 'customers', 'pairs-with'],
    },
    features: {
        name: 'Features',
        sections: ['features'],
    },
    demos: {
        name: 'Demos',
        sections: ['videos', 'posthog-on-posthog'],
    },
    comparison: {
        name: 'Comparison',
        sections: ['comparison'],
    },
    pricing: {
        name: 'Pricing',
        sections: ['pricing'],
    },
}

type PageKey = keyof typeof PAGE_DEFINITIONS

const CategorySidebarContent = () => {
    const categoryNav = useProductCategoryNavigation()
    return <TreeMenu items={categoryNav.children} />
}

/**
 * Reusable product page template that renders product data in a reader view layout
 * with left sidebar navigation. Pages are navigable via hash.
 */
export default function ProductReaderView({
    productHandle,
    seoOverrides,
    useProductNav = false,
    navigationConfig = {},
}: ProductReaderViewProps): JSX.Element {
    const productData = useProduct({ handle: productHandle }) as any
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const { hash } = useLocation()

    // Determine active page from hash (default to 'overview')
    const activePage = useMemo(() => {
        const pageFromHash = hash?.replace('#', '') as PageKey
        if (pageFromHash && PAGE_DEFINITIONS[pageFromHash]) {
            return pageFromHash
        }
        return 'overview' as PageKey
    }, [hash])

    // Get product-specific navigation
    const productNavigation = useProductNavigation({
        productHandle,
        basePath: productData?.slug ? `/${productData.slug}` : undefined,
        config: navigationConfig,
    })

    // Set window title
    useEffect(() => {
        if (appWindow && productData?.name) {
            const pageName = PAGE_DEFINITIONS[activePage]?.name || 'Overview'
            setWindowTitle(appWindow, `${productData.name} - ${pageName}.md`)
        }
    }, [appWindow, productData?.name, activePage])

    // Check which pages have data
    const availablePages = useMemo(() => {
        if (!productData) return []

        const hasData = (section: string): boolean => {
            switch (section) {
                case 'overview':
                    return Boolean(productData?.overview)
                case 'features':
                    return Boolean(productData?.features && productData.features.length > 0)
                case 'videos':
                    return Boolean(productData?.videos && Object.keys(productData.videos).length > 0)
                case 'pricing':
                    return Boolean(productData?.billingData || productData?.customPricingContent)
                case 'customers':
                    return Boolean(productData?.customers && Object.keys(productData.customers).length > 0)
                case 'pairs-with':
                    return Boolean(productData?.pairsWith && productData.pairsWith.length > 0)
                case 'posthog-on-posthog':
                    return Boolean(productData?.postHogOnPostHog)
                case 'comparison':
                    return Boolean(productData?.comparison)
                default:
                    return false
            }
        }

        // A page is available if at least one of its sections has data
        return (Object.entries(PAGE_DEFINITIONS) as [PageKey, (typeof PAGE_DEFINITIONS)[PageKey]][])
            .filter(([, pageDef]) => pageDef.sections.some(hasData))
            .map(([key]) => key)
    }, [productData])

    // Handle loading state
    if (!productData) {
        return (
            <div className="size-full flex items-center justify-center">
                <ProgressBar title="product" />
            </div>
        )
    }

    // Render a section
    const renderSection = (section: string) => {
        switch (section) {
            case 'overview':
                return productData?.overview ? <OverviewSection key={section} productData={productData} /> : null
            case 'features':
                return productData?.features?.length > 0 ? (
                    <FeaturesSection key={section} productData={productData} />
                ) : null
            case 'videos':
                return productData?.videos && Object.keys(productData.videos).length > 0 ? (
                    <VideosSection key={section} productData={productData} />
                ) : null
            case 'pricing':
                return productData?.billingData || productData?.customPricingContent ? (
                    <PricingSection key={section} productData={productData} />
                ) : null
            case 'customers':
                return productData?.customers && Object.keys(productData.customers).length > 0 ? (
                    <CustomersSection key={section} productData={productData} />
                ) : null
            case 'pairs-with':
                return productData?.pairsWith?.length > 0 ? (
                    <PairsWithSection key={section} productData={productData} />
                ) : null
            case 'posthog-on-posthog':
                return productData?.postHogOnPostHog ? (
                    <PostHogOnPostHogSection key={section} productData={productData} />
                ) : null
            case 'comparison':
                return productData?.comparison ? <ComparisonSection key={section} productData={productData} /> : null
            default:
                return null
        }
    }

    // Get sections for the active page
    const activePageDef = PAGE_DEFINITIONS[activePage]
    const sectionsToRender = activePageDef?.sections || []

    // Determine which sidebar to use
    const leftSidebar = useProductNav ? (
        <ProductSidebar product={productNavigation} availablePages={availablePages} activePage={activePage} />
    ) : (
        <CategorySidebarContent />
    )

    return (
        <>
            <SEO
                title={seoOverrides?.title || productData?.seo?.title || productData?.name}
                description={seoOverrides?.description || productData?.seo?.description || productData?.description}
                image={seoOverrides?.image || `/images/og/${productData?.slug}.jpg`}
                updateWindowTitle={false}
            />
            <ReaderView
                leftSidebar={leftSidebar}
                title={productData?.name}
                hideTitle={activePage !== 'overview'}
                showQuestions={false}
            >
                {sectionsToRender.map((section) => renderSection(section))}
            </ReaderView>
        </>
    )
}

export { PAGE_DEFINITIONS }
export type { PageKey }
