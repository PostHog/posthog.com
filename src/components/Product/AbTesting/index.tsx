import React from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import { IconBrackets, IconGraph, IconFlask, IconToggle, IconPeople, IconRewindPlay } from '@posthog/icons'
import { MultivariateTesting } from 'components/ProductIcons'
import { SplitTesting } from 'components/NotProductIcons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { TutorialCard } from 'components/Products/TutorialCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { Marquee } from 'components/Products/Marquee'
import { graphql, useStaticQuery } from 'gatsby'
import ContentViewer from 'components/ContentViewer'
import AbTesting from 'components/Home/CodeBlocks/ABTesting/index'
import Install from '../Install'
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
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Plans from 'components/Pricing/Plans'

const product = {
    slug: 'ab-testing',
    lowercase: 'A/B testing',
    capitalized: 'A/B Testing',
    freeTier: '1,000,000 requests',
}

const team = 'Feature Success'
const teamSlug = '/handbook/small-teams/feature-success'

const featuresPerRow = 3
const features = [
    {
        title: 'Customizable goals',
        description: 'Conversion funnels or trends, secondary metrics, and range for statistical significance',
        image: <StaticImage src="./images/goals.png" width={428} />,
        border: true,
    },
    {
        title: 'Targeting & exclusion rules',
        description: 'Set criteria for user location, user property, cohort, or group',
        image: <StaticImage src="./images/targeting-ab.png" width={428} />,
        border: true,
    },
    {
        title: 'Recommendations',
        description: 'Automatic suggestions for duration, sample size, and confidence threshold in a winning variant',
        image: <StaticImage src="./images/recommendations.png" width={428} />,
        border: true,
    },
]

const subfeaturesItemCount = 3
const subfeatures = [
    {
        title: 'Built on Feature Flags',
        description: 'All the benefits of feature flags with added functionality around stat-sig experiments',
        icon: <IconToggle />,
    },
    {
        title: 'JSON payloads',
        description: 'Modify website content per-variant without additional deployments',
        icon: <IconBrackets />,
    },
    {
        title: 'Split testing',
        description: 'Automatically split traffic between variants',
        icon: <SplitTesting />,
    },
    {
        title: 'Multivariate testing',
        description: 'Test up to 9 variants against a control',
        icon: <MultivariateTesting />,
    },
    {
        title: 'Dynamic cohort support',
        description: 'Add new users to an experiment automatically by setting a user property',
        icon: <IconPeople />,
    },
]

const questions = [
    {
        question: 'Does this new onboarding flow increase conversion?',
    },
    {
        question: 'How does this affect adoption in Europe?',
    },
    {
        question: 'Will enterprise customers like this new feature?',
    },
]

const faqs = [
    {
        question: 'How do I know what my request volume is?',
        children:
            "The easiest way is to sign up for the Free plan - no credit card required. You'll get an accurate volume projection after just a few days.",
    },
    {
        question: 'Is there a free trial on paid plans?',
        children:
            'We have a generous free tier on every paid plan so you can try out the features before paying any money. (You\'ll need to enter your credit card info, but you can set a billing limit). If you have additional needs, such as enterprise features, please <a href="/contact-sales">get in touch</a>.',
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
        feature: 'Unlimited experiments',
        companies: {
            AmplitudeExperiments: true,
            Optimizely: true,
            VWO: true,
            PostHog: true,
        },
    },
    {
        feature: 'Multivariate experiments',
        companies: {
            AmplitudeExperiments: true,
            Optimizely: true,
            VWO: true,
            PostHog: true,
        },
    },
    {
        feature: 'Secondary goals',
        companies: {
            AmplitudeExperiments: true,
            Optimizely: true,
            VWO: true,
            PostHog: true,
        },
    },
    {
        feature: 'Minimum goals',
        companies: {
            AmplitudeExperiments: true,
            Optimizely: true,
            VWO: false,
            PostHog: true,
        },
    },
    {
        feature: 'Duration prediction',
        companies: {
            AmplitudeExperiments: false,
            Optimizely: false,
            VWO: true,
            PostHog: true,
        },
    },
    {
        feature: 'Cross-domain experiments',
        companies: {
            AmplitudeExperiments: false,
            Optimizely: true,
            VWO: true,
            PostHog: false,
        },
    },
    {
        feature: 'Traffic allocation',
        companies: {
            AmplitudeExperiments: false,
            Optimizely: true,
            VWO: true,
            PostHog: false,
        },
    },
    {
        feature: 'Target by location',
        companies: {
            AmplitudeExperiments: true,
            Optimizely: true,
            VWO: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by cohort',
        companies: {
            Pendo: true,
            Optimizely: true,
            VWO: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by user property',
        companies: {
            Pendo: true,
            Optimizely: true,
            VWO: false,
            PostHog: true,
        },
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconGraph />,
        product: 'Product analytics',
        description: 'Run analysis based on the value of a test, or build a cohort of users from a test variant',
        url: '/product-analytics',
    },
    {
        icon: <IconRewindPlay />,
        product: 'Session replay',
        description:
            'Watch recordings of users in a variant to discover nuances in why they did or didn’t complete the goal',
        url: '/session-replay',
    },
    {
        icon: <IconToggle />,
        product: 'Feature flags',
        description: 'Make changes to the feature flag the experiment uses - including JSON payload for each variant',
        url: '/feature-flags',
    },
]

export const ProductAbTesting = () => {
    const { ycombinator, vendasta, assemblyai } = useStaticQuery(graphql`
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
            vendasta: mdx(slug: { eq: "customers/vendasta" }) {
                ...ProductCustomerFragment
            }
            assemblyai: mdx(slug: { eq: "customers/assemblyai" }) {
                ...ProductCustomerFragment
            }
        }
    `)
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="A/B Testing - PostHog"
                description="Run statistically-significant multivariate tests and robust targeting & exclusion rules."
                image={`/images/og/ab-testing.jpg`}
            />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="purple"
                    icon={<IconFlask />}
                    product={product.capitalized}
                    title='Test changes with <span class="text-red dark:text-yellow">statistical significance</span>'
                    description='A/B tests, multivariate tests, and robust targeting & exclusion rules. Analyze usage with <a href="/product-analytics">Product Analytics</a> and <a href="/session-replay">Session Replay</a>.'
                />

                <div className="text-center">
                    <StaticImage
                        src="./images/screenshot-ab-testing.png"
                        alt="Screenshot of managing an A/B test in PostHog"
                        className="w-full max-w-[1361px]"
                        placeholder="none"
                    />
                </div>

                <section id="customers" className="-mt-20">
                    <ul className="list-none p-0 grid md:grid-cols-3 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="boosted engagement by 40%"
                            quote="Y Combinator uses PostHog's experimentation suite to try new ideas, some of which have led to significant improvements."
                            customer={ycombinator}
                        />
                        <CustomerCard
                            outcome="increased registrations by 30%"
                            quote="This experiment cuts that in half to a 30% drop-off – a 50% improvement without a single user complaining!"
                            customer={vendasta}
                        />
                        <CustomerCard
                            outcome="unthrottled event ingestion from a previous analytics provider, leading to better insights"
                            quote="PostHog, which can do both experiments and analytics in one, was clearly the winner."
                            customer={assemblyai}
                        />
                    </ul>
                </section>
            </div>

            <SmoothScroll className="" />

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
                        <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-md px-8 py-4 mb-2 text-sm">
                            <strong>Note:</strong> A/B Testing and Feature Flags are currently packaged together and
                            share volume limits.
                        </div>
                    </div>
                    <div className="md:w-96">
                        <StaticImage placeholder="none" quality={100} src="../hogs/ab-testing-hog.png" alt="" />
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

            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto`}>
                <div id="posthog-vs">
                    <section>
                        <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                        <Comparison comparison={comparison} columnCount={comparisonColumnCount} />
                    </section>

                    <section className="mb-20">
                        <h3 className="text-center mb-8">So, what's best for you?</h3>
                        <div className="mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                            <VsCompetitor
                                title="Reasons a competitor might be better for you (for now...)"
                                image={
                                    <StaticImage
                                        src="../../../images/products/competitors-ab.png"
                                        className="max-w-[189px]"
                                    />
                                }
                            >
                                <ul>
                                    <li>
                                        No-code experiments or CMS capabilities
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                You'll still need a designer/engineer to create experiments
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        No integration with Google Ads
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                PostHog can't run ad experiments, or target users into an experiment
                                                based on an ad variant engagement.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>
                                        Integration with other PostHog products
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                Attach surveys to experiments or view replays for a test group. Analyze
                                                results beyond your initial hypothesis or goal metric.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>Automated recommendations for sample sizes and runtime</li>
                                    <li>
                                        Automatic significance calculator – to help you figure out the winning variant
                                        as quickly as possible
                                    </li>
                                    <li>
                                        Robust targeting and exclusion options, including cohorts and location
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                Anything you monitor in analytics, you can target in an experiment
                                            </li>
                                        </ul>
                                    </li>
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

                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20 mx-5 md:mx-0">
                        <TutorialCard
                            title="Running experiments on new users"
                            description="Optimizing the initial experience of new users is critical for turning them into existing users. Products have a limited amount of time and attention from new users before they leave and churn."
                            url="/tutorials/new-user-experiments"
                        />
                        <TutorialCard
                            title="How to set up A/B/n testing"
                            description="A/B/n testing is like an A/B test where you compare multiple (n) variants instead of just two. It can be especially useful for small but impactful changes where many options are available like copy, styles, or pages."
                            url="/tutorials/abn-testing"
                        />
                        <TutorialCard
                            title="How to run holdout testing"
                            description="Holdout testing is a type of A/B testing that measures the long term effects of product changes. In holdout testing, a small group of users is not shown your changes for a long period of time, typically weeks or months after your experiment ends."
                            url="/tutorials/holdout-testing"
                        />
                        <TutorialCard
                            title="How to do A/A testing"
                            description="An A/A test is the same as an A/B test except both groups receive the same code or components. Teams run A/A tests to ensure their A/B test service, functionality, and implementation work as expected and provides accurate results."
                            url="/tutorials/aa-testing"
                        />
                    </ul>
                </section>

                <section id="installation" className="mb-20 px-5 md:px-0">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Install &amp; customize</h3>
                    <p className="mt-0 opacity-50 text-center mb-12">
                        Here are some ways you can fine tune how you implement {product.lowercase}.
                    </p>

                    <ContentViewer sticky={false} scrollToTop={false} content={[Install, ...AbTesting]} />
                </section>

                <section id="docs" className="mb-20 px-5 md:px-0">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children[4].children} />
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

                    <Questions topicIds={[45]} />
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

export default ProductAbTesting
