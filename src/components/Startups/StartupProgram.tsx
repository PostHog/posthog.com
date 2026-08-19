import React from 'react'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO, { buildProductStructuredData } from 'components/seo'
import { Accordion } from 'components/RadixUI/Accordion'
import { CallToAction } from 'components/CallToAction'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import {
    IconCheck,
    IconX,
    IconStarFilled,
    IconBolt,
    IconRewindPlay,
    IconSparkles,
    IconWarning,
    IconStack,
    IconCompass,
    IconPullRequest,
    IconArrowRight,
    IconGraph,
    IconPieChart,
    IconToggle,
    IconFlask,
    IconLlmAnalytics,
    IconDatabase,
    IconMessage,
    IconPlug,
    IconCursorClick,
} from '@posthog/icons'
import OSTable from 'components/OSTable'
import YCombinatorLight from '../../images/customers/ycombinator-light.svg'
import StripeLogo from '../../images/stripe.svg'
import Logo1984 from '../../images/1984.svg'
import ODFLogo from '../../images/odf.svg'
import { Logo } from '@posthog/brand/logo'
import { HedgehogHahaBizzniss, HedgehogTransformer } from '@posthog/brand/hoggies'
import AxisLogo from '../../images/axis-logo.svg'
import CategoryLogo from '../../images/category.svg'

type IconComponent = React.ComponentType<{ className?: string }>

// Same emphasis treatment as the /slack page's section headings.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

// Partner configurations. `title` is the co-brand lockup shown beside the PostHog logo.
// Logos are white/light variants, so the lockup always renders inside a dark chip.
const partnerConfigs = [
    {
        slug: 'stripe',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1" />
                <img src={StripeLogo} alt="Stripe" className="inline-block h-9 relative top-[.2rem]" />
            </>
        ),
        value: '$50,000',
    },
    {
        slug: 'stripe-atlas',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1" />
                <img src={StripeLogo} alt="Stripe" className="inline-block h-9 relative top-[.2rem]" />
                <span>Atlas</span>
            </>
        ),
        value: '$50,000',
    },
    {
        slug: 'axi',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1 pb-2" />
                <img src={AxisLogo} alt="Axis" className="inline-block h-9 relative top-[.2rem] pb-2" />
            </>
        ),
        value: '$50,000',
    },
    {
        slug: 'category',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1 pb-2" />
                <img src={CategoryLogo} alt="Category" className="inline-block h-9 relative top-[.2rem] pb-2" />
            </>
        ),
        value: '$50,000',
    },
    {
        slug: 'incident-io',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1" />
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/wordmark_colour_light_7d9d5205c6.svg"
                    alt="Incident.io"
                    className="inline-block h-9 relative top-[-7px]"
                />
            </>
        ),
        value: '$50,000',
    },
    {
        slug: '1984',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1" />
                <img src={Logo1984} alt="1984" className="inline-block h-9 relative top-[.2rem]" />
            </>
        ),
        value: '$50,000',
    },
    {
        slug: 'odf',
        title: (
            <>
                <IconX className="size-8 text-white inline-block relative top-1" />
                <img src={ODFLogo} alt="ODF" className="inline-block h-9 relative top-[.2rem]" />
            </>
        ),
        value: '$50,000',
    },
]

// The perks. Cards render in a bordered grid below the hero.
const perks: { image: string; alt: string; title: string; copy: string }[] = [
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/perk_credits_a8487ef646.png',
        alt: '$50,000 of PostHog',
        title: '$50,000 of PostHog',
        copy: "That's a lot of events, replays, API calls, and survey responses.",
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/perk_merch_b2106b276a.png',
        alt: 'Exclusive PostHog founder merch and swag',
        title: '$1,000 of founder swag',
        copy: 'You can never have too many laptop stickers or free PostHog t-shirts.',
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/startup_perk_2_f6a6b9d058.png',
        alt: '$1,500 off Incident.io',
        title: '$1,500 off Incident.io',
        copy: 'Incidents happen. Get $1,500 off a teams plan when they do.',
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/startups_sdks_25358b1af4.png',
        alt: '50% off Speakeasy',
        title: '50% off with Speakeasy',
        copy: 'Build MCPs & skills with Speakeasy and get 50% off for 6 months.',
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/startups_search_3ecaae1574.png',
        alt: '$5,000 of Chroma credit',
        title: '$5,000 of Chroma credit',
        copy: "Chroma's search infra for AI is fast, serverless, and scalable.",
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/598171862_7fff97b6_15e5_4ff8_8f7c_46148f81efa1_515ee89918.png',
        alt: '$5,000 of Depot credit',
        title: '$5,000 of Depot credit',
        copy: 'Blazing-fast container builds and remote caching, trusted by us.',
    },
]

// The four things a self-driving product does for you, straight from the pitch.
const selfDrivingCapabilities: { Icon: IconComponent; color: string; title: string; copy: React.ReactNode }[] = [
    {
        Icon: IconStack,
        color: 'text-blue',
        title: 'Centralize your context',
        copy: 'Query third-party sources and your product data together in one warehouse – no more copy-pasting into a chat window.',
    },
    {
        Icon: IconCompass,
        color: 'text-purple',
        title: 'Deploy an army of AI scouts',
        copy: 'Scouts watch your product around the clock and deliver triaged reports to your PostHog inbox, so you can one-click fix.',
    },
    {
        Icon: IconSparkles,
        color: 'text-red dark:text-yellow',
        title: 'Chat with the best AI agent',
        copy: 'Figure out what users are actually doing, with context across your product, support, billing, and CRM.',
    },
    {
        Icon: IconPullRequest,
        color: 'text-green',
        title: 'Ship fixes collaboratively',
        copy: "The PostHog Slack agent drafts pull requests for you while you're still sharing memes.",
    },
]

// "How far does $50,000 go?" – concrete value, straight from the pitch.
const creditBreakdown: { Icon: IconComponent; color: string; amount: string; unit: string }[] = [
    { Icon: IconBolt, color: 'text-yellow', amount: '950 million', unit: 'events (yes, nearly a billion)' },
    { Icon: IconRewindPlay, color: 'text-orange', amount: '6 million+', unit: 'session recordings' },
    { Icon: IconSparkles, color: 'text-purple', amount: '840 million+', unit: 'LLM analytics events' },
    { Icon: IconWarning, color: 'text-red', amount: '396 million', unit: 'error tracking events' },
]

// The full toolkit. Each box uses the product's canonical site icon/color (from src/hooks/productData).
// The comparison post is linked from just the competitor name (`linkText`), not the whole box.
const toolkit: {
    Icon: IconComponent
    color: string
    product: string
    prefix?: string
    linkText: string
    href?: string
}[] = [
    { Icon: IconGraph, color: 'text-blue', product: 'Product analytics', prefix: 'like ', linkText: 'Amplitude', href: '/blog/posthog-vs-amplitude' }, // prettier-ignore
    { Icon: IconPieChart, color: 'text-green-2', product: 'Web analytics', prefix: 'like ', linkText: 'Google Analytics', href: '/blog/posthog-vs-ga4' }, // prettier-ignore
    { Icon: IconRewindPlay, color: 'text-yellow', product: 'Session replay', prefix: 'like ', linkText: 'FullStory', href: '/blog/posthog-vs-fullstory' }, // prettier-ignore
    { Icon: IconToggle, color: 'text-seagreen', product: 'Feature flags', prefix: 'like ', linkText: 'LaunchDarkly', href: '/blog/posthog-vs-launchdarkly' }, // prettier-ignore
    { Icon: IconFlask, color: 'text-purple', product: 'Experiments', prefix: 'like ', linkText: 'Optimizely', href: '/blog/posthog-vs-optimizely' }, // prettier-ignore
    { Icon: IconWarning, color: 'text-orange', product: 'Error tracking', prefix: 'like ', linkText: 'Sentry', href: '/blog/posthog-vs-sentry' }, // prettier-ignore
    { Icon: IconLlmAnalytics, color: 'text-purple', product: 'AI observability', prefix: 'like ', linkText: 'Langfuse', href: '/blog/best-langfuse-alternatives' }, // prettier-ignore
    { Icon: IconDatabase, color: 'text-purple', product: 'Context warehouse', prefix: '', linkText: "What's that?", href: '/context-warehouse' }, // prettier-ignore
    { Icon: IconMessage, color: 'text-salmon', product: 'Surveys', prefix: 'like ', linkText: 'Sprig', href: '/blog/best-sprig-alternatives' }, // prettier-ignore
    { Icon: IconCursorClick, color: 'text-red', product: 'Heatmaps', prefix: 'like ', linkText: 'Hotjar', href: '/blog/posthog-vs-hotjar' }, // prettier-ignore
    { Icon: IconPlug, color: 'text-sky-blue', product: 'CDP', prefix: 'like ', linkText: 'Segment', href: '/blog/best-customer-data-platforms-for-developers' }, // prettier-ignore
    { Icon: IconStack, color: 'text-red dark:text-yellow', product: 'And loads more', prefix: '', linkText: 'Install them all with one command', href: '/wizard' }, // prettier-ignore
]

// Visible FAQ (JSX, with links). The plain-text version below feeds FAQPage structured data.
const faqItems = [
    {
        trigger: 'What is a self-driving product?',
        content: (
            <p>
                A product that improves itself without waiting to be prompted. PostHog watches how people use your
                product, finds what's worth fixing, writes the code, and opens a pull request – all you do is hit merge.{' '}
                <Link to="/self-driving" state={{ newWindow: true }} className="underline font-semibold">
                    Learn more about self-driving
                </Link>
                .
            </p>
        ),
    },
    {
        trigger: 'Can I use my credits on all PostHog products?',
        content: (
            <p>
                Almost all of them. From September 14, 2026, startup credits can no longer be used towards bills
                incurred on AI tools such as PostHog Desktop, Replay Vision, PostHog AI, and Inbox. This is due to the
                prohibitive and unpredictable nature of token-based pricing. Credits still cover everything else,
                including AI observability and the context warehouse.
            </p>
        ),
    },
    {
        trigger: 'Can I use credits to claim a BAA under the Boost plan?',
        content: (
            <p>
                Credits cannot be used to claim a BAA under the Boost plan due to legal risk. If you’d like to claim a
                BAA, you can instead{' '}
                <Link to="/talk-to-a-human" state={{ newWindow: true }} className="underline font-semibold">
                    contact us to discuss options
                </Link>
                . Credits can be used towards other aspects of the Boost package.
            </p>
        ),
    },
    {
        trigger: 'Why can I not use my credits on AI features?',
        content: (
            <p>
                From September 14, 2026, startup credits can no longer be used towards bills incurred on AI tools such
                as PostHog Desktop, Replay Vision, PostHog AI, and Inbox. Token-based pricing makes the cost of these
                tools prohibitive and unpredictable, which makes them harder for us to subsidize. If you joined PostHog
                for Startups before September 14, 2026, usage before this cut-off can still be paid with credits.
            </p>
        ),
    },
    {
        trigger: 'How do I apply?',
        content: (
            <p>
                Just sign up to a paid plan in PostHog (you're only charged for usage) and then fill in this{' '}
                <Link to="https://app.posthog.com/startups" external className="underline font-semibold">
                    form
                </Link>
                . Apply from a PostHog account that uses your company email address. We will apply the credit
                automatically if you're eligible. If you're accepted into the startups program, we will notify you by
                email.
            </p>
        ),
    },
    {
        trigger: "Who's eligible?",
        content: (
            <p>
                Your company needs to be less than 2 years old and have raised less than $5m funding. You need to have
                signed up any time from Jan 1st 2023 onwards, and your PostHog account needs to use your company's email
                domain. Applications from personal email addresses, like gmail.com or outlook.com, are not accepted.
            </p>
        ),
    },
    {
        trigger: "What if we don't have a company email domain yet?",
        content: (
            <p>
                You need one to apply, but you don't need credits to start. Every PostHog product has a{' '}
                <Link to="/pricing" state={{ newWindow: true }} className="underline font-semibold">
                    monthly free allowance
                </Link>
                , so you can build on PostHog for free and apply for the program once you have a company domain.
            </p>
        ),
    },
    {
        trigger: 'I signed up before this deal launched, can I still get it?',
        content: (
            <p>
                Yes, but only if you signed up after Jan 1st 2023. If your startup meets the eligibility criteria but
                you signed up to PostHog before Jan 1st, we won't apply the credits but are still happy to enroll you in
                the rest of the program.
            </p>
        ),
    },
    {
        trigger: 'I use another tool, like Amplitude or Pendo. Can I migrate that data to PostHog?',
        content: (
            <p>
                Yes, you can migrate your data from another tool to PostHog using our{' '}
                <Link to="/docs/migrate" state={{ newWindow: true }} className="underline font-semibold">
                    migration guides
                </Link>
                , which cover how to migrate from tools such as Amplitude, Pendo, Plausible, Mixpanel, Heap,
                LaunchDarkly, Google Analytics, and more.
            </p>
        ),
    },
    {
        trigger: 'Do you offer onboarding help, to make sure I get everything set up correctly?',
        content: (
            <p>
                Yes. By joining the startup program, you'll already get access to our startup newsletter full of tips
                and tricks for getting the most out of PostHog, as well as invites to our exclusive events. If you need
                more help, you can{' '}
                <Link
                    to="/merch?product=30-min-onboarding-consultation"
                    state={{ newWindow: true }}
                    className="underline font-semibold"
                >
                    purchase a 30-minute onboarding call with our team
                </Link>
                , or explore{' '}
                <Link to="/services" state={{ newWindow: true }} className="underline font-semibold">
                    custom service packages
                </Link>
                . Please note that PostHog credit can not be used towards these services.
            </p>
        ),
    },
    {
        trigger: "Can I get this deal if I'm part of YC?",
        content: (
            <p>
                We have a separate deal for YC folks –{' '}
                <Link to="https://bookface.ycombinator.com/deals/687" external className="underline font-semibold">
                    check out Bookface
                </Link>
                . No, they don't stack!
            </p>
        ),
    },
    {
        trigger: 'What if I go over the $50k limit?',
        content: (
            <p>
                At that point you can move onto{' '}
                <Link to="/pricing" className="underline font-semibold" state={{ newWindow: true }}>
                    another PostHog plan
                </Link>
                .
            </p>
        ),
    },
    {
        trigger: 'What happens at the end of the 12 months?',
        content: (
            <p>
                At that point you can move onto{' '}
                <Link to="/pricing" state={{ newWindow: true }} className="underline font-semibold">
                    another PostHog plan
                </Link>
                . You'll continue to be considered part of the startup program in terms of invites to office hour
                events, and other perks.
            </p>
        ),
    },
    {
        trigger: 'How do I get the Incident.io/Speakeasy/Chroma/Depot discount?',
        content: (
            <p>
                Once you're accepted into the PostHog for Startups program, we'll email you with details on how to get
                the partner benefits.
            </p>
        ),
    },
    {
        trigger: 'What level of customer support do I get?',
        content: (
            <p>
                PostHog is run by a small team and, as such, we're only able to offer support to paying customers.
                Organizations which are part of our startup plan are therefore not eligible for high priority customer
                support, and only qualify for normal priority and community support. This is still the case even if you
                apply your credits towards a platform package.
            </p>
        ),
    },
]

// Plain-text FAQ for schema.org FAQPage (buildProductStructuredData skips entries without an answer).
const faqStructuredData = [
    {
        question: 'What is a self-driving product?',
        answer: 'A product that improves itself without waiting to be prompted. PostHog watches how people use your product, finds what is worth fixing, writes the code, and opens a pull request – all you do is hit merge.',
    },
    {
        question: 'Can I use my PostHog for Startups credits on all PostHog products?',
        answer: 'Almost all of them. From September 14, 2026, startup credits can no longer be used towards bills incurred on AI tools such as PostHog Desktop, Replay Vision, PostHog AI, and Inbox, due to the prohibitive and unpredictable nature of token-based pricing. Credits still cover everything else, including AI observability and the context warehouse.',
    },
    {
        question: 'How do I apply to PostHog for Startups?',
        answer: 'Sign up to a paid plan in PostHog (you are only charged for usage) and complete the startups application form from an account that uses your company email address. We apply the credit automatically if you are eligible and notify you by email once accepted.',
    },
    {
        question: 'Who is eligible for PostHog for Startups?',
        answer: 'Your company needs to be less than 2 years old and have raised less than $5m in funding, you need to have signed up any time from Jan 1st 2023 onwards, and your PostHog account needs to use your company email domain. Applications from personal email addresses, like gmail.com or outlook.com, are not accepted.',
    },
    {
        question: 'What if my startup does not have a company email domain yet?',
        answer: 'You need a company email domain to apply, but you do not need credits to start. Every PostHog product has a monthly free allowance, so you can build on PostHog for free and apply for the program once you have a company domain.',
    },
    {
        question: 'How far does $50,000 in PostHog credits go?',
        answer: 'A long way. It covers roughly 950 million events, more than 6 million session recordings, over 840 million LLM analytics events, or 396 million error tracking events. Credits cannot be used towards AI tools such as PostHog Desktop, Replay Vision, PostHog AI, and Inbox.',
    },
]

interface StartupProgramProps {
    /** Partner slug (e.g. "stripe", "yc") for co-branded variants. Null on the canonical /startups page. */
    partnerSlug?: string | null
}

export default function StartupProgram({ partnerSlug = null }: StartupProgramProps): JSX.Element {
    const partnerConfig = partnerSlug ? partnerConfigs.find((config) => config.slug === partnerSlug) : null
    const creditValue = partnerConfig ? partnerConfig.value : '$50,000'
    const applyUrl = `https://app.posthog.com/startups${partnerSlug ? `/${partnerSlug}` : ''}`

    const heroBullets = [
        `${creditValue} in PostHog credits for 12 months`,
        '$12,000 in benefits from partners we like',
        '$1,000 of exclusive PostHog merch',
    ]

    return (
        <>
            <SEO
                title="PostHog for Startups | $50K in credits for early-stage teams"
                description="Get over $50,000 in PostHog credits for analytics, session replay, feature flags, and more, while you build a self-driving product. Plus merch and partner perks. Apply in 2 minutes."
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog for Startups',
                    description:
                        'Over $50,000 in PostHog credits, plus exclusive merch and partner perks for early-stage teams building self-driving products.',
                    slug: 'startups',
                    faq: faqStructuredData,
                })}
            />
            <ReaderView hideLeftSidebar showQuestions={false} title="startups.md" hideTitle>
                {/* Centered column, same as /slack – the reader renders this page full-width otherwise */}
                <div className="max-w-4xl mx-auto">
                    <section className="not-prose w-full tracking-[-0.0125em]">
                        {/* Partner variants show the "PostHog X Partner" co-brand lockup in a dark chip,
                            since the partner logo assets are white/light variants. */}
                        {partnerConfig ? (
                            <div className="inline-flex items-center gap-2.5 rounded-md bg-dark px-4 py-2.5 mb-4">
                                <Logo
                                    layout="logomark"
                                    variant="mono"
                                    className="h-8 w-auto relative -top-px"
                                    color="white"
                                />
                                <span className="text-white font-bold inline-flex items-center gap-2.5">
                                    {partnerConfig.title}
                                </span>
                            </div>
                        ) : (
                            <p className="!m-0 mb-2 text-sm font-bold text-secondary">PostHog for startups</p>
                        )}
                        {/* show is set explicitly because the scroll trigger's -15% rootMargin never
                            fires for a heading this close to the top of the pane. */}
                        <h1 className="!mt-0 mb-4 text-xl font-bold leading-tight @xl/reader-content:mb-8 @xl/reader-content:text-3xl">
                            {creditValue} in credits while you build a{' '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(48, 164, 108, 0.2)"
                                strokeWidth={1}
                                padding={2}
                                delay={300}
                                show
                            >
                                self-driving product
                            </RoughAnnotation>
                        </h1>

                        {/* Text takes the flexible column; the illustration gets a fixed slot */}
                        <div className="flex flex-col items-start gap-6 @2xl/reader-content:flex-row @2xl/reader-content:gap-8">
                            <div className="min-w-0 @2xl/reader-content:flex-1 max-w-2xl">
                                <p className="mt-0 mb-4">
                                    PostHog finds what's worth fixing, writes the code, and opens the pull request. You
                                    get credits for the whole platform – plus swag and partner perks perfect for anyone
                                    building AI products.
                                </p>
                                <ul className="mb-4 list-none space-y-0.5 p-0 text-[15px]">
                                    {heroBullets.map((item) => (
                                        <li key={item} className="relative pl-5">
                                            <IconCheck className="absolute left-0 top-1 size-4 text-green" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap items-center gap-3">
                                    <CallToAction to={applyUrl} size="sm" externalNoIcon>
                                        Apply now
                                    </CallToAction>
                                    <span className="text-sm text-secondary italic">
                                        You'll need a{' '}
                                        <Link to="https://app.posthog.com/signup" external>
                                            PostHog account
                                        </Link>{' '}
                                        first
                                    </span>
                                </div>
                            </div>

                            <div className="w-full flex justify-center self-center @2xl/reader-content:w-auto @2xl/reader-content:flex-[0_0_240px] @4xl/reader-content:flex-[0_0_300px]">
                                <HedgehogTransformer
                                    title="A hedgehog mid-transformation into a robot, like your product about to become self-driving"
                                    className="w-full max-w-[280px] @2xl/reader-content:max-w-none"
                                />
                            </div>
                        </div>
                    </section>
                    <hr className="border-t border-primary m-0 mb-6 mt-8" />

                    <h3>
                        What you'll <Highlight>actually</Highlight> get
                    </h3>
                    <p>
                        Credits are the headline, but the program comes with perks from partners we use ourselves.
                        Here's the full haul:
                    </p>
                    <div className="not-prose grid grid-cols-2 @md/reader-content:grid-cols-3 @2xl/reader-content:grid-cols-6 gap-2 my-6">
                        {perks.map(({ image, alt, title, copy }) => (
                            <div key={title} className="border border-primary rounded-md p-2 bg-primary">
                                <CloudinaryImage src={image} alt={alt} imgClassName="w-full rounded-sm" />
                                <h4 className="m-0 mt-2 text-sm font-bold leading-tight">
                                    {title === '$50,000 of PostHog' ? `${creditValue} of PostHog` : title}
                                </h4>
                                <p className="m-0 mt-1 text-xs text-secondary">{copy}</p>
                            </div>
                        ))}
                    </div>

                    <h3>
                        Build a <Highlight>self-driving product</Highlight> with PostHog
                    </h3>
                    <p>
                        Building products used to mean manually writing code, running analysis, diagnosing bugs, and
                        rolling out changes across a bloated stack of tools. PostHog is the only platform that does it
                        all for you autonomously while still keeping everything at your fingertips.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-x-8 gap-y-6 my-6">
                        {selfDrivingCapabilities.map(({ Icon, color, title, copy }) => (
                            <div key={title} className="flex items-start gap-3">
                                <Icon className={`size-6 shrink-0 mt-0.5 ${color}`} />
                                <div>
                                    <p className="m-0 text-base font-bold text-primary">{title}</p>
                                    <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p>
                        <Link
                            to="/self-driving"
                            state={{ newWindow: true }}
                            className="inline-flex items-center gap-1.5 font-semibold text-red dark:text-yellow"
                        >
                            See how self-driving works
                            <IconArrowRight className="size-4" />
                        </Link>
                    </p>

                    <h3>
                        How far does <Highlight>{creditValue}</Highlight> go?
                    </h3>
                    <p>
                        A <em>very</em> long way. Here's what your credits are worth if you spent them all in one place,
                        but you can mix and match them across most PostHog products. The exceptions are AI tools such as
                        PostHog Desktop, Replay Vision, PostHog AI, and Inbox, which credits can't be used for.
                        Otherwise we're not fussy. We just want you to spend the money.
                    </p>
                    <div className="not-prose grid grid-cols-2 @2xl/reader-content:grid-cols-4 gap-4 my-6">
                        {creditBreakdown.map(({ Icon, color, amount, unit }) => (
                            <div key={unit} className="border border-primary rounded-md bg-primary p-4">
                                <Icon className={`size-6 ${color}`} />
                                <p className="m-0 mt-2 text-2xl font-bold text-primary">{amount}</p>
                                <p className="m-0 mt-0.5 text-sm text-secondary">{unit}</p>
                            </div>
                        ))}
                    </div>

                    <h3>
                        Everything you (and our agents) <Highlight>can use</Highlight>
                    </h3>
                    <p>
                        PostHog has over a dozen tools you can use however you want. Use any and all of them in our app,
                        via MCP, or in Slack.
                    </p>
                    <div className="not-prose grid grid-cols-2 @2xl/reader-content:grid-cols-3 gap-3 my-6">
                        {toolkit.map(({ Icon, color, product, prefix, linkText, href }) => (
                            <div key={product} className="border border-primary rounded-md bg-primary p-4">
                                <div className="flex items-center gap-2">
                                    <Icon className={`size-5 shrink-0 ${color}`} />
                                    <p className="m-0 font-bold text-primary">{product}</p>
                                </div>
                                {/* Only the competitor name is linked, with no colour change. */}
                                <p className="m-0 mt-1 text-sm text-secondary">
                                    {prefix}
                                    {href ? (
                                        <Link to={href} state={{ newWindow: true }} className="!text-inherit underline">
                                            {linkText}
                                        </Link>
                                    ) : (
                                        linkText
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-secondary">
                        Trusted by teams like{' '}
                        <Link to="/customers/supabase" state={{ newWindow: true }} className="!text-inherit underline">
                            Supabase
                        </Link>
                        ,{' '}
                        <Link
                            to="/customers/elevenlabs"
                            state={{ newWindow: true }}
                            className="!text-inherit underline"
                        >
                            ElevenLabs
                        </Link>
                        , and{' '}
                        <Link to="/customers/hasura" state={{ newWindow: true }} className="!text-inherit underline">
                            Hasura
                        </Link>
                        – and built for engineers, with 30k+ stars and 500+ contributors on GitHub.
                    </p>

                    <h3>
                        Take <Highlight>their</Highlight> word for it
                    </h3>
                    <div className="not-prose grid @2xl/reader-content:grid-cols-2 gap-4 my-6">
                        <div className="border border-primary rounded-md p-4 bg-primary">
                            <img src={YCombinatorLight} className="h-10" alt="Y Combinator" />
                            <p className="mt-4 mb-2 text-base">
                                "Building is never just one-and-done. You always need to find ways to improve.{' '}
                                <span className="text-red dark:text-yellow font-semibold">
                                    PostHog is central to how we do that at Y Combinator.
                                </span>{' '}
                                It helps us try ideas, measure results and make better products."
                            </p>
                            <p className="m-0 text-sm text-secondary">
                                <strong className="text-primary">Cat Li</strong> – Product & Engineering Lead, Y
                                Combinator
                            </p>
                        </div>
                        <div className="border border-primary rounded-md p-4 bg-primary">
                            {/* Dark logo, so it sits on a light chip in dark mode */}
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/concept_ventures_fa46262122.svg"
                                className="h-8 my-1 dark:bg-white dark:p-1.5 dark:rounded-sm dark:box-content"
                                alt="Concept Ventures"
                            />
                            <p className="mt-4 mb-2 text-base">
                                "Our portfolio companies rely on analytics to optimize their products.{' '}
                                <span className="text-red dark:text-yellow font-semibold">
                                    Understanding user behavior through platforms like PostHog is mission-critical.
                                </span>{' '}
                                The insights it provides are invaluable for founders."
                            </p>
                            <p className="m-0 text-sm text-secondary">
                                <strong className="text-primary">Oliver Kicks</strong> – Partner, Concept Ventures
                            </p>
                        </div>
                    </div>

                    <h3>
                        How PostHog <Highlight>stacks up</Highlight>
                    </h3>
                    <p>
                        More credits, fewer limits, and partner perks you won't find elsewhere – plus the only startup
                        program with free laptop stickers.
                    </p>
                    <div className="not-prose my-6">
                        <OSTable
                            size="sm"
                            width="full"
                            rowAlignment="top"
                            // White (bg-primary) body cells to match the toolkit grid; the highlighted
                            // final PostHog column keeps its own yellow background.
                            className="bg-primary text-sm"
                            columns={[
                                { name: '', width: 'minmax(140px, 1fr)', align: 'left' },
                                { name: 'Pendo', width: 'minmax(120px, 160px)', align: 'left' },
                                { name: 'LogRocket', width: 'minmax(120px, 160px)', align: 'left' },
                                { name: 'Amplitude', width: 'minmax(120px, 160px)', align: 'left' },
                                { name: 'Mixpanel', width: 'minmax(120px, 160px)', align: 'left' },
                                {
                                    name: (
                                        <span className="flex items-center gap-1.5">
                                            <IconStarFilled className="size-4 text-yellow" />
                                            PostHog
                                        </span>
                                    ),
                                    width: 'minmax(120px, 160px)',
                                    align: 'left',
                                    className: '!bg-[#FFF6DE] dark:!bg-yellow/20 !border-l-2 !border-l-yellow',
                                },
                            ]}
                            rows={[
                                {
                                    cells: [
                                        { content: 'Eligibility criteria', className: 'font-semibold' },
                                        { content: 'Free plan only' },
                                        { content: 'Free plan only' },
                                        {
                                            content: (
                                                <ul className="pl-0 list-none ml-0">
                                                    <li>&lt;$5m in funding</li>
                                                    <li>&lt;20 staff members</li>
                                                </ul>
                                            ),
                                        },
                                        {
                                            content: (
                                                <ul className="pl-0 list-none ml-0">
                                                    <li>&lt;$8m in funding</li>
                                                    <li>&lt;5 years old</li>
                                                </ul>
                                            ),
                                        },
                                        {
                                            content: (
                                                <ul className="pl-0 list-none ml-0">
                                                    <li>&lt;$5m in funding</li>
                                                    <li>&lt;2 years old</li>
                                                    <li>Company email domain</li>
                                                </ul>
                                            ),
                                            className: 'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
                                        },
                                    ],
                                },
                                {
                                    cells: [
                                        { content: 'Limitations', className: 'font-semibold' },
                                        { content: '500 monthly users' },
                                        { content: '1,000 monthly sessions' },
                                        { content: 'One year duration' },
                                        { content: 'One year duration' },
                                        {
                                            content: 'One year duration',
                                            className: 'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
                                        },
                                    ],
                                },
                                {
                                    cells: [
                                        { content: 'Benefits', className: 'font-semibold' },
                                        { content: 'None' },
                                        { content: 'None' },
                                        { content: '200,000 MTUs' },
                                        { content: `${creditValue} credit` },
                                        {
                                            content: (
                                                <span className="font-semibold">
                                                    {creditValue} credit + $12,000 in partner perks
                                                </span>
                                            ),
                                            className: 'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
                                        },
                                    ],
                                },
                                {
                                    cells: [
                                        { content: 'Open source product', className: 'font-semibold' },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        {
                                            content: <IconCheck className="size-6 text-green" />,
                                            className: 'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
                                        },
                                    ],
                                },
                                {
                                    cells: [
                                        { content: 'Free gifts (OMG stickers)', className: 'font-semibold' },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        {
                                            content: <IconCheck className="size-6 text-green" />,
                                            className: 'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
                                        },
                                    ],
                                },
                                {
                                    cells: [
                                        { content: 'Partnership opportunities', className: 'font-semibold' },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        { content: <IconX className="size-6 text-red" /> },
                                        {
                                            content: <IconCheck className="size-6 text-green" />,
                                            className: 'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
                                        },
                                    ],
                                },
                            ]}
                            editable={false}
                        />
                    </div>

                    {/* Closing CTA – a second apply prompt for readers who scrolled the whole page. */}
                    <div
                        id="apply"
                        className="not-prose bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6"
                    >
                        <div className="grid @lg/reader-content:grid-cols-[1fr_220px] gap-6 items-center">
                            <div>
                                <h3 className="mt-0 mb-2 text-2xl font-bold">Ready to build a self-driving product?</h3>
                                <p className="mt-0 mb-4">
                                    Get {creditValue} in PostHog credits, exclusive merch, and partner perks worth
                                    $12,000+. Applying takes 2 minutes.
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <CallToAction to={applyUrl} size="sm" externalNoIcon>
                                        Apply now
                                    </CallToAction>
                                    <span className="text-sm text-secondary italic">
                                        You'll need a{' '}
                                        <Link to="https://app.posthog.com/signup" external>
                                            PostHog account
                                        </Link>{' '}
                                        first
                                    </span>
                                </div>
                            </div>
                            <HedgehogHahaBizzniss
                                title="A hedgehog in a suit laughing: haha, business!"
                                className="hidden @lg/reader-content:block w-full max-w-[220px] justify-self-center"
                            />
                        </div>
                    </div>

                    <h3>FAQ</h3>
                    <div className="not-prose mt-4">
                        <Accordion
                            type="multiple"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={faqItems}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
