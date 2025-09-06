import React, { useState, useEffect } from 'react'
import SEO from 'components/seo'
import Presentation from 'components/Presentation'
import ScalableSlide from 'components/Presentation/ScalableSlide'
import ResponsiveSlideContent from 'components/Presentation/ResponsiveSlideContent'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import { docsMenu } from '../../../navs'
import SlideThumbnails from './SlideThumbnails'
import OverviewSlideColumns from './OverviewSlide/OverviewSlideColumns'
import OverviewSlideStacked from './OverviewSlide/OverviewSlideStacked'
import OverviewSlideOverlay from './OverviewSlide/OverviewSlideOverlay'
import OverviewSlideAI from './OverviewSlide/OverviewSlideAI'
import CustomersSlide from './CustomersSlide'
import FeaturesSlide from './FeaturesSlide'
import FeaturesSlideAI from './FeaturesSlideAI'
import FeaturesGrid from './FeaturesGrid'
import FeaturesSplit from './FeaturesSplit'
import FeaturesSplitWithImage from './FeaturesSplitWithImage'
import QuestionsSlide from './QuestionsSlide'
import PlanComparison from './PlanComparison'
import ComparisonSummarySlide from './ComparisonSummarySlide'
import FeatureComparisonSlide from './FeatureComparisonSlide'
import DocsSlide from './DocsSlide'
import AISlide from './AISlide'
import PairsWithSlide from './PairsWithSlide'
import GettingStartedSlide from './GettingStartedSlide'
import { SlideConfig, SlideConfigResult, defaultSlides, aiSlide } from './createSlideConfig'
import ProgressBar from 'components/ProgressBar'
import DemoSlide from './DemoSlide'

interface SlidesTemplateProps {
    productHandle: string
    data: any // GraphQL data
    slideConfig?: SlideConfig[] | SlideConfigResult
    seoOverrides?: {
        title?: string
        description?: string
        image?: string
    }
}

export const SlideContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="h-full py-8 px-4 @md:p-12 bg-light dark:bg-dark">{children}</div>
}

export default function SlidesTemplate({
    productHandle,
    data,
    slideConfig = Object.values(defaultSlides),
    seoOverrides,
}: SlidesTemplateProps) {
    // Get product data early to check for AI section
    const productData = useProduct({ handle: productHandle }) as any

    // Process slide configuration
    let processedSlideConfig = slideConfig

    // If using default slides or a SlideConfigResult, conditionally add AI slide
    if (productData?.ai) {
        if (Array.isArray(slideConfig)) {
            // Using default slides array - insert AI slide after features
            const featuresIndex = slideConfig.findIndex((slide) => slide.slug === 'features')
            if (featuresIndex !== -1) {
                processedSlideConfig = [
                    ...slideConfig.slice(0, featuresIndex + 1),
                    aiSlide,
                    ...slideConfig.slice(featuresIndex + 1),
                ]
            }
        } else {
            // Using SlideConfigResult - insert AI slide into slides array
            const slides = slideConfig.slides
            const featuresIndex = slides.findIndex((slide) => slide.slug === 'features')
            if (featuresIndex !== -1 && !slides.some((slide) => slide.slug === 'ai')) {
                processedSlideConfig = {
                    ...slideConfig,
                    slides: [...slides.slice(0, featuresIndex + 1), aiSlide, ...slides.slice(featuresIndex + 1)],
                }
            }
        }
    }

    // Extract slides and content configuration
    const slideConfigs = Array.isArray(processedSlideConfig) ? processedSlideConfig : processedSlideConfig.slides
    const contentConfig = Array.isArray(processedSlideConfig) ? {} : processedSlideConfig.content || {}
    // Track whether we're in mobile or desktop view
    // Start with true (mobile) as default since that's the initial visible state
    const [, setIsMobileView] = useState(true)

    // Extract products data for the pricing component
    const products = data.allProductData.nodes[0].products

    // Get customers using abstracted product handle
    const { getCustomers, hasCaseStudy } = useCustomers()

    // Get all products for pairsWith lookup
    const allProducts = useProduct() as any[]

    // Get customer slugs from product and retrieve customer data
    const customerSlugs = productData?.customers ? Object.keys(productData.customers) : []
    const customers = getCustomers(customerSlugs)

    // Effect to detect when we're in mobile vs desktop view
    useEffect(() => {
        const checkViewMode = () => {
            // Find a slide container to check visibility
            const slideContainer = document.querySelector('[data-slide-id]')
            if (!slideContainer) return

            // Find the mobile and desktop views within a slide
            const mobileView = slideContainer.querySelector('.\\@2xl\\:hidden.aspect-\\[9\\/16\\]')
            const desktopView = slideContainer.querySelector('.hidden.\\@2xl\\:block.aspect-video')

            if (mobileView && desktopView) {
                // Check which one is visible
                const mobileStyles = window.getComputedStyle(mobileView)
                const isMobileVisible = mobileStyles.display !== 'none'
                setIsMobileView(isMobileVisible)
            }
        }

        // Initial check
        setTimeout(checkViewMode, 100)

        // Check on window resize
        window.addEventListener('resize', checkViewMode)

        // Also observe container size changes
        const observer = new ResizeObserver(() => {
            setTimeout(checkViewMode, 50)
        })

        const containers = document.querySelectorAll('[data-slide-id]')
        containers.forEach((container) => {
            observer.observe(container)
        })

        return () => {
            window.removeEventListener('resize', checkViewMode)
            observer.disconnect()
        }
    }, [productData?.slug])

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
                        case 'ai':
                            return OverviewSlideAI
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
                        status={productData?.status}
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

            case 'features': {
                // Handle different feature templates
                if (template === 'columns') {
                    return (
                        <FeaturesSlideAI
                            productName={productData?.name}
                            features={productData?.features || []}
                            {...props}
                        />
                    )
                }

                if (template === 'grid') {
                    // Individual feature grid slide
                    const features = productData?.features || []
                    const featureIndex = props?.featureIndex || 0
                    const feature = features[featureIndex]

                    if (!feature) {
                        return <div>Feature not found</div>
                    }

                    return (
                        <FeaturesGrid
                            headline={feature.headline}
                            description={feature.description}
                            icon={feature.icon}
                            features={feature.features}
                            images={feature.images}
                            {...props}
                        >
                            {feature.children}
                        </FeaturesGrid>
                    )
                }

                if (template === 'split') {
                    // Individual feature grid slide
                    const features = productData?.features || []
                    const featureIndex = props?.featureIndex || 0
                    const feature = features[featureIndex]

                    if (!feature) {
                        return <div>Feature not found</div>
                    }

                    return (
                        <FeaturesSplit
                            bgColor={productData?.color}
                            textColor={productData?.overview?.textColor}
                            headline={feature.headline}
                            description={feature.description}
                            icon={feature.icon}
                            features={feature.features}
                            images={feature.images}
                            {...props}
                        >
                            {feature.children}
                        </FeaturesSplit>
                    )
                }

                if (template === 'splitImage') {
                    // Individual feature grid slide
                    const features = productData?.features || []
                    const featureIndex = props?.featureIndex || 0
                    const feature = features[featureIndex]

                    if (!feature) {
                        return <div>Feature not found</div>
                    }

                    return (
                        <FeaturesSplitWithImage
                            bgColor={productData?.color}
                            textColor={productData?.overview?.textColor}
                            headline={feature.headline}
                            description={feature.description}
                            icon={feature.icon}
                            features={feature.features}
                            images={feature.images}
                            {...props}
                        >
                            {feature.children}
                        </FeaturesSplitWithImage>
                    )
                }

                // Default: tabs template (existing FeaturesSlide with OSTabs)
                return (
                    <FeaturesSlide
                        features={productData?.features || []}
                        backgroundImage={contentConfig.featuresBackgroundImage}
                        {...props}
                    />
                )
            }

            case 'answers': {
                // Support using template to render the demo slide
                if (template === 'demo') {
                    return <DemoSlide productHandle={productHandle} answers={productData?.answers || []} {...props} />
                }
                // Default: questions slide
                return (
                    <QuestionsSlide
                        productName={productData?.name}
                        answersDescription={contentConfig.answersDescription || productData?.answersDescription}
                        answersHeadline={contentConfig.answersHeadline || productData?.answersHeadline}
                        questions={productData?.questions || []}
                        tutorialData={data}
                        {...props}
                    />
                )
            }

            case 'pricing':
                return (
                    <PlanComparison
                        products={products}
                        productHandle={productData?.handle}
                        productData={productData}
                        onScrollToFeatures={() => {
                            // Find the Features slide dynamically by slug
                            const featuresSlideIndex = slideConfigs.findIndex((slide) => slide.slug === 'features')
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
                return (
                    <FeatureComparisonSlide
                        features={productData?.comparison?.features || []}
                        companies={productData?.comparison?.companies}
                        {...props}
                    />
                )

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

            case 'ai':
                return <AISlide ai={productData?.ai} productName={productData?.name} />

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
                return <GettingStartedSlide initialState={{}} productName={productData?.name} {...props} />

            default: {
                // Handle template-based rendering for any slide
                if (template === 'grid') {
                    // Individual feature grid slide
                    const features = productData?.features || []
                    const featureIndex = props?.featureIndex || 0
                    const feature = features[featureIndex]

                    if (!feature) {
                        return <div>Feature not found</div>
                    }

                    return (
                        <FeaturesGrid
                            bgColor={productData?.color}
                            textColor={productData?.overview?.textColor}
                            headline={feature.headline}
                            description={feature.description}
                            icon={feature.icon}
                            features={feature.features}
                            images={feature.images}
                            {...props}
                        >
                            {feature.children}
                        </FeaturesGrid>
                    )
                }

                if (template === 'splitImage') {
                    // Individual feature split slide
                    const features = productData?.features || []
                    const featureIndex = props?.featureIndex || 0
                    const feature = features[featureIndex]

                    if (!feature) {
                        return <div>Feature not found</div>
                    }

                    return (
                        <FeaturesSplitWithImage
                            bgColor={productData?.color}
                            textColor={productData?.overview?.textColor}
                            headline={feature.headline}
                            description={feature.description}
                            icon={feature.icon}
                            features={feature.features}
                            images={feature.images}
                            {...props}
                        >
                            {feature.children}
                        </FeaturesSplitWithImage>
                    )
                }

                return <div>Slide not found: {slug}</div>
            }
        }
    }

    // Process features to expand custom template features into individual slides
    const processedSlides: any[] = []

    slideConfigs.forEach(({ slug, name, component: CustomComponent, props, template }) => {
        if (slug === 'features') {
            // Get features that should use default tabs template
            const defaultFeatures = (productData?.features || []).filter(
                (f: any) => !f.template || f.template === 'tabs'
            )

            // Get features with custom templates that need individual slides
            const customTemplateFeatures = (productData?.features || []).filter(
                (f: any) => f.template && f.template !== 'tabs'
            )

            // Add the default features slide if there are any default features
            if (defaultFeatures.length > 0) {
                processedSlides.push({
                    name,
                    slug,
                    content: CustomComponent ? (
                        <CustomComponent {...props} />
                    ) : (
                        <FeaturesSlide
                            features={defaultFeatures}
                            backgroundImage={contentConfig.featuresBackgroundImage}
                            {...props}
                        />
                    ),
                })
            }

            // Add individual slides for each custom template feature
            customTemplateFeatures.forEach((feature: any, index: number) => {
                const featureSlug = feature.handle ? `feature-${feature.handle}` : `feature-custom-${index}`

                // Determine the content based on the template
                let featureContent
                if (feature.template === 'split') {
                    featureContent = (
                        <FeaturesSplit
                            bgColor={productData?.color}
                            textColor={productData?.overview?.textColor}
                            headline={feature.headline}
                            description={feature.description}
                            icon={feature.icon}
                            features={feature.features}
                            images={feature.images}
                            {...props}
                        >
                            {feature.children}
                        </FeaturesSplit>
                    )
                } else if (feature.template === 'splitImage') {
                    featureContent = (
                        <FeaturesSplitWithImage
                            bgColor={productData?.color}
                            textColor={productData?.overview?.textColor}
                            headline={feature.headline}
                            description={feature.description}
                            icon={feature.icon}
                            features={feature.features}
                            images={feature.images}
                            {...props}
                        >
                            {feature.children}
                        </FeaturesSplitWithImage>
                    )
                } else if (feature.template === 'grid') {
                    featureContent = (
                        <FeaturesGrid
                            bgColor={productData?.color}
                            textColor={productData?.overview?.textColor}
                            headline={feature.headline}
                            description={feature.description}
                            icon={feature.icon}
                            features={feature.features}
                            images={feature.images}
                            {...props}
                        >
                            {feature.children}
                        </FeaturesGrid>
                    )
                } else {
                    // Fallback for any other template types
                    featureContent = (
                        <FeaturesSlide
                            features={[feature]}
                            backgroundImage={contentConfig.featuresBackgroundImage}
                            {...props}
                        />
                    )
                }

                processedSlides.push({
                    name: feature.title || `Feature ${index + 1}`,
                    slug: featureSlug,
                    content: featureContent,
                })
            })
        } else {
            // Non-features slides pass through as normal
            processedSlides.push({
                name,
                slug,
                content: CustomComponent ? <CustomComponent {...props} /> : createSlideContent(slug, props, template),
            })
        }
    })

    // Create raw slides from processed configuration
    const rawSlides = processedSlides

    // Create slides with both raw content and wrapped content for different contexts
    const slides = rawSlides.map((slide) => ({
        ...slide,
        // Wrapped content for editor view - desktop
        content: (
            <ScalableSlide mode="editor" baseWidth={1280} baseHeight={720}>
                {slide.content}
            </ScalableSlide>
        ),
        // Wrapped content for editor view - mobile
        mobileContent: (
            <ScalableSlide mode="editor" baseWidth={720} baseHeight={1280}>
                {slide.content}
            </ScalableSlide>
        ),
        // Raw content for presentation mode and thumbnails
        rawContent: slide.content,
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
                sidebarContent={(activeSlideIndex: number, onClick: any) => (
                    <SlideThumbnails
                        slides={slides}
                        activeSlideIndex={activeSlideIndex}
                        slideId={productData?.slug}
                        onClick={onClick}
                    />
                )}
                slides={slides}
                presenterNotes={productData?.presenterNotes}
            >
                <div
                    data-scheme="primary"
                    className="bg-accent grid grid-cols-1 gap-2 [&>div:first-child_>span]:hidden p-2 @md:p-4"
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.slug}
                            className="@container flex flex-col justify-center bg-accent"
                            data-slide={index}
                            data-slide-id={productData?.slug}
                        >
                            <span
                                data-scheme="secondary"
                                className="slideName inline-flex mx-auto bg-accent rounded-sm px-4 py-0.5 text-sm font-semibold text-primary my-2"
                            >
                                {slide.name}
                            </span>
                            {/* <DebugContainerQuery /> */}
                            <ResponsiveSlideContent
                                mobileContent={slide.mobileContent}
                                desktopContent={slide.content}
                            />
                        </div>
                    ))}
                </div>
            </Presentation>
        </>
    )
}
