import React, { useEffect } from 'react'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import * as Icons from '@posthog/icons'
import AskMax from 'components/AskMax'
import ZoomHover from 'components/ZoomHover'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { SearchUI } from 'components/SearchUI'
import { useApp } from '../../context/App'
import { AppsList } from 'components/Docs/AppsList'

// Quick-start entry cards for the docs hub
const pathCards = [
    {
        name: 'Install PostHog',
        description: 'Send your first event in minutes.',
        url: '/docs/getting-started/install',
        icon: 'IconRocket',
        color: 'salmon',
    },
    {
        name: 'Understand self-driving',
        description: 'How your product learns to drive itself.',
        url: '/docs/self-driving',
        icon: 'IconStack',
        color: 'red',
    },
]

// The surfaces you can use PostHog from
const surfaces = [
    {
        name: 'Web',
        url: '/docs/self-driving/web',
        icon: 'IconLaptop',
        color: 'blue',
        description: 'The PostHog you know and love, in your browser.',
    },
    {
        name: 'Slack',
        url: '/docs/slack',
        icon: 'IconMessage',
        color: 'salmon',
        description: 'Ask questions and ship work from a shared channel.',
    },
    {
        name: 'MCP',
        url: '/docs/model-context-protocol',
        icon: 'IconMagic',
        color: 'purple',
        description: 'Bring PostHog into Claude Code, Cursor, and more.',
    },
    {
        name: 'CLI',
        url: '/docs/cli',
        icon: 'IconTerminal',
        color: 'green',
        description: 'Query your data and ship work from your terminal.',
    },
    // TODO: Desktop (PostHog Code) slots in here once GA
]

export const DocsIndex = () => {
    const [isMac, setIsMac] = React.useState<boolean | undefined>(undefined)
    useEffect(() => {
        setIsMac(typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('macintosh'))
    }, [])

    const { websiteMode } = useApp()

    return (
        <div data-scheme="secondary" className="bg-primary h-full text-primary border-t border-primary">
            <SEO title="Documentation - PostHog" />
            <ScrollArea className={`${websiteMode ? '@container' : ''}`}>
                <div className={`flex @4xl:flex-row flex-col gap-4 @4xl:gap-8 h-full py-2 @xl:py-4 px-2 @xl:px-4`}>
                    <section className="flex-1">
                        <h1 className="sr-only">PostHog documentation</h1>
                        <SearchUI
                            initialFilter="docs"
                            hideFilters
                            isRefinedClassName="bg-accent"
                            className="mb-6 rounded border border-primary bg-primary shadow-sm overflow-hidden [&_input]:bg-primary [&_input]:py-3 [&_input]:text-base"
                            autoFocus={false}
                        />
                        <h2 className="text-lg mb-1">Get started</h2>
                        <p className="text-sm opacity-70 mb-3">New to PostHog? Pick a starting point.</p>
                        {/* Curated entry paths */}
                        <div data-scheme="primary" className="grid grid-cols-1 @md:grid-cols-3 gap-3 mb-6">
                            {pathCards.map((card) => {
                                const Icon = (Icons[card.icon as keyof typeof Icons] as any) || Icons.IconBook
                                return (
                                    <ZoomHover key={card.name} className="[&>span]:w-full">
                                        <Link
                                            to={card.url}
                                            className="bg-accent border border-transparent hover:border-primary px-4 py-4 rounded flex items-start gap-3 h-full w-full"
                                        >
                                            <Icon className={`size-6 shrink-0 text-${card.color}`} />
                                            <div>
                                                <div className="font-semibold leading-tight">{card.name}</div>
                                                <div className="text-sm opacity-70 leading-tight mt-0.5">
                                                    {card.description}
                                                </div>
                                            </div>
                                        </Link>
                                    </ZoomHover>
                                )
                            })}
                            {/* Ask PostHog AI opens the in-docs chat */}
                            <ZoomHover className="[&>span]:w-full">
                                <AskMax
                                    linkOnly
                                    className="bg-accent border border-transparent hover:border-primary px-4 py-4 rounded flex items-start gap-3 h-full w-full text-left"
                                >
                                    <Icons.IconSparkles className="size-6 shrink-0 text-purple" />
                                    <div>
                                        <div className="font-semibold leading-tight">Ask PostHog AI</div>
                                        <div className="text-sm opacity-70 leading-tight mt-0.5">
                                            Get answers without reading the docs.
                                        </div>
                                    </div>
                                </AskMax>
                            </ZoomHover>
                        </div>

                        {/* Use PostHog from anywhere: the surfaces */}
                        <h2 className="text-lg mb-1">Use PostHog from anywhere</h2>
                        <p className="text-sm opacity-70 mb-3">Pick the surface that fits how you work.</p>
                        <div data-scheme="primary" className="grid grid-cols-1 @md:grid-cols-3 gap-3 mb-6">
                            {surfaces.map((surface) => {
                                const Icon = (Icons[surface.icon as keyof typeof Icons] as any) || Icons.IconBook
                                return (
                                    <ZoomHover key={surface.name} className="[&>span]:w-full">
                                        <Link
                                            to={surface.url}
                                            className="bg-accent border border-transparent hover:border-primary px-4 py-4 rounded flex flex-col h-full w-full gap-1.5"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Icon className={`size-5 shrink-0 text-${surface.color}`} />
                                                <span className="font-semibold leading-tight">{surface.name}</span>
                                            </div>
                                            <p className="text-sm opacity-70 leading-tight m-0">
                                                {surface.description}
                                            </p>
                                        </Link>
                                    </ZoomHover>
                                )
                            })}
                        </div>

                        {/* Tools: the PostHog tools you use from any surface */}
                        <h2 className="text-lg mb-1">Tools</h2>
                        <p className="text-sm opacity-70 mb-3">Use every PostHog tool from any surface.</p>
                        <AppsList />
                    </section>
                </div>
            </ScrollArea>
        </div>
    )
}

export default DocsIndex
