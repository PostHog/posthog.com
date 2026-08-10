import React from 'react'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import SEO, { buildProductStructuredData } from 'components/seo'
import { Accordion } from 'components/RadixUI/Accordion'
import { CallToAction } from 'components/CallToAction'
import CommunityIncubatorForm from 'components/CommunityIncubatorForm'
import CollectiveCarousel from 'components/BuilderCollective/CollectiveCarousel'
import { HedgehogDj } from '@posthog/brand/hoggies'
import {
    IconCheck,
    IconPullRequest,
    IconPeople,
    IconCompass,
    IconMessage,
    IconArrowRight,
    IconBuilding,
    IconHome,
    IconHomeFilled,
} from '@posthog/icons'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { PANEL_BG } from '../../constants/frostedSurfaces'

// Frosted-glass "pane" — the site's own Aero-style surface (same treatment as reader panels and
// app windows), with a soft shadow and the classic-skin bevel edge. Neutral so it blends with the
// page rather than shouting. Shared by the three track cards below.
const paneClasses = `rounded-md border border-primary ${PANEL_BG} shadow-md skin-classic:border-b-3`

type IconComponent = React.ComponentType<{ className?: string }>

// Emphasis span, matching the /startups page's red/yellow treatment.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-red dark:text-yellow font-semibold">{children}</span>
)

// Reused from the old MDX page: a two-column term/value row for the track fact sheets.
const FactRow = ({ term, children }: { term: string; children: React.ReactNode }) => (
    <div className="grid grid-cols-[6rem_1fr] py-2 border-t border-primary/10 dark:border-primary-dark/10 first:border-t-0">
        <dt className="text-base font-bold text-primary">{term}</dt>
        <dd className="text-sm text-secondary pt-3">{children}</dd>
    </div>
)

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
        'Merch, intros, and shoutouts from our social media accounts',
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
                <div className="@container h-full bg-[#EFF0EB] dark:bg-dark">
                    {/* Cover banner — constrained to the content column and rounded so it reads as part of the
                        page rather than a full-bleed band. Fixed 4:1 aspect keeps it short and avoids layout shift. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/w_2000,c_limit,q_auto,f_auto/incubator_7251f5dffb.png"
                            alt="PostHog community incubator"
                            className="w-full aspect-[4/1] object-cover object-center rounded-lg"
                        />
                    </div>

                    {/* Hero intro — on the page background, with the HedgehogCodingGroup illustration beside the copy. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <p className="!m-0 mb-2 text-sm font-bold text-secondary">PostHog for Builders</p>
                        <h1 className="!mt-0 mb-6 text-3xl @md:text-4xl font-bold leading-tight">
                            We back builders who{' '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(48, 164, 108, 0.2)"
                                strokeWidth={1}
                                padding={2}
                                delay={300}
                                show
                            >
                                ship
                            </RoughAnnotation>
                        </h1>
                        <div className="flex flex-col items-start gap-6 @2xl:flex-row @2xl:gap-8">
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
                                <ul className="mb-4 list-none space-y-1 p-0 text-[15px]">
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

                    {/* Tracks — three frosted-glass panes (the site's own Aero surface), written out explicitly so
                        each headline and line of copy is easy to edit by hand. The `data-scheme="tertiary"` backdrop
                        gives the panes a subtly recessed tone, the way app windows sit on the desktop. */}
                    <div
                        data-scheme="tertiary"
                        className="not-prose grid grid-cols-1 @md:grid-cols-3 gap-4 m-4 @3xl:m-8 max-w-6xl mb-8 @3xl:mb-12"
                    >
                        {/* Builder groups */}
                        <a href="#builder-groups" className={`group block !no-underline p-5 ${paneClasses}`}>
                            <IconPeople className="size-6 text-blue" />
                            <h3 className="!m-0 mt-3 flex items-center gap-1 text-base font-bold text-primary">
                                Builder groups
                                <IconArrowRight className="size-4 text-secondary transition-transform group-hover:translate-x-0.5" />
                            </h3>
                            <p className="m-0 mt-1 text-sm text-secondary">
                                Gather local builders for recurring co-working sessions.
                            </p>
                            <p className="m-0 mt-1 text-sm text-red dark:text-yellow font-semibold">
                                Best fit for mid-career professionals.
                            </p>
                            <p className="m-0 mt-3 text-xs font-semibold text-secondary">$1,000 grant · 5+ sessions</p>
                        </a>

                        {/* Builder collectives */}
                        <a href="#builder-collectives" className={`group block !no-underline p-5 ${paneClasses}`}>
                            <IconBuilding className="size-6 text-purple" />
                            <h3 className="!m-0 mt-3 flex items-center gap-1 text-base font-bold text-primary">
                                Builder collectives
                                <IconArrowRight className="size-4 text-secondary transition-transform group-hover:translate-x-0.5" />
                            </h3>
                            <p className="m-0 mt-1 text-sm text-secondary">
                                Back a recognizable crew that already ships and seeks traction.
                            </p>
                            <p className="m-0 mt-1 text-sm text-red dark:text-yellow font-semibold">
                                Best fit for early career builders.
                            </p>
                            <p className="m-0 mt-3 text-xs font-semibold text-secondary">$1,000 grant · 3 months</p>
                        </a>

                        {/* Hacker houses */}
                        <a href="#hacker-houses" className={`group block !no-underline p-5 ${paneClasses}`}>
                            <IconHomeFilled className="size-6 text-teal" />
                            <h3 className="!m-0 mt-3 flex items-center gap-1 text-base font-bold text-primary">
                                Hacker houses
                                <IconArrowRight className="size-4 text-secondary transition-transform group-hover:translate-x-0.5" />
                            </h3>
                            <p className="m-0 mt-1 text-sm text-secondary">
                                A proven builder group or collective goes full-time on shipping.
                            </p>
                            <p className="m-0 mt-1 text-sm text-red dark:text-yellow font-semibold">
                                Best for anyone who thrives in sprints.
                            </p>
                            <p className="m-0 mt-3 text-xs font-semibold text-secondary">$1,000/week · 5–14 days</p>
                        </a>
                    </div>

                    {/* What we look for — freshly written for this pass. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl">
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

                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary">
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

                    {/* Builder groups — ported detail section. */}
                    <div id="builder-groups" className="m-4 @3xl:m-8 max-w-6xl border-t border-primary scroll-mt-24">
                        <h2 className="mb-2">Builder groups</h2>
                        <p className="mb-6 max-w-3xl">
                            One organizer recruits. Attendees mostly don't know each other yet.
                        </p>
                        <div className="grid @lg:grid-cols-2 gap-8 items-start mb-6">
                            <dl className="m-0 border border-primary rounded-md bg-primary p-6">
                                <FactRow term="Who">
                                    Career engineers, PMs, designers, founders, people with day jobs who build on nights
                                    and weekends.
                                </FactRow>
                                <FactRow term="Makeup">1 organizer, 6+ attendees per session.</FactRow>
                                <FactRow term="Duration">5 sessions, evenings or weekends.</FactRow>
                                <FactRow term="Support">
                                    <strong>$1,000 grant</strong>, merch, support with finding a venue and promoting.
                                </FactRow>
                            </dl>
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/taj_phl_builder_group_f00b7c9abd.jpg"
                                alt="Builder group co-working in Philadelphia"
                                className="rounded-md object-cover h-full min-h-48 w-full"
                            />
                        </div>
                    </div>

                    {/* Builder collectives — ported detail section. */}
                    <div
                        id="builder-collectives"
                        className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8 scroll-mt-24"
                    >
                        <h2 className="mb-2">Builder collectives</h2>
                        <p className="mb-6 max-w-3xl">Friends who already ship together and are looking for support.</p>
                        <div className="grid @lg:grid-cols-2 gap-8 items-start mb-6">
                            <dl className="m-0 border border-primary rounded-md bg-primary p-6">
                                <FactRow term="Who">
                                    Crews building together as a lifestyle. Often students, early-career engineers,
                                    indie hackers, and tech founders.
                                </FactRow>
                                <FactRow term="Makeup">
                                    4+ core members, each with at least one project that's shipping and verifiably
                                    evolving.
                                </FactRow>
                                <FactRow term="Duration">
                                    Three months. Weekly or biweekly sessions plus a public footprint.
                                </FactRow>
                                <FactRow term="Support">
                                    <strong>$1,000 grant</strong> + merch. We'll ask you to host one PostHog-themed
                                    event.
                                </FactRow>
                            </dl>
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/austin_texas_4368805f1b.jpeg"
                                alt="Builder collective crew in Austin"
                                className="rounded-md object-cover h-full min-h-48 w-full"
                            />
                        </div>
                    </div>

                    {/* Hacker houses — ported detail section. */}
                    <div
                        id="hacker-houses"
                        className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8 scroll-mt-24"
                    >
                        <h2 className="mb-2">Hacker houses</h2>
                        <p className="mb-6 max-w-3xl">
                            A curated cohort goes full-time on building for a fixed sprint.
                        </p>
                        <div className="grid @lg:grid-cols-2 gap-8 items-start mb-6">
                            <dl className="m-0 border border-primary rounded-md bg-primary p-6">
                                <FactRow term="Who">
                                    A proven crew, from a builder group or collective, going all-in for the duration.
                                </FactRow>
                                <FactRow term="Makeup">
                                    4+ builders, 18+, with one named lead accountable for the house.
                                </FactRow>
                                <FactRow term="Duration">
                                    5–14 days. A demo day. Not a lease. Not a vacation on our dime.
                                </FactRow>
                                <FactRow term="Support">
                                    <strong>$1,000 per week</strong> for lodging and food, merch, social promotion, and
                                    1:1s with PostHog team members.
                                </FactRow>
                            </dl>
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/cambridge_9a4e27f42e.png"
                                alt="Builders working together"
                                className="rounded-md object-cover h-full min-h-48 w-full"
                            />
                        </div>
                    </div>

                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8">
                        <h2 className="mb-2">Global footprint</h2>
                        <p className="mb-6">
                            Builders are gathering in cities across the globe. You'd be in good company.
                        </p>
                        <CollectiveCarousel />
                    </div>

                    {/* Apply — reuses the existing CommunityIncubatorForm. */}
                    <div id="apply" className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8 scroll-mt-24">
                        <h2 className="mb-2">
                            Apply to the <Highlight>incubator</Highlight>
                        </h2>
                        <p className="mb-6 max-w-2xl">
                            Pick your track and show us what you've shipped. We review output, not résumés.
                        </p>
                        <CommunityIncubatorForm />
                    </div>

                    {/* FAQ — Accordion, matching /startups. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8">
                        <h2 className="mb-4">FAQs</h2>
                        <Accordion data-scheme="primary" defaultValue="" items={faqItems} />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
