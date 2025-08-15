import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'

const PRODUCT_HANDLE = 'max_ai'

export default function MaxAI(): JSX.Element {
    const contentData = useContentData()
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

    // Configure slides with custom ProductOS Benefits slide
    const slides = createSlideConfig({
        exclude: ['customers'],
        // custom: [
        //     {
        //         slug: 'product-os-benefits',
        //         name: 'Product OS Benefits',
        //         component: ProductOSBenefitsSlide,
        //     },
        // ],
        // order: [
        //     'overview',
        //     'product-os-benefits',
        //     'features',
        //     'pricing',
        //     'answers',
        //     'comparison-summary',
        //     'feature-comparison',
        //     'docs',
        //     'pairs-with',
        //     'getting-started',
        // ],
        templates: {
            overview: 'ai',
            features: 'columns',
            answers: 'demo',
        },
        content: {
            answersDescription: 'What can Max do?',
        },
    })

    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
