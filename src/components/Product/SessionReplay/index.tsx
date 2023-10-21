import React, { useState } from 'react'
import Layout from '../../Layout'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import { IconRewindPlay, IconMinus, IconPlus, IconGraph, IconFlask, IconToggle } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { graphql, useStaticQuery } from 'gatsby'
import { PlanComparison } from 'components/Pricing/PlanComparison'
import ContentViewer from 'components/ContentViewer'
import SessionReplay from 'components/Home/CodeBlocks/SessionReplay'
import { docsMenu } from '../../../navs'
import { MenuItem } from 'components/PostLayout/Menu'
import TeamRoadmap from 'components/TeamRoadmap'
import RecentChange from '../RecentChange'
import TeamMembers from '../TeamMembers'
import Questions from '../Questions'
import CTA from 'components/Home/CTA'
import Comparison from '../Comparison'
import Logo from 'components/Logo'
import { Accordion } from 'components/Products/Accordion'

const comparison = [
    {
        feature: 'Single-page app support',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'iOS recordings',
        companies: {
            Hotjar: false,
            LogRocket: true,
            Matomo: false,
            FullStory: true,
            PostHog: '<a href="https://github.com/PostHog/posthog/issues/12344">In beta</a>',
        },
    },
    {
        feature: 'Android recordings',
        companies: {
            Hotjar: false,
            LogRocket: true,
            Matomo: false,
            FullStory: true,
            PostHog: '<a href="https://github.com/PostHog/posthog/issues/13267">On the roadmap</a>',
        },
    },
    {
        feature: 'Identity detection',
        companies: {
            Hotjar: false,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target recordings by URL',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by sample size',
        companies: {
            Hotjar: true,
            LogRocket: false,
            Matomo: true,
            FullStory: false,
            PostHog: true,
        },
    },
    {
        feature: 'Filter recordings by user or event',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Rage-click detection',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: false,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Privacy masking for sensitive content',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Export recordings',
        companies: {
            Hotjar: true,
            LogRocket: false,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Recording retention policy',
        companies: {
            Hotjar: '12 months',
            LogRocket: '1 month',
            Matomo: '24 months',
            FullStory: '1 month',
            PostHog: 'Up to 3 months',
        },
    },
]

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
                <StaticImage src="../../../images/products/competitors-sr.png" className="max-w-[167px]" />
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
                <StaticImage src="../../../images/products/competitors-hog.png" className="max-w-[145px]" />
            </div>
            <div className="flex-1">
                <h4 className="leading-tight flex items-end gap-2">
                    <span>Reasons to choose</span> <Logo className="w-32" />
                </h4>
                {children}
            </div>
        </div>
    )
}

const WorksWith = ({ children, items }) => {
    return (
        <section className="mb-20">
            <h3 className="text-3xl lg:text-4xl text-center">Pairs with...</h3>

            <p className="text-center">PostHog products are natively designed to be interoperable using Product OS.</p>
            <div className={`grid gap-8 md:grid-cols-${items}`}>{children}</div>
        </section>
    )
}

const WorksWithArray = [
    {
        icon: <IconGraph />,
        product: 'Product analytics',
        description: 'Jump into a playlist of session recordings directly from any time series in a graph',
        url: '/product-analytics',
    },
    {
        icon: <IconToggle />,
        product: 'Feature flags',
        description: "See which feature flags are enabled for a user's session",
        url: '/feature-flags',
    },
    {
        icon: <IconFlask />,
        product: 'A/B testing',
        description:
            'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
        url: '/ab-testing',
    },
]

const WorksWithItem = ({ icon, product, description, url }) => {
    return (
        <>
            <Link
                to={url}
                className="bg-accent dark:bg-accent-dark rounded-md p-6 relative hover:top-[-1px] hover:scale-[1.01] active:top-[1px] active:scale-[1] transition-all"
            >
                <span className="inline-block w-8 opacity-50 text-primary dark:text-primary-dark">{icon}</span>
                <h4 className="mt-2 mb-0">{product}</h4>
                <p className="text-primary dark:text-primary-dark mb-0 text-[15px] opacity-75">{description}</p>
            </Link>
        </>
    )
}

const DocLinks = ({ menu }) => {
    const organized = {}
    let currentMenu
    menu.forEach((menuItem) => {
        const { name } = menuItem
        if (!('url' in menuItem)) {
            currentMenu = name
            organized[name] = []
        } else if (currentMenu) {
            organized[currentMenu].push(menuItem)
        }
    })

    const menuOrganized = Object.keys(organized)

    return (
        <ul className={`list-none m-0 p-0 flex flex-col md:flex-row justify-center gap-4 md:gap-20`}>
            {menuOrganized.map((title) => {
                return (
                    <li key={title}>
                        <p className="opacity-50 m-0 font-semibold">{title}</p>
                        <ul className="list-none m-0 p-0 mt-2 flex flex-col">
                            {organized[title].map(({ name, icon, color, url, badge }) => {
                                return (
                                    <li key={name + url} to={url}>
                                        <Link
                                            to={url}
                                            className="flex items-center relative px-2 pt-1.5 pb-1 mb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                                        >
                                            <MenuItem badge={badge} color={color} icon={icon} name={name} />
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

export const ProductSessionReplay = () => {
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
            <div className="max-w-7xl mx-auto px-5 py-10 md:py-20">
                <Hero
                    icon={<IconRewindPlay />}
                    product="Session replay"
                    title="Watch visitors interact with your app"
                    description='Session replay helps you <span class="bg-yellow/25 p-0.5">diagnose issues</span> and <span class="bg-yellow/25 p-0.5">understand user behavior</span> in your product or
                    website.'
                />

                <div className="-mr-[20px] md:-mr-[60px]">
                    <StaticImage
                        src="../../../images/products/screenshot-session-replay.png"
                        alt=""
                        className="w-full max-w-[1330px]"
                    />
                </div>

                <section>
                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20">
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

            <section className="hidden md:block sticky top-[-1px] reasonable:top-[107px] bg-accent dark:bg-accent-dark border-y border-border dark:border-border-dark z-50">
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

            <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
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
                        icon="IconBolt"
                    />
                    <Subfeature
                        title="Automatic playlists"
                        description="Filter by user behavior or time"
                        icon="IconPlaylist"
                    />
                    <Subfeature
                        title="Web or mobile session recording"
                        description="Web or iOS (beta) available"
                        icon="IconPhone"
                    />
                    <Subfeature
                        title="Download recordings"
                        description="Retain recordings beyond data retention limits"
                        icon="IconDownload"
                    />
                    <Subfeature
                        title="Block sensitive data"
                        description="Disable capturing data from any DOM element with CSS"
                        icon="IconPassword"
                    />
                </ul>
            </section>

            <section className="bg-accent dark:bg-accent-dark">
                <div className="max-w-7xl mx-auto px-5 py-20">
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
            <section className="max-w-7xl mx-auto px-5 py-20">
                <div className="flex flex-col-reverse md:flex-row md:gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                        <p className="">
                            Use session replay free. Or enter a credit card for advanced features.{' '}
                            <br className="hidden lg:block" />
                            Either way, your first 15,000 recordings are free – every month.
                        </p>
                    </div>
                    <div className="md:w-96">
                        <StaticImage
                            placeholder="none"
                            quality={100}
                            src="../../Home/Slider/images/session-recording-hog.png"
                            alt=""
                        />
                    </div>
                </div>

                <div className="md:flex justify-between items-start gap-12">
                    <PlanComparison showHeaders={false} showCTA={false} groupsToShow={['session_replay']} />

                    <div className="md:w-96 md:mt-4">
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
                    <Comparison comparison={comparison} />
                </section>

                <section className="mb-20">
                    <h3 className="text-center mb-8">So, what's best for you?</h3>
                    <div className="mb-8 grid md:grid-cols-2 gap-4">
                        <VsCompetitor title="Reasons a competitor might be better for you (for now...)">
                            <ul>
                                <li>
                                    You need heatmaps or scrollmaps
                                    <ul className="pl-6">
                                        <li className="text-sm">PostHog is currently limited to clickmaps</li>
                                    </ul>
                                </li>
                                <li>Error tracking and alerting</li>
                                <li>
                                    Mobile SDKs (in progress...)
                                    <ul className="pl-6">
                                        <li className="text-sm">
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
                                    <ul className="pl-6">
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
                    <h3 className="text-3xl lg:text-4xl text-center mb-0">Install &amp; customize</h3>
                    <p className="mt-0 opacity-50 text-center">
                        Here are some ways you can fine tune how you implement session replays.
                    </p>

                    <ContentViewer sticky={false} scrollToTop={false} content={[...SessionReplay]} />
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-0">Explore the docs</h3>
                    <p className="mt-0 opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children[2].children} />
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The Monitoring team are the folks responsible for building session
                        replay.
                    </p>
                    <TeamMembers teamName="Monitoring" />
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Roadmap &amp; changelog</h3>

                    <p className="text-center">Here’s what the team is up to.</p>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <RecentChange team="Monitoring" />
                        </div>

                        <div>
                            <h4 className="opacity-60 text-base">Up next</h4>
                            <TeamRoadmap team="Monitoring" />
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Questions?</h3>

                    <p className="text-center">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href="/questions/session-replay" type="secondary" size="sm">
                            View session replay questions
                        </CallToAction>
                    </div>

                    <Questions topicId={20} />
                </section>

                <WorksWith items={3}>
                    {WorksWithArray.map((card, index) => {
                        return <WorksWithItem {...card} key={index} />
                    })}
                </WorksWith>

                <section className="mb-20">
                    <CTA />
                </section>
            </div>
        </Layout>
    )
}

export default ProductSessionReplay
