import React from 'react'
import {
    HedgehogChartHog,
    HedgehogDirector,
    HedgehogPartyHog,
    HedgehogPearlNecklace,
    HedgehogRose,
} from '@posthog/brand/hoggies'
import {
    IconBell,
    IconHome,
    IconImage,
    IconMessage,
    IconPlay,
    IconPlusSquare,
    IconUser,
    IconVideoCamera,
} from '@posthog/icons'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import SEO from 'components/seo'

const posts = [
    {
        label: 'Pinned post',
        title: 'The full funnel. No filters.',
        text: 'Every step. Every drop-off. Nothing left to the imagination.',
        imageText: 'My funnel is wide open',
        Artwork: HedgehogChartHog,
        color: 'bg-pale-blue dark:bg-blue-2-dark',
    },
    {
        label: 'Behind the scenes',
        title: 'I watched the whole thing back.',
        text: 'Three missed clicks, one session replay, and a button that finally makes sense.',
        imageText: 'Caught on replay',
        Artwork: HedgehogDirector,
        color: 'bg-light-yellow dark:bg-accent-dark',
    },
    {
        label: 'Early access',
        title: 'I have a little secret.',
        text: 'It is a feature flag. I will tell everyone when it is ready.',
        imageText: 'Exclusive, until rollout',
        Artwork: HedgehogPartyHog,
        color: 'bg-light-purple dark:bg-accent-dark',
    },
]

const photos = [
    { title: 'Dressed up for a cohort report', Artwork: HedgehogPearlNecklace, color: 'bg-light-purple' },
    { title: 'A rose for your retention curve', Artwork: HedgehogRose, color: 'bg-pale-blue' },
    { title: 'Spotted in the charts again', Artwork: HedgehogChartHog, color: 'bg-light-yellow' },
]

export default function OnlyHogs(): JSX.Element {
    return (
        <>
            <SEO
                title="OnlyHogs - PostHog"
                description="Come for the Hoggies. Stay for the funnels, session replays, and feature flags."
                image="/images/og/default.png"
            />
            <Explorer
                template="generic"
                slug="onlyhogs"
                title="OnlyHogs"
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                <div className="@container h-full overflow-y-auto bg-white text-primary dark:bg-dark">
                    <div className="mx-auto min-h-full max-w-6xl border-x border-primary">
                        <nav aria-label="OnlyHogs navigation" className="grid h-14 grid-cols-5 border-b border-primary">
                            {[
                                { label: 'PostHog home', to: '/', Icon: IconHome },
                                { label: 'Latest news', to: '/changelog', Icon: IconBell },
                                { label: 'Join PostHog', to: 'https://app.posthog.com/signup', Icon: IconPlusSquare },
                                { label: 'Community questions', to: '/questions', Icon: IconMessage },
                            ].map(({ label, to, Icon }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    aria-label={label}
                                    className="flex items-center justify-center text-secondary focus-visible:outline-blue"
                                    externalNoIcon
                                >
                                    <Icon aria-hidden="true" className="size-6" />
                                </Link>
                            ))}
                            <a
                                href="#creator"
                                aria-label="PostHog profile"
                                aria-current="page"
                                className="flex items-center justify-center border-b-2 border-[#00aff0] text-[#007a9c] focus-visible:outline-[#007a9c] dark:text-[#5bd2ff]"
                            >
                                <IconUser aria-hidden="true" className="size-6" />
                            </a>
                        </nav>

                        <div className="@4xl:grid @4xl:grid-cols-[minmax(0,1fr)_17rem]">
                            <div className="min-w-0">
                                <header id="creator">
                                    <div className="relative flex h-40 items-center overflow-hidden bg-[#00aff0] px-4 text-[#002b3d] @md:h-48 @md:px-6">
                                        <div className="relative z-10 max-w-[55%]">
                                            <p className="mb-2 text-xs font-bold uppercase tracking-[.2em]">OnlyHogs</p>
                                            <p className="m-0 text-2xl font-bold leading-tight @md:text-3xl">
                                                Very revealing.
                                                <br />
                                                Very well dressed.
                                            </p>
                                        </div>
                                        <HedgehogRose
                                            aria-hidden="true"
                                            className="absolute -bottom-8 right-2 h-48 w-48 @md:right-10 @md:h-64 @md:w-64"
                                        />
                                    </div>

                                    <div className="px-4 pb-5 @md:px-6">
                                        <div className="relative -mt-9 flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-bg-primary bg-light-1 @md:size-24">
                                            <HedgehogPearlNecklace
                                                title="PostHog in a pearl necklace"
                                                className="size-full"
                                            />
                                        </div>
                                        <h1 className="mb-0 mt-3 flex items-center gap-2 text-xl font-bold @md:text-2xl">
                                            PostHog
                                            <span
                                                aria-label="Verified profile"
                                                className="inline-flex size-5 items-center justify-center rounded-full bg-[#00aff0] text-xs text-[#002b3d]"
                                            >
                                                ✓
                                            </span>
                                        </h1>
                                        <p className="mb-3 mt-0 text-sm text-secondary">
                                            @posthog · Last seen checking your funnel
                                        </p>
                                        <p className="mb-1 text-sm font-medium">
                                            I show you everything. Except your API keys.
                                        </p>
                                        <p className="mt-0 text-sm text-secondary">
                                            Open source and very into your retention curve.
                                        </p>

                                        <section
                                            aria-label="Free subscription"
                                            className="mt-5 rounded border border-primary p-4"
                                        >
                                            <div className="mb-3 flex items-baseline justify-between gap-3 text-sm">
                                                <span className="font-semibold">Subscription</span>
                                                <span className="font-bold">$0 / month</span>
                                            </div>
                                            <Link
                                                to="https://app.posthog.com/signup"
                                                externalNoIcon
                                                className="block rounded-full bg-[#00aff0] px-4 py-2.5 text-center text-sm font-bold text-[#002b3d] no-underline focus-visible:outline-[#007a9c]"
                                            >
                                                SUBSCRIBE FOR $0
                                            </Link>
                                            <p className="mb-0 mt-2 text-center text-xs text-secondary">
                                                Opens PostHog sign-up.
                                            </p>
                                        </section>
                                    </div>
                                </header>

                                <nav
                                    aria-label="Profile content"
                                    className="grid grid-cols-3 border-y border-primary text-sm"
                                >
                                    <a
                                        href="#posts"
                                        aria-current="page"
                                        className="flex items-center justify-center gap-2 border-b-2 border-[#00aff0] py-3 font-semibold text-[#007a9c] no-underline dark:text-[#5bd2ff]"
                                    >
                                        <IconMessage aria-hidden="true" className="size-4" /> Posts
                                    </a>
                                    <a
                                        href="#media"
                                        className="flex items-center justify-center gap-2 py-3 text-secondary no-underline"
                                    >
                                        <IconImage aria-hidden="true" className="size-4" /> Media
                                    </a>
                                    <Link
                                        to="/videos"
                                        className="flex items-center justify-center gap-2 py-3 text-secondary no-underline"
                                    >
                                        <IconVideoCamera aria-hidden="true" className="size-4" /> Videos
                                    </Link>
                                </nav>

                                <section id="posts" aria-label="PostHog posts" className="divide-y divide-primary">
                                    <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-secondary @md:px-6">
                                        3 posts
                                    </div>
                                    {posts.map(({ label, title, text, imageText, Artwork, color }) => (
                                        <article key={title} className="px-4 py-6 @md:px-6">
                                            <div className="mb-4 flex items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-light-1">
                                                    <HedgehogPearlNecklace aria-hidden="true" className="size-10" />
                                                </div>
                                                <div>
                                                    <p className="m-0 text-sm font-semibold">
                                                        PostHog{' '}
                                                        <span className="text-[#007a9c] dark:text-[#5bd2ff]">✓</span>
                                                    </p>
                                                    <p className="m-0 text-xs text-secondary">{label}</p>
                                                </div>
                                            </div>
                                            <h2 className="mb-1 text-lg font-bold">{title}</h2>
                                            <p className="mt-0 text-sm text-secondary">{text}</p>
                                            <div
                                                className={`relative mt-4 flex h-52 items-center justify-center overflow-hidden rounded border border-primary ${color}`}
                                            >
                                                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary">
                                                    FREE PREVIEW
                                                </span>
                                                <Artwork aria-hidden="true" className="h-44 w-auto max-w-[65%]" />
                                                <span className="absolute bottom-3 left-4 right-4 rounded bg-primary/90 px-3 py-2 text-center text-sm font-semibold text-primary">
                                                    {imageText}
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </section>

                                <section
                                    id="media"
                                    aria-labelledby="media-heading"
                                    className="border-t border-primary px-4 py-7 @md:px-6"
                                >
                                    <h2 id="media-heading" className="mb-1 text-lg font-bold">
                                        The photos you came for
                                    </h2>
                                    <p className="mt-0 text-sm text-secondary">
                                        Hoggies in their natural habitat: your product data.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 @md:grid-cols-3">
                                        {photos.map(({ title, Artwork, color }) => (
                                            <figure key={title} className="m-0 min-w-0">
                                                <div
                                                    className={`flex aspect-square items-center justify-center overflow-hidden rounded border border-primary ${color}`}
                                                >
                                                    <Artwork title={title} className="h-4/5 w-4/5" />
                                                </div>
                                                <figcaption className="mt-2 text-xs text-secondary">{title}</figcaption>
                                            </figure>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <aside
                                aria-label="PostHog interests"
                                className="border-t border-primary px-4 py-6 @md:px-6 @4xl:border-l @4xl:border-t-0"
                            >
                                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">My top interests</h2>
                                <div className="grid gap-3 @sm:grid-cols-3 @4xl:grid-cols-1">
                                    {[
                                        { name: 'Funnels', line: 'I love a good reveal.', to: '/funnels' },
                                        {
                                            name: 'Session replay',
                                            line: 'Let us watch that again.',
                                            to: '/session-replay',
                                        },
                                        {
                                            name: 'Feature flags',
                                            line: 'A little tease before launch.',
                                            to: '/feature-flags',
                                        },
                                    ].map(({ name, line, to }) => (
                                        <Link
                                            key={name}
                                            to={to}
                                            state={{ newWindow: true }}
                                            className="block min-w-0 rounded border border-primary bg-white p-3 no-underline focus-visible:outline-[#007a9c] dark:bg-accent-dark"
                                        >
                                            <p className="m-0 text-sm font-semibold text-[#007a9c] underline dark:text-[#5bd2ff]">
                                                {name}
                                            </p>
                                            <p className="mb-0 mt-1 text-xs text-secondary">{line}</p>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-6 border-t border-primary pt-5">
                                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                        <IconPlay
                                            aria-hidden="true"
                                            className="size-4 text-[#007a9c] dark:text-[#5bd2ff]"
                                        />
                                        See more of me
                                    </p>
                                    <Link
                                        to="/videos"
                                        className="text-sm font-semibold text-[#007a9c] dark:text-[#5bd2ff]"
                                    >
                                        Watch PostHog videos
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
