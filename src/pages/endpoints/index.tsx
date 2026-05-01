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
import EndpointsPlayground, { scenarios } from 'components/Docs/EndpointsPlayground'
import { useState } from 'react'
import { IconChevronDown } from '@posthog/icons'
import { AnimatePresence, motion } from 'framer-motion'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'endpoints'

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

const EndpointsPricingSlide = () => (
    <div className="h-full flex flex-col items-center justify-center p-12 text-primary bg-primary">
        <h2 className="text-4xl font-bold text-primary mb-8 text-center">Pricing</h2>
        <div className="bg-accent dark:bg-accent-dark border border-primary rounded-md p-6 max-w-2xl text-center">
            <p className="text-xl font-bold text-primary mb-4">Pricing is coming soon</p>
            <p className="text-lg text-secondary mb-0">
                We'll offer usage-based pricing with a generous monthly free tier – like we do with all of our paid
                products.
            </p>
        </div>
    </div>
)

const EndpointsPlaygroundSlide = () => {
    const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0]

    return (
        <div className="flex flex-col items-center h-full px-8 py-12 text-black bg-teal">
            <h2 className="text-5xl text-center text-balance mb-4">From HogQL to URL</h2>
            <div className="text-center mb-8">
                <p className="text-xl inline">
                    <span className="text-black">Create an endpoint for</span>{' '}
                    <span className="relative inline-block">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="inline-flex items-center font-semibold text-black underline"
                        >
                            <span>{selectedScenario.name.toLowerCase()}</span>
                            <IconChevronDown
                                className={`size-6 transition-transform mt-1 ${dropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.1 }}
                                    className="absolute top-full left-0 mt-2 bg-primary border border-primary rounded-md shadow-lg z-50 overflow-hidden min-w-[220px]"
                                >
                                    {scenarios.map((scenario) => (
                                        <button
                                            key={scenario.id}
                                            onClick={() => {
                                                setSelectedScenarioId(scenario.id)
                                                setDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-3 py-2 hover:bg-accent ${
                                                scenario.id === selectedScenarioId
                                                    ? 'text-red dark:text-yellow'
                                                    : 'text-primary'
                                            }`}
                                        >
                                            <div className="text-sm font-medium">{scenario.name}</div>
                                            <div className="text-xs text-muted">{scenario.description}</div>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </span>
                </p>
            </div>
            <div className="w-full max-w-3xl">
                <EndpointsPlayground scenarioId={selectedScenarioId} />
            </div>
        </div>
    )
}

export default function Endpoints(): JSX.Element {
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
                slug: 'pricing',
                name: 'Pricing',
                component: EndpointsPricingSlide,
            },
            {
                slug: 'playground',
                name: 'Playground',
                component: EndpointsPlaygroundSlide,
            },
        ],
        templates: {
            overview: 'stacked',
        },
        exclude: ['answers', 'videos', 'posthog-on-posthog', 'customers'],
        order: [
            'overview',
            // 'customers',
            'features',
            'dashboards',
            'use_cases',
            'sql_endpoints',
            'playground',
            'pricing',
            'comparison-summary',
            'feature-comparison',
            'docs',
            'pairs-with',
            'getting-started',
        ],
    })

    // Merge content data with product data
    const mergedData = {
        ...data,
        ...contentData,
    }

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={mergedData} slideConfig={slides} />
}
