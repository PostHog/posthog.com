import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
    IconTarget,
    IconBolt,
    IconCoffee,
    IconList,
    IconCode,
    IconRecord,
    IconSearch,
    IconExpand,
    IconEye,
    IconPeople,
    IconInfo,
    IconMagic,
    IconPlay,
    IconCursorClick,
    IconSparkles,
    IconRocket,
    IconConfetti,
    IconReceipt,
    IconPieChart,
    IconCheckCircle,
    IconGraph,
} from '@posthog/icons'
import ProductReaderView from 'components/Products/ReaderViewProduct'
import type { CarouselSlide, ProductNavItem } from 'components/Products/ReaderViewProduct/types'
import {
    AI,
    Applications,
    ComparisonSummary,
    Customers,
    Demo,
    Eli5,
    FeatureComparison,
    Features,
    GettingStarted,
    Overview,
    PairsWith,
    Plans,
    Pricing,
    PricingCalculator,
    TopFeatures,
    UseCases,
} from 'components/Products/ReaderViewProduct/templates'

export const PRODUCT_HANDLE = 'session_replay'

const applications: CarouselSlide[] = [
    {
        slug: 'filter',
        label: 'Find something specific',
        icon: <IconTarget className="size-5" />,
        color: 'bg-white dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Find something specific',
        description: "You can search by a user's info like email address, location, or organization.",
        image: 'filters',
    },
    {
        slug: 'research',
        label: 'Automate analysis',
        icon: <IconBolt className="size-5" />,
        color: 'bg-white dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Building and want to ask questions about data?',
        description:
            "Ask PostHog AI (also available with our MCP) and it'll return specific answers based on replay data.",
        image: { ref: 'chat', imgClassName: 'border-0 rounded-none' },
    },
    {
        slug: 'explore',
        label: 'Just want to explore?',
        icon: <IconCoffee className="size-5" />,
        color: 'bg-white dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Just want to explore?',
        description:
            "Crack open the Session Replay app and you'll see a list of recent sessions. Click through them like you're watching TV. Scrub around to look for interesting points in the timeline.",
        image: {
            ref: 'recordings',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
]

const topFeatures: CarouselSlide[] = [
    {
        slug: 'event-timeline',
        label: 'Event timeline',
        icon: <IconList className="size-5" />,
        color: 'bg-white',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: 'Event timeline',
        description: (
            <>
                <p>
                    Scrub through an activity log of a user's session to jump directly to parts you want to watch. The
                    timeline shows you a full list of autocapture events (like page views), custom events, form
                    interactions, and errors the user may have encountered during their session.
                </p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>Event properties</strong> show you the properties of the event, like the page URL, the
                        user's IP address, and the timestamp of the event.
                    </li>
                    <li>
                        <strong>Error details</strong> show you the details of the error, like the error message, the
                        stack trace, and the timestamp of the error. You can also see the full request and response
                        headers.
                    </li>
                    <li>
                        <strong>Web vitals</strong> lets you see performance metrics like FCP, LCP, INP, CLS, and any
                        other acronyms they might think up next.
                    </li>
                </ul>
                <p>
                    Click on any row to jump to that point in the session, or click{' '}
                    <span className="inline-block">
                        the
                        <IconExpand className="size-5 inline-block" aria-label="Expand" /> icon
                    </span>{' '}
                    view the associated metadata.
                </p>
            </>
        ),
        image: { ref: 'overview', glow: true },
    },
    {
        slug: 'technical-context',
        label: 'Technical context',
        icon: <IconCode className="size-5" />,
        color: 'bg-white',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'float',
        heading: 'A DevTools panel, synced to the recording',
        description: (
            <>
                <p>
                    Every session comes with a panel of technical data synced to the video. Scrub to any point and see
                    exactly what your app was doing at that moment.
                </p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>Network monitor</strong> captures every request and response with timing, method, and
                        status code – spot slow API calls or failed requests the moment they happen.
                    </li>
                    <li>
                        <strong>Console logs</strong> record all warnings and errors in real time, correlated to the
                        exact point in the session they happened. Pair with Error Tracking for full stack traces linked
                        directly to the replay.
                    </li>
                    <li>
                        <strong>DOM explorer</strong> shows a live DOM snapshot at any point in the recording – catch
                        layout shifts, broken styles, or elements that weren't rendering when they should.
                    </li>
                </ul>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
            alt: 'Network monitor in session replay',
        },
    },
    {
        slug: 'recording-rules',
        label: 'Recording rules',
        icon: <IconRecord className="size-5" />,
        color: 'bg-white',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Record the sessions you care about',
        description: (
            <>
                <p>
                    Recording every session gets noisy fast. Recording rules narrow your capture to what's actually
                    useful.
                </p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>Sampling</strong> records a percentage of all sessions. Start at 100% and dial it down
                        as your volume grows.
                    </li>
                    <li>
                        <strong>URL and event triggers</strong> start recording when a user visits a specific page or
                        fires a specific event – like reaching checkout, hitting an error, or completing onboarding.
                    </li>
                    <li>
                        <strong>Feature flag targeting</strong> limits recordings to users in a specific rollout –
                        useful for monitoring experiments or beta users without recording everyone.
                    </li>
                    <li>
                        <strong>Privacy masking</strong> redacts sensitive fields by default. Passwords are always
                        masked; exclude any element from capture with a <code>ph-no-capture</code> class.
                    </li>
                </ul>
                <p>Combine multiple rules to capture the highest-signal sessions – and nothing else.</p>
            </>
        ),
    },
    {
        slug: 'find-behavior',
        label: 'Find behavior',
        icon: <IconSearch className="size-5" />,
        color: 'bg-white',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Find the sessions you need',
        description: (
            <>
                <p>Filter recordings by almost anything.</p>
                <ul className="space-y-4 mb-4">
                    <li>
                        <strong>Event filters</strong> narrow recordings to sessions where a specific action was
                        triggered – a button click, page view, or custom event.
                    </li>
                    <li>
                        <strong>Person properties</strong> filter by country, plan, email, or any user attribute to find
                        sessions from the right segment.
                    </li>
                    <li>
                        <strong>Frustration signals</strong> surface recordings with rage clicks, dead clicks, or
                        exceptions – the sessions most likely to show you something worth fixing.
                    </li>
                    <li>
                        <strong>PostHog AI</strong> takes a plain-English description of the behavior you're looking for
                        – "users who dropped off during checkout" – and returns a matching playlist. Once found, AI
                        summaries give you a breakdown of what happened without watching the whole thing.
                    </li>
                </ul>
                <p>Save filters as dynamic playlists that automatically update as new sessions come in.</p>
            </>
        ),
        image: 'filters',
    },
]

export const productMenu: ProductNavItem[] = [
    { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" />, component: Overview },
    {
        slug: 'customers',
        name: 'Who uses it?',
        group: 'divided',
        icon: <IconPeople className="size-4" />,
        component: Customers,
    },
    {
        slug: 'eli5',
        name: 'What does it do?',
        group: 'divided',
        icon: <IconInfo className="size-4" />,
        component: Eli5,
    },
    {
        slug: 'use-cases',
        name: 'Who is it for?',
        group: 'divided',
        icon: <IconMagic className="size-4" />,
        component: UseCases,
    },
    { slug: 'demo', name: 'Demo', group: 'divided', icon: <IconPlay className="size-4" />, component: Demo },
    {
        slug: 'applications',
        name: 'How do I use it?',
        group: 'divided',
        icon: <IconCursorClick className="size-4" />,
        component: Applications,
        props: { slides: applications },
    },
    {
        slug: 'top-features',
        name: 'Top features',
        group: 'divided',
        icon: <IconSparkles className="size-4" />,
        component: TopFeatures,
        props: { slides: topFeatures },
    },
    {
        slug: 'features',
        name: 'Features (legacy)',
        group: 'divided',
        hideFromNav: true,
        component: Features,
    },
    {
        slug: 'getting-started',
        name: 'Get started',
        group: 'divided',
        icon: <IconRocket className="size-4" />,
        component: GettingStarted,
    },
    { slug: 'ai', name: 'AI', hideFromNav: true, icon: <IconSparkles className="size-4" />, component: AI },
    {
        slug: 'pairs-with',
        name: 'Pairs with...',
        hideFromNav: true,
        icon: <IconConfetti className="size-4" />,
        component: PairsWith,
    },
]

export const pricingMenu: ProductNavItem[] = [
    {
        slug: 'rates',
        name: 'Session Replay rates',
        icon: <IconReceipt className="size-4" />,
        component: Pricing,
    },
    {
        slug: 'calculator',
        name: 'Pricing calculator',
        icon: <IconPieChart className="size-4" />,
        component: PricingCalculator,
    },
    { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" />, component: Plans },
    {
        slug: 'comparison-summary',
        name: 'PostHog vs...',
        icon: <IconList className="size-4" />,
        component: ComparisonSummary,
    },
    {
        slug: 'feature-comparison',
        name: 'Feature comparison',
        icon: <IconGraph className="size-4" />,
        component: FeatureComparison,
    },
]

export default function SessionReplay(): JSX.Element {
    const data = useStaticQuery(graphql`
        query {
            allProductData {
                nodes {
                    products {
                        name
                        type
                        unit
                        addons {
                            name
                            type
                            unit
                            plans {
                                name
                                plan_key
                                included_if
                                features {
                                    key
                                    name
                                    description
                                    limit
                                    note
                                }
                            }
                        }
                        plans {
                            name
                            plan_key
                            free_allocation
                            included_if
                            features {
                                key
                                name
                                description
                                limit
                                note
                            }
                            tiers {
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                }
            }
        }
    `)

    return (
        <ProductReaderView
            productHandle={PRODUCT_HANDLE}
            data={data}
            productMenu={productMenu}
            pricingMenu={pricingMenu}
        />
    )
}
