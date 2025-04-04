// Everything you’d expect in an error tracking product, but *10x better in the PostHog ecosystem*

// Sure you can use error tracking solo, but it's 10x better with other PostHog products.

// - Session replay: Watch session recordings of users who triggered errors for more context about how to reproduce an issue.
// - Product analytics: Graph the `$exception` event and use filtering and grouping to determine how errors happen and what to prioritize.
// - Feature flags:  Test potential fixes by rolling out code changes only to affected users.
// - User profiles: See all `$exception` events for specific users in their event history log and find which feature flags were enabled at the time an error occurred.

// Find, inspect, fix

// - Alerts
//   Get notified of new errors by email, Slack, or webhook
// - Assign errors
//   Task issues to teams or individual members
// - Organize and prioritize
//   Merge issues, sort by frequency or recency, or use text search to find specific errors
// - Stack traces
//   Get code context automatically with PostHog's server-side libraries, or upload source maps for front-end frameworks

import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import {
    IconWarning,
    IconGraph,
    IconHogQL,
    IconClock,
    IconToggle,
    IconDecisionTree,
    IconRewindPlay,
    IconCheck,
    IconAI,
    IconPerson,
    IconPencil,
    IconTrends,
    IconUser,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { TutorialCard } from 'components/Products/TutorialCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { docsMenu } from '../../../navs'
import TeamRoadmap from 'components/TeamRoadmap'
import { Marquee } from 'components/Products/Marquee'
import RecentChange from '../RecentChange'
import TeamMembers from '../TeamMembers'
import Questions from '../Questions'
import CTA from 'components/Home/CTA'
import { PairsWith } from 'components/Products/PairsWith'
import { PairsWithItem } from 'components/Products/PairsWith/item'
import { Question } from 'components/Products/Question'
import { DocLinks } from 'components/Products/DocsLinks'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import { FAQ } from 'components/Products/FAQ'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Plans from 'components/Pricing/Plans'
import Profile from '../../Team/Profile'
import SideModal from '../../Modal/SideModal'
import { VsCompetitor } from 'components/Products/Competitor'
import { VsPostHog } from 'components/Products/Competitor/VsPostHog'
import Comparison from '../Comparison'
import { useStaticQuery, graphql } from 'gatsby'

interface ProfileData {
    firstName: string
    lastName: string
    country: string
    companyRole: string
    image: string
    bio: string
    twitter: string
    github: string
    linkedin: string
    pineappleOnPizza: boolean
    biography: string
    isTeamLead: boolean
    id: string
    location: string
}

const product = {
    slug: 'error-tracking',
    lowercase: 'error tracking',
    capitalized: 'Error tracking',
    freeTier: '10,000 events',
}

const team = 'Error Tracking'
const teamSlug = '/teams/error-tracking'

const featuresPerRow = 4
const features = [
    {
        title: 'Alerts',
        description: 'Get notifications of new errors by email, Slack, or webhook',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/error-tracking-alerts.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Assign errors',
        description: 'Task issues to teams or individual members',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/error-tracking-monitoring.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Organize and prioritize',
        description: 'Merge issues, sort by frequency or recency, or use text search to find specific errors',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/error-tracking-stack.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Stack traces',
        description:
            "Get code context automatically with PostHog's server-side libraries, or upload source maps for front-end frameworks",
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/error-tracking-assignment.png"
                width={428}
                placeholder="none"
            />
        ),
    },
]

const subfeaturesItemCount = 4
const subfeatures = [
    {
        title: 'Session replay',
        description:
            'Watch session recordings of users who triggered errors for more context about how to reproduce an issue',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'Assign <s>blame</s> an owner',
        description:
            'Graph the <code>$exception</code> event and use filters and grouping to determine where errors happen and what to prioritize',
        icon: <IconTrends />,
        color: 'blue',
    },
    {
        title: 'Feature flags',
        description: 'Test potential fixes by rolling out code changes only to affected users',
        icon: <IconToggle />,
        color: 'seagreen',
    },
    {
        title: 'User profiles',
        description:
            'See all <code>$exception</code> events for specific users in their event history log and find which feature flags were enabled at the time an error occurred',
        icon: <IconUser />,
        color: 'purple',
    },
]

const questions = [
    {
        question: 'How do I track errors in my application?',
        url: '/docs/error-tracking/installation',
    },
    {
        question: 'How can I analyze error patterns?',
        url: '/docs/error-tracking/monitoring',
    },
    {
        question: 'How do I set up error alerts?',
        url: '/docs/error-tracking/alerts',
    },
    {
        question: 'How can I integrate with existing tools?',
        url: '/docs/error-tracking/integrations',
    },
    {
        question: 'How do I manage error retention?',
        url: '/docs/error-tracking/retention',
    },
    {
        question: 'How can I use session replay with errors?',
        url: '/docs/error-tracking/session-replay',
    },
]

const faqs = [
    {
        question: 'What is error tracking?',
        answer: 'Error tracking helps you monitor and analyze errors in your application. It provides detailed stack traces, error context, and analytics to help you identify and fix issues quickly.',
        children: null,
    },
    {
        question: 'How does pricing work?',
        answer: 'Error tracking is free up to 10,000 events per month. After that, you pay per event with volume-based discounts.',
        children: null,
    },
    {
        question: 'What data is collected?',
        answer: "We collect error messages, stack traces, error context, and associated metadata. You can configure what data is sent and how long it's retained.",
        children: null,
    },
    {
        question: 'How do I get started?',
        answer: 'Check out our installation guide to add error tracking to your application. We support multiple languages and frameworks.',
        children: null,
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        title: 'Session Replay',
        description: 'Watch exactly how an error occurred for a specific user',
        icon: <IconRewindPlay />,
        product: 'Session Replay',
        url: '/session-replay',
        color: 'yellow',
    },
    {
        title: 'Product Analytics',
        description: 'Analyze trends over time and get alerts when things go wrong',
        icon: <IconGraph />,
        product: 'Product Analytics',
        url: '/product-analytics',
        color: 'blue',
    },
    {
        title: 'Feature Flags',
        description: 'Roll back features that cause errors, or test fixes with slow rollouts',
        icon: <IconToggle />,
        product: 'Feature Flags',
        url: '/feature-flags',
        color: 'seagreen',
    },
]

const comparisonColumnCount = 4
const comparison = [
    {
        feature: 'Error alerts',
        companies: {
            Sentry: true,
            LogRocket: true,
            PostHog: true,
        },
    },
    {
        feature: 'Exception capture',
        companies: {
            Sentry: true,
            LogRocket: true,
            PostHog: true,
        },
    },
    {
        feature: 'Issue management',
        companies: {
            Sentry: true,
            LogRocket: false,
            PostHog: true,
        },
    },
    {
        feature: 'Network performance monitoring',
        companies: {
            Sentry: true,
            LogRocket: true,
            PostHog: true,
        },
    },
    {
        feature: 'Error grouping',
        companies: {
            Sentry: true,
            LogRocket: true,
            PostHog: true,
        },
    },
    {
        feature: 'Source map support',
        companies: {
            Sentry: true,
            LogRocket: true,
            PostHog: true,
        },
    },
    {
        feature: 'Stack tracing',
        companies: {
            Sentry: true,
            LogRocket: false,
            PostHog: true,
        },
    },
    {
        feature: 'Integration with product analytics',
        companies: {
            Sentry: false,
            LogRocket: true,
            PostHog: true,
        },
    },
    {
        feature: 'Integration with session replays',
        companies: {
            Sentry: false,
            LogRocket: true,
            PostHog: true,
        },
    },
    {
        feature: 'Boring, purple website with corporate vibes',
        companies: {
            Sentry: true,
            LogRocket: true,
            PostHog: false,
        },
    },
]

interface HeroProps {
    color: string
    icon: React.ReactNode
    product: string
    title: string
    description: string
    image: string | React.ReactNode
}

export const ProductErrorTracking = () => {
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState<ProfileData | null>(null)
    const { zealot } = useStaticQuery(graphql`
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
            zealot: mdx(slug: { eq: "customers/zealot" }) {
                ...ProductCustomerFragment
            }
        }
    `)

    return (
        <>
            <SEO
                title="Error Tracking - PostHog"
                description="Track errors and exceptions in your code, then assign them as issues."
                image={`/images/og/error-tracking.jpg`}
            />
            <SideModal open={!!activeProfile} setOpen={(open) => setActiveProfile(open ? activeProfile : null)}>
                {activeProfile && <Profile profile={activeProfile} />}
            </SideModal>
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="orange"
                    icon={<IconWarning />}
                    product={product.capitalized}
                    title="Track errors and resolve issues"
                    description="Take your product from exception to exceptional"
                    image="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/error-tracking.png"
                />

                <div className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_error_tracking_0f93eb652d.png"
                        alt="Screenshot of the PostHog error tracking"
                        className="w-full max-w-[1440px]"
                        placeholder="none"
                    />
                </div>

                <section id="customers" className="-mt-84 pt-84">
                    <ul className="list-none p-0 grid-cols-2 md:grid-cols-4 gap-4 mb-10 md:mb-20">
                        <li className="hidden md:block"></li>
                        <CustomerCard
                            outcome="switched from BugSnag and Amplitude"
                            quote='"In two clicks, I can see who had an error, then their replays. The more of PostHog you use, the more powerful it becomes."'
                            customer={zealot}
                            colspan={2}
                        />
                        <li className="hidden md:block"></li>
                    </ul>
                </section>

                <section id="features" className="-mt-36 pt-36">
                    <h2 className="text-4xl md:text-5xl">
                        All the features you'd expect, but{' '}
                        <span className="text-red dark:text-yellow">10x better in the PostHog ecosystem</span>
                    </h2>
                    <p className="text-lg opacity-75">
                        Sure you can use error tracking solo, but it's better with other PostHog products.
                    </p>
                </section>

                <div className="mt-20">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {subfeatures.map((subfeature, index) => (
                            <Subfeature key={index} {...subfeature} />
                        ))}
                    </div>
                </div>

                <div className="mt-20">
                    <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 list-none p-0">
                        {features.map((feature, index) => (
                            <Feature key={index} {...feature} />
                        ))}
                    </ul>
                </div>

                <section
                    className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}
                >
                    <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-0`}>
                        <div className="bg-accent dark:bg-accent-dark -mx-5 md:-mx-8">
                            <Marquee product={product.capitalized} shortFade>
                                {questions.map((question, index) => {
                                    return <Question {...question} key={index} />
                                })}
                            </Marquee>
                        </div>
                    </div>
                </section>

                <section
                    id="pricing"
                    className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto px-5 py-20`}
                >
                    <div className="flex flex-col-reverse md:flex-row md:gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                            <p className="">
                                Use the {product.lowercase} for free up to {product.freeTier}.
                            </p>
                        </div>
                        <div className="md:w-96 md:text-right mb-8 md:mb-0 -mt-8">
                            <CloudinaryImage
                                alt="Just another hedgehog"
                                placeholder="blurred"
                                className="w-full max-w-[250px]"
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_error_tracking_0f93eb652d.png"
                            />
                        </div>
                    </div>

                    <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                        <div className="flex-grow overflow-auto px-5 md:px-0 mb-8 md:mb-0">
                            <Plans showTitle={false} groupsToShow={['error_tracking']} />
                        </div>

                        <div className="px-5 md:px-0 lg:w-96 lg:mt-4">
                            <h4 className="text-3xl">FAQs</h4>
                            {faqs.map((faq, index) => {
                                return <FAQ {...faq} key={index} />
                            })}
                        </div>
                    </div>
                </section>

                <div
                    className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}
                >
                    <PairsWith items={pairsWithItemCount}>
                        {PairsWithArray.map((card, index) => {
                            return <PairsWithItem {...card} key={index} />
                        })}
                    </PairsWith>
                </div>

                <section
                    id="team"
                    className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}
                >
                    <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-0`}>
                        <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                        <p className="text-center mb-2">
                            PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                            building this product.
                        </p>
                        <TeamMembers teamName={team} setActiveProfile={setActiveProfile} />
                    </div>
                </section>

                <section
                    id="docs"
                    className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}
                >
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks
                        menu={
                            docsMenu.children.find(({ name }) => name.toLowerCase() === 'error tracking')?.children ||
                            []
                        }
                    />
                </section>

                <div className={`${fullWidthContent ? 'max-w-full px-0 md:px-8' : 'max-w-7xl'} mx-auto`}>
                    <div id="posthog-vs">
                        <section>
                            <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                            <Comparison comparison={comparison} columnCount={comparisonColumnCount} truncate />
                        </section>

                        <section className="mb-20">
                            <h3 className="text-center mb-8">So, what's best for you?</h3>
                            <div className="@container mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                                <VsCompetitor
                                    title="Reasons a competitor may be best for you (for now...)"
                                    image={
                                        <CloudinaryImage
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/competitors-ff.png"
                                            className="max-w-[176px]"
                                        />
                                    }
                                >
                                    <ul>
                                        <li>
                                            Uptime monitoring
                                            <ul className="pl-6">
                                                <li className="text-sm">We don't have uptime monitoring. Yet.</li>
                                            </ul>
                                        </li>
                                        <li>
                                            Advanced alerting
                                            <ul className="pl-6">
                                                <li className="text-sm">
                                                    We currently only support Slack and email alerts on custom criteria.
                                                </li>
                                            </ul>
                                        </li>
                                        <li>Advanced error grouping systems</li>
                                    </ul>
                                </VsCompetitor>
                                <VsPostHog>
                                    <ul>
                                        <li>Integration with other PostHog products</li>
                                        <li>
                                            Feature flags for error recovery
                                            <ul className="pl-6">
                                                <li className="text-sm">
                                                    Quickly roll back features that cause errors.
                                                </li>
                                            </ul>
                                        </li>
                                        <li>Simple, transparent pricing</li>
                                    </ul>
                                </VsPostHog>
                            </div>

                            <p className="text-center text-sm font-medium">
                                Have questions about PostHog? <br className="md:hidden" />
                                <Link to={`/questions/${product.slug}`}>Ask the community</Link> or{' '}
                                <Link to="/talk-to-a-human">book a demo</Link>.
                            </p>
                        </section>
                    </div>
                </div>

                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'mx-auto'} relative px-5 py-10 pb-0`}>
                    <section className="mb-20">
                        <CTA />
                    </section>
                </div>
            </div>
        </>
    )
}

export default ProductErrorTracking
