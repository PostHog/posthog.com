import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import HowWeUseItSlide from 'components/Products/Slides/HowWeUseItSlide'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'feature_flags'

export default function FeatureFlags(): JSX.Element {
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
        order: [
            'overview',
            'customers',
            'how-we-use-it',
            'features',
            'answers',
            'pricing',
            'comparison-summary',
            'feature-comparison',
            'docs',
            'pairs-with',
            'getting-started',
        ],
        templates: {
            overview: 'stacked', // Use the horizontal split layout
        },
        custom: [
            {
                slug: 'how-we-use-it',
                name: 'How we use it',
                component: HowWeUseItSlide,
                props: {
                    title: "It's so good we use it ourselves",
                    description: 'See how our own teams use feature flags to ship faster.',
                    videoUrl: 'https://www.youtube-nocookie.com/embed/1X2gha80fsA',
                    videoTitle: 'How PostHog uses feature flags',
                },
            },
        ],
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
