import React from 'react'
import Layout from '../../Layout'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import {
    IconClock,
    IconDecisionTree,
    IconGraph,
    IconLoading,
    IconRewindPlay,
    IconRevert,
    IconShield,
    IconStack,
    IconTerminal,
    IconToggle,
    IconUnlock,
    IconUserPaths,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { graphql, useStaticQuery } from 'gatsby'
import { PlanComparison } from 'components/Pricing/PlanComparison'
import ContentViewer from 'components/ContentViewer'
import FeatureFlags from 'components/Home/CodeBlocks/FeatureFlags'
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

const product = {
    slug: 'feature-flags',
    lowercase: 'feature flags',
    capitalized: 'Feature Flags',
    freeTier: '1,000,000 requests',
}

const team = 'Feature Success'

const featuresPerRow = 3
const features = [
    {
        title: 'Release conditions',
        description: 'Customize your rollout strategy by user or group properties, cohort, or trafic percentage',
        image: <StaticImage src="./images/release-conditions.png" width={420} />,
    },
    {
        title: 'Multivariate feature flags',
        description: 'Simultaneously test multiple versions against a control group',
        image: <StaticImage src="./images/multivariate.png" width={420} />,
    },
    {
        title: 'Test changes without touching your codebase',
        description:
            'JSON payloads let you change text, visuals, or entire blocks of code without subsequent deployments',
        image: <StaticImage src="./images/payloads.png" width={420} />,
    },
    {
        title: 'Developer-friendly automation',
        description:
            'Automated usage reports, IP address resolution (for location-based targeting), and recall user properties to avoid passing them manually every time',
        image: <StaticImage src="./images/reports.png" width={420} />,
    },
    {
        title: 'Early access feature opt-in widget',
        description: 'Allow users to opt in to (or out of) specified features. Or use the API to build your own UI.',
        image: <StaticImage src="./images/early-access.png" width={420} />,
    },
]

const subfeaturesItemCount = 4
const subfeatures = [
    {
        icon: <IconClock />,
        title: 'History & activity feed',
        description: 'See who hit a feature flag, the flag’s value, and which page they were on',
    },
    {
        icon: <IconDecisionTree />,
        title: 'Local evaluation',
        description: 'Improves speed by caching a flag’s value on initial load',
    },
    {
        icon: <IconRevert />,
        title: 'Instant rollbacks',
        description: 'Disable a feature without touching your codebase',
    },
    {
        icon: <IconLoading />,
        title: 'Bootstrapping',
        description: 'Get flags and values to trigger changes immediately on page load',
    },
    {
        icon: <IconUnlock />,
        title: 'Persist flags across authentication steps',
        description: 'Make sure users have a consistent experience after login',
    },
    {
        icon: <IconShield />,
        title: 'Flag administration',
        description: 'See the history of a feature flag or control who can modify flags with user roles',
    },
    {
        icon: <IconTerminal />,
        title: 'SDKs or API',
        description: 'Copy code snippets for your library of choice, or implement yourself with the API',
    },
    {
        icon: <IconStack />,
        title: 'Multi-environment support',
        description: 'Test flags in local development or staging by using the same flag key across PostHog projects',
    },
]

const questions = [
    {
        question: 'How do I test features internally?',
        url: '/blog/feature-flag-benefits-use-cases#3-test-changes-in-production',
    },
    {
        question: 'How do I set up a beta?',
    },
    {
        question: 'How do I test bug fixes?',
    },
    {
        question: 'How do I set up an allow or deny list?',
        url: '/blog/feature-flag-benefits-use-cases#4-manage-access',
    },
    {
        question: 'How do I do a canary release?',
        url: '/tutorials/canary-release',
    },
    {
        question: 'How do I sample events for a high-volume API?',
        url: '/tutorials/track-high-volume-apis',
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
        feature: 'Target by percentage',
        companies: {
            LaunchDarkly: true,
            Optimizely: true,
            Flagsmith: true,
            GrowthBook: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by user properties',
        companies: {
            LaunchDarkly: true,
            Optimizely: true,
            Flagsmith: true,
            GrowthBook: true,
            PostHog: true,
        },
    },
    {
        feature: 'Flag scheduling',
        companies: {
            LaunchDarkly: true,
            Optimizely: false,
            Flagsmith: false,
            GrowthBook: false,
            PostHog: false,
        },
    },
    {
        feature: 'Experimentation',
        companies: {
            LaunchDarkly: true,
            Optimizely: true,
            Flagsmith: true,
            GrowthBook: true,
            PostHog: true,
        },
    },
    {
        feature: 'Multivariate flags',
        companies: {
            LaunchDarkly: true,
            Optimizely: false,
            Flagsmith: true,
            GrowthBook: false,
            PostHog: true,
        },
    },
    {
        feature: 'Unlimited flags for free',
        companies: {
            LaunchDarkly: false,
            Optimizely: true,
            Flagsmith: true,
            GrowthBook: true,
            PostHog: true,
        },
    },
    {
        feature: 'Free third-party plugins',
        companies: {
            LaunchDarkly: true,
            Optimizely: false,
            Flagsmith: true,
            GrowthBook: false,
            PostHog: true,
        },
    },
    {
        feature: 'Activity logs',
        companies: {
            LaunchDarkly: true,
            Optimizely: false,
            Flagsmith: true,
            GrowthBook: false,
            PostHog: true,
        },
    },
    {
        feature: 'Data export',
        companies: {
            LaunchDarkly: true,
            Optimizely: true,
            Flagsmith: false,
            GrowthBook: true,
            PostHog: false,
        },
    },
    {
        feature: 'Multi-environment support',
        companies: {
            LaunchDarkly: true,
            Optimizely: true,
            Flagsmith: true,
            GrowthBook: true,
            PostHog: true,
        },
    },
    {
        feature: 'Automatic IP resolution',
        companies: {
            LaunchDarkly: false,
            Optimizely: false,
            Flagsmith: false,
            GrowthBook: false,
            PostHog: true,
        },
    },
    {
        feature: 'Recall user properties by default',
        companies: {
            LaunchDarkly: false,
            Optimizely: false,
            Flagsmith: false,
            GrowthBook: false,
            PostHog: true,
        },
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconGraph />,
        product: 'Product Analytics',
        description:
            "Run any insight filtered by a flag's value, or group by flag to see usage across a flag's variants",
        url: '/product-analytics',
    },
    {
        icon: <IconUserPaths />,
        product: 'User paths',
        description: 'See how a flag’s value influenced an intended outcome',
        url: '/product-analytics',
    },
    {
        icon: <IconRewindPlay />,
        product: 'Session Replay',
        description: 'Filter recordings down to only when a feature flag was called, or to a specific value of a flag',
        url: '/session-replay',
    },
]

export const ProductFeatureFlags = () => {
    const { phantom, contra, speakeasy } = useStaticQuery(graphql`
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
            phantom: mdx(slug: { eq: "customers/phantom" }) {
                ...ProductCustomerFragment
            }
            contra: mdx(slug: { eq: "customers/contra" }) {
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
                    color="seagreen"
                    icon={<IconToggle />}
                    product={product.capitalized}
                    title='<span class="text-red dark:text-yellow">Safely roll out features</span> to specific users or groups'
                    description='Test changes with small groups of users before rolling out wider. Analyze usage with <a href="/product-analytics">Product Analytics</a> and <a href="/session-replay">Session Replay</a>.'
                />

                <div className="">
                    <StaticImage src="./images/screenshot-feature-flags.png" alt="" className="w-full max-w-[1361px]" />
                </div>

                <section>
                    <ul className="list-none p-0 grid md:grid-cols-3 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="cut failure rates by 90%"
                            quote="Feature flags are crucial for us. We use them as kill switches for all our features."
                            customer={phantom}
                        />
                        <CustomerCard
                            outcome="increased registrations by 30%"
                            quote="Enables a ‘slow rollout’ strategy... while also analyzing feature adoption and performance in the same tool."
                            customer={contra}
                        />
                        <CustomerCard
                            outcome="improved feature roll-out with flags"
                            quote="The integrated insights and feature flags help us monitor how users with specific flags enabled are using features"
                            customer={speakeasy}
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
                    <PlanComparison showHeaders={false} showCTA={false} groupsToShow={['feature_flags']} />

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
                                    <li>Flag scheduling</li>
                                    <li>Triggers and workflows to enable/disable flags on other events</li>
                                    <li>Enterprise-level support</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>
                                        Integration with other analysis products
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                View replays attached to a flag, analyze data based on a flag, etc.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        JSON payloads
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                Flags can return JSON and trigger other in-app changes (like displaying
                                                a banner)
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Targeting options</li>
                                    <li>Early access management suite for toggling betas or new features</li>
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

                    <ContentViewer sticky={false} scrollToTop={false} content={[Install, ...FeatureFlags]} />
                </section>

                <section id="docs" className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children[3].children} />
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

                    <Questions topicId={28} />
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

export default ProductFeatureFlags
