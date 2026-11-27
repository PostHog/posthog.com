import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import useProduct from 'hooks/useProduct'
import { buildProductMenuTabs, ProductSwitcher } from 'components/Products/ReaderViewProduct'

export const Content = () => {
    return (
        <>
            <section className="mb-8">
                <h2 className="mb-4">Overview</h2>
                <div>
                    <p>
                        PostHog Distributed Tracing works with the OpenTelemetry Protocol (OTLP). Use standard
                        OpenTelemetry libraries to send spans to PostHog using your project token. On Node.js and
                        Python, the PostHog SDK can also create and export spans itself, with no OpenTelemetry
                        dependency – see the <Link to="/docs/distributed-tracing/installation/nodejs">Node.js</Link> and{' '}
                        <Link to="/docs/distributed-tracing/installation/python">Python</Link> guides.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0">Why use PostHog Distributed Tracing?</h2>
                <div>
                    <ul>
                        <li>
                            <b>OpenTelemetry-compatible</b> - Use standard OpenTelemetry SDKs, no PostHog packages
                            required. Works with any compatible client, or with the span API in{' '}
                            <code>posthog-node</code> and <code>posthog</code> for Python.
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
                        description="Set up an OpenTelemetry exporter or PostHog SDK and send your first spans"
                        url="/docs/distributed-tracing/start-here"
                    />
                    <ResourceItem
                        type="Getting started"
                        title="Installation"
                        description="Language-specific guides for exporting OpenTelemetry traces to PostHog"
                        url="/docs/distributed-tracing/installation"
                    />
                    <ResourceItem
                        type="Web app"
                        title="Search and filter traces"
                        description="Filter by service, status, duration, and attributes, and brush latency heatmaps"
                        url="/docs/distributed-tracing/search"
                    />
                    <ResourceItem
                        type="Web app"
                        title="Inspect traces and spans"
                        description="Read span waterfalls and flame graphs, and pivot to logs, queries, and errors"
                        url="/docs/distributed-tracing/inspect-traces"
                    />
                    <ResourceItem
                        type="Web app"
                        title="Analyze operations and compare windows"
                        description="Rank operations by p95 latency and diff performance against a baseline window"
                        url="/docs/distributed-tracing/operations-and-compare"
                    />
                    <ResourceItem
                        type="Web app"
                        title="Query traces with SQL"
                        description="Run custom percentiles, breakdowns, and exports on posthog.trace_spans in HogQL"
                        url="/docs/distributed-tracing/sql"
                    />
                    <ResourceItem
                        type="Correlated data"
                        title="Link persons, sessions, logs, and errors"
                        description="Configure identity attribute keys and correlate traces across PostHog"
                        url="/docs/distributed-tracing/correlate-data"
                    />
                    <ResourceItem
                        type="Surfaces"
                        title="PostHog MCP"
                        description="Let coding agents check service health, diff operations, and summarize traces"
                        url="/docs/distributed-tracing/surfaces/mcp"
                    />
                    <ResourceItem
                        type="Surfaces"
                        title="Tracing API"
                        description="Query spans, aggregates, and service health programmatically over REST"
                        url="/docs/distributed-tracing/surfaces/api"
                    />
                </ul>
            </section>
        </>
    )
}

const DistributedTracing: React.FC = () => {
    // Same Product / Pricing / Docs tab strip and product switcher as /tracing,
    // so the sidebar stays put when you move between the product and its docs.
    const productData = useProduct({ handle: 'traces' }) as any
    const menuTabs = buildProductMenuTabs({
        productData,
        activeSurface: 'docs',
        currentPath: '/docs/distributed-tracing',
    })

    return (
        <ReaderView
            menuTabs={menuTabs}
            productSelect={
                productData ? <ProductSwitcher activeHandle={productData.handle} surface="docs" /> : undefined
            }
        >
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
