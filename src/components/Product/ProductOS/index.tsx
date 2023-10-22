import React from 'react'
import Layout from '../../Layout'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import {
    IconAsterisk,
    IconBolt,
    IconBuilding,
    IconCursorClick,
    IconEye,
    IconFlask,
    IconGraph,
    IconMessage,
    IconPeople,
    IconPerson,
    IconPlus,
    IconRevert,
    IconRewindPlay,
    IconServer,
    IconStack,
    IconToggle,
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
import Install from '../Install'
import Tooltip from 'components/Tooltip'
import { TextCard } from 'components/Products/TextCard'

const ProductIcon = ({ name, url, color, icon }) => {
    return (
        <Tooltip content={name}>
            <Link to={url} className={`inline-flex bg-${color}/10 text-${color} dark:text-${color} rounded p-2`}>
                <span className="w-6 h-6 text-${color} hover:text-${color} dark:text-${color} dark:hover:text-${color}">
                    {icon}
                </span>
            </Link>
        </Tooltip>
    )
}

const product = {
    slug: 'product-os',
    lowercase: 'product OS',
    capitalized: 'Product OS',
    freeTier: '15,000 recordings',
}

const team = 'Product Analytics'

const featuresPerRow = 3
const features = [
    {
        title: 'Event timeline',
        description: "History of everything that happened in a user's session",
        image: <StaticImage src="./images/timeline.png" width={420} />,
    },
    {
        title: 'Console logs',
        description: "Debug issues faster by browsing the user's console",
        image: <StaticImage src="./images/console.png" width={420} />,
    },
    {
        title: 'Network monitor',
        description: 'Analyze performance and network calls',
        image: <StaticImage src="./images/network.png" width={420} />,
    },
]

const subfeaturesItemCount = 5
const subfeatures = [
    {
        title: 'Events',
        description: 'Raw activity data like clicks, pageviews, and any custom events you send from your codebase',
        icon: <IconEye />,
    },
    {
        title: 'Actions',
        description: 'Synthetic events that can be retroactively created from interactions with the DOM',
        icon: <IconBolt />,
    },
    {
        title: 'People',
        description:
            'Individual level user activity and properties from both identified (logged in) and anonymous users',
        icon: <IconPeople />,
    },
    {
        title: 'Organizations & groups',
        description: 'Group users by company to analyze usage or activity in aggregate rather than the individual user',
        icon: <IconBuilding />,
    },
    {
        title: 'Annotations',
        description: 'Add context around product updates ship or when website traffic spikes',
        icon: <IconAsterisk />,
    },
]

const questions = [
    {
        question: 'Where do key events happen in my user’s sessions?',
    },
    {
        question: "How do I understand my users' behavior in funnels?",
        url: '#',
    },
    {
        question: 'How do I understand my user journeys?',
        url: '#',
    },
    {
        question: 'How can I understand what my power users are doing?',
        url: '#',
    },
    {
        question: 'How do I figure out how to lower churn?',
        url: '#',
    },
    {
        question: 'What errors are being logged to the console?',
    },
    {
        question: 'How does my user experience differ across regions?',
    },
    {
        question: 'What is a user’s DOM interactive time?',
        url: '#',
    },
    {
        question: 'How fast does my app load?',
    },
    {
        question: 'What is a user’s First Contentful Paint time?',
        url: '#',
    },
    {
        question: 'What is a user’s Page Loaded time?',
        url: '#',
    },
    {
        question: 'How does my user experience differ across devices?',
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
        feature: 'Single-page app support',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'iOS recordings',
        companies: {
            Hotjar: false,
            LogRocket: true,
            Matomo: false,
            FullStory: true,
            PostHog: '<a href="https://github.com/PostHog/posthog/issues/12344">In beta</a>',
        },
    },
    {
        feature: 'Android recordings',
        companies: {
            Hotjar: false,
            LogRocket: true,
            Matomo: false,
            FullStory: true,
            PostHog: '<a href="https://github.com/PostHog/posthog/issues/13267">On the roadmap</a>',
        },
    },
    {
        feature: 'Identity detection',
        companies: {
            Hotjar: false,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target recordings by URL',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Target by sample size',
        companies: {
            Hotjar: true,
            LogRocket: false,
            Matomo: true,
            FullStory: false,
            PostHog: true,
        },
    },
    {
        feature: 'Filter recordings by user or event',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Rage-click detection',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: false,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Privacy masking for sensitive content',
        companies: {
            Hotjar: true,
            LogRocket: true,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Export recordings',
        companies: {
            Hotjar: true,
            LogRocket: false,
            Matomo: true,
            FullStory: true,
            PostHog: true,
        },
    },
    {
        feature: 'Recording retention policy',
        companies: {
            Hotjar: '12 months',
            LogRocket: '1 month',
            Matomo: '24 months',
            FullStory: '1 month',
            PostHog: 'Up to 3 months',
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

export const ProductOS = () => {
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
                    icon={<IconStack />}
                    product={product.capitalized}
                    title="Product data infrastructure"
                    description="Product OS is the foundation that all PostHog products are built on. You have access to all PostHog data with the API."
                />

                <div className="text-center mb-12">
                    <StaticImage src="./images/product-os.png" alt="" className="w-full max-w-[423px]" />
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

            {/* <SmoothScroll /> */}

            <div id="features">
                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    {/*
                    <h3 className="text-3xl text-center mb-8">Features</h3>
                    <ul className={`list-none p-0 grid md:grid-cols-${featuresPerRow} gap-12 mb-8`}>
                        {features.map((feature, index) => {
                        return <Feature {...feature} key={index} />
                        })}
                    </ul>
                    */}

                    <div className="mb-16">
                        <h2 className="text-4xl text-center mb-8">
                            A single <span className="text-red dark:text-yellow">home</span> for all product usage data
                        </h2>
                        <ul className={`list-none p-0 grid md:grid-cols-${subfeaturesItemCount} gap-4`}>
                            {subfeatures.map((subfeature, index) => {
                                return <Subfeature {...subfeature} key={index} />
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col-reverse items-center md:flex-row md:gap-8 mb-20">
                        <div className="flex-1">
                            <h2 className="text-4xl">
                                A unified way to <span className="text-red dark:text-yellow">query</span> product usage
                                data
                            </h2>
                            <p>
                                We created <Link to="/docs/hogql">HogQL</Link>, a translation layer over ClickHouse SQL.
                                (You can use most ClickHouse features in HogQL, including JOINs and subqueries.)
                            </p>

                            <p>
                                Everything you see in PostHog relies on HogQL queries. If you aren't able to run a query
                                in a PostHog UI, just enter HogQL mode to write the exact query you need.
                            </p>

                            <p>You can also query directly from our data warehouse (powered by ClickHouse).</p>
                        </div>
                        <aside className="shrink-0 basis-[500px]">
                            <StaticImage src="./images/sql-hog.png" alt="" className="w-full max-w-[562px]" />
                        </aside>
                    </div>

                    <div className="mb-20">
                        <div className="flex gap-8 flex-col-reverse md:flex-row">
                            <div className="flex-1">
                                <h2 className="text-4xl">
                                    One platform, <span className="text-red dark:text-yellow">loads of products</span>
                                </h2>
                                <p className="max-w-2xl">
                                    PostHog offers 7+ products in one (and counting).{' '}
                                    <strong>Use only what you want. But...</strong> if you want to try a new PostHog
                                    product, there are benefits of using Product OS as your platform for all your
                                    product data.
                                </p>
                            </div>
                            <div className="shrink-0 flex gap-2">
                                <ProductIcon
                                    name="Product analytics"
                                    url="/product-analytics"
                                    color="blue"
                                    icon={<IconGraph />}
                                />
                                <ProductIcon
                                    name="Session replay"
                                    url="/session-replay"
                                    color="yellow"
                                    icon={<IconRewindPlay />}
                                />
                                <ProductIcon
                                    name="Feature flags"
                                    url="/feature-flags"
                                    color="seagreen"
                                    icon={<IconToggle />}
                                />
                                <ProductIcon name="A/B testing" url="/ab-testing" color="purple" icon={<IconFlask />} />
                                <ProductIcon name="CDP" url="/cdp" color="yellow" icon={<IconPerson />} />
                                <ProductIcon
                                    name="Data warehouse"
                                    url="/data-warehouse"
                                    color="seagreen"
                                    icon={<IconServer />}
                                />
                                <ProductIcon name="Surveys" url="/surveys" color="salmon" icon={<IconMessage />} />
                                <ProductIcon name="Browse apps" url="/apps" color="blue" icon={<IconPlus />} />
                            </div>
                        </div>
                        <ul className={`list-none p-0 grid md:grid-cols-2 gap-8`}>
                            <Subfeature
                                title="Retroactive data with autocapture"
                                description="If you’re running a web app with <a href='/docs/product-analytics/autocapture'>autocapture</a> enabled, some PostHog products can backfill historical data, meaning you can get value from a new product without waiting for data to trickle in."
                                icon={<IconRevert />}
                            />
                            <Subfeature
                                title="One-click setup with no new account provisioning"
                                description="Trying a new PostHog product doesn't require new code to be deployed. You don't need to invite your team since they already have PostHog accounts."
                                icon={<IconCursorClick />}
                            />
                        </ul>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div>
                            <h2 className="text-4xl mb-2">Site widgets</h2>
                            <p className="max-w-2xl">
                                Install the PostHog.js snippet on your website to get access to a growing library of
                                mini-apps that can be injected into your website's front end.
                            </p>

                            <p>
                                This includes utilities like downtime banners, pop-up survey widgets, geo-location
                                notices, and more. (It even powers our own Surveys product.)
                            </p>

                            <p>
                                Since you can toggle site apps on from within PostHog, deploying a new site app doesn't
                                require a code deployment.
                            </p>

                            <p>
                                This example uses Notification Bar to display a banner. It can be targeted to specific
                                users or groups using feature flags.
                            </p>
                        </div>
                        <div>
                            <StaticImage src="./images/site-widget.png" alt="" className="w-full max-w-[780px]" />
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <h2 className="text-4xl mb-2">API</h2>
                    <p className="max-w-2xl">
                        If your business has bespoke data visualization needs that aren't covered by a PostHog product,
                        you can build your own interface with queries using the API and HogQL.
                    </p>
                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20">
                        <TextCard
                            title="Data transformations"
                            description="Capture the live event stream and do something with it - like munge PII or add geolocation."
                        />
                        <TextCard
                            title="Data out"
                            description="Access data from dashboards or metrics from saved insights."
                        />
                        <TextCard
                            title="Data augmentation"
                            description="Augment event data coming into PostHog with more context and detail."
                        />
                        <TextCard
                            title="Reverse ETL"
                            description="Update and feed context to external products like Hubspot or Salesforce."
                        />
                        <TextCard
                            title="Build apps or pipelines"
                            description="Create your own interface that uses PostHog event and customer data."
                        />
                        <TextCard
                            title="Marketing or product automation"
                            description="Activate drip campaign or a push notification based on customer activity."
                        />
                        <TextCard
                            title="Customized CDP"
                            description="Create a singular customer view by combining event and customer data in one place."
                        />
                    </ul>
                </section>

                <section className="max-w-7xl mx-auto px-5">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div>
                            <h2 className="text-4xl mb-2">Toolbar</h2>
                            <p className="max-w-2xl">
                                If you use PostHog on a website or web app, the Product OS Toolbar can run on your site,
                                letting you:
                            </p>
                            <ul>
                                <li>Visually define events</li>
                                <li>Toggle feature flags on or off</li>
                                <li>See a click map showing what people are clicking</li>
                            </ul>
                        </div>
                        <div>
                            <StaticImage src="./images/toolbar.png" alt="" className="w-full max-w-[614px]" />
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <h2 className="text-4xl mb-2">But wait, there's more...</h2>
                    <p>
                        Here are a few more features of Product OS. For more details about how it works,{' '}
                        <Link to="/docs">visit the docs</Link>.
                    </p>
                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20">
                        <TextCard
                            title="Autocapture"
                            description="Add PostHog.js to your website or web app to track all event data and retroactively define events."
                        />
                        <TextCard
                            title="Webhooks"
                            description="Fire a hook (to any service that supports webhooks) when any product activity takes place - useful for getting event-related alerts in Slack or Teams."
                        />
                        <TextCard
                            title="Warehouse sync"
                            description="Sync data with Segment or Rudderstack – or use PostHog's built in warehouse."
                        />
                        <TextCard
                            title="Reverse proxy"
                            description="Send events to PostHog Cloud using your own domain."
                        />
                    </ul>
                </section>

                <section className="bg-accent dark:bg-accent-dark">
                    <Marquee product={product.capitalized}>
                        {questions.map((question, index) => {
                            return <Question {...question} key={index} />
                        })}
                    </Marquee>
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
                    <PlanComparison showHeaders={false} showCTA={false} groupsToShow={['session_replay']} />

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
                                        You need heatmaps or scrollmaps
                                        <ul className="pl-6">
                                            <li className="text-sm">PostHog is currently limited to clickmaps</li>
                                        </ul>
                                    </li>
                                    <li>Error tracking and alerting</li>
                                    <li>
                                        Mobile SDKs (in progress...)
                                        <ul className="pl-6">
                                            <li className="text-sm">
                                                <Link to="https://github.com/PostHog/posthog/issues/13269" external>
                                                    React Native
                                                </Link>{' '}
                                                |&nbsp;
                                                <Link to="https://github.com/PostHog/posthog/issues/12344" external>
                                                    iOS
                                                </Link>{' '}
                                                |&nbsp;
                                                <Link to="https://github.com/PostHog/posthog/issues/13267" external>
                                                    Android
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>
                                        Interlinking with feature flags and insights
                                        <ul className="pl-6">
                                            <li className="text-sm">Jump between them easily</li>
                                        </ul>
                                    </li>
                                    <li>Collaboration, sharing, and embedding exporting recordings</li>
                                    <li>No limits on how many recordings captured</li>
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

                    <ContentViewer sticky={false} scrollToTop={false} content={[Install, ...SessionReplay]} />
                </section>

                <section id="docs" className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks menu={docsMenu.children[2].children} />
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

export default ProductOS
