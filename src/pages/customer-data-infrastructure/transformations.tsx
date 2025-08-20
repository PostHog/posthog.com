import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function Transformations(): JSX.Element {
    return (
        <>
            <SEO
                title="Transform Data - Customer Data Infrastructure - PostHog"
                description="Learn how to transform and enrich your data in PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Transform Data">
                <p>
                    PostHog provides powerful tools to transform, enrich, and model your data to extract maximum value
                    from your analytics.
                </p>

                <h2>Events transformations</h2>
                <p>Transform event data as it flows through PostHog using our transformation apps and Hog functions.</p>

                <h3>Data in: Using transformations (with Hog)</h3>
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
                    <Link to="/docs/cdp/transformation-apps" state={{ newWindow: true }}>
                        Learn about transformation apps →
                    </Link>
                </p>

                <h3>Data out: Using transformations (with Hog)</h3>
                <p>Transform data before sending it to external destinations:</p>
                <ul>
                    <li>
                        <strong>Format conversion:</strong> Convert PostHog events to match destination schemas
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

                <h2>Warehouse source transformations</h2>
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

                <p>
                    Need help with data transformations?{' '}
                    <Link to="/slack" state={{ newWindow: true }}>
                        Join our Slack community
                    </Link>{' '}
                    or{' '}
                    <Link to="/docs/data-warehouse" state={{ newWindow: true }}>
                        check the documentation
                    </Link>
                    .
                </p>
            </ReaderView>
        </>
    )
}
