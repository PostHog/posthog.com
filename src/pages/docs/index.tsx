import React from 'react'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import * as Icons from '@posthog/icons'
import ReaderView from 'components/ReaderView'
import { SearchUI } from 'components/SearchUI'
import { AppsList } from 'components/Docs/AppsList'
import Book, { BookShelf } from 'components/PocketGuides/Book'
import usePocketGuideCounts from '../../hooks/usePocketGuideCounts'
import { POCKET_GUIDE_VOLUMES } from '../../constants/pocketGuides'

/** A surface on the page ground, after `FeaturePanel` on `/desktop`. Colour lives in the icons only. */
const Panel = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }): JSX.Element => (
    <section className="@container flex h-full flex-col rounded border border-primary bg-primary p-4 @xl:p-5">
        <h2 className="m-0 mb-3 text-sm font-bold uppercase tracking-wide text-primary">{eyebrow}</h2>
        {children}
    </section>
)

/** An icon link, the size and weight the product pages use for their icon rows. */
const IconLink = ({
    to,
    color,
    icon,
    children,
}: {
    to: string
    color: string
    icon: string
    children: React.ReactNode
}) => {
    const Icon = (Icons[icon as keyof typeof Icons] as any) || Icons.IconBook
    return (
        <Link to={to} className="flex items-start gap-2 text-sm font-medium text-primary hover:underline">
            <Icon className={`mt-0.5 size-4 shrink-0 text-${color}`} />
            <span className="leading-snug">{children}</span>
        </Link>
    )
}

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
    {
        name: 'Desktop',
        url: '/docs/posthog-desktop',
        icon: 'IconCoffee',
        color: 'brown',
        description: 'Run tasks, review code, and use any model from your desktop.',
    },
]

export const DocsIndex = () => {
    const guideCounts = usePocketGuideCounts()
    // Reading order: Vol. 1 at the top of the shelf, the way a series is shelved.
    const volumes = [...POCKET_GUIDE_VOLUMES].sort((a, b) => a.volume - b.volume)

    // ReaderView is the shell every other docs page uses – see `src/templates/Handbook.tsx`.
    return (
        <ReaderView
            title="PostHog Docs"
            hideTitle
            hideLeftSidebar
            hideRightSidebar
            hideMarkdownActions
            showQuestions={false}
        >
            <SEO title="PostHog Docs" />
            {/* not-prose: ReaderView wraps children in prose, which would restyle every link here. */}
            <div className="@container/docs not-prose pb-12">
                {/* No divider: the panels below already read as a separate band. */}
                <header>
                    <div className="pb-6">
                        <h1 className="m-0 text-3xl font-bold !leading-tight @xl/docs:text-4xl">PostHog Docs</h1>
                        <p className="mt-3 mb-6 max-w-2xl text-[15px] leading-relaxed text-secondary @xl/docs:text-base">
                            References for every product and tool, and use case guides to help you succeed.
                        </p>
                        <SearchUI
                            initialFilter="docs"
                            hideFilters
                            isRefinedClassName="bg-accent"
                            className="rounded border border-primary bg-primary shadow-sm overflow-hidden [&_input]:bg-primary [&_input]:py-3 [&_input]:text-base"
                            autoFocus={false}
                        />
                    </div>
                </header>

                <div className="flex flex-col gap-4 @3xl/docs:flex-row @3xl/docs:gap-6">
                    <div className="flex flex-1 flex-col gap-4 @3xl/docs:w-2/3">
                        {/* The tab pattern flattened: grouping stays, nothing hides behind a click. */}
                        <div className="grid grid-cols-1 gap-4 @lg/docs:grid-cols-2">
                            <Panel eyebrow="Get started">
                                <div className="flex flex-col gap-2.5">
                                    {pathCards.map((card) => (
                                        <IconLink key={card.name} to={card.url} color={card.color} icon={card.icon}>
                                            {card.name}
                                            <span className="block text-sm font-normal text-secondary">
                                                {card.description}
                                            </span>
                                        </IconLink>
                                    ))}
                                </div>
                            </Panel>

                            {/* Not products, so `AppsList` misses them – this is their only entry point. */}
                            <Panel eyebrow="Products">
                                <div className="grid grid-cols-1 gap-2.5 @xs:grid-cols-2 @lg/docs:grid-cols-1">
                                    {surfaces.map((surface) => (
                                        <IconLink
                                            key={surface.name}
                                            to={surface.url}
                                            color={surface.color}
                                            icon={surface.icon}
                                        >
                                            {surface.name}
                                        </IconLink>
                                    ))}
                                </div>
                            </Panel>
                        </div>

                        <Panel eyebrow="Tools">
                            <AppsList />
                        </Panel>
                    </div>

                    {/* The library: the same volumes as /pocket-guides, as spines. */}
                    <aside className="@3xl/docs:w-1/3 shrink-0">
                        <Panel eyebrow="Guides">
                            <p className="m-0 mb-4 text-[15px] text-secondary">
                                Guides for the human reader on the go.
                            </p>
                            <BookShelf>
                                {volumes.map((volume) => (
                                    <Book key={volume.id} volume={volume} count={guideCounts[volume.id] ?? 0} />
                                ))}
                            </BookShelf>
                            <Link
                                to="/pocket-guides"
                                state={{ newWindow: true }}
                                className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                            >
                                All guides &rarr;
                            </Link>
                        </Panel>
                    </aside>
                </div>
            </div>
        </ReaderView>
    )
}

export default DocsIndex
