import React from 'react'
import SEO from 'components/seo'
import Presentation from 'components/Presentation'
import ScalableSlide from 'components/Presentation/ScalableSlide'
import useProduct from 'hooks/useProduct'
import { useCustomers } from 'hooks/useCustomers'
import { useStaticQuery, graphql } from 'gatsby'
import { docsMenu } from '../../navs'
import {
    SlideThumbnails,
    OverviewSlide,
    CustomersSlide,
    FeaturesSlide,
    QuestionsSlide,
    PlanComparison,
    ComparisonSummarySlide,
    FeatureComparisonSlide,
    DocsSlide,
    PairsWithSlide,
    GettingStartedSlide,
} from 'components/Products/Slides'

// Product configuration - change this to adapt for different products
const PRODUCT_TYPE = 'session_replay'

export default function SessionReplay(): JSX.Element {
    // Combined GraphQL query for both tutorial data and product data
    const data = useStaticQuery(graphql`
        query {
            allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    rawBody
                    frontmatter {
                        title
                        description
                    }
                }
            }
            allProductData {
                nodes {
                    products {
                        name
                        type
                        unit
                        addons {
                            name
                            type
                            unit
                            plans {
                                name
                                plan_key
                                included_if
                                features {
                                    key
                                    name
                                    description
                                    limit
                                    note
                                }
                            }
                        }
                        plans {
                            name
                            plan_key
                            free_allocation
                            included_if
                            features {
                                key
                                name
                                description
                                limit
                                note
                            }
                            tiers {
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                }
            }
        }
    `)

    // Extract products data for the pricing component
    const products = data.allProductData.nodes[0].products

    // Get product data and customers using abstracted product type
    const productHandle = useProduct({ type: PRODUCT_TYPE }) as any
    const { getCustomers, hasCaseStudy } = useCustomers()

    // Get all products for pairsWith lookup
    const allProducts = useProduct() as any[]

    // Get customer slugs from product and retrieve customer data
    const customerSlugs = productHandle?.customers ? Object.keys(productHandle.customers) : []
    const customers = getCustomers(customerSlugs)

    // Define raw slide content
    const rawSlides = [
        {
            name: 'Overview',
            content: (
                <OverviewSlide
                    productName={productHandle?.name}
                    productTitle={productHandle?.title}
                    productDescription={productHandle?.description}
                    Icon={productHandle?.Icon}
                    screenshotSrc={productHandle?.screenshots?.[0]?.src}
                    screenshotAlt={productHandle?.screenshots?.[0]?.alt}
                    hogSrc={productHandle?.hog?.src}
                    hogAlt={productHandle?.hog?.alt}
                />
            ),
        },
        {
            name: 'Customers',
            content: (
                <CustomersSlide
                    productName={productHandle?.name}
                    customers={customers}
                    customerData={productHandle?.customers}
                    hasCaseStudy={hasCaseStudy}
                />
            ),
        },
        {
            name: 'Features',
            content: <FeaturesSlide features={productHandle?.features || []} />,
        },
        {
            name: 'Answers',
            content: (
                <QuestionsSlide
                    productName={productHandle?.name}
                    answersDescription={productHandle?.answersDescription}
                    questions={productHandle?.questions || []}
                    tutorialData={data}
                />
            ),
        },
        {
            name: 'Pricing',
            content: (
                <PlanComparison
                    products={products}
                    productType={productHandle?.type}
                    onScrollToFeatures={() => {
                        // Find the Features slide dynamically by name
                        const featuresSlideIndex = rawSlides.findIndex((slide) => slide.name === 'Features')
                        if (featuresSlideIndex !== -1) {
                            const featuresSlide = document.querySelector(`[data-slide="${featuresSlideIndex}"]`)
                            featuresSlide?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                    }}
                />
            ),
        },
        {
            name: 'PostHog vs... (the tl;dr)',
            content: (
                <ComparisonSummarySlide
                    them={productHandle?.comparison?.summary?.them || []}
                    us={productHandle?.comparison?.summary?.us || []}
                />
            ),
        },
        {
            name: 'Feature comparison',
            content: <FeatureComparisonSlide features={productHandle?.comparison?.features || []} />,
        },
        {
            name: 'Docs',
            content: (
                <DocsSlide
                    productType={productHandle?.type}
                    docsMenu={
                        docsMenu.children.find(({ name }) => name.toLowerCase() === productHandle?.name.toLowerCase())
                            ?.children || []
                    }
                />
            ),
        },
        {
            name: 'Pairs with...',
            content: (
                <PairsWithSlide
                    productName={productHandle?.name}
                    pairsWith={productHandle?.pairsWith || []}
                    allProducts={allProducts}
                />
            ),
        },
        {
            name: 'Getting started',
            content: <GettingStartedSlide />,
        },
    ]

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
                title={productHandle?.seo?.title}
                description={productHandle?.seo?.description}
                image={`/images/og/${productHandle?.handle}.jpg`}
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
                        <div key={index} className="flex flex-col justify-center bg-accent" data-slide={index}>
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
