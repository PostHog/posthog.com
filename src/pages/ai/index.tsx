import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO, { buildProductStructuredData } from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import SlicedHog from 'components/SlicedHog'
import MCPInstallCTA from 'components/MCPInstallCTA'
import PlatformInstall, { cliInstallSchema } from 'components/PlatformInstall'
import { OSQuote } from 'components/OSQuote'
import { useSelfDrivingTemplates } from 'components/SelfDrivingInbox'
import { buildScoutDeepLink } from 'components/SelfDrivingInbox/scoutDeepLink'
import useProduct from 'hooks/useProduct'
import usePostHog from 'hooks/usePostHog'
import { LOGOS, type LogoKey } from 'constants/logos'
import {
    IconArrowRight,
    IconBolt,
    IconCheck,
    IconCompass,
    IconCursorClick,
    IconEye,
    IconLightBulb,
    IconPencil,
    IconSparkles,
} from '@posthog/icons'

const SIGNUP_URL = 'https://app.posthog.com/signup'
const APP_AI_URL = 'https://app.posthog.com/ai'
const CONNECT_SLACK_URL = 'https://app.posthog.com/integrations/slack'
const SCOUTS_URL = 'https://app.posthog.com/inbox/scouts'

type IconComponent = React.ComponentType<{ className?: string }>
type CloudinarySrc = `https://res.cloudinary.com/${string}`

// Opens the PostHog AI side panel in the app with the prompt already filled in
const askUrl = (prompt: string) => `https://app.posthog.com/#panel=max:!${encodeURIComponent(prompt)}`

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

type IconItem = {
    Icon: IconComponent
    color: string
    name: string
}

const IconChipRow = ({ items }: { items: IconItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-4 gap-x-1">
        {items.map(({ Icon, color, name }) => (
            <span
                key={name}
                className="inline-flex items-center gap-1.5 text-primary text-sm whitespace-nowrap font-semibold p-2"
            >
                <Icon className={`size-4 shrink-0 ${color}`} />
                {name}
            </span>
        ))}
    </div>
)

const LightDarkImage = ({ src, srcDark, alt }: { src: CloudinarySrc; srcDark: CloudinarySrc; alt: string }) => (
    <>
        <CloudinaryImage src={src} alt={alt} className="dark:hidden" imgClassName="w-full" />
        <CloudinaryImage src={srcDark} alt={alt} className="hidden dark:block" imgClassName="w-full" />
    </>
)

const heroBullets = [
    'Answers from all your data at once',
    'Builds dashboards, flags, and PRs',
    'Uses the metrics your team agreed on',
]

const capturedData = [
    'Events and pageviews',
    'Session recordings',
    'Errors and logs',
    'LLM traces',
    'Flags and experiments',
    'Surveys',
]

const syncedSources: { key: LogoKey; name: string }[] = [
    { key: 'stripe', name: 'Stripe' },
    { key: 'hubspot', name: 'HubSpot' },
    { key: 'salesforce', name: 'Salesforce' },
    { key: 'zendesk', name: 'Zendesk' },
    { key: 'postgres', name: 'Postgres' },
    { key: 'snowflake', name: 'Snowflake' },
]

const semanticFacts = [
    {
        title: 'Metrics',
        copy: (
            <>
                Define <code>mrr</code> once. Every agent runs your query instead of writing its own.
            </>
        ),
    },
    {
        title: 'Certified tables',
        copy: (
            <>
                Mark the good table, so nobody's agent reads <code>stripe_charges_old_v2_final</code>.
            </>
        ),
    },
    {
        title: 'Reviewed joins',
        copy: 'Accept a join once, with the match rates to prove it. Agents stop guessing join keys.',
    },
]

// Full class strings, so Tailwind can see every color it needs
const promptGroups: {
    verb: string
    tagline: string
    Icon: IconComponent
    iconColor: string
    hoverBorder: string
    hoverArrow: string
    prompts: string[]
}[] = [
    {
        verb: 'Understand',
        tagline: 'Questions with an answer',
        Icon: IconLightBulb,
        iconColor: 'text-yellow',
        hoverBorder: 'hover:border-yellow',
        hoverArrow: 'group-hover:text-yellow',
        prompts: [
            'What changed across my product this week?',
            'Why did signups drop on Tuesday? Check the funnel, errors, and replays',
            'Find the top 10 orgs by number of active users',
        ],
    },
    {
        verb: 'Explore',
        tagline: 'Dig until something turns up',
        Icon: IconCompass,
        iconColor: 'text-blue',
        hoverBorder: 'hover:border-blue',
        hoverArrow: 'group-hover:text-blue',
        prompts: [
            'Find sessions where users got stuck',
            'Analyze LLM token usage over the past 7 days',
            'Build a dashboard for onboarding retention',
        ],
    },
    {
        verb: 'Act',
        tagline: 'Hand it the chore',
        Icon: IconBolt,
        iconColor: 'text-green',
        hoverBorder: 'hover:border-green',
        hoverArrow: 'group-hover:text-green',
        prompts: [
            'Send a survey to users who canceled this month',
            'Roll out the onboarding flag to 25% and alert me if errors spike',
            'Find flags nobody has evaluated in 30 days and open a PR to remove them',
        ],
    },
]

const PromptsSection = (): JSX.Element => {
    const posthog = usePostHog()

    return (
        <>
            <h3>
                Ask it <Highlight>anything</Highlight>
            </h3>
            <p>Pick a message and send it. It opens in PostHog AI, ready to go (you need to be signed in).</p>
            <div className="not-prose grid gap-6 my-6 @2xl/reader-content:grid-cols-3 @2xl/reader-content:gap-4">
                {promptGroups.map(({ verb, tagline, Icon, iconColor, hoverBorder, hoverArrow, prompts }) => (
                    <div key={verb}>
                        <div className="mb-3 border-b border-primary pb-2">
                            <p className="m-0 flex items-center gap-2 text-base font-bold text-primary">
                                <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                {verb}
                            </p>
                            <p className="m-0 mt-0.5 text-sm text-secondary">{tagline}</p>
                        </div>
                        <ul className="m-0 flex list-none flex-col items-end gap-2 p-0">
                            {prompts.map((prompt) => (
                                <li key={prompt} className="ml-8">
                                    {/* Styled as your own chat message: right-aligned, with a send arrow */}
                                    <Link
                                        to={askUrl(prompt)}
                                        externalNoIcon
                                        onClick={() =>
                                            posthog?.capture('ai_prompt_selected', {
                                                group: verb,
                                                prompt,
                                                placement: 'ai_page',
                                            })
                                        }
                                        className={`group flex items-end gap-2 rounded-lg rounded-br-sm border border-primary bg-accent px-3 py-2 text-sm text-primary hover:text-primary ${hoverBorder}`}
                                    >
                                        <span>{prompt}</span>
                                        <IconArrowRight
                                            className={`size-4 shrink-0 text-secondary transition-transform group-hover:translate-x-0.5 ${hoverArrow}`}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

const inAppChips: IconItem[] = [
    { Icon: IconEye, color: 'text-blue', name: 'Knows the open page' },
    { Icon: IconPencil, color: 'text-purple', name: 'Edits forms live' },
    { Icon: IconSparkles, color: 'text-yellow', name: 'Real insight widgets' },
    { Icon: IconCursorClick, color: 'text-green', name: 'Preview before writes' },
]

const surfaceTabs: TabbedCarouselTab[] = [
    {
        value: 'in-posthog',
        label: 'In PostHog',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="rounded pt-4 px-4 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">A side panel on every page</h2>
                <p className="text-secondary text-sm">
                    It knows what you have open, so "why did this drop?" on a dashboard is about that dashboard. Ask it
                    to change a flag, and the form in front of you updates.
                </p>
                <IconChipRow items={inAppChips} />
                <div className="-mx-4 mt-4 leading-[0]">
                    <LightDarkImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_light_1fbdd896ec.png"
                        srcDark="https://res.cloudinary.com/dmukukwp6/image/upload/max_sidebar_initial_dark_f80f0d13ac.png"
                        alt="The PostHog AI side panel in the PostHog app"
                    />
                </div>
            </div>
        ),
    },
    {
        value: 'slack',
        label: 'Slack',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <div className="rounded pt-4 px-4 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Answer the question in the thread that asked it</h2>
                <p className="text-secondary text-sm">
                    Tag <code>@PostHog</code> with a data question, then ask it to open the PR that fixes what it found.
                    Same thread, same hog.
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>
                        Connect Slack
                    </CallToAction>
                    <Link to="/slack" state={{ newWindow: true }} className="text-sm font-semibold">
                        More about the Slack app
                    </Link>
                </div>
                <div className="-mx-4 leading-[0]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/subscription_insights_50ce62125e.png"
                        alt="A PostHog insight subscription posted to a Slack channel"
                        imgClassName="w-full"
                    />
                </div>
            </div>
        ),
    },
    {
        value: 'mcp',
        label: 'MCP',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="rounded p-4 pb-6 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Give your coding agent a conscience</h2>
                <p className="text-secondary text-sm">
                    Plug PostHog into Claude Code, Cursor, or Codex, so it asks "is anyone still on this flag?" before
                    it deletes the flag.
                </p>
                <MCPInstallCTA className="max-w-md" showDesktopLink={false} />
                <p className="text-sm mt-4 mb-0">
                    <Link to="/mcp" state={{ newWindow: true }} className="font-semibold">
                        More about the PostHog MCP
                    </Link>
                </p>
            </div>
        ),
    },
    {
        value: 'cli',
        label: 'CLI',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="rounded p-4 pb-6 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">SQL from your terminal, scripts, and CI</h2>
                <p className="text-secondary text-sm">
                    <code>posthog-cli api</code> puts the same tools in a shell command, for anything that has no MCP
                    client (including that cron job nobody talks about).
                </p>
                <PlatformInstall schema={cliInstallSchema} />
                <p className="text-sm mt-4 mb-0">
                    <Link to="/docs/cli" state={{ newWindow: true }} className="font-semibold">
                        Read the CLI docs
                    </Link>
                </p>
            </div>
        ),
    },
]

type Destination = 'Inbox' | 'Slack channel' | 'Slack DM' | 'Event'

// Drawn from the custom scout ideas in /docs/self-driving/scout-examples
const scoutJobs: { name: string; copy: string; posts: Destination[] }[] = [
    { name: 'Churn-risk agent', copy: 'Notices the account whose champion went quiet.', posts: ['Slack DM'] },
    { name: 'Morning digest agent', copy: 'One report a day. A quiet day gets "all green".', posts: ['Slack channel'] },
    { name: 'Account brief agent', copy: 'Usage, billing, and CRM notes for each new signup.', posts: ['Slack DM'] },
    {
        name: 'Feedback themes agent',
        copy: 'Six complaints about one checkout bug become one finding.',
        posts: ['Inbox'],
    },
    {
        name: 'Broken-promise agent',
        copy: 'Finds the payment that never got its webhook.',
        posts: ['Inbox', 'Slack channel'],
    },
    { name: 'Quality judge agent', copy: 'Grades a sample of support replies against your rules.', posts: ['Event'] },
]

const ScoutsSection = (): JSX.Element => {
    const posthog = usePostHog()
    const readyMade = useSelfDrivingTemplates().filter((template) => template.scout)

    return (
        <>
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/binoculars_de6c3b3595.png"
                alt="A hedgehog looking through binoculars"
                className="max-w-36 mb-2 @lg/reader-content:float-right @lg/reader-content:ml-6 @lg/reader-content:max-w-44"
                imgClassName="w-full"
            />
            <h3>
                Agents that <Highlight>keep watch</Highlight>
            </h3>
            <p>
                Everyone else sells you a separate agent for each job. Here, you describe the job, and a scout does it
                on a schedule with your PostHog data. It keeps quiet until something is worth your time, then tells your
                Inbox, a Slack channel, or your DMs. We run the sandbox and the model. You just get the gossip.
            </p>
            <ul className="not-prose clear-both list-none p-0 my-6 grid gap-3 @md/reader-content:grid-cols-2 @2xl/reader-content:grid-cols-3">
                {scoutJobs.map(({ name, copy, posts }) => (
                    <li key={name} className="flex flex-col rounded-md border border-primary bg-primary p-4">
                        <p className="m-0 text-base font-bold text-primary">{name}</p>
                        <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                        <p className="m-0 mt-auto flex flex-wrap items-center gap-1.5 pt-3 text-xs text-secondary">
                            Posts to
                            {posts.map((destination) => (
                                <span
                                    key={destination}
                                    className="rounded-sm bg-accent border border-primary px-1.5 py-0.5 font-semibold text-primary"
                                >
                                    {destination}
                                </span>
                            ))}
                        </p>
                    </li>
                ))}
            </ul>

            {readyMade.length > 0 && (
                <>
                    <h4>Ready to add</h4>
                    <ul className="not-prose list-none p-0 my-4 grid gap-3 @md/reader-content:grid-cols-2 @2xl/reader-content:grid-cols-3">
                        {readyMade.map(({ url, templateTitle, templateShortTitle, scout }) => (
                            <li key={url} className="flex flex-col rounded-md border border-primary bg-primary p-4">
                                <p className="m-0 text-base font-bold text-primary">
                                    {templateShortTitle || templateTitle}
                                </p>
                                <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                                    <OSButton
                                        asLink
                                        to={buildScoutDeepLink(scout)}
                                        external
                                        variant="primary"
                                        size="sm"
                                        onClick={() =>
                                            posthog?.capture('pocket_guide_interaction', {
                                                kind: 'add_scout_click',
                                                scout: scout?.name,
                                                placement: 'ai_page',
                                            })
                                        }
                                    >
                                        Add this scout
                                    </OSButton>
                                    <Link to={url} state={{ newWindow: true }} className="text-sm font-semibold">
                                        Read the guide
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <div className="not-prose flex flex-wrap items-center gap-3 mb-6">
                <CallToAction to={SCOUTS_URL} size="sm" externalNoIcon>
                    Build a scout
                </CallToAction>
                <Link
                    to="/docs/self-driving/scout-examples"
                    state={{ newWindow: true }}
                    className="text-sm font-semibold"
                >
                    Steal more ideas
                </Link>
            </div>
        </>
    )
}

const HeadlessSection = () => (
    <>
        <CloudinaryImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/headless_horsehog_17d1541713.png"
            alt="A headless horseman hedgehog on a hobby horse, holding a flaming jack-o'-lantern"
            className="max-w-44 mb-2 @lg/reader-content:float-right @lg/reader-content:ml-6 @lg/reader-content:max-w-60"
            imgClassName="w-full"
        />
        <h3>
            <Highlight>Headless</Highlight>, on purpose
        </h3>
        <p>
            PostHog AI has no head of its own. Each conversation starts a cloud sandbox, and the agent works there with
            the same public MCP tools that you can plug into Claude Code or Cursor.
        </p>
        <p>
            The side panel, Slack, Desktop, and your coding agent all ride the same horse. When we improve a tool, every
            one of them gets the change.
        </p>
        <div className="not-prose clear-both flex flex-wrap items-center gap-3 mb-6">
            <CallToAction to="/mcp" state={{ newWindow: true }} size="sm">
                Connect the MCP
            </CallToAction>
            <span className="text-sm text-secondary">
                Building a PostHog product?{' '}
                <Link to="/handbook/engineering/ai/implementation" state={{ newWindow: true }}>
                    Integrate with PostHog AI
                </Link>
            </span>
        </div>
    </>
)

const personas: { role: string; image: CloudinarySrc; copy: string }[] = [
    {
        role: 'Founders',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_founder_adaf6ef8c1.png',
        copy: "A technical co-founder that doesn't sleep (or ask for equity).",
    },
    {
        role: 'Product engineers',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_engineer_0eebaf7af1.png',
        copy: 'Every step links to the query behind it, so you can check its work.',
    },
    {
        role: 'Product managers',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_pm_23749f3c26.png',
        copy: "Ship the experiment before anyone says 'PRD'.",
    },
    {
        role: 'Growth and marketing',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_growth_5163e429b4.png',
        copy: 'Settle which shade of blue wins, with data.',
    },
    {
        role: 'Data analysts',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_analyst_8bd707c7bf.png',
        copy: 'Teammates ask it their "quick questions" instead of you.',
    },
]

const quotes = [
    { customer: 'exa', author: 'liam_hinzman' },
    { customer: 'rayfit', author: 'alan_yang' },
    { customer: 'supabase', author: 'aleksi_immonen' },
]

type FaqEntry = { question: string; answer: string; link?: { label: string; to: string } }

// Free allocation and credit price, read from billing data so the copy follows the price list
type Pricing = { freeCredits: number; creditPrice: number }

const formatUSD = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

const costAnswer = (pricing: Pricing | null) =>
    pricing
        ? `Every organization gets ${pricing.freeCredits.toLocaleString()} free credits each month, worth ${formatUSD(
              pricing.freeCredits * pricing.creditPrice
          )}. After that, ${Math.round(1 / pricing.creditPrice)} credits cost $1. `
        : 'Every organization gets free credits each month, and you pay for what you use after that. '

// Answers are plain text so the same array feeds the accordion and the FAQPage structured data
const buildFaq = (pricing: Pricing | null): FaqEntry[] => [
    {
        question: 'How much does PostHog AI cost?',
        answer: `${costAnswer(
            pricing
        )}We charge the LLM provider's cost plus 20%, and you see the cost live as you work. Questions about how to use PostHog are free.`,
        link: { label: 'PostHog AI pricing', to: '/docs/posthog-ai/pricing' },
    },
    {
        question: 'Can I cap what I spend?',
        answer: 'Yes. PostHog sets a default billing limit of $150, and you can set your own. When you reach it, AI features pause until your credits reset at the start of the next billing period.',
    },
    {
        question: 'What data can PostHog AI read?',
        answer: "Events, persons, sessions, groups, actions, cohorts, event and property definitions, your data warehouse schema, and your saved insights and dashboards. It respects your project's access controls, so it only sees what you can see.",
        link: { label: 'Access control', to: '/docs/settings/access-control' },
    },
    {
        question: 'Is my data shared with third parties?',
        answer: 'PostHog AI runs on models from Anthropic, OpenAI, and Google, so your messages and the data the agent reads pass through them. Azure powers semantic search across PostHog and can see your actions and cohorts.',
        link: { label: 'Subprocessors', to: '/subprocessors' },
    },
    {
        question: 'Do the AI providers train on my data?',
        answer: "No. Our DPA prohibits subprocessors from using your data to train, fine-tune, or develop their models. PostHog trains its own models on anonymized data. That's a separate setting, and an organization admin can turn it off.",
        link: { label: 'PostHog AI FAQ', to: '/docs/posthog-ai/faq' },
    },
    {
        question: 'What is the difference between PostHog AI and a scout?',
        answer: 'You ask PostHog AI a question, and it answers now. A scout is a job that runs on a schedule with the same data and tools, and it only reports when it finds something worth your attention.',
        link: { label: 'Scouts', to: '/docs/self-driving/scouts' },
    },
    {
        question: 'Why does the first reply take a few seconds?',
        answer: 'Each conversation starts its own cloud sandbox, and the agent starts work when the sandbox is ready.',
    },
    {
        question: 'How do I turn PostHog AI off?',
        answer: 'An organization admin can turn off PostHog AI data analysis in Settings > Organization > General. When it is off, no data goes to AI providers. You can turn it back on at any time, and your chat history stays.',
    },
    {
        question: 'Can I self-host PostHog AI or use my own models?',
        answer: 'No. PostHog AI only runs in PostHog Cloud, and PostHog picks the most efficient model for each task.',
    },
]

const faqItems = (faq: FaqEntry[]) =>
    faq.map(({ question, answer, link }) => ({
        trigger: question,
        content: (
            <>
                <p>{answer}</p>
                {link && (
                    <p>
                        <Link
                            to={link.to}
                            state={{ newWindow: true }}
                            className="text-red dark:text-yellow font-semibold hover:underline"
                        >
                            {link.label}
                        </Link>
                    </p>
                )}
            </>
        ),
    }))

const HeroSection = () => (
    <section className="not-prose w-full tracking-[-0.0125em]">
        <div className="flex flex-col-reverse items-center gap-6 @3xl/reader-content:flex-row @3xl/reader-content:gap-10">
            <div className="flex-1">
                <h1 className="!mt-0 mb-4 text-2xl font-bold leading-tight @xl/reader-content:text-4xl">
                    The AI agent that already has <Highlight>your data</Highlight>
                </h1>
                <p className="mt-0 mb-4 text-lg">
                    It has read every event, recording, error, and log you've sent PostHog, plus the Stripe tables you
                    synced and forgot about. Ask it anything. The reading is done.
                </p>
                <ul className="mb-6 list-none space-y-0.5 p-0 text-base">
                    {heroBullets.map((item) => (
                        <li key={item} className="relative pl-5">
                            <IconCheck className="absolute left-0 top-1 size-4 text-green" />
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="flex flex-wrap items-center gap-3">
                    <CallToAction to={SIGNUP_URL} size="sm" externalNoIcon>
                        Get started – free
                    </CallToAction>
                    <span className="text-sm text-secondary">
                        Using PostHog?{' '}
                        <Link to={APP_AI_URL} external>
                            Open PostHog AI
                        </Link>
                    </span>
                </div>
            </div>
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/context_hog_32f1181f4a.png"
                alt="A hedgehog floating in a ring of dashboards, charts, maps, and logs"
                className="w-full max-w-72 shrink-0 @3xl/reader-content:max-w-sm"
                imgClassName="w-full"
            />
        </div>
    </section>
)

const ContextLayerSection = () => (
    <>
        <h3>
            The context layer: <Highlight>all of it</Highlight>, in one place
        </h3>
        <p>
            Your product data and your business data live in the same PostHog project, so one question can cross both:
            "Which errors hit Enterprise customers the week before they churned?" That one answer reads events, errors,
            Stripe, and HubSpot.
        </p>
        <div className="not-prose grid gap-3 my-6 @md/reader-content:grid-cols-2">
            <div className="rounded-md border border-primary bg-primary p-4">
                <p className="m-0 text-sm font-bold text-primary">Captured by PostHog</p>
                <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-x-3 gap-y-1.5 p-0 text-sm">
                    {capturedData.map((item) => (
                        <li key={item} className="relative pl-5">
                            <IconCheck className="absolute left-0 top-0.5 size-4 text-green" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="rounded-md border border-primary bg-primary p-4">
                <p className="m-0 text-sm font-bold text-primary">Synced from the rest of your stack</p>
                <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-x-3 gap-y-1.5 p-0 text-sm">
                    {syncedSources.map(({ key, name }) => (
                        <li key={key} className="flex items-center gap-2">
                            <img src={LOGOS[key]} alt="" aria-hidden className="size-4 shrink-0 object-contain" />
                            {name}
                        </li>
                    ))}
                </ul>
                <Link
                    to="/context-warehouse/sources"
                    state={{ newWindow: true }}
                    className="mt-3 inline-block text-sm font-semibold"
                >
                    See every source
                </Link>
            </div>
        </div>
    </>
)

const SemanticLayerSection = () => (
    <>
        <h3>
            The semantic layer: <Highlight>one MRR</Highlight>, not three
        </h3>
        <p>
            Ask three AI tools "what's our MRR?" and you get three queries and three numbers. The semantic layer stores
            what your metrics mean, so every agent and every human gets the same number.
        </p>
        <div className="not-prose grid gap-3 my-6 @md/reader-content:grid-cols-3">
            {semanticFacts.map(({ title, copy }) => (
                <div key={title} className="rounded-md border border-primary bg-primary p-4">
                    <p className="m-0 text-base font-bold text-primary">{title}</p>
                    <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                </div>
            ))}
        </div>
        <p>
            Agents can propose all the definitions they like. Only a human makes one official, by typing{' '}
            <code>confirm</code>.{' '}
            <Link to="/docs/semantic-layer" state={{ newWindow: true }}>
                How the semantic layer works
            </Link>
        </p>
    </>
)

export default function PostHogAIPage(): JSX.Element {
    const posthogAI = useProduct({ handle: 'posthog_ai' }) as {
        seo: { title: string; description: string }
        freeLimit?: number
        startsAt?: string
    }
    const { title, description } = posthogAI.seo
    const pricing: Pricing | null =
        posthogAI.freeLimit && posthogAI.startsAt
            ? { freeCredits: posthogAI.freeLimit, creditPrice: Number(posthogAI.startsAt) }
            : null
    const faq = buildFaq(pricing)

    return (
        <>
            <SEO
                title={title}
                description={description}
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog AI',
                    description,
                    slug: 'ai',
                    faq: faq.map(({ question, answer }) => ({ question, answer })),
                })}
            />
            <ReaderView hideLeftSidebar showQuestions={false} title="posthog-ai.md" hideTitle>
                <div className="max-w-4xl mx-auto">
                    <HeroSection />
                    <hr className="border-t border-primary m-0 mb-6 mt-8" />

                    <ContextLayerSection />

                    <SemanticLayerSection />

                    <PromptsSection />

                    <div className="not-prose my-10">
                        <SlicedHog
                            className="mx-auto max-w-md"
                            label="A hedgehog that opens into slices of data, with a brain at the back"
                        />
                        <p className="m-0 mt-2 text-center text-sm text-secondary">
                            Every hog has layers. (Click to put it back together.)
                        </p>
                    </div>

                    <h3>
                        One agent, <Highlight>every surface</Highlight>
                    </h3>
                    <p>Same tools, same data, four places to bother it.</p>
                    <div className="not-prose my-6">
                        <TabbedCarousel tabs={surfaceTabs} />
                    </div>

                    <HeadlessSection />

                    <ScoutsSection />

                    <h3>
                        What it does for <Highlight>you</Highlight>
                    </h3>
                    <div className="not-prose grid grid-cols-2 gap-3 my-6 @2xl/reader-content:grid-cols-5">
                        {personas.map(({ role, image, copy }) => (
                            <div
                                key={role}
                                className="flex flex-col overflow-hidden rounded-md border border-primary bg-primary"
                            >
                                <div className="p-3">
                                    <p className="m-0 text-sm font-bold text-primary">{role}</p>
                                    <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                </div>
                                <CloudinaryImage src={image} alt="" className="mt-auto px-4" imgClassName="w-full" />
                            </div>
                        ))}
                    </div>

                    <h3>What customers say</h3>
                    <div className="not-prose grid gap-4 my-6 items-start @2xl/reader-content:grid-cols-3">
                        {quotes.map(({ customer, author }) => (
                            <OSQuote key={customer} customer={customer} author={author} product="posthog_ai" />
                        ))}
                    </div>

                    <div
                        id="try"
                        className="not-prose bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6"
                    >
                        <div className="grid @lg/reader-content:grid-cols-[1fr_180px] gap-6 items-center">
                            <div>
                                <h3 className="mt-0 mb-2 text-2xl font-bold">Try it</h3>
                                <p className="mt-0 mb-4">
                                    It comes with every PostHog account, plus{' '}
                                    {pricing
                                        ? `${pricing.freeCredits.toLocaleString()} free credits a month`
                                        : 'free credits every month'}
                                    . Start with the question you've been too embarrassed to ask your data team. It
                                    won't tell.
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <CallToAction to={SIGNUP_URL} size="sm" externalNoIcon>
                                        Get started – free
                                    </CallToAction>
                                    <span className="text-sm text-secondary">
                                        Using PostHog?{' '}
                                        <Link to={APP_AI_URL} external>
                                            Open PostHog AI
                                        </Link>
                                    </span>
                                </div>
                            </div>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/bike_racing_hog_865f022a73.png"
                                alt="A hedgehog racing a bike with flames behind the wheels"
                                className="hidden @lg/reader-content:block"
                                imgClassName="w-full"
                            />
                        </div>
                    </div>

                    <h3>FAQ</h3>
                    <div className="not-prose mt-4">
                        <Accordion
                            type="multiple"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={faqItems(faq)}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
