import React from 'react'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Link from 'components/Link'
import AskMax from 'components/AskMax'
import ReaderView from 'components/ReaderView'
import Intro from 'components/Docs/Intro'
import { docsMenu } from '../../navs'
import QuickLinks from 'components/QuickLinks'

type CustomerAnalyticsProps = {
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
                title="Customer Analytics"
                description="Understand your customers without building dashboards from scratch. Track active users, signups, conversions, and engagement—the metrics that matter for product-market fit."
                buttonText="Setup guide"
                buttonLink="/docs/customer-analytics/start-here"
                imageColumnClasses="max-w-96"
                imageUrl="[TODO: Customer Analytics hero image]"
            />
            <section className="mb-4">
                <h2 className="mb-4">Overview</h2>
                <div>
                    <p>
                        Customer Analytics enables users to understand their customer's demographics and individual
                        behavior, providing good defaults and improved data visualizations.
                    </p>
                    <p>The product has two main interfaces: the dashboard and the individual customer profiles.</p>
                    <ul>
                        <li>
                            The dashboard shows the metrics you should care about when building your product with
                            minimal configuration, enabling a high-level understanding of how well things are going.
                        </li>
                        <li>
                            The individual customer profile brings together data from other PostHog products in a single
                            pane of glass, enabling in-depth analysis of a specific person or group behavior.
                            <ul>
                                <li>
                                    The profiles are two-fold: everyone has person profiles. Users with group analytics
                                    add-on will also have group profiles.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        It is built for founders and engineers of early stage startups that are building towards
                        product-market fit (PMF). At this stage folks usually:
                    </p>
                    <ul>
                        <li>Have little time to spend building dashboards. The focus is on building the product.</li>
                        <li>Need to know customers and be in contact with them.</li>
                        <li>Are (or should be) bsessed with finding PMF.</li>
                    </ul>
                </div>
            </section>
            <AskMax
                quickQuestions={[
                    'How do I track active users?',
                    'How do I set up signup tracking?',
                    'How do I see support tickets for a customer?',
                    'How do I create a usage metric?',
                ]}
            />

            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'customer analytics')?.children}
                />
            )}

            <section className="mb-12">
                <h3 className="mb-1 text-xl">FAQ</h3>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4">
                    <li>
                        <Link to="/docs/customer-analytics/dashboard">
                            What metrics are available in the dashboard?
                        </Link>
                    </li>
                    <li>
                        <Link to="/docs/customer-analytics/customer-feeds">
                            What data appears in customer profiles?
                        </Link>
                    </li>
                    <li>
                        <Link to="/docs/customer-analytics/usage-metrics">How do I create usage metrics?</Link>
                    </li>
                    <li>
                        <Link to="/docs/customer-analytics/faq">Other questions</Link>
                    </li>
                </ul>
            </section>
        </>
    )
}

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ data }) => {
    return (
        <ReaderView>
            <SEO title="Customer Analytics - Documentation - PostHog" />

            <Content />
        </ReaderView>
    )
}

export default CustomerAnalytics
