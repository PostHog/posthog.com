import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import { TreeMenu } from 'components/TreeMenu'
import { productOSNav } from 'hooks/useProductOSNavigation'

const LeftSidebarContent = () => {
    return <TreeMenu items={productOSNav.children} />
}

export default function API() {
    const apiProduct = useProduct({ handle: 'api' }) as any

    if (!apiProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots, seo } = apiProduct

    return (
        <>
            <SEO title={seo?.title || 'API - PostHog'} description={seo?.description} image="/images/og/default.png" />
            <ReaderView leftSidebar={<LeftSidebarContent />}>
                <div className="space-y-8">
                    <div>
                        <div className="flex gap-2 items-center">
                            {Icon && (
                                <div className={`size-8 my-4 text-${color}`}>
                                    <Icon />
                                </div>
                            )}
                            <h1 className="!m-0">{name}</h1>
                        </div>
                        <h2 className="!m-0 pb-2">REST APIs for everything</h2>
                        <p>
                            Capture events, query data, manage feature flags, and control every aspect of PostHog
                            programmatically.
                        </p>
                    </div>

                    {screenshots && screenshots.overview && (
                        <CloudinaryImage
                            src={screenshots.overview.src}
                            alt={screenshots.overview.alt}
                            className="w-full rounded-md shadow-lg"
                        />
                    )}

                    <div>
                        <div className="space-y-6">
                            <div>
                                <p>
                                    Query insights, manage feature flags, create cohorts, export data, and automate
                                    workflows. If you can do it in the UI, you can do it via API.
                                </p>
                                <ul>
                                    <li>
                                        <strong>Event capture:</strong> Send events from any language or platform
                                    </li>
                                    <li>
                                        <strong>Query API:</strong> Execute HogQL queries and fetch insights
                                        programmatically
                                    </li>
                                    <li>
                                        <strong>Feature flags:</strong> Evaluate and manage feature flags via API
                                    </li>
                                    <li>
                                        <strong>Persons & cohorts:</strong> Create and manage user profiles and segments
                                    </li>
                                    <li>
                                        <strong>Annotations:</strong> Add context to your data programmatically
                                    </li>
                                    <li>
                                        <strong>Dashboards:</strong> Create and update dashboards via API
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3>No rate limits on event capture</h3>
                                <p>
                                    Send as many events as you need without worrying about rate limits. We handle
                                    billions of events daily and our infrastructure scales automatically with your
                                    growth.
                                </p>
                                <div
                                    data-scheme="secondary"
                                    className="@2xl:float-right @2xl:max-w-sm @2xl:ml-4 bg-primary rounded-md p-4 mt-4"
                                >
                                    <p className="mb-2 mt-0">
                                        <strong>Built for scale:</strong>
                                    </p>
                                    <ul className="mb-0">
                                        <li>No rate limits on event ingestion</li>
                                        <li>Automatic batching and retry logic in SDKs</li>
                                        <li>99.9% uptime SLA for enterprise customers</li>
                                        <li>Global CDN for minimal latency</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3>Real-time data access</h3>
                                <p>
                                    Query your data immediately after it's captured. No waiting for batch processing or
                                    ETL pipelines. Perfect for building live dashboards, real-time personalization, and
                                    instant analytics.
                                </p>
                            </div>

                            <div>
                                <h3>Authentication & security</h3>
                                <p>Multiple authentication methods to keep your data secure:</p>
                                <ul>
                                    <li>
                                        <strong>Project API keys:</strong> For client-side event capture (safe to
                                        expose)
                                    </li>
                                    <li>
                                        <strong>Personal API keys:</strong> For server-side operations and data access
                                    </li>
                                    <li>
                                        <strong>Scoped tokens:</strong> Create tokens with specific permissions
                                    </li>
                                    <li>
                                        <strong>IP allowlisting:</strong> Restrict API access by IP address
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3>Webhook integrations</h3>
                                <p>
                                    Send data to PostHog or receive events when things happen. Connect with thousands of
                                    tools through webhooks, Zapier, and our Customer Data Platform.
                                </p>
                            </div>

                            <div>
                                <h3>Comprehensive documentation</h3>
                                <p>
                                    Get up and running quickly with detailed guides, API references, and example code
                                    for every endpoint and SDK.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <OSButton asLink variant="primary" size="md" to="/docs/api" state={{ newWindow: true }}>
                            Explore API documentation
                        </OSButton>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
