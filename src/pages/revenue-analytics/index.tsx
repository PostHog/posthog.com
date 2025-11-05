import React from 'react'
import { graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'revenue_analytics'

export default function RevenueAnalytics({ data }: any): JSX.Element {
    const contentData = useContentData()

    const slides = createSlideConfig({
        exclude: ['customers', 'pricing', 'posthog-on-posthog'],
        templates: {
            overview: 'stacked',
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
