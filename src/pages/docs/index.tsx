import React from 'react'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import * as Icons from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { SearchUI } from 'components/SearchUI'
import OSButton from 'components/OSButton'
import { AppsList } from 'components/Docs/AppsList'
import PocketGuidesList from 'components/Docs/PocketGuidesList'

// Labels only – "Web" and "Slack" explain themselves, and a sentence each is just words to scan past.
const surfaces = [
    { name: 'Web', url: '/docs/self-driving/web', icon: 'IconLaptop', color: 'blue' },
    { name: 'Slack', url: '/docs/slack', icon: 'IconMessage', color: 'salmon' },
    { name: 'MCP', url: '/docs/model-context-protocol', icon: 'IconMagic', color: 'purple' },
    { name: 'CLI', url: '/docs/cli', icon: 'IconTerminal', color: 'green' },
    // Opens in its own window, the way every other /desktop link on the site does.
    { name: 'Desktop', url: '/desktop', icon: 'IconScreen', color: 'red', newWindow: true },
]

// OSButton `lg` metrics, a rung above the Tools chips. bg-primary would read as a white block here – the page is transparent.
const SURFACE_CHIP =
    'flex items-center gap-1 rounded-[6px] border border-primary bg-accent px-2 py-1.5 text-[15px] transition-colors hover:bg-primary'

export const DocsIndex = (): JSX.Element => {
    // No bg on the root: AppWindow already paints the frosted WINDOW_BG and an opaque one covers it.
    return (
        <div data-scheme="secondary" className="h-full text-primary border-t border-primary">
            <SEO title="Documentation - PostHog" />
            <ScrollArea>
                <div className="h-full py-2 @xl:py-4 px-2 @xl:px-4">
                    <section className="min-w-0">
                        <h1 className="sr-only">PostHog documentation</h1>
                        <SearchUI
                            initialFilter="docs"
                            hideFilters
                            isRefinedClassName="bg-accent"
                            className="mb-5 rounded border border-primary bg-primary shadow-sm overflow-hidden [&_input]:bg-primary [&_input]:py-3 [&_input]:text-base"
                            autoFocus={false}
                        />

                        {/* No Ask PostHog AI button – the search bar above has its own. */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <OSButton asLink to="/docs/getting-started/install" variant="primary" size="lg">
                                Install PostHog
                            </OSButton>
                            <OSButton asLink to="/docs/self-driving" variant="secondary" size="lg">
                                Understand self-driving
                            </OSButton>
                        </div>

                        {/* Orient first, then go deep: pocket guides answer "what should I build," which only lands once you know the surfaces and tools. */}
                        <h2 className="text-lg mb-1">Surfaces</h2>
                        <p className="mb-3 text-sm text-secondary">Where you use PostHog.</p>
                        <div data-scheme="primary" className="flex flex-wrap gap-3 mb-6">
                            {surfaces.map((surface) => {
                                const Icon = (Icons[surface.icon as keyof typeof Icons] as any) || Icons.IconBook
                                return (
                                    <Link
                                        key={surface.name}
                                        to={surface.url}
                                        state={surface.newWindow ? { newWindow: true } : undefined}
                                        className={SURFACE_CHIP}
                                    >
                                        <Icon className={`size-5 shrink-0 text-${surface.color}`} />
                                        <span className="font-medium text-primary leading-tight">{surface.name}</span>
                                    </Link>
                                )
                            })}
                        </div>

                        <h2 className="text-lg mb-1">Tools</h2>
                        <p className="mb-3 text-sm text-secondary">The PostHog tools you use, on any surface.</p>
                        <AppsList variant="chips" className="mb-6" />

                        <div className="flex items-baseline justify-between gap-4 mb-1">
                            <h2 className="text-lg m-0">Pocket guides</h2>
                            <Link
                                to="/pocket-guides"
                                state={{ newWindow: true }}
                                className="shrink-0 text-sm text-secondary hover:underline"
                            >
                                All guides &rarr;
                            </Link>
                        </div>
                        {/* Volume-neutral on purpose: a line about scouts would be wrong for the data warehouse volume. */}
                        <p className="mb-3 max-w-xl text-sm text-secondary">
                            PostHog use case guides. Pick one and learn how we solve it for you.
                        </p>
                        <PocketGuidesList />
                    </section>
                </div>
            </ScrollArea>
        </div>
    )
}

export default DocsIndex
