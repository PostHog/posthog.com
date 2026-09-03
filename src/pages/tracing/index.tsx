import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import TracesComparisonTable from 'components/Products/Slides/TracesComparisonTable'
import TracesSlackCallout from 'components/Products/Slides/TracesSlackCallout'
import TracesSelfHealing from 'components/Products/Slides/TracesSelfHealing'
import { useContentData } from 'hooks/useContentData'

const PRODUCT_HANDLE = 'traces'

export default function Traces(): JSX.Element {
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

    // Create slide configuration with custom templates.
    // Building this page out slide by slide – start with just the hero.
    const slides = createSlideConfig({
        include: [
            'overview',
            'traces-self-healing',
            'features',
            'comparison-summary',
            'traces-comparison',
            'traces-slack',
            'getting-started',
        ],
        order: [
            'overview',
            'traces-self-healing',
            'features',
            'comparison-summary',
            'traces-comparison',
            'traces-slack',
            'getting-started',
        ],
        templates: {
            overview: 'stacked',
        },
        custom: [
            {
                slug: 'traces-self-healing',
                name: 'Your product, fixing itself',
                component: TracesSelfHealing,
            },
            {
                slug: 'traces-comparison',
                name: 'Feature comparison',
                component: TracesComparisonTable,
            },
            {
                slug: 'traces-slack',
                name: 'PostHog in Slack',
                component: TracesSlackCallout,
            },
        ],
    })

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
