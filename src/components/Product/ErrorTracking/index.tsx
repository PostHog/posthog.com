import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import { IconWarning, IconGraph, IconHogQL, IconClock, IconToggle, IconDecisionTree, IconRewindPlay } from '@posthog/icons'
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
        title: 'Get alerts',
        name: 'Get alerts',
        description: 'Get email alerts when something goes wrong. Or lots of somethings. ',
        image: (
            <CloudinaryImage
                src="JOETBD"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Error monitoring',
        name: 'Error monitoring',
        description: 'Visually track error rates and impact across your product',
        image: (
            <CloudinaryImage
                src="JOETBD"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Stack traces',
        name: 'Stack traces',
        description: 'Upload source maps so you can follow the error path to the end of the line',
        image: (
            <CloudinaryImage
                src="JOETBD"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Issue assignment',
        name: 'Issue assignment',
        description: 'Assign issues to individuals or groups, so everyone knows who to blame',
        image: (
            <CloudinaryImage
                src="JOETBD"
                width={428}
                placeholder="none"
            />
        ),
    },
]

const subfeaturesItemCount = 4
const subfeatures = [
    {
        title: 'Real-time alerts',
        description: 'Get notified when error rates spike or new issues are discovered',
        icon: <IconDecisionTree />,
    },
    {
        title: 'Error analytics',
        description: 'Analyze error patterns and trends with PostHog\'s powerful analytics',
        icon: <IconHogQL />,
    },
    {
        title: 'Session replay',
        description: 'Watch the exact user session where an error occurred',
        icon: <IconGraph />,
    },
    {
        title: 'Custom retention',
        description: 'Configure how long to keep error data based on your needs',
        icon: <IconClock />,
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
        answer: 'We collect error messages, stack traces, error context, and associated metadata. You can configure what data is sent and how long it\'s retained.',
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
        description: 'Roll back features cause errors, or test fixes with slow rollouts',
        icon: <IconToggle />,
        product: 'Feature Flags',
        url: '/feature-flags',
        color: 'seagreen',
    },
]

export const ProductErrorTracking = () => {
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState<ProfileData | null>(null)

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
                    color="red"
                    icon={<IconWarning />}
                    product={product.capitalized}
                    title='Track errors and assign issues to <span class="text-red dark:text-yellow">build better products</span>'
                    description="Take your product from exception to exceptional"
                    image="JOETBD"
                />

                <div className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-error-tracking.png"
                        alt="Screenshot of the PostHog error tracking"
                        className="w-full max-w-[1440px]"
                        placeholder="none"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-20">
                    <div>
                        <h2 className="text-4xl md:text-5xl">Track errors in real-time</h2>
                        <p className="text-lg opacity-75">
                            Get instant notifications when errors occur and see exactly what happened with detailed stack traces and session replays.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl">Analyze error patterns</h2>
                        <p className="text-lg opacity-75">
                            Use PostHog's powerful analytics to identify trends, track error rates, and understand the impact of issues on your users.
                        </p>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-4xl md:text-5xl text-center">Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {features.map((feature, index) => (
                            <Feature key={index} {...feature} />
                        ))}
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-4xl md:text-5xl text-center">How it works</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {subfeatures.map((subfeature, index) => (
                            <Subfeature key={index} {...subfeature} />
                        ))}
                    </div>
                </div>

                <section
                    id="pricing"
                    className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto px-5 py-20`}
                >
                    <div className="flex flex-col-reverse md:flex-row md:gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                            <p className="">Use the {product.lowercase} for free up to {product.freeTier}.</p>
                        </div>
                        <div className="md:w-96 md:text-right mb-8 md:mb-0 -mt-8">
                            <CloudinaryImage
                                alt="Just another hedgehog"
                                placeholder="blurred"
                                className="w-full max-w-[140px]"
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/error-tracking/error-hog.png"
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

                <section
                    id="tutorials"
                    className={`${
                        fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'
                    } px-5 py-10 md:pt-0 md:-mt-12 pb-0`}
                >
                    <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-0`}>
                        <h3 className="text-3xl lg:text-4xl text-center mb-2">Featured tutorials</h3>
                        <p className="mt-0 text-opacity-75 text-center mb-6">
                            Visit the <Link to="/tutorials">tutorials</Link> section for more.
                        </p>

                        <ul className="list-none p-0 grid md:grid-cols-3 gap-4 mb-10 md:mb-20mx-5 md:mx-0">
                            <TutorialCard
                                title="How to set up error tracking"
                                description="Get started with error tracking in your application"
                                url="/tutorials/error-tracking-setup"
                            />
                            <TutorialCard
                                title="How to analyze error patterns"
                                description="Use PostHog's analytics to understand error trends"
                                url="/tutorials/error-tracking-analysis"
                            />
                            <TutorialCard
                                title="How to set up error alerts"
                                description="Configure notifications for critical errors"
                                url="/tutorials/error-tracking-alerts"
                            />
                        </ul>
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
                        menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'error tracking')?.children || []}
                    />
                </section>

                <section
                    id="team"
                    className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}
                >
                    <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-0`}>
                        <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                        <p className="text-center mb-2">
                            PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                            building the {product.lowercase}.
                        </p>
                        <TeamMembers teamName={team} setActiveProfile={setActiveProfile} />
                    </div>
                </section>

                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                    <PairsWith items={pairsWithItemCount}>
                        {PairsWithArray.map((card, index) => {
                            return <PairsWithItem {...card} key={index} />
                        })}
                    </PairsWith>
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