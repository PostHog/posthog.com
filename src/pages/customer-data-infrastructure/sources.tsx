import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import DWInstallationPlatforms from '../../../contents/docs/data-warehouse/_snippets/dw-installation-platforms'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function Sources(): JSX.Element {
    return (
        <>
            <SEO
                title="Data sources & import - Customer data infrastructure - PostHog"
                description="Learn about all the ways to get data into PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Data sources & import (ELT)">
                <p>
                    PostHog provides multiple ways to import data from various sources, making it easy to centralize all
                    your customer, product, and business data in one place.
                </p>

                <h2>1. Bulk import sources</h2>
                <p>
                    Connect your external databases, SaaS tools, ad platforms, and more to sync raw data in bulk into
                    PostHog for analysis and modeling.
                </p>
                <div className="max-w-2xl">
                    <DWInstallationPlatforms showFiltering={true} maxItems={10} />
                </div>
                <p>
                    <Link to="/docs/data-warehouse/sources" state={{ newWindow: true }}>
                        View all import sources →
                    </Link>
                </p>

                <h2>2. PostHog event capture & user identification</h2>
                <p>
                    Our SDKs and event pipelines are the primary way to track user behavior and product usage in
                    real-time. After capture, they're automatically available in your warehouse for detailed analysis
                    alongside your other imported data.
                </p>
                <p>
                    <Link to="/docs/getting-started/install?tab=sdks" state={{ newWindow: true }}>
                        View all PostHog libraries →
                    </Link>
                    <span className="mx-2">|</span>
                    <Link to="/docs/getting-started/install?tab=guides" state={{ newWindow: true }}>
                        View frameworks guides →
                    </Link>
                </p>

                <h2>3. Incoming webhooks</h2>
                <p>
                    Send events to PostHog from external services using webhooks. This allows you to track events that
                    happen outside your application.
                </p>
                <p>
                    <Link to="/docs/cdp/sources/incoming-webhooks">Set up event webhooks →</Link>
                </p>

                <h2>4. Capture API</h2>
                <p>
                    Our direct API endpoints let you send events from any system that can make HTTP requests. Our SDKs
                    cover most use-cases, but if we're missing an SDK you need then this is the API you'll use.
                </p>
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
                        <strong>For business data:</strong> Connect your databases, CRM, or payment processor via
                        warehouse sources
                    </li>
                    <li>
                        <strong>For product analytics:</strong> Start with our JavaScript SDK for web apps or mobile
                        SDKs for native apps
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
