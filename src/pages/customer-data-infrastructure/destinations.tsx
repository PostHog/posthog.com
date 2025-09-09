import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function Destinations(): JSX.Element {
    return (
        <>
            <SEO
                title="Send data out of PostHog - Customer Data Infrastructure - PostHog"
                description="Learn about all the ways to export data from PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Send data out of PostHog">
                <p>
                    PostHog provides multiple methods to export and stream your data to external systems, enabling you
                    to activate your product data across your entire tech stack.
                </p>

                <h2>1. Batch exports</h2>
                <p>Schedule regular exports of your data to data warehouses and cloud storage.</p>
                <ul>
                    <li>
                        <strong>BigQuery:</strong> Export to Google BigQuery for advanced analytics
                    </li>
                    <li>
                        <strong>Snowflake:</strong> Send data to Snowflake data warehouse
                    </li>
                    <li>
                        <strong>Amazon S3:</strong> Store data in S3 buckets for flexible processing
                    </li>
                    <li>
                        <strong>PostgreSQL:</strong> Export to PostgreSQL databases
                    </li>
                    <li>
                        <strong>ClickHouse:</strong> High-performance analytics database exports
                    </li>
                </ul>
                <p>Batch export features:</p>
                <ul>
                    <li>
                        <strong>Scheduled exports:</strong> Hourly, daily, or custom schedules
                    </li>
                    <li>
                        <strong>Incremental updates:</strong> Only export new or changed data
                    </li>
                    <li>
                        <strong>Historical backfills:</strong> Export historical data ranges
                    </li>
                    <li>
                        <strong>Custom schemas:</strong> Define the structure of exported data
                    </li>
                    <li>
                        <strong>Compression:</strong> Reduce storage costs with compressed exports
                    </li>
                </ul>
                <h3>Features</h3>
                <p>
                    Query events, persons, and insights using HogQL. Build custom integrations and embed analytics in
                    your product
                </p>
                <ul>
                    <li>
                        <strong>HogQL queries</strong>: Full SQL access to your data with our ClickHouse wrapper
                    </li>
                    <li>
                        <strong>Insight data</strong>: Fetch results from saved insights and dashboards
                    </li>
                    <li>
                        <strong>Person profiles</strong>: Query and update user properties and cohorts
                    </li>
                    <li>
                        <strong>Export automation</strong>: Schedule exports and integrate with your data stack
                    </li>
                    <li>
                        <strong>Aggregations</strong>: Get pre-computed metrics without raw event access
                    </li>
                </ul>

                <p>
                    <Link to="/docs/batch-exports" state={{ newWindow: true }}>
                        Configure batch exports →
                    </Link>
                </p>

                <h2>2. Realtime event streaming (event pipelines)</h2>
                <p>Stream events to external systems in real-time as they happen in PostHog.</p>
                <ul>
                    <li>
                        <strong>Webhooks:</strong> Send events to any HTTP endpoint in real-time
                    </li>
                    <li>
                        <strong>Slack:</strong> Send events to Slack channels
                    </li>
                    <li>
                        <strong>SaaS tools:</strong> Send events to SaaS tools like Braze, Customer.io, and more
                    </li>
                    <li>
                        <strong>Kafka:</strong> Stream events to Apache Kafka topics for high-throughput processing
                    </li>
                    <li>
                        <strong>Amazon Kinesis:</strong> Direct integration with AWS Kinesis streams
                    </li>
                    <li>
                        <strong>Google Pub/Sub:</strong> Stream to Google Cloud Pub/Sub topics
                    </li>
                    <li>
                        <strong>Custom destinations:</strong> Build your own destination using our plugin framework
                    </li>
                </ul>
                <p>Real-time streaming is ideal for:</p>
                <ul>
                    <li>Triggering immediate actions based on user behavior</li>
                    <li>Keeping external systems synchronized with PostHog</li>
                    <li>Building real-time dashboards and monitoring</li>
                    <li>Feeding machine learning models with fresh data</li>
                </ul>
                <p>
                    <Link to="/docs/cdp/destinations" state={{ newWindow: true }}>
                        Explore event pipeline destinations →
                    </Link>
                </p>

                <h2>3. Webhooks</h2>
                <p>Configure webhooks to notify external systems when specific events or conditions occur.</p>
                <ul>
                    <li>
                        <strong>Event webhooks:</strong> Trigger on specific user actions or system events
                    </li>
                    <li>
                        <strong>Threshold alerts:</strong> Send notifications when metrics exceed limits
                    </li>
                    <li>
                        <strong>Scheduled webhooks:</strong> Regular updates on key metrics
                    </li>
                    <li>
                        <strong>Custom payloads:</strong> Format data to match your destination's requirements
                    </li>
                </ul>
                <p>Common webhook use cases:</p>
                <ul>
                    <li>Sync user properties to CRM systems like Salesforce or HubSpot</li>
                    <li>Trigger marketing automation workflows in tools like Braze or Customer.io</li>
                    <li>Update customer success platforms like Vitally or Gainsight</li>
                    <li>Send alerts to Slack, PagerDuty, or monitoring tools</li>
                </ul>
                <p>
                    <Link to="/docs/webhooks" state={{ newWindow: true }}>
                        Learn about webhooks →
                    </Link>
                </p>

                <h2>Export formats and protocols</h2>

                <h3>Data formats</h3>
                <ul>
                    <li>
                        <strong>JSON:</strong> Standard format for webhooks and APIs
                    </li>
                    <li>
                        <strong>CSV:</strong> For spreadsheet and traditional database imports
                    </li>
                    <li>
                        <strong>Parquet:</strong> Columnar format for efficient warehouse storage
                    </li>
                    <li>
                        <strong>Avro:</strong> Schema-based format for streaming platforms
                    </li>
                </ul>

                <h3>Delivery methods</h3>
                <ul>
                    <li>
                        <strong>HTTP/HTTPS:</strong> RESTful APIs and webhooks
                    </li>
                    <li>
                        <strong>SFTP:</strong> Secure file transfer for batch exports
                    </li>
                    <li>
                        <strong>Cloud storage:</strong> Direct writes to S3, GCS, Azure Blob
                    </li>
                    <li>
                        <strong>Streaming:</strong> Kafka, Kinesis, Pub/Sub protocols
                    </li>
                </ul>

                <h2>Common export scenarios</h2>

                <h3>Marketing activation</h3>
                <ul>
                    <li>Sync product usage data to marketing automation tools</li>
                    <li>Create behavioral segments for targeted campaigns</li>
                    <li>Trigger personalized emails based on user actions</li>
                </ul>

                <h3>Sales enablement</h3>
                <ul>
                    <li>Update CRM with product usage insights</li>
                    <li>Alert sales teams about high-value user activities</li>
                    <li>Score leads based on product engagement</li>
                </ul>

                <h3>Data science & analytics</h3>
                <ul>
                    <li>Feed ML models with behavioral data</li>
                    <li>Export to data lakes for advanced analysis</li>
                    <li>Combine with other data sources in warehouses</li>
                </ul>

                <h3>Operations & monitoring</h3>
                <ul>
                    <li>Send alerts for critical user behaviors</li>
                    <li>Monitor system health and usage patterns</li>
                    <li>Automate support ticket creation</li>
                </ul>

                <h2>Best practices</h2>
                <ul>
                    <li>
                        <strong>Start small:</strong> Test exports with a subset of data before full deployment
                    </li>
                    <li>
                        <strong>Monitor exports:</strong> Set up alerts for failed or delayed exports
                    </li>
                    <li>
                        <strong>Optimize frequency:</strong> Balance data freshness with system load
                    </li>
                    <li>
                        <strong>Handle failures:</strong> Implement retry logic and error notifications
                    </li>
                    <li>
                        <strong>Secure your data:</strong> Use encryption and proper authentication
                    </li>
                </ul>
            </ReaderView>
        </>
    )
}
