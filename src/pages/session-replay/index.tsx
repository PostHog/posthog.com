import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'session_replay'

export default function SessionReplay(): JSX.Element {
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
        // exclude: ['comparison-summary'],
        // order: ['overview', 'pricing', 'features'],
        templates: {
            overview: 'columns', // Use the horizontal split layout
        },
        content: {
            answersDescription:
                'Understand user behavior, identify friction points, and improve your product experience',
            featuresBackgroundImage: {
                url: 'https://res.cloudinary.com/dmukukwp6/image/upload/bg_replay_5775c24ad4.jpg',
                opacity: 0.2,
                position: 'center',
                size: 'cover',
            },
        },
    })

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
