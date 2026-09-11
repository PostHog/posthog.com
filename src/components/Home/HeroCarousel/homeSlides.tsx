import React from 'react'
import { IconArrowUpRight, IconLaptop, IconPlug, IconRewindPlay, IconSupport, IconWarning } from '@posthog/icons'
import { IconOpenAI } from 'components/OSIcons'
import Link from 'components/Link'
import { SignupCTA } from 'components/SignupCTA'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import AskAnythingDemo from './AskAnythingDemo'
import { useToolsProducts } from 'components/Home/ToolsTicker'
import ToolsTickerStrip from 'components/Home/ToolsTicker/ToolsTickerStrip'
import PlatformInstall, { mcpInstallSchema, type InstallSchema } from 'components/PlatformInstall'
import ProductContextDemo from './ProductContextDemo'
import InboxDemo from './InboxDemo'

const signalSources = [
    {
        Icon: IconWarning,
        color: 'text-yellow',
        name: 'Error tracking',
        description: 'Exceptions and stack traces grouped into issues',
        href: '/error-tracking',
    },
    {
        Icon: IconRewindPlay,
        color: 'text-orange',
        name: 'Session replay',
        description: 'Dead clicks, quick backs, long stalls',
        href: '/session-replay',
    },
    {
        Icon: IconSupport,
        color: 'text-blue',
        name: 'Support',
        description: 'Tickets and conversations from your users',
        href: '/support',
    },
    {
        Icon: IconPlug,
        color: 'text-purple',
        name: 'External tools',
        description: 'Zendesk, Linear, GitHub issues',
        href: '/docs/self-driving/signals',
    },
]

const compactMcpSchema: InstallSchema = {
    ...mcpInstallSchema,
    supports: undefined,
    secondaryAction: { label: 'Docs', to: '/docs/model-context-protocol', state: { newWindow: true } },
    platforms: [
        ...mcpInstallSchema.platforms.filter(({ id }) => id === 'claude'),
        {
            id: 'chatgpt',
            label: 'ChatGPT',
            group: 'platforms',
            icon: <IconOpenAI className="size-4" />,
            href: 'https://chatgpt.com/plugins/plugin_asdk_app_699caef2d680819188727b0ddbb349dd',
        },
        ...mcpInstallSchema.platforms.filter(({ id }) => ['codex', 'cursor', 'vscode'].includes(id)),
    ],
}

export const GiveAgentsContext = () => {
    return (
        <div className="@container rounded p-4 @md:p-6 h-full bg-accent/20">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-start">
                <ProductContextDemo />
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold m-0">Give agents product context</h2>
                    <p className="text-secondary m-0">
                        Query product data from your editor instead of context-switching to a browser. Do everything
                        from one-off analytics to launching new features - no new UI needed.
                    </p>
                    <PlatformInstall
                        schema={compactMcpSchema}
                        linkOnly
                        hideSecondaryAction
                        className="!shadow-none !mb-0"
                    />
                    <p className="text-sm text-secondary m-0 inline-flex gap-1">
                        Or use{' '}
                        <Link
                            to="/desktop"
                            state={{ newWindow: true }}
                            className="inline-flex items-center gap-1 underline underline-offset-2"
                        >
                            <IconLaptop className="size-4" /> PostHog Desktop <IconArrowUpRight className="size-3" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export const ShipWithPostHogSlide = () => {
    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-start">
                <InboxDemo />
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold m-0">Ship with PostHog</h2>
                    <p className="text-secondary m-0">
                        Your Inbox clusters related findings into researched reports, ranked by priority. Review
                        proposed improvements and pull requests, then decide what ships.
                    </p>
                    <SignupCTA size="md" state={{ initialTab: 'signup' }} />
                    <p className="text-sm text-secondary mb-0 mt-2">Self-driving pulls signals from:</p>
                    <ul className="not-prose grid grid-cols-2 gap-x-4 gap-y-3 list-none p-0 m-0">
                        {signalSources.map(({ Icon, color, name, description, href }) => (
                            <li key={name}>
                                <Link
                                    to={href}
                                    state={{ newWindow: true }}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2"
                                >
                                    <Icon aria-hidden="true" className={`size-5 shrink-0 ${color}`} />
                                    {name}
                                </Link>
                                <p className="text-xs leading-snug text-secondary m-0 mt-1">{description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export const AskAnythingSlide = () => {
    const sourcePlatforms: { label: string; url: string; image: string }[] = useSourcePlatforms()
    const products = useToolsProducts()

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-start">
                <AskAnythingDemo />

                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold m-0">Ask PostHog anything</h2>
                    </div>
                    <p className="text-secondary m-0">
                        PostHog is the single place to ingest, store, and query your product and company data.
                        Analytics, replays, errors, and logs, stitched together on-the-fly to answer any question you
                        have.
                    </p>
                    <p className="text-secondary m-0">
                        Pipe in third party data from{' '}
                        <Link
                            to="/docs/cdp/sources"
                            state={{ newWindow: true }}
                            className="underline underline-offset-2"
                        >
                            {Math.round(sourcePlatforms.length / 100) * 100}+ sources
                        </Link>{' '}
                        for a more complete picture.
                    </p>
                    <SignupCTA size="md" state={{ initialTab: 'signup' }} />
                    <div className="@container/tools mt-2 min-w-0">
                        <ToolsTickerStrip products={products} compact />
                    </div>
                </div>
            </div>
        </div>
    )
}
