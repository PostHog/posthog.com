import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'web_analytics'

export default function WebAnalytics(): JSX.Element {
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
    const slides = createSlideConfig({
        exclude: ['answers'],
        // order: ['overview', 'pricing', 'features'],
        templates: {
            overview: 'stacked', // Use the horizontal split layout
        },
    })

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
}
