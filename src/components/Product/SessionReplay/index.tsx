import React from 'react'
import Layout from '../../Layout'
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
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
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

const product = {
    slug: 'session-replay',
    lowercase: 'session replay',
    capitalized: 'Session Replay',
}

const team = 'Monitoring'

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

const faqs = [
    {
        question: 'How do I know what my volume is?',
        children: "Here's teh answer",
    },
    {
        question: 'Do I pay anything for stored recordings?',
        children: 'answer',
    },
    {
        question: 'Is there a free trial on the Unlimited (paid) plan?',
        children:
            '<p class="text-sm">We have a generous free tier on every paid plan so you can try out the features before paying any money (though you will need to enter your credit card info). If you have additional needs, such as enterprise features, please <a href="/contact-sales">get in touch.</a></p>',
    },
]

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
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-5 py-10 md:pt-20 pb-0">
                <Hero
                    icon={<IconRewindPlay />}
                    product={product.capitalized}
                    title="Watch visitors interact with your app"
                    description='Session Replay helps you <span class="bg-yellow/25 p-0.5">diagnose issues</span> and <span class="bg-yellow/25 p-0.5">understand user behavior</span> in your product or
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

            <SmoothScroll />

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

                <ul className={`list-none p-0 grid grid-cols-2 md:grid-cols-${subfeaturesItemCount} gap-4`}>
                    {subfeatures.map((subfeature, index) => {
                        return <Subfeature {...subfeature} key={index} />
                    })}
                </ul>
            </section>

            <section className="bg-accent dark:bg-accent-dark">
                <div className="max-w-7xl mx-auto px-5 py-20">
                    <div className="md:grid md:grid-cols-12 md:gap-12">
                        <div className="col-span-5">
                            <h3 className="text-4xl md:text-5xl text-blue leading-tight">
                                Answer all of these questions (and more) with PostHog {product.capitalized}.
                            </h3>
                        </div>
                        <div className="col-span-7 relative after:absolute after:bg-gradient-to-b after:from-accent/0 after:to-accent/100 dark:after:from-accent-dark/0 dark:after:to-accent-dark/100 after:h-40 after:bottom-0 after:left-0 after:w-full after:content-[''] after:z-10">
                            <ul className="list-none p-0">
                                {questions.map((question, index) => {
                                    return <Question {...question} key={index} />
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
                            Use {product.lowercase} free. Or enter a credit card for advanced features.{' '}
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
                        {faqs.map((faq, index) => {
                            return <FAQ {...faq} key={index} />
                        })}
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
                        <Link to={`/questions/${product.slug}`}>Ask the community</Link> or{' '}
                        <Link to="/contact-sales">book a demo</Link>.
                    </p>
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Install &amp; customize</h3>
                    <p className="mt-0 opacity-50 text-center mb-12">
                        Here are some ways you can fine tune how you implement {product.lowercase}.
                    </p>

                    <ContentViewer sticky={false} scrollToTop={false} content={[...SessionReplay]} />
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children[2].children} />
                </section>

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The {team} team are the folks responsible for building session
                        replay.
                    </p>
                    <TeamMembers teamName={team} />
                </section>

                <section className="mb-20">
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

                <section className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                    <p className="text-center mb-4">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                            View {product.lowercase} questions
                        </CallToAction>
                    </div>

                    <Questions topicId={20} />
                </section>

                <PairsWith items={pairsWithItemCount}>
                    {PairsWithArray.map((card, index) => {
                        return <PairsWithItem {...card} key={index} />
                    })}
                </PairsWith>
            </div>
            <div className="max-w-7xl mx-auto px-5 relative">
                <section className="mb-20">
                    <CTA />
                </section>
            </div>
        </Layout>
    )
}

export default ProductSessionReplay
