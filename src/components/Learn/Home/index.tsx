import React, { useState } from 'react'
import { IconBook, IconCode, IconPlay, IconRocket, IconVideoCamera } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import { SearchInput } from 'components/UI/SearchInput'
import ShelfCover from 'components/Learn/PocketGuides/ShelfCover'
import usePocketGuideCounts from '../../../hooks/usePocketGuideCounts'
import { POCKET_GUIDE_VOLUMES } from '../../../constants/pocketGuides'
import PlaygroundPreview from './PlaygroundPreview'
import PromptLibrary from './PromptLibrary'

export type LearnHomeSection = 'pocket-guides' | 'prompts' | 'playground'

const SECTIONS: Record<LearnHomeSection, { title: string; description: string }> = {
    'pocket-guides': {
        title: 'Learn – PostHog',
        description:
            'Guides, videos, agent prompts, and real apps to tinker with. Learn PostHog however works best for you.',
    },
    prompts: {
        title: 'Prompts for your agent – Learn – PostHog',
        description: 'Prompts that teach you PostHog using your own code and data. Copy one into your coding agent.',
    },
    playground: {
        title: 'Tinker with Twig – Learn – PostHog',
        description:
            'Twig is a demo vacation rental site with PostHog built in. Click around, then see the events behind it.',
    },
}

// Videos has no page yet, so it shows grayed out with a badge. Founders hub is the existing /founders page.
const NAV_ITEMS = [
    { name: 'Learn' },
    { name: 'Pocket guides', url: '/learn', icon: <IconBook className="text-brand-purple" /> },
    {
        name: 'Videos',
        disabled: true,
        badge: { title: 'Coming soon' },
        icon: <IconVideoCamera className="text-brand-tangerine" />,
    },
    { name: 'Prompts', url: '/learn/prompts', icon: <IconCode className="text-brand-blue" /> },
    { name: 'Playground', url: '/learn/playground', icon: <IconPlay className="text-brand-teal" /> },
    { name: 'Building a company?' },
    { name: 'Founders hub', url: '/founders', external: true, icon: <IconRocket className="text-primary" /> },
]

const START_LINKS = [
    {
        label: 'Read: Product Analytics',
        to: '/learn/product-analytics/pocket-guide',
        icon: <IconBook className="size-4 shrink-0 text-brand-purple" />,
    },
    {
        label: 'Prompt: Start with your product',
        to: '/learn/product-analytics/agent-prompts-and-mcp',
        icon: <IconCode className="size-4 shrink-0 text-brand-blue" />,
    },
]

/**
 * The "PostHog Learn" lockup: the hedgehog logomark from `@posthog/brand`, then "PostHog Learn" in RoundHog.
 * The sizes follow the brand's landscape lockup: the mark is 1.48x the cap height, the gap is 0.64x, and the mark's
 * bottom sits 0.27x below the baseline. At 22px RoundHog (16px caps) that is a 44px mark and a 10px gap.
 * Dark mode uses the mono white mark, the same as the homepage, because the hedgehog's head is black.
 */
function LearnLogo(): JSX.Element {
    return (
        <p className="m-0 mb-6 flex items-end gap-2.5 text-primary">
            <Logo.Logomark size={44} aria-hidden="true" className="dark:hidden" />
            <Logo.Logomark variant="mono" color="white" size={44} aria-hidden="true" className="hidden dark:block" />
            <span className="mb-[1.5px] font-rounded text-[22px] font-bold leading-none">PostHog Learn</span>
        </p>
    )
}

function Hero(): JSX.Element {
    return (
        <section className="@container mb-8 flex gap-8 rounded-md border border-primary bg-white p-6 dark:bg-dark @xl:p-8">
            <div className="min-w-0 max-w-xl flex-1">
                <LearnLogo />
                <h1 className="m-0 text-3xl font-bold leading-tight @xl:text-4xl">
                    Build better products with {/* The same highlight as the homepage headline (`Home/HeroCopy`). */}
                    <span className="rounded-md bg-blue/10 px-1 text-blue dark:bg-blue/20">data and agents</span>
                </h1>
                <p className="mb-0 mt-4 text-lg leading-relaxed text-secondary">
                    Guides, videos, agent prompts, and real apps to tinker with. Learn PostHog however works best for
                    you.
                </p>
                <div className="mt-6 border-t border-primary pt-5">
                    <p className="m-0 text-sm font-bold text-secondary">New here? Start with one of these.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {START_LINKS.map(({ label, to, icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-3 py-1.5 text-sm font-bold !text-primary !no-underline hover:bg-accent"
                            >
                                {icon}
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function PocketGuideCollection(): JSX.Element {
    const counts = usePocketGuideCounts()
    const [query, setQuery] = useState('')
    const q = query.trim().toLowerCase()
    const volumes = POCKET_GUIDE_VOLUMES.filter(
        (volume) => !q || `${volume.title} ${volume.description}`.toLowerCase().includes(q)
    )
    return (
        <section>
            <h2 className="m-0 text-xl font-bold">Pocket guides</h2>
            <p className="mb-0 mt-1 text-secondary">
                PostHog use case guides, in your pocket. Spot what's happening in your product, then fix it in a click.
            </p>
            <SearchInput
                value={query}
                onValueChange={setQuery}
                appearance="pill"
                placeholder="Search pocket guides"
                aria-label="Search pocket guides"
                className="mt-5 w-full @md:w-80"
            />
            {volumes.length === 0 && (
                <p className="mb-0 mt-6 rounded-md border border-dashed border-primary p-6 text-center text-secondary">
                    No pocket guides match. Try another word, like "replay" or "flags".
                </p>
            )}
            {/* One collection for now. Group the guides into shelves when there are more of them. */}
            <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-6 p-0 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5">
                {volumes.map((volume) => (
                    <li key={volume.id}>
                        <ShelfCover volume={volume} count={counts[volume.id] ?? 0} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

/** The Learn home at `/learn`, `/learn/prompts`, and `/learn/playground`: a sidebar, the hero, then one section. */
export default function LearnHome({ section }: { section: LearnHomeSection }): JSX.Element {
    const { title, description } = SECTIONS[section]
    return (
        <>
            <SEO title={title} description={description} image="/images/og/default.png" />
            <ReaderView
                title="Learn"
                hideTitle
                hideRightSidebar
                hideSidebarSearch
                hideMarkdownActions
                showQuestions={false}
                proseSize="base"
                leftSidebar={<TreeMenu items={NAV_ITEMS} appearance="sidebar" />}
            >
                <div className="@container not-prose">
                    <Hero />
                    {section === 'pocket-guides' && <PocketGuideCollection />}
                    {section === 'prompts' && <PromptLibrary />}
                    {section === 'playground' && <PlaygroundPreview />}
                </div>
            </ReaderView>
        </>
    )
}
