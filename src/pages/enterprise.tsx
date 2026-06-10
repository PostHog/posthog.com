import React from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import { SignupCTA } from 'components/SignupCTA'
import { TrackedCTA } from 'components/CallToAction'
import OSButton from 'components/OSButton'
import { Accordion } from 'components/RadixUI/Accordion'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { useCustomers } from 'hooks/useCustomers'
import type { Customer } from 'hooks/useCustomers'
import {
    IconInfo,
    IconShield,
    IconCheckCircle,
    IconHeadset,
    IconRocket,
    IconLock,
    IconServer,
    IconReceipt,
    IconHandwave,
} from '@posthog/icons'

// ─────────────────────────────────────────────
// Shared bits (mirrors /code page conventions)
// ─────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl mb-4">{children}</h2>
}

function Eyebrow({ children }: { children: React.ReactNode }) {
    return <p className="text-sm font-semibold uppercase tracking-wide text-secondary mb-2">{children}</p>
}

// Renders a single customer logo (mirrors the home page logo wall)
function CustomerLogo({ customer }: { customer: Customer }) {
    if (!customer.logo) {
        return <span className="text-sm font-semibold text-primary">{customer.name}</span>
    }
    if (typeof customer.logo === 'function') {
        const LogoComponent = customer.logo
        const heightClass = customer.height ? `h-${customer.height}` : 'h-8'
        return <LogoComponent className={`w-auto fill-current object-contain ${heightClass}`} />
    }
    const heightClass = customer.height ? `max-h-${customer.height}` : 'max-h-8'
    return (
        <>
            <img
                src={customer.logo.light}
                alt={customer.name}
                className={`w-auto object-contain dark:hidden ${heightClass}`}
            />
            <img
                src={customer.logo.dark}
                alt={customer.name}
                className={`w-auto object-contain hidden dark:block ${heightClass}`}
            />
        </>
    )
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────

function Hero() {
    return (
        <section className="max-w-5xl mx-auto px-4 @xl:px-8 pt-6 pb-10 @xl:pt-12 @xl:pb-16">
            <Eyebrow>PostHog for enterprise</Eyebrow>
            <h1 className="text-3xl @xl:text-5xl font-bold leading-tight !mt-0 mb-4 max-w-3xl">
                Big company? <span className="text-red dark:text-yellow">We've got you.</span>
            </h1>
            <p className="text-base @xl:text-lg leading-relaxed max-w-2xl mb-6">
                We're really good at serving large, serious teams who come to us — from{' '}
                <strong>Airbus</strong> and the <strong>UK Government</strong> to <strong>MoneyGram</strong>. Same
                product everyone else gets, plus the security, support, and paperwork your procurement team is going to
                ask about anyway.
            </p>
            <div className="flex flex-wrap items-center gap-2">
                <SignupCTA size="md" />
                <TrackedCTA
                    event={{ name: `clicked Talk to a human` }}
                    href="/talk-to-a-human"
                    type="secondary"
                    size="md"
                    state={{ newWindow: true }}
                >
                    Talk to a human
                </TrackedCTA>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Customers
// ─────────────────────────────────────────────

const CUSTOMER_SLUGS = [
    'airbus',
    'ukgovt',
    'moneygram',
    'supabase',
    'elevenlabs',
    'lovable',
    'hasura',
    'exa',
    'heygen',
    'wisprflow',
    'arena',
    'fireworksai',
]

function Customers() {
    const { getCustomers, getCustomer } = useCustomers()
    const customers = getCustomers(CUSTOMER_SLUGS)

    // Featured quote (Arena – source of truth for company performance)
    const arena = getCustomer('arena')
    const quote = arena?.quotes?.lily_dinh

    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <SectionLabel>Trusted by teams that can't afford to get it wrong</SectionLabel>
            <p className="max-w-2xl">
                Planemakers, governments, money movers, and the AI labs defining the frontier all run on PostHog.
            </p>

            <div className="grid grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-4 gap-px mt-6 bg-border dark:bg-border-dark border border-primary rounded-md overflow-hidden">
                {customers.map((customer) => (
                    <div
                        key={customer.slug}
                        className="flex items-center justify-center bg-light dark:bg-dark px-4 py-8 text-primary"
                    >
                        <CustomerLogo customer={customer} />
                    </div>
                ))}
            </div>

            {quote && (
                <figure className="mt-8 max-w-3xl mx-auto text-center">
                    <blockquote className="text-lg @xl:text-xl font-semibold leading-snug text-primary">
                        “{quote.products?.product_analytics}”
                    </blockquote>
                    <figcaption className="flex items-center justify-center gap-3 mt-4">
                        <img
                            src={quote.image.thumb}
                            alt={quote.name}
                            className="size-10 rounded-full object-cover"
                            loading="lazy"
                        />
                        <span className="text-sm text-secondary">
                            <strong className="text-primary">{quote.name}</strong>, {quote.role} at {arena?.name}
                        </span>
                    </figcaption>
                </figure>
            )}

            <p className="text-center mt-8 text-sm">
                <Link to="/customers" state={{ newWindow: true }} className="font-semibold">
                    See more customer stories
                </Link>
            </p>
        </section>
    )
}

// ─────────────────────────────────────────────
// Security & compliance
// ─────────────────────────────────────────────

const COMPLIANCE_BADGES = [
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/soc-2type1.png',
        alt: 'SOC 2 Type II certified',
        width: 120,
        height: 120,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/hipaa.webp',
        alt: 'HIPAA compliant',
        width: 188,
        height: 100,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/gdpr-ready.png',
        alt: 'GDPR ready',
        width: 130,
        height: 56,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/dpf.png',
        alt: 'EU-U.S. Data Privacy Framework',
        width: 210,
        height: 96,
    },
]

function Security() {
    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <SectionLabel>
                <IconShield className="size-7 inline-block align-middle relative -top-0.5 mr-1.5 text-red dark:text-yellow" />
                Security &amp; compliance
            </SectionLabel>
            <p className="max-w-2xl">
                SOC 2 Type II certified, HIPAA-ready, and GDPR-compliant. Everything your security team needs is
                self-serve — and if they have a 200-row questionnaire, we'll fill it out.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 my-8">
                {COMPLIANCE_BADGES.map((badge) => (
                    <CloudinaryImage
                        key={badge.alt}
                        src={badge.src}
                        width={badge.width}
                        height={badge.height}
                        alt={badge.alt}
                        placeholder="blurred"
                    />
                ))}
            </div>

            <ul className="grid @xl:grid-cols-2 gap-x-8 gap-y-4 pt-2">
                <li className="pl-8 relative">
                    <IconLock className="size-6 absolute top-0.5 left-0 text-blue" />
                    <h3 className="text-lg font-bold mb-0">Trust Center</h3>
                    <p className="mt-1">
                        Pull our SOC 2 report, policies, and pen test results yourself at{' '}
                        <Link to="https://trust.posthog.com" externalNoIcon className="font-semibold">
                            trust.posthog.com
                        </Link>
                        . No NDA gymnastics required.
                    </p>
                </li>
                <li className="pl-8 relative">
                    <IconServer className="size-6 absolute top-0.5 left-0 text-seagreen" />
                    <h3 className="text-lg font-bold mb-0">Choose where your data lives</h3>
                    <p className="mt-1">
                        Host in the EU (Frankfurt) or US (Virginia). We rely on Standard Contractual Clauses for any
                        cross-border transfer.
                    </p>
                </li>
                <li className="pl-8 relative">
                    <IconCheckCircle className="size-6 absolute top-0.5 left-0 text-purple" />
                    <h3 className="text-lg font-bold mb-0">DPAs &amp; BAAs on demand</h3>
                    <p className="mt-1">
                        Generate a{' '}
                        <Link to="/dpa" state={{ newWindow: true }} className="font-semibold">
                            DPA
                        </Link>{' '}
                        or{' '}
                        <Link to="/baa" state={{ newWindow: true }} className="font-semibold">
                            BAA
                        </Link>{' '}
                        in a couple of clicks.
                    </p>
                </li>
                <li className="pl-8 relative">
                    <IconShield className="size-6 absolute top-0.5 left-0 text-orange" />
                    <h3 className="text-lg font-bold mb-0">Annual pen tests</h3>
                    <p className="mt-1">
                        Independent penetration tests every year, plus a public{' '}
                        <Link
                            to="https://bugcrowd.com/engagements/posthog-vdp-pro"
                            externalNoIcon
                            className="font-semibold"
                        >
                            vulnerability disclosure program
                        </Link>
                        .
                    </p>
                </li>
            </ul>

            <p className="mt-6 text-sm">
                <Link to="/handbook/company/security" state={{ newWindow: true }} className="font-semibold">
                    Read our full security &amp; privacy handbook
                </Link>
            </p>
        </section>
    )
}

// ─────────────────────────────────────────────
// Support, SLAs & forward-deployed engineers
// ─────────────────────────────────────────────

const SEVERITY_LEVELS = [
    { level: 'Critical', color: 'bg-red', description: 'PostHog is down or there’s significant business impact' },
    { level: 'High', color: 'bg-orange', description: 'Key features are unavailable or badly degraded' },
    { level: 'Medium', color: 'bg-yellow', description: 'Issues with limited impact' },
    { level: 'Low', color: 'bg-green', description: 'Feature requests and usage questions' },
]

function Support() {
    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <SectionLabel>
                <IconHeadset className="size-7 inline-block align-middle relative -top-0.5 mr-1.5 text-red dark:text-yellow" />
                Support that's actually engineers
            </SectionLabel>
            <p className="max-w-2xl">
                No outsourced first line. No ticket-routing call center. You get a dedicated Slack channel with the
                people who actually build PostHog — and when you hit a bug, you'll often watch it get fixed in real time.
            </p>

            <div className="grid @2xl:grid-cols-2 gap-8 mt-6">
                <div>
                    <h3 className="text-lg font-bold mb-3">Severity levels</h3>
                    <ul className="list-none p-0 m-0 divide-y divide-primary border-y border-primary">
                        {SEVERITY_LEVELS.map((s) => (
                            <li key={s.level} className="flex items-start gap-3 py-3">
                                <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${s.color}`} aria-hidden />
                                <span>
                                    <strong className="text-primary">{s.level}</strong>
                                    <span className="text-secondary"> — {s.description}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-sm">
                        <Link to="/docs/support-options" state={{ newWindow: true }} className="font-semibold">
                            Compare support options
                        </Link>
                    </p>
                </div>

                <div className="border border-primary rounded-md bg-accent p-6">
                    <IconRocket className="size-7 text-red dark:text-yellow mb-3" />
                    <h3 className="text-lg font-bold mb-2">Forward-deployed engineers</h3>
                    <p className="mb-3">
                        For our biggest customers, we'll send an engineer to work alongside your team — in person, for a
                        week — to scope your implementation, migrate your data, and get you live on the right patterns.
                    </p>
                    <p className="text-sm text-secondary mb-4">
                        Professional services start at $10k, scoped to what you need.
                    </p>
                    <OSButton asLink to="/handbook/growth/sales/professional-services" state={{ newWindow: true }} variant="secondary" size="md">
                        How professional services work
                    </OSButton>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Built for big teams (platform package essentials)
// ─────────────────────────────────────────────

const ESSENTIALS = [
    { title: 'SAML SSO', description: 'Single sign-on with your identity provider.' },
    { title: 'Advanced permissions', description: 'Role-based access, multiple projects, and environments.' },
    { title: 'Dedicated Slack support', description: 'A private channel staffed by PostHog engineers.' },
    { title: 'Training & onboarding', description: 'Group sessions to get your whole org productive.' },
    { title: 'MSA & custom terms', description: 'Custom SLAs, legal, and information security requirements.' },
    { title: 'Pay by invoice', description: 'Annual credit purchases billed via invoice, not just card.' },
]

function Essentials() {
    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <SectionLabel>Built for big teams</SectionLabel>
            <p className="max-w-2xl">
                The enterprise platform package bundles the things larger orgs need to run PostHog securely as they
                grow.
            </p>
            <ul className="grid @md:grid-cols-2 @2xl:grid-cols-3 gap-x-8 gap-y-4 pt-6">
                {ESSENTIALS.map((item) => (
                    <li key={item.title} className="pl-8 relative">
                        <IconCheckCircle className="size-6 absolute top-0.5 left-0 text-seagreen" />
                        <h3 className="text-lg font-bold mb-0">{item.title}</h3>
                        <p className="mt-1 text-sm">{item.description}</p>
                    </li>
                ))}
            </ul>
            <p className="mt-6 text-sm">
                <Link to="/platform-packages" state={{ newWindow: true }} className="font-semibold">
                    See platform packages
                </Link>
            </p>
        </section>
    )
}

// ─────────────────────────────────────────────
// Pricing, procurement & status
// ─────────────────────────────────────────────

const DISCOUNT_TIERS = [
    { spend: '$25k–$59k', discount: '20%' },
    { spend: '$60k–$99k', discount: '25%' },
    { spend: '$100k–$249k', discount: '30%' },
    { spend: '$250k–$499k', discount: '35%' },
    { spend: '$500k–$999k', discount: '40%' },
    { spend: '$1M+', discount: "Let's talk" },
]

const PROCUREMENT_STEPS = [
    'Talk to a human — a 30-minute call to understand what you need',
    'Technical deep dive with the team who builds the product',
    'Security & legal review (only if you ask for one)',
    'Order form, MSA, and any custom terms',
    'You’re live — with a dedicated Slack channel',
]

function PricingProcurement() {
    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <SectionLabel>
                <IconReceipt className="size-7 inline-block align-middle relative -top-0.5 mr-1.5 text-red dark:text-yellow" />
                Transparent pricing, painless procurement
            </SectionLabel>
            <p className="max-w-2xl">
                Our pricing is public, our discounts are formulaic (no sales theater), and our procurement process is
                designed to get out of your way.
            </p>

            <div className="grid @2xl:grid-cols-2 gap-8 mt-6">
                <div>
                    <h3 className="text-lg font-bold mb-3">Volume discounts</h3>
                    <p className="text-sm text-secondary mb-3">
                        Commit to annual spend up front and the discount is automatic — based on volume, not how hard
                        you negotiate.
                    </p>
                    <table className="w-full text-sm border border-primary rounded-md overflow-hidden border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-accent text-left">
                                <th className="font-semibold px-3 py-2 border-b border-primary">Annual spend</th>
                                <th className="font-semibold px-3 py-2 border-b border-primary">Discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DISCOUNT_TIERS.map((tier, i) => (
                                <tr key={tier.spend}>
                                    <td
                                        className={`px-3 py-2 ${
                                            i < DISCOUNT_TIERS.length - 1 ? 'border-b border-primary' : ''
                                        }`}
                                    >
                                        {tier.spend}
                                    </td>
                                    <td
                                        className={`px-3 py-2 font-semibold text-primary ${
                                            i < DISCOUNT_TIERS.length - 1 ? 'border-b border-primary' : ''
                                        }`}
                                    >
                                        {tier.discount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-3 text-sm">
                        <Link
                            to="/handbook/growth/sales/contract-rules#discounts"
                            state={{ newWindow: true }}
                            className="font-semibold"
                        >
                            See the full discount schedule
                        </Link>
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-3">How procurement works</h3>
                    <ol className="list-none p-0 m-0 space-y-3">
                        {PROCUREMENT_STEPS.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="flex items-center justify-center size-6 shrink-0 rounded-full bg-red dark:bg-yellow text-white dark:text-dark text-sm font-bold">
                                    {i + 1}
                                </span>
                                <span className="pt-0.5">{step}</span>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-4 text-sm">
                        Need an uptime SLA? Available with the enterprise package, or for customers spending $100k+ a
                        year. Track real-time uptime any time at{' '}
                        <Link to="https://status.posthog.com" externalNoIcon className="font-semibold">
                            status.posthog.com
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// The wink — flair transparency report
// ─────────────────────────────────────────────

function Flair() {
    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <div className="border border-primary rounded-md bg-accent overflow-hidden flex flex-col @xl:flex-row items-center gap-6 p-6 @xl:p-8">
                <div className="flex-1">
                    <Eyebrow>Flair transparency report</Eyebrow>
                    <h2 className="text-2xl font-bold mb-2">We are actively working to increase our flair.</h2>
                    <p className="mb-4">
                        Industry standards demand pieces of flair. We're not there yet, but we believe radical
                        transparency starts at home.
                    </p>
                    <div className="flex items-center gap-2 max-w-md">
                        <span className="whitespace-nowrap text-sm font-semibold">Flair progress:</span>
                        <div className="bg-light dark:bg-dark border border-primary rounded-full h-4 w-full relative">
                            <div className="bg-red dark:bg-yellow rounded-full w-[26.67%] absolute -top-px -left-px -bottom-px"></div>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-[15px]">27%</span>
                            <Tooltip
                                trigger={
                                    <span className="relative">
                                        <IconInfo className="w-5 h-5 opacity-75 hover:opacity-100" />
                                    </span>
                                }
                                delay={0}
                            >
                                <p className="mb-0">
                                    A minimum of{' '}
                                    <a
                                        href="https://www.google.com/search?q=how+many+pieces+of+flair+is+the+minimum"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-red dark:text-yellow font-semibold"
                                    >
                                        15 pieces of flair is required
                                    </a>
                                    .
                                </p>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <aside className="w-64 @xl:w-80 max-w-full shrink-0">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/enterprise/flair-hogs.png"
                        alt="We need to talk about your flair"
                        placeholder="blurred"
                    />
                </aside>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

const FAQ_ITEMS = [
    {
        trigger: 'Do you support SSO / SAML?',
        content: (
            <p>
                Yes. SAML single sign-on, role-based permissions, and multiple projects and environments are part of
                the{' '}
                <a href="/platform-packages" className="underline">
                    enterprise platform package
                </a>
                .
            </p>
        ),
    },
    {
        trigger: 'Where is my data stored?',
        content: (
            <p>
                You choose: AWS in the EU (eu-central-1, Frankfurt) or the US (us-east-1, Virginia). For any transfer
                from the UK, EU, or EEA to the US we rely on EU Standard Contractual Clauses. More in our{' '}
                <a href="/docs/privacy/gdpr-compliance" className="underline">
                    GDPR docs
                </a>
                .
            </p>
        ),
    },
    {
        trigger: 'Can we sign an MSA or negotiate custom terms?',
        content: (
            <p>
                Enterprise customers can sign a Master Services Agreement covering custom SLAs, legal changes, and
                information security requirements. We don't make contractual commitments about our roadmap.{' '}
                <a href="/talk-to-a-human" className="underline">
                    Talk to us
                </a>{' '}
                to get started.
            </p>
        ),
    },
    {
        trigger: 'Do you complete security questionnaires?',
        content: (
            <p>
                Most of what you need is self-serve in our{' '}
                <a href="https://trust.posthog.com" className="underline">
                    Trust Center
                </a>{' '}
                — SOC 2 report, policies, and pen test results. For enterprise customers we're also happy to complete
                your own security assessment.
            </p>
        ),
    },
    {
        trigger: 'How do volume discounts work?',
        content: (
            <p>
                Discounts are based on committed annual spend, starting at 20% from $25k. They're formulaic, not
                negotiated — see the full{' '}
                <a href="/handbook/growth/sales/contract-rules#discounts" className="underline">
                    discount schedule
                </a>{' '}
                in our handbook.
            </p>
        ),
    },
    {
        trigger: 'Can we pay by invoice?',
        content: (
            <p>
                Yes — for companies that purchase PostHog Cloud credit up front, we accept payment by invoice. (Standard
                month-to-month billing is by card via Stripe.){' '}
                <a href="/talk-to-a-human" className="underline">
                    Contact sales
                </a>{' '}
                to set this up.
            </p>
        ),
    },
]

function FAQ() {
    return (
        <section className="mb-12 @xl:mb-16 max-w-2xl px-4 @xl:px-8">
            <h2 className="text-2xl m-0 mb-6">FAQ</h2>
            <Accordion
                type="multiple"
                triggerClassName="!px-3 !py-2"
                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                items={FAQ_ITEMS}
            />
        </section>
    )
}

// ─────────────────────────────────────────────
// Bottom CTA
// ─────────────────────────────────────────────

function BottomCTA() {
    return (
        <section className="relative mb-16 px-4 @xl:px-8">
            <div className="border border-primary rounded-md bg-accent text-center px-6 py-10">
                <IconHandwave className="size-9 mx-auto text-red dark:text-yellow mb-3" />
                <h2 className="text-2xl font-bold mb-2">Come say hi</h2>
                <p className="max-w-xl mx-auto mb-6">
                    Start free in a couple of minutes, or talk to a human about your requirements. Either way, no
                    pushy sales calls — we promise.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <SignupCTA size="md" />
                    <TrackedCTA
                        event={{ name: `clicked Talk to a human` }}
                        href="/talk-to-a-human"
                        type="secondary"
                        size="md"
                        state={{ newWindow: true }}
                    >
                        Talk to a human
                    </TrackedCTA>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function Enterprise() {
    return (
        <>
            <SEO
                title="PostHog for enterprise"
                description="Big company? We've got you. The security, support, and procurement enterprise teams need — from the same PostHog everyone else uses."
            />
            <Editor
                slug="/enterprise"
                maxWidth="100%"
                hasPadding={false}
                bookmark={{
                    title: 'PostHog for enterprise',
                    description: "Big company? We've got you.",
                }}
            >
                <div className="@container not-prose font-rounded">
                    <header className="border-b border-primary">
                        <Hero />
                    </header>

                    <div className="max-w-5xl mx-auto pt-12">
                        <Customers />
                        <Security />
                        <Support />
                        <Essentials />
                        <PricingProcurement />
                        <Flair />
                        <FAQ />
                        <BottomCTA />
                    </div>
                </div>
            </Editor>
        </>
    )
}
