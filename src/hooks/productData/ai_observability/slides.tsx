import React from 'react'
import {
    IconBell,
    IconBolt,
    IconBrowser,
    IconDashboard,
    IconLightBulb,
    IconListTreeConnected,
    IconLlmPromptEvaluation,
    IconPiggyBank,
    IconPlug,
    IconSparkles,
    IconTrends,
    IconWarning,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import Link from 'components/Link'
import PlatformInstall from 'components/PlatformInstall'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { getLogo } from '../../../constants/logos'
import { features as f } from './features'

import AnthropicLogo from '../../../../contents/images/docs/llms/Anthropic_logo_2025.svg'
import AnthropicGlyph from '../../../../contents/images/docs/llms/anthropic.svg'
import GeminiLogo from '../../../../contents/images/docs/llms/Google_Gemini_logo_2025.svg'
import GeminiGlyph from '../../../../contents/images/docs/llms/gemini.svg'
import LangChainLogo from '../../../../contents/images/docs/llms/LangChain_Logo.svg'
import LangChainGlyph from '../../../../contents/images/docs/llms/langchain.svg'
import LiteLLMLogoDark from '../../../../contents/images/docs/llms/LiteLLM_logo_white.png'
import LiteLLMLogoLight from '../../../../contents/images/docs/llms/LiteLLM_logo_black.png'
import OpenAILogo from '../../../../contents/images/docs/llms/OpenAI_Logo.svg'
import OpenAIGlyph from '../../../../contents/images/docs/llms/openai.svg'
import OpenRouterLogo from '../../../../contents/images/docs/llms/OpenRouter_logo_2025.svg'
import OpenRouterGlyph from '../../../../contents/images/docs/llms/openrouterai.png'
import VercelLogo from '../../../../contents/images/docs/llms/Vercel_logo_2025.svg'
import VercelGlyph from '../../../../contents/images/docs/llms/vercel.svg'

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

// Every documented integration beyond the logo tiles above – one entry per page
// under /docs/ai-observability/installation, so the slide never undersells coverage.
const additionalProviders: Array<{ name: string; slug: string }> = [
    { name: 'AutoGen', slug: 'autogen' },
    { name: 'AWS Bedrock', slug: 'aws-bedrock' },
    { name: 'Azure OpenAI', slug: 'azure-openai' },
    { name: 'Cerebras', slug: 'cerebras' },
    { name: 'Claude Agent SDK', slug: 'claude-agent-sdk' },
    { name: 'Claude Code', slug: 'claude-code' },
    { name: 'Cloudflare AI Gateway', slug: 'cloudflare-ai-gateway' },
    { name: 'Cohere', slug: 'cohere' },
    { name: 'Convex', slug: 'convex' },
    { name: 'CrewAI', slug: 'crewai' },
    { name: 'Dedalus', slug: 'dedalus' },
    { name: 'DeepSeek', slug: 'deepseek' },
    { name: 'DSPy', slug: 'dspy' },
    { name: 'Eve', slug: 'eve' },
    { name: 'Fireworks AI', slug: 'fireworks-ai' },
    { name: 'Groq', slug: 'groq' },
    { name: 'Helicone', slug: 'helicone' },
    { name: 'Hugging Face', slug: 'hugging-face' },
    { name: 'Instructor', slug: 'instructor' },
    { name: 'LangGraph', slug: 'langgraph' },
    { name: 'Mastra', slug: 'mastra' },
    { name: 'Mirascope', slug: 'mirascope' },
    { name: 'Mistral AI', slug: 'mistral' },
    { name: 'Ollama', slug: 'ollama' },
    { name: 'OpenAI Agents SDK', slug: 'openai-agents' },
    { name: 'OpenClaw', slug: 'openclaw' },
    { name: 'OpenTelemetry', slug: 'opentelemetry' },
    { name: 'Perplexity', slug: 'perplexity' },
    { name: 'Pi', slug: 'pi' },
    { name: 'Portkey', slug: 'portkey' },
    { name: 'Pydantic AI', slug: 'pydantic-ai' },
    { name: 'Semantic Kernel', slug: 'semantic-kernel' },
    { name: 'smolagents', slug: 'smolagents' },
    { name: 'Together AI', slug: 'together-ai' },
    { name: 'xAI', slug: 'xai' },
]

/**
 * "Supports OpenAI, Anthropic, …" teaser rows for the install CTAs. The wizard
 * instruments LLM providers here, not app frameworks, so the shared
 * `WizardFrameworksTeaser` gets this list instead of the installation taxonomy.
 * Square glyphs only (wordmark logos read as smudges at 24px). A subset of the
 * full integration list – the Integrations slide shows everything.
 */
const providerTeaser: Array<{ slug: string; label: string; image?: string }> = [
    { slug: 'openai', label: 'OpenAI', image: OpenAIGlyph },
    { slug: 'anthropic', label: 'Anthropic', image: AnthropicGlyph },
    { slug: 'google', label: 'Google Gemini', image: GeminiGlyph },
    { slug: 'langchain', label: 'LangChain', image: LangChainGlyph },
    { slug: 'vercel-ai', label: 'Vercel AI SDK', image: VercelGlyph },
    { slug: 'openrouter', label: 'OpenRouter', image: OpenRouterGlyph },
    { slug: 'litellm', label: 'LiteLLM', image: getLogo('litellm') },
    { slug: 'aws-bedrock', label: 'AWS Bedrock', image: getLogo('awsBedrock') },
    { slug: 'perplexity', label: 'Perplexity', image: getLogo('perplexity') },
    { slug: 'azure-openai', label: 'Azure', image: getLogo('azureOpenAI') },
    { slug: 'groq', label: 'Groq', image: getLogo('groq') },
    { slug: 'mistral', label: 'Mistral AI', image: getLogo('mistral') },
    { slug: 'deepseek', label: 'Deepseek', image: getLogo('deepseek') },
    { slug: 'cohere', label: 'Cohere', image: getLogo('cohere') },
    { slug: 'xai', label: 'xAI', image: getLogo('xai') },
    { slug: 'fireworks-ai', label: 'Fireworks', image: getLogo('fireworksAI') },
]

export const wizardSupports = providerTeaser.map(({ slug, label, image }) => ({
    slug,
    label,
    url: `/docs/ai-observability/installation/${slug}`,
    image,
    external: false,
}))

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
            <h4 className="text-base mb-2">
                Plus {additionalProviders.length} more providers, gateways, and agent frameworks
            </h4>
            <ul className="grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-x-4 gap-y-1 list-none p-0 m-0 text-[14px]">
                {additionalProviders.map((provider) => (
                    <li key={provider.slug} className="m-0">
                        <Link
                            to={`/docs/ai-observability/installation/${provider.slug}`}
                            state={{ newWindow: true }}
                            className="text-secondary hover:text-primary"
                        >
                            {provider.name}
                        </Link>
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
 * Applications = the interfaces you reach the product through (editor/MCP, the
 * app UI, queries and alerts), ending with Self-driving – where the product
 * comes to you instead. The features and flows themselves live in `topFeatures`;
 * nothing here should repeat them.
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
        slug: 'in-the-app',
        label: 'In the app',
        icon: <IconDashboard className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: 'One UI for every generation, trace, and user',
        description: (
            <>
                <p>
                    The AI observability tabs cover the day-to-day: a ready-made dashboard, browsable generations and
                    traces, and per-user roll-ups.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Dashboards',
                                description:
                                    'Cost, usage, latency, and errors charted the moment events arrive – plus custom dashboards you build yourself',
                            },
                            {
                                label: 'Trace explorer',
                                description: 'Drill from the list into any conversation, span by span',
                            },
                            {
                                label: 'Users and sessions',
                                description: "Spot power users, watch sessions, and see who's hitting errors",
                            },
                        ]}
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
        slug: 'query-alert',
        label: 'Query & alert',
        icon: <IconBell className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: 'LLM data is PostHog data – query and alert on it',
        description: (
            <>
                <p>
                    Every generation has an associated PostHog event, so your LLM data works with trends, funnels, SQL,
                    and dashboards – no export step.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Any insight, any metric',
                                description: 'Break down spend by model, latency by feature, or errors by user segment',
                            },
                            {
                                label: 'Anomaly alerts',
                                description:
                                    'Detectors learn what normal looks like and notify you when cost, latency, or errors spike',
                            },
                            {
                                label: 'Slack, email, or webhooks',
                                description: 'Alerts and scheduled reports land where your team already lives',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_08_12_at_5_17_12_PM_43640af689.png',
            alt: 'Anomaly detection alerts configured on LLM insights',
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
            </>
        ),
        image: {
            src: f.self_driving.images[0].src,
            alt: f.self_driving.images[0].alt,
            glow: true,
        },
    },
]

/**
 * Top features = the flows people buy the product for: tracing, cost analysis,
 * evaluations, error analysis, alerting. Interfaces live in `applications`.
 */
export const topFeatures: CarouselSlide[] = [
    {
        slug: 'tracing',
        label: 'Tracing',
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
        slug: 'clusters',
        label: 'Clusters',
        icon: <IconSparkles className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.clusters.headline,
        description: (
            <>
                <p>{f.clusters.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.clusters.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.clusters.images[0].src,
            alt: f.clusters.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'cost',
        label: 'Cost',
        icon: <IconPiggyBank className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
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
        slug: 'error-analysis',
        label: 'Error analysis',
        icon: <IconWarning className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'float',
        heading: 'Every failure, with the context to fix it',
        description: (
            <>
                <p>{f.errors.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.errors.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.errors.images[0].src,
            alt: f.errors.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'insights',
        label: 'Insights',
        icon: <IconTrends className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-lilac',
        layout: 'float',
        heading: 'Every PostHog insight works on LLM data',
        description: (
            <>
                <p>
                    Generations, traces, and eval results are queryable like any PostHog events, so the whole insights
                    toolkit applies to your AI data.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Trends and breakdowns',
                                description:
                                    'Chart cost, latency, tokens, or error rate – broken down by model, feature, or user segment',
                            },
                            {
                                label: 'Funnels and retention',
                                description: 'See whether using your AI features changes activation and retention',
                            },
                            {
                                label: 'SQL when you need it',
                                description: "Query raw generation events directly when a chart isn't enough",
                            },
                            {
                                label: 'Dashboards and alerts',
                                description:
                                    'Pin LLM insights next to product metrics, and put anomaly alerts on any of them',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.performance_monitoring.images[0].src,
            alt: 'Generation latency and error rate insights built on LLM events',
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
