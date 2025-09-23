import React from 'react'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Link from 'components/Link'
import AskMax from 'components/AskMax'
import ReaderView from 'components/ReaderView'
import Intro from 'components/Docs/Intro'
import { docsMenu } from '../../navs'
import QuickLinks from 'components/QuickLinks'

type RevenueAnalyticsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Content = ({ quickLinks = true }) => {
    const { compact } = useLayoutData()
    return (
        <>
            <Intro
                subheader="Getting started"
                title="Revenue analytics"
                description="Track and analyze your revenue metrics to understand your business performance and growth."
                buttonText="Setup guide"
                buttonLink="/docs/revenue-analytics/start-here"
                imageColumnClasses="max-w-96"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/revenue_analytics_hog_81ae754b5e.png"
            />

            <AskMax
                quickQuestions={[
                    'Can I track my revenue with PostHog?',
                    'What metrics can I track with revenue analytics?',
                    "How can I see how much money I'm making per country/product/etc?",
                    "What's deferred revenue?",
                ]}
            />

            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'revenue analytics')?.children}
                />
            )}

            <section className="mb-12">
                <h3 className="mb-1 text-xl">FAQ</h3>

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
                        <Link to="/docs/revenue-analytics/connect-to-customers">
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
        </>
    )
}

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ data }) => {
    return (
        <ReaderView>
            <SEO title="Revenue analytics - Documentation - PostHog" />

            <Content />
        </ReaderView>
    )
}

export default RevenueAnalytics
