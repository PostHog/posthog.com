import React, { useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
import {
    IconAI,
    IconArrowUpRight,
    IconBolt,
    IconBook,
    IconCheck,
    IconCode,
    IconCursor,
    IconDatabase,
    IconExternal,
    IconFlask,
    IconGithub,
    IconGraph,
    IconHandMoney,
    IconMessage,
    IconPieChart,
    IconPlug,
    IconRewindPlay,
    IconStack,
    IconTerminal,
    IconToggle,
    IconWarning,
} from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import MDXEditor from 'components/MDXEditor'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import WistiaVideo from 'components/WistiaVideo'
import TeamMember from 'components/TeamMember'
import { Bang } from 'components/Icons'

function AskClaude({ question, label = 'Ask Claude' }: { question: string; label?: string }): JSX.Element {
    const url = `https://claude.ai/new?q=${encodeURIComponent(question)}`
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open this question in Claude"
            className="not-prose inline-flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded border border-border dark:border-border-dark text-secondary hover:text-red dark:hover:text-yellow hover:border-primary hover:bg-accent/60 transition-colors no-underline whitespace-nowrap align-middle"
        >
            <IconAI className="size-3" />
            {label}
        </a>
    )
}

function Q({ text }: { text?: string }): JSX.Element {
    const heading = text || ''
    return (
        <h2 className="!mt-12 !mb-4 first:!mt-6">
            {heading}
            <span className="inline-block align-middle ml-2 -translate-y-0.5">
                <AskClaude question={heading} />
            </span>
        </h2>
    )
}

function MCPHeader(): JSX.Element {
    return (
        <header
            className="relative not-prose mb-8 overflow-hidden rounded-t-sm"
            style={{
                width: '100cqw',
                marginLeft: 'calc(50% - 50cqw)',
            }}
        >
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                className="dark:hidden absolute inset-0"
                imgClassName="h-full w-full"
            />
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                className="hidden dark:block absolute inset-0"
                imgClassName="h-full w-full"
            />
            <div className="relative flex flex-col-reverse @lg:flex-row items-center px-5 pt-6 pb-12 max-w-3xl mx-auto gap-4 @lg:gap-2">
                <div className="flex-1 text-center @lg:text-left">
                    <div className="flex gap-1.5 justify-center @lg:justify-start items-center mb-3">
                        <span className="w-4 h-4 text-purple">
                            <IconPlug />
                        </span>
                        <span className="text-[12px] font-semibold uppercase tracking-wider opacity-60">MCP</span>
                        <span className="text-[10px] font-bold opacity-90 bg-yellow px-1.5 py-0.5 rounded-sm uppercase text-primary tracking-wider">
                            Beta
                        </span>
                    </div>
                    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold !leading-[1.05] !mb-3 !mt-0 tracking-tight">
                        Ask questions.
                        <br />
                        <span className="text-red dark:text-yellow">Get answers.</span>
                    </h1>
                    <p className="!mt-0 !mb-5 text-base @sm:text-lg italic opacity-80">
                        The future isn't complicated. It doesn't even have a UI.
                    </p>
                    <WizardCommand command="mcp add" slim />
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 justify-center @lg:justify-start text-[11px] uppercase font-semibold tracking-wider opacity-60">
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3" />
                            50+ tools
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3" />
                            Open source
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3" />
                            Certified no-UI
                        </span>
                    </div>
                </div>
                <div className="shrink-0">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/mcp_hog_05867b6214.png"
                        alt="PostHog hedgehog with a wand"
                        className="w-36 @lg:w-52"
                    />
                </div>
            </div>
        </header>
    )
}

function ExplainerVideo(): JSX.Element {
    return (
        <div className="not-prose my-6">
            <p className="text-sm opacity-70 mb-3">
                Here&apos;s <TeamMember name="Matt Brooker" photo /> explaining the PostHog MCP server.
            </p>
            <div className="rounded-md overflow-hidden border border-primary shadow-md">
                <div className="aspect-video">
                    <WistiaVideo videoId="tjc4o4lldr" className="!aspect-video" autoPlay={false} />
                </div>
            </div>
        </div>
    )
}

function DemoVideo(): JSX.Element {
    return (
        <div className="not-prose my-6">
            <div className="rounded-md overflow-hidden border border-primary shadow-md">
                <div className="bg-accent dark:bg-accent-dark border-b border-primary px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-red/60" />
                        <span className="size-2.5 rounded-full bg-yellow/80" />
                        <span className="size-2.5 rounded-full bg-green/70" />
                    </div>
                    <span className="text-[11px] font-mono opacity-60 ml-2 truncate">posthog-mcp · claude code</span>
                    <span className="ml-auto text-[9px] uppercase tracking-wider font-semibold opacity-50 inline-flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-green animate-pulse" />
                        Live
                    </span>
                </div>
                <div className="aspect-video bg-black">
                    <video
                        src="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_error_tracking_debugging30_6e25828d88.mp4"
                        className="w-full h-full"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
            </div>
            <p className="text-center text-xs opacity-60 mt-2 mb-0 italic">Copy, paste, type `debug`, done</p>
        </div>
    )
}

interface SubfeatureItem {
    title: string
    description: string
    icon: React.ReactNode
    color: string
}

function Subfeatures(): JSX.Element {
    const items: SubfeatureItem[] = [
        {
            title: 'In your editor',
            description: 'Cursor, Claude, Codex, Zed, VS Code, PostHog Code. Wherever you build.',
            icon: <IconCode />,
            color: 'blue',
        },
        {
            title: 'Ask in English',
            description: 'The MCP picks the right query, runs it against your data, and writes back.',
            icon: <IconMessage />,
            color: 'purple',
        },
        {
            title: 'Costs nothing',
            description: "The MCP doesn't show up on your PostHog bill. Not even on the free plan.",
            icon: <IconHandMoney />,
            color: 'seagreen',
        },
    ]
    return (
        <ul className="list-none p-0 my-6 grid grid-cols-1 @sm:grid-cols-3 gap-3 not-prose">
            {items.map((item) => (
                <li
                    key={item.title}
                    className="bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-md p-4"
                >
                    <span
                        className={`inline-flex w-9 h-9 mb-3 items-center justify-center rounded bg-${item.color}/10 text-${item.color}`}
                    >
                        <span className="w-5 h-5">{item.icon}</span>
                    </span>
                    <p className="font-bold text-[15px] mb-1 leading-tight">{item.title}</p>
                    <p className="text-[13px] opacity-75 m-0 leading-snug">{item.description}</p>
                </li>
            ))}
        </ul>
    )
}

function MCPFaqGrid(): JSX.Element {
    const rows = [
        { q: 'Can it run a funnel?', a: 'Yes.' },
        { q: 'Can it pull errors by occurrence?', a: 'Yes.' },
        { q: 'Can it write the SQL?', a: 'Yes.' },
        { q: 'Can it remember your event taxonomy?', a: 'Yes. Better than you do.' },
    ]
    return (
        <div className="not-prose">
            <div className="border border-primary rounded overflow-hidden">
                {rows.map((row, idx) => (
                    <div
                        key={row.q}
                        className={`grid grid-cols-[1fr,auto] divide-x divide-border dark:divide-border-dark ${
                            idx > 0 ? 'border-t border-border dark:border-border-dark' : ''
                        }`}
                    >
                        <div className="px-3 py-2 text-sm font-semibold">{row.q}</div>
                        <div className="px-3 py-2 text-sm font-mono text-secondary min-w-[180px]">{row.a}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface SupportedProduct {
    label: string
    url: string
    icon: React.ReactNode
}

const supportedProducts: SupportedProduct[] = [
    { label: 'Product analytics', url: '/product-analytics', icon: <IconGraph /> },
    { label: 'Web analytics', url: '/web-analytics', icon: <IconPieChart /> },
    { label: 'Session replay', url: '/session-replay', icon: <IconRewindPlay /> },
    { label: 'Error tracking', url: '/error-tracking', icon: <IconWarning /> },
    { label: 'Feature flags', url: '/feature-flags', icon: <IconToggle /> },
    { label: 'Experiments', url: '/experiments', icon: <IconFlask /> },
    { label: 'Dashboards', url: '/docs/product-analytics/dashboards', icon: <IconPieChart /> },
    { label: 'Insights', url: '/docs/product-analytics/insights', icon: <IconGraph /> },
    { label: 'Cohorts', url: '/docs/data/cohorts', icon: <IconStack /> },
    { label: 'Surveys', url: '/surveys', icon: <IconMessage /> },
    { label: 'LLM analytics', url: '/docs/ai-engineering', icon: <IconAI /> },
    { label: 'Logs', url: '/docs/ai-engineering/observability', icon: <IconTerminal /> },
    { label: 'Data warehouse', url: '/docs/data-warehouse', icon: <IconDatabase /> },
    { label: 'CDP / workflows', url: '/docs/cdp', icon: <IconPlug /> },
    { label: 'Conversations', url: '/docs/support', icon: <IconMessage /> },
    { label: 'Annotations', url: '/docs/product-analytics/annotations', icon: <IconBook /> },
    { label: 'Notebooks', url: '/docs/notebooks', icon: <IconBook /> },
    { label: 'Alerts', url: '/docs/product-analytics/alerts', icon: <IconBolt /> },
    { label: 'Early access features', url: '/docs/feature-flags/early-access-feature-management', icon: <IconFlask /> },
    { label: 'HogQL / SQL', url: '/docs/hogql', icon: <IconDatabase /> },
]

function SupportedProductsSidebar(): JSX.Element {
    return (
        <aside className="not-prose bg-accent dark:bg-accent-dark border border-primary rounded-md p-4">
            <p className="text-[10px] uppercase font-bold tracking-wider text-secondary m-0 mb-1">Supported products</p>
            <p className="text-[12px] opacity-70 m-0 mb-3 leading-snug">
                Tools available across these PostHog products.
            </p>
            <ul className="list-none p-0 m-0 space-y-1">
                {supportedProducts.map((product) => (
                    <li key={product.label}>
                        <Link
                            to={product.url}
                            className="group flex items-center gap-2 py-1 px-1.5 rounded text-[13px] !text-inherit !no-underline hover:bg-white dark:hover:bg-black transition-colors"
                        >
                            <span className="size-3.5 text-secondary opacity-75 group-hover:opacity-100 group-hover:text-red dark:group-hover:text-yellow shrink-0">
                                {product.icon}
                            </span>
                            <span className="font-semibold truncate">{product.label}</span>
                            <IconArrowUpRight className="size-3 opacity-0 group-hover:opacity-50 ml-auto shrink-0" />
                        </Link>
                    </li>
                ))}
            </ul>
            <p className="text-[11px] opacity-60 m-0 mt-3 leading-snug">
                <Link to="/docs/model-context-protocol" className="underline !text-inherit">
                    See the full tool list →
                </Link>
            </p>
        </aside>
    )
}

function MCPCapabilitiesLayout(): JSX.Element {
    return (
        <div className="not-prose my-6 grid grid-cols-1 @lg:grid-cols-[1fr,260px] gap-6 items-start">
            <MCPFaqGrid />
            <SupportedProductsSidebar />
        </div>
    )
}

interface CapabilityItem {
    title: string
    prompt: string
    icon: React.ReactNode
    color: string
}

const capabilityList: CapabilityItem[] = [
    {
        title: 'Product analytics',
        prompt: "What's our 30-day user retention?",
        icon: <IconGraph />,
        color: 'blue',
    },
    {
        title: 'Error tracking',
        prompt: 'Show me the top 5 errors this week.',
        icon: <IconWarning />,
        color: 'orange',
    },
    {
        title: 'Session replay',
        prompt: 'Find a replay where a user got frustrated and rage-clicked.',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'Feature flags',
        prompt: 'List all my feature flags and their rollout percentages.',
        icon: <IconToggle />,
        color: 'seagreen',
    },
    {
        title: 'Experiments',
        prompt: 'Summarise the results of my running experiments.',
        icon: <IconFlask />,
        color: 'purple',
    },
    {
        title: 'SQL & warehouse',
        prompt: 'Run a HogQL query to count events from the last 24 hours.',
        icon: <IconDatabase />,
        color: 'red',
    },
    {
        title: 'Web analytics',
        prompt: 'Which referrers drove the most traffic last week?',
        icon: <IconPieChart />,
        color: 'blue',
    },
    {
        title: 'LLM analytics',
        prompt: "What's the average tokens per trace today?",
        icon: <IconAI />,
        color: 'purple',
    },
]

function Capabilities(): JSX.Element {
    return (
        <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-3 my-6 not-prose">
            {capabilityList.map((cap) => {
                const url = `https://claude.ai/new?q=${encodeURIComponent(cap.prompt)}`
                return (
                    <div key={cap.title} className="h-[170px] relative group [perspective:1000px]">
                        <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            <div className="absolute h-full w-full [backface-visibility:hidden] flex flex-col justify-center items-center bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded p-3 text-center">
                                <span
                                    className={`inline-flex w-10 h-10 mb-2 items-center justify-center rounded bg-${cap.color}/10 text-${cap.color}`}
                                >
                                    <span className="w-5 h-5">{cap.icon}</span>
                                </span>
                                <h4 className="text-[14px] font-bold mb-0 leading-tight">{cap.title}</h4>
                            </div>
                            <div className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded p-3 flex flex-col text-left">
                                <p className="text-[9px] uppercase font-bold text-secondary mb-1 tracking-wider">
                                    Try asking
                                </p>
                                <p className="text-[13px] m-0 leading-snug font-mono flex-1">"{cap.prompt}"</p>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-red dark:text-yellow hover:underline no-underline self-start"
                                >
                                    <IconAI className="size-3" />
                                    Run in Claude
                                    <IconExternal className="size-2.5 opacity-60" />
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

interface SocialCardProps {
    username: string
    handle: string
    quote: string
    platform: 'twitter' | 'reddit'
    avatarColor: string
}

const complaintList: SocialCardProps[] = [
    {
        username: 'Maya',
        handle: 'productpilled',
        quote: "I just spent 20 minutes trying to find where to add a property filter. I'm a senior engineer.",
        platform: 'twitter',
        avatarColor: 'red',
    },
    {
        username: 'Dan',
        handle: 'dashboardregret',
        quote: 'The PostHog UI has, conservatively, 14,000 menus.',
        platform: 'reddit',
        avatarColor: 'blue',
    },
    {
        username: 'Sam',
        handle: 'phdrequired',
        quote: 'PostHog is great if you have 6 hours and a PhD in product analytics.',
        platform: 'twitter',
        avatarColor: 'orange',
    },
    {
        username: 'Jess',
        handle: 'tabhoarder',
        quote: 'I have 14 PostHog tabs open. I do not know why.',
        platform: 'reddit',
        avatarColor: 'yellow',
    },
]

function ComplaintCard({ c, rotation }: { c: SocialCardProps; rotation: string }): JSX.Element {
    return (
        <div
            className={`bg-white dark:bg-accent-dark border border-primary rounded-md p-3 flex flex-col gap-2 ${rotation} hover:rotate-0 hover:scale-[1.02] transition-transform`}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`size-7 rounded-full bg-${c.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                >
                    {c.username.charAt(0).toUpperCase()}
                </div>
                <div className="leading-tight">
                    <p className="font-semibold text-[13px] m-0">{c.username}</p>
                    <p className="text-[11px] text-secondary m-0">
                        {c.platform === 'twitter' ? `@${c.handle}` : `u/${c.handle}`}
                    </p>
                </div>
                <span className="ml-auto text-[10px] text-secondary opacity-60 uppercase tracking-wider">
                    {c.platform === 'twitter' ? '𝕏' : 'Reddit'}
                </span>
            </div>
            <p className="text-[13px] m-0 leading-snug flex-1">"{c.quote}"</p>
            <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center gap-1 bg-yellow text-primary text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm tracking-wider">
                    <IconCheck className="size-2.5" />
                    Should've used MCP
                </span>
            </div>
        </div>
    )
}

function Complaints(): JSX.Element {
    const rotations = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.5deg]']
    return (
        <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3 my-6 not-prose">
            {complaintList.map((c, idx) => (
                <ComplaintCard key={c.handle} c={c} rotation={rotations[idx % rotations.length]} />
            ))}
        </div>
    )
}

function FutureNoUI(): JSX.Element {
    const rotations = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.5deg]']
    return (
        <div className="not-prose my-6 grid grid-cols-1 @lg:grid-cols-[1fr,1fr] gap-6 @lg:gap-8 items-start">
            <div className="prose dark:prose-invert max-w-none text-[15px] leading-relaxed">
                <p>
                    PostHog is a big platform, with a lot of tools. We built the MCP because we kept seeing comments
                    like the ones over there &mdash; that the UI is overwhelming, or that people didn't realise all the
                    things PostHog can do.
                </p>
                <p>
                    Even our own marketing team found it{' '}
                    <Link to="/newsletter/hidden-danger-of-shipping-fast">
                        hard to keep up with how fast we ship things
                    </Link>
                    .
                </p>
                <p>
                    We could have run a big marketing campaign to tell you otherwise. We could have tested a new UI
                    every week. But what if the future is no UI at all?
                </p>
                <p>What if, with the MCP, you don't even need to use PostHog to use PostHog?</p>
                <div className="mt-5 bg-accent dark:bg-accent-dark border border-primary rounded-md p-4">
                    <p className="font-bold text-[15px] m-0 mb-1">"But what if I like the PostHog UI?"</p>
                    <p className="text-[13px] m-0 opacity-80 leading-snug">
                        You can still log in to PostHog if you want to do things the old-fashioned way. While you're
                        there, tell <TeamMember name="Adam Leith" photo /> you like it.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">
                {complaintList.map((c, idx) => (
                    <ComplaintCard key={c.handle} c={c} rotation={rotations[idx % rotations.length]} />
                ))}
            </div>
        </div>
    )
}

interface SupportedClient {
    label: string
    url: string
    icon: React.ReactNode
    comingSoon?: boolean
}

const codeEditors: SupportedClient[] = [
    { label: 'PostHog Code', url: '/code', icon: <IconCursor />, comingSoon: true },
    { label: 'Cursor', url: '/docs/model-context-protocol/cursor', icon: <IconCursor /> },
    { label: 'Claude Code', url: '/docs/model-context-protocol/claude-code', icon: <IconTerminal /> },
    { label: 'Claude Desktop', url: '/docs/model-context-protocol/claude-desktop', icon: <IconMessage /> },
    { label: 'Codex', url: '/docs/model-context-protocol/codex', icon: <IconTerminal /> },
    { label: 'VS Code', url: '/docs/model-context-protocol/vscode', icon: <IconCode /> },
    { label: 'Windsurf', url: '/docs/model-context-protocol/windsurf', icon: <IconCode /> },
    { label: 'Zed', url: '/docs/model-context-protocol/zed', icon: <IconCode /> },
]

const platforms = [
    { label: 'Lovable', url: '/docs/integrations/lovable', icon: <IconStack /> },
    { label: 'Replit', url: '/docs/integrations/replit', icon: <IconStack /> },
    { label: 'v0', url: '/docs/integrations/v0', icon: <IconStack /> },
]

function PostHogCodeBoxout(): JSX.Element {
    return (
        <Link
            to="/code"
            className="group block bg-accent dark:bg-accent-dark border border-primary rounded-lg p-4 @sm:p-5 hover:border-red dark:hover:border-yellow transition-colors !text-inherit !no-underline not-prose"
        >
            <div className="flex flex-col @sm:flex-row @sm:items-center gap-4">
                <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded bg-brown/10 text-brown">
                    <span className="w-5 h-5">
                        <IconCursor />
                    </span>
                </span>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-bold text-base m-0">PostHog Code</p>
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 bg-yellow px-1.5 py-0.5 rounded-sm text-primary">
                            Beta
                        </span>
                    </div>
                    <p className="text-[13px] opacity-75 m-0 leading-snug">
                        Self-driving development is here. PostHog Code is the only AI devtool that understands your
                        product, not just your codebase. Currently in private beta.
                    </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider shrink-0 group-hover:underline">
                    Learn more
                    <IconArrowUpRight className="size-3.5" />
                </span>
            </div>
        </Link>
    )
}

function SupportedClients(): JSX.Element {
    const renderItem = (client: SupportedClient) => (
        <li key={client.label}>
            <Link
                to={client.url}
                className="group flex items-center gap-2 bg-white dark:bg-black border border-border dark:border-border-dark rounded p-2.5 hover:border-red dark:hover:border-yellow transition-colors !text-inherit !no-underline"
            >
                <span className="size-4 text-primary opacity-75 group-hover:opacity-100">{client.icon}</span>
                <span className="font-semibold text-[13px]">{client.label}</span>
                {client.comingSoon ? (
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-wider opacity-90 bg-yellow px-1.5 py-0.5 rounded-sm text-primary">
                        Beta
                    </span>
                ) : (
                    <IconArrowUpRight className="size-3 opacity-0 group-hover:opacity-60 ml-auto" />
                )}
            </Link>
        </li>
    )
    return (
        <div className="not-prose my-6">
            <p className="uppercase text-[10px] font-bold tracking-wider text-secondary mb-2 mt-0">Code editors</p>
            <ul className="list-none p-0 m-0 grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-2 mb-4">
                {codeEditors.map(renderItem)}
            </ul>
            <p className="uppercase text-[10px] font-bold tracking-wider text-secondary mb-2">Platforms</p>
            <ul className="list-none p-0 m-0 grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-2 mb-4">
                {platforms.map(renderItem)}
            </ul>
            <PostHogCodeBoxout />
        </div>
    )
}

function MCPCTA(): JSX.Element {
    return (
        <div className="not-prose my-6">
            <div className="grid grid-cols-1 @sm:grid-cols-[auto,1fr] gap-5 @sm:gap-6 items-center bg-accent dark:bg-accent-dark border border-primary rounded-lg p-5">
                <div className="relative flex justify-center shrink-0">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/mcp_hog_05867b6214.png"
                        alt="PostHog hedgehog"
                        className="w-32 @sm:w-40"
                    />
                    <div className="absolute -top-3 -right-3 @sm:-top-4 @sm:-right-4">
                        <div className="relative">
                            <Bang className="w-[90px] @sm:w-[110px] animate-grow" />
                            <p className="px-2 text-center m-0 absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-black uppercase !leading-none font-bold text-[10px] @sm:text-xs rotate-6">
                                <span className="text-[8px]">Now with</span>
                                100% less
                                <br />
                                UI
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="bg-green inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm mb-2">
                        <span className="w-3 h-3">
                            <IconBolt className="fill-white" />
                        </span>
                        <span className="uppercase font-bold text-[10px] text-white tracking-wider">One command</span>
                    </span>
                    <p className="text-xl @sm:text-2xl font-bold m-0 mb-1">Install the MCP</p>
                    <p className="opacity-65 m-0 mb-4 text-[13px]">
                        Works in Cursor, Claude Code, Codex, VS Code, Zed, and Windsurf.
                    </p>
                    <div className="mb-4">
                        <WizardCommand command="mcp add" slim />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
                        <Link
                            to="/docs/model-context-protocol"
                            className="font-semibold underline hover:opacity-75 !text-inherit"
                        >
                            Read the docs
                        </Link>
                        <Link
                            to="https://github.com/PostHog/posthog/tree/master/services/mcp"
                            external
                            className="inline-flex items-center gap-1 opacity-75 hover:opacity-100 !text-inherit !no-underline"
                        >
                            <IconGithub className="size-3.5" />
                            View on GitHub
                        </Link>
                        <Link
                            to="/blog/machine-copy-paste-mcp-intro"
                            className="opacity-75 hover:opacity-100 !text-inherit"
                        >
                            Why we built it →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Hr(): JSX.Element {
    return <hr className="my-8 border-t border-border dark:border-border-dark" />
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
        name: 'Q',
        kind: 'flow',
        props: [{ name: 'text', type: 'string' }],
        Editor: ({ text }: { text?: string }) => <Q text={text} />,
    },
    {
        name: 'AskClaude',
        kind: 'text',
        props: [
            { name: 'question', type: 'string' },
            { name: 'label', type: 'string' },
        ],
        Editor: ({ question, label }: { question?: string; label?: string }) => (
            <AskClaude question={question || ''} label={label} />
        ),
    },
    { name: 'MCPHeader', kind: 'flow', props: [], Editor: () => <MCPHeader /> },
    { name: 'ExplainerVideo', kind: 'flow', props: [], Editor: () => <ExplainerVideo /> },
    { name: 'DemoVideo', kind: 'flow', props: [], Editor: () => <DemoVideo /> },
    { name: 'Subfeatures', kind: 'flow', props: [], Editor: () => <Subfeatures /> },
    { name: 'MCPFaqGrid', kind: 'flow', props: [], Editor: () => <MCPFaqGrid /> },
    {
        name: 'MCPCapabilitiesLayout',
        kind: 'flow',
        props: [],
        Editor: () => <MCPCapabilitiesLayout />,
    },
    { name: 'Capabilities', kind: 'flow', props: [], Editor: () => <Capabilities /> },
    { name: 'Complaints', kind: 'flow', props: [], Editor: () => <Complaints /> },
    { name: 'FutureNoUI', kind: 'flow', props: [], Editor: () => <FutureNoUI /> },
    { name: 'SupportedClients', kind: 'flow', props: [], Editor: () => <SupportedClients /> },
    { name: 'MCPCTA', kind: 'flow', props: [], Editor: () => <MCPCTA /> },
    { name: 'Hr', kind: 'flow', props: [], Editor: () => <Hr /> },
    {
        name: 'TeamMember',
        kind: 'text',
        props: [
            { name: 'name', type: 'string' },
            { name: 'photo', type: 'string' },
        ],
        Editor: ({ name, photo }: { name?: string; photo?: any }) => (
            <TeamMember name={name || ''} photo={photo !== undefined && photo !== 'false'} />
        ),
    },
]

export default function MCPPage(): JSX.Element {
    const {
        mdx: { rawBody, mdxBody },
    } = useStaticQuery(graphql`
        query {
            mdx(slug: { eq: "mcp" }) {
                rawBody
                mdxBody: body
            }
        }
    `)
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'mcp.mdx')
        }
    }, [])

    return (
        <>
            <SEO
                title="PostHog MCP – Ask questions. Get answers."
                description="The PostHog Model Context Protocol lets your coding agent query your real product data in plain English. No SQL, no dashboards, no tabs. Free forever."
                image="/images/og/default.png"
            />
            <MDXEditor
                jsxComponentDescriptors={jsxComponentDescriptors}
                body={rawBody}
                mdxBody={mdxBody}
                maxWidth={900}
                hasPadding={false}
            />
        </>
    )
}
