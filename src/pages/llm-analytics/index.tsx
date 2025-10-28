import React from 'react'
import { graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'llm_analytics'

export default function LLMAnalytics({ data }: any): JSX.Element {
    const contentData = useContentData()

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
        exclude: ['answers', 'posthog-on-posthog'],
        content: {
            answersDescription: 'Track costs, performance, and usage of your AI features with detailed analytics',
            answersHeadline: 'What can LLM Analytics help me discover?',
        },
    })

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}

export const query = graphql`
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
`
