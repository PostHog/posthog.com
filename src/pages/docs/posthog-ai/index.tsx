import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconCheck, IconLogomark, IconSpinner } from '@posthog/icons'
import {
    IconRewindPlay,
    IconTrends,
    IconToggle,
    IconUser,
    IconLlmAnalytics,
    IconDatabase,
    IconSparkles,
    IconWarning,
} from '@posthog/icons'
import Card from 'components/Card'
import Link from 'components/Link'
import PostHogAIDiagram from './posthog-ai-diagram'

const phFeatures = [
    {
        title: 'Product analytics',
        description: 'Ask PostHog AI to create insights and build dashboards.',
        icon: <IconTrends className="text-blue" />,
        url: '/docs/product-analytics',
    },
    {
        title: 'Session replay',
        description: 'Use PostHog AI to find and summarize session replays.',
        icon: <IconRewindPlay className="text-yellow" />,
        url: '/docs/session-replay',
    },
    {
        title: 'Feature flags',
        description: 'Have PostHog AI create feature flags in seconds.',
        icon: <IconToggle className="text-seagreen" />,
        url: '/docs/feature-flags',
    },
    {
        title: 'Data warehouse',
        description: 'Use PostHog AI to write, fix, and validate SQL queries.',
        icon: <IconDatabase className="text-purple" />,
        url: '/docs/data-warehouse',
    },
    {
        title: 'Error tracking',
        description: 'Let PostHog AI search and find the most impactful issues and errors.',
        icon: <IconWarning className="text-orange" />,
        url: '/docs/error-tracking',
    },
    {
        title: 'Surveys',
        description: 'Ask PostHog AI to generate surveys and analyze responses.',
        icon: <IconUser className="text-red" />,
        url: '/docs/surveys',
    },
]

const posthogAIFeatures = [
    { text: 'Build insights', url: '/docs/posthog-ai/write-and-edit-sql' },
    { text: 'Create dashboards', url: '/docs/posthog-ai/investigate-web-traffic' },
    { text: 'Deep research', url: '/docs/posthog-ai/deep-research', comingSoon: true },
    { text: 'Summarize session replays', url: '/docs/posthog-ai/session-summaries', comingSoon: true },
    { text: 'Use dev tools', url: '/docs/posthog-ai/tools' },
    { text: 'Analyze product data and event schema', url: '/docs/posthog-ai/tools' },
    { text: 'Navigate PostHog UI', url: '/docs/posthog-ai/tools' },
    { text: 'Manage context', url: '/docs/posthog-ai/context-and-commands' },
    { text: 'Search documentation', url: '/docs/posthog-ai/tools' },
    { text: 'Save memory', url: '/docs/posthog-ai/edit-memory' },
]

export const Content = () => {
    return (
        <>
            <section className="mb-4">
                <h2 className="mb-4">Overview</h2>
                <div>
                    <p>
                        PostHog AI is an AI agent that works within the PostHog platform. You can think of it as the
                        product analyst or assistant that lives inside your project. It's here to help you find answers
                        and to get things done fast.
                    </p>
                    <p>
                        Unlike other agents, PostHog AI is deeply connected to your product data and event schema. It
                        can reference real product usage and perform actions in PostHog. Describe what you want in
                        natural language and it can:
                    </p>
                    <ul>
                        <li>Conduct research and query data to answer product and customer questions</li>
                        <li>Navigate the PostHog UI to edit filters, create insights, and build dashboards</li>
                        <li>Use PostHog dev tools to write SQL, create feature flags, set up surveys, and more</li>
                        <li>Summarize and analyze insights, session replays, experiments, and more</li>
                        <li>Explain features and search PostHog documentation</li>
                    </ul>
                    <p>
                        The main interface is an in-app <a href="https://app.posthog.com/#panel=max">AI chat</a>, but
                        PostHog AI also appears throughout the platform and within other PostHog features. For example,
                        you might see the AI icon{' '}
                        <span className="inline-block">
                            <IconSparkles className="h-4 w-4" />
                        </span>{' '}
                        when editing filters, writing SQL, or watching session replays.
                    </p>
                    <p>All of these AI touchpoints across the platform are powered by the same PostHog AI core.</p>
                </div>

                <div className="mt-8 -mx-4 @xl:-mx-8">
                    <ScrollArea fullWidth>
                        <div className="px-4 @xl:px-8">
                            <PostHogAIDiagram className={`max-h-[34rem] min-h-[22rem] fill-black dark:fill-white`} />
                        </div>
                    </ScrollArea>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Skills and features</h2>
                <OSTable
                    columns={[
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '80px', align: 'center' },
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '80px', align: 'center' },
                    ]}
                    rows={posthogAIFeatures.reduce((rows, feature, i) => {
                        if (i % 2 === 0) rows.push({ cells: [] as any[] })
                        const row = rows[rows.length - 1]
                        row.cells.push(
                            {
                                content: feature.comingSoon ? (
                                    <a onClick={(event) => event.preventDefault()}>{feature.text}</a>
                                ) : (
                                    <a href={feature.url}>{feature.text}</a>
                                ),
                            },
                            {
                                content: feature.comingSoon ? (
                                    <IconSpinner className="h-5 text-primary" />
                                ) : (
                                    <IconCheck className="h-5 text-green" />
                                ),
                            }
                        )
                        return rows
                    }, [] as any[])}
                    size="sm"
                    width="full"
                />
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Built into the PostHog platform</h2>
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
                        description="A high-level overview of PostHog AI and how to get started"
                        url="/docs/posthog-ai/start-here"
                    />
                    <ResourceItem
                        type="Access"
                        title="Enable PostHog AI"
                        description="Allow PostHog AI access to your PostHog project"
                        url="/docs/posthog-ai/allow-access"
                    />
                    <ResourceItem
                        type="Features"
                        title="Tools and skills"
                        description="Learn about PostHog AI's features and capabilities"
                        url="/docs/posthog-ai/tools"
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
                        description="Deeply connected with your product. Lives inside the PostHog app."
                        buttonText="Get started"
                        buttonLink="/docs/posthog-ai/start-here"
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
