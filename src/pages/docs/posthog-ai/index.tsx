import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconCheck, IconLogomark } from '@posthog/icons'
import { IconRewindPlay, IconTrends, IconToggle, IconUser, IconLlmAnalytics, IconDatabase } from '@posthog/icons'
import Card from 'components/Card'
import Link from 'components/Link'
import ErrorTrackingDiagram from './error-tracking-diagram'

const phFeatures = [
    {
        title: 'Session replay',
        description: 'Use PostHog AI to create playlists of session replays.',
        icon: <IconRewindPlay className="text-yellow" />,
        url: '/docs/session-replay',
    },
    {
        title: 'Product analytics',
        description: 'Ask PostHog AI to create and edit insights and dashboards.',
        icon: <IconTrends className="text-blue" />,
        url: '/docs/product-analytics',
    },
    {
        title: 'Feature flags',
        description: 'PostHog AI can create feature flags.',
        icon: <IconToggle className="text-seagreen" />,
        url: '/docs/feature-flags',
    },
    {
        title: 'Surveys',
        description: 'Use PostHog AI to create surveys.',
        icon: <IconUser className="text-red" />,
        url: '/docs/product-analytics/identify',
    },
    {
        title: 'LLM analytics',
        description: 'Use PostHog AI to debug LLM calls and AI generations.',
        icon: <IconLlmAnalytics className="text-[#681291]" />,
        url: '/docs/llm-analytics',
    },
    {
        title: 'Data warehouse',
        description: 'Use PostHog AI to write SQL to query product data directly from the data warehouse.',
        icon: <IconDatabase className="text-purple" />,
        url: '/docs/data-warehouse',
    },
]

const errorTrackingFeatures = [
    { text: 'Create dashboards', url: '/docs/error-tracking/capture' },
    { text: 'Create insights', url: '/docs/error-tracking/capture#automatic-exception-capture' },
    { text: 'Deep research', url: '/docs/error-tracking/stack-traces' },
    { text: 'Summarize session replays', url: '/docs/error-tracking/grouping-issues' },
    { text: 'Edit filters', url: '/docs/error-tracking/managing-issues' },
    { text: 'Navigate PostHog UI', url: '/docs/error-tracking/assigning-issues' },
    { text: 'Context', url: '/docs/error-tracking/alerts' },
    { text: 'Configurate memory', url: '/docs/error-tracking/external-tracking' },
    { text: 'Access to event schema', url: '/docs/error-tracking/debugging-with-mcp' },
    { text: 'Write SQL', url: '/docs/error-tracking/fix-with-ai-prompts' },
]

export const Content = () => {
    return (
        <>
            <section className="mb-4">
                <h2 className="mb-4">Overview</h2>
                <div>
                    <p>
                        PostHog AI is a product analyst and assistant that lives inside of the PostHog app. It powers a
                        range of features and produts, including session replays, product analytics, feature flags, and
                        more. It's able to leverage the full power of the PostHog platform to answer questions and help
                        you get things done.
                    </p>
                    <p>PostHog AI can:</p>
                    <ul>
                        <li>Put on a data analyst hat and explore your PostHog data in depth</li>
                        <li>Create dashboards and generate PostHog data visualizations, such as insights</li>
                        <li>Interact natively with the PostHog UI, for example by editing filters</li>
                        <li>Generate complex PostHog SQL queries</li>
                        <li>Answer questions from PostHog's documentation</li>
                        <li>Create surveys using natural language</li>
                        <li>Write Hog functions to power your realtime destinations</li>
                    </ul>
                </div>

                <div className="mt-8 -mx-4 @xl:-mx-8">
                    <ScrollArea fullWidth>
                        <div className="px-4 @xl:px-8">
                            <ErrorTrackingDiagram
                                className={`max-h-[28rem] min-h-[22rem] fill-black dark:fill-white`}
                            />
                        </div>
                    </ScrollArea>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Capable of doing a lot</h2>
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

            <section className="mb-8">
                <h2 className="mb-4">Powers the PostHog ecosystem</h2>
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

const PostHogAI: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="PostHog AI - Docs - PostHog" />

            <div className="mx-auto max-w-4xl">
                <section className="mb-6">
                    <Intro
                        subheader="Getting started"
                        title="PostHog AI"
                        description="Deeply connected with your data, and lives inside of the PostHog app."
                        buttonText="Get started"
                        buttonLink="/docs/posthog-ai"
                        imageColumnClasses="mt-4 md:-mt-8"
                        imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/all_knowing_4e50835711.png"
                        imageClasses="max-h-48 md:max-h-64"
                    />
                </section>

                <Content />

                <div>
                    <AskMax
                        className=""
                        quickQuestions={[
                            'How can I use PostHog AI to analyze my data?',
                            'How can I use PostHog AI to create insights?',
                            'How can I use PostHog AI to summarize session replays?',
                        ]}
                    />
                </div>
            </div>
        </ReaderView>
    )
}

export default PostHogAI
