import React from 'react'
import SEO from 'components/seo'
import Presentation from 'components/Presentation'
import ScalableSlide from 'components/Presentation/ScalableSlide'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import { docsMenu } from '../../../navs'
import SlideThumbnails from './SlideThumbnails'
import OverviewSlide from './OverviewSlide'
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

interface SlidesTemplateProps {
    productType: string
    data: any // GraphQL data
    slideConfig?: SlideConfig[]
    seoOverrides?: {
        title?: string
        description?: string
        image?: string
    }
}

export default function SlidesTemplate({
    productType,
    data,
    slideConfig = Object.values(defaultSlides),
    seoOverrides,
}: SlidesTemplateProps) {
    // Extract products data for the pricing component
    const products = data.allProductData.nodes[0].products

    // Get product data and customers using abstracted product type
    const productHandle = useProduct({ type: productType }) as any
    const { getCustomers, hasCaseStudy } = useCustomers()

    // Get all products for pairsWith lookup
    const allProducts = useProduct() as any[]

    // Get customer slugs from product and retrieve customer data
    const customerSlugs = productHandle?.customers ? Object.keys(productHandle.customers) : []
    const customers = getCustomers(customerSlugs)

    // Create slide content based on handle
    const createSlideContent = (handle: string, customProps?: Record<string, any>) => {
        const props = { ...customProps }

        switch (handle) {
            case 'overview':
                return (
                    <OverviewSlide
                        productName={productHandle?.name}
                        productTitle={productHandle?.title}
                        productDescription={productHandle?.description}
                        Icon={productHandle?.Icon}
                        screenshotSrc={productHandle?.screenshots?.[0]?.src}
                        screenshotAlt={productHandle?.screenshots?.[0]?.alt}
                        hogSrc={productHandle?.hog?.src}
                        hogAlt={productHandle?.hog?.alt}
                        {...props}
                    />
                )

            case 'customers':
                return (
                    <CustomersSlide
                        productName={productHandle?.name}
                        customers={customers}
                        customerData={productHandle?.customers}
                        hasCaseStudy={hasCaseStudy}
                        {...props}
                    />
                )

            case 'features':
                return <FeaturesSlide features={productHandle?.features || []} {...props} />

            case 'answers':
                return (
                    <QuestionsSlide
                        productName={productHandle?.name}
                        answersDescription={productHandle?.answersDescription}
                        questions={productHandle?.questions || []}
                        tutorialData={data}
                        {...props}
                    />
                )

            case 'pricing':
                return (
                    <PlanComparison
                        products={products}
                        productType={productHandle?.type}
                        onScrollToFeatures={() => {
                            // Find the Features slide dynamically by handle
                            const featuresSlideIndex = slideConfig.findIndex((slide) => slide.handle === 'features')
                            if (featuresSlideIndex !== -1) {
                                const featuresSlide = document.querySelector(`[data-slide="${featuresSlideIndex}"]`)
                                featuresSlide?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                        }}
                        {...props}
                    />
                )

            case 'comparison-summary':
                return (
                    <ComparisonSummarySlide
                        them={productHandle?.comparison?.summary?.them || []}
                        us={productHandle?.comparison?.summary?.us || []}
                        {...props}
                    />
                )

            case 'feature-comparison':
                return <FeatureComparisonSlide features={productHandle?.comparison?.features || []} {...props} />

            case 'docs':
                return (
                    <DocsSlide
                        productType={productHandle?.type}
                        docsMenu={
                            docsMenu.children.find(
                                ({ name }) => name.toLowerCase() === productHandle?.name.toLowerCase()
                            )?.children || []
                        }
                        {...props}
                    />
                )

            case 'pairs-with':
                return (
                    <PairsWithSlide
                        productName={productHandle?.name}
                        pairsWith={productHandle?.pairsWith || []}
                        allProducts={allProducts}
                        {...props}
                    />
                )

            case 'getting-started':
                return <GettingStartedSlide {...props} />

            default:
                return <div>Slide not found: {handle}</div>
        }
    }

    // Create raw slides from configuration
    const rawSlides = slideConfig.map(({ handle, name, component: CustomComponent, props }) => ({
        name,
        handle,
        content: CustomComponent ? <CustomComponent {...props} /> : createSlideContent(handle, props),
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
                title={seoOverrides?.title || productHandle?.seo?.title}
                description={seoOverrides?.description || productHandle?.seo?.description}
                image={seoOverrides?.image || `/images/og/${productHandle?.handle}.jpg`}
            />
            <Presentation
                template="generic"
                slug={productHandle?.handle}
                title=""
                sidebarContent={(activeSlideIndex) => (
                    <SlideThumbnails slides={slides} activeSlideIndex={activeSlideIndex} />
                )}
                slides={slides}
            >
                <div
                    data-scheme="primary"
                    className="bg-accent grid grid-cols-1 gap-2 [&>div:first-child_>span]:hidden [&_div:first-child_div]:border-t-0 p-4"
                >
                    {slides.map((slide, index) => (
                        <div key={slide.handle} className="flex flex-col justify-center bg-accent" data-slide={index}>
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
