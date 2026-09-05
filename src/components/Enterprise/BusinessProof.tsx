import React, { useState } from 'react'
import { Tabs } from 'radix-ui'
import Link from 'components/Link'
import { HedgehogStampApproved } from '@posthog/brand/hoggies'
import { Logo } from '@posthog/brand/logo'
import towerTile from '../../images/enterprise/skyscraper-tile.png'

/**
 * The five things an enterprise buyer needs to hear before they will take PostHog seriously,
 * under the title "5 reasons enterprises love PostHog": an oversized editorial index (01 Compliance …
 * 05 Support) with a detail pane beside it. The pane holds the active pillar's proof – a lead, a rule,
 * and a two-column list of points – and changes as you click (or arrow and press Enter) through the
 * index. The pane sits on top of a run of skyscraper floors, so the tower from the hero appears to
 * pass behind it on its way to the platform.
 *
 * Every point here traces to a public PostHog source (the handbook, the docs, the platform
 * package data, or a customer story). Keep it that way: no certifications we do not hold, no
 * throughput or uptime numbers we do not publish, no promises about the future. See README.md.
 */

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
        lead: 'You decide where data lives, what gets captured, and how long it stays. The paperwork is self-service.',
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
        lead: 'Audited, tested, and written down. The report and the policies are public, and the controls your security team will ask about are built in.',
        points: [
            {
                title: 'SOC 2 Type 2',
                detail: 'Audited every year by an external firm. The latest report is public, not behind a form.',
                href: '/handbook/company/security',
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
        lead: 'PostHog fits into the data platform you already have, and it keeps up when your traffic does.',
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
                title: 'Proof: AssemblyAI',
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
                detail: 'The core is MIT-licensed and on GitHub. Read the code your data runs through.',
                href: 'https://github.com/posthog/posthog',
            },
            {
                title: 'Transparent by default',
                detail: 'Our handbook, roadmap, pricing, and how we pay people are all public. It is one of our values.',
                href: '/handbook/values',
            },
            {
                title: 'Default alive',
                detail: 'We have been cashflow positive since December 2024 and plan the company around staying that way.',
                href: '/handbook/story',
            },
            {
                title: 'Pricing you can compute',
                detail: 'Every product is priced on the website by usage. Enterprise adds controls and support, not a seat meter.',
                href: '/pricing',
            },
        ],
    },
    {
        key: 'support',
        title: 'Support',
        lead: 'People, not a queue. Enterprise puts a named human on your account and engineers within reach when you need them.',
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

/** The proof for one pillar: its lead, a rule, then the points as a two-column list. */
function ProofPane({ pillar }: { pillar: Pillar }): JSX.Element {
    return (
        <div className="rounded-md border-2 border-primary bg-primary p-4 shadow-xl @2xl:p-6">
            <p className="m-0 max-w-xl text-pretty text-lg font-semibold leading-snug text-primary @2xl:text-xl">
                {pillar.lead}
            </p>
            <ul className="m-0 mt-4 grid list-none gap-x-8 gap-y-3 border-t border-primary p-0 pt-4 @xl:grid-cols-2">
                {pillar.points.map((point) => (
                    <PointItem key={point.title} point={point} />
                ))}
            </ul>
        </div>
    )
}

// Tower behind the pane. It fades in above the title, runs past the bottom of this block into
// the hand-off section's top padding, and fades out just above its resources column.
const TOWER_RUN_MASK = 'linear-gradient(to bottom, transparent, #000 8rem, #000 calc(100% - 8rem), transparent)'

export function BusinessProof(): JSX.Element {
    const [active, setActive] = useState(PILLARS[0].key)

    return (
        <div className="mx-auto w-full max-w-6xl px-4 pt-5 @xl:px-8 @2xl:pt-8">
            {/* Positioned on the content box (inside the gutters), so the run's x matches the tower in the hero
                and on the platform, which are laid out on the same box. */}
            <div className="relative">
                <div
                    aria-hidden="true"
                    className="absolute -bottom-40 -top-10 left-[calc(75%+0.75rem)] hidden w-44 -translate-x-1/2 bg-[length:100%_auto] bg-repeat-y @2xl:-top-16 @2xl:block"
                    style={{
                        backgroundImage: `url(${towerTile})`,
                        maskImage: TOWER_RUN_MASK,
                        WebkitMaskImage: TOWER_RUN_MASK,
                    }}
                />

                <h2 className="relative m-0 mb-4 flex flex-wrap items-center gap-x-3 text-2xl font-bold tracking-tight @2xl:mb-5 @2xl:text-4xl">
                    <span>5 reasons enterprises love</span>
                    <span className="sr-only">PostHog</span>
                    <Logo layout="logomark" aria-hidden="true" className="h-7 w-auto @2xl:h-9 dark:hidden" />
                    <Logo
                        layout="logomark"
                        variant="mono"
                        color="white"
                        aria-hidden="true"
                        className="hidden h-7 w-auto @2xl:h-9 dark:block"
                    />
                </h2>

                <Tabs.Root
                    value={active}
                    onValueChange={setActive}
                    orientation="vertical"
                    activationMode="manual"
                    className="relative grid gap-8 @2xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] @2xl:gap-12"
                >
                    {/* The index, top-aligned beside the pane. Click (or arrow + Enter) switches the pane. */}
                    <Tabs.List
                        aria-label="Why enterprises choose PostHog"
                        className="flex flex-wrap gap-x-6 gap-y-1 self-start @2xl:flex-col @2xl:gap-1"
                    >
                        {PILLARS.map((p, i) => {
                            const isActive = p.key === active
                            return (
                                <Tabs.Trigger
                                    key={p.key}
                                    value={p.key}
                                    className="group flex items-baseline gap-3 rounded-sm py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-red @2xl:gap-4 dark:focus-visible:ring-yellow"
                                >
                                    <span
                                        className={`font-code text-sm tabular-nums transition-colors @2xl:text-base ${
                                            isActive ? 'text-red dark:text-yellow' : 'text-muted'
                                        }`}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span
                                        className={`text-2xl font-bold tracking-tight transition-colors @2xl:text-4xl ${
                                            isActive ? 'text-primary' : 'text-muted group-hover:text-secondary'
                                        }`}
                                    >
                                        {p.title}
                                    </span>
                                </Tabs.Trigger>
                            )
                        })}
                    </Tabs.List>

                    {/* Every pane is mounted and stacked in the same grid cell, so the area is always as tall as the
                        tallest pane and nothing below shifts when you switch. Only the active one is visible; the
                        others fade out and go invisible (so their links leave the tab order). */}
                    <div className="grid">
                        {PILLARS.map((p) => (
                            <Tabs.Content
                                key={p.key}
                                value={p.key}
                                forceMount
                                className={`col-start-1 row-start-1 transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${
                                    p.key === active ? 'opacity-100' : 'invisible opacity-0'
                                }`}
                            >
                                <ProofPane pillar={p} />
                            </Tabs.Content>
                        ))}
                    </div>
                </Tabs.Root>
            </div>
        </div>
    )
}

/** The hand-off: a meeting with sales, and the reading a buyer can do before it. */
export function WorkWithUs(): JSX.Element {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 @xl:px-8">
            <div className="grid items-start gap-8 pb-12 pt-8 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] @2xl:items-end @2xl:gap-14 @2xl:pb-28 @2xl:pt-10">
                <div>
                    <div aria-hidden="true" className="mx-auto mb-6 w-48 [&>svg]:h-auto [&>svg]:w-full @2xl:w-56">
                        <HedgehogStampApproved />
                    </div>
                    <h2 className="m-0 text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">
                        Want your business to use PostHog?
                    </h2>
                    <p className="m-0 mt-3 max-w-xl text-pretty text-base text-secondary @2xl:text-lg">
                        Believe it or not, so do we!{' '}
                        <Link
                            to="/talk-to-a-human"
                            state={{ newWindow: true }}
                            className="font-semibold text-red underline dark:text-yellow"
                        >
                            Set up a meeting
                        </Link>{' '}
                        with our sales team and we will work out how to make it happen: a focused trial with your real
                        data, and pricing, procurement, security, and legal running in parallel.
                    </p>
                </div>
                <div>
                    <h3 className="m-0 text-base font-semibold">In the meantime, the reading is public</h3>
                    <p className="m-0 mt-1 text-sm text-secondary">
                        Most of what a security or procurement review needs is already online.
                    </p>
                    <ul className="m-0 mt-4 grid list-none gap-3 p-0 @xl:grid-cols-2">
                        {RESOURCES.map((r) => (
                            <li key={r.href}>
                                <Link
                                    to={r.href}
                                    state={isExternal(r.href) ? undefined : { newWindow: true }}
                                    externalNoIcon={isExternal(r.href)}
                                    className="group block !no-underline"
                                >
                                    <span className="block text-sm font-semibold text-red group-hover:underline dark:text-yellow">
                                        {r.label}
                                    </span>
                                    <span className="block text-sm text-secondary">{r.note}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
