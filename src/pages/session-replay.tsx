import React, { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'components/Link'
import HubSpotForm from 'components/HubSpotForm'
import YCsign from '../images/max-yc.png'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Check2 } from 'components/Icons'
import { RewindPlay } from '@posthog/icons'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'

const features = [
    '$50,000 in PostHog credit for 12 months<sup>1</sup>',
    'Exclusive PostHog merch for founders<sup>2</sup>',
    'Access to our YC founder Slack community',
    'Onboarding session to get you started',
    'Our CEO on WhatsApp or SMS',
]

const QuoteBlock = {}

export const ProductProductAnalytics = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-5 py-12">
                <div className="flex gap-1 justify-center items-center mb-2">
                    <span className="w-5 h-5 text-yellow">
                        <RewindPlay />
                    </span>
                    <span className="text-[15px] font-semibold text-opacity-60">Session replay</span>
                </div>
                <h1 className="text-6xl text-center">Watch visitors interact with your app</h1>
                <p className="text-lg font-semibold text-center text-opacity-75">
                    Session replay helps you <span className="text-red dark:text-yellow">diagnose issues</span> and{' '}
                    <span className="text-red dark:text-yellow">understand user behavior</span> in your product or
                    website.
                </p>

                <StaticImage
                    src="../images/products/screenshot-session-replay.png"
                    alt=""
                    className="w-full max-w-[1330px] -mr-[60px]"
                />

                <section>
                    <ul className="list-none p-0 grid grid-cols-4 gap-4">
                        <CustomerCard
                            logo="hasura"
                            outcome="improved conversion rates by 10-20%"
                            quote="We wouldn't have noticed that needed fixing without PostHog's session replays."
                            link="href"
                        />
                        <CustomerCard
                            logo="contra"
                            outcome="increased registrations by 30%"
                            quote="From [funnels], we could easily jump to session replays to see the drop-off point."
                            link="href"
                        />
                        <CustomerCard
                            logo="netdata"
                            outcome="reduced back-and-forth in community support"
                            quote="Session replay is... an essential tool for Netdata."
                            link="href"
                        />
                        <CustomerCard
                            logo="pry"
                            outcome="improved registrations by 20-30%"
                            quote="Even Pry's support team... uses replays to understand how... bug occurred."
                            link="href"
                        />
                    </ul>
                </section>
            </div>

            <div className="sticky top-[107px] bg-accent border-y border-border dark:border-border-dark z-50">
                <ul className="list-none flex gap-4 justify-center pt-1">
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-light dark:border-dark border-b-transparent -mb-px font-bold bg-light dark:bg-dark rounded-tl-sm rounded-tr-md">
                            Features
                        </span>
                    </li>
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                            Pricing
                        </span>
                    </li>
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                            PostHog vs...
                        </span>
                    </li>
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                            Installation
                        </span>
                    </li>
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                            Docs
                        </span>
                    </li>
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                            Meet the team
                        </span>
                    </li>
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                            Roadmap &amp; changelog
                        </span>
                    </li>
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-transparent border-b-transparent -mb-px text-opacity-60 hover:border hover:border-light hover:dark:border-dark hover:bg-light hover:dark:bg-dark hover:rounded-tl-sm hover:rounded-tr-md">
                            Questions
                        </span>
                    </li>
                </ul>
            </div>

            <div className="max-w-7xl mx-auto px-5 py-12">
                <h3 className="text-3xl text-center mb-8">Features</h3>
                <ul className="list-none p-0 grid grid-cols-3 gap-12 mb-8">
                    <Feature
                        name="Event timeline"
                        description="History of everything that happened in a user's session"
                    />
                    <Feature name="Console logs" description="Debug issues faster by browsing the user's console" />
                    <Feature name="Network tab" description="Analyze performance and network calls" />
                </ul>

                <ul className="list-none p-0 grid grid-cols-5 gap-4">
                    <Subfeature
                        title="Capture sessions without extra code"
                        description="Works with PostHog.js"
                        icon="Bolt"
                    />
                    <Subfeature
                        title="Automatic playlists"
                        description="Filter by user behavior or time"
                        icon="Playlist"
                    />
                    <Subfeature
                        title="Web or mobile session recording"
                        description="Web or iOS (beta) available"
                        icon="Mobile"
                    />
                    <Subfeature
                        title="Download recordings"
                        description="Retain recordings beyond data retention limits"
                        icon="Download"
                    />
                    <Subfeature
                        title="Block sensitive data"
                        description="Disable capturing data from any DOM element with CSS"
                        icon="Mask"
                    />
                </ul>
            </div>

            <div className="bg-accent dark:bg-accent-dark">
                <div className="max-w-7xl mx-auto px-5 py-12">
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl text-blue">
                                Answer all of these questions (and more) with PostHog Session Replay.
                            </h3>
                        </div>
                        <div>
                            <ul className="list-none">
                                <li className="text-2xl font-bold">
                                    Where do key events happen in my user's sessions?
                                </li>
                                <li className="text-2xl font-bold">
                                    <Link to="#" className="text-red dark:text-yellow">
                                        How do I understand my users' behavior in funnels?
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductProductAnalytics
