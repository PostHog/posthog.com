import React from 'react'
import { graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'feature_flags'

export default function FeatureFlags({ data }: any): JSX.Element {
    // Get content data from multiple directories
    const contentData = useContentData()

    // Combined GraphQL query for product data

    // Optional: Customize slides
    // See /components/Products/Slides/README.md for more details
    const slides = createSlideConfig({
        // exclude: ['comparison-summary'],
        // order: ['overview', 'pricing', 'features'],
        templates: {
            overview: 'stacked', // Use the horizontal split layout
        },
        content: {
            // answersDescription: 'Control the release of new features to your users', moved to json
        },
    })

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}

export const query = graphql`
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
`
