import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import { IconArrowUpRight } from '@posthog/icons'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function Transformations(): JSX.Element {
    return (
        <>
            <SEO
                title="Transform data - Customer data infrastructure - PostHog"
                description="Learn how to transform and enrich your data in PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Transform data">
                <p>
                    PostHog provides powerful tools to transform, enrich, and model your data to get in the exact shape
                    you need it.
                </p>

                <h2>1. Events transformations</h2>
                <p>
                    Transform event data as it flows through PostHog using our transformation apps and{' '}
                    <Link to="/docs/hog" state={{ newWindow: true }}>
                        Hog functions
                    </Link>
                    .
                </p>

                <h3>
                    <IconArrowUpRight className="size-6 inline-block text-muted -scale-y-1 mr-1" /> Data in: Pipeline
                    transformations (built with Hog)
                </h3>
                <p>Apply transformations to incoming event data before it's stored:</p>
                <ul>
                    <li>
                        <strong>Data enrichment:</strong> Add context like GeoIP location, user agent parsing, or
                        company data
                    </li>
                    <li>
                        <strong>Property mapping:</strong> Standardize property names and formats across different
                        sources
                    </li>
                    <li>
                        <strong>Data validation:</strong> Ensure data quality by validating and cleaning incoming events
                    </li>
                    <li>
                        <strong>PII scrubbing:</strong> Remove or hash sensitive information before storage
                    </li>
                    <li>
                        <strong>Event filtering:</strong> Drop unwanted events or filter by specific criteria
                    </li>
                </ul>
                <p>
                    <Link to="/docs/cdp/transformations" state={{ newWindow: true }}>
                        Learn about transformations &rarr;
                    </Link>
                </p>

                <h3>
                    <IconArrowUpRight className="size-6 inline-block text-muted mr-1" />
                    Data out: Using transformations (with Hog)
                </h3>
                <p>Transform data before sending it to external destinations:</p>
                <ul>
                    <li>
                        <strong>JSON formatting:</strong> Convert PostHog events to match the JSON structure your
                        destination expects
                    </li>
                    <li>
                        <strong>Data enrichment:</strong> Add context like GeoIP location, user agent parsing, or
                        company data
                    </li>
                    <li>
                        <strong>Template syntax:</strong> Use <code>&#123;event.properties.value&#125;</code> to build
                        custom payloads
                    </li>
                    <li>
                        <strong>Data aggregation:</strong> Combine multiple events into summary metrics
                    </li>
                    <li>
                        <strong>Custom routing:</strong> Send different events to different destinations based on rules
                    </li>
                    <li>
                        <strong>Rate limiting:</strong> Control the flow of data to external systems
                    </li>
                    <li>
                        <strong>Conditional exports:</strong> Only send events that meet specific criteria
                    </li>
                </ul>
                <p>
                    <Link to="/docs/hog" state={{ newWindow: true }}>
                        Learn about Hog functions →
                    </Link>
                </p>

                <h2>2. Warehouse source transformations</h2>
                <p>Transform and model data from your connected warehouse sources using SQL.</p>

                <h3>In SQL editor: Data modeling in saved views</h3>
                <p>Create reusable data models and transformations using PostHog's SQL editor:</p>
                <ul>
                    <li>
                        <strong>Join multiple sources:</strong> Combine data from different tables and sources
                    </li>
                    <li>
                        <strong>Create calculated fields:</strong> Add derived metrics and computed columns
                    </li>
                    <li>
                        <strong>Build aggregations:</strong> Create summary tables and rollups
                    </li>
                    <li>
                        <strong>Save as views:</strong> Store complex queries as reusable views
                    </li>
                    <li>
                        <strong>Version control:</strong> Track changes to your data models over time
                    </li>
                </ul>
                <p>
                    <Link to="/docs/data-warehouse/views" state={{ newWindow: true }}>
                        Learn about saved views →
                    </Link>
                </p>

                <h2>Common transformation use cases</h2>

                <h3>User identity resolution</h3>
                <ul>
                    <li>Merge anonymous and identified user sessions</li>
                    <li>Link user IDs across different systems</li>
                    <li>Create a unified customer profile</li>
                </ul>

                <h3>Revenue attribution</h3>
                <ul>
                    <li>Connect product usage to revenue data from Stripe</li>
                    <li>Calculate customer lifetime value</li>
                    <li>Attribute revenue to specific features or campaigns</li>
                </ul>

                <h3>Data standardization</h3>
                <ul>
                    <li>Normalize event names across different platforms</li>
                    <li>Standardize timestamp formats and timezones</li>
                    <li>Map custom properties to a consistent schema</li>
                </ul>

                <h3>Privacy compliance</h3>
                <ul>
                    <li>Automatically remove or hash PII</li>
                    <li>Implement data retention policies</li>
                    <li>Apply GDPR/CCPA compliance rules</li>
                </ul>

                <h2>Best practices</h2>
                <ul>
                    <li>
                        <strong>Test transformations:</strong> Always test with a small sample before applying to all
                        data
                    </li>
                    <li>
                        <strong>Document your logic:</strong> Add clear descriptions to saved views and transformations
                    </li>
                    <li>
                        <strong>Monitor performance:</strong> Watch for slow queries and optimize as needed
                    </li>
                    <li>
                        <strong>Version control:</strong> Keep track of changes to critical transformations
                    </li>
                    <li>
                        <strong>Error handling:</strong> Build in fallbacks for when transformations fail
                    </li>
                </ul>

                <hr />
                <h2>FAQ</h2>

                <ul>
                    <li>
                        <strong>What's the difference between webhooks and batch exports?</strong>
                        <br />
                        Webhooks send data in real-time as events happen, perfect for alerts and automation. Batch
                        exports send data in scheduled chunks, ideal for data warehouses and large-scale processing.
                    </li>
                    <li>
                        <strong>Can I send data to multiple destinations?</strong>
                        <br />
                        Yes! Create as many webhook destinations as you need. Each can have different filters and
                        transformations. Many teams use separate webhooks for alerts, CRM sync, and marketing
                        automation.
                    </li>
                    <li>
                        <strong>How reliable are webhooks?</strong>
                        <br />
                        PostHog automatically retries failed requests up to 3 times. We monitor destination performance
                        and alert you to issues. For critical data, combine webhooks with batch exports as a backup.
                    </li>
                    <li>
                        <strong>Can I customize the webhook payload?</strong>
                        <br />
                        Absolutely. Use our template syntax to shape data exactly how your destination expects it. For
                        advanced cases, write custom Hog code to transform data however you need.
                    </li>
                </ul>

                <h2>Hog FAQ</h2>
                <ul>
                    <li>
                        <strong>How is Hog different from HogQL?</strong>
                        <br />
                        HogQL is our SQL dialect for querying data. Hog is a full programming language for transforming
                        and routing data in real-time. While HogQL queries your data, Hog processes it as it flows
                        through your pipeline.
                    </li>
                    <li>
                        <strong>Can I test Hog code locally?</strong>
                        <br />
                        Yes! Clone the PostHog repo and use `bin/hog` to run .hog files locally. You can also compile to
                        bytecode with `bin/hoge` for debugging.
                    </li>
                    <li>
                        <strong>Why 1-indexed arrays?</strong>
                        <br />
                        Hog is SQL-compatible, and SQL has always used 1-indexed arrays. While it might feel odd coming
                        from other languages, it ensures consistency with our SQL expressions.
                    </li>
                </ul>
            </ReaderView>
        </>
    )
}
