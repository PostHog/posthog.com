import React from 'react'
import Layout from '../../Layout'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import {
    IconBolt,
    IconGraph,
    IconFlask,
    IconToggle,
    IconPieChart,
    IconPeople,
    IconNotification,
    IconRewindPlay,
} from '@posthog/icons'
import { SQL } from 'components/ProductIcons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { graphql, useStaticQuery } from 'gatsby'
import { PlanComparison } from 'components/Pricing/PlanComparison'
import ContentViewer from 'components/ContentViewer'
import ProductAnalytics from 'components/Home/CodeBlocks/ProductAnalytics'
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
import Slider from 'components/Products/Slider'

const product = {
    slug: 'product-analytics',
    lowercase: 'product analytics',
    capitalized: 'Product Analytics',
    freeTier: '1,000,000 events',
}

const team = 'Product Analytics'

const subfeaturesItemCount = 5
const subfeatures = [
    {
        icon: <IconBolt />,
        title: 'Autocapture',
        description:
            'Add PostHog.js to your website or web app to track all event data and retroactively define events',
    },
    {
        icon: <IconPieChart />,
        title: 'Data visualization',
        description: 'Filter data by user property, group data, and use formulas in queries',
    },
    {
        icon: <SQL />,
        title: 'SQL',
        description: 'Use PostHog’s filtering interface or switch into SQL mode for more powerful querying',
    },
    {
        icon: <IconNotification />,
        title: 'Dashboards and insight subscriptions',
        description: 'Share insights with teams, and get updates when results change',
    },
    {
        icon: <IconPeople />,
        title: 'Group analytics',
        description: 'Analyze how any group of people (like an organization) use your product',
    },
]

const questions = [
    {
        question: 'How are my metrics changing over time?',
    },
    {
        question: 'How does the usage of two feature compare?',
    },
    {
        question: "How does last week's release affect engagement?",
    },
    {
        question: 'What long-term patterns are we seeing?',
    },
    {
        question: 'Which cohorts can we find from usage patterns?',
    },
    {
        question: 'How do event properties change over time?',
    },
    {
        question: 'How do far are my users scrolling down my app?',
        url: '/tutorials/scroll-depth',
    },
    {
        question: 'How to I track performance marketing?',
        url: '/tutorials/performance-marketing',
    },
    {
        question: 'How do I track my ads?',
    },
    {
        question: 'How do I track ad conversion?',
        url: '/tutorials/performance-marketing#tracking-conversion-from-traffic-to-signups',
    },
    {
        question: 'How can I find my power users? / What are my power users doing differently?',
        url: '/tutorials/power-users#identifying-your-power-user',
    },
    {
        question: 'Where do my users spend the most time on?',
        url: '/tutorials/session-metrics',
    },
    {
        question: 'How do I get insights about my data using regex?',
        url: '/tutorials/regex-basics',
    },
    {
        question: 'How do I measure growth loops?',
        url: '/blog/growth-loops#measuring-your-growth-loop',
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

const comparisonColumnCount = 6
const comparison = [
    {
        feature: '<strong>Funnels</strong>',
        companies: {
            Amplitude: '',
            Mixpanel: '',
            Heap: '',
            Pendo: '',
            PostHog: '',
        },
    },
    {
        feature: 'Conversion funnels',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Historical trends',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Time to convert insights',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Sequential step order',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Strict step order',
        companies: {
            Amplitude: true,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Any step order',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Exclusion events',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Conversion windows',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Reveal user paths between steps',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Anomaly detection',
        companies: {
            Amplitude: true,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Filter internal and test users',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Filter by cohort',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Filter by user property',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Breakdown by user property',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Correlation analysis',
        companies: {
            Amplitude: true,
            Mixpanel: false,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: '<strong>Path analysis</strong>',
        companies: {
            Amplitude: '',
            Mixpanel: '',
            Heap: '',
            Pendo: '',
            PostHog: '',
        },
    },
    {
        feature: 'Reveal paths from a start point',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Reveal paths from an end point',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Reveal paths between points',
        companies: {
            Amplitude: false,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Reveal paths within funnels',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Zoom in/out',
        companies: {
            Amplitude: true,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: false,
        },
    },
    {
        feature: 'Define number of users on path',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Track pageviews',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Track custom events',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Filter internal and test users',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Filter by cohort',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Filter by events or user property',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Include and exclude Wildcards',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Exclusion events',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Hide repeating steps',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Regex for path cleaning',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Max number of steps',
        companies: {
            Amplitude: '50',
            Mixpanel: '120+',
            Heap: '10',
            Pendo: '20',
            PostHog: '20',
        },
    },
    {
        feature: '<strong>Dashboards</strong>',
        companies: {
            Amplitude: '',
            Mixpanel: '',
            Heap: '',
            Pendo: '',
            PostHog: '',
        },
    },
    {
        feature: 'User-level permissions',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Project-level permissions',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Dashboard-level permissions',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Share dashboards externally',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Embed dashboards anywhere',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Subscribe to dashboards',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Pinned dashboards',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: '',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Dashboard & insight tags',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Webhooks',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: true,
            PostHog: true,
        },
    },
    {
        feature: 'Annotations',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: false,
            Pendo: false,
            PostHog: true,
        },
    },
    {
        feature: 'Private insights',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            Pendo: true,
            PostHog: false,
        },
    },
    {
        feature: 'Apps / integrations',
        companies: {
            Amplitude: '70+',
            Mixpanel: '50+',
            Heap: '40+',
            Pendo: '40+',
            PostHog: '50+',
        },
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconRewindPlay />,
        product: 'Session Replay',
        description:
            'Jump into a playlist of session recordings directly from any point in a graph, or segment of a funnel',
        url: '/session-replay',
    },
    {
        icon: <IconToggle />,
        product: 'Feature Flags',
        description: 'See which feature flags were enabled for a user during a session',
        url: '/feature-flags',
    },
    {
        icon: <IconFlask />,
        product: 'A/B Testing',
        description:
            'Filter data down to users within an active experiment, whether part of a control group or a test variant',
        url: '/ab-testing',
    },
]

export const ProductProductAnalytics = () => {
    const { ycombinator, contra, hasura, speakeasy } = useStaticQuery(graphql`
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
            ycombinator: mdx(slug: { eq: "customers/ycombinator" }) {
                ...ProductCustomerFragment
            }
            contra: mdx(slug: { eq: "customers/contra" }) {
                ...ProductCustomerFragment
            }
            hasura: mdx(slug: { eq: "customers/hasura" }) {
                ...ProductCustomerFragment
            }
            speakeasy: mdx(slug: { eq: "customers/speakeasy" }) {
                ...ProductCustomerFragment
            }
        }
    `)
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-5 py-10 md:pt-20 pb-0">
                <Hero
                    color="blue"
                    icon={<IconGraph />}
                    product={product.capitalized}
                    title="Product analytics with autocapture"
                    description="PostHog is the only product analytics platform built to natively work with <a href='/session-replay'>session replay</a>, <a href='/feature-flags'>feature flags</a>, <a href='/ab-testing'>A/B testing</a>, and <a href='/surveys'>surveys</a>."
                />

                <div className="">
                    <StaticImage
                        src="./images/screenshot-product-analytics.png"
                        alt=""
                        className="w-full max-w-[1361px]"
                    />
                </div>

                <section>
                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="gathers 30% more data than with Google Analytics"
                            quote="We could autocapture... events using the JS snippet and... configure custom events."
                            customer={ycombinator}
                        />
                        <CustomerCard
                            outcome="improved conversion rates by 10-20%"
                            quote="we observed drop-offs at very particular stages of our onboarding flow."
                            customer={hasura}
                        />
                        <CustomerCard
                            outcome="increased registrations by 30%"
                            quote="From [funnels], we could easily jump to session replays to see the drop-off point."
                            customer={contra}
                        />
                        <CustomerCard
                            outcome="manages features and developer relations"
                            quote="...top-to-bottom view of conversion rates and user paths, without... extra setup time."
                            customer={speakeasy}
                        />
                    </ul>
                </section>
            </div>

            <SmoothScroll />
            <div id="features">
                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <h3 className="text-3xl text-center mb-8">Features</h3>

                    <Slider />

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
            </div>
            <section id="pricing" className="max-w-7xl mx-auto px-5 py-20">
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
                        <StaticImage
                            placeholder="none"
                            quality={100}
                            src="../../Home/Slider/images/session-recording-hog.png"
                            alt=""
                        />
                    </div>
                </div>

                <div className="md:flex justify-between items-start gap-12">
                    <PlanComparison showHeaders={false} showCTA={false} groupsToShow={['product_analytics']} />

                    <div className="md:w-96 md:mt-4">
                        <h4 className="text-3xl">FAQs</h4>
                        {faqs.map((faq, index) => {
                            return <FAQ {...faq} key={index} />
                        })}
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-5">
                <div id="posthog-vs">
                    <section>
                        <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                        <Comparison comparison={comparison} columnCount={comparisonColumnCount} />
                    </section>

                    <section className="mb-20">
                        <h3 className="text-center mb-8">So, what's best for you?</h3>
                        <div className="mb-8 grid md:grid-cols-2 gap-4">
                            <VsCompetitor title="Reasons a competitor might be better for you (for now...)">
                                <ul>
                                    <li>
                                        Time-based analysis for web analytics (e.g. time on page)
                                        <ul className="pl-6">
                                            <li className="text-sm">(We're working on this!)</li>
                                        </ul>
                                    </li>
                                    <li>Natural language processing for creating insights</li>
                                    <li>Predictive analytics for extrapolating events into the future</li>
                                    <li>Alerting for when events move beyond set thresholds</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>
                                        Linking between analytics and other features, so you can jump from a graph to a
                                        relevant recording
                                    </li>
                                    <li>Wide range of insight types for analyzing data</li>
                                    <li>Formula mode and SQL access to enable deeper analysis</li>
                                    <li>Automatic correlation analysis to find significant events</li>
                                    <li>Group analytics for teams with B2B customers</li>
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

                <section id="installation" className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Install &amp; customize</h3>
                    <p className="mt-0 opacity-50 text-center mb-12">
                        Here are some ways you can fine tune how you implement {product.lowercase}.
                    </p>

                    <ContentViewer sticky={false} scrollToTop={false} content={[Install, ...ProductAnalytics]} />
                </section>

                <section id="docs" className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children[1].children} />
                </section>

                <section id="team" className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The {team} team are the folks responsible for building session
                        replay.
                    </p>
                    <TeamMembers teamName={team} />
                </section>

                <section id="roadmap" className="mb-20">
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

                <section id="questions" className="mb-20">
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

export default ProductProductAnalytics
