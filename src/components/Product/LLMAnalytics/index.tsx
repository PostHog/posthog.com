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
    IconLlmObservability,
    IconUnlock,
    IconUserPaths,
    IconWarning,
    IconToggle,
    IconPerson,
    IconHandMoney,
    IconActivity,
    IconChatHelp,
    IconTrends,
    IconUser,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { TutorialCard } from 'components/Products/TutorialCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { graphql, useStaticQuery } from 'gatsby'
import ContentViewer from 'components/ContentViewer'

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
    slug: 'llm-analytics',
    lowercase: 'LLM analytics',
    capitalized: 'LLM analytics',
    freeTier: '100,000 events',
}

const team = 'LLM analytics'
const teamSlug = '/teams/llm-observability'

const featuresPerRow = 3
const features = [
    {
        title: 'Ready-made dashboards',
        description: 'Use ready-made dashboards for tracking on a per model or per user',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/cost_per_modal_e0d5520b4a.png"
                width={420}
            />
        ),
        border: true,
    },
    {
        title: 'Latency alerts',
        description: 'Get alerts when latency exceeds a threshold, or when it spikes for a specific model.',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/generation_lag_d6246c9b28.png"
                width={420}
            />
        ),
        border: true,
    },
    {
        title: 'Cost tracking',
        description: 'Monitor your per-user costs, and combine with revenue analytics for more insights',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/cost_perpuser_5d836abe95.png"
                width={420}
            />
        ),
        border: true,
    },
]

const subfeaturesItemCount = 5
const subfeatures = [
    {
        icon: <IconChatHelp />,
        title: 'Generation tracking',
        description: 'Monitor generation events and prompts, with autocapture',
    },
    {
        icon: <IconDecisionTree />,
        title: 'Trace monitoring',
        description: 'Follow the full user interaction, including all generations',
    },
    {
        icon: <IconHandMoney />,
        title: 'Cost reporting',
        description: 'Keep an eye on overall costs, or break it down by model, user, and more',
    },
    {
        icon: <IconPerson />,
        title: 'Users tracking',
        description: 'Breakdown every interaction on an individual user basis',
    },
    {
        icon: <IconActivity />,
        title: 'Latency monitoring',
        description: 'Understand latency over time and how models impact performance',
    },
]

const ecosystemItemCount = 3
const ecosystem = [
    {
        title: 'Session replay',
        description:
            'Watch session recordings to see what users see when interacting with your AI product',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'Feature flags',
        description: 'See how specific changes impact your metrics',
        icon: <IconToggle />,
        color: 'seagreen',
    },
    {
        title: 'Error tracking',
        description: 'Correlate app errors with specific sessions and prompt responses',
        icon: <IconWarning />,
        color: 'orange',
    },
]

const questions = [
    {
        question: 'How much money am I spending per week?',
        url: '/docs/llm-analytics/dashboard',
    },
    {
        question: 'What is my cost per user?',
        url: '/docs/llm-analytics/dashboard',
    },
    {
        question: 'How might my LLM react to a new prompt?',
        url: '/docs/llm-analytics/dashboard',
    },
    {
        question: 'How do my generations compare to each other?',
        url: '/docs/llm-analytics/traces-generations',
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

const comparisonColumnCount = 5
const comparison = [
    {
        feature: 'Generation tracking',
        companies: {
            Langfuse: true,
            Langsmith: true,
            Helicone: true,
            PostHog: true,
        },
    },
    {
        feature: 'Latency tracking',
        companies: {
            Langfuse: true,
            Langsmith: true,
            Helicone: true,
            PostHog: true,
        },
    },
    {
        feature: 'Cost tracking, incl. cost-per-user',
        companies: {
            Langfuse: true,
            Langsmith: false,
            Helicone: true,
            PostHog: true,
        },
    },
    {
        feature: 'Trace visualization',
        companies: {
            Langfuse: true,
            Langsmith: true,
            Helicone: true,
            PostHog: true,
        },
    },
    {
        feature: 'Token tracking',
        companies: {
            Langfuse: true,
            Langsmith: true,
            Helicone: true,
            PostHog: true,
        },
    },
    {
        feature: 'Prompt playground',
        companies: {
            Langfuse: true,
            Langsmith: true,
            Helicone: true,
            PostHog: true,
        },
    },
    {
        feature: 'Prompt evaluations',
        companies: {
            Langfuse: true,
            Langsmith: true,
            Helicone: true,
            PostHog: false,
        },
    },
    {
        feature: 'Alerting',
        companies: {
            Langfuse: false,
            Langsmith: true,
            Helicone: true,
            PostHog: true,
        },
    },
    {
        feature: 'SOC 2 compliance',
        companies: {
            Langfuse: true,
            Langsmith: true,
            Helicone: true,
            PostHog: true,
        },
    },
    {
        feature: 'HIPAA and GDPR compliance',
        companies: {
            Langfuse: true,
            Langsmith: true,
            Helicone: true,
            PostHog: true,
        },
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconWarning />,
        color: 'orange',
        product: 'Error tracking',
        description: 'Get error alerts, then deep dive into it and assign blame to someone else.',
        url: '/error-tracking',
    },
    {
        icon: <IconRewindPlay />,
        color: 'yellow',
        product: 'Session replays',
        description: 'Jump from a trace to the session that caused it to see what the user was doing.',
        url: '/session-replay',
    },
    {
        icon: <IconToggle />,
        color: 'blue',
        product: 'Feature flags',
        description: 'Gate changes behind flags, including new LLM models, pricing or UI changes. ',
        url: '/feature-flags',
    },
]

export const ProductLLMAnalytics = () => {
    const { elevenlabs, lovable } = useStaticQuery(graphql`
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
            elevenlabs: mdx(slug: { eq: "customers/elevenlabs" }) {
                ...ProductCustomerFragment
            }
            lovable: mdx(slug: { eq: "customers/lovable" }) {
                ...ProductCustomerFragment
            }
        }
    `)
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState(false)
    return (
        <>
            <SEO
                title="LLM analytics and observability - PostHog"
                description="Analyze traces, per-user costs, latency, and more"
                image={`/images/og/llm-analytics.png`}
            />
            <SideModal open={!!activeProfile} setOpen={setActiveProfile}>
                {activeProfile && <Profile profile={{ ...activeProfile }} />}
            </SideModal>
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="purple"
                    icon={<IconLlmObservability />}
                    product={product.capitalized}
                    title='<span class="text-red dark:text-yellow">Monitor and debug</span> your AI products'
                    description="Analyze traces, per-user costs, latency, and more"
                />

                <div className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/llm_desktop_51e40f58bb.png"
                        alt="Screenshot of llm analytics in PostHog"
                        className="w-full max-w-[1406px] hidden md:block"
                        placeholder="none"
                    />
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/llm_mobile_82d1f03dcb.png"
                        alt="Screenshot of llm analytics in PostHog"
                        className="w-[calc(100%+2rem)] max-w-[828px] md:hidden -ml-4"
                        placeholder="none"
                    />
                </div>

                <section id="customers" className="-mt-36 pt-36">
                    <ul className="list-none p-0 grid md:grid-cols-2 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="uses LLM analytics with session replays (and everything else)"
                            quote="PostHog is amazing. It reins in the chaos to have everything in one place. Otherwise it’s quite overwhelming to try and understand what’s working and what’s not"
                            customer={elevenlabs}
                        />
                        <CustomerCard
                            outcome="compared us to every other observability tool, just to be sure"
                            quote="If you're building a new product, just use PostHog. It's a no-brainer. It's the only all-in-one platform like it for developers."
                            customer={lovable}
                        />
                    </ul>
                </section>
            </div>

            <SmoothScroll />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-4 pb-0`}>
                <section id="features" className="-mt-36 pt-36">

                    <ul
                        className={`grid md:grid-cols-2 lg:grid-cols-${subfeaturesItemCount} gap-4 list-none p-0`}
                    >
                        {subfeatures.map((subfeature, index) => (
                            <Subfeature key={index} {...subfeature} />
                        ))}
                    </ul>

                    <p className="text-center text-balance mt-8">
                        <strong>Privacy mode:</strong>{' '}
                        If you want high-level metrics (like cost and performance) without exposing user conversations to your team, you can <Link to="/docs/llm-analytics/privacy-mode">enable this in your code</Link>.
                    </p>

                    <div className="py-12">
                        <ul className={`grid md:grid-cols-2 lg:grid-cols-${featuresPerRow} gap-8 list-none p-0`}>
                            {features.map((feature, index) => (
                                <Feature key={index} {...feature} />
                            ))}
                        </ul>
                    </div>

                    <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-0`}>
                        <div className="flex flex-col-reverse items-center md:flex-row gap-8 mb-20">
                            <div className="flex-1">
                                <h2 className="text-4xl">
                                    Prompt playground
                                </h2>
                                <p>
                                    Test new models against each other, simulate different chat histories, and
                                    test different reasoning levels – all inside PostHog.
                                </p>

                            </div>
                            <aside className="shrink-0 md:basis-[500px]">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/model_playground_c8cf84629c.png"
                                    alt="privacy mode hedgehog"
                                    className="w-full max-w-[662px]"
                                />
                            </aside>
                        </div>
                    </div>

                </section>
                <section>
                    <h2 className="text-4xl md:text-5xl text-center">
                        Works with other PostHog products
                    </h2>
                    <p className="text-center text-lg max-w-2xl mx-auto mb-12">
                        You can use LLM analytics by itself, but the magic comes when you use it with other tools and products from PostHog.
                    </p>

                    <div className="my-12">
                        <ul
                            className={`grid md:grid-cols-2 lg:grid-cols-${ecosystemItemCount} gap-8 mt-12 list-none p-0`}
                        >
                            {ecosystem.map((subfeature, index) => (
                                <Subfeature key={index} {...subfeature} />
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="my-20 px-5">
                    <div className="bg-accent dark:bg-accent-dark rounded-lg p-8 md:p-12">
                        <div className="mb-8">
                            <h2 className="text-5xl">
                                We use LLM analytics, too.
                            </h2>
                            <p className="text-lg mb-4">
                                We've used LLM analytics heavily while building <a href="/max">Max AI</a>, our in-app AI
                                product manager. At the start it helped us keep an eye on operational costs so we could
                                find out what <a href="/why">sustainable pricing</a> may look like. When we launched
                                into beta we also monitored traces to see how Max was being used and gather feedback.
                            </p>
                            <p className="text-lg">
                                Having a bespoke tool to track traces has been invaluable for the Max AI team because of
                                how we can connect traces to other data. The ability to easily jump from a trace to a
                                session replay or person profile, for example, lets us see how users interact with Max
                                in real time <i>and</i> understand their wider context too.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row items-start gap-8">
                            <div className="flex-1 text-center md:text-left">
                                <blockquote className="text-lg md:text-xl font-semibold mb-4 bg-highlight p-0.5">
                                    "The best thing about LLM analytics for us is how it connects with our other tools,
                                    like session replays and feature flags. That's something no other tool can do,
                                    because they focus on a narrower scope."
                                </blockquote>
                                <div className="flex items-center gap-4 justify-center md:justify-start">
                                    <div className="flex-shrink-0">
                                        <CloudinaryImage
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/michael_llm_bcf796e79a.png"
                                            alt="Michael, LLM wizard"
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold">
                                            Michael Matloka
                                        </div>
                                        <div className="text-sm opacity-75">Product Engineer at PostHog</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/feature-flags-hog.png"
                            alt=""
                        />
                    </div>
                </div>

                <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                    <div className="flex-grow overflow-auto px-5 md:px-0">
                        <Plans showHeaders={false} showCTA={false} groupsToShow={['llm_analytics']} />
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
                                    <li>
                                        You don't need any product insights and only want to track operational metrics
                                    </li>
                                    <li>You're building a mobile specific product and need deep mobile support</li>
                                    <li>You don't want to use an open source product</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>
                                        You want to understand LLM costs on a per user basis, in addition to other axes
                                    </li>
                                    <li>
                                        You want to combine LLM analytics with other tools, including error tracking and
                                        session replays
                                    </li>
                                    <li>You need easy regulatory compliance for HIPAA and GDPR</li>
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
                            description="In this tutorial, we'll build a basic Next.js app, implement the Claude API, and capture these events automatically using PostHog's LLM analytics product."
                            url="/tutorials/anthropic-analytics"
                        />
                        <TutorialCard
                            title="How to monitor LlamaIndex with Langfuse and PostHog"
                            description="LlamaIndex is a powerful framework for connecting LLMs with external data sources. Combin PostHog with Langfuse to easily monitor your LLM app."
                            url="/tutorials/monitor-llama-index-with-langfuse"
                        />
                        <TutorialCard
                            title="How to set up OpenAI analytics"
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
                            docsMenu.children?.find(({ name }) => name.toLowerCase() === 'llm analytics')?.children ||
                            []
                        }
                    />
                </section>

                <section id="team" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The <Link to={teamSlug}>LLM Observability</Link> team is responsible for
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

            <div className="max-w-7xl mx-auto px-5">
                <section className="mb-20">
                    <div className="bg-accent dark:bg-accent-dark rounded-lg p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <img
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/chris_raroque_fb1af07ae1.jpg"
                                    alt="Chris Raroque"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <blockquote className="text-lg md:text-xl font-medium mb-4">
                                    "PostHog's LLM analytics saved us so much time. We used to use a whole system of
                                    tools to track the prompts and responses for debugging and this is an infinitely
                                    better UI. We use it for every single AI experiment we run now —{' '}
                                    <strong className="bg-highlight p-0.5">
                                        also, if you need another quote then let me know, because the whole team loves
                                        it!
                                    </strong>
                                    "
                                </blockquote>
                                <div className="font-semibold">
                                    <a
                                        href="https://chrisraroque.com/"
                                        className="hover:text-red dark:hover:text-yellow"
                                    >
                                        Chris Raroque
                                    </a>
                                </div>
                                <div className="text-sm opacity-75">Founder and YouTuber</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="max-w-7xl mx-auto relative">
                <section className="mb-20">
                    <CTA />
                </section>
            </div>
        </>
    )
}

export default ProductLLMAnalytics
