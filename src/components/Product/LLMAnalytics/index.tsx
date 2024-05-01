import React from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import {
    IconMessage,
    IconClock,
    IconGraph,
    IconFlask,
    IconToggle,
    IconPieChart,
    IconNotification,
    IconRewindPlay,
    IconBolt,
    IconPeople,
    IconAdvanced,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { TutorialCard } from 'components/Products/TutorialCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { graphql, useStaticQuery } from 'gatsby'
import { docsMenu } from '../../../navs'
import TeamRoadmap from 'components/TeamRoadmap'
import { Marquee } from 'components/Products/Marquee'
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
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Plans from 'components/Pricing/Plans'
import Layout from 'components/Layout'

const product = {
    slug: 'llm-analytics',
    lowercase: 'LLM analytics',
    capitalized: 'LLM analytics',
    freeTier: 'n/a',
}

const team = 'Marketing'
const teamSlug = '/teams/marketing'

const featuresPerRow = 2
const features = [
    {
        title: 'Measure costs',
        description: 'Track the cost of each model, or the average cost of each prompt',
        image: <StaticImage src="./images/question-types.png" width={428} placeholder="none" />,
    },
    {
        title: 'Track latency',
        description: 'Monitor the performance of each generation and data model',
        image: <StaticImage src="./images/question-types.png" width={428} placeholder="none" />,
    },
    {
        title: 'User insights',
        description: 'Investigate your average costs and traces per user',
        image: <StaticImage src="./images/question-types.png" width={428} placeholder="none" />,
    },
    {
        title: 'Correlate feedback',
        description: 'Understand how user feedback translates into engagement',
        image: <StaticImage src="./images/question-types.png" width={428} placeholder="none" />,
    },
]

const subfeaturesItemCount = 2
const subfeatures = [
    {
        title: 'Dashboard templates',
        description: 'Get instant insights with ready-made templates',
        icon: <IconBolt />,
    },
    {
        title: 'Simple integrations',
        description: 'Integrate seamlessly with Langfuse or Helicone',
        icon: <IconPeople />,
    },
]

const questions = [
    {
        question: 'Are there generation latency spikes?',
    },
    {
        question: 'Does interacting with the LLM feature relate to higher retention rates?',
    },
    {
        question: 'How does the LLM feature impact my conversion rates?',
    },
    {
        question: 'What are my LLM costs by customer, model, and in total?',
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconGraph />,
        product: 'Product analytics',
        description: 'Use insights to dive deeper into your data and track sign-ups, payments, and more.',
        url: '/product-analytics',
    },
    {
        icon: <IconMessage />,
        product: 'Surveys',
        description: 'Target users with surveys to gather CSAT scores and measure satisfaction with your model.',
        url: '/surveys',
    },
    {
        icon: <IconRewindPlay />,
        product: 'Session replay',
        description: 'Watch recordings of users interacting with your LLM to get full context about their behavior.',
        url: '/session-replay',
    },
]

export const LLMAnalytics = () => {
    const { elevenlabs } = useStaticQuery(graphql`
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
        }
    `)
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="LLM analytics - PostHog"
                description="Get instant insights into LLM products and model performance"
                image={`/images/og/surveys.jpg`}
            />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="yellow"
                    icon={<IconAdvanced />}
                    beta={true}
                    product={product.capitalized}
                    title='Unlock <span class="text-red dark:text-yellow">instant insights</span> for LLM products'
                    description="Track LLM and AI app metrics, such as model costs, latency, evaluations, and more"
                />

                <div className="text-center">
                    <StaticImage
                        src="../../../images/products/screenshot-surveys.png"
                        alt="Screenshot of survey results in PostHog"
                        className="w-full max-w-[1360px]"
                        placeholder="none"
                    />
                </div>
                <section id="customers" className="-mt-36 pt-36">
                    <ul className="list-none p-0 grid md:grid-cols-1 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="uses the entire PostHog toolset to build their generative voice AI."
                            quote="We used to have Looker, and a bunch of other tools. Now it's just PostHog, BigQuery, and Stripe...PostHog is amazing. It reins in the chaos so we have everything in one place."
                            customer={elevenlabs}
                        />
                    </ul>
                </section>
            </div>

            <SmoothScroll exclude={['Installation']} />

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
                    <Marquee product={product.capitalized} shortFade={true}>
                        {questions.map((question, index) => {
                            return <Question {...question} key={index} />
                        })}
                    </Marquee>
                </section>
            </div>

            <section
                id="pricing"
                className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto px-5 pt-20 pb-10`}
            >
                <h2 className="text-3xl md:text-4xl text-center">Usage-based pricing</h2>
                <div className="max-w-3xl mx-auto bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded p-8 mt-1">
                    <p className="mb-1">
                        <strong>While in beta...</strong>
                    </p>
                    <p className="mb-2">
                        LLM analytics is currently bundled with <Link to="/product-analytics">product analytics</Link>.
                    </p>
                    <ul className="mb-2">
                        <li>
                            <strong>First 1 million events every month:</strong> Free (get access to both products)
                        </li>
                        <li>
                            <strong>After 1 million events/mo:</strong> Usage is billed through product analytics. Get
                            access to LLM analytics at no additional cost.
                        </li>
                    </ul>
                    <p className="mb-0">Dedicated pricing for LLM analytics is coming soon.</p>
                </div>
            </section>

            <div className={`${fullWidthContent ? 'max-w-full px-0 md:px-8' : 'max-w-7xl'} mx-auto`}>
                <div id="posthog-vs">
                    <section className="mb-20 mt-20">
                        <h3 className="text-center mb-8">How does PostHog compare?</h3>
                        <div className="mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                            <VsCompetitor
                                title="Reasons a competitor might be better for you (for now...)"
                                image={
                                    <StaticImage
                                        src="../../../images/products/competitors-pa.png"
                                        className="max-w-[159px]"
                                        placeholder="none"
                                    />
                                }
                            >
                                <ul>
                                    <li>You want lots of closed-source point solutions</li>
                                    <li>No need for surveys, flags, experiments, replays</li>
                                    <li>Alerting for when costs move beyond thresholds</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>Integrate with your existing LLM tools</li>
                                    <li>Track latency, cost, and more in one place</li>
                                    <li>One-click dashboards to get you setup fast</li>
                                    <li>Tight integration with analytics, surveys, and replays</li>
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
                            title="How to set up LLM analytics for Cohere"
                            description="Discover how to capture important metrics from Cohere and ingest them into PostHog. Track metrics such as cost per model, cost per user, and your average API response time."
                            url="/tutorials/cohere-analytics"
                        />
                        <TutorialCard
                            title="How to set up LLM analytics for Anthropic's Claude"
                            description="Learn how to build a basic Next.js app which implements the Claude API, and then pass events to PostHog so you can track usage metrics for your LLM product."
                            url="/tutorials/anthropic-analytics"
                        />
                        <TutorialCard
                            title="How to set up LLM analytics for ChatGPT"
                            description="Track ChatGPT API usage, costs, latency and more. This tutorial guides you through building a demo app, implementing the API, and integrating with PostHog."
                            url="/tutorials/chatgpt-analytics"
                        />
                        <TutorialCard
                            title="How to analyze surveys ChatGPT"
                            description="Learn how to create a basic Node.js script, parse a CSV of survey answers, and use the ChatGPT API to extract useful information such as sentiment and theme."
                            url="/tutorials/chatgpt-analytics"
                        />
                    </ul>
                </section>

                {/*
        <section id="installation" className="mb-20 px-5 md:px-0">
          <h3 className="text-3xl lg:text-4xl text-center mb-2">Install &amp; customize</h3>
          <p className="mt-0 opacity-50 text-center mb-12">
            Here are some ways you can fine tune how you implement {product.lowercase}.
          </p>

          <ContentViewer sticky={false} scrollToTop={false} content={[...SessionReplay]} />
        </section>
        */}

                <section id="docs" className="mb-20 px-5 md:px-0">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks
                        menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'llm analytics').children}
                    />
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

                    <Questions topicId={64} />
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

export default LLMAnalytics
