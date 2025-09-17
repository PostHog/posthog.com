import React, { useState } from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import { IconCheck, IconLogomark } from '@posthog/icons'
import InstallationPlatforms from '../../../contents/docs/error-tracking/installation/_snippets/installation-platforms'
import Pricing from '../../components/Pricing/PricingCalculator/SingleProduct'
import { CodeBlock } from 'components/CodeBlock'
import { IconRewindPlay, IconTrends, IconToggle, IconUser } from '@posthog/icons'

type ErrorTrackingProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

const maxWidth = 'max-w-4xl'

const subfeatures = [
    {
        title: 'Session replay',
        description: 'Watch session recordings to help you reproduce an issue',
        icon: <IconRewindPlay className="h-6" />,
        color: 'yellow',
        url: '/docs/session-replay',
    },
    {
        title: 'Product analytics',
        description:
            'Combine exception with analytics data to understand how your exceptions impact conversion and revenue',
        icon: <IconTrends className="h-6" />,
        color: 'blue',
        url: '/docs/product-analytics',
    },
    {
        title: 'Feature flags',
        description: 'Test fixes by rolling out code changes only to affected users',
        icon: <IconToggle className="h-6" />,
        color: 'seagreen',
        url: '/docs/feature-flags',
    },
    {
        title: 'User profiles',
        description:
            'See all exception events for a users and find which feature flags were enabled at the time an error occurred',
        icon: <IconUser className="h-6" />,
        color: 'purple',
        url: '/docs/product-analytics/identify',
    },
]
const javascriptCode = `posthog.captureException(error, {
    user_id: "user123",
    stack_trace: error.stack,
    severity: "error"
  })`

const pythonCode = `posthog.capture_exception(
    error,
    distinct_id="user123",
    properties={
      "stack_trace": str(error),
      "severity": "error"
    }
  )`

const goCode = `client.CaptureException(posthog.CaptureException{
    DistinctId: "user123",
    Exception:  err,
    Properties: map[string]interface{}{
      "severity": "error",
      "context":  "user_action",
    },
  })`

const codeLanguages = [
    {
        label: 'JavaScript',
        language: 'javascript',
        code: javascriptCode,
    },
    {
        label: 'Python',
        language: 'python',
        code: pythonCode,
    },
]

export const Content = () => {
    const [currentLanguage, setCurrentLanguage] = useState(codeLanguages[0])

    const handleLanguageChange = (language: any) => {
        setCurrentLanguage(language)
    }

    return (
        <>
            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <div>
                    <p>
                        Error tracking lets you capture exceptions and resolve issues within your app, so you can ship
                        fast with confidence. It's especiailly useful for engineers who:
                    </p>
                    <ul>
                        <li>Need to move fast and ship often</li>
                        <li>Want fewer tools and more focus on building products</li>
                        <li>Manage full-stack development teams</li>
                        <li>Care about the impact of errors on users</li>
                    </ul>
                </div>

                <div className="mt-8">
                    <i>
                        [edwin] A technical, visual content goes here, something at the code-level (i.e., code block,
                        image, gif, video, etc.)
                    </i>
                    <CodeBlock currentLanguage={currentLanguage} onChange={handleLanguageChange}>
                        {codeLanguages}
                    </CodeBlock>
                </div>
            </section>

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h2 className="mb-4 text-xl">All the features you'd expect</h2>
                <OSTable
                    columns={[
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '120px', align: 'center' },
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '120px', align: 'center' },
                    ]}
                    rows={[
                        {
                            cells: [
                                { content: <a href="/docs/error-tracking/capture">Capture exceptions</a> },
                                { content: <IconCheck className="h-5 text-green" /> },
                                {
                                    content: (
                                        <a href="/docs/error-tracking/capture#automatic-exception-capture">
                                            Autocapture
                                        </a>
                                    ),
                                },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: <a href="/docs/error-tracking/stack-traces">Stack traces</a> },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: <a href="/docs/error-tracking/managing-issues">Issue management</a> },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: <a href="/docs/error-tracking/grouping-issues">Custom error grouping</a> },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: <a href="/docs/error-tracking/debugging-with-mcp">MCP integration</a> },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: <a href="/docs/error-tracking/fix-with-ai-prompts">Fix with AI</a> },
                                { content: <IconCheck className="h-5 text-green" /> },
                                {
                                    content: <a href="/docs/error-tracking/alerts">Alerting</a>,
                                },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: <a href="/docs/error-tracking/assigning-issues">Team assignments</a> },
                                { content: <IconCheck className="h-5 text-green" /> },
                                {
                                    content: (
                                        <a href="/docs/error-tracking/external-tracking">
                                            Integrations with Linear and GitHub
                                        </a>
                                    ),
                                },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                    ]}
                    size="sm"
                    className={maxWidth}
                />
            </section>

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h2 className="mb-4 text-xl">Integrates with these frameworks</h2>
                <div className="mt-4">
                    <InstallationPlatforms columns={4} />
                </div>
            </section>

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h2 className="mb-4 text-xl">And 10x better with other PostHog products</h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    {subfeatures.map((subfeature, index) => (
                        <li
                            key={index}
                            className="list-none bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded relative hover:top-[-2px] active:top-[1px] hover:transition-all overflow-hidden"
                        >
                            <Link
                                to={`/docs/${subfeature.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block not-prose"
                                state={{ newWindow: true }}
                            >
                                <div className="px-4 py-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`text-${subfeature.color}`}>{subfeature.icon}</div>
                                        <h4 className="font-semibold my-0">{subfeature.title}</h4>
                                    </div>
                                    <p className="text-secondary text-sm">{subfeature.description}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h2 className="mb-4 text-xl">Pricing</h2>
                <p>
                    PostHog's error tracking is built to be cost-effective by default, with a generous free tier and
                    transparent usage-based pricing. Our generous free tier means more than 90% of companies use PostHog
                    for free.
                </p>
                <div className="px-8 rounded-md border-primary border">
                    <Pricing productType="error_tracking" />
                </div>

                <p>No credit card required to start. You can also set billing limits to avoid surprise charges.</p>
                <p>
                    See our <a href="/pricing">pricing page</a> for more up-to-date details.
                </p>
            </section>

            <AskMax
                className={`mx-auto ${maxWidth}`}
                quickQuestions={[
                    'How do I see what the most common errors are?',
                    'How do I custom error groups?',
                    'How do I assign someone an error?',
                ]}
            />

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h2 className="m-0 text-xl">Next steps</h2>
                <p className="text-[15px]">Check out these resources to get started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Getting started"
                        title="Get started with error tracking"
                        description="A high-level guide that outlines the integration journey."
                        url="/docs/error-tracking/start-here"
                    />
                    <ResourceItem
                        type="Quickstart"
                        title="How to set up Next.js error tracking"
                        description="Installation guide to set up error tracking in Next.js"
                        url="/docs/error-tracking/installation/nextjs"
                    />
                    <ResourceItem
                        type="Concepts"
                        title="Issues and exceptions"
                        description="Learn how issues and exceptions fit into the workflow"
                        url="/docs/error-tracking/issues-and-exceptions"
                    />
                </ul>
            </section>
        </>
    )
}

const ErrorTracking: React.FC<ErrorTrackingProps> = () => {
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

            <div className="">
                <CallToAction to="/docs/error-tracking/start-here" width="full">
                    Start integrating
                </CallToAction>
            </div>
        </ReaderView>
    )
}

export default ErrorTracking
