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
    IconHeart,
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
                description="PostHog shares its most revealing funnels. A safe-for-work fan site parody, with no paywall."
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
                <div className="@container h-full overflow-y-auto bg-primary text-primary">
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
                                className="flex items-center justify-center border-b-2 border-blue text-blue focus-visible:outline-blue"
                            >
                                <IconUser aria-hidden="true" className="size-6" />
                            </a>
                        </nav>

                        <div className="@4xl:grid @4xl:grid-cols-[minmax(0,1fr)_17rem]">
                            <div className="min-w-0">
                                <header id="creator">
                                    <div className="relative flex h-44 items-center overflow-hidden bg-blue px-5 text-light-1 @md:h-56 @md:px-8">
                                        <div className="relative z-10 max-w-[55%]">
                                            <p className="mb-2 text-xs font-bold uppercase tracking-[.2em]">OnlyHogs</p>
                                            <p className="m-0 text-2xl font-bold leading-tight @md:text-4xl">
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

                                    <div className="px-4 pb-5 @md:px-7">
                                        <div className="-mt-9 flex items-end justify-between gap-3">
                                            <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-bg-primary bg-light-1 @md:size-24">
                                                <HedgehogPearlNecklace
                                                    title="PostHog in a pearl necklace"
                                                    className="size-full"
                                                />
                                            </div>
                                            <span className="mb-2 rounded-full border border-primary px-3 py-1 text-xs font-medium text-secondary">
                                                100% safe for work
                                            </span>
                                        </div>
                                        <h1 className="mb-0 mt-3 flex items-center gap-2 text-xl font-bold @md:text-2xl">
                                            PostHog
                                            <span
                                                aria-label="Verified parody profile"
                                                className="inline-flex size-5 items-center justify-center rounded-full bg-blue text-xs text-light-1"
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
                                            Open-source, fully clothed, and very into your retention curve.
                                        </p>

                                        <section
                                            aria-label="Free subscription"
                                            className="mt-5 rounded border border-primary p-4"
                                        >
                                            <div className="mb-3 flex items-baseline justify-between gap-3 text-sm">
                                                <span className="font-semibold">Subscription</span>
                                                <span className="font-bold">$0 / in this parody</span>
                                            </div>
                                            <Link
                                                to="https://app.posthog.com/signup"
                                                externalNoIcon
                                                className="block rounded-full bg-blue px-4 py-2.5 text-center text-sm font-bold text-light-1 no-underline focus-visible:outline-blue"
                                            >
                                                SUBSCRIBE FOR $0
                                            </Link>
                                            <p className="mb-0 mt-2 text-center text-xs text-secondary">
                                                Opens PostHog sign-up. No subscription starts here.
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
                                        className="flex items-center justify-center gap-2 border-b-2 border-blue py-3 font-semibold text-blue no-underline"
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
                                    <div className="flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wide text-secondary @md:px-7">
                                        <span>3 posts · All free</span>
                                        <span>A fictional feed</span>
                                    </div>
                                    {posts.map(({ label, title, text, imageText, Artwork, color }) => (
                                        <article key={title} className="px-4 py-6 @md:px-7">
                                            <div className="mb-4 flex items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-light-1">
                                                    <HedgehogPearlNecklace aria-hidden="true" className="size-10" />
                                                </div>
                                                <div>
                                                    <p className="m-0 text-sm font-semibold">
                                                        PostHog <span className="text-blue">✓</span>
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
                                            <p className="mb-0 mt-4 flex items-center gap-2 text-xs text-secondary">
                                                <IconHeart aria-hidden="true" className="size-4 text-blue" /> Made with
                                                data, not a paywall.
                                            </p>
                                        </article>
                                    ))}
                                </section>

                                <section
                                    id="media"
                                    aria-labelledby="media-heading"
                                    className="border-t border-primary px-4 py-7 @md:px-7"
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
                                aria-label="About this parody"
                                className="border-t border-primary px-5 py-6 @4xl:border-l @4xl:border-t-0"
                            >
                                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">My top interests</h2>
                                <div className="grid grid-cols-3 gap-3 @4xl:grid-cols-1">
                                    {[
                                        { name: 'Funnels', line: 'I love a good reveal.' },
                                        { name: 'Replays', line: 'Let us watch that again.' },
                                        { name: 'Feature flags', line: 'A little tease before launch.' },
                                    ].map(({ name, line }) => (
                                        <div key={name} className="min-w-0 rounded border border-primary bg-accent p-3">
                                            <p className="m-0 text-sm font-semibold">{name}</p>
                                            <p className="mb-0 mt-1 text-xs text-secondary">{line}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 border-t border-primary pt-5">
                                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                        <IconPlay aria-hidden="true" className="size-4 text-blue" /> Want the real
                                        videos?
                                    </p>
                                    <Link to="/videos" className="text-sm font-semibold text-blue">
                                        Watch PostHog videos
                                    </Link>
                                </div>
                                <p className="mt-6 text-xs leading-relaxed text-secondary">
                                    OnlyHogs is a PostHog parody. The posts are fictional. There are no private
                                    messages, paid subscriptions, or adult images.
                                </p>
                            </aside>
                        </div>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
