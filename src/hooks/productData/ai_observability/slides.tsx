import React from 'react'
import {
    IconBolt,
    IconBrowser,
    IconLightBulb,
    IconListTreeConnected,
    IconLlmPromptEvaluation,
    IconPiggyBank,
    IconPlug,
    IconSparkles,
    IconTrends,
    IconUser,
    IconWarning,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import Link from 'components/Link'
import PlatformInstall from 'components/PlatformInstall'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'

import AnthropicLogo from '../../../../contents/images/docs/llms/Anthropic_logo_2025.svg'
import GeminiLogo from '../../../../contents/images/docs/llms/Google_Gemini_logo_2025.svg'
import LangChainLogo from '../../../../contents/images/docs/llms/LangChain_Logo.svg'
import LiteLLMLogoDark from '../../../../contents/images/docs/llms/LiteLLM_logo_white.png'
import LiteLLMLogoLight from '../../../../contents/images/docs/llms/LiteLLM_logo_black.png'
import OpenAILogo from '../../../../contents/images/docs/llms/OpenAI_Logo.svg'
import OpenRouterLogo from '../../../../contents/images/docs/llms/OpenRouter_logo_2025.svg'
import VercelLogo from '../../../../contents/images/docs/llms/Vercel_logo_2025.svg'

const nativeIntegrations: Array<{
    name: string
    link: string
    logo?: string
    logoLight?: string
    logoDark?: string
    isManualCapture?: boolean
    imgClassName?: string
}> = [
    { name: 'OpenAI', link: '/docs/ai-observability/installation/openai', logo: OpenAILogo },
    {
        name: 'Anthropic',
        link: '/docs/ai-observability/installation/anthropic',
        logo: AnthropicLogo,
        imgClassName: 'h-5',
    },
    { name: 'Google Gemini', link: '/docs/ai-observability/installation/google', logo: GeminiLogo },
    { name: 'LangChain', link: '/docs/ai-observability/installation/langchain', logo: LangChainLogo },
    { name: 'Vercel AI SDK', link: '/docs/ai-observability/installation/vercel-ai', logo: VercelLogo },
    { name: 'OpenRouter', link: '/docs/ai-observability/installation/openrouter', logo: OpenRouterLogo },
    {
        name: 'LiteLLM',
        link: '/docs/ai-observability/installation/litellm',
        logoLight: LiteLLMLogoLight,
        logoDark: LiteLLMLogoDark,
    },
    {
        name: 'Manual capture',
        link: '/docs/ai-observability/installation/manual-capture',
        isManualCapture: true,
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

const IntegrationGrid = () => (
    <div className="@container not-prose my-6">
        <ul className="grid grid-cols-2 @lg:grid-cols-4 gap-2 list-none p-0 m-0">
            {nativeIntegrations.map((integration) => (
                <li key={integration.name} className="m-0">
                    <Link
                        to={integration.link}
                        state={{ newWindow: true }}
                        className="flex h-16 items-center justify-center rounded border border-input bg-primary px-3 text-center hover:border-primary"
                    >
                        {integration.isManualCapture ? (
                            <span className="text-sm font-semibold text-primary">&lt;/&gt; Manual capture</span>
                        ) : integration.logo ? (
                            <img
                                src={integration.logo}
                                alt={integration.name}
                                className={`w-auto object-contain ${integration.imgClassName || 'h-6'}`}
                            />
                        ) : (
                            <>
                                <img
                                    src={integration.logoLight}
                                    alt={integration.name}
                                    className="h-6 w-auto object-contain dark:hidden"
                                />
                                <img
                                    src={integration.logoDark}
                                    alt={integration.name}
                                    className="hidden h-6 w-auto object-contain dark:block"
                                />
                            </>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
        <div className="mt-6">
            <h4 className="text-base mb-2">We also support</h4>
            <ul className="grid grid-cols-2 @lg:grid-cols-4 gap-x-4 gap-y-1 list-none p-0 m-0 text-[15px] text-secondary">
                {additionalProviders.map((provider) => (
                    <li key={provider} className="m-0">
                        {provider}
                    </li>
                ))}
            </ul>
        </div>
        <p className="mt-6 mb-0 flex items-start gap-2 text-[15px] text-secondary">
            <IconLightBulb className="size-5 shrink-0" />
            <span>{f.native_integrations.footnote}</span>
        </p>
    </div>
)

/**
 * Applications = the ways you show up to the product (dashboard, editor/MCP),
 * ending with Self-driving – where the product shows up to you instead.
 * Capability detail belongs in `topFeatures`.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: f.mcp.headline,
        description: (
            <>
                <aside className="my-4 @lg/reader-content:mt-2 @lg/reader-content:float-right max-w-[100%_+_1rem] @lg/reader-content:max-w-[300px] @xl/reader-content:max-w-[360px] @3xl/reader-content:max-w-[440px] @lg/reader-content:ml-8 -mr-4 @2xl/reader-content:-mr-8 @4xl/reader-content:-mr-10">
                    <Glow color="black" intensity="gentle" rounded="lg">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/mcp_example_light_cf355dbe0d.png"
                            className="dark:hidden w-full"
                            imgClassName="w-full"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/mcp_example_dark_c535f2d8b4.png"
                            className="hidden dark:inline-block w-full"
                            imgClassName="w-full"
                        />
                    </Glow>
                </aside>
                <p>{f.mcp.description}</p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={f.mcp.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                    <PlatformInstall />
                </div>
            </>
        ),
    },
    {
        slug: 'analyze',
        label: 'Analyze',
        icon: <IconTrends className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: 'Analyze cost, usage, and performance',
        description: (
            <>
                <p>
                    Every generation is a regular PostHog event, so your LLM data works with trends, funnels, SQL, and
                    dashboards – no export step.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Ready-made dashboard',
                                description: 'Cost, usage, latency, and errors charted the moment events arrive',
                            },
                            {
                                label: 'Any insight, any metric',
                                description: 'Break down spend by model, latency by feature, or errors by user segment',
                            },
                            {
                                label: 'Anomaly alerts',
                                description:
                                    'Detectors learn what normal looks like and notify you when cost, latency, or errors spike',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.performance_monitoring.images[0].src,
            alt: f.performance_monitoring.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'debug',
        label: 'Debug',
        icon: <IconWarning className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: 'When a generation goes wrong, follow it end to end',
        description: (
            <>
                <p>
                    Open the trace, find the generation that failed or stalled, and read the exact prompt, response,
                    model parameters, and metadata behind it. From there, jump to the recording of the session it
                    happened in to see what the user was doing at the time.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Trace timeline',
                                description:
                                    'A waterfall of every span and generation, with latency and cost at each step',
                            },
                            { label: f.errors.title, description: f.errors.description },
                            { label: f.sessions.title, description: f.sessions.description },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.trace_monitoring.images[0].src,
            alt: f.trace_monitoring.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'evaluate',
        label: 'Evaluate',
        icon: <IconLlmPromptEvaluation className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'float',
        heading: 'Evaluate AI quality in production',
        description: (
            <>
                <p>{f.evaluations.description}</p>
                <div className="@container">
                    <LabeledList
                        items={[
                            ...f.evaluations.features.map((item) => ({
                                label: item.title,
                                description: item.description,
                            })),
                            { label: f.playground.title, description: f.playground.description },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.evaluations.images[0].src,
            alt: f.evaluations.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'self-drive',
        label: 'Self-drive',
        icon: <IconBolt className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'float',
        heading: f.self_driving.headline,
        description: (
            <>
                <p>{f.self_driving.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.self_driving.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
                <p>
                    Reports are free; pull requests are priced per PR. Read more in the{' '}
                    <Link to="/docs/ai-observability/self-driving" state={{ newWindow: true }}>
                        Self-driving docs
                    </Link>
                    .
                </p>
            </>
        ),
        image: {
            src: f.self_driving.images[0].src,
            alt: f.self_driving.images[0].alt,
            glow: true,
        },
    },
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'traces',
        label: 'Traces',
        icon: <IconListTreeConnected className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.trace_monitoring.headline,
        description: (
            <>
                <p>{f.trace_monitoring.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.trace_monitoring.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.trace_monitoring.images[0].src,
            alt: f.trace_monitoring.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'generations',
        label: 'Generations',
        icon: <IconSparkles className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.generations.headline,
        description: (
            <>
                <p>{f.generations.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.generations.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.generations.images[0].src,
            alt: f.generations.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'evaluations',
        label: 'Evaluations',
        icon: <IconLlmPromptEvaluation className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'float',
        heading: f.evaluations.headline,
        description: (
            <>
                <p>{f.evaluations.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.evaluations.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.evaluations.images[0].src,
            alt: f.evaluations.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'costs',
        label: 'Costs',
        icon: <IconPiggyBank className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.cost_analysis.headline,
        description: (
            <>
                <p>{f.cost_analysis.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.cost_analysis.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.cost_analysis.images[0].src,
            alt: f.cost_analysis.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'performance',
        label: 'Performance',
        icon: <IconTrends className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-lilac',
        layout: 'float',
        heading: f.performance_monitoring.headline,
        description: (
            <>
                <p>{f.performance_monitoring.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.performance_monitoring.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.performance_monitoring.images[0].src,
            alt: f.performance_monitoring.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'users',
        label: 'Users',
        icon: <IconUser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'float',
        heading: f.users.headline,
        description: (
            <>
                <p>{f.users.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.users.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.users.images[0].src,
            alt: f.users.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'integrations',
        label: 'Integrations',
        icon: <IconPlug className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: f.native_integrations.headline,
        description: (
            <>
                <p>{f.native_integrations.description}</p>
                <IntegrationGrid />
            </>
        ),
    },
]
