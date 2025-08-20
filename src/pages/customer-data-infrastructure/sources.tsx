import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function Sources(): JSX.Element {
    return (
        <>
            <SEO
                title="Get data in - Customer data infrastructure - PostHog"
                description="Learn about all the ways to get data into PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Get data into PostHog">
                <p>
                    PostHog provides multiple ways to ingest data from various sources, making it easy to centralize all
                    your customer and product data in one place.
                </p>

                <h2>1. PostHog libraries / event pipelines</h2>
                <p>
                    Our SDKs and event pipelines are the primary way to track user behavior and product usage in
                    real-time.
                </p>
                <ul>
                    <li>
                        <Link to="/docs/getting-started/install?tab=snippet" state={{ newWindow: true }}>
                            JavaScript SDK
                        </Link>
                        <strong>*</strong>: Track events from web applications with autocapture and custom events
                    </li>
                    <li>
                        <strong>Server-side SDKs:</strong> Python, Node.js, Ruby, PHP, Go, and more for backend tracking
                    </li>
                    <li>
                        <strong>Mobile SDKs*:</strong> iOS, Android, React Native, Flutter for mobile app analytics
                    </li>
                </ul>
                <p className="text-sm text-secondary">
                    <em>
                        <strong>*Supports autocapture:</strong> Automatically track clicks, form submissions, and
                        pageviews without code changes
                    </em>
                </p>
                <p>
                    <Link to="/docs/libraries" state={{ newWindow: true }}>
                        View all PostHog libraries →
                    </Link>
                    <span className="mx-2">|</span>
                    <Link to="/docs/frameworks" state={{ newWindow: true }}>
                        View frameworks guides →
                    </Link>
                </p>

                <h2>2. Warehouse sources</h2>
                <p>
                    Connect your existing data warehouses and databases to sync data into PostHog for analysis alongside
                    your product data.
                </p>
                <ul>
                    <li>
                        <strong>Cloud warehouses:</strong> Snowflake, BigQuery, Redshift, Databricks
                    </li>
                    <li>
                        <strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, MS SQL Server
                    </li>
                    <li>
                        <strong>SaaS tools:</strong> Salesforce, HubSpot, Stripe, Zendesk, and more
                    </li>
                    <li>
                        <strong>Custom sources:</strong> S3, GCS, or any data source via custom connectors
                    </li>
                </ul>
                <p>
                    <Link to="/docs/data-warehouse" state={{ newWindow: true }}>
                        Learn about warehouse sources →
                    </Link>
                </p>

                <h2>3. Incoming webhooks</h2>
                <p>
                    Send events to PostHog from external services using webhooks. This allows you to track events that
                    happen outside your application.
                </p>
                <ul>
                    <li>
                        <strong>Payment events:</strong> Track transactions, subscriptions, and refunds from Stripe
                    </li>
                    <li>
                        <strong>Marketing events:</strong> Import email opens, clicks, and conversions from HubSpot
                    </li>
                    <li>
                        <strong>Support tickets:</strong> Monitor customer issues from Zendesk or Intercom
                    </li>
                    <li>
                        <strong>Custom webhooks:</strong> Send any event data using our webhook endpoint
                    </li>
                </ul>
                <p>
                    <Link to="/cdp?type=source" state={{ newWindow: true }}>
                        Browse webhook integrations →
                    </Link>
                </p>

                <h2>4. Capture API</h2>
                <p>Our direct API endpoints let you send events from any system that can make HTTP requests.</p>
                <ul>
                    <li>
                        <strong>Batch API:</strong> Send multiple events in a single request for efficiency
                    </li>
                    <li>
                        <strong>Real-time API:</strong> Send events as they happen for immediate processing
                    </li>
                    <li>
                        <strong>Historical import:</strong> Backfill historical data with custom timestamps
                    </li>
                    <li>
                        <strong>Server-to-server:</strong> Direct integration without client libraries
                    </li>
                </ul>
                <p>
                    <Link to="/docs/api/capture" state={{ newWindow: true }}>
                        Read the Capture API documentation →
                    </Link>
                </p>

                <hr />

                <h2>Getting started</h2>
                <p>The best way to get started depends on your use case:</p>
                <ul>
                    <li>
                        <strong>For product analytics:</strong> Start with our JavaScript SDK for web apps or mobile
                        SDKs for native apps
                    </li>
                    <li>
                        <strong>For business data:</strong> Connect your CRM, payment processor, or support tools via
                        warehouse sources
                    </li>
                    <li>
                        <strong>For custom events:</strong> Use the Capture API or incoming webhooks for maximum
                        flexibility
                    </li>
                </ul>
            </ReaderView>
        </>
    )
}
