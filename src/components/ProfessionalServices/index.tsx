import React from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import { SEO } from 'components/seo'
import { IconArrowRightDown, IconArrowUpRight } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import CloudinaryImage from 'components/CloudinaryImage'
import Editor from 'components/Editor'
import { graphql, useStaticQuery } from 'gatsby'
import { ScrollToElement } from 'components/ScrollToElement'
import OSTable from 'components/OSTable'

const ServiceLink = ({ label, to }: { label: string; to: string }) => (
    <ScrollToElement targetId={to} as="span" className="group font-semibold cursor-pointer whitespace-nowrap underline">
        {label}
        <IconArrowRightDown className="inline-block size-4 invisible group-hover:visible" />
    </ScrollToElement>
)

const ServicesTable = () => {
    const columns = [
        { name: 'Service', width: '150px', align: 'left' as const },
        { name: 'What we do', width: '1fr', align: 'left' as const },
    ]

    const rows = [
        {
            cells: [
                {
                    content: <ServiceLink label="Migration" to="migration" />,
                },
                {
                    content: (
                        <ul className="-my-1">
                            <li>Move you from Amplitude, Mixpanel, Heap, LaunchDarkly, GA, or Pendo</li>
                            <li>We'll import your historic data and buy out existing contracts</li>
                        </ul>
                    ),
                },
            ],
        },
        {
            cells: [
                {
                    content: <ServiceLink label="Instrumentation" to="instrumentation" />,
                },
                {
                    content: (
                        <ul className="-my-1">
                            <li>SDK setup across your stack, event tracking, privacy compliance (HIPAA, SOC 2)</li>
                            <li>Initial dashboards, feature flags, and surveys</li>
                        </ul>
                    ),
                },
            ],
        },
        {
            cells: [
                {
                    content: <ServiceLink label="Training" to="training" />,
                },
                {
                    content: (
                        <ul className="-my-1">
                            <li>Best practices, team onboarding, and hands-on sessions</li>
                            <li>Remote by default, on-site available</li>
                        </ul>
                    ),
                },
            ],
        },
        {
            cells: [
                {
                    content: <ServiceLink label="Integration" to="integration" />,
                },
                {
                    content: (
                        <ul className="-my-1">
                            <li>Connect your data sources (Stripe, Snowflake, Hubspot, Zendesk)</li>
                            <li>Set up pipelines, destinations, and real-time workflows</li>
                        </ul>
                    ),
                },
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
                    className="group inline-flex items-center  text-sm  whitespace-nowrap"
                    state={{ newWindow: true }}
                >
                    {vendor.name}
                    <IconArrowUpRight className="inline-block size-4 opacity-30 group-hover:opacity-75" />
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
        <div className="mb-8">
            <p>
                We don't do sales pitches or hard sells – just one simple call or quick email thread to find out what
                you need. We'll then assign a dedicated PostHog staff member to work with you.
            </p>

            <p>Team members who insist they really do enjoy quick calls include:</p>
            <div className="flex flex-wrap justify-end ml-3" dir="rtl">
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

const initialContactValues = {
    talk_about: "I'd like to learn more about PostHog's professional services.",
}

export const ProfessionalServices = () => {
    return (
        <>
            <SEO
                title="Services - PostHog"
                description="Forward-deployed engineers to help you migrate, instrument, train, and integrate PostHog into your stack."
                image={`/images/og/deskhog.jpg`}
            />
            <Editor
                scrollable={false}
                maxWidth={900}
                proseSize="base"
                bookmark={{
                    title: 'Services',
                    description: 'Expert help for PostHog setup',
                }}
            >
                <h1 className="text-center @xl:text-left pt-8 mb-4">Hire a PostHog expert</h1>

                <CloudinaryImage
                    quality={90}
                    placeholder="blurred"
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/posthog-ae.png"
                    width={436}
                    className="flex justify-center @xl:justify-start @xl:float-right rotate-1 @xl:ml-8 @xl:max-w-64 @2xl:max-w-80 mb-4"
                />

                <p className="text-lg !mt-0 mb-6 text-center @xl:text-left">
                    From complete installation packages to one-off projects,{' '}
                    <strong>PostHog's forward-deployed engineers are here to help.</strong>
                </p>

                <div>
                    <CallToAction
                        href="/talk-to-a-human"
                        type="primary"
                        size="md"
                        state={{ newWindow: true, initialValues: initialContactValues }}
                        width="full"
                        className="@xl:hidden"
                    >
                        Get a custom quote
                    </CallToAction>

                    <CallToAction
                        href="/talk-to-a-human"
                        type="primary"
                        size="md"
                        state={{ newWindow: true, initialValues: initialContactValues }}
                        className="hidden @xl:inline-flex"
                    >
                        Get a custom quote
                    </CallToAction>
                </div>

                <p className="text-sm text-secondary text-center @xl:text-left mb-12">
                    Just need some quick help?{' '}
                    <Link to="/merch?product=30-min-onboarding-consultation" state={{ newWindow: true }}>
                        Book a 30-minute consultation
                    </Link>{' '}
                    with a PostHog expert for $80.
                </p>

                {/* Services Table */}
                <h2 className="!mt-0">How it works</h2>
                <TeamProfiles />

                <h2 className="!mt-0">How we can help</h2>
                <ServicesTable />

                <h3 id="migration">Migration</h3>
                <p>
                    Ditching Amplitude, Mixpanel, or another legacy tool? We'll handle the entire migration: export your
                    historic data, map your events to PostHog's schema, and verify everything works.
                </p>
                <p>
                    We'll also <strong>buy out your existing contracts</strong> so you can switch without paying twice.
                </p>
                <p className="text-sm text-secondary !mb-2">Guides for migration to PostHog from...</p>
                <MigrationVendors />

                <h3 id="instrumentation" className="!mt-8">
                    Instrumentation
                </h3>
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
                        <Link to="/baa" state={{ newWindow: true }}>
                            BAA
                        </Link>{' '}
                        and{' '}
                        <Link to="/dpa" state={{ newWindow: true }}>
                            DPA
                        </Link>{' '}
                        generators
                    </li>
                    <li>
                        <strong>Initial dashboards, feature flags, and surveys</strong> configured to your specs
                    </li>
                </ul>

                <h3 id="training">Training</h3>
                <p>
                    We'll make sure your team knows their analytics from their elbows—with minimal meetings. You'll
                    learn our best practices and how to use PostHog to its fullest.
                </p>
                <ul>
                    <li>
                        <strong>Remote by default</strong> — async docs, video calls, Slack support
                    </li>
                    <li>
                        <strong>On-site available</strong> if you want face-to-face sessions (we'll travel)
                    </li>
                    <li>
                        <strong>Merch included</strong> — because everyone deserves a hedgehog sticker
                    </li>
                </ul>

                <h3 id="integration">Integration</h3>
                <p>
                    Whatever tools you use, we'll get them talking to PostHog. We can work with your existing data stack
                    or help you build one from scratch using PostHog's data warehouse.
                </p>
                <ul>
                    <li>
                        <Link to="/data-stack/sources" state={{ newWindow: true }}>
                            <strong>Data sources</strong>
                        </Link>{' '}
                        — pull from Stripe, Hubspot, Zendesk, Postgres, and more
                    </li>
                    <li>
                        <Link to="/cdp" state={{ newWindow: true }}>
                            <strong>Pipeline destinations</strong>
                        </Link>{' '}
                        — push to your CRM, data warehouse, or anywhere else
                    </li>
                    <li>
                        <Link to="/workflows" state={{ newWindow: true }}>
                            <strong>Workflows</strong>
                        </Link>{' '}
                        — trigger real-time actions based on user behavior
                    </li>
                </ul>

                {/* How it works */}
                <h2>Our process</h2>
                <div className="space-y-4 mb-8">
                    <ProcessStep
                        number={1}
                        title="Tell us what you need"
                        description="Quick call or email—no sales pitch, just understanding your requirements"
                    />
                    <ProcessStep
                        number={2}
                        title="Get a dedicated engineer"
                        description="We assign someone from our team who'll own your project end-to-end."
                    />
                    <ProcessStep
                        number={3}
                        title="We do the work"
                        description="Migration, setup, training—whatever's in scope. You review, we iterate"
                    />
                    <ProcessStep
                        number={4}
                        title="You're up and running"
                        description="Handoff complete. Ongoing support available if you need it."
                    />
                </div>

                <h2>Pricing</h2>
                <p>
                    Pricing is based on the scope of work, usually amounting to{' '}
                    <strong>around 20% of your first year credit purchase</strong> with a <strong>$5k minimum.</strong>
                </p>

                <p className="!m-0 text-sm text-secondary">
                    Need something smaller?{' '}
                    <Link
                        to="/merch?product=30-min-onboarding-consultation"
                        className="font-semibold"
                        state={{ newWindow: true }}
                    >
                        Book a 30-minute consultation
                    </Link>{' '}
                    instead.
                </p>

                {/* Final CTA */}
                <div className="border-t border-primary pt-8 mt-8 pb-16">
                    <h2 className="!mt-0">Ready to get started?</h2>
                    <p>
                        Tell us what you're trying to accomplish. We'll figure out the scope together and get you a
                        quote within a day or two.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <CallToAction
                            href="/talk-to-a-human"
                            type="primary"
                            size="md"
                            state={{ newWindow: true, initialValues: initialContactValues }}
                        >
                            Get a custom quote
                        </CallToAction>
                        <CallToAction
                            href="/merch?product=30-min-onboarding-consultation"
                            type="secondary"
                            size="md"
                            state={{ newWindow: true }}
                        >
                            Get a 30 min consultation ($80)
                        </CallToAction>
                    </div>
                </div>
            </Editor>
        </>
    )
}

export default ProfessionalServices
