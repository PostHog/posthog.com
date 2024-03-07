import React from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import {
    IconPieChart,
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
import Plans from 'components/Pricing/Plans'

const product = {
    slug: 'web-analytics',
    lowercase: 'web analytics',
    capitalized: 'Web analytics',
    freeTier: '5,000 recordings',
}

const team = 'Web Analytics'
const teamSlug = '/teams/web-analytics'

const featuresPerRow = 3
const features = [
    {
        title: 'Top paths',
        description: 'See the most visited pages on your site',
        image: <StaticImage src="../../../../static/images/products/web-analytics/top-paths.jpg" width={420} />,
        border: true,
    },
    {
        title: 'Top referrers',
        description: 'Discover where traffic is coming from',
        image: <StaticImage src="../../../../static/images/products/web-analytics/top-referrers.jpg" width={420} />,
        border: true,
    },
    {
        title: 'Device types',
        description: 'Break down traffic by device',
        image: <StaticImage src="../../../../static/images/products/web-analytics/device-types.jpg" width={420} />,
        border: true,
    },
    {
        title: 'World map',
        description: 'Visualize users across planet earth',
        image: <StaticImage src="../../../../static/images/products/web-analytics/world-map.jpg" width={420} />,
        border: true,
    },
    {
        title: 'Retention cohorts',
        description: 'Analyze retention by week',
        image: <StaticImage src="../../../../static/images/products/web-analytics/retention-cohorts.jpg" width={420} />,
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
        description: 'Web or Android (beta) available',
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
    { question: 'Question #1?' },
    {
        question: 'Question #2?',
        url: '/tutorials/explore-insights-session-recordings#watching-users-through-funnels',
    },
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
            PostHog: '<a href="https://github.com/PostHog/posthog/issues/12344">On the roadmap</a>',
        },
    },
    {
        feature: 'Android recordings',
        companies: {
            Hotjar: false,
            LogRocket: true,
            Matomo: false,
            FullStory: true,
            PostHog: '<a href="https://github.com/PostHog/posthog/issues/13267">In beta</a>',
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
        description: 'Need to go deeper than a dashboard? Building your own insights and HogQL queries from scratch!',
        url: '/product-analytics',
    },
    {
        icon: <IconToggle />,
        product: 'Session replays',
        description:
            "Get more context by watching what users actually do on your site. It's not creepy if you have permission.",
        url: '/session-replays',
    },
    {
        icon: <IconFlask />,
        product: 'Surveys',
        description:
            'Get _even more context_ by sending surveys to users. Arrange interviews. Ask questions. Serve pop-ups.',
        url: '/surveys',
    },
]

export const ProductWebAnalytics = () => {
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
                    color="[#36C46F]"
                    icon={<IconPieChart />}
                    product={product.capitalized}
                    title="Monitor your website traffic"
                    description="Finally the Google Analytics replacement – done the PostHog way"
                />

                <div className="text-center -mb-24">
                    <StaticImage
                        src="../../../../static/images/products/web-analytics/screenshot-web-analytics.png"
                        alt="Screenshot of web analytics in PostHog"
                        className="w-full max-w-[1440px]"
                        placeholder="none"
                    />
                </div>

                {/*
                <section id="customers" className="-mt-56 pt-36">
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
                            quote="Even Pry's support team... uses replays to understand how bugs occurred."
                            customer={pry}
                        />
                    </ul>
                </section>
                */}
            </div>

            <SmoothScroll exclude={['Meet the team']} />

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

                <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                    <div className="flex-grow overflow-auto px-5 md:px-0">
                        <Plans showHeaders={false} showCTA={false} groupsToShow={['session_replay']} />
                    </div>
                    <div className="px-5 md:px-0 lg:w-96 lg:mt-4">
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
                                    <li>You _only_ need web analytics, nothing else</li>
                                    <li>You don’t need any integrations other than with Google</li>
                                    <li>You need to migrate data from GA4</li>
                                    <li>You actually really like GA4 😱</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>You want to do more than just web analytics</li>
                                    <li>You don't want to spend weeks setting up dashboards</li>
                                    <li>You need to comply with HIPAA</li>
                                    <li>It's not GA4</li>
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
                            title="How to create a broken link (404) checker"
                            description="This tutorial shows you how to create a broken link checker for a Next.js app that sends a notification in Slack when a user visits a page that doesn’t exist."
                            url="/tutorials/broken-link-checker"
                        />
                        <TutorialCard
                            title="Building a Vue cookie consent banner"
                            description="To ensure you are compliant with regulations such as GDPR, your app must receive consent to use cookies. One way to do this is with a cookie consent banner, and this tutorial shows you how to build one in Vue, a popular JavaScript framework."
                            url="/tutorials/vue-cookie-banner"
                        />
                        <TutorialCard
                            title="An introduction to identifying users"
                            description="Many of the most valuable insights require an accurate understanding of the user using your product. This tutorial goes over the different ways to identify users and recommendations on how to do it better."
                            url="/tutorials/identifying-users-guide"
                        />
                        <TutorialCard
                            title="A non-technical guide to PostHog data"
                            description="You don’t need to be an engineer, but knowing the formatting and structure of your data, for example, is key to getting the most out of PostHog as a non-technical user."
                            url="/tutorials/non-technical-guide-to-data"
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
                    <DocLinks
                        menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'session replay').children}
                    />
                </section>

                {/*
                <section id="team" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                        building {product.lowercase}.
                    </p>
                    <TeamMembers teamName={team} />
                </section>
                */}

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

export default ProductWebAnalytics
