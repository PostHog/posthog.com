import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import Logo from 'components/Logo'
import { IconCheck, IconLogomark } from '@posthog/icons'

type ErrorTrackingProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Content = () => {
    return (
        <>
            <section className="mb-6">
                <h2 className="mb-1 text-xl">What is error tracking?</h2>
                <p>
                    Error tracking helps you capture and analyze errors in your application. It provides detailed stack
                    traces, error context, and analytics to help you identify and fix issues quickly.
                </p>
                <p>
                    Error tracking helps you capture and analyze errors in your application. It provides detailed stack
                    traces, error context, and analytics to help you identify and fix issues quickly.
                </p>
                <p>
                    Error tracking helps you capture and analyze errors in your application. It provides detailed stack
                    traces, error context, and analytics to help you identify and fix issues quickly.
                </p>
            </section>

            <section className="mb-6">
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
                                { content: 'Error alerts' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Exception capture' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: 'Issue management' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Network performance monitoring' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: 'Error grouping' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Source map support' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: 'Stack tracing' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Integration with product analytics' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: 'Integration with session replays' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Integration with A/B experiments' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                    ]}
                    size="sm"
                    className="max-w-2xl"
                />
            </section>

            <section className="mb-6">
                <h2 className="mb-4 text-xl">And features that will help you 10x</h2>
            </section>

            <section className="mb-6">
                <h2 className="mb-4 text-xl">Integration</h2>
            </section>

            <section className="mb-6">
                <h2 className="mb-4 text-xl">Pricing</h2>
            </section>

            <AskMax
                quickQuestions={[
                    'How do I see what the most common errors are?',
                    'How do I custom error groups?',
                    'How do I assign someone an error?',
                ]}
            />

            <section className="mb-6">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="How to set up Next.js error monitoring"
                        description="Track client and server errors in Next.js"
                        url="/tutorials/nextjs-error-monitoring"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up Python error tracking"
                        description="Learn how to track basic errors in Python and Flask"
                        url="/tutorials/python-error-tracking"
                    />
                    <ResourceItem
                        type="Article"
                        title="What is real user monitoring (and how to set it up)"
                        description="How to set up RUM to get more context on errors"
                        url="/product-engineers/real-user-monitoring"
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

            <Content />

            <div className="">
                <CallToAction to="/docs/error-tracking/start-here" width="full">
                    Visit the manual
                </CallToAction>
            </div>
        </ReaderView>
    )
}

export default ErrorTracking
