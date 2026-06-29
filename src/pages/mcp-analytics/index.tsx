import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import EarlyAccessOptIn from 'components/EarlyAccessOptIn'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'mcp_analytics'

// MCP Analytics is gated behind the `mcp-analytics` early access feature in the app. Logins
// aren't shared between posthog.com and the app, so we can't enroll the visitor's website
// identity here — instead the opt-in links to the app, where the signed-in user can join the
// beta. See src/components/EarlyAccessOptIn/README.md.
//
// This points at the public feature previews surface (anchored to the MCP Analytics feature),
// where any signed-in user can opt in — not the internal `/early_access_features/<id>`
// management page, which is only accessible to the PostHog team.
const EARLY_ACCESS_URL = 'https://us.posthog.com/settings/user-feature-previews#mcp-analytics'

export default function MCPAnalytics(): JSX.Element {
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

    // Lean alpha slide set — no pricing, comparison, or customers yet.
    const slides = createSlideConfig({
        include: ['overview', 'features', 'answers', 'docs', 'pairs-with'],
        templates: {
            overview: 'stacked',
        },
    })

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return (
        <SlidesTemplate
            productHandle={PRODUCT_HANDLE}
            data={mergedData}
            slideConfig={slides}
            rightActionButtons={<EarlyAccessOptIn to={EARLY_ACCESS_URL} state="register_interest" />}
        />
    )
}
