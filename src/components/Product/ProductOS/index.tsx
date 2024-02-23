import React from 'react'
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
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'

const ProductIcon = ({ name, url, color, icon }) => {
    return (
        <Tooltip content={name}>
            <span className="relative">
                <Link to={url} className={`inline-flex bg-${color}/10 text-${color} dark:text-${color} rounded p-2`}>
                    <span
                        className={`w-6 h-6 text-${color} hover:text-${color} dark:text-${color} dark:hover:text-${color}`}
                    >
                        {icon}
                    </span>
                </Link>
            </span>
        </Tooltip>
    )
}

const product = {
    slug: 'product-os',
    lowercase: 'product OS',
    capitalized: 'Product OS',
}

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
    const { fullWidthContent } = useLayoutData()
    return (
        <>
            <SEO
                title="Product OS - PostHog"
                description="The product data infrastructure that powers the PostHog platform"
                image={`/images/og/product-os.jpg`}
            />
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="blue"
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
                <section className="max-w-7xl mx-auto px-5 md:mb-20">
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

                    <div className="flex flex-col-reverse items-center md:flex-row gap-8 mb-20">
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
                        <aside className="shrink-0 md:basis-[500px]">
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
                                    url="/docs/data-warehouse"
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

                <section className="max-w-screen md:max-w-7xl mx-auto px-5 -mt-10 md:mt-0 mb-10 md:mb-20">
                    <div className="grid md:grid-cols-12 md:gap-8 items-center">
                        <div className="order-2 md:order-1 col-span-5">
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
                        <div className="order-1 md:order-2 col-span-7">
                            <StaticImage
                                src="./images/site-widget.png"
                                alt=""
                                className="relative w-[125%] left-[-12.5%] md:left-0 md:w-full max-w-[780px] top-12 md:top-16"
                            />
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-5 md:mb-20">
                    <div className="flex flex-col-reverse items-center md:flex-row gap-8 mb-20">
                        <div className="flex-1">
                            <h2 className="text-4xl">
                                This bit is boring, but <span className="text-red dark:text-yellow">important</span>
                            </h2>
                            <p>
                                We poke fun at a lot of things, but we take security seriously. We're{' '}
                                <b>SOC 2 Type-1 certified, GDPR ready, HIPAA compliant</b>, and we share our security
                                reports publicly. Check <a href="/handbook/company/security">our security docs</a> for
                                more!
                            </p>
                        </div>
                        <aside className="shrink-0 md:basis-[300px] xl:basis-[500px]">
                            <StaticImage src="./images/alert.png" alt="" className="w-full max-w-[262px]" />
                        </aside>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <h2 className="text-4xl mb-2">API</h2>
                    <p className="max-w-2xl mb-2">
                        If your business has bespoke data visualization needs that aren't covered by a PostHog product,
                        you can build your own interface with queries using the API and HogQL.
                    </p>
                    <div className="mb-8">
                        <CallToAction to="/docs/api" type="secondary" size="sm">
                            Explore the API
                        </CallToAction>
                    </div>

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

                <section className="max-w-screen md:max-w-7xl mx-auto px-5 -mt-10 md:mt-0 mb-10 md:mb-20">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl mb-2 relative z-10">Toolbar</h2>
                            <p className="max-w-2xl">
                                If you use PostHog on a website or web app, the Product OS Toolbar can run on your site,
                                letting you:
                            </p>
                            <ul className="mb-6">
                                <li>Visually define events</li>
                                <li>Toggle feature flags on or off</li>
                                <li>See a click map showing what people are clicking</li>
                            </ul>
                            <div>
                                <CallToAction to="/docs/toolbar" type="secondary" size="sm">
                                    Learn more
                                </CallToAction>
                            </div>
                        </div>
                        <div className="order-1 mb-10 md:mb-0 md:order-2 text-center">
                            <StaticImage
                                src="./images/toolbar.png"
                                alt=""
                                className="relative rounded w-[110%] left-[-5%] sm:left-0 md:w-full max-w-[614px] top-12 md:top-16"
                            />
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
            </div>

            <div className="hidden max-w-7xl mx-auto px-5">
                <section id="questions" className="mb-20">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                    <p className="text-center mb-4">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                            View {product.lowercase} questions
                        </CallToAction>
                    </div>

                    <Questions topicIds={[27]} />
                    {/*<Questions topicIds={[27, 38, 46, 36, 25, 51, 26, 54, 47]} /> */}
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

export default ProductOS
