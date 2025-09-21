import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconCheck, IconLogomark } from '@posthog/icons'
import InstallationPlatforms from '../../../../contents/docs/error-tracking/installation/_snippets/installation-platforms'
import Pricing from '../../../components/Pricing/PricingCalculator/SingleProduct'
import { IconRewindPlay, IconTrends, IconToggle, IconUser, IconLlmAnalytics, IconDatabase } from '@posthog/icons'
import Card from 'components/Card'
import Link from 'components/Link'
import ErrorTrackingDiagram from './error-tracking-diagram'

const maxWidth = 'max-w-4xl'

const phFeatures = [
    {
        title: 'Session replay',
        description: 'Watch session recordings of users for more context and to help reproduce issues.',
        icon: <IconRewindPlay className="text-yellow" />,
        url: '/docs/session-replay',
    },
    {
        title: 'Product analytics',
        description:
            'Graph exception events and create trends to understand how exceptions impact conversion and revenue.',
        icon: <IconTrends className="text-blue" />,
        url: '/docs/product-analytics',
    },
    {
        title: 'Feature flags',
        description: 'Safely roll out fixes to users affected by an issue.',
        icon: <IconToggle className="text-seagreen" />,
        url: '/docs/feature-flags',
    },
    {
        title: 'Person profiles',
        description: 'See all exception events for specific users in their event history log.',
        icon: <IconUser className="text-red" />,
        url: '/docs/product-analytics/identify',
    },
    {
        title: 'LLM analytics',
        description: 'Debug LLM calls and AI generations with full conversation traces and built-in error tracking.',
        icon: <IconLlmAnalytics className="text-[#681291]" />,
        url: '/docs/llm-analytics',
    },
    {
        title: 'Data warehouse',
        description: 'Write SQL to query exception events and product data directly from the data warehouse.',
        icon: <IconDatabase className="text-purple" />,
        url: '/docs/data-warehouse',
    },
]

const errorTrackingFeatures = [
    { text: 'Capture exceptions', url: '/docs/error-tracking/capture' },
    { text: 'Autocapture', url: '/docs/error-tracking/capture#automatic-exception-capture' },
    { text: 'Stack traces', url: '/docs/error-tracking/stack-traces' },
    { text: 'Custom error grouping', url: '/docs/error-tracking/grouping-issues' },
    { text: 'Issue management', url: '/docs/error-tracking/managing-issues' },
    { text: 'Team assignments', url: '/docs/error-tracking/assigning-issues' },
    { text: 'MCP integration', url: '/docs/error-tracking/debugging-with-mcp' },
    { text: 'Fix with AI', url: '/docs/error-tracking/fix-with-ai-prompts' },
    { text: 'Alerts', url: '/docs/error-tracking/alerts' },
    { text: 'Integrations with Linear and GitHub', url: '/docs/error-tracking/external-tracking' },
]

export const Content = () => {
    return (
        <>
            <section className={`mb-4 mx-auto ${maxWidth}`}>
                <h2 className="mb-4">Overview</h2>
                <div>
                    <p>
                        Error tracking enables you to capture, monitor, and resolve exceptions within your app, so you
                        can ship quickly and confidently. Built on our{' '}
                        <Link to="/customer-data-infrastructure">customer data infrastructure</Link>, PostHog error
                        tracking connects issues to user data and product context for faster, more effective debugging.
                    </p>
                    <p>It's particualrly useful for engineers who:</p>
                    <ul>
                        <li>Move fast and ship code often</li>
                        <li>Work on full-stack, product-led engineering teams</li>
                        <li>Prefer fewer tools within their development workflows</li>
                        <li>Need to fully understand how errors impact their users and product flows</li>
                    </ul>
                </div>

                <div className="mt-8 -mx-4 @xl:-mx-8">
                    <ScrollArea fullWidth>
                        <div className="px-4 @xl:px-8">
                            <ErrorTrackingDiagram className={`max-h-[28rem] min-h-[22rem] fill-primary`} />
                        </div>
                    </ScrollArea>
                </div>
            </section>

            <section className={`mb-8 mx-auto ${maxWidth}`}>
                <h2 className="mb-4 mt-0">SDKs and frameworks</h2>
                <div className="mt-4">
                    <InstallationPlatforms columns={3} />
                </div>
            </section>

            <section className={`mb-8 mx-auto ${maxWidth}`}>
                <h2 className="mb-4">All the features you expect</h2>
                <OSTable
                    columns={[
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '80px', align: 'center' },
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '80px', align: 'center' },
                    ]}
                    rows={errorTrackingFeatures.reduce((rows, feature, i) => {
                        if (i % 2 === 0) rows.push({ cells: [] as any[] })
                        const row = rows[rows.length - 1]
                        row.cells.push(
                            { content: <a href={feature.url}>{feature.text}</a> },
                            { content: <IconCheck className="h-5 text-green" /> }
                        )
                        return rows
                    }, [] as any[])}
                    size="sm"
                />
            </section>

            <section className={`mb-8 mx-auto ${maxWidth}`}>
                <h2 className="mb-4">But 10x better in the PostHog ecosystem</h2>
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

            <section className={`mb-8 mx-auto ${maxWidth}`}>
                <h2 className="mb-4">Pricing</h2>
                <p>
                    PostHog error tracking comes with a generous free tier and transparent, usage-based pricing. Our
                    large free tier means more than 90% of companies <em>use PostHog for free</em>.
                </p>
                <p>
                    No credit card is required to get started. You can also set billing limits to avoid any surprise
                    charges.
                </p>
                <div className="px-8 rounded-md border-primary border">
                    <Pricing productType="error_tracking" />
                </div>

                <p>
                    See our <a href="/pricing">pricing page</a> for more details.
                </p>
            </section>

            <section className={`mb-8 mx-auto ${maxWidth}`}>
                <h2 className="mb-4">Next steps</h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid grid-cols-1 @md:grid-cols-3">
                    <ResourceItem
                        type="Getting started"
                        title="Start here"
                        description="A high-level overview of the integration process for error tracking"
                        url="/docs/error-tracking/start-here"
                    />
                    <ResourceItem
                        type="Quickstart"
                        title="Set up Next.js error tracking"
                        description="Install and configure error tracking in your Next.js app"
                        url="/docs/error-tracking/installation/nextjs"
                    />
                    <ResourceItem
                        type="Concepts"
                        title="Issues and exceptions"
                        description="Learn how to manage and track issues and exceptions"
                        url="/docs/error-tracking/issues-and-exceptions"
                    />
                </ul>
            </section>
        </>
    )
}

const ErrorTracking: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Error tracking - Docs - PostHog" />

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <Intro
                    subheader="Getting started"
                    title="Error tracking"
                    description="Track and monitor errors and exceptions in your code."
                    buttonText="Installation guide"
                    buttonLink="/docs/error-tracking/start-here"
                    imageColumnClasses="mt-4 md:-mt-8"
                    imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/error_f2df714c47.png"
                    imageClasses="max-h-48 md:max-h-64"
                />
            </section>

            <Content />

            <div className={`mx-auto ${maxWidth}`}>
                <AskMax
                    className=""
                    quickQuestions={[
                        'How do I see what the most common errors are?',
                        'How do I custom error groups?',
                        'How do I assign someone an error?',
                    ]}
                />
            </div>
        </ReaderView>
    )
}

export default ErrorTracking
