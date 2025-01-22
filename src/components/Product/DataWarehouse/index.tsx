import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import { IconDatabase, IconGraph, IconHogQL, IconClock, IconToggle, IconDecisionTree } from '@posthog/icons'
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
        title: 'Sync from Stripe',
        description: 'Combine financial and product data to see how usage turns into growth.',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/stripe.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Sync from Hubspot',
        description: 'Bring your CRM into the mix and track your sales funnel directly in PostHog.',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/hubspot.png"
                width={428}
                height={312}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Sync from Zendesk',
        description: 'See how ticket volumes and SLA breaches impact sign-ups and churn.',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/zendesk.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: 'Sync from anywhere',
        description: 'Adwords? Salesforce? Grab anything you want using custom sources.',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/DataWarehouse/images/custom.png"
                width={428}
                height={312}
                placeholder="none"
            />
        ),
    },
]

const subfeaturesItemCount = 4
const subfeatures = [
    {
        title: 'Link multiple sources',
        description: 'Add joins to link tables together and connect run advanced queries',
        icon: <IconDecisionTree />,
    },
    {
        title: 'Query with HogQL',
        description: 'Use our take on SQL to interrogate data and build custom queries',
        icon: <IconHogQL />,
    },
    {
        title: 'Save queries as views',
        description: 'Save time by saving visualized data as tables, graphcs, and more',
        icon: <IconGraph />,
    },
    {
        title: 'Custom sync periods',
        description: 'Decide whether to sync data sources daily, weekly, or monthly',
        icon: <IconClock />,
    },
]

const questions = [
    {
        question: 'How do specific user behaviours correlate to MRR?',
        url: '/tutorials/stripe-reports',
    },
    {
        question: 'How is user retention affected by SLA breaches in Zendesk?',
        url: '/tutorials/zendesk-reports',
    },
    {
        question: 'How are inbound leads using my product?',
        url: '/tutorials/hubspot-reports#usage-by-lead',
    },
    {
        question: 'How does predicted revenue compare to my actual revenue?',
        url: '/tutorials/hubspot-reports#getting-revenue-from-closed-deals-by-joining-with-stripe',
    },
    {
        question: 'How much revenue am I churning each month?',
        url: '/tutorials/stripe-reports#revenue-churn',
    },
    {
        question: 'Who are my power users, and how do they use my product?',
        url: '/tutorials/stripe-reports#usage-by-top-customers',
    },
]

const faqs = [
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

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconGraph />,
        product: 'Product analytics',
        color: 'blue',
        description: 'Analyze data from any source independently, or alongside product data.',
        url: '/product-analytics',
    },
    {
        icon: <IconToggle />,
        product: 'Feature flags',
        color: 'seagreen',
        description: 'Use synced data to toggle feature flags, trigger A/B experiments, and more.',
        url: '/feature-flags',
    },
    {
        icon: <IconHogQL />,
        product: 'HogQL',
        color: 'black dark:text-white',
        description: 'Use our take on SQL to create entirely custom queries and get the answers you need.',
        url: '/docs/hogql',
    },
]

export const ProductDataWarehouse = () => {
    const { headshotpro, webshare } = useStaticQuery(graphql`
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
            headshotpro: mdx(slug: { eq: "customers/headshot-pro" }) {
                ...ProductCustomerFragment
            }
            webshare: mdx(slug: { eq: "customers/webshare" }) {
                ...ProductCustomerFragment
            }
        }
    `)
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState(false)
    return (
        <>
            <SEO
                title="Data Warehouse - PostHog"
                description="Unify and query data from any source and analyze it alongside your product data."
                image={`/images/og/data-warehouse.jpg`}
            />
            <SideModal open={!!activeProfile} setOpen={setActiveProfile}>
                {activeProfile && <Profile profile={{ ...activeProfile }} />}
            </SideModal>
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="lilac"
                    icon={<IconDatabase />}
                    product={product.capitalized}
                    title='All your data <span class="text-red dark:text-yellow">in one place</span>'
                    description="Unify and query data from any source and analyze it alongside your product data."
                />

                <div className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-data-warehouse.png"
                        alt="Screenshot of the PostHog data warehouse"
                        className="w-full max-w-[1440px]"
                        placeholder="none"
                    />
                </div>
                <section id="customers" className="-mt-48 pt-36">
                    <ul className="list-none p-0 grid md:grid-cols-2 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="analyzes Google Adwords data in PostHog"
                            quote="I needed one source of truth for both marketing and developers to share."
                            customer={headshotpro}
                        />
                        <CustomerCard
                            outcome="syncs Intercom messages and customer contacts"
                            quote="PostHog is the single source of truth for us. We've put everything in one place."
                            customer={webshare}
                        />
                    </ul>
                </section>
            </div>

            <SmoothScroll exclude={['PostHog vs...', 'Installation']} />

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
                    <Marquee product={product.capitalized} shortFade>
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
                        <p className="">Use the {product.lowercase} for free up to 1 million rows/mo.</p>
                    </div>
                    <div className="md:w-96 md:text-right mb-8 md:mb-0 -mt-8">
                        <CloudinaryImage
                            alt="Just another hedgehog"
                            placeholder="blurred"
                            quality={100}
                            className="w-full max-w-[140px]"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png"
                        />
                    </div>
                </div>

                <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                    <div className="flex-grow overflow-auto px-5 md:px-0 mb-8 md:mb-0">
                        <Plans showHeaders={false} showCTA={false} groupsToShow={['data_warehouse']} />
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
                    </ul>
                </div>
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

            <section
                id="docs"
                className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}
            >
                <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                <p className="mt-0 text-opacity-70 text-center">
                    Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                </p>
                <DocLinks
                    menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'data warehouse').children}
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

            <section
                id="roadmap"
                className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}
            >
                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-0`}>
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
                </div>
            </section>

            <section
                id="questions"
                className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}
            >
                <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-0`}>
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                    <p className="text-center mb-4">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                            View {product.lowercase} questions
                        </CallToAction>
                    </div>
                </div>

                <Questions topicIds={[382]} />
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
        </>
    )
}

export default ProductDataWarehouse
