import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'

const PRODUCT_HANDLE = 'max_ai'

const CustomPricingSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col p-12 justify-start @2xl:justify-center items-center h-full bg-primary text-primary"
        >
            <h2 className="text-4xl font-bold mb-8">Pricing</h2>

            <div className="bg-accent border border-primary max-w-xl mx-auto rounded p-8 text-center">
                <div className="text-2xl font-bold mb-4">Max is free during beta.</div>
                <p className="text-xl">
                    Eventually we may charge a nominal, flat monthly fee – we're thinking something like ~$15/mo.
                </p>
            </div>
        </div>
    )
}

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
        exclude: ['customers', 'ai', 'comparison-summary', 'feature-comparison', 'docs', 'pairs-with'],
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
            overview: 'max',
            features: 'columns',
            answers: 'demo',
        },
        content: {
            answersDescription: 'What can Max do?',
        },
    })

    // Override the pricing slide with our custom component
    const pricingSlideIndex = slides.slides.findIndex((slide) => slide.slug === 'pricing')
    if (pricingSlideIndex !== -1) {
        slides.slides[pricingSlideIndex] = {
            ...slides.slides[pricingSlideIndex],
            component: CustomPricingSlide,
        }
    }

    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
