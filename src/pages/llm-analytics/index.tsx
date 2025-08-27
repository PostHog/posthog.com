import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import useProduct from 'hooks/useProduct'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'llm_analytics'

export default function LLMAnalytics(): JSX.Element {
    const contentData = useContentData()
    const productData = useProduct({ handle: PRODUCT_HANDLE }) as any

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

    // Create custom slide configuration to replace features with individual feature slides
    const features = productData?.features || []
    const featureSlides = features.map((feature: any, index: number) => ({
        slug: `features-${index}`,
        name: feature.title,
        props: { featureIndex: index },
        template: 'grid'
    }))

    const slides = createSlideConfig({
        exclude: ['features'], // Remove the default features slide
        custom: featureSlides, // Add individual feature slides
        order: ['overview', 'customers', ...featureSlides.map((slide: any) => slide.slug), 'answers', 'pricing', 'comparison-summary', 'feature-comparison', 'docs', 'pairs-with', 'getting-started'],
        content: {
            answersDescription: 'Track costs, performance, and usage of your AI features with detailed analytics',
            answersHeadline: 'What can LLM Analytics help me discover?'
        }
    })

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
