import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'

const PRODUCT_HANDLE = 'logs'

export default function Logs(): JSX.Element {
    const contentData = useContentData()

    // GraphQL query for product data
    const data = useStaticQuery(graphql`
        query {
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

    // Create slide configuration with custom templates
    const slides = createSlideConfig({
        templates: {
            overview: 'stacked',
        },
        exclude: ['customers', 'answers', 'videos', 'pairs-with'],
        order: [
            'overview',
            'customers',
            'feature-trace_monitoring',
            'feature-cost_analysis',
            'feature-performance_monitoring',
            'features',
            'posthog-on-posthog',
            'comparison-summary',
            'feature-comparison',
            'docs',
            'pricing',
            'getting-started',
        ],
        content: {
            answersDescription: 'Track costs, performance, and usage of your AI features with detailed analytics',
            answersHeadline: 'What can LLM Analytics help me discover?',
        },
    })

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
