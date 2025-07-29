import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import Link from 'components/Link'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'web_analytics'

// Custom pricing component for web analytics
const CustomPricingSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col pt-12 @2xl:pt-0 @2xl:justify-center items-center h-full bg-primary text-primary px-8"
        >
            <div className="max-w-4xl w-full text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Usage-based pricing</h2>

                <div className="bg-accent border border-primary rounded p-8 text-left max-w-3xl mx-auto">
                    <p className="text-lg mb-6">
                        Web analytics is currently bundled with{' '}
                        <Link to="/product-analytics" className="underline font-medium" state={{ newWindow: true }}>
                            product analytics
                        </Link>
                        .
                    </p>

                    <ul className="space-y-4 mb-6 text-lg">
                        <li className="flex items-start">
                            <span className="text-red mr-2">•</span>
                            <div>
                                <strong>First 1 million events every month:</strong> Free (get access to both products)
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red mr-2">•</span>
                            <div>
                                <strong>After 1 million events/mo:</strong> Usage is billed through product analytics.
                                Get access to web analytics at no additional cost.
                            </div>
                        </li>
                    </ul>

                    <p className="text-lg">
                        Web analytics is designed to work well with{' '}
                        <Link
                            to="/blog/analytics-pricing"
                            className="underline font-medium"
                            state={{ newWindow: true }}
                        >
                            anonymous events
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function WebAnalytics(): JSX.Element {
    // Combined GraphQL query for both tutorial data and product data
    const contentData = useContentData()

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

    const slides = createSlideConfig({
        // exclude: ['answers'],
        // order: ['overview', 'pricing', 'features'],
        templates: {
            overview: 'stacked', // Use the horizontal split layout
        },
    })

    // Override the pricing slide with our custom component
    const pricingSlideIndex = slides.findIndex((slide) => slide.slug === 'pricing')
    if (pricingSlideIndex !== -1) {
        slides[pricingSlideIndex] = {
            ...slides[pricingSlideIndex],
            component: CustomPricingSlide,
        }
    }

    // Merge content data with product data

    const mergedData = {
        ...data,

        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
