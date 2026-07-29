import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO, { buildProductStructuredData } from 'components/seo'
import { Accordion } from 'components/RadixUI/Accordion'
import {
    IconCheck,
    IconQuestion,
    IconBolt,
    IconRewindPlay,
    IconSparkles,
    IconWarning,
    IconStack,
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
    IconMagicWand,
    IconLaptop,
    IconPullRequest,
    IconCalendar,
    IconMegaphone,
    IconChat,
    IconHandMoney,
} from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import OSButton from 'components/OSButton'
import { useMenuSelectOptions } from 'components/TaskBarMenu/menuData'

type IconComponent = React.ComponentType<{ className?: string }>

// Small emphasis span, matching /startups and /self-driving.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-red dark:text-yellow font-semibold">{children}</span>
)

// TODO(students): swap to the real application flow before launch. Until it exists, the CTA
// sends people to the #students channel on Discord, where applications are announced first.
// Program terms come from https://github.com/PostHog/requests-for-comments-public/issues/503
const applyUrl = 'https://discord.com/invite/E9xV2WnR98'

// The day-zero pitch: you don't need a product to start, just PostHog.
const zeroToShipped: { Icon: IconComponent; color: string; title: string; copy: React.ReactNode }[] = [
    {
        Icon: IconMagicWand,
        color: 'text-purple',
        title: 'Set up in under 90 seconds',
        copy: 'The PostHog Wizard instruments your app for you. One command, and every click, pageview, and error is flowing in.',
    },
    {
        Icon: IconLaptop,
        color: 'text-blue',
        title: 'Build with agents in PostHog Desktop',
        copy: 'You get beta access to Desktop, plus AI credits to go from a blank repo to a working product — no analytics degree required.',
    },
    {
        Icon: IconSparkles,
        color: 'text-red dark:text-yellow',
        title: 'Ask questions in plain English',
        copy: 'PostHog AI digs through your data and answers like a data scientist who never sleeps (or attends lectures).',
    },
    {
        Icon: IconPullRequest,
        color: 'text-green',
        title: 'Ship a product that improves itself',
        copy: 'PostHog finds what’s worth fixing, writes the code, and opens the pull request. All you do is hit merge.',
    },
]

// "How far does $50,000 go?" — same pricing math as /startups.
const creditBreakdown: { Icon: IconComponent; color: string; amount: string; unit: string }[] = [
    { Icon: IconBolt, color: 'text-yellow', amount: '950 million', unit: 'events (yes, nearly a billion)' },
    { Icon: IconRewindPlay, color: 'text-orange', amount: '6 million+', unit: 'session recordings' },
    { Icon: IconSparkles, color: 'text-purple', amount: '840 million+', unit: 'LLM analytics events' },
    { Icon: IconWarning, color: 'text-red', amount: '396 million', unit: 'error tracking events' },
]

// The community and events side of the program — the part you can't get from other student offers.
const communityItems: { Icon: IconComponent; color: string; title: string; copy: React.ReactNode }[] = [
    {
        Icon: IconCalendar,
        color: 'text-red dark:text-yellow',
        title: 'Mixers, workshops, and hack sessions',
        copy: (
            <>
                We bring PostHog people to campus — not to lecture, but to build next to you. Our first mixer at UC
                Davis with AggieWorks pulled 30+ builders from three campus orgs. Show up to an event and you’ll also
                unlock your $100 build grant.
            </>
        ),
    },
    {
        Icon: IconMegaphone,
        color: 'text-orange',
        title: 'Campus ambassadors',
        copy: (
            <>
                Want PostHog on your campus? Run it. Ambassadors get event support, merch and kits to give out, and a
                direct line to our team — wherever in the world your campus is.
            </>
        ),
    },
    {
        Icon: IconChat,
        color: 'text-blue',
        title: 'A Discord channel with the actual builders',
        copy: (
            <>
                The{' '}
                <Link to={applyUrl} external className="underline font-semibold">
                    #students channel
                </Link>{' '}
                is where the program lives: meet other student builders, get unstuck, and ask the people who build
                PostHog anything.
            </>
        ),
    },
    {
        Icon: IconHandMoney,
        color: 'text-green',
        title: 'A career referral bounty',
        copy: (
            <>
                Refer a friend we end up hiring, and we’ll pay you the same bounty an employee would get. (We don’t do
                internships or scholarships — we think this is better.)
            </>
        ),
    },
]

// The full toolkit, same as /startups. Each box uses the product's canonical site icon/color.
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
    { Icon: IconDatabase, color: 'text-purple', product: 'Context warehouse', prefix: '', linkText: "What's that?", href: '/data-stack' }, // prettier-ignore
    { Icon: IconMessage, color: 'text-salmon', product: 'Surveys', prefix: 'like ', linkText: 'Sprig', href: '/blog/best-sprig-alternatives' }, // prettier-ignore
    { Icon: IconCursorClick, color: 'text-red', product: 'Heatmaps', prefix: 'like ', linkText: 'Hotjar', href: '/blog/posthog-vs-hotjar' }, // prettier-ignore
    { Icon: IconPlug, color: 'text-sky-blue', product: 'CDP', prefix: 'like ', linkText: 'Segment', href: '/blog/best-customer-data-platforms-for-developers' }, // prettier-ignore
    { Icon: IconStack, color: 'text-red dark:text-yellow', product: 'And loads more', prefix: '', linkText: 'Install them all with one command', href: '/wizard' }, // prettier-ignore
]

// Visible FAQ (JSX, with links). The plain-text version below feeds FAQPage structured data.
const faqItems = [
    {
        trigger: 'How do I apply?',
        content: (
            <p>
                Applications are opening soon. Until then,{' '}
                <Link to={applyUrl} external className="underline font-semibold">
                    join our Discord
                </Link>{' '}
                and drop into the #students channel — that’s where we’ll announce them first, and where the people
                running the program hang out.
            </p>
        ),
    },
    {
        trigger: "Who's eligible?",
        content: (
            <p>
                You need to be currently enrolled at a university or college — undergrad or grad, any major, anywhere in
                the world. You’ll need a university email address (like .edu) or other proof of enrollment when you
                apply.
            </p>
        ),
    },
    {
        trigger: 'What can I use the $50,000 in credits on?',
        content: (
            <p>
                Usage of every PostHog tool: product analytics, session replay, feature flags, experiments, error
                tracking, AI observability, surveys, and the rest. Credits cover tool usage — AI credits are separate,
                and come via the $30/month PostHog Desktop allowance.
            </p>
        ),
    },
    {
        trigger: "What's the deal with PostHog Desktop?",
        content: (
            <p>
                <Link to="/desktop" state={{ newWindow: true }} className="underline font-semibold">
                    Desktop
                </Link>{' '}
                is our app for building products with agents. It’s in closed beta, but students in the program get
                immediate access, plus $30/month in AI credits for 12 months so you can actually build with it.
            </p>
        ),
    },
    {
        trigger: "What's the $100 build grant?",
        content: (
            <p>
                A one-off $100 grant to put toward whatever you’re building. It’s only released at in-person events —
                come to a mixer or hack session, build something, and it’s yours.
            </p>
        ),
    },
    {
        trigger: 'What happens when I graduate, or the 12 months end?',
        content: (
            <p>
                Credits last 12 months from when you’re accepted. After that you can move onto{' '}
                <Link to="/pricing" state={{ newWindow: true }} className="underline font-semibold">
                    another PostHog plan
                </Link>{' '}
                — and if you’re turning your project into a company,{' '}
                <Link to="/startups" state={{ newWindow: true }} className="underline font-semibold">
                    PostHog for Startups
                </Link>{' '}
                picks up right where this leaves off, with another $50,000 in credits. Either way, you’ll still be
                welcome in the community.
            </p>
        ),
    },
    {
        trigger: "I'm already starting a company. Should I apply to this or PostHog for Startups?",
        content: (
            <p>
                If your company is less than 2 years old and has raised under $5m,{' '}
                <Link to="/startups" state={{ newWindow: true }} className="underline font-semibold">
                    apply to PostHog for Startups
                </Link>{' '}
                — same credits, plus partner perks. The two programs don’t stack.
            </p>
        ),
    },
    {
        trigger: 'How do I bring PostHog to my campus?',
        content: (
            <p>
                Become a campus ambassador. Tell us about your campus in the #students channel on{' '}
                <Link to={applyUrl} external className="underline font-semibold">
                    Discord
                </Link>{' '}
                — ambassadors run anywhere in the world, and we back you with event support, merch, and kits.
            </p>
        ),
    },
    {
        trigger: 'How does the career referral bounty work?',
        content: (
            <p>
                If you refer a candidate and we end up hiring them, we pay you the same referral bounty our own
                employees get. We don’t offer internships or scholarships.
            </p>
        ),
    },
    {
        trigger: 'What level of customer support do I get?',
        content: (
            <p>
                PostHog is run by a small team and, as such, we’re only able to offer priority support to paying
                customers. Students on this plan qualify for normal priority and community support — though unlike most
                companies, you can also just ask us things directly in Discord.
            </p>
        ),
    },
]

// Plain-text FAQ for schema.org FAQPage (buildProductStructuredData skips entries without an answer).
const faqStructuredData = [
    {
        question: 'What is PostHog for Students?',
        answer: 'A program for student builders: $50,000 in PostHog credits for 12 months, $30/month in AI credits for PostHog Desktop, a $100 build grant at in-person events, merch, campus events, and direct access to the PostHog team.',
    },
    {
        question: 'Who is eligible for PostHog for Students?',
        answer: 'Students currently enrolled at a university or college — undergrad or grad, any major, anywhere in the world. You need a university email address or other proof of enrollment.',
    },
    {
        question: 'How do I apply to PostHog for Students?',
        answer: 'Applications are opening soon. Join the PostHog Discord and the #students channel, where applications are announced first.',
    },
    {
        question: 'What can PostHog for Students credits be used on?',
        answer: 'Usage of every PostHog tool, including product analytics, session replay, feature flags, experiments, error tracking, AI observability, and surveys. AI credits are separate and come via the $30/month PostHog Desktop allowance.',
    },
    {
        question: 'How far does $50,000 in PostHog credits go?',
        answer: 'It covers roughly 950 million events, more than 6 million session recordings, over 840 million LLM analytics events, or 396 million error tracking events — mix and match across products however you like.',
    },
]

export default function StudentProgram(): JSX.Element {
    const selectOptions = useMenuSelectOptions()

    return (
        <>
            <SEO
                title="PostHog for Students | $50K in credits for student builders"
                description="Get $50,000 in PostHog credits, AI credits for PostHog Desktop, a $100 build grant, merch, campus events, and a direct line to the PostHog team. For students building real products."
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog for Students',
                    description:
                        '$50,000 in PostHog credits plus AI credits for PostHog Desktop, campus events, merch, and direct access to the PostHog team — for students building real products.',
                    slug: 'students',
                    faq: faqStructuredData,
                })}
            />
            <Explorer
                template="generic"
                slug="students"
                title="PostHog student program"
                headerBarOptions={['showBack', 'showForward']}
                selectOptions={selectOptions}
                selectedCategory="students"
                leftSidebarContent={
                    <div className="p-2">
                        <Accordion
                            data-scheme="primary"
                            type="multiple"
                            className="[&>*:first-child_button]:!pt-0"
                            triggerClassName="!text-sm !font-semibold"
                            contentClassName="!text-sm [&_p]:!text-sm [&_li]:!text-sm"
                            defaultValue={['item-0']}
                            items={[
                                {
                                    value: 'item-0',
                                    trigger: (
                                        <>
                                            <IconQuestion className="text-green size-5 shrink-0" />
                                            <span className="flex-1">What is this?</span>
                                        </>
                                    ),
                                    content: (
                                        <p className="m-0">
                                            PostHog for Students helps student builders ship real products before they
                                            graduate. Get $50,000 in PostHog credits, AI credits for PostHog Desktop,
                                            and a direct line to the people who build PostHog.
                                        </p>
                                    ),
                                },
                                {
                                    value: 'item-1',
                                    trigger: (
                                        <>
                                            <IconCheck className="text-green size-5 shrink-0" />
                                            <span className="flex-1">How to apply</span>
                                        </>
                                    ),
                                    content: (
                                        <ol className="m-0">
                                            <li>
                                                <Link to={applyUrl} external className="underline font-semibold">
                                                    Join our Discord
                                                </Link>{' '}
                                                and drop into the #students channel
                                            </li>
                                            <li>Applications are opening soon — Discord hears about it first</li>
                                            <li>Once you're accepted, credits are applied to your PostHog account</li>
                                        </ol>
                                    ),
                                },
                                {
                                    value: 'item-2',
                                    trigger: (
                                        <>
                                            <IconCheck className="text-green size-5 shrink-0" />
                                            <span className="flex-1">Who is eligible?</span>
                                        </>
                                    ),
                                    content: (
                                        <ul className="m-0">
                                            <li>Currently enrolled at a university or college</li>
                                            <li>Has a university email address (or proof of enrollment)</li>
                                        </ul>
                                    ),
                                },
                                {
                                    value: 'item-3',
                                    trigger: (
                                        <>
                                            <IconCheck className="text-green size-5 shrink-0" />
                                            <span className="flex-1">Fine print</span>
                                        </>
                                    ),
                                    content: (
                                        <ul className="m-0">
                                            <li>Credits expire after 12 months</li>
                                            <li>
                                                Credits cover PostHog tool usage — AI credits come separately with the
                                                Desktop allowance
                                            </li>
                                            <li>
                                                Not valid with other discounts or offers, including PostHog for Startups
                                            </li>
                                            <li>Students aren't eligible for priority support</li>
                                            <li>No internships or scholarships</li>
                                        </ul>
                                    ),
                                },
                            ]}
                        />
                    </div>
                }
                showTitle={false}
                padding={false}
            >
                <div className="@container h-full bg-[#EFF0EB] dark:bg-dark">
                    {/* Same dark banner treatment as /startups, minus the rocket — students art doesn't exist yet. */}
                    <div className="bg-[#122030] text-white p-8 relative min-h-96 flex flex-col justify-center w-full">
                        <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/stars_24a6a0b509.png)] bg-cover" />
                        <div className="hidden dark:block h-60 bg-gradient-to-b from-[#EFF0EB] to-transparent -bottom-60 left-0 w-full absolute" />

                        <div className="relative pb-20 prose-invert prose-sm">
                            <h1 className="flex items-center gap-2.5 mb-0 text-2xl @md:text-3xl">
                                <Logo
                                    layout="logomark"
                                    variant="mono"
                                    className="h-8 w-auto relative -top-px"
                                    color="white"
                                />
                                <span>
                                    PostHog <span className="text-yellow">for students</span>
                                </span>
                            </h1>
                            <p className="text-white mt-2 mb-3 max-w-xl">
                                Don't have a product yet? Perfect — that's the point. Get $50,000 in credits, AI credits
                                for{' '}
                                <Link to="/desktop" state={{ newWindow: true }} className="text-yellow font-semibold">
                                    PostHog Desktop
                                </Link>
                                , and a direct line to the people who build PostHog. Everything you need to go from
                                blank repo to real users before you graduate.
                            </p>
                            <ul className="prose prose-sm text-white mt-2 mb-4">
                                <li>$50,000 in PostHog credits for 12 months</li>
                                <li>$30/month in AI credits for PostHog Desktop, beta access included</li>
                                <li>Campus events, merch, and a community of student builders</li>
                            </ul>

                            <OSButton asLink to={applyUrl} variant="primary" size="md" external>
                                Join the Discord to get started
                            </OSButton>

                            <p className="italic text-sm">Applications open soon — Discord members hear it first</p>
                        </div>
                    </div>

                    <div className="not-prose grid grid-cols-2 @lg:grid-cols-3 @5xl:grid-cols-6 gap-8 @2xl:gap-4 @3xl:gap-6 px-4 @3xl:px-8 relative -mt-12 max-w-6xl mb-8 @3xl:mb-12">
                        <div className="bg-[#FFD254] -rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_credits_a8487ef646.png"
                                alt="$50,000 in PostHog credits"
                            />
                            <h3 className="text-base my-1 leading-tight">$50,000 in PostHog credits</h3>
                            <p className="text-sm mb-0">
                                The same credits startups get. Events, replays, API calls — the lot.
                            </p>
                        </div>
                        <div className="bg-[#9BBEC2] p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_laptop_2afc8d8955.png"
                                alt="$30 per month in AI credits for PostHog Desktop"
                            />
                            <h3 className="text-base my-1 leading-tight">$30/month in AI credits</h3>
                            <p className="text-sm mb-0">
                                For building with agents in PostHog Desktop — beta access included.
                            </p>
                        </div>
                        <div className="bg-[#E6B2F8] rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_cash_64f561fac6.png"
                                alt="$100 build grant at in-person events"
                            />
                            <h3 className="text-base my-1 leading-tight">$100 build grant</h3>
                            <p className="text-sm mb-0">
                                A one-off grant for whatever you're building. Claim it at any in-person event.
                            </p>
                        </div>
                        <div className="bg-[#C4D9FF] -rotate-2 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_merch_b2106b276a.png"
                                alt="Student merch and event kits"
                            />
                            <h3 className="text-base my-1 leading-tight">Student merch & event kits</h3>
                            <p className="text-sm mb-0">
                                You can never have too many laptop stickers. Ambassadors get kits to give out, too.
                            </p>
                        </div>
                        <div className="bg-[#C4D9FF] -rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/hoggie_mail_48daf2f4b4.png"
                                alt="Direct access to the PostHog team on Discord"
                            />
                            <h3 className="text-base my-1 leading-tight">Direct access on Discord</h3>
                            <p className="text-sm mb-0">
                                A #students channel where the people who build PostHog actually answer.
                            </p>
                        </div>
                        <div className="bg-[#b8e0d8] rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/flag_flags_toggle_celebrate_e2224e0723.png"
                                alt="Campus ambassador status"
                            />
                            <h3 className="text-base my-1 leading-tight">Campus ambassador status</h3>
                            <p className="text-sm mb-0">Run PostHog on your campus, with our backing (and budget).</p>
                        </div>
                    </div>

                    {/* Go from zero to shipped */}
                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <h2 className="mb-2">
                            Go from <Highlight>zero to shipped</Highlight> — before finals week
                        </h2>
                        <p className="mb-6 max-w-3xl">
                            Most programs assume you already have a product. This one doesn't. PostHog is built so you
                            can start from a blank repo and end up with something real — instrumented, measured, and
                            improving itself.
                        </p>
                        <div className="not-prose grid @md:grid-cols-2 gap-x-8 gap-y-6">
                            {zeroToShipped.map(({ Icon, color, title, copy }) => (
                                <div key={title} className="flex items-start gap-3">
                                    <Icon className={`size-6 shrink-0 mt-0.5 ${color}`} />
                                    <div>
                                        <p className="m-0 text-base font-bold text-primary">{title}</p>
                                        <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 mb-0">
                            <Link
                                to="/self-driving"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-1.5 font-semibold text-red dark:text-yellow"
                            >
                                See how self-driving works
                                <IconArrowRight className="size-4" />
                            </Link>
                        </p>
                    </div>

                    {/* How far does $50,000 go? */}
                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8">
                        <h2 className="mb-2">How far does $50,000 go?</h2>
                        <p className="mb-6 max-w-3xl">
                            Realistically? Further than your side project will ever need — which is exactly the point.
                            You get to build like a real company without ever seeing a bill. Here's what your credits
                            are worth if you spent them all in one place:
                        </p>
                        <div className="not-prose grid grid-cols-2 @2xl:grid-cols-4 gap-4">
                            {creditBreakdown.map(({ Icon, color, amount, unit }) => (
                                <div key={unit} className="border border-primary rounded-md bg-primary p-4">
                                    <Icon className={`size-6 ${color}`} />
                                    <p className="m-0 mt-2 text-2xl font-bold text-primary">{amount}</p>
                                    <p className="m-0 mt-0.5 text-sm text-secondary">{unit}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Events & community — the part of the program you can't get elsewhere */}
                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8">
                        <h2 className="mb-2">
                            Credits you can get anywhere. <Highlight>This is the part you can't.</Highlight>
                        </h2>
                        <p className="mb-6 max-w-3xl">
                            Every dev tool will throw free credits at students. What we've got that they don't: people.
                            PostHog folks show up on campus, hang out in Discord, and treat student builders like real
                            builders — because you are.
                        </p>
                        <div className="not-prose grid @md:grid-cols-2 gap-x-8 gap-y-6">
                            {communityItems.map(({ Icon, color, title, copy }) => (
                                <div key={title} className="flex items-start gap-3">
                                    <Icon className={`size-6 shrink-0 mt-0.5 ${color}`} />
                                    <div>
                                        <p className="m-0 text-base font-bold text-primary">{title}</p>
                                        <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 mb-0">
                            <Link
                                to="/events"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-1.5 font-semibold text-red dark:text-yellow"
                            >
                                See what's coming up on the events page
                                <IconArrowRight className="size-4" />
                            </Link>
                        </p>
                    </div>

                    {/* Everything you get */}
                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8">
                        <h2 className="mb-2">Everything you (and our agents) can use</h2>
                        <p className="mb-6 max-w-3xl">
                            PostHog has over a dozen tools you can use however you want. Use any and all of them in our
                            app, via MCP, or in Slack.
                        </p>
                        <div className="not-prose grid grid-cols-2 @2xl:grid-cols-3 gap-3">
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
                                            <Link
                                                to={href}
                                                state={{ newWindow: true }}
                                                className="!text-inherit underline"
                                            >
                                                {linkText}
                                            </Link>
                                        ) : (
                                            linkText
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 mb-0 text-sm text-secondary">
                            Trusted by teams like{' '}
                            <Link
                                to="/customers/supabase"
                                state={{ newWindow: true }}
                                className="!text-inherit underline"
                            >
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
                            ,{' '}
                            <Link
                                to="/customers/hasura"
                                state={{ newWindow: true }}
                                className="!text-inherit underline"
                            >
                                Hasura
                            </Link>
                            , and{' '}
                            <Link
                                to="/customers/lovable"
                                state={{ newWindow: true }}
                                className="!text-inherit underline"
                            >
                                Lovable
                            </Link>{' '}
                            — and built for engineers, with 30k+ stars and 500+ contributors on GitHub.
                        </p>
                    </div>

                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8">
                        <h2 className="mb-4">FAQs</h2>
                        <Accordion data-scheme="primary" className="" defaultValue="" items={faqItems} />
                    </div>

                    {/* Closing CTA – a second prompt for readers who scrolled the whole page. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8 pb-4 text-center">
                        <h2 className="mb-2">Ready to build something real?</h2>
                        <p className="mb-4 max-w-2xl mx-auto text-secondary">
                            Get $50,000 in PostHog credits, AI credits for Desktop, merch, and a community that ships.
                        </p>
                        <OSButton asLink to={applyUrl} variant="primary" size="md" external>
                            Join the Discord to get started
                        </OSButton>
                        <p className="italic text-sm mt-2 text-secondary">
                            Applications open soon — Discord members hear it first
                        </p>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
