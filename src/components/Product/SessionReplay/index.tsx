import React from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import {
    IconRewindPlay,
    IconBolt,
    IconPlaylist,
    IconPhone,
    IconDownload,
    IconPassword,
    IconGraph,
    IconFlask,
    IconToggle,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { TutorialCard } from 'components/Products/TutorialCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { Marquee } from 'components/Products/Marquee'
import { graphql, useStaticQuery } from 'gatsby'
import { PlanComparison } from 'components/Pricing/PlanComparison'
import ContentViewer from 'components/ContentViewer'
import SessionReplay from 'components/Home/CodeBlocks/SessionReplay'
import { docsMenu } from '../../../navs'
import TeamRoadmap from 'components/TeamRoadmap'
import RecentChange from '../RecentChange'
import TeamMembers from '../TeamMembers'
import Questions from '../Questions'
import CTA from 'components/Home/CTA'
import Comparison from '../Comparison'
import { PairsWith } from 'components/Products/PairsWith'
import { PairsWithItem } from 'components/Products/PairsWith/item'
import { Question } from 'components/Products/Question'
import { VsCompetitor } from 'components/Products/Competitor'
import { VsPostHog } from 'components/Products/Competitor/VsPostHog'
import { DocLinks } from 'components/Products/DocsLinks'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import { FAQ } from 'components/Products/FAQ'
import Install from '../Install'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'

const product = {
    slug: 'session-replay',
    lowercase: 'session replay',
    capitalized: 'Session Replay',
    freeTier: '15,000 recordings',
}

const team = 'Monitoring'
const teamSlug = '/handbook/small-teams/monitoring'

const featuresPerRow = 3
const features = [
    {
        title: 'Event timeline',
        description: "History of everything that happened in a user's session",
        image: <StaticImage src="./images/timeline.png" width={420} />,
        border: true,
    },
    {
        title: 'Console logs',
        description: "Debug issues faster by browsing the user's console",
        image: <StaticImage src="./images/console.png" width={420} />,
        border: true,
    },
    {
        title: 'Network monitor',
        description: 'Analyze performance and network calls',
        image: <StaticImage src="./images/network.png" width={420} />,
        border: true,
    },
]

const subfeaturesItemCount = 5
const subfeatures = [
    {
        title: 'Capture sessions without extra code',
        description: 'Works with PostHog.js',
        icon: <IconBolt />,
    },
    {
        title: 'Automatic playlists',
        description: 'Filter by user behavior or time',
        icon: <IconPlaylist />,
    },
    {
        title: 'Web or mobile session recording',
        description: 'Web or iOS (beta) available',
        icon: <IconPhone />,
    },
    {
        title: 'Download recordings',
        description: 'Retain recordings beyond data retention limits',
        icon: <IconDownload />,
    },
    {
        title: 'Block sensitive data',
        description: 'Disable capturing data from any DOM element with CSS',
        icon: <IconPassword />,
    },
]

const questions = [
    { question: 'Where do key events happen in my user’s sessions?' },
    {
        question: "How do I understand my users' behavior in funnels?",
        url: '/tutorials/explore-insights-session-recordings#watching-users-through-funnels',
    },
    {
        question: 'How do I understand my user journeys?',
        url: '/tutorials/explore-insights-session-recordings#watching-journeys-from-user-paths',
    },
    {
        question: 'How can I understand what my power users are doing?',
        url: '/tutorials/explore-insights-session-recordings#find-and-analyze-outliers-in-trend-graphs',
    },
    { question: 'How do I figure out how to lower churn?', url: '/tutorials/churn-rate#session-recordings' },
    { question: 'How do I improve my support experience?', url: '/tutorials/session-recordings-for-support' },
    { question: 'How do I see where errors happen?', url: '/tutorials/session-recordings-for-support' },
    { question: 'How do I get bug recreation steps easily?' },
    {
        question: 'Why are users dropping off in my funnel?',
        url: '/tutorials/explore-insights-session-recordings#watching-users-through-funnels',
    },
    { question: 'What’s making my users angry or frustrated?', url: '/tutorials/toolbar' },
    { question: 'Which screens are loading slowly?', url: '/tutorials/performance-metrics' },
    {
        question: 'How can I improve customer support with screen recordings?',
        url: '/tutorials/session-recordings-for-support',
    },
    { question: 'How do I understand sources of friction in my app?', url: '/tutorials/filter-session-recordings' },
    { question: 'What errors are being logged to the console?' },
    { question: 'What warnings are being logged to the console?' },
    {
        question: 'What is a user’s First Contentful Paint time',
        url: '/tutorials/performance-metrics#1-first-contentful-paint',
    },
    { question: 'What is a user’s Dom Interactive time', url: '/tutorials/performance-metrics#2-dom-interactive' },
    { question: 'What is a user’s Page Loaded time', url: '/tutorials/performance-metrics#3-page-loaded' },
    { question: 'How fast does my app load?' },
    { question: 'How does my user experience differ across devices?' },
    { question: 'How does my user experience differ across regions?' },
    { question: 'How do I optimize site performance?', url: '/tutorials/performance-metrics#optimization-cheat-sheet' },
]

const faqs = [
    {
        question: 'How do I know what my recording volume is?',
        children:
            "The easiest way is to sign up for the Free plan - no credit card required. You'll get an accurate volume projection after just a few days.",
    },
    {
        question: 'Do I pay anything for stored recordings?',
        children:
            'No, you only pay the fee per captured recording in a given month. There are no additional costs or fees.',
    },
    {
        question: 'How long do you retain session recordings?',
        children:
            'Recordings are kept on Clickhouse-based installations for 1 month. For paid customers on PostHog Cloud, recordings are kept for 3 months.',
    },
    {
        question: 'Is there a free trial on paid plans?',
        children:
            'We have a generous free tier on every paid plan so you can try out the features before paying any money. (You\'ll need to enter your credit card info, but you can set a billing limit). If you have additional needs, such as enterprise features, please <a href="/contact-sales">get in touch</a>.',
    },
    {
        question: 'What currency are your prices in?',
        children: 'All prices are in US Dollars (USD), excluding taxes.',
    },
    {
        question: 'Do you offer a discount for non-profits?',
        children:
            'Yes in most cases - 50% off any plan. Create your account, then email <a href="mailto:sales@posthog.com?subject=Non-profit%20discount">sales@posthog.com</a> from the same email address with some basic details on your organization. We will then apply a discount.',
    },
    {
        question: 'Are there any minimums or annual commitments?',
        children:
            'Nope. We can, however, offer annual commitments (for example, to maintain pricing) if you need them as part of an enterprise agreement.',
    },
]

const comparisonColumnCount = 6
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

const pairsWithItemCount = 3
const PairsWithArray = [
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
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="Session Replay - PostHog"
                description="Session Replay helps you diagnose issues and understand user behavior in your product or website."
                image={`/images/og/session-replay.jpg`}
            />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="yellow"
                    icon={<IconRewindPlay />}
                    product={product.capitalized}
                    title="Watch how users <span class='text-red dark:text-yellow'>experience</span> your app"
                    description='Session Replay helps you <span class="bg-yellow/25 p-0.5">diagnose issues</span> and <span class="bg-yellow/25 p-0.5">understand user behavior</span> in your product or
                    website.'
                />

                <div className="text-center">
                    <StaticImage
                        src="../../../images/products/screenshot-session-replay.png"
                        alt="Screenshot of Session Replay in PostHog"
                        className="w-full max-w-[1360.5px]"
                        placeholder="none"
                    />
                </div>

                <section id="customers" className="-mt-36 pt-36">
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

            <SmoothScroll />
            <div id="features">
                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <h3 className="text-3xl text-center mb-8">Features</h3>
                    <ul className={`list-none p-0 grid md:grid-cols-${featuresPerRow} gap-12 mb-8`}>
                        {features.map((feature, index) => {
                            return <Feature {...feature} key={index} />
                        })}
                    </ul>

                    <ul className={`list-none p-0 grid grid-cols-2 md:grid-cols-${subfeaturesItemCount} gap-4`}>
                        {subfeatures.map((subfeature, index) => {
                            return <Subfeature {...subfeature} key={index} />
                        })}
                    </ul>
                </section>

                <section className="bg-accent dark:bg-accent-dark">
                    <Marquee product={product.capitalized}>
                        {questions.map((question, index) => {
                            return <Question {...question} key={index} />
                        })}
                    </Marquee>
                </section>
            </div>
            <section
                id="pricing"
                className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto px-5 py-20`}
            >
                <div className="flex flex-col-reverse md:flex-row md:gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                        <p className="">
                            Use {product.lowercase} free. Or enter a credit card for advanced features.{' '}
                            <br className="hidden lg:block" />
                            Either way, your first {product.freeTier} are free – every month.
                        </p>
                    </div>
                    <div className="md:w-96">
                        <StaticImage placeholder="none" quality={100} src="../hogs/session-replay-hog.png" alt="" />
                    </div>
                </div>

                <div className="md:flex justify-between items-start gap-12">
                    <PlanComparison showHeaders={false} showCTA={false} groupsToShow={['session_replay']} />

                    <div className="md:w-96 md:mt-4">
                        <h4 className="text-3xl">FAQs</h4>
                        {faqs.map((faq, index) => {
                            return <FAQ {...faq} key={index} />
                        })}
                    </div>
                </div>
            </section>

            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto`}>
                <div id="posthog-vs">
                    <section>
                        <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                        <Comparison comparison={comparison} columnCount={comparisonColumnCount} />
                    </section>

                    <section className="mb-20">
                        <h3 className="text-center mb-8">So, what's best for you?</h3>
                        <div className="mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                            <VsCompetitor
                                title="Reasons a competitor might be better for you (for now...)"
                                image={
                                    <StaticImage
                                        src="../../../images/products/competitors-sr.png"
                                        className="max-w-[167px]"
                                    />
                                }
                            >
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
                            <Link to={`/questions/${product.slug}`}>Ask the community</Link> or{' '}
                            <Link to="/contact-sales">book a demo</Link>.
                        </p>
                    </section>
                </div>

                <section id="tutorials">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Featured tutorials</h3>
                    <p className="mt-0 text-opacity-75 text-center mb-6">
                        Visit the <Link to="/tutorials">tutorials</Link> section for more.
                    </p>

                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20mx-5 md:mx-0">
                        <TutorialCard
                            title="How to use session replays to get a deeper understanding of user behavior"
                            description="In this tutorial, we focus on the connections session replays have with insights and visualizations. These connections enable deeper exploration and understanding of user behavior."
                            url="/tutorials/explore-insights-session-recordings"
                        />
                        <TutorialCard
                            title="How to use filters + session replays to understand user friction"
                            description="We’ll explain how to use PostHog’s various filters and features to find relevant session replays quickly."
                            url="/tutorials/filter-session-recordings"
                        />
                        <TutorialCard
                            title="How to only record the sessions you want"
                            description="As you scale, the number of recordings can go beyond what you need. Use PostHog’s configuration options to only record the sessions you want."
                            url="/tutorials/limit-session-recordings"
                        />
                        <TutorialCard
                            title="Improve web app performance using PostHog session replays"
                            description="Learn the important metrics for measuring page load speed and how to identify opportunities to improve performance."
                            url="/tutorials/performance-metrics"
                        />
                    </ul>
                </section>

                <section id="installation" className="mb-20 px-5 md:px-0">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Install &amp; customize</h3>
                    <p className="mt-0 opacity-50 text-center mb-12">
                        Here are some ways you can fine tune how you implement {product.lowercase}.
                    </p>

                    <ContentViewer sticky={false} scrollToTop={false} content={[Install, ...SessionReplay]} />
                </section>

                <section id="docs" className="mb-20 px-5 md:px-0">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children[2].children} />
                </section>

                <section id="team" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                        building {product.lowercase}.
                    </p>
                    <TeamMembers teamName={team} />
                </section>

                <section id="roadmap" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Roadmap &amp; changelog</h3>

                    <p className="text-center mb-8">Here’s what the team is up to.</p>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <RecentChange team={team} />
                        </div>

                        <div>
                            <h4 className="opacity-60 text-base">Up next</h4>
                            <TeamRoadmap team={team} />
                        </div>
                    </div>
                </section>

                <section id="questions" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                    <p className="text-center mb-4">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                            View {product.lowercase} questions
                        </CallToAction>
                    </div>

                    <Questions topicIds={[20]} />
                </section>

                <PairsWith items={pairsWithItemCount}>
                    {PairsWithArray.map((card, index) => {
                        return <PairsWithItem {...card} key={index} />
                    })}
                </PairsWith>
            </div>
            <div className="max-w-7xl mx-auto relative">
                <section className="mb-20">
                    <CTA />
                </section>
            </div>
        </>
    )
}

export default ProductSessionReplay
