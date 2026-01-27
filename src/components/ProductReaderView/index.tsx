import React, { useMemo, useEffect } from 'react'
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
    docs?: string | boolean
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

interface TableOfContentsItem {
    value: string
    url: string
    depth: number
}

const CategorySidebarContent = () => {
    const categoryNav = useProductCategoryNavigation()
    return <TreeMenu items={categoryNav.children} />
}

/**
 * Reusable product page template that renders product data in a reader view layout
 * with left sidebar navigation and on-page table of contents.
 */
export default function ProductReaderView({
    productHandle,
    sections: sectionOverrides,
    seoOverrides,
    useProductNav = false,
    navigationConfig = {},
}: ProductReaderViewProps): JSX.Element {
    const productData = useProduct({ handle: productHandle }) as any
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    // Get product-specific navigation
    const productNavigation = useProductNavigation({
        productHandle,
        basePath: productData?.slug ? `/${productData.slug}` : undefined,
        config: navigationConfig,
    })

    // Set window title
    useEffect(() => {
        if (appWindow && productData?.name) {
            setWindowTitle(appWindow, `${productData.name}.md`)
        }
    }, [appWindow, productData?.name])

    // Default section order - only show sections that have data
    const defaultSections = [
        'overview',
        'features',
        'customers',
        'posthog-on-posthog',
        'videos',
        'comparison',
        'pairs-with',
        'pricing',
    ]

    const activeSections = useMemo(() => {
        const sectionsToShow = sectionOverrides || defaultSections

        return sectionsToShow.filter((section) => {
            switch (section) {
                case 'overview':
                    return productData?.overview
                case 'features':
                    return productData?.features && productData.features.length > 0
                case 'videos':
                    return productData?.videos && Object.keys(productData.videos).length > 0
                case 'pricing':
                    return productData?.billingData || productData?.customPricingContent
                case 'customers':
                    return productData?.customers && Object.keys(productData.customers).length > 0
                case 'pairs-with':
                    return productData?.pairsWith && productData.pairsWith.length > 0
                case 'posthog-on-posthog':
                    return productData?.postHogOnPostHog
                case 'comparison':
                    return productData?.comparison
                default:
                    return false
            }
        })
    }, [productData, sectionOverrides])

    // Generate table of contents from active sections
    const tableOfContents: TableOfContentsItem[] = useMemo(() => {
        return activeSections.map((section) => {
            const sectionNames: Record<string, string> = {
                overview: 'Overview',
                features: 'Features',
                videos: 'Videos',
                pricing: 'Pricing',
                customers: 'Customers',
                'pairs-with': 'Pairs with',
                'posthog-on-posthog': 'PostHog on PostHog',
                comparison: 'Comparison',
            }

            return {
                value: sectionNames[section] || section,
                url: section,
                depth: 0,
            }
        })
    }, [activeSections])

    // Handle loading state
    if (!productData) {
        return (
            <div className="size-full flex items-center justify-center">
                <ProgressBar title="product" />
            </div>
        )
    }

    // Render section based on slug
    const renderSection = (section: string) => {
        switch (section) {
            case 'overview':
                return <OverviewSection key={section} productData={productData} />
            case 'features':
                return <FeaturesSection key={section} productData={productData} />
            case 'videos':
                return <VideosSection key={section} productData={productData} />
            case 'pricing':
                return <PricingSection key={section} productData={productData} />
            case 'customers':
                return <CustomersSection key={section} productData={productData} />
            case 'pairs-with':
                return <PairsWithSection key={section} productData={productData} />
            case 'posthog-on-posthog':
                return <PostHogOnPostHogSection key={section} productData={productData} />
            case 'comparison':
                return <ComparisonSection key={section} productData={productData} />
            default:
                return null
        }
    }

    // Determine which sidebar to use
    const leftSidebar = useProductNav ? <ProductSidebar product={productNavigation} /> : <CategorySidebarContent />

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
                hideTitle={false}
                tableOfContents={useProductNav ? undefined : tableOfContents}
                showQuestions={false}
            >
                {activeSections.map((section) => renderSection(section))}
            </ReaderView>
        </>
    )
}
