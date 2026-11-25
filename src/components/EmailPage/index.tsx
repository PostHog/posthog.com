import React, { useEffect } from 'react'
import ToolsTicker from 'components/Home/ToolsTicker'
import { destinations } from './destinations.data'
import { motion, useReducedMotion } from 'framer-motion'
import SlotMachineText from 'components/SlotMachineText'
import posthogIcon from '../../images/posthog-icon-white.svg'
import Link from 'components/Link'
import {
    IconBolt,
    IconBook,
    IconPiggyBank,
    IconCheck,
    IconCalendar,
    IconCode,
    IconCopy,
    IconFilter,
    IconMessage,
    IconPeople,
    IconRewindPlay,
    IconServer,
    IconShieldPeople,
    IconSparkles,
    IconWarning,
    IconWebhooks,
} from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import OSButton from 'components/OSButton'
import Highlight from 'components/MCPPage/Highlight'
import { CalendarBlock, CanvasBlock, SendBlock } from './Widgets'
import { EditorBlock } from './EditorBlock'
import { MetricsBlock } from './MetricsBlock'
import PromptDemo from 'components/MCPPage/PromptDemo'
import CustomerLogo from 'components/CustomerLogo'
import { CardStackCarousel } from 'components/CardStackCarousel'
import { useCustomers, Customer } from 'hooks/useCustomers'
import PlatformInstall, { wizardInstallSchema } from 'components/PlatformInstall'
import MCPInstallCTA from 'components/MCPInstallCTA'
import { emailFlows } from './agentDemo.data'

function Intro({ title, children }: { title: React.ReactNode; children: React.ReactNode }): JSX.Element {
    return (
        <div className="max-w-2xl">
            <h2 className="!mt-0 mb-2 text-2xl font-bold leading-tight @xl/reader-content:text-3xl">{title}</h2>
            <p className="m-0 text-base text-secondary @xl/reader-content:text-lg">{children}</p>
        </div>
    )
}

function StartButtons(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-2">
            <OSButton asLink to="https://app.posthog.com/signup" variant="primary" size="md">
                Start – it's free
            </OSButton>
            <OSButton asLink to="/talk-to-a-human" variant="secondary" size="md">
                Talk to a human
            </OSButton>
        </div>
    )
}

const triggers = [
    { Icon: IconBolt, label: 'Any event' },
    { Icon: IconPeople, label: 'Joins a cohort' },
    { Icon: IconCalendar, label: 'On a schedule' },
    { Icon: IconWebhooks, label: 'Webhook' },
    { Icon: IconSparkles, label: 'Survey response' },
    { Icon: IconMessage, label: 'Slack message' },
]

const features = [
    {
        Icon: IconServer,
        title: 'No IP address to warm up',
        body: 'Email goes out over shared Amazon SES IP addresses with a good reputation, so you can send at full volume on day one.',
        to: '/docs/workflows/sending-reputation',
    },
    {
        Icon: IconShieldPeople,
        title: 'Keep your domain reputation',
        body: 'Send from your own domain with SPF and DKIM, and set it up next to your old provider before you switch.',
        to: '/docs/workflows/sending-reputation#move-from-another-provider',
    },
    {
        Icon: IconBolt,
        title: 'Transactional email never waits',
        body: 'Password resets and receipts go out at once, even when your daily allowance for marketing email is used up.',
        to: '/docs/workflows/sending-reputation',
    },
    {
        Icon: IconFilter,
        title: 'Opt-out categories',
        body: 'People can turn off your newsletter and still get their password reset. Each category gets its own toggle on the preferences page.',
        to: '/docs/workflows/opt-outs',
    },
    {
        Icon: IconWarning,
        title: 'Automatic suppression list',
        body: 'Bounces and spam reports stop future sends to that address on their own. No automation step can skip the check.',
        to: '/docs/workflows/opt-outs',
    },
    {
        Icon: IconCalendar,
        title: 'Frequency cap',
        body: 'Set how many marketing messages one person can get in a window of days, counted across email, SMS, and push.',
        to: '/docs/workflows/frequency-cap',
    },
    {
        Icon: IconCode,
        title: 'Bring your React Email templates',
        body: 'Keep writing emails as React components, and pass them straight to the Node.js SDK.',
        to: '/docs/workflows/transactional-emails/react-email',
    },
    {
        Icon: IconSparkles,
        title: 'Write emails with PostHog AI',
        body: 'Describe the email, its audience, and its tone, and PostHog AI writes the content and the layout.',
        to: '/docs/workflows/create-emails-ai',
    },
    {
        Icon: IconRewindPlay,
        title: 'Automations that watch the replay',
        body: 'A Replay Vision step watches the session behind the trigger, so the next email can depend on what the person actually did.',
        to: '/docs/workflows/replay-vision',
    },
]

// The providers that the MCP's provider-imports tools can move a team from.
const providers = ['Resend', 'Postmark', 'SendGrid', 'Mailgun', 'Mailchimp', 'Customer.io']

function SwitchPrompt(): JSX.Element {
    const [provider, setProvider] = React.useState(providers[0])
    const [copied, setCopied] = React.useState(false)
    const prompt = `Move our email from ${provider} to PostHog.`
    return (
        <div>
            <div className="mb-2 flex flex-wrap gap-1.5">
                {providers.map((p) => (
                    <button
                        key={p}
                        type="button"
                        aria-pressed={provider === p}
                        onClick={() => {
                            setProvider(p)
                            setCopied(false)
                        }}
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            provider === p ? 'border-red bg-red text-white' : 'border-primary text-secondary'
                        }`}
                    >
                        {p}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-2 rounded-md border border-primary bg-accent px-3 py-2">
                <span className="flex-1 font-code text-sm">“{prompt}”</span>
                <OSButton
                    size="sm"
                    icon={<IconCopy />}
                    onClick={() => navigator.clipboard?.writeText(prompt).then(() => setCopied(true))}
                >
                    {copied ? 'Copied' : 'Copy'}
                </OSButton>
            </div>
        </div>
    )
}

const seoTitle = 'PostHog Messaging – Send email from your code, see what happens next'
const seoDescription =
    'Transactional email from your backend, plus broadcasts and automations, next to your product analytics, session replays, and revenue.'

type Quote = {
    name: string
    role: string
    text: string
    avatar?: string
    customer?: Customer
}

// Draft: only the Grantable and Croissant quotes are published. Joe's is from #team-workflows and needs his OK.
const joeQuote: Quote = {
    name: 'Joe Black',
    role: 'Chaos Marketer, PostHog',
    avatar: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1781263362/Portrait_1_1_5d4e6711d2.png',
    text: 'Building and documenting this was (excuse my French) un putain de bonheur absolu. Working with the AI and the MCP just made it sublime, from helping me parse Liquid code to triggering sends and updating the issue. Loved it. 10/10. Would onboard again.',
}

function QuoteCard({ quote, isActive }: { quote: Quote; isActive: boolean }): JSX.Element {
    return (
        <figure className="m-0 flex h-full w-full flex-col justify-between gap-4 rounded-2xl border border-primary bg-white p-5 text-left shadow-xl dark:bg-accent @md/reader-content:p-6">
            <div>
                <div className="mb-3 flex h-6 items-center">
                    {quote.customer && <CustomerLogo customer={quote.customer} className="h-6 max-w-28" />}
                </div>
                <blockquote className="m-0 border-0 p-0 text-sm not-italic leading-snug text-primary @md/reader-content:text-base">
                    &ldquo;{quote.text}&rdquo;
                </blockquote>
            </div>
            <figcaption className="flex items-center gap-3">
                {quote.avatar && (
                    <img src={quote.avatar} alt="" className="size-10 shrink-0 rounded-full bg-accent object-cover" />
                )}
                <span className="min-w-0 text-sm">
                    <strong className="block text-primary">{quote.name}</strong>
                    <span className="text-secondary">{quote.role}</span>
                    {quote.customer && (
                        <Link
                            to={`/customers/${quote.customer.slug}`}
                            tabIndex={isActive ? 0 : -1}
                            className="block font-semibold text-red"
                        >
                            Read the story →
                        </Link>
                    )}
                </span>
            </figcaption>
        </figure>
    )
}

function Testimonials(): JSX.Element {
    const { getCustomer } = useCustomers()
    const published = (slug: string, author: string): Quote | undefined => {
        const customer = getCustomer(slug)
        const person = customer?.quotes?.[author]
        const text = person?.products?.workflows
        return customer && person && text
            ? {
                  name: person.name,
                  role: `${person.role}, ${customer.name}`,
                  text,
                  avatar: person.image?.thumb,
                  customer,
              }
            : undefined
    }
    const quotes = [published('grantable', 'evan_ralliss'), published('croissant', 'jorge_lopez'), joeQuote].filter(
        (q): q is Quote => !!q
    )
    return (
        <section className="not-prose flex flex-col gap-4">
            <h2 className="m-0 text-balance text-center text-2xl font-bold leading-tight text-primary @xl/reader-content:text-3xl">
                One tool for your analytics and your email
            </h2>
            <CardStackCarousel
                count={quotes.length}
                ariaLabel="What people say about PostHog Messaging"
                framed={false}
                showCounter={false}
                stageClassName="h-[330px]"
                renderCard={(index, { isActive }) => <QuoteCard quote={quotes[index]} isActive={isActive} />}
            />
        </section>
    )
}

// Every destination can be a step in an automation.
const destinationItems = destinations.map(({ name, icon }) => ({
    handle: name,
    name,
    Icon: ({ className }: { className?: string }) => (
        <img src={icon} alt="" className={`${className} rounded-sm object-contain`} />
    ),
}))

export default function EmailPage(): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const reducedMotion = useReducedMotion()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Messaging')
        }
    }, [])

    return (
        <>
            <SEO title={seoTitle} description={seoDescription} image="/images/og/default.png" />
            <ReaderView
                title="Messaging"
                hideTitle
                hideLeftSidebar
                hideRightSidebar
                hideMarkdownActions
                proseSize="lg"
                showQuestions={false}
            >
                <div className="flex w-full flex-col gap-40 pb-24 @3xl/reader-content:px-4">
                    <section className="flex flex-col gap-16 pt-6 @xl/reader-content:gap-20 @xl/reader-content:pt-10">
                        <div className="grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-x-4 gap-y-5 @lg/reader-content:grid-cols-[minmax(0,1fr)_10rem] @3xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @3xl/reader-content:gap-x-10">
                            <div className="col-span-full min-w-0 border-b border-primary pb-3 @lg/reader-content:col-span-1">
                                <SlotMachineText
                                    className="text-lg font-bold tracking-tight @sm/reader-content:text-xl @xl/reader-content:text-2xl"
                                    words={[
                                        'emails from code',
                                        'password resets',
                                        'broadcasts',
                                        'marketing campaigns',
                                        'onboarding drips',
                                        'push notifications',
                                    ]}
                                    holdDuration={1600}
                                    wordClassName="text-red dark:text-yellow"
                                    prefix={
                                        <span className="inline-flex items-center gap-2">
                                            <span>Use</span>
                                            <img
                                                src={posthogIcon}
                                                alt=""
                                                aria-hidden
                                                className="size-5 rounded-md @xl/reader-content:size-6"
                                            />
                                            <span>PostHog for</span>
                                        </span>
                                    }
                                />
                            </div>
                            <div className="col-start-2 row-start-2 flex w-full flex-col items-center gap-3 @lg/reader-content:row-span-4 @lg/reader-content:row-start-1">
                                <motion.img
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/hoggie_mail_48daf2f4b4.png"
                                    alt="A hedgehog carrying a letter"
                                    className="w-full max-w-sm"
                                    animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                                    transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                                />
                                <p className="m-0 hidden text-balance text-center text-sm text-secondary @lg/reader-content:block">
                                    Your first 10,000 emails are free, every month.
                                    <br />
                                    <Link to="/pricing" className="mt-1 inline-block text-secondary hover:text-primary">
                                        <IconPiggyBank className="relative -top-px mr-1 inline-block size-4" />
                                        <span className="font-semibold underline">See pricing</span>
                                    </Link>
                                </p>
                            </div>
                            <h1 className="col-start-1 row-start-2 !m-0 min-w-0 text-4xl font-bold leading-[1.05] tracking-tight @xl/reader-content:text-6xl @4xl/reader-content:text-7xl">
                                Messaging for{' '}
                                <span className="whitespace-nowrap bg-blue/10 px-1 text-blue">product engineers</span>
                            </h1>
                            <p className="col-span-full m-0 text-lg @lg/reader-content:col-span-1 @xl/reader-content:text-xl">
                                Send email from your code, then see what happens next. Broadcasts, automations, and push
                                notifications are built in, next to your product data.
                            </p>
                            <div className="not-prose col-span-full max-w-xl @lg/reader-content:col-span-1">
                                <PlatformInstall
                                    schema={{
                                        ...wizardInstallSchema,
                                        title: 'Send your first email',
                                        supports: undefined,
                                    }}
                                    command="email"
                                    hideSecondaryAction
                                    className="!mb-0 !shadow-none"
                                />
                                <div className="mt-4 flex flex-wrap items-center gap-4">
                                    <OSButton asLink to="https://app.posthog.com/signup" variant="primary" size="md">
                                        Get started – free
                                    </OSButton>
                                    <Link to="/docs/workflows" className="text-sm text-secondary hover:text-primary">
                                        <IconBook className="relative -top-px mr-1 inline-block size-4" />
                                        <span className="font-semibold underline">Documentation</span>
                                    </Link>
                                </div>
                                <p className="m-0 mt-4 text-sm text-secondary @lg/reader-content:hidden">
                                    Your first 10,000 emails are free, every month.{' '}
                                    <Link to="/pricing" className="whitespace-nowrap text-secondary hover:text-primary">
                                        <IconPiggyBank className="relative -top-px mr-1 inline-block size-4" />
                                        <span className="font-semibold underline">See pricing</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <SendBlock
                            title={(about) => (
                                <>
                                    Email a user about <Highlight>{about}</Highlight>
                                </>
                            )}
                        />
                    </section>

                    <section className="flex flex-col gap-8">
                        <div className="grid items-end gap-6 @3xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                            <Intro title={<>Or just ask your agent</>}>
                                The PostHog MCP and its email skills let Claude Code, Cursor, or Codex move you off
                                another provider, build automations, and tell you what an email actually did. Pick a
                                prompt to watch the tool calls.
                            </Intro>
                            <div className="w-full max-w-md justify-self-end">
                                <MCPInstallCTA showDesktopLink={false} />
                            </div>
                        </div>
                        <PromptDemo flows={emailFlows} placement="messaging_page" cwd="~/hedgebox" compactOnNarrow />
                    </section>

                    <Testimonials />

                    <section className="flex flex-col gap-6">
                        <Intro title={<>Broadcasts that know who they’re for</>}>
                            Write a newsletter or an announcement, pull in anything you know about the person, and send
                            it to an audience built from your product data. Type / to add a block.
                        </Intro>
                        <EditorBlock />
                    </section>

                    <section className="flex flex-col gap-6">
                        <Intro title={<>Plan every send on one calendar</>}>
                            See every broadcast and automated email next to each other. PostHog stops you before the
                            same people get two marketing emails in two days, and finds the next day that works.
                        </Intro>
                        <CalendarBlock />
                    </section>

                    <section className="flex flex-col gap-6">
                        <Intro title={<>Automations that improve themselves</>}>
                            An automation starts when someone does something, then waits, branches, and sends email,
                            SMS, push, or Slack messages. PostHog watches how each one performs and suggests changes.
                            You approve one as a draft, publish it, and see whether it worked.
                        </Intro>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-sm font-semibold text-secondary">Triggered by</span>
                            {triggers.map(({ Icon, label }) => (
                                <span
                                    key={label}
                                    className="flex items-center gap-1.5 rounded-full border border-primary bg-white px-3 py-1 text-sm dark:bg-accent"
                                >
                                    <Icon className="size-4 text-blue" /> {label}
                                </span>
                            ))}
                        </div>
                        <CanvasBlock />
                        <ToolsTicker
                            items={destinationItems}
                            label="Send to hundreds of tools from any automation:"
                            stacked
                        />
                    </section>

                    <section className="flex flex-col gap-6">
                        <Intro title={<>See how every send actually did</>}>
                            Sends, opens, clicks, bounces, and complaints for each automation and broadcast, next to
                            what people did in your product afterwards. Hover a chart, or change the date range.
                        </Intro>
                        <MetricsBlock />
                    </section>

                    <section className="not-prose grid items-center gap-6 rounded-2xl bg-red p-6 text-white @3xl/reader-content:grid-cols-2 @xl/reader-content:p-8">
                        <div>
                            <h2 className="m-0 mb-2 text-3xl font-bold leading-tight text-white">
                                <span className="rounded bg-white/25 px-1">Warning:</span> a <em>dangerously</em> small
                                email bill
                            </h2>
                            <p className="m-0 text-lg text-white/90">
                                Your first 10,000 emails are free, every month. Then you pay per email, with no seats
                                and no contact tiers.
                            </p>
                        </div>
                        <div className="-rotate-2 rounded-xl border-4 border-black bg-white p-4 text-center text-black shadow-2xl">
                            <p className="m-0 rounded bg-red px-3 py-3 text-xl font-bold leading-snug text-white">
                                Do not pay for email until you send 10,000 a month.
                                <br />
                                Caution: resets monthly.
                            </p>
                        </div>
                    </section>

                    <section className="not-prose flex flex-col gap-8">
                        <Intro title={<>Built to land in the inbox</>}>
                            Password resets, receipts, and launch emails for teams of every size, sent from the US or
                            the EU.
                        </Intro>
                        {/* Last 30 days to Nov 24, 2026, US and EU, from the Workflows Grafana dashboards. Refresh before shipping. */}
                        <div className="grid gap-4 @xl/reader-content:grid-cols-3">
                            {[
                                {
                                    value: '10M+',
                                    label: 'emails a month',
                                    note: 'sent through PostHog in the last 30 days',
                                },
                                {
                                    value: '99.9%+',
                                    label: 'of sends go out',
                                    note: 'accepted for delivery, in the US and the EU',
                                },
                                {
                                    value: '0.2s',
                                    label: 'median time to send',
                                    note: 'from your send call to the email leaving PostHog',
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-primary bg-white p-6 shadow-lg dark:bg-accent"
                                >
                                    <p className="m-0 text-5xl font-bold tracking-tight tabular-nums">{stat.value}</p>
                                    <p className="m-0 mt-1 text-lg font-semibold">{stat.label}</p>
                                    <p className="m-0 text-sm text-secondary">{stat.note}</p>
                                </div>
                            ))}
                        </div>
                        <div className="grid items-center gap-6 rounded-2xl border border-blue bg-blue/5 p-6 @3xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @xl/reader-content:p-8">
                            <div>
                                <p className="m-0 mb-2 text-xs font-bold uppercase tracking-wider text-blue">
                                    For EU teams
                                </p>
                                <h3 className="m-0 mb-2 text-2xl font-bold">Your email never leaves the EU</h3>
                                <p className="m-0 text-secondary">
                                    Projects on{' '}
                                    <Link to="/eu" className="font-semibold underline">
                                        PostHog Cloud EU
                                    </Link>{' '}
                                    are hosted in Frankfurt and send from our EU sending account. Your contacts, events,
                                    and emails stay in the EU, next to the rest of your product data.
                                </p>
                            </div>
                            <ul className="m-0 grid list-none gap-2 p-0 text-sm">
                                {[
                                    { label: 'Hosted in Frankfurt', to: '/docs/privacy/data-storage' },
                                    { label: 'Sent from the EU', to: '/docs/workflows/sending-reputation' },
                                    { label: 'GDPR: sign our DPA', to: '/dpa' },
                                ].map((item) => (
                                    <li
                                        key={item.label}
                                        className="flex items-center gap-2 rounded-md bg-white px-3 py-2 dark:bg-accent"
                                    >
                                        <IconCheck className="size-4 shrink-0 text-blue" />
                                        <Link to={item.to} className="font-semibold">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="flex flex-col gap-10">
                        <Intro title="All the email plumbing, handled">
                            The parts of email nobody wants to build, already built.
                        </Intro>
                        <div className="not-prose grid gap-x-10 gap-y-10 @xl/reader-content:grid-cols-2 @3xl/reader-content:grid-cols-3">
                            {features.map(({ Icon, title, body, to }) => (
                                <a key={title} href={to} className="group block text-primary no-underline">
                                    <Icon className="mb-3 size-6" />
                                    <h3 className="m-0 mb-1.5 text-lg font-semibold group-hover:underline">{title}</h3>
                                    <p className="m-0 text-sm leading-relaxed text-secondary">{body}</p>
                                </a>
                            ))}
                        </div>
                        <Link to="/docs/workflows" className="not-prose text-lg font-semibold text-red">
                            And so much more &rarr;
                        </Link>
                    </section>

                    <section
                        id="switch"
                        className="not-prose grid scroll-mt-20 items-center gap-8 rounded-2xl bg-white p-6 shadow-2xl dark:bg-accent @3xl/reader-content:grid-cols-2 @xl/reader-content:p-10"
                    >
                        <div>
                            <h2 className="m-0 mb-2 text-3xl font-bold">Already sending with someone else?</h2>
                            <p className="m-0 mb-5 text-secondary">
                                Connect the PostHog MCP, then ask your agent to move you over. It imports your
                                templates, suppressions, and unsubscribes as drafts, so nothing sends until you say so.
                            </p>
                            <SwitchPrompt />
                            <div className="mt-5 flex flex-wrap gap-2">
                                <StartButtons />
                            </div>
                        </div>
                        <MCPInstallCTA showDesktopLink={false} />
                    </section>
                </div>
            </ReaderView>
        </>
    )
}
