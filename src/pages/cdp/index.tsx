import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import Link from 'components/Link'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import IntegrationsLibrary from 'components/IntegrationsLibrary'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function CDP(): JSX.Element {
    return (
        <>
            <SEO
                title="CDP sources & destinations"
                description="Get all your data into PostHog with 60+ sources & destinations"
                image={`images/og/cdp.jpg`}
            />
            <ReaderView leftSidebar={<LeftSidebarContent />}>
                <h1 className="mx-auto transition-all max-w-full">PostHog CDP</h1>
                <h2 className="text-2xl font-bold my-4">Ingest, transform, and send data between hundreds of tools</h2>

                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/w_800,c_limit,q_auto,f_auto/pipelines_e52c3f0e53.png"
                    className="not-prose @lg:float-right @lg:max-w-[250px] @xl:max-w-[300px] @lg:ml-4"
                />
                <p>
                    PostHog's CDP makes it easy to transform events as they arrive, and sync them over to other services
                    that you use to run your business.
                </p>
                <p>
                    Any event or action in PostHog can update user records or trigger workflows in other products in
                    your stack.
                </p>

                <h2>Realtime event transformations</h2>
                <p>
                    Our realtime transformation apps and{' '}
                    <Link to="/docs/hog" state={{ newWindow: true }}>
                        Hog functions
                    </Link>{' '}
                    allow you to transform event data before it is saved to your PostHog events store. This means event
                    data can be cleaned and curated at ingestion time, ensuring high data quality from the start.
                </p>

                <p>Apply realtime transformations to incoming event data before it's stored for:</p>
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
                        Learn about realtime transformations &rarr;
                    </Link>
                </p>

                <h2>Realtime event streaming</h2>
                <p>Stream events to external systems in real-time as they are ingested into PostHog.</p>
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
                        Explore event destinations →
                    </Link>
                </p>

                <h2>Webhooks</h2>
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

                <h2>Common CDP use-cases</h2>

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

                <h2 id="integrations-library">Integrations library</h2>
                <IntegrationsLibrary />
            </ReaderView>
        </>
    )
}
