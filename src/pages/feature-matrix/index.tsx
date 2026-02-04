import React from 'react'
import OSButton from 'components/OSButton'
import SEO from 'components/seo'
import ProductComparisonTable from 'components/ProductComparisonTable'

// Import product data to get competitor lists
import { productAnalytics } from 'hooks/productData/product_analytics'
import { webAnalytics } from 'hooks/productData/web_analytics'
import { sessionReplay } from 'hooks/productData/session_replay'
import { featureFlags } from 'hooks/productData/feature_flags'
import { experiments } from 'hooks/productData/experiments'
import { surveys } from 'hooks/productData/surveys'
import { errorTracking } from 'hooks/productData/error_tracking'
import { workflows } from 'hooks/productData/workflows'
import { logs } from 'hooks/productData/logs'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { internalToolsNav } from '../../navs/internalTools'

// Create table of contents for right sidebar
const tableOfContents = [
    {
        value: 'All products',
        url: 'all-products',
        depth: 0,
    },
    {
        value: 'Product Analytics',
        url: 'product-analytics',
        depth: 0,
    },
    {
        value: 'Web Analytics',
        url: 'web-analytics',
        depth: 0,
    },
    {
        value: 'Session Replay',
        url: 'session-replay',
        depth: 0,
    },
    {
        value: 'Feature Flags',
        url: 'feature-flags',
        depth: 0,
    },
    {
        value: 'Experiments',
        url: 'experiments',
        depth: 0,
    },
    {
        value: 'Surveys',
        url: 'surveys',
        depth: 0,
    },
    {
        value: 'Error Tracking',
        url: 'error-tracking',
        depth: 0,
    },
    {
        value: 'Heatmaps',
        url: 'heatmaps',
        depth: 0,
    },
    {
        value: 'Workflows',
        url: 'workflows',
        depth: 0,
    },
    {
        value: 'Customer Data Platform',
        url: 'cdp',
        depth: 0,
    },
    {
        value: 'Data Warehouse',
        url: 'data-warehouse',
        depth: 0,
    },
    {
        value: 'Dashboards',
        url: 'dashboards',
        depth: 0,
    },
    {
        value: 'Logs',
        url: 'logs',
        depth: 0,
    },
    {
        value: 'Platform',
        url: 'platform',
        depth: 0,
    },
]

export default function FeatureMatrix(): JSX.Element {
    // Helper function to sort competitors with PostHog first
    const sortCompetitors = (competitors: string[]) => {
        return competitors.sort((a, b) => {
            if (a === 'posthog') return -1
            if (b === 'posthog') return 1
            return a.localeCompare(b)
        })
    }

    // Extract competitor keys from each product's companies list
    const productAnalyticsCompetitors = sortCompetitors(productAnalytics.comparison.companies.map((c: any) => c.key))
    const webAnalyticsCompetitors = sortCompetitors(webAnalytics.comparison.companies.map((c: any) => c.key))
    const sessionReplayCompetitors = sortCompetitors(sessionReplay.comparison.companies.map((c: any) => c.key))
    const featureFlagsCompetitors = sortCompetitors(featureFlags.comparison.companies.map((c: any) => c.key))
    const experimentsCompetitors = sortCompetitors(experiments.comparison.companies.map((c: any) => c.key))
    const surveysCompetitors = sortCompetitors(surveys.comparison.companies.map((c: any) => c.key))
    const errorTrackingCompetitors = sortCompetitors(errorTracking.comparison.companies.map((c: any) => c.key))
    const workflowsCompetitors = sortCompetitors(workflows.comparison.companies.map((c: any) => c.key))
    const logsCompetitors = sortCompetitors(logs.comparison.companies.map((c: any) => c.key))
    // Get all unique competitors for platform sections (union of all product competitors)
    const allCompetitors = Array.from(
        new Set([
            ...productAnalyticsCompetitors,
            ...webAnalyticsCompetitors,
            ...sessionReplayCompetitors,
            ...featureFlagsCompetitors,
            ...experimentsCompetitors,
            ...surveysCompetitors,
            ...errorTrackingCompetitors,
            ...workflowsCompetitors,
            ...logsCompetitors,
        ])
    ).sort((a, b) => {
        // Keep posthog first
        if (a === 'posthog') return -1
        if (b === 'posthog') return 1
        return a.localeCompare(b)
    })

    return (
        <>
            <SEO
                title="Feature matrix - PostHog vs the world"
                description="Complete comparison matrix of PostHog against all competitors across all products and features"
                image={`/images/og/default.png`}
            />
            <ReaderView
                title="Feature matrix"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                tableOfContents={tableOfContents}
                description="Complete comparison of PostHog against all competitors across all products, features, and platform capabilities"
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <div className="space-y-8">
                        <section>
                            <div className="bg-accent p-4 rounded border border-primary mt-4">
                                <p className="mt-0">
                                    This is an internal playground for the <code>&lt;ProductComparisonTable /&gt;</code>{' '}
                                    component used on competitor comparison pages.
                                </p>
                                <p className="mb-0">
                                    <OSButton
                                        asLink
                                        to="/handbook/engineering/posthog-com/product-comparisons"
                                        variant="secondary"
                                        size="md"
                                        state={{ newWindow: true }}
                                    >
                                        Visit the documentation
                                    </OSButton>
                                </p>
                            </div>
                        </section>
                        {/* Products Overview */}
                        <section id="all-products">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">All products</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={allCompetitors}
                                rows={[
                                    'product_analytics',
                                    'web_analytics',
                                    'session_replay',
                                    'feature_flags',
                                    'experiments',
                                    'surveys',
                                    'error_tracking',
                                    'heatmaps',
                                    'cdp',
                                    'data_warehouse',
                                    'dashboards',
                                    'logs',
                                ]}
                            />
                        </section>

                        {/* Product Analytics */}
                        <section id="product-analytics">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">
                                Product Analytics
                            </h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={productAnalyticsCompetitors}
                                rows={[
                                    'product_analytics.features',
                                    'product_analytics.insights.features',
                                    'product_analytics.trends.features',
                                    'product_analytics.funnels.features',
                                    'product_analytics.user_paths.features',
                                    'product_analytics.retention.features',
                                    'product_analytics.cohorts.features',
                                    'product_analytics.group_analytics',
                                    'product_analytics.lifecycle.features',
                                    'product_analytics.stickiness.features',
                                    'product_analytics.pricing.free_tier',
                                ]}
                            />
                        </section>

                        {/* Web Analytics */}
                        <section id="web-analytics">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Web Analytics</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={webAnalyticsCompetitors}
                                rows={['web_analytics.features']}
                            />
                        </section>

                        {/* Session Replay */}
                        <section id="session-replay">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Session Replay</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={sessionReplayCompetitors}
                                rows={[
                                    'session_replay.features',
                                    'session_replay.platform_support.features',
                                    'session_replay.analysis.features',
                                    'session_replay.ai.features',
                                    'session_replay.targeting.features',
                                    'session_replay.organization.features',
                                    'session_replay.detection.features',
                                    'session_replay.privacy.features',
                                    'session_replay.export.features',
                                    'session_replay.identity.features',
                                ]}
                            />
                        </section>

                        {/* Feature Flags */}
                        <section id="feature-flags">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Feature Flags</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={featureFlagsCompetitors}
                                rows={[
                                    'feature_flags.features.features',
                                    'feature_flags.implementation.features',
                                    'feature_flags.targeting.features',
                                    'feature_flags.management.features',
                                ]}
                            />
                        </section>

                        {/* Experiments */}
                        <section id="experiments">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Experiments</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={experimentsCompetitors}
                                rows={[
                                    'experiments.features',
                                    'experiments.supported_tests.features',
                                    'experiments.targeting.features',
                                ]}
                            />
                        </section>

                        {/* Surveys */}
                        <section id="surveys">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Surveys</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={surveysCompetitors}
                                rows={[
                                    'surveys.question_types.features',
                                    'surveys.templates.features',
                                    'surveys.targeting.features',
                                    'surveys.presentation.features',
                                    'surveys.branching.features',
                                    'surveys.integrations.features',
                                    'surveys.implementation.features',
                                    'surveys.features',
                                ]}
                            />
                        </section>

                        {/* Error Tracking */}
                        <section id="error-tracking">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Error Tracking</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={errorTrackingCompetitors}
                                rows={[
                                    'error_tracking.features.features',
                                    'error_tracking.monitoring.features',
                                    'error_tracking.integrations.features',
                                ]}
                            />
                        </section>

                        {/* Heatmaps */}
                        <section id="heatmaps">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Heatmaps</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={allCompetitors}
                                rows={['heatmaps.features']}
                            />
                        </section>

                        {/* CDP */}
                        <section id="cdp">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">
                                Customer Data Platform
                            </h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={allCompetitors}
                                rows={[
                                    'cdp.sources_destinations.features',
                                    'cdp.data_transformation.features',
                                    'cdp.reliability.features',
                                ]}
                            />
                        </section>

                        {/* Data Warehouse */}
                        <section id="data-warehouse">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Data Warehouse</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={allCompetitors}
                                rows={[
                                    'data_warehouse.query.features',
                                    'data_warehouse.insights.features',
                                    'data_warehouse.exploration.features',
                                    'data_warehouse.external_sources.features',
                                    'data_warehouse.api.features',
                                ]}
                            />
                        </section>

                        {/* Dashboards */}
                        <section id="dashboards">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Dashboards</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={allCompetitors}
                                rows={['dashboards.features']}
                            />
                        </section>

                        {/* Logs */}
                        <section id="logs">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Logs</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={logsCompetitors}
                                rows={['logs', 'logs.pricing.features']}
                            />
                        </section>

                        {/* Platform */}
                        <section id="platform">
                            <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Platform</h2>
                            <ProductComparisonTable
                                width="full"
                                competitors={allCompetitors}
                                rows={[
                                    { label: 'Deployment' },
                                    'platform.deployment.open_source',
                                    'platform.deployment.self_host',
                                    'platform.deployment.eu_hosting',
                                    { label: 'Pricing' },
                                    'platform.pricing.usage_based_pricing',
                                    'platform.pricing.transparent_pricing',
                                    'platform.pricing.free_tier',
                                    { label: 'Developer' },
                                    'platform.developer.api',
                                    'platform.developer.sdks',
                                    'platform.developer.server_side_sdks',
                                    'platform.developer.mobile_sdks',
                                    { label: 'Integrations' },
                                    'data_warehouse.features.warehouse_sources',
                                    'data_warehouse.features.batch_exports',
                                    'cdp.features.realtime_streaming',
                                    'platform.integrations.csv_exports',
                                    'platform.integrations.redshift',
                                    'platform.integrations.s3',
                                    'platform.integrations.azure_blob',
                                    'platform.integrations.gcs',
                                    'platform.integrations.snowflake',
                                    'platform.integrations.bigquery',
                                    'platform.integrations.rudderstack',
                                    'platform.integrations.segment',
                                    'platform.integrations.slack',
                                    'platform.integrations.microsoft_teams',
                                    'platform.integrations.salesforce',
                                    'platform.integrations.hubspot',
                                    'platform.integrations.stripe',
                                    'platform.integrations.zendesk',
                                    'platform.integrations.zapier',
                                    'platform.integrations.sentry',
                                    'platform.integrations.intercom',
                                    'platform.integrations.customer_io',
                                    'platform.integrations.email_reports',
                                    'platform.integrations.wordpress',
                                    { label: 'Security & Compliance' },
                                    'platform.security.gdpr_ready',
                                    'platform.security.hipaa_ready',
                                    'platform.security.data_anonymization',
                                    'platform.security.cookieless_tracking',
                                    'platform.security.soc2_certified',
                                    'platform.security.two_factor_auth',
                                    'platform.security.saml_sso',
                                    'platform.security.bot_blocking',
                                    'platform.deployment.reverse_proxy',
                                ]}
                            />
                        </section>
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
