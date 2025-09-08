import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import Intro from 'components/Docs/Intro'
import Link from 'components/Link'
import AskMax from 'components/AskMax'

type RevenueAnalyticsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'revenue analytics')?.children}
                />
            )}

            <AskMax
                quickQuestions={[
                    'Can I track my revenue with PostHog?',
                    'What metrics can I track with revenue analytics?',
                    "How can I see how much money I'm making per country/product/etc?",
                    "What's deferred revenue?",
                ]}
            />

            <section className="mb-12">
                <h3 className="mb-2 text-xl">FAQ</h3>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4">
                    <li>
                        <Link to="/docs/revenue-analytics/deferred-revenue">What's deferred revenue?</Link>
                    </li>
                    <li>
                        <Link to="/docs/revenue-analytics/metrics">
                            What are the key metrics available in Revenue analytics?
                        </Link>
                    </li>
                    <li>
                        <Link to="/docs/revenue-analytics/connecting-revenue-to-customers">
                            How can I see how much money I'm making from my customers?
                        </Link>
                    </li>
                    <li>
                        <Link to="/docs/revenue-analytics/revenue-breakdowns">
                            How can I see how much money I'm making per country/product/etc?
                        </Link>
                    </li>
                    <li>
                        <Link to="/docs/revenue-analytics/common-questions">Other questions</Link>
                    </li>
                </ul>
            </section>

            {/* TODO: Complete/enabled once we've got Revenue Analytics resources */}
            {/* <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Calculating session-based metrics"
                        description="Give an overview, then dive deeper into metrics like average session duration and time on site."
                        url="/tutorials/session-metrics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up cross-domain tracking"
                        description="Track users accurately across multiple websites and domains."
                        url="/tutorials/cross-domain-tracking"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to do cookieless tracking"
                        description="Track users without cookies for compliance and privacy."
                        url="/tutorials/cookieless-tracking"
                    />
                </ul>
            </section> */}
        </>
    )
}

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="Revenue analytics - Docs - PostHog" />

            <PostLayout title="Revenue analytics" hideSurvey hideSidebar>
                <Intro
                    subheader="Getting started"
                    title="Revenue analytics"
                    description="Track and analyze your revenue metrics to understand your business performance and growth."
                    buttonText="Setup guide"
                    buttonLink="/docs/revenue-analytics/getting-started"
                    imageColumnClasses="mt-4 md:-mt-8"
                    imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/revenue_analytics_hog_81ae754b5e.png"
                    imageClasses="max-h-48 md:max-h-64"
                />

                {/* Max AI for Revenue analytics is coming next week, let's keep this commented out for now */}
                {/* <AskMax
                    quickQuestions={[
                        'What's my revenue for last month?',
                        'How's my churn looking like?',
                        'Who's my biggest customer by revenue?',
                    ]}
                /> */}

                <Content />
            </PostLayout>
        </Layout>
    )
}

export default RevenueAnalytics
