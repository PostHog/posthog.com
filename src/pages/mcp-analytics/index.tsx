import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import EarlyAccessOptIn from 'components/EarlyAccessOptIn'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'mcp_analytics'

// MCP analytics is gated behind the `mcp-analytics` early access feature in the app. Logins
// aren't shared between posthog.com and the app, so we can't enroll the visitor's website
// identity here — instead the opt-in links to the early access feature in the app, where the
// signed-in user can join the beta. See src/components/EarlyAccessOptIn/README.md.
//
// This is the canonical URL for the "MCP Analytics" early access feature (project 2, where
// PostHog dogfoods its own site). It's currently in `concept` stage, gated to the PostHog Team
// cohort. When the beta opens to everyone, swap this for the public early-access surface.
const EARLY_ACCESS_URL =
    'https://us.posthog.com/early_access_features/019ecd58-7e9b-0000-60b6-98b487153c0e'

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
            overview: 'columns',
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
