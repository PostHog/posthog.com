import React from 'react'
import { IconBook, IconCode, IconPlay, IconRocket, IconVideoCamera } from '@posthog/icons'
import { Bang } from 'components/Icons/Icons'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import ShelfCover from 'components/Learn/PocketGuides/ShelfCover'
import usePocketGuideCounts from '../../../hooks/usePocketGuideCounts'
import { POCKET_GUIDE_VOLUMES } from '../../../constants/pocketGuides'
import PlaygroundPreview from './PlaygroundPreview'
import PromptLibrary from './PromptLibrary'

export type LearnHomeSection = 'pocket-guides' | 'prompts' | 'playground'

const SECTIONS: Record<LearnHomeSection, { name: string; title: string; description: string }> = {
    'pocket-guides': {
        name: 'Pocket guides',
        title: 'Learn – PostHog',
        description:
            'Guides, agent prompts, and a real product to tinker with. Learn PostHog however works best for you.',
    },
    prompts: {
        name: 'Prompts',
        title: 'Prompts for your agent – Learn – PostHog',
        description: 'Prompts that teach you PostHog using your own code and data. Copy one into your coding agent.',
    },
    playground: {
        name: 'Playground',
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

/** Decorative TV in the hero. It opens the changelog, which is where "what's new" lives today. */
function LearnTv(): JSX.Element {
    return (
        <Link
            to="/changelog"
            state={{ newWindow: true }}
            aria-label="What's new at PostHog"
            className="relative hidden w-[260px] shrink-0 self-center !no-underline @2xl:block"
        >
            <div aria-hidden="true" className="rounded-lg bg-black p-3 pb-2 shadow-xl">
                <div className="flex aspect-[4/3] flex-col justify-between rounded bg-brand-blue p-3 text-white">
                    <span className="text-xs font-bold">PLAY ▶</span>
                    <span className="text-center">
                        <span className="block text-[10px] font-bold uppercase tracking-widest">Learn TV presents</span>
                        <span className="block text-lg font-bold leading-tight">What's new this week</span>
                    </span>
                    <span className="text-xs font-bold">CH03</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/70">
                    <span>Learn TV</span>
                    <span className="size-2 rounded-full bg-brand-coral" />
                </div>
            </div>
            <span aria-hidden="true" className="absolute -right-6 -top-8 w-24 rotate-6">
                <Bang color="#FFA81C" className="w-full" />
                <span className="absolute inset-0 flex items-center justify-center text-center text-xs font-bold uppercase leading-tight text-black">
                    What's
                    <br />
                    new
                </span>
            </span>
        </Link>
    )
}

function Hero(): JSX.Element {
    return (
        <section className="@container mb-8 flex gap-8 rounded-md border border-primary bg-white p-6 dark:bg-dark @xl:p-8">
            <div className="min-w-0 max-w-xl flex-1">
                <h1 className="m-0 text-3xl font-bold leading-tight @xl:text-4xl">
                    Everything we know about{' '}
                    <span className="rounded-sm bg-brand-blue-lighter px-1 text-brand-blue-darker">
                        building products
                    </span>
                </h1>
                <p className="mb-0 mt-4 text-lg leading-relaxed text-secondary">
                    Guides, agent prompts, and a real product to tinker with. Learn however works best for you.
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
            <LearnTv />
        </section>
    )
}

function PocketGuideCollection(): JSX.Element {
    const counts = usePocketGuideCounts()
    return (
        <section>
            <h2 className="m-0 text-xl font-bold">Pocket guides</h2>
            <p className="mb-0 mt-1 text-secondary">
                PostHog use case guides, in your pocket. Spot what's happening in your product, then fix it in a click.
            </p>
            {/* One collection for now. Group the guides into shelves when there are more of them. */}
            <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-6 p-0 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5">
                {POCKET_GUIDE_VOLUMES.map((volume) => (
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
    const { name, title, description } = SECTIONS[section]
    return (
        <>
            <SEO title={title} description={description} image="/images/og/default.png" />
            <ReaderView
                title="Learn"
                hideTitle
                hideRightSidebar
                hideMarkdownActions
                showQuestions={false}
                proseSize="base"
                leftSidebar={<TreeMenu items={NAV_ITEMS} appearance="sidebar" />}
            >
                <div className="@container not-prose">
                    <p className="mb-4 mt-0 text-sm font-semibold text-secondary">Learn / {name}</p>
                    <Hero />
                    {section === 'pocket-guides' && <PocketGuideCollection />}
                    {section === 'prompts' && <PromptLibrary />}
                    {section === 'playground' && <PlaygroundPreview />}
                </div>
            </ReaderView>
        </>
    )
}
