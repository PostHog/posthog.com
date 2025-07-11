import React from 'react'
import SEO from 'components/seo'
import Presentation from 'components/Presentation'
import ScalableSlide from 'components/Presentation/ScalableSlide'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import { docsMenu } from '../../../navs'
import SlideThumbnails from './SlideThumbnails'
import OverviewSlide from './OverviewSlide'
import OverviewSlideColumns from './OverviewSlide/OverviewSlideColumns'
import OverviewSlideStacked from './OverviewSlide/OverviewSlideStacked'
import OverviewSlideOverlay from './OverviewSlide/OverviewSlideOverlay'
import CustomersSlide from './CustomersSlide'
import FeaturesSlide from './FeaturesSlide'
import QuestionsSlide from './QuestionsSlide'
import PlanComparison from './PlanComparison'
import ComparisonSummarySlide from './ComparisonSummarySlide'
import FeatureComparisonSlide from './FeatureComparisonSlide'
import DocsSlide from './DocsSlide'
import PairsWithSlide from './PairsWithSlide'
import GettingStartedSlide from './GettingStartedSlide'
import { SlideConfig, defaultSlides } from './createSlideConfig'
import ProgressBar from 'components/ProgressBar'

interface SlidesTemplateProps {
    productHandle: string
    data: any // GraphQL data
    slideConfig?: SlideConfig[]
    seoOverrides?: {
        title?: string
        description?: string
        image?: string
    }
}

export default function SlidesTemplate({
    productHandle,
    data,
    slideConfig = Object.values(defaultSlides),
    seoOverrides,
}: SlidesTemplateProps) {
    // Extract products data for the pricing component
    const products = data.allProductData.nodes[0].products

    // Get product data and customers using abstracted product handle
    const productData = useProduct({ handle: productHandle }) as any
    const { getCustomers, hasCaseStudy } = useCustomers()

    // Get all products for pairsWith lookup
    const allProducts = useProduct() as any[]

    // Get customer slugs from product and retrieve customer data
    const customerSlugs = productData?.customers ? Object.keys(productData.customers) : []
    const customers = getCustomers(customerSlugs)

    // Handle loading state
    if (!productData) {
        return (
            <div className="size-full flex items-center justify-center">
                <ProgressBar title="product" />
            </div>
        )
    }

    // Create slide content based on slug and version
    const createSlideContent = (slug: string, customProps?: Record<string, any>, template?: string | number) => {
        const props = { ...customProps }

        switch (slug) {
            case 'overview': {
                // Get the appropriate overview slide component based on template
                const getOverviewComponent = (template?: string | number) => {
                    switch (template) {
                        case 'stacked':
                            return OverviewSlideStacked
                        case 'overlay':
                            return OverviewSlideOverlay
                        case 'columns':
                        default:
                            return OverviewSlideColumns
                    }
                }

                const OverviewComponent = getOverviewComponent(template)

                return (
                    <OverviewComponent
                        productName={productData?.name}
                        overview={productData?.overview}
                        screenshots={productData?.screenshots}
                        Icon={productData?.Icon}
                        color={productData?.color}
                        hog={productData?.hog}
                        {...props}
                    />
                )
            }

            case 'customers':
                return (
                    <CustomersSlide
                        productName={productData?.name}
                        customers={customers}
                        customerData={productData?.customers}
                        hasCaseStudy={hasCaseStudy}
                        {...props}
                    />
                )

            case 'features':
                return <FeaturesSlide features={productData?.features || []} {...props} />

            case 'answers':
                return (
                    <QuestionsSlide
                        productName={productData?.name}
                        answersDescription={productData?.answersDescription}
                        questions={productData?.questions || []}
                        tutorialData={data}
                        {...props}
                    />
                )

            case 'pricing':
                return (
                    <PlanComparison
                        products={products}
                        productHandle={productData?.handle}
                        productData={productData}
                        onScrollToFeatures={() => {
                            // Find the Features slide dynamically by slug
                            const featuresSlideIndex = slideConfig.findIndex((slide) => slide.slug === 'features')
                            if (featuresSlideIndex !== -1) {
                                const featuresSlide = document.querySelector(
                                    `[data-slide-id="${productData?.slug}"][data-slide="${featuresSlideIndex}"]`
                                )
                                featuresSlide?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                        }}
                        {...props}
                    />
                )

            case 'comparison-summary':
                return (
                    <ComparisonSummarySlide
                        them={productData?.comparison?.summary?.them || []}
                        us={productData?.comparison?.summary?.us || []}
                        {...props}
                    />
                )

            case 'feature-comparison':
                return <FeatureComparisonSlide features={productData?.comparison?.features || []} {...props} />

            case 'docs':
                return (
                    <DocsSlide
                        productHandle={productData?.slug}
                        docsMenu={
                            docsMenu.children.find(
                                ({ name }) => productData?.name && name.toLowerCase() === productData.name.toLowerCase()
                            )?.children || []
                        }
                        {...props}
                    />
                )

            case 'pairs-with':
                return (
                    <PairsWithSlide
                        productName={productData?.name}
                        pairsWith={productData?.pairsWith || []}
                        allProducts={allProducts}
                        {...props}
                    />
                )

            case 'getting-started':
                return <GettingStartedSlide {...props} />

            default:
                return <div>Slide not found: {slug}</div>
        }
    }

    // Create raw slides from configuration
    const rawSlides = slideConfig.map(({ slug, name, component: CustomComponent, props, template }) => ({
        name,
        slug,
        content: CustomComponent ? <CustomComponent {...props} /> : createSlideContent(slug, props, template),
    }))

    // Create slides with both raw content and wrapped content for different contexts
    const slides = rawSlides.map((slide) => ({
        ...slide,
        // Wrapped content for editor view
        content: (
            <ScalableSlide mode="editor" baseWidth={1280} baseHeight={720}>
                {slide.content}
            </ScalableSlide>
        ),
        // Raw content for presentation mode
        rawContent: slide.content,
        // Simplified content for thumbnails (avoids complex components)
        thumbnailContent: slide.content,
    }))

    return (
        <>
            <SEO
                title={seoOverrides?.title || productData?.seo?.title}
                description={seoOverrides?.description || productData?.seo?.description}
                image={seoOverrides?.image || `/images/og/${productData?.slug}.jpg`}
            />
            <Presentation
                template="generic"
                slug={productData?.slug}
                title=""
                slideId={productData?.slug}
                sidebarContent={(activeSlideIndex) => (
                    <SlideThumbnails slides={slides} activeSlideIndex={activeSlideIndex} slideId={productData?.slug} />
                )}
                slides={slides}
                presenterNotes={productData?.presenterNotes}
            >
                <div
                    data-scheme="primary"
                    className="bg-accent grid grid-cols-1 gap-2 [&>div:first-child_>span]:hidden p-4"
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.slug}
                            className="flex flex-col justify-center bg-accent"
                            data-slide={index}
                            data-slide-id={productData?.slug}
                        >
                            <span
                                data-scheme="secondary"
                                className="slideName inline-flex mx-auto bg-accent rounded-sm px-4 py-0.5 text-sm font-semibold text-primary my-2"
                            >
                                {slide.name}
                            </span>
                            <div className="bg-primary aspect-video relative rounded-md shadow-lg overflow-hidden">
                                {slide.content}
                            </div>
                        </div>
                    ))}
                </div>
            </Presentation>
        </>
    )
}
