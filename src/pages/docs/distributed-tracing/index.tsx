import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'

export const Content = () => {
    return (
        <>
            <section className="mb-8">
                <h2 className="mb-4">Overview</h2>
                <div>
                    <p>
                        PostHog Distributed Tracing works with the OpenTelemetry Protocol (OTLP). You don't need any
                        vendor-specific SDKs. Use standard OpenTelemetry libraries to send spans to PostHog using your
                        project token.
                    </p>
                    <p>
                        Distributed tracing is currently in alpha. Setup details may change before general availability.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0">Why use PostHog Distributed Tracing?</h2>
                <div>
                    <ul>
                        <li>
                            <b>OpenTelemetry-compatible</b> - Use standard OpenTelemetry SDKs, no PostHog packages
                            required. Works with any compatible client.
                        </li>
                        <li>
                            <b>Part of the observability suite</b> - Traces use the same OpenTelemetry ingestion as{' '}
                            <Link to="/docs/logs">Logs</Link>, in the same PostHog project as session replays, errors,
                            and analytics.
                        </li>
                        <li>
                            <b>No vendor lock-in</b> - Works with your existing OpenTelemetry setup.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0">How it works</h2>
                <div>
                    <p>Distributed tracing acts as a generic OTLP receiver built by PostHog. Here's how it works:</p>
                    <ol>
                        <li>Use standard OpenTelemetry tracing APIs in your application</li>
                        <li>Include your project token in the Authorization header or as a query parameter</li>
                        <li>Configure your OpenTelemetry client to send spans to PostHog's HTTP endpoint</li>
                        <li>Search and explore your traces in the PostHog interface</li>
                    </ol>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4">Next steps</h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid grid-cols-1 @md:grid-cols-2">
                    <ResourceItem
                        type="Getting started"
                        title="Why you need tracing"
                        description="What a trace is, what it shows you that nothing else does, and when it saves you"
                        url="/docs/distributed-tracing/basics"
                    />
                    <ResourceItem
                        type="Getting started"
                        title="Start here"
                        description="A high-level overview of setting up tracing with OpenTelemetry"
                        url="/docs/distributed-tracing/start-here"
                    />
                    <ResourceItem
                        type="Getting started"
                        title="Installation"
                        description="Language-specific guides for exporting OpenTelemetry traces to PostHog"
                        url="/docs/tracing/installation"
                    />
                    <ResourceItem
                        type="Related"
                        title="Logs"
                        description="Search and analyze your application logs – traces' sibling in the observability suite"
                        url="/docs/logs"
                    />
                </ul>
            </section>
        </>
    )
}

const DistributedTracing: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Distributed tracing - Docs - PostHog" />

            <div className="mx-auto max-w-4xl">
                <section className="mb-6">
                    <Intro
                        subheader="Getting started"
                        title="Distributed tracing"
                        description="Capture and explore distributed traces with PostHog and OpenTelemetry."
                        buttonText="Get started!"
                        buttonLink="/docs/distributed-tracing/start-here"
                    />
                </section>

                <Content />
            </div>
        </ReaderView>
    )
}

export default DistributedTracing
