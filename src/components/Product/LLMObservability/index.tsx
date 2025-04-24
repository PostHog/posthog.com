import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
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
    IconAI,
    IconUnlock,
    IconUserPaths,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { TutorialCard } from 'components/Products/TutorialCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { graphql, useStaticQuery } from 'gatsby'
import ContentViewer from 'components/ContentViewer'
import LLMObservability from 'components/Home/CodeBlocks/LLMObservability'
import { docsMenu } from '../../../navs'
import { Marquee } from 'components/Products/Marquee'
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
import SideModal from '../../Modal/SideModal'
import Profile from '../../Team/Profile'

const product = {
    slug: 'llm-observability',
    lowercase: 'LLM observability',
    capitalized: 'LLM observability',
    freeTier: 'JOETBD',
}

const team = 'LLM observability'
const teamSlug = '/teams/llm-observability'

const featuresPerRow = 3
const features = [
    {
        title: 'Multivariate feature flags',
        description: 'Simultaneously test multiple versions against a control group',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/multivariate.png"
                width={420}
            />
        ),
        border: true,
    },
    {
        title: 'Multivariate feature flags',
        description: 'Simultaneously test multiple versions against a control group',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/multivariate.png"
                width={420}
            />
        ),
        border: true,
    },
    {
        title: 'Multivariate feature flags',
        description: 'Simultaneously test multiple versions against a control group',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/multivariate.png"
                width={420}
            />
        ),
        border: true,
    },
]

const subfeaturesItemCount = 4
const subfeatures = [
    {
        icon: <IconClock />,
        title: 'History & activity feed',
        description: "See who hit a feature flag, the flag's value, and which page they were on",
    },
    {
        icon: <IconDecisionTree />,
        title: 'Local evaluation',
        description: "Improves speed by caching a flag's value on initial load",
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
        question: 'How much money am I spending per week?',
        url: '/docs/ai-engineering/dashboard',
    },
    {
        question: 'What is my cost per user?',
        url: '/docs/ai-engineering/dashboard',
    },
    {
        question: 'How might my LLM react to a new prompt?',
        url: '/docs/ai-engineering/dashboard',
    },
    {
        question: 'How do my generations compare to each other?',
        url: '/docs/ai-engineering/traces-generations',
    },
    {
        question: 'What does a good AI product look like?',
        url: '/docs/max-ai',
    },
]

const faqs = [
    {
        question: 'How do I know what my request volume is?',
        children:
            "The easiest way is to sign up for the Free plan - no credit card required. You'll get an accurate volume projection after just a few days.",
    },
    {
        question: 'How can I manage cost at high volume?',
        children:
            "You can reduce the number of requests to PostHog with <a href='https://posthog.com/docs/feature-flags/local-evaluation'>local evaluation</a>, which stores flag definitions on your server and only polls PostHog periodically.",
    },
    {
        question: 'How long do you retain event data?',
        children:
            'Data is guaranteed to be retained for 7 years on any paid plan and 1 year on a free plan. After 1 year, data may be moved into cold storage so queries may run more slowly.',
    },
    {
        question: 'Is there a free trial on paid plans?',
        children:
            'We have a generous free tier on every paid plan so you can try out the features before paying any money. (You\'ll need to enter your credit card info, but you can set a billing limit). If you have additional needs, such as enterprise features, please <a href="/talk-to-a-human">get in touch</a>.',
    },
    {
        question: 'What currency are your prices in?',
        children: 'All prices are in US Dollars (USD), excluding taxes.',
    },
    {
        question: 'Do you offer a discount for non-profits?',
        children:
            'Yes in most cases - 25% off any plan. Create your account, then email <a href="mailto:sales@posthog.com?subject=Non-profit%20discount">sales@posthog.com</a> from the same email address with some basic details on your organization. We will then apply a discount.',
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
        feature: 'Target by person properties',
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
            PostHog: true,
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
        feature: 'Recall person properties by default',
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
        color: 'blue',
        product: 'JOETBD',
        description: 'JOETBD',
        url: '/product-analytics',
    },
    {
        icon: <IconUserPaths />,
        color: 'primary dark:text-primary-dark',
        product: 'JOETBD',
        description: 'JOETBD',
        url: '/product-analytics',
    },
    {
        icon: <IconRewindPlay />,
        color: 'yellow',
        product: 'JOETBD',
        description: 'JOETBD',
        url: '/session-replay',
    },
]

export const ProductFeatureFlags = () => {
    const { phantom, contra, elevenlabs, carvertical } = useStaticQuery(graphql`
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
            elevenlabs: mdx(slug: { eq: "customers/elevenlabs" }) {
                ...ProductCustomerFragment
            }
            carvertical: mdx(slug: { eq: "customers/carvertical" }) {
                ...ProductCustomerFragment
            }
        }
    `)
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState(false)
    return (
        <>
            <SEO
                title="LLM Observability - PostHog"
                description="Who keeps an eye on your AI? You do."
                image={`/images/og/feature-flags.jpg`}
            />
            <SideModal open={!!activeProfile} setOpen={setActiveProfile}>
                {activeProfile && <Profile profile={{ ...activeProfile }} />}
            </SideModal>
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="purple"
                    icon={<IconAI />}
                    product={product.capitalized}
                    title='Who keeps an eye on your AI? <span class="text-red dark:text-yellow">You do.</span>'
                    description="Track usage, costs, latency, and more for you AI products"
                />

                <div className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/screenshot-feature-flags.png"
                        alt="Screenshot of llm observability in PostHog"
                        className="w-full max-w-[1361px]"
                        placeholder="none"
                    />
                </div>
            </div>

            <SmoothScroll />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-4 pb-0`}>
                <section id="features" className="-mt-36 pt-36">
                    <h2 className="text-4xl md:text-5xl text-center">
                        All the features you'd expect, but{' '}
                        <span className="text-red dark:text-yellow">10x better in the PostHog ecosystem</span>
                    </h2>
                    <p className="text-lg opacity-75 text-center">
                        Sure you can use error tracking solo, but it's better with other PostHog products.
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
                        <CloudinaryImage
                            placeholder="none"
                            quality={100}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/feature-flags-hog.png"
                            alt=""
                        />
                    </div>
                </div>

                <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                    <div className="flex-grow overflow-auto px-5 md:px-0">
                        <Plans showHeaders={false} showCTA={false} groupsToShow={['feature_flags']} />
                    </div>
                    <div className="px-5 md:px-0 lg:w-96 lg:mt-4">
                        <h4 className="text-3xl">FAQs</h4>
                        {faqs.map((faq, index) => {
                            return <FAQ {...faq} key={index} />
                        })}
                    </div>
                </div>
            </section>

            <div className={`${fullWidthContent ? 'max-w-full px-0 md:px-8' : 'max-w-7xl'} mx-auto`}>
                <div id="posthog-vs">
                    <section>
                        <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                        <Comparison comparison={comparison} columnCount={comparisonColumnCount} />
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
                                    <li>JOETBD</li>
                                    <li>JOETBD</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>JOETBD</li>
                                    <li>JOETBD</li>
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

                <section id="tutorials">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Featured tutorials</h3>
                    <p className="mt-0 text-opacity-75 text-center mb-6">
                        Visit the <Link to="/tutorials">tutorials</Link> section for more.
                    </p>

                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20 mx-5 md:mx-0">
                        <TutorialCard
                            title="How to set up LLM analytics for Cohere"
                            description="Tracking your Cohere usage, costs, and latency is crucial to understanding how your users are interacting with your AI and LLM-powered features."
                            url="/tutorials/cohere-analytics"
                        />
                        <TutorialCard
                            title="How to set up LLM analytics for Anthropic's Claude"
                            description="In this tutorial, we'll build a basic Next.js app, implement the Claude API, and capture these events automatically using PostHog's LLM observability product."
                            url="/tutorials/anthropic-analytics"
                        />
                        <TutorialCard
                            title="How to monitor LlamaIndex with Langfuse and PostHog"
                            description="LlamaIndex is a powerful framework for connecting LLMs with external data sources. Combin PostHog with Langfuse to easily monitor your LLM app."
                            url="/tutorials/monitor-llama-index-with-langfuse"
                        />
                        <TutorialCard
                            title="How to set up OpenAI observability"
                            description="Let's explore how add and track the generate API route, then view generation data in PostHog."
                            url="/tutorials/openai-observability"
                        />
                    </ul>
                </section>

                <section id="docs" className="mb-20 px-5 md:px-0">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks
                        menu={
                            docsMenu.children?.find(({ name }) => name.toLowerCase() === 'llm observability')
                                ?.children || []
                        }
                    />
                </section>

                <section id="team" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                        building {product.lowercase}.
                    </p>
                    <TeamMembers teamName={team} setActiveProfile={setActiveProfile} />
                </section>

                <section id="roadmap" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Roadmap &amp; changelog</h3>

                    <p className="text-center mb-8">Here's what the team is up to.</p>

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

                    <Questions topicIds={[390]} />
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

export default ProductFeatureFlags
