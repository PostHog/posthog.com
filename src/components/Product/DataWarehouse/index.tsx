import React from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import {
    IconMessage,
    IconClock,
    IconGraph,
    IconHogQL,
    IconToggle,
    IconPieChart,
    IconNotification,
    IconRewindPlay,
    IconColumns,
    IconDatabase,
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

const product = {
    slug: 'data-warehouse',
    lowercase: 'data warehouse',
    capitalized: 'Data warehouse',
    freeTier: '1,000,000 rows',
}

const team = 'Data Warehouse'
const teamSlug = '/teams/data-warehouse'

const featuresPerRow = 4
const features = [
    {
        title: 'STRIPE',
        description: 'Multiple choice, multi-select, numerical rating, emoji reaction, embedded links',
        image: <StaticImage src="./images/question-types.png" width={428} placeholder="none" />,
    },
    {
        title: 'HUBSPOT',
        description: 'Choose from the library or start from scratch',
        image: <StaticImage src="./images/templates.png" width={428} placeholder="none" />,
        background: true,
        fade: true,
    },
    {
        title: 'ZENDESK',
        description: 'Target by URL, person property, or feature flag when used with Feature Flags',
        image: <StaticImage src="./images/targeting.png" width={428} placeholder="none" />,
    },
    {
        title: 'CUSTOM SOURCE',
        description: 'Up to 10 questions',
        image: <StaticImage src="./images/steps.png" width={428} placeholder="none" />,
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
        description: 'Set a delay before a survey opens',
        icon: <IconClock />,
    },
]

const questions = [
    {
        question: 'Would you like to book a user interview?',
        url: '/tutorials/feedback-interviews-site-apps',
    },
    {
        question: 'Would you like to be interviewed by our product team?',
    },
    {
        question: 'How would you feel if you could no longer use this product?',
    },
    {
        question: "How satisfied are you with the support you've received?",
    },
]

const faqs = [
    {
        question: 'How long do you retain survey data?',
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
            'Yes in most cases - 50% off any plan. Create your account, then email <a href="mailto:sales@posthog.com?subject=Non-profit%20discount">sales@posthog.com</a> from the same email address with some basic details on your organization. We will then apply a discount.',
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
        description: 'Analyze data from any source independently, or alongside product data.',
        url: '/product-analytics',
    },
    {
        icon: <IconToggle />,
        product: 'Feature flags',
        description: 'Use data to toggle flags, trigger experiments, and more.',
        url: '/feature-flags',
    },
    {
        icon: <IconHogQL />,
        product: 'HogQL',
        description: 'Use our take on SQL to create entirely custom queries and get the answers you need.',
        url: '/docs/hogql',
    },
]

export const ProductSurveys = () => {
    const { purplewave, elevenlabs } = useStaticQuery(graphql`
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
            purplewave: mdx(slug: { eq: "customers/purplewave" }) {
                ...ProductCustomerFragment
            }
            elevenlabs: mdx(slug: { eq: "customers/elevenlabs" }) {
                ...ProductCustomerFragment
            }
        }
    `)
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="Surveys - PostHog"
                description="Ask anything with no-code surveys – or use the API for complete control."
                image={`/images/og/surveys.jpg`}
            />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="salmon"
                    icon={<IconMessage />}
                    product={product.capitalized}
                    title='Ask anything with <span class="text-red dark:text-yellow">no-code surveys</span>'
                    description="Build in-app popups with freeform text responses, multiple choice, NPS, ratings, and emoji reactions. Or use the API for complete control."
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
                    <ul className="list-none p-0 grid md:grid-cols-2 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="reached a 25% response rate with surveys"
                            quote="I hate having to switch software. With PostHog, all our data and survey responses were centralized in one platform."
                            customer={purplewave}
                        />
                        <CustomerCard
                            outcome="uses surveys to organize interviews and more"
                            quote="We even use surveys to send a little pop-up to our most active users and ask them to review us on G2."
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
                        <StaticImage placeholder="none" quality={100} src="../hogs/surveys-hog.png" alt="" />
                    </div>
                </div>

                <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                    <div className="flex-grow overflow-auto px-5 md:px-0">
                        <Plans showHeaders={false} showCTA={false} groupsToShow={['surveys']} />
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
                        <div className="mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                            <VsCompetitor
                                title="Reasons a competitor may be best for you (for now...)"
                                image={
                                    <StaticImage
                                        src="../../../images/products/competitors-surveys.png"
                                        className="max-w-[159px]"
                                        placeholder="none"
                                    />
                                }
                            >
                                <ul>
                                    <li>Easy integrations with Stripe, Hubspot, and Zendesk</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>Easy integrations with Stripe, Hubspot, and Zendesk</li>
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

                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20mx-5 md:mx-0">
                        <TutorialCard
                            title="How to set up Stripe reports"
                            description="Analyze gross revenue, customer counts, MRR, churn, and more"
                            url="/tutorials/stripe-reports"
                        />
                        <TutorialCard
                            title="How to set up Hubspot reports"
                            description="Monitor deal counts, lead ratings, and identify leads by pageview behaviours."
                            url="/tutorials/hubspot-reports"
                        />
                        <TutorialCard
                            title="How to set up Zendesk reports"
                            description="Track ticket counts, power users, SLA metrics, and more."
                            url="/tutorials/zendesk-reports"
                        />
                        <TutorialCard
                            title="How to set up Google Adwords reports"
                            description="Report on advertising performance, CAC, and channel distribution."
                            url="/tutorials/adwords-reports"
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
                        menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'data-warehouse').children}
                    />
                </section>

                <section id="team" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                        building the {product.lowercase}.
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

                    <Questions topicIds={[382]} />
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

export default ProductDataWarehouse
