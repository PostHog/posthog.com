import React from 'react'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO, { buildProductStructuredData } from 'components/seo'
import { Accordion } from 'components/RadixUI/Accordion'
import {
    IconCheck,
    IconX,
    IconStarFilled,
    IconQuestion,
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
import Logo from 'components/Logo'
import OSButton from 'components/OSButton'
import AxisLogo from '../../images/axis-logo.svg'
import CategoryLogo from '../../images/category.svg'
import { useMenuSelectOptions } from 'components/TaskBarMenu/menuData'

type IconComponent = React.ComponentType<{ className?: string }>

// Small emphasis span, matching the /self-driving page's visual language.
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-red dark:text-yellow font-semibold">{children}</span>
)

// Partner configurations. `title` is the co-brand lockup shown beside the PostHog logo.
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

// The four things a self-driving product does for you, straight from the pitch.
const selfDrivingCapabilities: { Icon: IconComponent; color: string; title: string; copy: React.ReactNode }[] = [
    {
        Icon: IconStack,
        color: 'text-blue',
        title: 'Centralize your context',
        copy: 'Query third-party sources and your product data together in one warehouse — no more copy-pasting into a chat window.',
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
        copy: 'The PostHog Slack agent drafts pull requests for you while you’re still sharing memes.',
    },
]

// "How far does $50,000 go?" — concrete value, straight from the pitch.
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
    { Icon: IconDatabase, color: 'text-purple', product: 'Context warehouse', prefix: '', linkText: "What's that?", href: '/data-stack' }, // prettier-ignore
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
                product, finds what’s worth fixing, writes the code, and opens a pull request — all you do is hit merge.{' '}
                <Link to="/self-driving" state={{ newWindow: true }} className="underline font-semibold">
                    Learn more about self-driving
                </Link>
                .
            </p>
        ),
    },
    {
        trigger: 'Can I use my credits on self-driving features?',
        content: (
            <p>
                Yes. Your credits work across every PostHog product, including AI observability, the context warehouse,
                and self-driving. Use them on whatever gives your startup the most value.
            </p>
        ),
    },
    {
        trigger: 'How do I apply?',
        content: (
            <p>
                Just sign up to a paid plan in PostHog (you’re only charged for usage) and then fill in this{' '}
                <Link to="https://app.posthog.com/startups" external className="underline font-semibold">
                    form
                </Link>
                . We will apply the credit automatically if you’re eligible. If you’re accepted into the startups
                program, we will notify you by email.
            </p>
        ),
    },
    {
        trigger: "Who's eligible?",
        content: (
            <p>
                Your company needs to be less than 2 years old and have raised less than $5m funding. You need to have
                signed up any time from Jan 1st 2023 onwards.
            </p>
        ),
    },
    {
        trigger: 'I signed up before this deal launched, can I still get it?',
        content: (
            <p>
                Yes, but only if you signed up after Jan 1st 2023. If your startup meets the eligibility criteria but
                you signed up to PostHog before Jan 1st, we won’t apply the credits but are still happy to enroll you in
                the rest of the program.
            </p>
        ),
    },
    {
        trigger: 'Can I use credits to claim a BAA under the Boost plan?',
        content: (
            <p>
                Unfortunately, no. Credits cannot be used to claim a BAA under the Boost plan due to legal risk. If
                you’d like to claim a BAA, you can instead{' '}
                <Link to="/talk-to-sales" state={{ newWindow: true }} className="underline font-semibold">
                    contact us to discuss options
                </Link>
                . Credits can be used towards all other aspects of the Boost package.
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
                Yes. By joining the startup program, you’ll already get access to our startup newsletter full of tips
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
                . No, they don’t stack!
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
                . You’ll continue to be considered part of the startup program in terms of invites to office hour
                events, and other perks.
            </p>
        ),
    },
    {
        trigger: 'How do I get the Incident.io/Speakeasy/Chroma/Depot discount?',
        content: (
            <p>
                Once you’re accepted into the PostHog for Startups program, we’ll email you with details on how to get
                the partner benefits.
            </p>
        ),
    },
    {
        trigger: 'What level of customer support do I get?',
        content: (
            <p>
                PostHog is run by a small team and, as such, we’re only able to offer support to paying customers.
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
        answer: 'A product that improves itself without waiting to be prompted. PostHog watches how people use your product, finds what’s worth fixing, writes the code, and opens a pull request — all you do is hit merge.',
    },
    {
        question: 'Can I use my PostHog for Startups credits on self-driving features?',
        answer: 'Yes. Your credits work across every PostHog product, including AI observability, the context warehouse, and self-driving. Use them on whatever gives your startup the most value.',
    },
    {
        question: 'How do I apply to PostHog for Startups?',
        answer: 'Sign up to a paid plan in PostHog (you are only charged for usage) and complete the startups application form. We apply the credit automatically if you are eligible and notify you by email once accepted.',
    },
    {
        question: 'Who is eligible for PostHog for Startups?',
        answer: 'Your company needs to be less than 2 years old and have raised less than $5m in funding, and you need to have signed up any time from Jan 1st 2023 onwards.',
    },
    {
        question: 'How far does $50,000 in PostHog credits go?',
        answer: 'It covers roughly 950 million events, more than 6 million session recordings, over 840 million LLM analytics events, or 396 million error tracking events — mix and match across products however makes sense for your startup.',
    },
]

interface StartupProgramProps {
    /** Partner slug (e.g. "stripe", "yc") for co-branded variants. Null on the canonical /startups page. */
    partnerSlug?: string | null
}

export default function StartupProgram({ partnerSlug = null }: StartupProgramProps): JSX.Element {
    const selectOptions = useMenuSelectOptions()

    const partnerConfig = partnerSlug ? partnerConfigs.find((config) => config.slug === partnerSlug) : null
    const creditValue = partnerConfig ? partnerConfig.value : '$50,000'
    const applyUrl = `https://app.posthog.com/startups${partnerSlug ? `/${partnerSlug}` : ''}`

    return (
        <>
            <SEO
                title="PostHog for Startups | $50K credits to build a self-driving product"
                description="Get over $50,000 in credits to build a self-driving product with PostHog. Analytics, session replay, feature flags, AI, and agents that find and fix issues for you. Plus merch and partner perks. Apply in 2 minutes."
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog for Startups',
                    description:
                        'Over $50,000 in PostHog credits to build a self-driving product, plus exclusive merch and partner perks for early-stage teams.',
                    slug: 'startups',
                    faq: faqStructuredData,
                })}
            />
            <Explorer
                template="generic"
                slug="startups"
                title="PostHog startup program"
                selectOptions={selectOptions}
                selectedCategory="startups"
                leftSidebarContent={
                    <>
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconQuestion className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">What is this?</span>
                                        </>
                                    ),
                                    content: (
                                        <p className="m-0">
                                            PostHog for Startups helps early-stage teams and founders build better
                                            products, faster. Get over $50,000 in credits to use across any PostHog
                                            features, including AI observability and self-driving.
                                        </p>
                                    ),
                                },
                            ]}
                        />
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconCheck className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">How to apply</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <ol className="m-0">
                                                <li>Create a PostHog account and add a credit card</li>
                                                <li>
                                                    After onboarding,{' '}
                                                    <Link to={applyUrl} external className="underline font-semibold">
                                                        complete this form
                                                    </Link>
                                                </li>
                                                <li>
                                                    If accepted into the PostHog startup program, you'll be notified by
                                                    email
                                                </li>
                                            </ol>
                                        </>
                                    ),
                                },
                            ]}
                        />
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconCheck className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">Who is eligible?</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <ul className="m-0">
                                                <li>Startup under 2 years old</li>
                                                <li>Less than $5 million in funding</li>
                                            </ul>
                                        </>
                                    ),
                                },
                            ]}
                        />
                        <Accordion
                            data-scheme="primary"
                            className=""
                            defaultValue="item-0"
                            items={[
                                {
                                    trigger: (
                                        <>
                                            <IconCheck className={`text-green size-5 inline-block`} />
                                            <span className="flex-1">Fine print</span>
                                        </>
                                    ),
                                    content: (
                                        <>
                                            <ul className="m-0">
                                                <li>Credits expire after 12 months</li>
                                                <li>This deal is not valid with other discounts or offers</li>
                                                <li>
                                                    Companies on our startups plan are not eligible for priority support
                                                </li>
                                            </ul>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </>
                }
                showTitle={false}
                padding={false}
            >
                <div className="@container h-full bg-[#EFF0EB] dark:bg-dark">
                    <div className="bg-[#122030] bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/startups_rocket_f750a70d99.png)] bg-cover bg-top-left aspect-[1549/638] text-white p-8 relative min-h-96 flex flex-col justify-center w-full">
                        <div className="absolute inset-0 bg-[url(https://res.cloudinary.com/dmukukwp6/image/upload/stars_24a6a0b509.png)] bg-cover" />
                        <div className="hidden dark:block h-60 bg-gradient-to-b from-[#EFF0EB] to-transparent -bottom-60 left-0 w-full absolute" />

                        <div className="relative pb-20 prose-invert prose-sm">
                            {/* Partner variants show the "PostHog X Partner" co-brand lockup above the heading. */}
                            {partnerConfig ? (
                                <div className="flex items-center gap-2.5 mb-3">
                                    <Logo noText className="h-8 relative -top-px" fill="white" />
                                    {partnerConfig.title}
                                </div>
                            ) : (
                                <h1 className="flex items-center gap-2.5 mb-0 text-2xl @md:text-3xl">
                                    <Logo noText className="h-8 relative -top-px" fill="white" />
                                    <span>
                                        PostHog <span className="text-yellow">for startups</span>
                                    </span>
                                </h1>
                            )}
                            <p className="text-white mt-2 mb-3 max-w-xl">
                                Get {creditValue} in credits to build a{' '}
                                <Link
                                    to="/self-driving"
                                    state={{ newWindow: true }}
                                    className="text-yellow font-semibold"
                                >
                                    self-driving product
                                </Link>{' '}
                                — PostHog finds what's worth fixing, writes the code, and opens the pull request. Plus
                                swag and partner perks perfect for anyone building AI products.
                            </p>
                            <ul className="prose prose-sm text-white mt-2 mb-4">
                                <li>{creditValue} in PostHog credits for 12 months</li>
                                <li>$12,000 in benefits from partners we like</li>
                                <li>$1,000 of exclusive PostHog merch</li>
                            </ul>

                            <OSButton asLink to={applyUrl} variant="primary" size="md" external>
                                Apply now
                            </OSButton>

                            <p className="italic text-sm">You'll need a PostHog account first</p>
                        </div>
                    </div>

                    <div className="not-prose grid grid-cols-2 @lg:grid-cols-3 @5xl:grid-cols-6 gap-8 @2xl:gap-4 @3xl:gap-6 px-4 @3xl:px-8 relative -mt-12 max-w-6xl mb-8 @3xl:mb-12">
                        <div className="bg-[#FFD254] -rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_credits_a8487ef646.png"
                                alt={`${creditValue} in PostHog credits`}
                            />
                            <h3 className="text-base my-1 leading-tight">{creditValue} in PostHog credits</h3>
                            <p className="text-sm mb-0">
                                That's a lot of events, replays, API calls, and survey responses.
                            </p>
                        </div>
                        <div className="bg-[#9BBEC2] p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/perk_merch_b2106b276a.png"
                                alt="Exclusive PostHog founder merch and swag"
                            />
                            <h3 className="text-base my-1 leading-tight">$1,000 of founder swag</h3>
                            <p className="text-sm mb-0">
                                You can never have too many laptop stickers or free PostHog t-shirts.
                            </p>
                        </div>
                        <div className="bg-[#E6B2F8] rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/startup_perk_2_f6a6b9d058.png"
                                alt="$1,500 off Incident.io"
                            />
                            <h3 className="text-base my-1 leading-tight">$1,500 off Incident.io</h3>
                            <p className="text-sm mb-0">Incidents happen. Get $1,500 off a teams plan when they do.</p>
                        </div>
                        <div className="bg-[#C4D9FF] -rotate-2 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/startups_sdks_25358b1af4.png"
                                alt="50% off Speakeasy"
                            />
                            <h3 className="text-base my-1 leading-tight">50% off with Speakeasy</h3>
                            <p className="text-sm mb-0">
                                Build MCPs & skills with Speakeasy and get 50% off for 6 months.
                            </p>
                        </div>
                        <div className="bg-[#C4D9FF] -rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/startups_search_3ecaae1574.png"
                                alt="$5,000 of Chroma credit"
                            />
                            <h3 className="text-base my-1 leading-tight">$5,000 of Chroma credit</h3>
                            <p className="text-sm mb-0">
                                Chroma's search infra for AI is fast, serverless, and scalable.
                            </p>
                        </div>
                        <div className="bg-[#b8e0d8] rotate-1 p-4 text-black @2xl:p-2 @3xl:p-4">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/598171862_7fff97b6_15e5_4ff8_8f7c_46148f81efa1_515ee89918.png"
                                alt="$5,000 of Depot credit"
                            />
                            <h3 className="text-base my-1 leading-tight">$5,000 of Depot credit</h3>
                            <p className="text-sm mb-0">
                                Blazing-fast container builds and remote caching, trusted by us.
                            </p>
                        </div>
                    </div>

                    {/* Build a self-driving product with $50,000 in credits */}
                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <h2 className="mb-2">
                            Build a <Highlight>self-driving product</Highlight> with {creditValue} in credits
                        </h2>
                        <p className="mb-6 max-w-3xl">
                            Building products used to mean manually writing code, running analysis, diagnosing bugs, and
                            rolling out changes across a bloated stack of tools. PostHog is the only platform that does
                            it all for you autonomously while still keeping everything at your fingertips.
                        </p>
                        <div className="not-prose grid @md:grid-cols-2 gap-x-8 gap-y-6">
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
                        <h2 className="mb-2">How far does {creditValue} go?</h2>
                        <p className="mb-6 max-w-3xl">
                            A <em>very</em> long way. Here's what your credits are worth if you spent them all in one
                            place, but you can mix and match in whatever way makes sense for your startup. We're not
                            fussy. We just want you to spend the money.
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

                    {/* Investor / customer proof */}
                    <div className="m-4 @3xl:m-8 max-w-6xl border-y border-primary py-8 grid @2xl:grid-cols-2 gap-8">
                        <div>
                            <img src={YCombinatorLight} className="h-12" alt="Y Combinator" />
                            <div className="pt-4">
                                <p>
                                    "Building is never just one-and-done. You always need to find ways to improve.{' '}
                                    <span className="text-red dark:text-yellow font-semibold">
                                        PostHog is central to how we do that at Y Combinator.
                                    </span>{' '}
                                    It helps us try ideas, measure results and make better products."
                                </p>
                                - <strong>Cat Li</strong>
                                <br />
                                <p className="mb-0">Product & Engineering Lead, Y Combinator</p>
                            </div>
                        </div>

                        <div className="border-t border-primary pt-4 mt-4 @2xl:border-none @2xl:pt-0">
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/concept_ventures_fa46262122.svg"
                                className="h-8 my-2"
                                alt="Concept Ventures"
                            />
                            <div className="pt-4">
                                <p>
                                    "Our portfolio companies rely on analytics to optimize their products.{' '}
                                    <span className="text-red dark:text-yellow font-semibold">
                                        Understanding user behavior through platforms like PostHog is mission-critical.
                                    </span>{' '}
                                    The insights it provides are invaluable for founders."
                                </p>
                                - <strong>Oliver Kicks</strong>
                                <br />
                                <p className="mb-0">Partner, Concept Ventures</p>
                            </div>
                        </div>
                    </div>

                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <h2 className="mb-2">How PostHog stacks up</h2>
                        <p className="mb-8">
                            More credits, fewer limits, and partner perks you won't find elsewhere — plus the only
                            startup program with free laptop stickers.
                        </p>

                        <div>
                            <OSTable
                                width="full"
                                // White (bg-primary) body cells to match the toolkit grid; the highlighted
                                // final PostHog column keeps its own yellow background.
                                className="bg-primary"
                                columns={[
                                    { name: '', width: 'minmax(200px, 1fr)', align: 'left' },
                                    { name: 'Pendo', width: 'minmax(150px, 200px)', align: 'left' },
                                    { name: 'LogRocket', width: 'minmax(150px, 200px)', align: 'left' },
                                    { name: 'Amplitude', width: 'minmax(150px, 200px)', align: 'left' },
                                    { name: 'Mixpanel', width: 'minmax(150px, 200px)', align: 'left' },
                                    {
                                        name: (
                                            <span className="flex items-center gap-1.5">
                                                <IconStarFilled className="size-4 text-yellow" />
                                                PostHog
                                            </span>
                                        ),
                                        width: 'minmax(150px, 200px)',
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
                                                    </ul>
                                                ),
                                                className:
                                                    'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
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
                                                className:
                                                    'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
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
                                                className:
                                                    'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
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
                                                className:
                                                    'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
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
                                                className:
                                                    'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
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
                                                className:
                                                    'bg-[#FFF6DE] dark:bg-yellow/10 !border-l-2 !border-l-yellow',
                                            },
                                        ],
                                    },
                                ]}
                                editable={false}
                                size="md"
                            />
                        </div>
                    </div>
                    <div className="m-4 @3xl:m-8 max-w-6xl">
                        <h2 className="mb-4">FAQs</h2>
                        <Accordion data-scheme="primary" className="" defaultValue="" items={faqItems} />
                    </div>

                    {/* Closing CTA – a second apply prompt for readers who scrolled the whole page. */}
                    <div className="m-4 @3xl:m-8 max-w-6xl border-t border-primary pt-8 pb-4 text-center">
                        <h2 className="mb-2">Ready to build a self-driving product?</h2>
                        <p className="mb-4 max-w-2xl mx-auto text-secondary">
                            Get {creditValue} in PostHog credits, exclusive merch, and partner perks worth $12,000+.
                        </p>
                        <OSButton asLink to={applyUrl} variant="primary" size="md" external>
                            Apply now
                        </OSButton>
                        <p className="italic text-sm mt-2 text-secondary">You'll need a PostHog account first</p>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
