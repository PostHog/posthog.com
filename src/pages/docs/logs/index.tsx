import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { Caption } from 'components/Caption'

export const Content = () => {
    return (
        <>
            <section className="mb-8">
                <h2 className="mb-4">Overview</h2>
                <div>
                    <p>
                        PostHog Logs is a powerful logging solution that works with the OpenTelemetry Protocol (OTLP).
                        You don't need any vendor-specific SDKs - just use standard OpenTelemetry libraries to send logs
                        to PostHog.
                    </p>
                    {/*
                    <div className="flex justify-center mb-8">
                        <div className="text-center">
                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/logs-search-interface.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/logs-search-interface-dark.png"
                                alt="PostHog Logs search interface"
                                padding={false}
                                classes="rounded @md:max-w-2xl"
                            />
                            <Caption>Search and analyze your logs in PostHog</Caption>
                        </div>
                    </div>
                    */}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0">Why use PostHog Logs?</h2>
                <div>
                    <ul>
                        <li>
                            <b>OpenTelemetry-compatible</b>: Use standard OpenTelemetry SDKs - no PostHog packages
                            required. Works with any compatible client.
                        </li>
                        <li>
                            <b>Integrated analytics</b>: Correlate logs with your PostHog events and user data for
                            deeper insights.
                        </li>
                        <li>
                            <b>Cost-effective</b>: No vendor lock-in, works with your existing setup.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0">How it works</h2>
                <div>
                    <p>
                        PostHog Logs acts as a generic OTLP receiver that happens to be built by PostHog. The process is
                        simple:
                    </p>
                    <ol>
                        <li>Use standard OpenTelemetry logging APIs in your application</li>
                        <li>Include a JWT token with your team ID in the Authorization header</li>
                        <li>Configure your OpenTelemetry client to send logs to PostHog's endpoint</li>
                        <li>Search and analyze your logs in the PostHog interface</li>
                    </ol>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Next steps</h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid grid-cols-1 @md:grid-cols-3">
                    <ResourceItem
                        type="Getting started"
                        title="Start here"
                        description="A high-level overview of the integration process for logging"
                        url="/docs/logs/start-here"
                    />
                    <ResourceItem
                        type="Getting started"
                        title="Installation"
                        description="An overview of installing an OpenTelemetry client"
                        url="/docs/logs/installation"
                    />
                    <ResourceItem
                        type="Troubleshooting"
                        title="Troubleshooting and FAQs"
                        description="Common issues and solutions for PostHog Logs"
                        url="/docs/logs/troubleshooting"
                    />
                </ul>
            </section>
        </>
    )
}

const Logs: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Logs - Docs - PostHog" />

            <div className="mx-auto max-w-4xl">
                <section className="mb-6">
                    <Intro
                        subheader="Getting started"
                        title="Logs"
                        description="Search and analyze your application logs with PostHog and OpenTelemetry."
                        buttonText="Get started!"
                        buttonLink="/docs/logs/start-here"
                        imageColumnClasses="mt-4 md:-mt-8"
                        imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/hoggie-logs-icon.png"
                        imageClasses="max-h-48 md:max-h-64"
                    />
                </section>

                <Content />
            </div>
        </ReaderView>
    )
}

export default Logs
