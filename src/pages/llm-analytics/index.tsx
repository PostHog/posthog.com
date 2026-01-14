import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import { IconRewindPlay, IconToggle, IconTrends, IconWarning, IconArrowUpRight, IconLightBulb } from '@posthog/icons'
import useProduct from 'hooks/useProduct'
import FeaturesSlide from 'components/Products/Slides/FeaturesSlide'
import Link from 'components/Link'
// Import logo images
import AnthropicLogo from '../../../contents/images/docs/llms/Anthropic_logo_2025.svg'
import VercelLogo from '../../../contents/images/docs/llms/Vercel_logo_2025.svg'
import GeminiLogo from '../../../contents/images/docs/llms/Google_Gemini_logo_2025.svg'
import OpenRouterLogo from '../../../contents/images/docs/llms/OpenRouter_logo_2025.svg'
import OpenAILogo from '../../../contents/images/docs/llms/OpenAI_Logo.svg'
import LangChainLogo from '../../../contents/images/docs/llms/LangChain_Logo.svg'
import LiteLLMLogoLight from '../../../contents/images/docs/llms/LiteLLM_logo_black.png'
import LiteLLMLogoDark from '../../../contents/images/docs/llms/LiteLLM_logo_white.png'
import { useCustomers, type Customer } from 'hooks/useCustomers'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'llm_analytics'

export const Subfeature = ({
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
            'Replay AI interactions end-to-end. Inspect user actions, model responses, and UI state together to debug with full context.',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'Product analytics',
        description:
            'Capture every AI interaction as an event. Analyze usage, variants, and downstream user actions in one place.',
        icon: <IconTrends />,
        color: 'blue',
    },
    {
        title: 'Feature flags',
        description:
            'Roll out models, prompts, and AI features behind flags. Control exposure by cohort, environment, or percentage.',
        icon: <IconToggle />,
        color: 'seagreen',
    },
    {
        title: 'Error tracking',
        description:
            'Tie LLM traces directly to errors and exceptions. Inspect inputs, outputs, and stack traces to pinpoint failures fast.',
        icon: <IconWarning />,
        color: 'yellow',
    },
]

// Custom Features slide - reorders features and maintains label positions
const CustomFeaturesSlide = () => {
    const productData = useProduct({ handle: PRODUCT_HANDLE }) as any
    const allFeatures = productData?.features || []

    // Define the desired order for features (only features without templates appear in this slide)
    const featureOrder = [
        'Dashboard',
        'Generations',
        'Traces',
        'Users',
        'Errors',
        'Sessions',
        'Playground',
        'Evaluations',
        'Datasets',
        'Prompts',
        'Analysis',
        'Customizations',
    ]

    // Filter to items that should appear in the features slide (labels and features without templates)
    const itemsForSlide = allFeatures.filter(
        (f: any) => f.label || ((!f.template || f.template === 'tabs') && f.handle !== 'native_integrations')
    )

    // Separate labels and features
    const labels = itemsForSlide.filter((f: any) => f.label)
    const featuresWithoutTemplates = itemsForSlide.filter((f: any) => !f.label)

    // Reorder features based on the desired order, keeping any features not in the order list at the end
    const orderedFeatures = featureOrder
        .map((title) => featuresWithoutTemplates.find((f: any) => f.title === title))
        .filter((f) => f !== undefined)
        .concat(featuresWithoutTemplates.filter((f: any) => !featureOrder.includes(f.title)))

    // Build final features array maintaining label positions:
    // 1. "Features" label
    // 2. Features up to and including "Prompts"
    // 3. "Advanced analytics" label
    // 4. "Analysis" and "Customizations"
    const finalFeatures: any[] = []

    // Add "Features" label first
    const featuresLabel = labels.find((l: any) => l.label === 'Features')
    if (featuresLabel) {
        finalFeatures.push(featuresLabel)
    }

    // Add features up to and including Prompts
    const promptsIndex = featureOrder.indexOf('Prompts')
    const featuresUpToPrompts = orderedFeatures.filter((f: any) => {
        const index = featureOrder.indexOf(f.title)
        return index >= 0 && index <= promptsIndex
    })
    finalFeatures.push(...featuresUpToPrompts)

    // Add "Advanced analytics" label
    const advancedLabel = labels.find((l: any) => l.label === 'Advanced analytics')
    if (advancedLabel) {
        finalFeatures.push(advancedLabel)
    }

    // Add Analysis and Customizations (features after Prompts in the order)
    const analysisIndex = featureOrder.indexOf('Analysis')
    const advancedFeatures = orderedFeatures.filter((f: any) => {
        const index = featureOrder.indexOf(f.title)
        return index >= analysisIndex
    })
    finalFeatures.push(...advancedFeatures)

    return <FeaturesSlide features={finalFeatures} />
}

// Custom Native Integrations slide
const NativeIntegrationsSlide = () => {
    const integrations = [
        {
            logo: OpenAILogo,
            name: 'OpenAI',
            link: '/docs/llm-analytics/installation/openai',
        },
        {
            logo: AnthropicLogo,
            name: 'Anthropic',
            link: '/docs/llm-analytics/installation/anthropic',
        },
        {
            logo: GeminiLogo,
            name: 'Google Gemini',
            link: '/docs/llm-analytics/installation/google',
        },
        {
            logo: LangChainLogo,
            name: 'LangChain',
            link: '/docs/llm-analytics/installation/langchain',
        },
        {
            logo: VercelLogo,
            name: 'Vercel AI SDK',
            link: '/docs/llm-analytics/installation/vercel-ai',
        },
        {
            logo: OpenRouterLogo,
            name: 'OpenRouter',
            link: '/docs/llm-analytics/installation/openrouter',
        },
        {
            logoLight: LiteLLMLogoLight,
            logoDark: LiteLLMLogoDark,
            name: 'LiteLLM',
            link: '/docs/llm-analytics/installation/litellm',
        },
        {
            isManualCapture: true,
            name: '</> Manual Capture',
            link: '/docs/llm-analytics/installation/manual-capture',
        },
    ]

    const additionalProviders = [
        'AWS Bedrock',
        'Perplexity',
        'Azure',
        'Databricks',
        'Groq',
        'Lepton',
        'Mistral AI',
        'Deepseek',
        'Cohere',
        'xAI',
        'Fireworks',
        'And more...',
    ]

    return (
        <div data-scheme="primary" className="flex flex-col h-full bg-primary text-primary px-12 @2xl:px-16 py-12">
            <h2 className="text-5xl text-balance mb-4 text-center">Simple SDKs for popular LLM providers</h2>
            <p className="text-xl text-secondary mb-10 @2xl:mb-12 text-center">
                Instrument any LLM. Use PostHog-maintained wrappers for popular providers, or manual capture for
                everything else.
            </p>

            <div className="flex flex-col @2xl:flex-row @2xl:items-start gap-4 @2xl:gap-6 flex-1 min-h-0">
                <div className="flex-[2]">
                    <div data-scheme="secondary" className="grid grid-cols-2 gap-3 @2xl:gap-4">
                        {integrations.map((integration, index) => (
                            <Link
                                key={index}
                                to={integration.link}
                                state={{ newWindow: true }}
                                className="bg-primary rounded p-4 @2xl:p-6 flex flex-col items-center justify-center text-center hover:opacity-80 transition-opacity"
                            >
                                {integration.isManualCapture ? (
                                    <h3 className="text-2xl font-semibold text-primary">&lt;/&gt; Manual Capture</h3>
                                ) : (
                                    <>
                                        {integration.logo && (
                                            <div className="flex items-center justify-center">
                                                <img
                                                    src={integration.logo}
                                                    alt={integration.name}
                                                    className={`w-auto object-contain ${
                                                        integration.name === 'Anthropic' ? 'h-6' : 'h-8'
                                                    }`}
                                                />
                                            </div>
                                        )}
                                        {integration.logoLight && integration.logoDark && (
                                            <div className="flex items-center justify-center">
                                                <img
                                                    src={integration.logoLight}
                                                    alt={integration.name}
                                                    className="h-8 w-auto object-contain dark:hidden"
                                                />
                                                <img
                                                    src={integration.logoDark}
                                                    alt={integration.name}
                                                    className="h-8 w-auto object-contain hidden dark:block"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex-1 min-h-0">
                    <div data-scheme="secondary" className="bg-primary rounded p-6 h-full flex flex-col min-h-0">
                        <h3 className="text-2xl font-semibold mb-4">We also support</h3>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                            {additionalProviders.map((provider, index) => (
                                <li key={index} className="text-lg text-secondary">
                                    {provider}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/docs/llm-analytics/installation/manual-capture"
                            className="text-lg font-semibold underline inline-flex items-center gap-1 group mt-auto mb-3"
                            state={{ newWindow: true }}
                        >
                            Learn about manual capture
                            <IconArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            <p className="text-lg text-secondary text-center mt-8 flex items-center justify-center gap-2">
                <IconLightBulb className="size-5 flex-shrink-0" />
                <span>Using another LLM observability tool? Analyze that data alongside product usage in PostHog.</span>
            </p>
        </div>
    )
}

const CustomerLogo = ({ customer, className = 'h-8' }: { customer: Customer; className?: string }) => {
    const { logo, name } = customer

    if (typeof logo === 'function') {
        const Logo = logo
        return <Logo className={`${className} w-auto fill-current object-contain`} />
    }

    if (logo && 'light' in logo) {
        return (
            <>
                <img src={logo.light} alt={name} className={`${className} w-auto object-contain dark:hidden`} />
                <img src={logo.dark} alt={name} className={`${className} w-auto object-contain hidden dark:block`} />
            </>
        )
    }

    return null
}

const AIEngineers = () => {
    const { getCustomers } = useCustomers()
    const aiEngineers = getCustomers(['grantable', 'hostai', 'juicebox', 'zealot'])

    return (
        <div className="mt-8 text-center">
            <p className="text-lg text-secondary mb-4">and AI product engineers at...</p>
            <div className="grid grid-cols-4 gap-4">
                {aiEngineers.map((customer) => (
                    <div key={customer.slug} className="flex items-center justify-center">
                        <CustomerLogo customer={customer} />
                    </div>
                ))}
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
        exclude: ['answers', 'videos', 'pairs-with', 'feature-platform_integrations'],
        order: [
            'overview',
            'customers',
            'feature-trace_monitoring',
            'feature-cost_analysis',
            'feature-performance_monitoring',
            'features',
            'native_integrations',
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
        overrides: {
            customers: {
                props: {
                    belowContent: <AIEngineers />,
                },
            },
            overview: {
                props: {
                    className: '!bg-purple bg-llm-analytics',
                },
            },
        },
    })

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
