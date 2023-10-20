import React, { useState } from 'react'
import Layout from '../Layout'
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
import Tooltip from 'components/Tooltip'
import { Chevron, Close, Close2, Minus, Plus } from 'components/Icons'
import { graphql, useStaticQuery } from 'gatsby'

const features = [
    '$50,000 in PostHog credit for 12 months<sup>1</sup>',
    'Exclusive PostHog merch for founders<sup>2</sup>',
    'Access to our YC founder Slack community',
    'Onboarding session to get you started',
    'Our CEO on WhatsApp or SMS',
]

const cards = [
    {
        question: 'Where do key events happen in my user’s sessions?',
    },
    {
        question: "How do I understand my users' behavior in funnels?",
        url: '#',
    },
    {
        question: 'How do I understand my user journeys?',
        url: '#',
    },
    {
        question: 'How can I understand what my power users are doing?',
        url: '#',
    },
    {
        question: 'How do I figure out how to lower churn?',
        url: '#',
    },
    {
        question: 'What errors are being logged to the console?',
    },
    {
        question: 'How does my user experience differ across regions?',
    },
    {
        question: 'What is a user’s DOM interactive time?',
        url: '#',
    },
    {
        question: 'How fast does my app load?',
    },
    {
        question: 'What is a user’s First Contentful Paint time?',
        url: '#',
    },
    {
        question: 'What is a user’s Page Loaded time?',
        url: '#',
    },
    {
        question: 'How does my user experience differ across devices?',
    },
]

const Card = ({ question, url }) => {
    return (
        <>
            {url ? (
                <li className="text-2xl font-bold">
                    <Link to={url} className="block text-red dark:text-yellow font-bold py-1">
                        {question}
                    </Link>
                </li>
            ) : (
                <li className="text-2xl font-bold py-1">{question}</li>
            )}
        </>
    )
}

const VsCompetitor = ({ title, children }) => {
    return (
        <div
            className={`rounded-md p-4 border border-light dark:border-dark bg-white/50 dark:bg-accent-dark flex flex-col-reverse md:flex-row gap-4`}
        >
            <div className="flex-1">
                <h4 className="leading-tight">{title}</h4>
                {children}
            </div>
            <div className="shrink-0 basis-[167px] text-center">
                <StaticImage src="../images/products/competitors-sr.png" className="max-w-[167px]" />
            </div>
        </div>
    )
}
const VsPostHog = ({ children }) => {
    return (
        <div
            className={`rounded-md p-4 border-2 border-blue dark:border-blue bg-white/50 dark:bg-accent-dark flex flex-col md:flex-row gap-4`}
        >
            <div className="shrink-0 basis-[145px] text-center">
                <StaticImage src="../images/products/competitors-hog.png" className="max-w-[145px]" />
            </div>
            <div className="flex-1">
                <h4 className="leading-tight">Reasons to choose (PostHog logo)</h4>
                {children}
            </div>
        </div>
    )
}

const Accordion = ({ children, label, active, initialOpen = false, className = '' }) => {
    const [open, setOpen] = useState(initialOpen)
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                type="button"
                className={`py-3 w-full border-t first:border-0 border-border dark:border-dark ${className}`}
            >
                <div className={`${active ? '' : ''} flex justify-between items-center text-left`}>
                    <p className="m-0 font-bold text-sm text-red dark:text-yellow">{label}</p>
                    {open ? <Minus /> : <Plus />}
                </div>
            </button>
            <div className={` ${open ? 'pb-2' : 'hidden'}`}>{children}</div>
        </>
    )
}

export const SessionReplay = () => {
    const { contra, hasura, netdata, pry } = useStaticQuery(graphql`
        fragment ProductCustomerFragment on Mdx {
            fields {
                slug
            }
            frontmatter {
                logo {
                    publicURL
                }
                logoDark {
                    publicURL
                }
            }
        }
        {
            contra: mdx(slug: { eq: "customers/contra" }) {
                ...ProductCustomerFragment
            }
            hasura: mdx(slug: { eq: "customers/hasura" }) {
                ...ProductCustomerFragment
            }
            netdata: mdx(slug: { eq: "customers/netdata" }) {
                ...ProductCustomerFragment
            }
            pry: mdx(slug: { eq: "customers/pry" }) {
                ...ProductCustomerFragment
            }
        }
    `)
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
                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4">
                        <CustomerCard
                            outcome="improved conversion rates by 10-20%"
                            quote="We wouldn't have noticed that needed fixing without PostHog's session replays."
                            customer={hasura}
                        />
                        <CustomerCard
                            outcome="increased registrations by 30%"
                            quote="From [funnels], we could easily jump to session replays to see the drop-off point."
                            customer={contra}
                        />
                        <CustomerCard
                            outcome="reduced back-and-forth in community support"
                            quote="Session replay is... an essential tool for Netdata."
                            customer={netdata}
                        />
                        <CustomerCard
                            outcome="improved registrations by 20-30%"
                            quote="Even Pry's support team... uses replays to understand how... bug occurred."
                            customer={pry}
                        />
                    </ul>
                </section>
            </div>

            <section className="hidden md:block sticky top-[107px] bg-accent dark:bg-accent-dark border-y border-border dark:border-border-dark z-50">
                <ul className="list-none flex gap-4 justify-center pt-1">
                    <li>
                        <span className="inline-block text-sm py-2 px-3 border border-light dark:border-dark !border-b-transparent -mb-px font-bold bg-light dark:bg-dark rounded-tl-sm rounded-tr-md">
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
            </section>

            <section className="max-w-7xl mx-auto px-5 py-12">
                <h3 className="text-3xl text-center mb-8">Features</h3>
                <ul className="list-none p-0 grid md:grid-cols-3 gap-12 mb-8">
                    <Feature
                        image={<StaticImage src="./images/timeline.png" width={420} />}
                        name="Event timeline"
                        description="History of everything that happened in a user's session"
                    />
                    <Feature
                        image={<StaticImage src="./images/network.png" width={420} />}
                        name="Console logs"
                        description="Debug issues faster by browsing the user's console"
                    />
                    <Feature
                        image={<StaticImage src="./images/console.png" width={420} />}
                        name="Network tab"
                        description="Analyze performance and network calls"
                    />
                </ul>

                <ul className="list-none p-0 grid grid-cols-2 md:grid-cols-5 gap-4">
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
            </section>

            <section className="bg-accent dark:bg-accent-dark">
                <div className="max-w-7xl mx-auto px-5 py-12">
                    <div className="md:grid md:grid-cols-12 md:gap-12">
                        <div className="col-span-5">
                            <h3 className="text-4xl md:text-5xl text-blue leading-tight">
                                Answer all of these questions (and more) with PostHog Session Replay.
                            </h3>
                        </div>
                        <div className="col-span-7 relative after:absolute after:bg-gradient-to-b after:from-accent/0 after:to-accent/100 dark:after:from-accent-dark/0 dark:after:to-accent-dark/100 after:h-40 after:bottom-0 after:left-0 after:w-full after:content-[''] after:z-10">
                            <ul className="list-none p-0">
                                {cards.map((card, index) => {
                                    return <Card {...card} key={index} />
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-5 py-12">
                <div className="flex flex-col-reverse md:flex-row md:gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                        <p className="">
                            Use session replay free. Or enter a credit card for advanced features.{' '}
                            <br className="hidden lg:block" />
                            Either way, your first 15,000 recordings are free – every month.
                        </p>
                    </div>
                    <div className="w-80">image</div>
                </div>

                <div className="md:flex justify-between gap-12">
                    <div className="flex-1 grid grid-cols-3 max-w-4xl text-sm md:text-base">
                        {/* header row */}
                        <div className="bg-accent dark:bg-accent-dark rounded-sm leading-tight p-2 mt-2">
                            <strong>Plans</strong>
                        </div>
                        <div className="bg-accent dark:bg-accent-dark rounded-sm leading-tight p-2 mt-2">
                            <strong className="block">Free</strong>
                            <span className="block text-[12px] md:text-sm leading-tight opacity-75">
                                No credit card required
                            </span>
                        </div>
                        <div className="bg-accent dark:bg-accent-dark rounded-sm leading-tight p-2 mt-2">
                            <strong className="block">Unlimited</strong>
                            <span className="block text-[12px] md:text-sm leading-tight opacity-75">
                                All features, no limitations
                            </span>
                        </div>

                        {/* body row */}
                        <div className="p-2">Recordings</div>
                        <div className="p-2">
                            <strong>15,000</strong>
                            <span className="opacity-75 text-[12px] md:text-sm">/mo</span>
                        </div>
                        <div className="p-2">
                            <strong>Unlimited</strong>
                        </div>

                        <div className="p-2">Data retention</div>
                        <div className="p-2">
                            <strong>1 month</strong>
                        </div>
                        <div className="p-2">
                            <strong>3 months</strong>
                        </div>

                        {/* header row */}
                        <div className="col-span-3 bg-accent dark:bg-accent-dark rounded-sm leading-tight p-2 mt-2">
                            <strong>Features</strong>
                        </div>

                        <div className="p-2">
                            <Tooltip
                                content={() => (
                                    <>
                                        <p className="text-sm m-0">Description!</p>
                                    </>
                                )}
                                tooltipClassName="max-w-[325px] shadow-xl rounded text-xs backdrop-blur bg-white dark:bg-accent-dark px-4 py-2"
                                placement="right"
                            >
                                <span className="border-b border-dotted border-border dark:border-border-dark">
                                    Console logs
                                </span>
                            </Tooltip>
                        </div>
                        <div className="p-2">
                            <strong>Yes</strong>
                        </div>
                        <div className="p-2">
                            <strong>Yes</strong>
                        </div>

                        {/* header row */}
                        <div className="col-span-3 bg-accent dark:bg-accent-dark rounded-sm leading-tight p-2 mt-2 mb-1">
                            <strong>Monthly pricing</strong>
                        </div>
                        <div className="px-2 py-1">First 15,000 recordings</div>
                        <div className="px-2 py-1">
                            <strong>Free</strong>
                        </div>
                        <div className="px-2 py-1">
                            <strong>Free</strong>
                        </div>
                        <div className="px-2 py-1">15,001 - 50,000</div>
                        <div className="px-2 py-1">
                            <strong>-</strong>
                        </div>
                        <div className="px-2 py-1">
                            <strong>$0.0050</strong>
                        </div>
                        <div></div>
                        <div>
                            <CallToAction href="#" type="primary" size="md">
                                Get started - free
                            </CallToAction>
                        </div>
                        <div>
                            <CallToAction href="#" type="primary" size="md">
                                Get started - free
                            </CallToAction>
                        </div>
                    </div>

                    <div className="w-80">
                        <h4 className="text-3xl">FAQs</h4>

                        <Accordion initialOpen label="How do I know what my volume is?">
                            hello world
                        </Accordion>
                        <Accordion label="Do I pay anything for stored recordings?">hello world</Accordion>
                        <Accordion label="Is there a free trial on the Unlimited (paid) plan?">
                            <p>
                                We have a generous free tier on every paid plan so you can try out the features before
                                paying any money (though you will need to enter your credit card info). If you have
                                additional needs, such as enterprise features, please{' '}
                                <Link to="/contact-sales">get in touch.</Link>
                            </p>
                        </Accordion>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-5">
                <section>
                    <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>

                    <div className="overflow-x-auto max-w-vw -mx-5 px-5 pb-2 mb-20 md:mx-0 md:px-0">
                        <div className="flex-1 grid grid-cols-6 max-w-7xl text-sm md:text-base divide-y divide-border dark:divide-border-dark mx-auto">
                            {/* header row */}
                            <div className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2 border-t border-border dark:border-border-dark">
                                <strong></strong>
                            </div>
                            <div className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2">
                                <strong className="block">Hotjar</strong>
                                <span className="block text-[12px] md:text-sm leading-tight">
                                    <Link to="#">See full comparison</Link>
                                </span>
                            </div>
                            <div className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2">
                                <strong className="block">LogRocket</strong>
                                <span className="block text-[12px] md:text-sm leading-tight">
                                    <Link to="#">See full comparison</Link>
                                </span>
                            </div>
                            <div className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2">
                                <strong className="block">Matomo</strong>
                                <span className="block text-[12px] md:text-sm leading-tight">
                                    <Link to="#">See full comparison</Link>
                                </span>
                            </div>
                            <div className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2">
                                <strong className="block">FullStory</strong>
                                <span className="block text-[12px] md:text-sm leading-tight">
                                    <Link to="#">See full comparison</Link>
                                </span>
                            </div>
                            <div className="bg-white !border-t-2 !border-x-2  !border-l-blue !border-r-blue !border-t-blue dark:bg-accent-dark rounded-sm rounded-bl-none rounded-br-none leading-tight p-2 flex justify-center items-center">
                                <strong className="block">PostHog logo</strong>
                            </div>

                            {/* body row */}
                            <div className="p-2">Single-page app support</div>
                            <div className="p-2">
                                <strong>Check</strong>
                            </div>
                            <div className="p-2">
                                <strong>Check</strong>
                            </div>
                            <div className="p-2">
                                <strong>Check</strong>
                            </div>
                            <div className="p-2">
                                <strong>Check</strong>
                            </div>
                            <div className="p-2 bg-white !border-x-2 !border-l-blue !border-r-blue">
                                <strong>Check</strong>
                            </div>

                            <div className="p-2">iOS recordings</div>
                            <div className="p-2">
                                <strong>X</strong>
                            </div>
                            <div className="p-2">
                                <strong>Check</strong>
                            </div>
                            <div className="p-2">
                                <strong>Check</strong>
                            </div>
                            <div className="p-2">
                                <strong>Check</strong>
                            </div>
                            <div className="p-2 bg-white !border-x-2 !border-l-blue !border-r-blue">In beta</div>

                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="p-2 bg-white !border-x-2 !border-b-2 !border-x-blue !border-b-blue rounded rounded-tl-none rounded-tr-none text-center">
                                <CallToAction href="#" type="primary" size="md">
                                    Get started - free
                                </CallToAction>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h3 className="text-center mb-8">So, what's best for you?</h3>
                    <div className="mb-8 grid md:grid-cols-2 gap-4">
                        <VsCompetitor title="Reasons a competitor might be better for you (for now...)">
                            <ul>
                                <li>
                                    You need heatmaps or scrollmaps
                                    <ul>
                                        <li className="text-sm">PostHog is currently limited to clickmaps</li>
                                    </ul>
                                </li>
                                <li>Error tracking and alerting</li>
                                <li>
                                    Mobile SDKs (in progress...)
                                    <ul>
                                        <li>
                                            <Link to="https://github.com/PostHog/posthog/issues/13269" external>
                                                React Native
                                            </Link>{' '}
                                            |&nbsp;
                                            <Link to="https://github.com/PostHog/posthog/issues/12344" external>
                                                iOS
                                            </Link>{' '}
                                            |&nbsp;
                                            <Link to="https://github.com/PostHog/posthog/issues/13267" external>
                                                Android
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </VsCompetitor>
                        <VsPostHog>
                            <ul>
                                <li>
                                    Interlinking with feature flags and insights
                                    <ul>
                                        <li className="text-sm">Jump between them easily</li>
                                    </ul>
                                </li>
                                <li>Collaboration, sharing, and embedding exporting recordings</li>
                                <li>No limits on how many recordings captured</li>
                            </ul>
                        </VsPostHog>
                    </div>

                    <p className="text-center text-sm font-medium">
                        Have questions about PostHog? <br className="md:hidden" />
                        <Link to="/questions/session-replay">Ask the community</Link> or{' '}
                        <Link to="/contact-sales">book a demo</Link>.
                    </p>
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Install &amp; customize</h3>

                    <div className="text-center">block from homepage goes here (with additional 1st slide)</div>
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Explore the docs</h3>

                    <div className="text-center">
                        Each column should be a docs subsection for that product (based on a key of some kind?)
                    </div>
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The Monitoring team are the folks responsible for building session
                        replay.
                    </p>
                    <p className="text-center">(Shockingly, this team prefers their pizza without pineapple.)</p>

                    <div className="text-center">people grid here, and bonus points for any listed job</div>
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Roadmap &amp; changelog</h3>

                    <p className="text-center">Here’s what the team is up to.</p>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="opacity-60 text-base">Latest update</h4>

                            <div className="text-sm opacity-60">Sept 2023</div>
                            <h4>
                                <Link
                                    to="#"
                                    className="text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow"
                                >
                                    Update title
                                </Link>
                            </h4>
                            <p>latest update here</p>

                            <CallToAction href="/changelog" type="secondary" size="sm">
                                Visit the changelog
                            </CallToAction>
                        </div>

                        <div>
                            <h4 className="opacity-60 text-base">Up next</h4>
                            roadmap widget(s) go here
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Questions?</h3>

                    <p className="text-center">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center">
                        <CallToAction href="/questions/session-replay" type="secondary" size="sm">
                            View session replay questions
                        </CallToAction>
                    </div>

                    <div className="text-center">question table here</div>
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Pairs with...</h3>

                    <p className="text-center">
                        PostHog products are natively designed to be interoperable using Product OS.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-accent dark:bg-accent-dark rounded-md p-4">
                            icon
                            <h4 className="mt-2 mb-0">
                                <Link to="/product-analytics">Product analytics</Link>
                            </h4>
                            <p>Jump into a playlist of session recordings directly from any time series in a graph</p>
                        </div>
                    </div>
                </section>
                <section className="mb-20">
                    <div className="text-center">Call to action section from homepage</div>
                </section>
            </div>
        </Layout>
    )
}

export default SessionReplay
