import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate, WarehouseNativeSlide } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'

const PRODUCT_HANDLE = 'product_analytics'

export default function ProductAnalytics(): JSX.Element {
    // Get content data from multiple directories
    const contentData = useContentData()

    // Combined GraphQL query for product data
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

    // Optional: Customize slides
    // See /components/Products/Slides/README.md for more details
    const slides = createSlideConfig({
        templates: {
            overview: 'stacked', // Use the horizontal split layout
        },
        exclude: ['videos'],
        custom: [
            {
                slug: 'warehouse-native',
                name: 'Warehouse-native',
                component: WarehouseNativeSlide,
            },
        ],
        order: [
            'overview',
            'customers',
            'features',
            'warehouse-native',
            'posthog-on-posthog',
            'answers',
            'pricing',
            'comparison-summary',
            'feature-comparison',
            'docs',
            'pairs-with',
            'getting-started',
        ],
    })

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
