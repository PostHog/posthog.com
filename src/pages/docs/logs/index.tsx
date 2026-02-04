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
                        PostHog logs is a powerful logging solution that works with the OpenTelemetry Protocol (OTLP).
                        You don't need any vendor-specific SDKs - just use standard OpenTelemetry libraries to send logs
                        to PostHog. You can migrate to PostHog logs by configuring your existing OpenTelemetry client to
                        send logs to PostHog's HTTP endpoint using your project token.
                    </p>

                    <div className="flex justify-center mb-8">
                        <div className="text-center">
                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/logs_light_dd81ff5093.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/logs_dark_d7135f1b22.png"
                                alt="PostHog logs search interface"
                                padding={false}
                                classes="rounded @md:max-w-2xl"
                            />
                            <Caption>Search and analyze your logs in PostHog</Caption>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0">Why use PostHog logs?</h2>
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
                        PostHog logs acts as a generic OTLP receiver that happens to be built by PostHog. The process is
                        simple:
                    </p>
                    <ol>
                        <li>Use standard OpenTelemetry logging APIs in your application</li>
                        <li>Include your project token in the Authorization header or as a query parameter</li>
                        <li>Configure your OpenTelemetry client to send logs to PostHog's HTTP endpoint</li>
                        <li>Search and analyze your logs in the PostHog interface</li>
                    </ol>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0" id="pricing">
                    Pricing
                </h2>
                <p>
                    Every month, the first 50GB is free. After that, pricing is $0.25 per GB up to 300GB ingested, then
                    $0.15/GB for 300GB+. Have a look at our <Link to="/pricing">pricing page</Link> for more details.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Next steps</h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid grid-cols-1 @md:grid-cols-2">
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
                        type="Using logs"
                        title="Search logs"
                        description="Learn how to search logs using multiple tokens, negative filters, and exact phrases"
                        url="/docs/logs/search"
                    />
                    <ResourceItem
                        type="Troubleshooting"
                        title="Troubleshooting and FAQs"
                        description="Common issues and solutions for PostHog logs"
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
                        imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hog_logs_29cd8c8402.png"
                        imageClasses="max-h-48 md:max-h-64"
                    />
                </section>

                <Content />
            </div>
        </ReaderView>
    )
}

export default Logs
