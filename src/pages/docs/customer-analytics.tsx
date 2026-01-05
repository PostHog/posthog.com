import React from 'react'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Link from 'components/Link'
import AskMax from 'components/AskMax'
import ReaderView from 'components/ReaderView'
import Intro from 'components/Docs/Intro'
import { docsMenu } from '../../navs'
import QuickLinks from 'components/QuickLinks'
import OSTable from 'components/OSTable'
import {
    IconCheck,
    IconDatabase,
    IconLlmAnalytics,
    IconLogomark,
    IconRewindPlay,
    IconToggle,
    IconTrends,
    IconUser,
} from '@posthog/icons'
import Card from 'components/Card'
import ResourceItem from 'components/Docs/ResourceItem'
import CustomerAnalyticsBetaWarning from '../../../contents/docs/customer-analytics/_snippets/customer-analytics-beta-warning.mdx'

const phFeatures = [
    {
        title: 'Session replay',
        description:
            'Watch session recordings of users to understand how they interact with your product and where to improve or double down.',
        icon: <IconRewindPlay className="text-yellow" />,
        url: '/docs/session-replay',
    },
    {
        title: 'Product analytics',
        description: 'Deepen your analysis building custom insights and dashboards.',
        icon: <IconTrends className="text-blue" />,
        url: '/docs/product-analytics',
    },
    {
        title: 'Feature flags',
        description: 'See what feature flags are active for each customer.',
        icon: <IconToggle className="text-seagreen" />,
        url: '/docs/feature-flags',
    },
    {
        title: 'LLM analytics',
        description: 'See how your users are using your LLMs and if they are satisfied with the results.',
        icon: <IconLlmAnalytics className="text-[#681291]" />,
        url: '/docs/llm-analytics',
    },
    {
        title: 'Data warehouse',
        description:
            'Join data warehhouse tables with your person or groups tables to have additional fields in customer lists.',
        icon: <IconDatabase className="text-purple" />,
        url: '/docs/data-warehouse',
    },
]

const customerAnalyticsFeatures = [
    { text: 'Dashboard with pre-built insights', url: '/docs/customer-analytics/dashboard-insights' },
    { text: 'Usage metrics', url: '/docs/customer-analytics/customer-profiles' },
    { text: 'Session feed in person profiles', url: '/docs/customer-analytics/customer-profiles' },
    { text: 'Error tracking issues in customer profiles', url: '/docs/customer-analytics/customer-profiles' },
    { text: 'LLM traces in customer profiles', url: '/docs/customer-analytics/customer-profiles' },
    { text: 'Zendesk tickets in customer profiles', url: '/docs/customer-analytics/customer-profiles' },
]

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
                description="Understand your customers without building dashboards from scratch. Track active users, signups, conversions, and engagement."
                buttonText="Setup guide"
                buttonLink="/docs/customer-analytics/start-here"
                imageClasses="max-h-48 md:max-h-64"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hog_crm_40195fd72f.png"
            />
            <section className="mb-4">
                <h2 className="mb-4">Overview</h2>
                <CustomerAnalyticsBetaWarning />
                <div>
                    <p>
                        Customer Analytics enables founders and engineers to understand their customer's demographics
                        and individual behavior, providing good defaults and improved data visualizations.
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
                        <li>Are (or should be) obsessed with finding PMF.</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2 className="mb-4">Features and data</h2>
                <OSTable
                    columns={[
                        { name: '', width: 'auto', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '80px', align: 'center' },
                    ]}
                    rows={customerAnalyticsFeatures.reduce((rows, feature, i) => {
                        rows.push({ cells: [] as any[] })
                        const row = rows[rows.length - 1]
                        row.cells.push(
                            { content: <a href={feature.url}>{feature.text}</a> },
                            { content: <IconCheck className="h-5 text-green" /> }
                        )
                        return rows
                    }, [] as any[])}
                    size="sm"
                    width="full"
                />
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Connected with PostHog ecosystem</h2>
                <div className="flex flex-col gap-4 lg:grid @lg:grid-cols-3">
                    {phFeatures.map((feature, index) => (
                        <Card key={index} url={feature.url} className="bg-accent dark:bg-accent-dark not-prose">
                            <div key="content" className="px-4 py-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 flex-shrink-0">{feature.icon}</div>
                                    <h4 className="font-semibold my-0 flex-1">{feature.title}</h4>
                                </div>
                                <p className="text-secondary text-sm">{feature.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Next steps</h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid grid-cols-1 @md:grid-cols-3">
                    <ResourceItem
                        type="Getting started"
                        title="Start here"
                        description="How to get the most out of customer analytics"
                        url="/docs/customer-analytics/start-here"
                    />
                    <ResourceItem
                        type="Concepts"
                        title="Customer profiles"
                        description="Deep dive in your customers usage and behavior"
                        url="/docs/customer-analytics/customer-profiles"
                    />
                    <ResourceItem
                        type="Concepts"
                        title="Usage metrics"
                        description="Learn how you can create personalized metrics to understand customer usage at a glance"
                        url="/docs/customer-analytics/usage-metrics"
                    />
                </ul>
            </section>

            <AskMax
                quickQuestions={[
                    'How do I track active users?',
                    'How do I set up signup tracking?',
                    'How do I see support tickets for a customer?',
                    'How do I create a usage metric?',
                ]}
            />
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
