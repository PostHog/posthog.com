import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { IconRewindPlay, IconToggle, IconTrends, IconWarning, IconArrowUpRight } from '@posthog/icons'
import useProduct from 'hooks/useProduct'
import FeaturesSlide from 'components/Products/Slides/FeaturesSlide'
import Link from 'components/Link'
import { IconAnthropic, IconGemini, IconLangChain, IconOpenAI, IconOpenRouter, IconVercel } from 'components/OSIcons'

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

// Custom Features slide (mimics error tracking's features slide)
const CustomFeaturesSlide = () => {
    const productData = useProduct({ handle: PRODUCT_HANDLE }) as any
    const features = productData?.features || []

    // Show all features in the tabbed slide (similar to error tracking)
    // Features with custom templates will still get their own individual slides automatically
    return <FeaturesSlide features={features} />
}

// Custom Native Integrations slide
const NativeIntegrationsSlide = () => {
    const integrations = [
        {
            icon: <IconOpenAI />,
            name: 'OpenAI SDK',
        },
        {
            icon: <IconAnthropic />,
            name: 'Anthropic SDK',
        },
        {
            icon: <IconGemini />,
            name: 'Google Gemini',
        },
        {
            icon: <IconLangChain />,
            name: 'LangChain',
        },
        {
            icon: <IconVercel />,
            name: 'Vercel AI SDK',
        },
        {
            icon: <IconOpenRouter />,
            name: 'OpenRouter',
        },
        {
            icon: null,
            name: 'LiteLLM',
        },
    ]

    const additionalProviders = [
        'AWS Bedrock',
        'Azure',
        'Groq',
        'Mistral AI',
        'Cohere',
        'Perplexity',
        'Databricks',
        'Deepseek',
        'And more...',
    ]

    return (
        <div data-scheme="primary" className="flex flex-col h-full bg-primary text-primary px-8 py-12">
            <div className="flex flex-col @2xl:flex-row @2xl:items-end gap-8">
                <div className="flex-1 @2xl:pr-8">
                    <h2 className="text-5xl text-balance mb-4">Simple SDKs for popular LLM providers</h2>
                    <p className="text-xl text-secondary mb-8">
                        PostHog works with every LLM provider. Native integration makes setup easy for popular models
                        like ChatGPT and Claude.
                    </p>

                    <div data-scheme="secondary" className="grid grid-cols-2 @lg:grid-cols-3 gap-6 @2xl:gap-8">
                        {integrations.map((integration, index) => (
                            <div
                                key={index}
                                className="bg-primary rounded p-6 flex flex-col items-center justify-center text-center"
                            >
                                {integration.icon && (
                                    <div className="mb-2 flex items-center justify-center h-16">
                                        <div className="size-12 text-primary fill-current">{integration.icon}</div>
                                    </div>
                                )}
                                <h3 className={`text-xl font-semibold ${!integration.icon ? 'mt-0' : ''}`}>
                                    {integration.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="@2xl:w-80 @2xl:flex-shrink-0">
                    <div data-scheme="secondary" className="bg-primary rounded p-6">
                        <h3 className="text-2xl font-semibold mb-4">We also support</h3>
                        <ul className="space-y-2 mb-6">
                            {additionalProviders.map((provider, index) => (
                                <li key={index} className="text-lg text-secondary">
                                    {provider}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/docs/llm-analytics/installation/manual-capture"
                            className="text-lg font-semibold underline inline-flex items-center gap-1 group"
                            state={{ newWindow: true }}
                        >
                            Learn about manual capture
                            <IconArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
                slug: 'features',
                name: 'Features',
                component: CustomFeaturesSlide,
            },
            {
                slug: 'native_integrations',
                name: 'Native integrations',
                component: NativeIntegrationsSlide,
            },
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
