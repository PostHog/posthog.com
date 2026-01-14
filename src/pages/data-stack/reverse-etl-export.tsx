import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function ReverseETLExport(): JSX.Element {
    return (
        <>
            <SEO
                title="Reverse ETL & export - PostHog data stack"
                description="Learn about all the ways to export data from PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Reverse ETL & export">
                <p>
                    PostHog provides multiple methods to export and stream your data to external systems, enabling you
                    to activate your product data across your entire tech stack.
                </p>
                <h2 className="flex items-center">
                    Reverse ETL
                    <span className="rounded-sm bg-highlight py-0.5 ml-2 px-1 text-xs font-bold text-red dark:text-yellow">
                        Beta
                    </span>
                </h2>
                <p>
                    Deliver cleaned and modeled data from your PostHog data warehouse to your operational tools for
                    marketing, sales, and customer success via our{' '}
                    <Link to="/cdp#integrations-library">CDP destinations</Link>.
                </p>

                <h2>Batch exports</h2>
                <p>Schedule regular exports of your data to data warehouses and cloud storage.</p>
                <ul>
                    <li>
                        <strong>Azure Blob Storage</strong>
                    </li>
                    <li>
                        <strong>BigQuery</strong>
                    </li>
                    <li>
                        <strong>Snowflake</strong>
                    </li>
                    <li>
                        <strong>Amazon S3</strong>
                    </li>
                    <li>
                        <strong>PostgreSQL</strong>
                    </li>
                    <li>
                        <strong>Redshift</strong>
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
                        <strong>Historical backfills:</strong> Export historical data
                    </li>
                    <li>
                        <strong>Custom schemas:</strong> Define the structure of exported data
                    </li>
                    <li>
                        <strong>Compression:</strong> Reduce storage costs with compressed exports
                    </li>
                </ul>

                <p>
                    <Link to="/docs/cdp/batch-exports" state={{ newWindow: true }}>
                        Configure batch exports →
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
                </ul>

                <h3>Delivery methods</h3>
                <ul>
                    <li>
                        <strong>HTTP/HTTPS:</strong> RESTful APIs and webhooks
                    </li>
                    <li>
                        <strong>Cloud storage:</strong> Direct writes to S3, GCS, Azure Blob
                    </li>
                </ul>
            </ReaderView>
        </>
    )
}
