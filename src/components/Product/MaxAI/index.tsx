import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import { IconChat, IconGraph, IconRewindPlay, IconThoughtBubble, IconUser } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { docsMenu } from '../../../navs'
import { Marquee } from 'components/Products/Marquee'
import TeamMembers from '../TeamMembers'
import Questions from '../Questions'
import CTA from 'components/Home/CTA'
import { PairsWith } from 'components/Products/PairsWith'
import { PairsWithItem } from 'components/Products/PairsWith/item'
import { Question } from 'components/Products/Question'
import { DocLinks } from 'components/Products/DocsLinks'
import { SmoothScroll } from 'components/Products/SmoothScroll'
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
    slug: 'max-ai',
    lowercase: 'Max AI',
    capitalized: 'Max AI',
    freeTier: '100 queries',
}

const team = 'Max AI'
const teamSlug = '/teams/max-ai'

const featuresPerRow = 3
const features = [
    {
        title: 'Research answers',
        description: 'Get instant insights by asking Max to analyze your product data',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/max_research_side_9365f7d4b2.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'UI automation',
        description: 'Let Max handle routine tasks like updating filters or creating insights',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/max_automation_side_9365f7d4b2.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Feature guidance',
        description: 'Learn about PostHog features and best practices through natural conversation',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/max_guide_side_9365f7d4b2.png"
                width={428}
                placeholder="none"
            />
        ),
    },
]

const subfeaturesItemCount = 4
const subfeatures = [
    {
        title: 'Data analysis',
        description: 'Query and analyze your product data through natural language',
        icon: <IconGraph />,
        color: 'blue',
    },
    {
        title: 'Contextual help',
        description: 'Get relevant documentation and guidance based on your current context',
        icon: <IconChat />,
        color: 'yellow',
    },
    {
        title: 'User insights',
        description: 'Understand user behavior and patterns through AI-powered analysis',
        icon: <IconUser />,
        color: 'seagreen',
    },
    {
        title: 'Session replay integration',
        description: 'Connect insights with actual user sessions for deeper understanding',
        icon: <IconRewindPlay />,
        color: 'purple',
    },
]

const questions = [
    {
        question: 'How do I get started with Max?',
        url: '/docs/max-ai',
    },
    {
        question: 'What data can Max access?',
        url: '/docs/max-ai#what-access-does-max-have-to-my-data',
    },
    {
        question: 'How do I enable Max?',
        url: '/docs/max-ai#how-do-i-access-max',
    },
    {
        question: 'Is my data secure?',
        url: '/docs/max-ai#is-my-data-shared-with-third-parties',
    },
]

const comparisonColumnCount = 6
const comparison = [
    {
        feature: 'Natural language queries',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            PostHog: true,
        },
    },
    {
        feature: 'Contextual help',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            PostHog: true,
        },
    },
    {
        feature: 'UI automation',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            PostHog: true,
        },
    },
    {
        feature: 'Data analysis',
        companies: {
            Amplitude: true,
            Mixpanel: true,
            Heap: true,
            PostHog: true,
        },
    },
    {
        feature: 'Session replay integration',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            PostHog: true,
        },
    },
    {
        feature: 'Feature guidance',
        companies: {
            Amplitude: false,
            Mixpanel: false,
            Heap: false,
            PostHog: true,
        },
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        title: 'Product Analytics',
        description: 'Get AI-powered insights from your product data',
        icon: <IconGraph />,
        product: 'Product Analytics',
        url: '/product-analytics',
        color: 'blue',
    },
    {
        title: 'Session Replay',
        description: 'Connect insights with actual user sessions',
        icon: <IconRewindPlay />,
        product: 'Session Replay',
        url: '/session-replay',
        color: 'yellow',
    },
    {
        title: 'Feature Flags',
        description: 'Get AI guidance on feature flag best practices',
        icon: <IconThoughtBubble />,
        product: 'Feature Flags',
        url: '/feature-flags',
        color: 'seagreen',
    },
]

export const ProductMaxAI = () => {
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState<ProfileData | null>(null)

    return (
        <>
            <SEO
                title="Max AI - PostHog"
                description="Your AI-powered product analyst and assistant"
                image={`/images/og/max-ai.jpg`}
            />
            <SideModal open={!!activeProfile} setOpen={(open) => setActiveProfile(open ? activeProfile : null)}>
                {activeProfile && <Profile profile={activeProfile} />}
            </SideModal>
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    icon="ai"
                    product={product.capitalized}
                    title="Your AI-powered product analyst and assistant"
                    description="Get instant insights, automate tasks, and learn best practices through natural conversation"
                    image="https://res.cloudinary.com/dmukukwp6/image/upload/max_preview_side_9365f7d4b2.png"
                />

                <div className="text-center"></div>

                <section id="features" className="-mt-36 pt-36">
                    <h2 className="text-4xl md:text-5xl text-center">
                        All the features you'd expect from an AI assistant,{' '}
                        <span className="text-red dark:text-yellow">but built specifically for product analytics</span>
                    </h2>
                    <p className="text-lg opacity-75 text-center">
                        Max understands your product data and can help you make better decisions.
                    </p>
                </section>

                <div className="mt-12">
                    <ul
                        className={`grid md:grid-cols-2 lg:grid-cols-${subfeaturesItemCount} gap-8 mt-12 list-none p-0`}
                    >
                        {subfeatures.map((subfeature, index) => (
                            <Subfeature key={index} {...subfeature} />
                        ))}
                    </ul>
                </div>

                <div className="py-12">
                    <ul className={`grid md:grid-cols-2 lg:grid-cols-${featuresPerRow} gap-8 list-none p-0`}>
                        {features.map((feature, index) => (
                            <Feature key={index} {...feature} />
                        ))}
                    </ul>
                </div>

                <section>
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

                <section id="pricing" className="pt-20">
                    <div className="flex flex-col-reverse md:flex-row md:gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                            <p className="">Use Max AI for free up to {product.freeTier} queries per month.</p>
                        </div>
                        <div className="md:w-96 md:text-right mb-8 md:mb-0 -mt-16">
                            <CloudinaryImage
                                alt="Max AI assistant"
                                placeholder="blurred"
                                className="w-full max-w-[250px]"
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/max_preview_side_9365f7d4b2.png"
                            />
                        </div>
                    </div>

                    <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                        <div className="flex-grow overflow-auto px-5 md:px-0 mb-8 md:mb-0">
                            <Plans showTitle={false} groupsToShow={['max_ai']} />
                        </div>
                    </div>
                </section>

                <section id="posthog-vs">
                    <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                    <Comparison comparison={comparison} columnCount={comparisonColumnCount} truncate />

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
                                <li>Advanced AI model customization</li>
                                <li>Custom AI model training</li>
                                <li>Enterprise-grade AI security</li>
                            </ul>
                        </VsCompetitor>
                        <VsPostHog>
                            <ul>
                                <li>Deep integration with PostHog products</li>
                                <li>Product analytics-specific knowledge</li>
                                <li>Simple, transparent pricing</li>
                                <li>Built-in session replay integration</li>
                            </ul>
                        </VsPostHog>
                    </div>

                    <p className="text-center text-sm font-medium">
                        Have questions about Max AI? <br className="md:hidden" />
                        <Link to={`/questions/${product.slug}`}>Ask the community</Link> or{' '}
                        <Link to="/talk-to-a-human">book a demo</Link>.
                    </p>
                </section>

                <section id="docs" className="py-16">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks
                        menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'max ai')?.children || []}
                    />
                </section>

                <section id="team">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-0">
                        PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                        building this product.
                    </p>
                    <TeamMembers teamName={team} setActiveProfile={setActiveProfile} />
                </section>

                <section id="questions" className="my-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                    <p className="text-center mb-4">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                            <span>View {product.lowercase} questions</span>
                        </CallToAction>
                    </div>

                    <Questions topicIds={[389]} />
                </section>

                <section className="pb-12">
                    <PairsWith items={pairsWithItemCount}>
                        {PairsWithArray.map((card, index) => {
                            return <PairsWithItem {...card} key={index} />
                        })}
                    </PairsWith>
                </section>
            </div>

            <div className="max-w-7xl mx-auto relative">
                <section className="mb-12">
                    <CTA />
                </section>
            </div>
        </>
    )
}

export default ProductMaxAI
