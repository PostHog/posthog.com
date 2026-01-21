import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import { IconWrench, IconHandwave } from '@posthog/icons'
import { graphql, useStaticQuery } from 'gatsby'
import Tooltip from 'components/RadixUI/Tooltip'

import { CallToAction } from 'components/CallToAction'
import { Hero } from 'components/Hero'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import DuckDBWaitlistSurvey from 'components/DuckDBWaitlistSurvey'
import { H3 } from 'components/MdxAnchorHeaders'

export const ProfessionalServices = () => {
    const { fullWidthContent } = useLayoutData()
    const [showAnswer, setShowAnswer] = useState(false)

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

    // Find the sales-cs team
    const salesCSTeam = allTeams.nodes.find((t: any) => t.slug === 'sales-cs')
    const profiles = salesCSTeam?.profiles?.data || []
    const leadProfiles = salesCSTeam?.leadProfiles?.data || []

    // Sort profiles to show team leads first
    const sortedProfiles = profiles.slice().sort((a: any, b: any) => {
        const aIsLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === a.id)
        const bIsLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === b.id)
        return aIsLead === bIsLead ? 0 : aIsLead ? -1 : 1
    })

    return (
        <>
            <SEO
                title="Professional Services - From SDK to Data Yay!"
                description="Forward-deployed engineers to get you up and running with PostHog in no time at all."
                image={`/images/og/deskhog.jpg`}
            />
            <div
                className={`${
                    fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'
                } px-4 sm:px-5 pt-6 sm:pt-10 pb-2`}
            >
                <div className="flex gap-1.5 justify-center items-center mb-3">
                    <span className="w-6 h-6 text-blue">
                        <IconWrench />
                    </span>
                    <span className="text-[15px] font-semibold text-opacity-60">Professional Services</span>
                </div>
                <Hero
                    title='<span class="text-red dark:text-yellow">Hire a PostHog expert</span> <br/>to get you up and running'
                    subtitle="From complete installation and onboarding packages to one-off projects, PostHog's forward-deployed engineers can help with whatever you need."
                />
            </div>

            <div id="features">
                <section className="max-w-7xl mx-auto px-4 sm:px-5 pb-6">
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-2 mb-8 sm:mb-12">
                        <CallToAction href="/talk-to-a-human" type="primary">
                            Talk to us about custom options
                        </CallToAction>
                        <CallToAction
                            href="https://posthog.com/merch?product=30-min-onboarding-consultation"
                            type="secondary"
                        >
                            <>Or get a 30-minute consultation</>
                        </CallToAction>
                    </div>

                    <h3 className="text-2xl font-bold text-center mb-8 sm:mb-12 px-2">Here's what we can help with</h3>

                    <div className="grid @xl:grid-cols-2 gap-y-4 @xl:gap-y-8 pb-12 max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            Only slightly awkward <br />
                            introductions
                            <br />
                            <span className="text-red dark:text-yellow text-base font-normal">(Always included)</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="mb-4">
                                No sales pitches, no hard sell, just one simple call or quick email chain to find out
                                what you need. We'll then assign a dedicated PostHog staff member to work with you.
                            </p>
                            <p className="mb-3">Team members who insist they really do enjoy quick calls include...</p>
                            {profiles.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex flex-wrap justify-end ml-3" dir="rtl">
                                        {profiles.length > 8 && (
                                            <span className="visible cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-primary">
                                                <Tooltip
                                                    trigger={
                                                        <div className="size-10 rounded-full bg-accent border border-light dark:border-dark flex items-center justify-center text-sm font-semibold transform scale-100 hover:scale-125 transition-all">
                                                            {profiles.length - 7}+
                                                        </div>
                                                    }
                                                    side="bottom"
                                                >
                                                    {profiles.length - 7} more
                                                </Tooltip>
                                            </span>
                                        )}
                                        {sortedProfiles
                                            .slice(0, profiles.length > 8 ? 7 : undefined)
                                            .reverse()
                                            .map(
                                                (
                                                    { id, attributes: { firstName, lastName, avatar, color } }: any,
                                                    index: number
                                                ) => {
                                                    const name = [firstName, lastName].filter(Boolean).join(' ')
                                                    const isTeamLead = leadProfiles.some(
                                                        ({ id: leadID }: { id: string }) => leadID === id
                                                    )

                                                    return (
                                                        <span
                                                            key={`${name}-${index}`}
                                                            className={`visible cursor-default -ml-3 relative hover:z-10 transform scale-100 hover:scale-125 transition-all rounded-full border-1 ${
                                                                isTeamLead
                                                                    ? 'border-yellow dark:border-yellow'
                                                                    : 'border-primary'
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
                                                }
                                            )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            Migration
                            <br />
                            <span className="text-red dark:text-yellow text-base font-normal">(Optional)</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="m-0">
                                Want a hand ditching legacy tools like Amplitude or Mixpanel? We'll migrate you and buy
                                you out of existing contracts. We can connect to most sources and easily import historic
                                data from tools such as...
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {[
                                    { name: 'Amplitude', url: '/docs/migrate/migrate-from-amplitude' },
                                    { name: 'Mixpanel', url: '/docs/migrate/mixpanel' },
                                    { name: 'Heap', url: '/docs/migrate/heap' },
                                    { name: 'LaunchDarkly', url: '/docs/migrate/launchdarkly' },
                                    { name: 'Google Analytics', url: '/docs/migrate/google-analytics' },
                                    { name: 'Pendo', url: '/docs/migrate/pendo' },
                                ].map((vendor) => (
                                    <Link
                                        key={vendor.name}
                                        to={vendor.url}
                                        className="inline-flex items-center px-3 py-1.5 rounded border border-primary bg-accent text-sm font-medium hover:border-b-[3px] hover:-translate-y-0.5 active:translate-y-0 active:border-b-1 active:top-[2px] transition-all"
                                    >
                                        {vendor.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            Instrumentation
                            <br />
                            <span className="text-red dark:text-yellow text-base font-normal">(Optional)</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="m-0">
                                Complex tracking needs? Privacy requirements? We'll setup PostHog up as needed for your
                                marketing site and app so you can track users comprehensively, then tune your events so
                                you only pay for what you need. We'll set up any initial dashboards, flags, and surveys
                                you need while we're at it.
                            </p>
                            <div
                                className="mt-4 bg-accent dark:bg-accent-dark border border-primary rounded p-4 transition-all duration-300 cursor-pointer hover:border-red dark:hover:border-yellow"
                                onMouseEnter={() => setShowAnswer(true)}
                                onMouseLeave={() => setShowAnswer(false)}
                            >
                                {!showAnswer ? (
                                    <p className="text-sm m-0">
                                        <strong>Q: How many lawyers does it take to setup PostHog?</strong>{' '}
                                        <span className="text-secondary italic">(Hover for answer)</span>
                                    </p>
                                ) : (
                                    <p className="text-sm m-0">
                                        <strong>None!</strong> You make your own legal docs instead.{' '}
                                        <Link className="underline font-medium" to="/baa">
                                            Try our BAA generator
                                        </Link>{' '}
                                        and{' '}
                                        <Link className="underline font-medium" to="/dpa">
                                            DPA builder!
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            Training
                            <br />
                            <span className="text-red dark:text-yellow text-base font-normal">(Optional)</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="m-0">
                                We'll make sure your team knows their analytics from their elbows, with minimal
                                meetings. We'll help you understand all our best practices and how to use PostHog to its
                                fullest.
                            </p>
                            <p className="text-sm mt-4 border-l-4 border-primary pl-2 py-1">
                                <strong>On-site options:</strong> Our default is to do everything online, with as few
                                meetings as possible. But, if you want us on-site then we're happy to travel for a few
                                days of face-to-face training. Either way, we can send some merch to welcome you to
                                PostHog too!
                            </p>
                        </div>
                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary mb-0">
                            Integration
                            <br />
                            <span className="text-red dark:text-yellow text-base font-normal">(Optional)</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <div className="flex flex-col gap-2">
                                <p className="m-0">
                                    Stripe? Snowflake? Supabase? Whatever tools you use, we'll get them talking to
                                    PostHog. PostHog offers its own data warehouse, but we can also integrate with your
                                    current data stack. That means...
                                    <ul className={`list-disc m-4`}>
                                        <li>
                                            <Link className="underline font-medium" to="/data-stack/sources">
                                                Connect sources
                                            </Link>{' '}
                                            to pull in data from Stripe, Hubspot, Zendesk, and more
                                        </li>
                                        <li>
                                            <Link className="underline font-medium" to="/cdp">
                                                Setup pipeline destinations
                                            </Link>{' '}
                                            to send data to your CRM or data warehouse
                                        </li>
                                        <li>
                                            <Link className="underline font-medium" to="/workflows">
                                                Design PostHog workflows
                                            </Link>{' '}
                                            to take real-time actions in response to data
                                        </li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-12 sm:mt-16 mb-8">
                        <div className="dark:bg-dark bg-accent border border-input p-4 rounded max-w-2xl w-full text-center">
                            <p className="!mt-0">
                                <strong>But, wait there are more enterprise features coming!</strong> <br />
                                <Link className="underline" to="/data-stack/managed-warehouse">
                                    PostHog's managed data warehouse built on DuckDB
                                </Link>{' '}
                                will be available soon. Join the waitlist to get early access and start building your
                                data stack on PostHog.
                            </p>
                            <div className="max-w-md mx-auto">
                                <DuckDBWaitlistSurvey />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="relative pt-12 md:pt-16 px-5 lg:px-0 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2">Ready to get started?</h2>
                <h3 className="text-lg sm:text-xl text-center mb-2 sm:mb-12 opacity-75">
                    Tell us what you need and we'll take it from there
                </h3>

                <div className="md:grid grid-cols-2 gap-16 md:pt-12 pb-16 max-w-5xl mx-auto">
                    <div className="relative text-center md:text-right">
                        <div className="mb-6">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/w_400,c_limit,q_auto,f_auto/pair_967c3c6777.png"
                                alt="Professional Services"
                                className="max-w-[200px] mx-auto md:mx-0"
                            />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="mb-6">
                            <span className="bg-blue inline-flex items-center gap-1 px-2 py-1 rounded-sm">
                                <span className="w-3 h-3">
                                    <IconWrench className="fill-white" />
                                </span>
                                <span className="uppercase font-semibold text-xs text-white">
                                    Professional Services
                                </span>
                            </span>
                            <p className="text-4xl font-bold m-0 mb-4 md:mt-2">Get expert help</p>
                            <p className="mb-2">
                                Pricing is based on the scope of work, usually amounting to around 20% of your first
                                year credit purchase and with a $5k minimum.
                            </p>
                        </div>
                        <div>
                            <CallToAction href="/talk-to-a-human" type="primary" size="absurd" width="64">
                                Let's chat
                            </CallToAction>
                        </div>

                        <div className="mt-4 flex items-center gap-3 justify-center md:justify-start">
                            <span className="bg-accent dark:bg-accent-dark rounded h-8 w-8 p-1">
                                <IconHandwave className="opacity-75" />
                            </span>
                            <p className="text-left text-sm text-primary/50 dark:text-primary-dark/50 leading-tight mb-0">
                                <strong>Need something smaller?</strong> <br className="hidden md:block" />
                                You can{' '}
                                <Link to="/merch?product=30-min-onboarding-consultation" className="underline">
                                    book a 30-minute consultation
                                </Link>{' '}
                                instead.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfessionalServices
