import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import { IconWrench, IconCode2, IconPlug, IconFolderMove, IconMessage, IconHandwave } from '@posthog/icons'
import { Bang } from 'components/Icons'
import { graphql, useStaticQuery } from 'gatsby'
import Tooltip from 'components/RadixUI/Tooltip'

import { CallToAction } from 'components/CallToAction'
import { Hero } from 'components/Hero'
import { Subfeature } from 'components/Products/Subfeature'
import CTA from 'components/Home/CTA'
import { FAQ } from 'components/Products/FAQ'
import { TextCard } from 'components/Products/TextCard'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import { PRODUCT_COUNT } from '../../../constants'
import { motion } from 'framer-motion'
import DuckDBWaitlistSurvey from 'components/DuckDBWaitlistSurvey'

const subfeaturesItemCount = 4
const subfeatures = [
    {
        title: 'Help migrating your data',
        description: "Ready to ditch legacy tools like Amplitude or Mixpanel? We'll migrate you in a flash.",
        icon: <IconFolderMove />,
    },
    {
        title: 'Help instrumenting events',
        description: "Complex tracking needs? Privacy requirements? We'll get you setup with the right tools.",
        icon: <IconCode2 />,
    },
    {
        title: 'Help training your team',
        description: "We'll make sure your team knows their analytics from their elbows with minimal meetings.",
        icon: <IconMessage />,
    },
    {
        title: 'Help integrating your stack',
        description: "Stripe? Snowflake? Supabase? Whatever tools you use, we'll get them talking to PostHog.",
        icon: <IconPlug />,
    },
]

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
                } px-4 sm:px-5 pt-6 sm:pt-10 pb-10`}
            >
                <div className="flex gap-1.5 justify-center items-center mb-3">
                    <span className="w-6 h-6 text-blue">
                        <IconWrench />
                    </span>
                    <span className="text-[15px] font-semibold text-opacity-60">Professional Services</span>
                </div>
                <Hero
                    title='<span class="text-red dark:text-yellow">Hire a PostHog expert</span> <br/>to get up and running'
                    subtitle="We'll do the heavy lifting. You do the fun stuff."
                />
                <div className="flex justify-center gap-2 mb-6">
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
            </div>

            <div id="features">
                <section className="max-w-7xl mx-auto px-4 sm:px-5 pb-6">
                    <div className="mb-2">
                        <ul
                            className={`list-none p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${subfeaturesItemCount} gap-4`}
                        >
                            {subfeatures.map((subfeature, index) => {
                                return <Subfeature {...subfeature} key={index} />
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col-reverse items-center md:flex-row gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-10 mb-6 sm:mb-8 md:mb-10">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
                                Want to show off your office?
                                <br />
                                <span className="text-red dark:text-yellow">We can do on-site training.</span>
                            </h2>
                            <p>
                                Most people don't want to sit through a video call for hours on end, including us. So,
                                we can come to you for a few days of face-to-face training. Our engineers can handle all
                                your technical questions, and they'll bring some merch with them too.
                            </p>
                            <p className="text-sm mb-4 border-l-4 border-primary pl-2 py-1">
                                <strong>Work remotely?</strong> Same. Let's just do it on Google Meet instead. Don't
                                worry, we'll still send merch.
                            </p>
                        </div>
                        <aside className="shrink-0 w-full md:w-auto md:basis-[500px] flex justify-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/school_92f4d92503.png"
                                alt="So starteth the lessoneth"
                                className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[470px]"
                            />
                        </aside>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mt-12 mb-8 px-2">
                        Here's what the process looks like...
                    </h2>
                    <div className="grid @xl:grid-cols-2 gap-y-4 @xl:gap-y-8 pb-12 mt-16 sm:mt-12 max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                            Step one
                            <br />
                            <span className="text-red dark:text-yellow">Introductions</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="mb-4">
                                We start by chatting about what you need and assigning a dedicated PostHog staff member
                                to work with you. We're polite like that.
                            </p>
                            <p className="mb-3">Team members who insist they do enjoy quick calls include...</p>
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
                            Step two
                            <br />
                            <span className="text-red dark:text-yellow">Migration</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="m-0">
                                Coming from an existing provider? We'll help you bring your data with you. We cn
                                implement dashboards, switch feature flags, and import historic data from tools such
                                as...
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
                            Step three
                            <br />
                            <span className="text-red dark:text-yellow">Instrumentation</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="m-0">
                                We'll setup PostHog for your marketing site and app so you can track users
                                comprehensively, then tune your events so you only pay for what you need. We'll tailor
                                everything to your privacy requirements too.
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
                            Step four
                            <br />
                            <span className="text-red dark:text-yellow">Training</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <p className="m-0">
                                This bit is always a bit fuzzy, because it depends on what you need. Custom dashboards?
                                An A/B testing strategy? User surveys? Whatever it is, we'll help you get it done in
                                line with our best practices.
                            </p>
                            <p className="text-sm mt-2 border-l-4 border-primary pl-2 py-1">
                                <strong>Optional:</strong> Want some sweet PostHog merch? Can do. We can also train you{' '}
                                <Link className="underline font-medium" to="/academy">
                                    how to use Post-it notes
                                </Link>{' '}
                                more effectively while we're at it. If you want.{' '}
                            </p>
                        </div>
                        <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary mb-0">
                            Step six
                            <br />
                            <span className="text-red dark:text-yellow">Integration</span>
                        </h3>
                        <div className="@xl:border-b border-primary pb-8">
                            <div className="flex flex-col gap-2">
                                <p className="m-0">
                                    PostHog offers its own data warehouse, but we can also integrate with your current
                                    data stack. That means...
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
                    <div className="flex justify-center mt-2 sm:mt-12">
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

            <section className="relative pt-8 md:pt-12 px-5 lg:px-0 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2">Ready to get started?</h2>
                <h3 className="text-lg sm:text-xl text-center mb-2 sm:mb-12 opacity-75">
                    Let's talk about what you need
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
