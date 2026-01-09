import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import Link from 'components/Link'

const PRODUCT_HANDLE = 'workflows_emails'

const CustomPricingSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col p-12 justify-start @2xl:justify-center items-center h-full bg-primary text-primary"
        >
            <h2 className="text-4xl font-bold mb-8">Pricing</h2>

            <div className="bg-accent border border-primary max-w-xl mx-auto rounded p-8 text-center">
                <p className="text-xl">
                    For complete workflows pricing, please visit the{' '}
                    <Link to="/pricing" className="text-primary underline">
                        pricing page
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default function Workflows(): JSX.Element {
    const contentData = useContentData()

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

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    // Create slide configuration with custom templates
    const slides = createSlideConfig({
        templates: {
            overview: 'stacked',
        },
        exclude: ['answers', 'posthog-on-posthog', 'videos'],
        content: {
            answersDescription: '',
            answersHeadline: '',
        },
        order: ['overview', 'features', 'comparison'],
    })

    // Override the pricing slide with our custom component
    const pricingSlideIndex = slides.slides.findIndex((slide) => slide.slug === 'pricing')
    if (pricingSlideIndex !== -1) {
        slides.slides[pricingSlideIndex] = {
            ...slides.slides[pricingSlideIndex],
            component: CustomPricingSlide,
        }
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
