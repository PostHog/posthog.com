import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { IconRewindPlay, IconToggle, IconTrends, IconWarning } from '@posthog/icons'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'llm_analytics'

const Subfeature = ({
    title,
    description,
    className = '',
    icon,
    color,
}: {
    title: string
    description: string
    className?: string
    icon: React.ReactNode
    color: string
}): JSX.Element => {
    return (
        <li className={`bg-primary rounded p-4 sm:p-6 sm:pb-8  ${className}`}>
            {icon && (
                <span className={`inline-block w-10 h-10 mb-4 ${color ? 'text-' + color : 'opacity-50'}`}>{icon}</span>
            )}
            <h3 className="text-2xl mb-2">{title}</h3>
            <p className="text-lg" dangerouslySetInnerHTML={{ __html: description }} />
        </li>
    )
}

const subfeatures = [
    {
        title: 'Session replay',
        description:
            'Watch session recordings of users interacting with your AI features to understand context and improve prompts.',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'Product analytics',
        description:
            'Analyze AI usage patterns, track feature adoption, and correlate AI interactions with user behavior and outcomes.',
        icon: <IconTrends />,
        color: 'blue',
    },
    {
        title: 'Feature flags',
        description:
            'Test new AI models, prompts, and features by rolling them out gradually to specific user segments.',
        icon: <IconToggle />,
        color: 'seagreen',
    },
    {
        title: 'Error tracking',
        description:
            'Compare LLM traces with error tracking to get a rich picture of user experience and understand exactly what went wrong with your AI features.',
        icon: <IconWarning />,
        color: 'yellow',
    },
]

// Custom ProductOS Benefits slide
const ProductOSBenefitsSlide = () => {
    return (
        <div
            data-scheme="primary"
            className="flex flex-col justify-center items-center h-full bg-primary text-primary px-8"
        >
            <h2 className="text-5xl text-center text-balance">
                All the LLM observability features you'd expect, but{' '}
                <span className="text-red dark:text-yellow">10x better in the PostHog ecosystem</span>
            </h2>
            <p className="mt-4 text-xl text-center">
                Sure you can use LLM analytics solo, but it's better with other PostHog products.
            </p>

            <div className="mt-12">
                <ul
                    data-scheme="secondary"
                    className={`grid @lg:grid-cols-2 @2xl:grid-cols-4 gap-4 @2xl:gap-8 list-none p-0`}
                >
                    {subfeatures.map((subfeature, index) => (
                        <Subfeature key={index} {...subfeature} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default function LLMAnalytics(): JSX.Element {
    const contentData = useContentData()

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

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    // Create slide configuration with custom templates
    const slides = createSlideConfig({
        custom: [
            {
                slug: 'product-os-benefits',
                name: 'Product OS Benefits',
                component: ProductOSBenefitsSlide,
            },
        ],
        templates: {
            overview: 'stacked',
        },
        exclude: ['answers', 'videos', 'pairs-with'],
        order: [
            'overview',
            'customers',
            'features',
            'posthog-on-posthog',
            'comparison-summary',
            'feature-comparison',
            'product-os-benefits',
            'docs',
            'pricing',
            'getting-started',
        ],
        content: {
            answersDescription: 'Track costs, performance, and usage of your AI features with detailed analytics',
            answersHeadline: 'What can LLM Analytics help me discover?',
        },
    })

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
