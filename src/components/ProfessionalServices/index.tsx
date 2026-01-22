import React from 'react'
import Editor from 'components/Editor'
import { SEO } from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { IconWrench } from '@posthog/icons'
import { graphql, useStaticQuery } from 'gatsby'
import Tooltip from 'components/RadixUI/Tooltip'

const ServicesTable = () => {
    const columns = [
        { name: 'Service', width: '140px', align: 'left' as const },
        { name: 'What we do', width: '1fr', align: 'left' as const },
        { name: 'Timeline', width: '100px', align: 'center' as const },
    ]

    const rows = [
        {
            cells: [
                {
                    content: <strong>Migration</strong>,
                    className: 'font-semibold',
                },
                {
                    content: (
                        <span>
                            Move you from Amplitude, Mixpanel, Heap, LaunchDarkly, GA, or Pendo. We'll import your
                            historic data and buy out existing contracts.
                        </span>
                    ),
                },
                { content: <span className="text-muted">1-4 weeks</span> },
            ],
        },
        {
            cells: [
                {
                    content: <strong>Instrumentation</strong>,
                    className: 'font-semibold',
                },
                {
                    content: (
                        <span>
                            SDK setup across your stack, event tracking, privacy compliance (HIPAA, SOC 2), plus initial
                            dashboards, feature flags, and surveys.
                        </span>
                    ),
                },
                { content: <span className="text-muted">1-2 weeks</span> },
            ],
        },
        {
            cells: [
                {
                    content: <strong>Training</strong>,
                    className: 'font-semibold',
                },
                {
                    content: (
                        <span>
                            Best practices, team onboarding, and hands-on sessions. Remote by default, on-site available
                            if you want face time.
                        </span>
                    ),
                },
                { content: <span className="text-muted">Ongoing</span> },
            ],
        },
        {
            cells: [
                {
                    content: <strong>Integration</strong>,
                    className: 'font-semibold',
                },
                {
                    content: (
                        <span>
                            Connect your data sources (Stripe, Snowflake, Hubspot, Zendesk) and set up pipelines,
                            destinations, and real-time workflows.
                        </span>
                    ),
                },
                { content: <span className="text-muted">1-2 weeks</span> },
            ],
        },
    ]

    return <OSTable columns={columns} rows={rows} size="md" rowAlignment="top" />
}

const MigrationVendors = () => {
    const vendors = [
        { name: 'Amplitude', url: '/docs/migrate/migrate-from-amplitude' },
        { name: 'Mixpanel', url: '/docs/migrate/mixpanel' },
        { name: 'Heap', url: '/docs/migrate/heap' },
        { name: 'LaunchDarkly', url: '/docs/migrate/launchdarkly' },
        { name: 'Google Analytics', url: '/docs/migrate/google-analytics' },
        { name: 'Pendo', url: '/docs/migrate/pendo' },
    ]

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {vendors.map((vendor) => (
                <Link
                    key={vendor.name}
                    to={vendor.url}
                    className="inline-flex items-center px-2.5 py-1 rounded border border-primary bg-accent text-sm hover:border-b-[3px] hover:-translate-y-0.5 active:translate-y-0 active:border-b transition-all"
                >
                    {vendor.name}
                </Link>
            ))}
        </div>
    )
}

const ProcessStep = ({ number, title, description }: { number: number; title: string; description: string }) => (
    <div className="flex gap-3">
        <div className="flex-shrink-0 size-7 rounded-full bg-red dark:bg-yellow text-white dark:text-dark flex items-center justify-center text-sm font-bold">
            {number}
        </div>
        <div>
            <p className="font-semibold m-0">{title}</p>
            <p className="text-secondary text-sm m-0">{description}</p>
        </div>
    </div>
)

const TeamProfiles = () => {
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam {
                nodes {
                    id
                    name
                    slug
                    profiles {
                        data {
                            id
                            attributes {
                                color
                                firstName
                                lastName
                                avatar {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                    leadProfiles {
                        data {
                            id
                        }
                    }
                }
            }
        }
    `)

    const salesCSTeam = allTeams.nodes.find((t: any) => t.slug === 'sales-cs')
    const profiles = salesCSTeam?.profiles?.data || []
    const leadProfiles = salesCSTeam?.leadProfiles?.data || []

    const sortedProfiles = profiles.slice().sort((a: any, b: any) => {
        const aIsLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === a.id)
        const bIsLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === b.id)
        return aIsLead === bIsLead ? 0 : aIsLead ? -1 : 1
    })

    if (profiles.length === 0) return null

    const maxDisplay = 8
    const displayProfiles = sortedProfiles.slice(0, profiles.length > maxDisplay ? 7 : undefined)
    const remainingCount = profiles.length > maxDisplay ? profiles.length - 7 : 0

    return (
        <div className="mt-6">
            <p className="text-sm text-secondary mb-2">Your dedicated team:</p>
            <div className="flex flex-wrap justify-start ml-3" dir="rtl">
                {remainingCount > 0 && (
                    <span className="visible cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-primary">
                        <Tooltip
                            trigger={
                                <div className="size-10 rounded-full bg-accent border border-light dark:border-dark flex items-center justify-center text-sm font-semibold transform scale-100 hover:scale-125 transition-all">
                                    {remainingCount}+
                                </div>
                            }
                            side="bottom"
                        >
                            {remainingCount} more
                        </Tooltip>
                    </span>
                )}
                {displayProfiles
                    .reverse()
                    .map(({ id, attributes: { firstName, lastName, avatar, color } }: any, index: number) => {
                        const name = [firstName, lastName].filter(Boolean).join(' ')
                        const isTeamLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === id)

                        return (
                            <span
                                key={`${name}-${index}`}
                                className={`visible cursor-default -ml-3 relative hover:z-10 transform scale-100 hover:scale-125 transition-all rounded-full border-1 ${
                                    isTeamLead ? 'border-yellow dark:border-yellow' : 'border-primary'
                                }`}
                            >
                                <Tooltip
                                    trigger={
                                        <img
                                            src={avatar?.data?.attributes?.url}
                                            className={`size-10 rounded-full bg-${
                                                color ?? 'accent'
                                            } border border-light dark:border-dark`}
                                            alt={name}
                                        />
                                    }
                                    side="bottom"
                                    delay={0}
                                >
                                    {name} {isTeamLead ? '(Team lead)' : ''}
                                </Tooltip>
                            </span>
                        )
                    })}
            </div>
        </div>
    )
}

export const ProfessionalServices = () => {
    return (
        <>
            <SEO
                title="Professional Services - PostHog"
                description="Forward-deployed engineers to help you migrate, instrument, train, and integrate PostHog into your stack."
                image={`/images/og/deskhog.jpg`}
            />
            <Editor
                maxWidth={900}
                proseSize="base"
                bookmark={{
                    title: 'Professional Services',
                    description: 'Expert help for PostHog setup',
                }}
            >
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="size-6 text-blue">
                        <IconWrench />
                    </span>
                    <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                        Professional Services
                    </span>
                </div>

                <h1 className="!mt-0 !mb-3">Hire a PostHog expert</h1>

                <p className="text-lg !mt-0 mb-6">
                    <strong>Forward-deployed engineers</strong> to get you up and running fast. From complete
                    installation packages to one-off projects—we handle whatever you need.
                </p>

                {/* TL;DR Box */}
                <div className="bg-accent dark:bg-accent-dark border border-primary rounded p-4 mb-8">
                    <div className="@md:flex @md:items-start @md:justify-between gap-6">
                        <div className="flex-1">
                            <p className="!mt-0 !mb-2">
                                <strong>Pricing:</strong> ~20% of your first year credit purchase, $5k minimum.
                                Scope-based—you only pay for what you need.
                            </p>
                            <p className="!m-0 text-sm text-secondary">
                                Need something smaller?{' '}
                                <Link to="/merch?product=30-min-onboarding-consultation" className="font-semibold">
                                    Book a 30-minute consultation
                                </Link>{' '}
                                instead.
                            </p>
                        </div>
                        <div className="mt-4 @md:mt-0 flex-shrink-0">
                            <CallToAction href="/talk-to-a-human" type="primary" size="md">
                                Talk to us
                            </CallToAction>
                        </div>
                    </div>
                </div>

                {/* Services Table */}
                <h2 className="!mt-0">What we offer</h2>
                <ServicesTable />

                {/* Detailed Sections */}
                <h2>Service details</h2>

                <h3>Migration</h3>
                <p>
                    Ditching Amplitude, Mixpanel, or another legacy tool? We'll handle the entire migration: export your
                    historic data, map your events to PostHog's schema, and verify everything works. We'll also{' '}
                    <strong>buy out your existing contracts</strong> so you can switch without paying twice.
                </p>
                <p className="text-sm text-secondary !mb-2">We've migrated customers from:</p>
                <MigrationVendors />

                <h3 className="!mt-8">Instrumentation</h3>
                <p>
                    Complex tracking needs? Privacy requirements? We'll set up PostHog correctly for your marketing site
                    and app—tracking users comprehensively while tuning events so you only pay for what matters.
                </p>
                <ul>
                    <li>
                        <strong>SDK integration</strong> across web, mobile, and backend
                    </li>
                    <li>
                        <strong>Privacy compliance</strong> setup (HIPAA BAA, SOC 2, GDPR)—use our{' '}
                        <Link to="/baa">BAA generator</Link> and <Link to="/dpa">DPA builder</Link>
                    </li>
                    <li>
                        <strong>Initial dashboards, feature flags, and surveys</strong> configured to your specs
                    </li>
                </ul>

                <h3>Training</h3>
                <p>
                    We'll make sure your team knows their analytics from their elbows—with minimal meetings. You'll
                    learn our best practices and how to use PostHog to its fullest.
                </p>
                <ul>
                    <li>
                        <strong>Remote by default</strong>—async docs, video calls, Slack support
                    </li>
                    <li>
                        <strong>On-site available</strong> if you want face-to-face sessions (we'll travel)
                    </li>
                    <li>
                        <strong>Merch included</strong>—because everyone deserves a hedgehog sticker
                    </li>
                </ul>

                <h3>Integration</h3>
                <p>
                    Whatever tools you use, we'll get them talking to PostHog. We can work with your existing data stack
                    or help you build one from scratch using PostHog's data warehouse.
                </p>
                <ul>
                    <li>
                        <Link to="/data-stack/sources">
                            <strong>Data sources</strong>
                        </Link>{' '}
                        — pull from Stripe, Hubspot, Zendesk, Postgres, and more
                    </li>
                    <li>
                        <Link to="/cdp">
                            <strong>Pipeline destinations</strong>
                        </Link>{' '}
                        — push to your CRM, data warehouse, or anywhere else
                    </li>
                    <li>
                        <Link to="/workflows">
                            <strong>Workflows</strong>
                        </Link>{' '}
                        — trigger real-time actions based on user behavior
                    </li>
                </ul>

                {/* How it works */}
                <h2>How it works</h2>
                <div className="space-y-4 mb-8">
                    <ProcessStep
                        number={1}
                        title="Tell us what you need"
                        description="Quick call or email—no sales pitch, just understanding your requirements."
                    />
                    <ProcessStep
                        number={2}
                        title="Get a dedicated engineer"
                        description="We assign someone from our team who'll own your project end-to-end."
                    />
                    <ProcessStep
                        number={3}
                        title="We do the work"
                        description="Migration, setup, training—whatever's in scope. You review, we iterate."
                    />
                    <ProcessStep
                        number={4}
                        title="You're up and running"
                        description="Handoff complete. Ongoing support available if you need it."
                    />
                </div>

                <TeamProfiles />

                {/* Final CTA */}
                <div className="border-t border-primary pt-8 mt-8">
                    <h2 className="!mt-0">Ready to get started?</h2>
                    <p>
                        Tell us what you're trying to accomplish. We'll figure out the scope together and get you a
                        quote within a day or two.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <CallToAction href="/talk-to-a-human" type="primary" size="lg">
                            Talk to us about custom options
                        </CallToAction>
                        <CallToAction href="/merch?product=30-min-onboarding-consultation" type="secondary" size="lg">
                            Get a 30-minute consultation
                        </CallToAction>
                    </div>
                </div>
            </Editor>
        </>
    )
}

export default ProfessionalServices
