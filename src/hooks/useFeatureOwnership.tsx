import React, { useMemo } from 'react'
import TeamMember from '../components/TeamMember'
import { PrivateLink } from '../components/PrivateLink'
import SmallTeam from 'components/SmallTeam'

export interface Feature {
    slug: string
    feature: string
    owner: string[]
    notes?: React.ReactNode
    label: string | string[] | false
}

interface BaseFeature {
    feature: string
    owner: string[]
    notes?: React.ReactNode
    label?: string | string[] | false
}

const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

const FEATURE_DATA: Record<string, BaseFeature> = {
    actions: {
        feature: 'Actions',
        owner: ['analytics-platform'],
    },
    'activity-log': {
        feature: 'Activity log',
        owner: ['platform-features'],
    },
    'activity-view': {
        feature: 'Activity view',
        owner: ['product-analytics'],
        label: 'feature/events',
    },
    alerts: {
        feature: 'Alerts',
        owner: ['analytics-platform'],
    },
    annotations: {
        feature: 'Annotations',
        owner: ['product-analytics'],
    },
    'api-structure': {
        feature: 'API structure',
        owner: [],
        notes: <>Shared responsibility, with features owned by the relevant small team.</>,
    },
    authentication: {
        feature: 'Authentication',
        owner: ['platform-features'],
    },
    autocapture: {
        feature: 'Autocapture',
        owner: ['analytics-platform', 'web-analytics'],
    },
    'base-currency': {
        feature: 'Base currency',
        owner: ['web-analytics'],
        label: 'feature/currency',
    },
    'batch-exports': {
        feature: 'Batch exports',
        owner: ['batch-exports'],
    },
    billing: {
        feature: 'Billing',
        owner: ['billing'],
    },
    'cache-warming': {
        feature: 'Cache warming',
        owner: ['analytics-platform'],
    },
    'client-libraries': {
        feature: 'Client libraries',
        owner: ['client-libraries'],
        notes: <em>See SDKs</em>,
        label: false,
    },
    cohorts: {
        feature: 'Cohorts',
        owner: ['feature-flags'],
    },
    'command-palette': {
        feature: 'Command palette',
        owner: ['platform-ux'],
        label: 'feature/command-bar',
    },
    comments: {
        feature: 'Comments/Discussions',
        owner: ['platform-features'],
        label: 'feature/comments',
    },
    'csp-tracking': {
        feature: 'CSP tracking',
        owner: ['web-analytics'],
        label: 'feature/csp-tracking',
    },
    'currency-rate-dataset': {
        feature: 'Currency rate dataset',
        owner: ['growth', 'customer-analytics'],
        label: 'feature/currency-rate',
    },
    'customer-analytics': {
        feature: 'Customer Analytics',
        owner: ['customer-analytics'],
    },
    dashboards: {
        feature: 'Dashboards',
        owner: ['product-analytics', 'analytics-platform'],
    },
    'dashboard-templates': {
        feature: 'Dashboard templates',
        owner: ['analytics-platform'],
    },
    'data-colors-themes': {
        feature: 'Data colors & themes',
        owner: ['analytics-platform'],
        label: 'feature/colors-and-themes',
    },
    'data-management': {
        feature: 'Data management',
        owner: ['analytics-platform'],
    },
    'data-table': {
        feature: 'Data table',
        owner: ['product-analytics'],
    },
    'data-visualization': {
        feature: 'Data visualization',
        owner: ['data-stack'],
    },
    'data-pipelines': {
        feature: 'Data pipelines',
        owner: ['workflows'],
        label: 'feature/pipeline',
    },
    'data-warehouse': {
        feature: 'Data warehouse',
        owner: ['data-stack'],
    },
    'early-access-features': {
        feature: 'Early access features',
        owner: ['feature-flags'],
        label: 'feature/feature-flags',
    },
    endpoints: {
        feature: 'Endpoints',
        owner: ['data-stack'],
    },
    'error-tracking': {
        feature: 'Error tracking',
        owner: ['error-tracking'],
    },
    experimentation: {
        feature: 'Experiments',
        owner: ['experiments'],
        label: ['experiments/new-engine', 'experiments/no-code'],
    },
    'feature-flags': {
        feature: 'Feature flags',
        owner: ['feature-flags'],
    },
    feed: {
        feature: 'Feed',
        owner: ['growth'],
    },
    'group-analytics': {
        feature: 'Group analytics',
        owner: ['customer-analytics'],
    },
    heatmaps: {
        feature: 'Heatmaps',
        owner: ['web-analytics'],
    },
    hogql: {
        feature: 'HogQL',
        owner: ['data-stack'],
        label: 'feature/dashboards',
    },
    ingestion: {
        feature: 'Ingestion',
        owner: ['ingestion'],
        label: 'feature/team-ingestion',
    },
    insights: {
        feature: 'Insights',
        owner: ['product-analytics'],
    },
    'internal-messaging': {
        feature: 'Internal messaging (email, notifications)',
        owner: ['platform-features'],
        label: 'feature/notifications',
    },
    'live-events': {
        feature: 'Live events',
        owner: ['clickhouse'],
        label: false,
    },
    'managed-migrations': {
        feature: 'Managed migrations',
        owner: ['ingestion'],
    },
    'marketing-analytics': {
        feature: 'Marketing analytics',
        owner: ['web-analytics'],
    },
    'mcp-server': {
        feature: 'MCP server',
        owner: ['posthog-ai'],
        label: 'feature/mcp',
    },
    notebooks: {
        feature: 'Notebooks',
        notes: (
            <>
                Owns the notebooks feature and triages other tickets out to the right owner (e.g. insights in notebooks
                is owned by product analytics)
            </>
        ),
        owner: ['platform-features'],
        label: 'feature/notebooks',
    },
    onboarding: {
        feature: 'Onboarding',
        owner: ['growth'],
    },
    'organization-management-deletion': {
        feature: 'Organization Management & Deletion',
        owner: ['platform-features'],
    },
    'path-cleaning': {
        feature: 'Path cleaning',
        owner: ['web-analytics'],
    },
    permissions: {
        feature: 'Permissions and access control',
        owner: ['platform-features'],
        label: 'feature/permissions',
    },
    persons: {
        feature: 'Persons',
        owner: ['ingestion'],
    },
    'persons-view': {
        feature: 'Persons view',
        owner: ['product-analytics'],
        label: 'feature/persons',
    },
    'pipeline-transformations': {
        feature: 'Pipeline transformations',
        owner: ['workflows'],
        label: 'feature/pipelines',
    },
    'pipeline-destinations': {
        feature: 'Pipeline destinations',
        owner: ['workflows'],
        label: 'feature/cdp',
    },
    'pipeline-sources': {
        feature: 'Pipeline sources',
        owner: ['warehouse-sources'],
        label: 'feature/pipelines',
    },
    platform: {
        feature: 'Platform (US + EU)',
        owner: ['infrastructure'],
        label: 'feature/platform',
    },
    'PostHog.com': {
        feature: 'PostHog.com',
        owner: ['brand'],
        label: false,
    },
    'posthog-ai': {
        feature: 'PostHog AI platform',
        owner: ['posthog-ai'],
        label: 'feature/posthog-ai',
    },
    'project-homepage': {
        feature: 'Project homepage',
        owner: ['platform-ux'],
        label: 'feature/home',
    },
    'property-filters': {
        feature: 'Property filters',
        owner: ['platform-ux'],
        label: 'feature/filters',
    },
    qaas: {
        feature: 'Queries as a Service',
        owner: ['data-stack'],
        label: 'feature/qaas',
    },
    'query-performance': {
        feature: 'Query performance',
        owner: ['analytics-platform'],
        label: 'feature/insights',
    },
    'quota-limiting': {
        feature: 'Quota limiting',
        owner: ['billing', 'platform-features'],
        label: false,
    },
    replay: {
        feature: 'Replay',
        owner: ['replay'],
    },
    'revenue-analytics': {
        feature: 'Revenue analytics',
        owner: ['customer-analytics', 'growth'],
    },
    'revenue-data-management': {
        feature: 'Revenue data management',
        owner: ['customer-analytics', 'growth'],
    },
    sdks: {
        feature: 'SDKs & client libraries (web, server-side)',
        owner: ['client-libraries'],
        notes: (
            <>
                Shared responsibility, with features owned by the relevant small team, or try{' '}
                <PrivateLink url="https://posthog.slack.com/archives/C04MZFDA5KK">
                    #support-client-libraries
                </PrivateLink>
                . There is an engineer assigned to SDK support on a rotating schedule. Check the{' '}
                <PrivateLink url="https://app.incident.io/posthog/on-call/schedules/01K8WVCP2MD6JK1TEGAK97450S">
                    incident.io schedule
                </PrivateLink>
                .
                <br />
                <br />
                <strong>
                    For Mobile SDK issues, defer to the Mobile folks (@mobile-folks or @client-libraries-folks on Slack)
                    first.
                </strong>
            </>
        ),
        label: 'feature/libraries',
    },
    'sdks-doctor': {
        feature: 'SDK doctor',
        owner: ['growth'],
        label: 'feature/sdk-doctor',
    },
    'sdks-mobile': {
        feature: 'SDKs (mobile)',
        owner: ['client-libraries'],
        notes: (
            <>
                Shared responsibility, with features owned by the relevant small team, or try{' '}
                <PrivateLink url="https://app.slack.com/client/TSS5W8YQZ/C0643MHR56X">#support-mobile</PrivateLink>.
                There is an engineer assigned to SDK support on a rotating schedule. Check the{' '}
                <PrivateLink url="https://app.incident.io/posthog/on-call/schedules/01K8WVCP2MA3TWXS41E7Y5N4AQ">
                    incident.io schedule
                </PrivateLink>
                .
            </>
        ),
        label: 'feature/mobile',
    },
    search: {
        feature: 'Search',
        owner: ['platform-ux'],
        label: false,
    },
    security: {
        feature: 'Security',
        owner: ['infrastructure'],
        notes: <>It's every team's job to consider and react to security issues.</>,
    },
    'self-hosting': {
        feature: 'Self-hosting',
        owner: ['infrastructure'],
        label: false,
    },
    'sentry-integration': {
        feature: 'Sentry integration',
        owner: ['error-tracking'],
        label: 'feature/error-tracking',
    },
    'session-analytics': {
        feature: 'Session analytics',
        owner: ['web-analytics'],
        label: 'feature/sessions',
    },
    'session-explorer': {
        feature: 'Session explorer',
        owner: ['web-analytics'],
        label: 'feature/session-explorer',
    },
    settings: {
        feature: 'Settings structure (personal & project)',
        owner: ['platform-ux'],
        notes: <>All teams manage their own settings</>,
        label: 'feature/settings',
    },
    'source-maps': {
        feature: 'Source maps',
        owner: ['error-tracking'],
    },
    'sql-editor': {
        feature: 'SQL editor',
        owner: ['data-stack'],
    },
    'sql-insights': {
        feature: 'SQL insights',
        owner: ['data-stack'],
        label: false,
    },
    sso: {
        feature: 'SSO',
        owner: ['platform-features'],
        label: false,
    },
    'statistical-analysis': {
        feature: 'Statistical analysis',
        owner: ['product-analytics'],
    },
    subscriptions: {
        feature: 'Subscriptions',
        owner: ['analytics-platform'],
    },
    surveys: {
        feature: 'Surveys',
        owner: ['surveys'],
    },
    'table-exports': {
        feature: 'Table exports',
        owner: ['analytics-platform'],
    },
    terraform: {
        feature: 'Terraform integration',
        owner: ['analytics-platform'],
        label: 'feature/terraform',
    },
    'taxonomic-filters': {
        feature: 'Taxonomic filters',
        owner: ['platform-ux'],
    },
    toolbar: {
        feature: 'Toolbar',
        owner: ['growth'],
    },
    'usage-reports': {
        feature: 'Usage reports',
        owner: ['billing', 'platform-features'],
        label: false,
    },
    variables: {
        feature: 'Variables',
        owner: ['product-analytics'],
    },
    'web-analytics': {
        feature: 'Web analytics',
        owner: ['web-analytics'],
    },
    'webhook-delivery': {
        feature: 'Webhook delivery service',
        owner: ['workflows'],
        label: 'feature/pipelines',
    },
    'weekly-digest': {
        feature: 'Weekly digest',
        owner: ['growth'],
    },
    workflows: {
        feature: 'Workflows',
        owner: ['workflows'],
        label: 'feature/workflows',
    },
    wizard: {
        feature: 'Wizard',
        owner: ['docs-wizard'],
    },
}

export const useFeatureOwnership = ({ teamSlug }: { teamSlug?: string } = {}): { features: Feature[] } => {
    const features = Object.entries(FEATURE_DATA).reduce((acc, [key, feature]) => {
        const featureWithSlug: Feature = {
            ...feature,
            slug: key,
            label: feature.label !== undefined ? feature.label : `feature/${slugify(feature.feature)}`,
        }

        return {
            ...acc,
            [key]: featureWithSlug,
        }
    }, {} as Record<string, Feature>)

    const filteredFeatures = useMemo(() => {
        const sortedFeatures = Object.values(features).sort((a, b) => a.feature.localeCompare(b.feature))
        if (!teamSlug) {
            return sortedFeatures
        }
        return sortedFeatures.filter((feature) => feature.owner.includes(teamSlug))
    }, [teamSlug])

    return {
        features: filteredFeatures,
    }
}
