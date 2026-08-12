import React from 'react'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import SEO, { buildProductStructuredData } from 'components/seo'
import { Accordion } from 'components/RadixUI/Accordion'
import { CallToAction } from 'components/CallToAction'
import CommunityIncubatorForm from 'components/CommunityIncubatorForm'
import CollectiveCarousel from 'components/BuilderCollective/CollectiveCarousel'
import TabbedCarousel, { type TabbedCarouselTab } from 'components/TabbedCarousel'
import { HedgehogDj } from '@posthog/brand/hoggies'
import {
    IconCheck,
    IconPullRequest,
    IconPeople,
    IconCompass,
    IconMessage,
    IconBuilding,
    IconHomeFilled,
} from '@posthog/icons'

const contentSectionClasses = 'mx-4 my-4 @3xl:mx-8 @3xl:my-8 @7xl:mx-auto max-w-6xl'

type IconComponent = React.ComponentType<{ className?: string }>

// Red/yellow emphasis used throughout the supporting section headings.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-red dark:text-yellow font-semibold">{children}</span>
)

// Background highlight used only for the hero title, matching /self-driving.
const HeroHighlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

// Reused from the old MDX page: a two-column term/value row for the track fact sheets.
const FactRow = ({ term, children }: { term: string; children: React.ReactNode }) => (
    <div className="grid grid-cols-[6rem_1fr] py-2 border-t border-primary/10 dark:border-primary-dark/10 first:border-t-0">
        <dt className="m-0 text-base font-bold text-primary">{term}</dt>
        <dd className="m-0 text-sm text-secondary">{children}</dd>
    </div>
)

const PhotoWithCaption = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
    <figure className="not-prose relative m-0 min-h-48 self-stretch overflow-hidden rounded-md">
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-black/0 to-black/70 p-3 pt-12 text-sm font-medium leading-tight text-white">
            {caption}
        </figcaption>
    </figure>
)

type Track = {
    value: string
    title: string
    summary: string
    bestFor: string
    icon: React.ReactNode
    color: string
    activeText: string
    progressBar: string
    facts: { term: string; copy: React.ReactNode }[]
    image: string
    alt: string
    caption: string
}

const tracks: Track[] = [
    {
        value: 'builder-groups',
        title: 'Builder groups',
        summary: "One organizer recruits local builders who mostly don't know each other yet.",
        bestFor: 'Best fit for mid-career professionals',
        icon: <IconPeople className="size-5" />,
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        facts: [
            {
                term: 'Who',
                copy: 'Career engineers, PMs, designers, founders, and people with day jobs who build on nights and weekends.',
            },
            { term: 'Makeup', copy: '1 organizer, 6+ attendees per session.' },
            { term: 'Duration', copy: '5 sessions, evenings or weekends.' },
            {
                term: 'Support',
                copy: (
                    <>
                        <strong>$1,000 grant</strong>, merch, support with finding a venue and promoting.
                    </>
                ),
            },
        ],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/taj_phl_builder_group_f00b7c9abd.jpg',
        alt: 'Builder group co-working in Philadelphia',
        caption: 'Taj leading his builder group in Philadelphia',
    },
    {
        value: 'builder-collectives',
        title: 'Builder collectives',
        summary: 'Friends who already ship together and are looking for support.',
        bestFor: 'Best fit for early career builders',
        icon: <IconBuilding className="size-5" />,
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        facts: [
            {
                term: 'Who',
                copy: 'Crews building together as a lifestyle. Often students, early-career engineers, indie hackers, and tech founders.',
            },
            {
                term: 'Makeup',
                copy: "4+ core members, each with at least one project that's shipping and verifiably evolving.",
            },
            { term: 'Duration', copy: 'Three months. Weekly or biweekly sessions plus a public footprint.' },
            {
                term: 'Support',
                copy: (
                    <>
                        <strong>$1,000 grant</strong> + merch. We'll ask you to host one PostHog-themed event.
                    </>
                ),
            },
        ],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/austin_texas_4368805f1b.jpeg',
        alt: 'Builder collective crew in Austin',
        caption: 'Matt with the ATX Builders collective in Austin',
    },
    {
        value: 'hacker-houses',
        title: 'Hacker houses',
        summary: 'A proven builder group or collective goes full-time on shipping for a fixed sprint.',
        bestFor: 'Best for anyone who thrives in sprints',
        icon: <IconHomeFilled className="size-5" />,
        color: 'bg-teal',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        facts: [
            {
                term: 'Who',
                copy: 'A proven crew, from a builder group or collective, going all-in for the duration.',
            },
            { term: 'Makeup', copy: '4+ builders, 18+, with one named lead accountable for the house.' },
            { term: 'Duration', copy: '5–14 days. A demo day. Not a lease. Not a vacation on our dime.' },
            {
                term: 'Support',
                copy: (
                    <>
                        <strong>$1,000 per week</strong> for lodging and food, merch, social promotion, and 1:1s with
                        PostHog team members.
                    </>
                ),
            },
        ],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cambridge_9a4e27f42e.png',
        alt: 'Builders working together in a coffee shop',
        caption: 'A co-founder, product manager, graphic designer, developer, and webmaster take over a coffee shop',
    },
]

const TrackSlide = ({ track }: { track: Track }) => (
    <div className="grid min-h-full gap-6 p-4 @md:p-6 @lg:grid-cols-2 @lg:p-8">
        <div className="min-w-0 pr-8 @lg:pr-0">
            <p className="m-0 text-sm font-semibold text-red dark:text-yellow">{track.bestFor}</p>
            <h3 className="mb-2 mt-1 text-2xl text-primary">{track.title}</h3>
            <p className="mt-0 text-secondary">{track.summary}</p>
            <dl className="not-prose m-0 rounded-md border border-primary bg-primary p-4">
                {track.facts.map(({ term, copy }) => (
                    <FactRow key={term} term={term}>
                        {copy}
                    </FactRow>
                ))}
            </dl>
        </div>
        <PhotoWithCaption src={track.image} alt={track.alt} caption={track.caption} />
    </div>
)

const trackTabs: TabbedCarouselTab[] = tracks.map((track) => ({
    value: track.value,
    label: track.title,
    icon: track.icon,
    content: <TrackSlide track={track} />,
    color: track.color,
    activeText: track.activeText,
    progressBar: track.progressBar,
}))

// "What we look for" — the core of this pass. Energetic, proof-over-promises, community-first.
const lookFor: { Icon: IconComponent; color: string; title: string; copy: string }[] = [
    {
        Icon: IconPullRequest,
        color: 'text-green',
        title: 'You ship, not pitch',
        copy: 'You’ve got projects live on the internet. Repos, demos, side projects. We read output, not résumés.',
    },
    {
        Icon: IconPeople,
        color: 'text-blue',
        title: 'You can get builders in a room',
        copy: 'You can pull people together IRL or online, and keep them coming back to build side by side.',
    },
    {
        Icon: IconCompass,
        color: 'text-purple',
        title: 'You’ve got local energy',
        copy: 'You know your city’s tech scene, or you’re the one to start it. Momentum is contagious and you are the driver.',
    },
    {
        Icon: IconMessage,
        color: 'text-red dark:text-yellow',
        title: 'You build in public',
        copy: 'You share work like demos, posts, hackathon projects, so your crew grows and other builders want in.',
    },
]

// The rules that apply to every track. Ported from the old page's "Every track, same rules" grid.
const rules: { title: string; copy: React.ReactNode }[] = [
    { title: 'Grants are discretionary', copy: "We don't audit receipts. We review your output." },
    {
        title: 'Apply with proof',
        copy: "Applications include your LinkedIn, GitHub handle, and URLs of things you've shipped.",
    },
    {
        title: 'One grant at a time',
        copy: 'One active grant per organizer per track. Do it well, then do the next thing.',
    },
    { title: 'Keep us posted', copy: 'Organizers and leads share progress with us on GitHub and Discord.' },
    {
        title: 'Growth path',
        copy: 'Complete a builder group or a collective (or both) and you can apply to host a hacker house.',
    },
    {
        title: "What's in it for PostHog?",
        copy: (
            <>
                Global community with ambassadors, stories worth sharing, and founders who build the way we do. Using
                PostHog is <em>not</em> a requirement.
            </>
        ),
    },
]

// Visible FAQ (JSX). Keep in sync with faqStructuredData below.
const faqItems = [
    {
        trigger: 'Which track should I apply for?',
        content: (
            <p>
                If you have a day job and want to gather local builders who don't know each other yet, start a{' '}
                <strong>builder group</strong>. If you're part of a crew that already ships together, apply as a{' '}
                <strong>builder collective</strong>. If you've completed either of those and want to go full-time for a
                sprint, apply for a <strong>hacker house</strong>.
            </p>
        ),
    },
    {
        trigger: 'Can I run more than one at a time?',
        content: (
            <p>
                One active grant per organizer per track at a time. Finish what you start, then apply for the next
                thing.
            </p>
        ),
    },
    {
        trigger: 'How do I qualify for a hacker house?',
        content: (
            <p>
                Complete a builder group or a builder collective first. We won't accept cold applications for hacker
                houses, the lead needs a track record with us.
            </p>
        ),
    },
    {
        trigger: 'Do you audit how I spend the grant?',
        content: (
            <p>
                No. Grants are discretionary. You can spend on food, coffee, a venue, or whatever brings the crew
                together. We review your output, not your receipts.
            </p>
        ),
    },
    {
        trigger: 'Do I have to use PostHog?',
        content: (
            <p>
                No. We're excited about helping bootstrap builder communities around the world. That's what we're in it
                for. No one needs to use PostHog to be part of this.
            </p>
        ),
    },
    {
        trigger: 'What if more than one person applies from the same city?',
        content: (
            <p>
                If it's a major city (population of 1 million or more), that's not a problem. If it's a smaller city,
                we'll connect you with other applicants from the same city.
            </p>
        ),
    },
    {
        trigger: 'What happens when the sessions end?',
        content: (
            <p>
                Keep going. The grant is the initial push, not the ceiling. Groups that keep running get spotlighted,
                collectives that host demo nights get extra backing, and both become eligible to apply for a hacker
                house.
            </p>
        ),
    },
]

// Plain-text FAQ for schema.org FAQPage. Keep in sync with faqItems above.
const faqStructuredData = [
    {
        question: 'Which track should I apply for?',
        answer: "If you have a day job and want to gather local builders who don't know each other yet, start a builder group. If you're part of a crew that already ships together, apply as a builder collective. If you've completed either and want to go full-time for a sprint, apply for a hacker house.",
    },
    {
        question: 'Do I have to use PostHog to take part?',
        answer: "No. We're excited about helping bootstrap builder communities around the world. No one needs to use PostHog to be part of this.",
    },
    {
        question: 'Do you audit how I spend the grant?',
        answer: 'No. Grants are discretionary. You can spend on food, coffee, a venue, or whatever brings the crew together. We review your output, not your receipts.',
    },
    {
        question: 'How do I qualify for a hacker house?',
        answer: 'Complete a builder group or a builder collective first. There are no cold applications for hacker houses, the lead needs a track record with us.',
    },
]

export default function CommunityIncubatorProgram(): JSX.Element {
    const heroBullets = [
        '$1,000 cash grant to gather local builders and keep them shipping',
        'Merch, intros, and shoutouts across our online communities',
        'A path from hosting local meetups to participating in a hacker house',
    ]

    return (
        <>
            <SEO
                title="PostHog community incubator | We back builders who ship"
                description="Grants, merch, and a spotlight for builders who make things and get other people making things too. Three tracks, from your first local meetup to a full-time hacker house. No PostHog account required."
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog community incubator',
                    description:
                        'Grants, merch, and spotlights for builders who ship and gather other builders. Three tracks — builder groups, builder collectives, and hacker houses — running in cities around the world.',
                    slug: 'community-incubator',
                    faq: faqStructuredData,
                })}
            />
            <ReaderView
                proseSize="lg"
                hideLeftSidebar
                showQuestions={false}
                title="community-incubator.md"
                hideTitle
                className="overflow-x-hidden"
            >
                <div className="@container h-full">
                    {/* Hero intro — on the page background, with the HedgehogCodingGroup illustration beside the copy. */}
                    <div className={contentSectionClasses}>
                        <div className="not-prose">
                            <h1 className="m-0 text-3xl font-bold !leading-tight @md/reader-content:text-4xl @3xl/reader-content:text-5xl">
                                We back <HeroHighlight>builders who ship</HeroHighlight>
                            </h1>
                        </div>
                        <div className="mt-6 flex flex-col items-start gap-6 @2xl:flex-row @2xl:gap-8">
                            <div className="min-w-0 @2xl:flex-1 max-w-2xl">
                                <p className="mt-0 mb-4">
                                    Our thesis is to get builders in a room and support them to ship things. Get cash
                                    grants, merch, and a spotlight from us to host local meetups or a full-time hack
                                    sprint. We've backed groups around the globe, from{' '}
                                    <Link
                                        to="https://github.com/PostHog/marketing/issues/202"
                                        state={{ newWindow: true }}
                                        className="font-semibold text-red dark:text-yellow"
                                        externalNoIcon
                                    >
                                        Argentina
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        to="https://github.com/PostHog/marketing/issues/203"
                                        state={{ newWindow: true }}
                                        className="font-semibold text-red dark:text-yellow"
                                        externalNoIcon
                                    >
                                        Texas
                                    </Link>{' '}
                                    to the{' '}
                                    <Link
                                        to="https://github.com/PostHog/marketing/issues/197"
                                        state={{ newWindow: true }}
                                        className="font-semibold text-red dark:text-yellow"
                                        externalNoIcon
                                    >
                                        United Kingdom
                                    </Link>
                                    ,{' '}
                                    <Link
                                        to="https://github.com/PostHog/marketing/issues/210"
                                        state={{ newWindow: true }}
                                        className="font-semibold text-red dark:text-yellow"
                                        externalNoIcon
                                    >
                                        Kenya
                                    </Link>
                                    , and{' '}
                                    <Link
                                        to="https://github.com/PostHog/marketing/issues/213"
                                        state={{ newWindow: true }}
                                        className="font-semibold text-red dark:text-yellow"
                                        externalNoIcon
                                    >
                                        Pakistan
                                    </Link>
                                    .
                                </p>
                                <ul className="not-prose mb-4 list-none space-y-1 p-0 text-[15px]">
                                    {heroBullets.map((item) => (
                                        <li key={item} className="relative pl-6">
                                            <IconCheck className="absolute left-0 top-0.5 size-4 text-green" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap items-center gap-3">
                                    <CallToAction to="#apply" type="primary" size="md">
                                        Apply now
                                    </CallToAction>
                                    <span className="text-xs text-secondary italic">No PostHog account required</span>
                                </div>
                            </div>

                            <div className="w-full flex justify-center self-center @2xl:w-auto @2xl:flex-[0_0_240px] @4xl:flex-[0_0_300px]">
                                <HedgehogDj title="A builder DJ hog" className="w-full max-w-[240px] @2xl:max-w-none" />
                            </div>
                        </div>
                    </div>

                    {/* Tracks — the homepage carousel pattern combines each track's summary, facts, and photo. */}
                    <div className={`not-prose ${contentSectionClasses} mb-8 @3xl:mb-12`}>
                        <TabbedCarousel tabs={trackTabs} variant="hero" />
                    </div>

                    {/* What we look for — freshly written for this pass. */}
                    <div className={contentSectionClasses}>
                        <h2 className="mb-2">
                            Who we <Highlight>are looking for</Highlight>
                        </h2>
                        <p className="mb-6 max-w-3xl">
                            We back people who make things and want to get other people involved too. It doesn't matter
                            if you're a student, between jobs, or shipping on nights and weekends.
                        </p>
                        <div className="not-prose grid @md:grid-cols-2 gap-x-8 gap-y-6">
                            {lookFor.map(({ Icon, color, title, copy }) => (
                                <div key={title} className="flex items-start gap-3">
                                    <Icon className={`size-6 shrink-0 mt-0.5 ${color}`} />
                                    <div>
                                        <p className="m-0 text-base font-bold text-primary">{title}</p>
                                        <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 mb-0 text-sm text-secondary">
                            <strong className="font-semibold text-red dark:text-yellow">Not for you if…</strong> you're
                            building a recruiting funnel, running an audience-first content farm, organizing one-off
                            hackathons, or you're a "community manager" with a thin track record as a builder. We're
                            here for the doers.
                        </p>
                    </div>

                    <div className={`${contentSectionClasses} border-t border-primary`}>
                        <h2 className="mb-2">
                            Every track, <Highlight>same rules</Highlight>
                        </h2>
                        <p className="mb-6 max-w-3xl">
                            The format is always <strong>build and ship</strong>. No slides, no surface-level
                            networking.
                        </p>
                        <div className="not-prose grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
                            {rules.map(({ title, copy }) => (
                                <div key={title} className="border border-primary rounded-md bg-primary p-4">
                                    <p className="m-0 text-base font-bold text-primary">{title}</p>
                                    <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`${contentSectionClasses} border-t border-primary pt-8`}>
                        <h2 className="mb-2">Global footprint</h2>
                        <p className="mb-6">
                            Builders are gathering in cities across the globe. You'd be in good company.
                        </p>
                        <CollectiveCarousel />
                    </div>

                    <div id="apply" className={`${contentSectionClasses} border-t border-primary pt-8 scroll-mt-24`}>
                        <div className="max-w-[700px]">
                            <h2 className="mb-2">
                                Apply to the <Highlight>incubator</Highlight>
                            </h2>
                            <p className="mb-6">
                                Pick your track and show us what you've shipped. We review output, not résumés.
                            </p>
                            <CommunityIncubatorForm />
                        </div>
                    </div>

                    {/* FAQ — Accordion, matching /startups. */}
                    <div className={`${contentSectionClasses} border-t border-primary pt-8`}>
                        <h2 className="mb-4">FAQs</h2>
                        <Accordion data-scheme="primary" defaultValue="" items={faqItems} />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
