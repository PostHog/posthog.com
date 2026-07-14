import React from 'react'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Link from 'components/Link'
import AskMax from 'components/AskMax'
import ReaderView from 'components/ReaderView'
import Intro from 'components/Docs/Intro'
import { docsMenu } from '../../navs'
import QuickLinks from 'components/QuickLinks'
import { CalloutBox } from 'components/Docs/CalloutBox'

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
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/money_dollars_rich_5a7f1bf7ce.png"
            />

            <CalloutBox icon="IconWarning" title="Revenue analytics is being deprecated" type="caution">
                <p>
                    We'll remove the Revenue analytics dashboard on or after <strong>June 30th, 2026</strong>.
                </p>
                <p>
                    We're not stepping away from revenue in PostHog — we're rethinking how it should work. Instead of
                    maintaining a single, opinionated Revenue analytics dashboard, we're focusing on exposing revenue
                    properties on persons and groups so you can use them everywhere: insights, SQL, and persons/groups
                    profiles. Each use case (ecommerce, SaaS, recurring revenue, one-off, services, multi-tenant) can
                    then build the dashboard it actually needs — or have PostHog AI and agents via our MCP build it for
                    you.
                </p>
            </CalloutBox>

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
                        <Link to="/docs/revenue-analytics/dashboard">
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
