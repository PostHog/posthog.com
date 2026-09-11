import React, { useRef, useState } from 'react'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import SEO, { buildProductStructuredData } from 'components/seo'
import { Accordion } from 'components/RadixUI/Accordion'
import {
    IconGraph,
    IconRewindPlay,
    IconToggle,
    IconFlask,
    IconMessage,
    IconDatabase,
    IconStack,
    IconSparkles,
    IconBolt,
    IconPullRequest,
    IconArrowRight,
    IconPieChart,
    IconTelescope,
    IconNotification,
    IconChevronLeft,
    IconChevronRight,
    IconX,
} from '@posthog/icons'
import OSButton from 'components/OSButton'
import { Logo } from '@posthog/brand/logo'

const CAMPFIRE_HOG = 'https://res.cloudinary.com/dmukukwp6/image/upload/lenny_campfire_hog_853bb11d39.png'
const HOGZILLA = 'https://res.cloudinary.com/dmukukwp6/image/upload/lenny_hogzilla_fbfda8c4db.png'
const LENNY_FIRE = 'https://res.cloudinary.com/dmukukwp6/image/upload/lenny_fire_62d09256e1.png'

type IconComponent = React.ComponentType<{ className?: string }>

// The claim URL handles every entry state (logged in, logged out, brand new) and lands
// everyone on the coupon claim page. UTM values match what the program owner already tracks.
const claimUrl = 'https://app.posthog.com/coupons/lenny?utm_source=lenny&utm_medium=lenny&utm_campaign=lenny'
const productPassUrl = 'https://lennysproductpass.com'

// Marker-pen emphasis, matching the /slack page's treatment. `box-decoration-clone` keeps the
// highlight tidy when the phrase wraps across lines on narrow containers.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow box-decoration-clone">{children}</span>
)

// The four jobs product people hire us for, mirroring the tab set on /products.
// Warm PostHog tokens chosen to echo Lenny's campfire palette.
const jobs: {
    bg: string
    rotate: string
    title: string
    copy: string
    tools: { Icon: IconComponent; name: string; slug: string }[]
}[] = [
    {
        bg: 'bg-gold',
        rotate: '-rotate-1',
        title: 'Understand product usage',
        copy: 'See what people actually do, not what you hoped they would.',
        tools: [
            { Icon: IconGraph, name: 'Product analytics', slug: 'product-analytics' },
            { Icon: IconRewindPlay, name: 'Session replay', slug: 'session-replay' },
            { Icon: IconPieChart, name: 'Web analytics', slug: 'web-analytics' },
        ],
    },
    {
        bg: 'bg-teal-2',
        rotate: '',
        title: 'Test and roll out changes',
        copy: 'Ship to a few people first, prove it worked, then ship to everyone.',
        tools: [
            { Icon: IconToggle, name: 'Feature flags', slug: 'feature-flags' },
            { Icon: IconFlask, name: 'Experiments', slug: 'experiments' },
            { Icon: IconMessage, name: 'Surveys', slug: 'surveys' },
        ],
    },
    {
        bg: 'bg-creamsicle',
        rotate: 'rotate-1',
        title: 'Support your users',
        copy: 'Reply to tickets, run surveys, and track cost and quality of your AI features.',
        tools: [
            { Icon: IconMessage, name: 'Surveys', slug: 'surveys' },
            { Icon: IconSparkles, name: 'Support', slug: 'support' },
            { Icon: IconPullRequest, name: 'AI observability', slug: 'ai-observability' },
        ],
    },
    {
        bg: 'bg-pale-blue',
        rotate: '-rotate-2',
        title: 'Do more with your data',
        copy: 'Sync revenue, CRM, and support data and analyze it all together.',
        tools: [
            { Icon: IconSparkles, name: 'PostHog AI', slug: 'ai' },
            { Icon: IconDatabase, name: 'Data warehouse', slug: 'data-warehouse' },
            { Icon: IconStack, name: 'CDP', slug: 'cdp' },
        ],
    },
]

// The self-driving pitch, aimed at the AI-forward reader.
const selfDrivingCapabilities: { Icon: IconComponent; color: string; title: string; copy: React.ReactNode }[] = [
    {
        Icon: IconStack,
        color: 'text-blue',
        title: 'Centralize your context',
        copy: 'Every signal — events, replays, errors, feedback — lands in one place, so nothing gets lost between tools.',
    },
    {
        Icon: IconSparkles,
        color: 'text-purple',
        title: 'Ask in plain English',
        copy: 'PostHog AI answers questions about your data, builds dashboards, and writes the SQL for you.',
    },
    {
        Icon: IconBolt,
        color: 'text-yellow',
        title: 'Set itself up',
        copy: 'The wizard instruments your app and names your events, so you skip the tagging spreadsheet.',
    },
    {
        Icon: IconTelescope,
        color: 'text-orange',
        title: 'Send out scouts',
        copy: "Scouts run on a schedule, build durable memory of what they've seen, and file what they find. Add ours, or write your own.",
    },
    {
        Icon: IconNotification,
        color: 'text-teal',
        title: 'Read one ranked inbox',
        copy: 'Your Inbox groups related findings into researched reports, ranked by priority, so you triage instead of digging.',
    },
    {
        Icon: IconPullRequest,
        color: 'text-green',
        title: 'Open the pull request',
        copy: "PostHog finds what's worth fixing, writes the code, and opens a PR. You hit merge.",
    },
]

// Claiming the offer, start to finish. The claim link covers step 2 on its own.
const claimSteps: { title: string; copy: React.ReactNode }[] = [
    {
        title: 'Get your code',
        copy: (
            <>
                Lenny's team assigns codes to Product Pass holders.{' '}
                <Link to={productPassUrl} externalNoIcon className="font-semibold underline">
                    Grab yours
                </Link>
                .
            </>
        ),
    },
    {
        title: 'Sign in or sign up',
        copy: (
            <>
                The claim link sorts this out for you, new account or not.{' '}
                <Link to={claimUrl} externalNoIcon className="font-semibold underline">
                    Take me there
                </Link>
                .
            </>
        ),
    },
    {
        title: 'Redeem and build',
        copy: 'The coupon applies, then you drop into onboarding.',
    },
]

// A handful of newsletter posts to show off the writing. Substack-hosted images for now.
const newsletterPosts: { title: string; url: string; image: string; author: string; date: string }[] = [
    {
        title: 'You need to find product-market fit again (sorry)',
        url: 'https://newsletter.posthog.com/p/you-need-to-find-product-market-fit',
        image: 'https://substack-post-media.s3.amazonaws.com/public/images/c7da9331-5ada-429d-9f08-9e7c07f1bb98_1200x630.png',
        author: 'Cleo Lant',
        date: 'Aug 25, 2026',
    },
    {
        title: 'Read this before deleting your AGENTS.md',
        url: 'https://newsletter.posthog.com/p/your-agentsmd-is-holding-you-back',
        image: 'https://substack-post-media.s3.amazonaws.com/public/images/305f04ed-304f-415f-900a-e027696b5ae3_2400x1260.png',
        author: 'Jina Yoon',
        date: 'Aug 31, 2026',
    },
    {
        title: 'Can software factories actually work?',
        url: 'https://newsletter.posthog.com/p/software-factories',
        image: 'https://substack-post-media.s3.amazonaws.com/public/images/5eeba4b2-705a-4ebf-a8a8-d0a9ef5535d6_2912x2096.png',
        author: 'Jina Yoon',
        date: 'Aug 11, 2026',
    },
    {
        title: '2030-shaped software',
        url: 'https://newsletter.posthog.com/p/2030-shaped-software',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/blog_9e40d54459.png',
        author: 'Ian Vanagas',
        date: 'Jul 20, 2026',
    },
]

// Horizontally scrollable post cards, mirroring the blog carousel on /research.
function NewsletterSection(): JSX.Element {
    const scrollerRef = useRef<HTMLDivElement>(null)
    const [canScroll, setCanScroll] = useState({ left: false, right: true })

    const updateArrows = () => {
        const el = scrollerRef.current
        if (!el) return
        setCanScroll({
            left: el.scrollLeft > 8,
            right: el.scrollLeft < el.scrollWidth - el.clientWidth - 8,
        })
    }

    const scrollByCards = (direction: 1 | -1) => {
        const el = scrollerRef.current
        if (!el) return
        el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
    }

    return (
        <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8">
            <h2 className="mb-2">If you're subscribed to Lenny, welcome to Build Mode</h2>
            <p className="mb-6 max-w-3xl">
                With 80,000+ readers, we focus on weekly posts with tools, tactics, and taste for product builders
            </p>
            <div className="relative mb-6 not-prose">
                <div
                    ref={scrollerRef}
                    onScroll={updateArrows}
                    className="flex gap-4 snap-x overflow-x-auto py-3 -my-3 px-0.5 -mx-0.5"
                >
                    {newsletterPosts.map((post) => (
                        <div key={post.url} className="w-72 @2xl:w-80 shrink-0 snap-start">
                            <Link
                                to={post.url}
                                externalNoIcon
                                className="group h-full border border-primary rounded bg-accent overflow-hidden flex flex-col no-underline text-primary hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
                            >
                                <div className="relative aspect-video shrink-0 bg-primary overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-base font-bold m-0 mb-2 leading-snug group-hover:underline line-clamp-3">
                                        {post.title}
                                    </h3>
                                    <div className="mt-auto flex items-center gap-2 text-sm text-secondary">
                                        <span className="truncate">{post.author}</span>
                                        <span className="ml-auto shrink-0">{post.date}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => scrollByCards(-1)}
                    aria-label="Scroll to previous posts"
                    className={`hidden @md:flex items-center justify-center absolute -left-2 @xl:-left-4 top-1/2 -translate-y-1/2 size-9 rounded-full border border-primary bg-primary shadow-md text-primary transition-opacity duration-150 hover:bg-accent ${
                        canScroll.left ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <IconChevronLeft className="size-5" />
                </button>
                <button
                    type="button"
                    onClick={() => scrollByCards(1)}
                    aria-label="Scroll to next posts"
                    className={`hidden @md:flex items-center justify-center absolute -right-2 @xl:-right-4 top-1/2 -translate-y-1/2 size-9 rounded-full border border-primary bg-primary shadow-md text-primary transition-opacity duration-150 hover:bg-accent ${
                        canScroll.right ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <IconChevronRight className="size-5" />
                </button>
            </div>
            <OSButton
                asLink
                to="https://newsletter.posthog.com"
                external
                size="md"
                iconPosition="right"
                className="text-red dark:text-yellow"
            >
                Subscribe free
            </OSButton>
        </div>
    )
}

const faqItems = [
    {
        trigger: 'Where do I get my code?',
        content: (
            <p>
                From Lenny. We hand codes to Lenny's team, who assign them to Product Pass holders — so grab yours from{' '}
                <Link to={productPassUrl} externalNoIcon className="underline font-semibold">
                    Lenny's Product Pass
                </Link>
                , not from us.
            </p>
        ),
    },
    {
        trigger: 'Do I need a PostHog account?',
        content: (
            <p>
                Yes. Log in and you'll land straight on the claim page, or create an account and you'll be redirected
                there once you're verified. Onboarding picks up right after.
            </p>
        ),
    },
    {
        trigger: 'Who is eligible?',
        content: (
            <p>
                Active annual subscribers to Lenny's Newsletter with an active paid PostHog subscription and no paid
                PostHog invoices before December 1, 2025. Existing PostHog users count too, as long as you hadn't
                started paying us before that date.
            </p>
        ),
    },
    {
        trigger: 'What counts as a "new customer"?',
        content: (
            <p>
                No paid PostHog invoices before December 1, 2025. Time spent on the free tier doesn't count against you
                — plenty of people run on free for a long while before they ever pay us.
            </p>
        ),
    },
    {
        trigger: 'What happens after the 12 months?',
        content: (
            <p>
                The special plans and features run for 12 months from the day you redeem, then we switch you back to the
                default paid plans. Nothing you built goes away.
            </p>
        ),
    },
    {
        trigger: 'I already use PostHog. Can I still claim it?',
        content: (
            <p>
                It depends on whether you've ever paid us. If you have no paid invoices before December 1, 2025, you're
                eligible — even if you've been on the free tier for years. If you were already paying us before that
                date, this one isn't for you.
            </p>
        ),
    },
]

const faqStructuredData = [
    {
        question: "Where do I get my PostHog code for Lenny's Product Pass?",
        answer: "PostHog issues codes to Lenny's team, who assign them to Product Pass holders. Get your code from Lenny's Product Pass rather than from PostHog directly.",
    },
    {
        question: 'Do I need a PostHog account before claiming the Lenny offer?',
        answer: "Yes, and the claim link handles it either way — log in and you land on the claim page, or create an account and you're redirected there after verification, then continue into onboarding.",
    },
    {
        question: "Who is eligible for the PostHog offer in Lenny's Product Pass?",
        answer: "Active annual subscribers to Lenny's Newsletter with an active paid PostHog subscription and no paid PostHog invoices before December 1, 2025. Existing PostHog users qualify too, as long as they hadn't started paying before that date.",
    },
    {
        question: 'What happens after the 12 months of free PostHog Scale?',
        answer: 'The special plans and features are available for 12 months from the date you redeem your coupon. After that, you switch back to the default paid plans.',
    },
    {
        question: 'What counts as a new PostHog customer?',
        answer: "No paid PostHog invoices before December 1, 2025. Free tier usage doesn't disqualify you.",
    },
]

export default function LennyProductPass(): JSX.Element {
    return (
        <>
            <SEO
                title="PostHog for Lenny's Newsletter | Free Scale + 2x limits for a year"
                description="Exclusive for Lenny's Newsletter annual subscribers: get PostHog Scale free and double the free tier on every product for 12 months. A $16,500 value, if you haven't paid PostHog before December 1, 2025."
                image="/images/og/lenny.png"
                structuredData={buildProductStructuredData({
                    name: "PostHog for Lenny's Newsletter",
                    description:
                        "Free PostHog Scale for 12 months and double the free tier on every product, exclusively for annual subscribers to Lenny's Newsletter.",
                    slug: 'lenny',
                    faq: faqStructuredData,
                })}
            />
            <ReaderView
                proseSize="lg"
                hideLeftSidebar
                showQuestions={false}
                title="lenny.md"
                hideTitle
                className="overflow-x-hidden"
            >
                <div className="@container h-full">
                    {/* Hero – warm campfire gradient rather than a solid block, so it sits in our light palette. */}
                    <div className="relative w-full overflow-hidden border-b border-primary bg-gradient-to-br from-yellow/10 via-orange/15 to-burnt-orange/20">
                        <div className="relative max-w-6xl px-4 @3xl:px-8 py-10 @3xl:py-14">
                            <img
                                src={CAMPFIRE_HOG}
                                alt="A PostHog hedgehog toasting marshmallows at Lenny's campfire"
                                className="hidden @2xl:block absolute right-4 bottom-0 w-64 max-w-[30%]"
                            />
                            <div className="@2xl:max-w-[64%]">
                                <div className="flex items-center flex-wrap gap-3 mb-6">
                                    <Logo layout="logomark" className="h-8 w-auto" />
                                    <IconX className="size-6 text-primary opacity-40" />
                                    <img
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/lenny_ca568a9fda.png"
                                        alt="Lenny's Newsletter"
                                        className="h-7 w-auto dark:invert"
                                    />
                                </div>
                                <h1 className="text-3xl @md:text-4xl mb-3">
                                    A year of PostHog, <Highlight>on Lenny</Highlight>
                                </h1>
                                <p className="mb-4 max-w-2xl">
                                    Annual subscribers to Lenny's Newsletter get{' '}
                                    <strong>PostHog Scale free for 12 months</strong> and{' '}
                                    <strong>double the free tier</strong> on every product. This is a $16,500 value, and
                                    the first deal like it we've ever done.
                                </p>
                                <OSButton asLink to={claimUrl} variant="primary" size="md" external>
                                    Claim your offer
                                </OSButton>
                                <p className="italic text-sm mt-2 mb-0 text-secondary">
                                    Your unique code comes from{' '}
                                    <Link to={productPassUrl} externalNoIcon className="font-semibold">
                                        Lenny's Product Pass
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What you'd actually use it for – four jobs, as sticky notes. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <h2 className="mb-2">Every tool a product leader needs, in one place</h2>
                        <p className="mb-6 max-w-3xl">See how it all connects, then decide what's next.</p>
                        <div className="not-prose grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-4 gap-4 @3xl:gap-6">
                            {jobs.map(({ bg, rotate, title, copy, tools }) => (
                                <div key={title} className={`${bg} ${rotate} p-4 text-black`}>
                                    <h3 className="text-base my-1 leading-tight">{title}</h3>
                                    <p className="text-sm mb-3">{copy}</p>
                                    <ul className="list-none p-0 m-0 space-y-1.5">
                                        {tools.map(({ Icon, name, slug }) => (
                                            <li key={name} className="flex items-center gap-1.5">
                                                <Icon className="size-4 shrink-0 text-black/70" />
                                                <Link
                                                    to={`/${slug}`}
                                                    state={{ newWindow: true }}
                                                    className="text-sm font-semibold text-black no-underline hover:underline"
                                                >
                                                    {name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What PostHog is, in our own words – lifted from /about. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl pt-2">
                        <h2 className="mb-2">
                            We're here to help make your product <Highlight>self-driving</Highlight>
                        </h2>
                        <p className="mb-3 max-w-3xl">
                            PostHog instruments your codebase, then combines that context with product data like
                            analytics events, errors, and recordings to understand problems and propose fixes.
                        </p>
                        <div className="not-prose grid @2xl:grid-cols-2 gap-4">
                            {selfDrivingCapabilities.map(({ Icon, color, title, copy }) => (
                                <div key={title} className="border border-primary rounded-md p-4 bg-primary">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon className={`size-5 shrink-0 ${color}`} />
                                        <p className="m-0 font-bold text-primary">{title}</p>
                                    </div>
                                    <p className="m-0 text-base text-secondary">{copy}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 mb-3 max-w-3xl text-base">
                            All of it reaches you in{' '}
                            <Link to="/slack" state={{ newWindow: true }} className="font-semibold underline">
                                Slack
                            </Link>{' '}
                            as well, so you can read a report and ship the fix without opening a tab.
                        </p>
                        <p className="mt-0 mb-0">
                            <Link
                                to="/self-driving"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-1.5 font-semibold text-red dark:text-yellow text-sm"
                            >
                                See how self-driving works
                                <IconArrowRight className="size-3" />
                            </Link>
                        </p>
                    </div>

                    {/* How to claim it – campfire-tinted panel so Lenny's branding shows up mid-page. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <div className="relative overflow-hidden rounded-md border border-primary bg-gradient-to-br from-yellow/10 via-orange/10 to-burnt-orange/15 p-6 @3xl:p-8">
                            <img
                                src={LENNY_FIRE}
                                alt=""
                                className="hidden @2xl:block absolute -right-6 -bottom-8 w-44 opacity-20 pointer-events-none"
                            />
                            <div className="relative">
                                <h2 className="mb-2 mt-0">
                                    How to claim it, <Highlight>around the campfire</Highlight>
                                </h2>
                                <p className="mb-6 max-w-3xl">
                                    Three steps, and then you're off to the races with your Lenny pass for PostHog.
                                </p>
                                <div className="not-prose grid grid-cols-1 @2xl:grid-cols-3 gap-4">
                                    {claimSteps.map(({ title, copy }, index) => (
                                        <div key={title} className="border border-primary rounded-md bg-primary p-4">
                                            <span className="inline-flex items-center justify-center size-8 rounded-full bg-highlight text-red dark:text-yellow font-bold">
                                                {index + 1}
                                            </span>
                                            <p className="m-0 mt-3 font-bold text-primary">{title}</p>
                                            <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6 mb-2 font-bold text-primary">What Scale adds</p>
                                <ul className="max-w-3xl mt-0 mb-0">
                                    <li>Unlimited projects, and white labeling</li>
                                    <li>SSO enforcement, SAML, and a HIPAA BAA</li>
                                    <li>Priority support, and more to scale your organization</li>
                                </ul>
                                <p className="mt-6 mb-2 font-bold text-primary">
                                    Who is eligible to redeem this Product Pass from Lenny
                                </p>
                                <ul className="max-w-3xl mt-0 mb-0">
                                    <li>
                                        You're an active annual subscriber to{' '}
                                        <Link
                                            to="https://www.lennysnewsletter.com/p/start-here"
                                            externalNoIcon
                                            className="font-semibold underline"
                                        >
                                            Lenny's Newsletter
                                        </Link>
                                    </li>
                                    <li>
                                        You have no paid PostHog invoices before December 1, 2025 — years on the free
                                        tier don't count against you
                                    </li>
                                    <li>You have an active paid PostHog subscription</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Our newsletter – a scrollable post carousel, matching the blog section on /research. */}
                    <NewsletterSection />

                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-4">
                        <h2 className="mb-4">FAQs</h2>
                        <Accordion data-scheme="primary" className="" defaultValue="" items={faqItems} />
                    </div>

                    {/* Closing CTA – the boxed "paper desk" panel, same treatment as the /pricing hero. */}
                    <div className="@container not-prose m-4 @3xl:m-8 max-w-6xl mb-8 @3xl:mb-12">
                        <div className="paper-desk border border-primary rounded-lg overflow-hidden relative">
                            <div className="relative z-10 flex flex-col-reverse @2xl:flex-row @2xl:items-center gap-6 @2xl:gap-8 p-6 @2xl:p-8 @4xl:p-10">
                                <div className="flex-1">
                                    <h2 className="text-2xl @lg:text-3xl @2xl:text-4xl font-bold tracking-tight leading-[1.1] text-balance mb-4 @2xl:mb-5 mt-0">
                                        Go build something.{' '}
                                        <span className="bg-green/25 text-green-dark dark:text-lime-green rounded-sm px-1.5 box-decoration-clone">
                                            The first year's on Lenny.
                                        </span>
                                    </h2>
                                    <p className="text-[15px] @lg:text-base max-w-xl mb-5">
                                        Free Scale for 12 months and double the free tier on every product — a $16,500
                                        value, and the first deal like it we've ever done. Yours as an annual subscriber
                                        to Lenny's Newsletter.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                        <OSButton asLink to={claimUrl} variant="primary" size="lg" external>
                                            Claim your offer
                                        </OSButton>
                                        <span className="text-sm text-secondary">
                                            Code from{' '}
                                            <Link
                                                to={productPassUrl}
                                                externalNoIcon
                                                className="font-semibold underline"
                                            >
                                                Lenny's Product Pass
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                                <div className="shrink-0 self-center w-56 @2xl:w-64 @4xl:w-80">
                                    <img
                                        src={HOGZILLA}
                                        alt="Hogzilla tearing through town in a convertible"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
