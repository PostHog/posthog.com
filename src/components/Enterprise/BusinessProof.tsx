import React, { useState } from 'react'
import { Tabs } from 'radix-ui'
import { IconSend } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Link from 'components/Link'

/** Source-backed enterprise proof. Keep the claims and links intact. */

type Point = {
    title: string
    detail: string
    /** Where to read more. Internal paths open in a new window. */
    href?: string
}

type Pillar = {
    key: string
    title: string
    lead: string
    points: Point[]
}

const PILLARS: Pillar[] = [
    {
        key: 'compliance',
        title: 'Compliance',
        lead: 'Keeping regulators happy since 2020. PostHog is GDPR, HIPAA, and CCPA compliant.',
        points: [
            {
                title: 'US or EU Cloud',
                detail: 'Choose where your data is stored when you sign up: the US or Frankfurt, Germany.',
                href: '/docs/privacy/data-storage',
            },
            {
                title: 'GDPR with a self-service DPA',
                detail: 'PostHog is the processor, you are the controller. Generate, sign, and download your DPA in minutes.',
                href: '/dpa',
            },
            {
                title: 'HIPAA-ready with a BAA',
                detail: 'A standard BAA on Boost, Scale, and Enterprise, generated in the app. Custom BAAs on Enterprise.',
                href: '/docs/privacy/hipaa-compliance',
            },
            {
                title: 'Consent-first capture',
                detail: 'Start every visitor opted out, then opt them in from your consent manager. Nothing is sent until then.',
                href: '/docs/privacy/data-collection',
            },
            {
                title: 'IP capture controls',
                detail: 'Turn off IP storage per project or across the whole organization.',
                href: '/docs/privacy/data-collection',
            },
            {
                title: 'Data deletion',
                detail: 'Delete a person, their events, and their recordings on request, from the UI or the API.',
                href: '/docs/privacy/data-storage',
            },
        ],
    },
    {
        key: 'security',
        title: 'Security',
        lead: "We try to break our product so you don't have to. We publicly publish our findings and security advisories and give you fine-grained controls to protect your data.",
        points: [
            {
                title: 'SOC 2 Type 2',
                detail: 'Audited every year by an external firm. The latest report is public and available via the link above.',
                href: '/handbook/company/security#soc-2',
            },
            {
                title: 'Annual third-party penetration testing',
                detail: 'Plus a public vulnerability disclosure program. Reports are available in the Trust Center.',
                href: 'https://trust.posthog.com',
            },
            {
                title: 'SSO and 2FA enforcement, SAML, and SCIM',
                detail: 'Enforce SSO and 2FA for the whole organization. Add SAML on Scale and SCIM provisioning on Enterprise.',
                href: '/platform-packages',
            },
            {
                title: 'Role-based and property-level access',
                detail: 'Custom roles across projects and resources, and access control down to individual event and person properties.',
                href: '/docs/settings/access-control',
            },
            {
                title: 'Activity logs you can ship to your SIEM',
                detail: 'Who changed what, when, and the before and after. Retained for up to 60 months on Enterprise.',
                href: '/docs/settings/activity-logs/siem',
            },
            {
                title: 'Public security advisories',
                detail: 'We publish advisories and CVEs, and we contact affected users directly.',
                href: '/handbook/company/security-advisories',
            },
        ],
    },
    {
        key: 'scalability',
        title: 'Scalability',
        lead: "Love vendor lock-in? Yeah, we don't either. We're building a platform that scales with your business, not the other way around.",
        points: [
            {
                title: 'Sync from your warehouse',
                detail: 'Pull tables from Snowflake, BigQuery, Redshift, Postgres, MySQL, SQL Server, ClickHouse, Databricks, and object storage.',
                href: '/docs/cdp/sources',
            },
            {
                title: 'Export back out',
                detail: 'Batch exports to S3, Snowflake, BigQuery, Redshift, Postgres, Databricks, and Azure Blob. Realtime destinations for everything else.',
                href: '/docs/cdp/batch-exports',
            },
            {
                title: 'No rate limit on capture',
                detail: 'Public capture endpoints are not rate limited, and every official SDK batches and sends asynchronously.',
                href: '/docs/api',
            },
            {
                title: 'Managed migrations',
                detail: 'Import history from Amplitude and Mixpanel directly, or from S3 for anything else. Historical imports are free.',
                href: '/docs/migrate',
            },
            {
                title: 'Unlimited projects, long retention',
                detail: 'Separate projects per environment or business unit, and up to 60 months of replay retention on Enterprise.',
                href: '/platform-packages',
            },
            {
                title: 'Case study: AssemblyAI',
                detail: 'Moved millions of events a day to PostHog and stopped throttling ingestion.',
                href: '/customers/assemblyai',
            },
        ],
    },
    {
        key: 'trust',
        title: 'Trust',
        lead: 'We work in public, on purpose. You can read how the product is built, how the company runs, and how it is doing.',
        points: [
            {
                title: 'Open source',
                detail: 'The core is MIT-licensed and on GitHub. Read the code your data runs through, or have an agent do it for you.',
                href: 'https://github.com/posthog/posthog',
            },
            {
                title: 'Transparent by default',
                detail: "Our handbook, roadmap, pricing, and how we pay people are all public. We're proud of what we do and we want you to be too.",
                href: '/handbook/values#make-it-public',
            },
            {
                title: 'Pricing you can compute',
                detail: 'Every product is priced on the website by usage with publicly available rates. Enterprise adds controls and support without changes to usage-based pricing.',
                href: '/pricing',
            },
            {
                title: 'Your data stays yours',
                detail: 'You own the data you send to PostHog. We process it on your behalf and never sell it to third parties.',
                href: '/handbook/company/security#overview',
            },
            {
                title: 'Public incident reviews',
                detail: 'We publish detailed reviews of significant incidents, including root causes, customer impact, and concrete fixes.',
                href: '/handbook/company/post-mortems',
            },
            {
                title: 'Proven in production',
                detail: "ResearchGate replaced its in-house experimentation tools with PostHog after evaluating multiple providers. Read the engineering team's experience.",
                href: '/customers/researchgate',
            },
        ],
    },
    {
        key: 'support',
        title: 'Support',
        lead: 'You can listen to hold music on your own time. Enterprise gives you a named human and engineers within reach when you need them.',
        points: [
            {
                title: 'Dedicated account manager',
                detail: 'One person who knows your setup, your contract, and your roadmap.',
                href: '/platform-packages',
            },
            {
                title: 'Priority support, 8-hour target response',
                detail: 'On Enterprise. Scale customers get a 24-hour target.',
                href: '/platform-packages',
            },
            {
                title: 'A shared Slack channel',
                detail: 'Talk to the engineers who build the product, in a private channel with your team.',
                href: '/docs/support-options',
            },
            {
                title: 'Ongoing training',
                detail: 'Sessions for new teams and new products as your usage grows.',
                href: '/platform-packages',
            },
            {
                title: 'Forward-deployed engineers',
                detail: 'A paid, scoped engagement: we send an engineer to migrate, instrument, integrate, and train alongside your team.',
                href: '/services',
            },
        ],
    },
]

/** Links that a security or procurement team can work through without talking to anyone. */
const RESOURCES = [
    { label: 'Trust Center', href: 'https://trust.posthog.com', note: 'Reports, policies, and certifications' },
    { label: 'SOC 2 report', href: '/security/soc2-report-2026.pdf', note: 'The current audit, in full' },
    { label: 'Security handbook', href: '/handbook/company/security', note: 'How we run security' },
    { label: 'Privacy and compliance docs', href: '/docs/privacy', note: 'GDPR, HIPAA, CCPA, data storage' },
    { label: 'Data processing agreement', href: '/dpa', note: 'Generate and sign yourself' },
    { label: 'Business associate agreement', href: '/baa', note: 'For HIPAA customers' },
    { label: 'Platform packages', href: '/platform-packages', note: 'What Boost, Scale, and Enterprise include' },
    { label: 'Customer stories', href: '/customers', note: 'Who runs on PostHog, and how' },
]

const isExternal = (href: string) => href.startsWith('http')

/** One point, set inline: the linked title in the accent, a colon, then the detail. */
function PointItem({ point }: { point: Point }): JSX.Element {
    const title = point.href ? (
        <Link
            to={point.href}
            state={isExternal(point.href) ? undefined : { newWindow: true }}
            externalNoIcon={isExternal(point.href)}
            className="font-semibold text-red underline dark:text-yellow"
        >
            {point.title}
        </Link>
    ) : (
        <span className="font-semibold text-primary">{point.title}</span>
    )
    return (
        <li className="text-sm leading-snug text-secondary @2xl:text-base">
            {title}
            <span className="text-primary">: </span>
            {point.detail}
        </li>
    )
}

/** All panels share a grid cell, so changing tabs never moves the building or content below. */
export function BusinessProof(): JSX.Element {
    const [active, setActive] = useState(PILLARS[0].key)

    return (
        <section className="relative flex flex-1 flex-col py-10 @3xl:py-[calc(2.5rem+10%)]">
            <h2 className="relative z-30 m-0 mb-6 flex flex-wrap items-center gap-x-3 text-2xl font-bold tracking-tight @3xl:pr-[28%]">
                Not convinced? Check out these five corporate buzzwords.
            </h2>
            <Tabs.Root
                value={active}
                onValueChange={setActive}
                orientation="vertical"
                activationMode="manual"
                className="relative grid flex-1 grid-cols-[2.75rem_minmax(0,1fr)] @xl:grid-cols-[3.5rem_minmax(0,1fr)]"
            >
                <Tabs.List aria-label="Why enterprises choose PostHog" className="flex flex-col self-stretch py-3">
                    {PILLARS.map((pillar, i) => (
                        <Tabs.Trigger
                            key={pillar.key}
                            value={pillar.key}
                            aria-label={`${i + 1}. ${pillar.title}`}
                            className={`relative min-h-16 flex-1 rounded-l-xl text-lg font-semibold outline-none focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-red dark:focus-visible:ring-yellow ${
                                active === pillar.key
                                    ? 'z-10 bg-primary text-primary'
                                    : 'bg-accent text-secondary shadow-inner hover:text-primary'
                            }`}
                        >
                            {i + 1}.
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                <div className="grid min-w-0 rounded-xl bg-primary shadow-xl @3xl:pr-[30%]">
                    {PILLARS.map((pillar) => (
                        <Tabs.Content
                            key={pillar.key}
                            value={pillar.key}
                            forceMount
                            className={`col-start-1 row-start-1 min-w-0 p-5 outline-none focus-visible:ring-2 focus-visible:ring-red @xl:p-7 ${
                                pillar.key === active ? 'visible' : 'invisible'
                            }`}
                        >
                            <div className="grid items-start gap-3 border-b border-primary pb-5 @4xl:grid-cols-[auto_minmax(0,1fr)] @4xl:gap-6">
                                <h3 className="m-0 text-2xl font-bold tracking-tight @4xl:text-3xl">
                                    <span className="rounded bg-blue/10 px-1 text-blue dark:text-yellow dark:bg-yellow/10">
                                        {pillar.title}
                                    </span>
                                </h3>
                                <p className="m-0 text-base leading-snug text-secondary">{pillar.lead}</p>
                            </div>
                            <ul className="m-0 grid list-none gap-x-7 gap-y-6 p-0 pt-6 @2xl:grid-cols-2">
                                {pillar.points.map((point) => (
                                    <PointItem key={point.title} point={point} />
                                ))}
                            </ul>
                        </Tabs.Content>
                    ))}
                </div>
            </Tabs.Root>
        </section>
    )
}

/** An unboxed sales introduction sits beside the end of the middle stack. */
export function WorkWithUs(): JSX.Element {
    return (
        <section className="relative z-10 pb-8 pt-4 @3xl:pr-[36%]">
            <h2 className="m-0 text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">
                Want your business to use PostHog?
            </h2>
            <p className="mb-0 mt-4 max-w-3xl text-pretty text-base text-secondary @2xl:text-lg">
                <em>Believe it or not, so do we!</em>{' '}
                <Link
                    to="/talk-to-a-human"
                    state={{ newWindow: true }}
                    className="font-semibold text-red underline dark:text-yellow"
                >
                    Set up a meeting
                </Link>{' '}
                with our sales team and we'll work out how to make it happen.
            </p>
        </section>
    )
}

/** Public resources presented as an email, with ordinary website links. */
const EMAIL = {
    subject: 'Urgent strategic alignment on PostHog',
    greeting: 'Good morning CISO,',
    intro: 'I hope your morning is off to an exceptionally productive start. I am writing to bring a matter of urgent strategic importance to your attention: the potential adoption of PostHog. To facilitate a comprehensive, cross-functional assessment of this opportunity, I have proactively consolidated the following documentation into a single, conveniently actionable correspondence.',
    signOff: 'Kind regards,',
    sender: 'Your proactively aligned colleague',
    footer: '(Sent using Microsoft Outlook 2007)',
}

// These families are already registered globally in components/Layout/Fonts.css.
const EMAIL_FONTS = ['RoundHog', 'Charter', 'Fairytale', 'Computer Modern', 'Squeak']
const EMAIL_FONT_SIZES = [12, 14, 16, 18, 20, 24]

export function BuyerResources(): JSX.Element {
    const [fontFamily, setFontFamily] = useState(EMAIL_FONTS[0])
    const [fontSize, setFontSize] = useState(14)
    const body = [
        EMAIL.greeting,
        EMAIL.intro,
        ...RESOURCES.map(
            (resource) => `${resource.label} — ${resource.note}\n${new URL(resource.href, 'https://posthog.com').href}`
        ),
        `${EMAIL.signOff}\n${EMAIL.sender}`,
        EMAIL.footer,
    ].join('\n\n')
    const draftUrl = `mailto:?subject=${encodeURIComponent(EMAIL.subject)}&body=${encodeURIComponent(body)}`
    return (
        <section>
            <article aria-label="Email to your CISO" className="rounded-md border border-primary bg-primary shadow-xl">
                <header className="rounded-t-md border-b border-primary bg-accent font-[Tahoma,Arial,sans-serif]">
                    <div className="rounded-t-md border-b border-primary bg-primary px-4 py-2 text-xs font-bold @3xl:pr-[32%]">
                        Message (HTML)
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-primary px-4 py-3">
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            <select
                                aria-label="Email font"
                                value={fontFamily}
                                onChange={(event) => setFontFamily(event.target.value)}
                                className="max-w-full rounded-none border border-primary bg-primary py-1 pl-2 pr-7 text-xs leading-4 text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                            >
                                {EMAIL_FONTS.map((font) => (
                                    <option key={font} value={font}>
                                        {font}
                                    </option>
                                ))}
                            </select>
                            <select
                                aria-label="Email font size (px)"
                                value={fontSize}
                                onChange={(event) => setFontSize(Number(event.target.value))}
                                className="rounded-none border border-primary bg-primary py-1 pl-2 pr-7 text-xs leading-4 text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                            >
                                {EMAIL_FONT_SIZES.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            {/* The remaining formatting marks are decorative. */}
                            <span aria-hidden="true" className="flex gap-4 border-x border-primary px-3 text-sm">
                                <b>B</b>
                                <i>I</i>
                                <u>U</u>
                            </span>
                            <span aria-hidden="true" className="hidden items-center gap-2 @xl:flex">
                                <span className="font-bold text-red dark:text-yellow">!</span> High importance
                            </span>
                        </div>
                        <div className="ml-auto shrink-0">
                            <OSButton
                                asLink
                                to={draftUrl}
                                variant="secondary"
                                size="md"
                                icon={<IconSend className="size-4" />}
                                title="Open this draft in your email app"
                                aria-label="Send — open a draft in your email app"
                            >
                                Send
                            </OSButton>
                        </div>
                    </div>
                    <dl className="m-0 grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 px-5 py-3 text-sm @xl:px-8">
                        <dt className="text-secondary">To:</dt>
                        <dd className="m-0 border-b border-primary py-2">CISO</dd>
                        <dt className="text-secondary">Subject:</dt>
                        <dd className="m-0 border-b border-primary py-2 font-semibold">{EMAIL.subject}</dd>
                    </dl>
                </header>
                <div
                    className="break-words px-5 py-6 leading-relaxed @xl:px-8"
                    style={{ fontFamily: `"${fontFamily}"`, fontSize }}
                >
                    <p className="m-0">{EMAIL.greeting}</p>
                    <p className="mb-0 mt-4">{EMAIL.intro}</p>
                    <ul className="m-0 my-6 grid list-none gap-x-6 gap-y-5 border-y border-primary py-6 pl-0 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
                        {RESOURCES.map((r) => (
                            <li key={r.href}>
                                <Link
                                    to={r.href}
                                    state={isExternal(r.href) ? undefined : { newWindow: true }}
                                    externalNoIcon={isExternal(r.href)}
                                    className="block rounded-sm !no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                                >
                                    <span className="block font-semibold text-red underline underline-offset-2 dark:text-yellow">
                                        {r.label}
                                    </span>
                                    <span className="block text-secondary">{r.note}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="m-0">
                        {EMAIL.signOff}
                        <br />
                        {EMAIL.sender}
                    </p>
                    <p className="mb-0 mt-3 text-[0.857em] text-secondary">{EMAIL.footer}</p>
                </div>
            </article>
        </section>
    )
}
