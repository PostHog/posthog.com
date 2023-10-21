import React from 'react'
import Layout from '../../Layout'
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
    slug: 'surveys',
    lowercase: 'surveys',
    capitalized: 'Surveys',
    freeTier: '250 survey responses',
}

const team = 'Feature Success'

const features = [
    {
        title: 'Question types',
        description: 'Multiple choice, multi-select, numerical rating, emoji reaction, embedded links',
        image: <StaticImage src="./images/question-types.png" width={428} />,
    },
    {
        title: 'Templates',
        description: 'Choose from the library or start from scratch',
        image: <StaticImage src="./images/templates.png" width={428} />,
    },
    {
        title: 'Targeting',
        description: 'Target by URL, user property, or feature flag when used with Feature Flags',
        image: <StaticImage src="./images/targeting.png" width={428} />,
    },
    {
        title: 'Multi-step surveys',
        description: 'Up to 10 questions',
        image: <StaticImage src="./images/steps.png" width={428} />,
    },
    {
        title: 'Link somewhere',
        description: 'Send users to a webpage or invite them to book a meeting with a calendar invite',
        image: <StaticImage src="./images/link-scheduler.png" width={428} />,
    },
    {
        title: 'No-code? Yes. API? Yes.',
        description:
            "Using PostHog.js? No more code required. But want to create your own UI? Check out the <a href='/docs/surveys/implementing-custom-surveys'>Surveys API</a>.",
        image: <StaticImage src="./images/api.png" width={428} />,
    },
]

const subfeaturesItemCount = 3
const subfeatures = [
    {
        title: 'Aggregated results',
        description: 'See feedback summarized and broken down per response',
        icon: <IconPieChart />,
    },
    {
        title: 'Slack notifications',
        description: 'Send realtime survey responses to a Slack channel',
        icon: <IconNotification />,
    },
    {
        title: 'Customizable wait periods',
        description: 'Set a delay before the survey opens',
        icon: <IconClock />,
    },
]

const questions = [
    {
        question: 'How likely are you to recommend this product to a friend?',
        url: 'https://posthog-git-experiment-post-hog.vercel.app/tutorials/nps-survey',
    },
    {
        question: 'Would you like to be interviewed by our product team?',
        url: '#',
    },
    {
        question: 'How would you feel if you could no longer use this product?',
    },
    {
        question: "How satisfied are you with the support you've received?",
    },
    {
        question: 'Would you like to book a user interview?',
        url: '#',
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

const comparisonColumnCount = 5
const comparison = [
    {
        feature: 'Customizable pop-ups',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Live previews',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Multi-step surveys',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'API access',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Single choice questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Multiple choice questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Open text questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Numerical rating questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Emoji rating questions',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Third-party link support',
        companies: {
            Pendo: true,
            Hotjar: false,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by property',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by URL',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by feature flag',
        companies: {
            Pendo: false,
            Hotjar: false,
            Sprig: false,
            PostHog: true,
        },
    },
    {
        feature: 'Survey scheduling',
        companies: {
            Pendo: true,
            Hotjar: false,
            Sprig: false,
            PostHog: false,
        },
    },
    {
        feature: 'Export responses',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
        },
    },
    {
        feature: 'Slack integration',
        companies: {
            Pendo: true,
            Hotjar: true,
            Sprig: true,
            PostHog: true,
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

export const ProductSurveys = () => {
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
                    color="salmon"
                    icon={<IconMessage />}
                    product={product.capitalized}
                    title='Ask anything with <span class="text-red dark:text-yellow">no-code surveys</span>'
                    description="Build in-app popups with freeform text responses, multiple choice, NPS, ratings, and emoji reactions. Or use the API for complete control."
                />

                <div className="">
                    <StaticImage
                        src="../../../images/products/screenshot-surveys.png"
                        alt=""
                        className="w-full max-w-[1330px]"
                    />
                </div>

                {/*
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
                */}
            </div>

            <SmoothScroll className="-mt-24" />

            <div id="features">
                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <h3 className="text-3xl text-center mb-8">Features</h3>
                    <ul className="list-none p-0 grid md:grid-cols-3 gap-12 mb-8">
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
                    <PlanComparison showHeaders={false} showCTA={false} groupsToShow={['surveys']} />

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
                                        Forms
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                PostHog offers multi-step surveys, but they won't be full-page forms
                                                such as Typeform or Google Forms
                                            </li>
                                        </ul>
                                    </li>
                                    <li>AI-powered analysis or recommendations based on results</li>
                                    <li>Limited formatting options</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>No-code surveys with customizable colors and removable branding</li>
                                    <li>Automatic NPS score calculations</li>
                                    <li>Robust targeting &amp; integration with feature flags</li>
                                    <li>Tight integration with analytics, experiments, and session replay</li>
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

                {/*
        <section id="installation" className="mb-20">
          <h3 className="text-3xl lg:text-4xl text-center mb-2">Install &amp; customize</h3>
          <p className="mt-0 opacity-50 text-center mb-12">
            Here are some ways you can fine tune how you implement {product.lowercase}.
          </p>

          <ContentViewer sticky={false} scrollToTop={false} content={[...SessionReplay]} />
        </section>
        */}

                <section id="docs" className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children[5].children} />
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

export default ProductSurveys
