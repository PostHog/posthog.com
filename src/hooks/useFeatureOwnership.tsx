import React, { useMemo } from 'react'
import TeamMember from '../components/TeamMember'
import { PrivateLink } from '../components/PrivateLink'

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
        owner: ['revenue-analytics'],
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
        owner: [],
        notes: <em>See SDKs</em>,
        label: false,
    },
    cohorts: {
        feature: 'Cohorts',
        owner: ['feature-flags'],
    },
    comments: {
        feature: 'Comments/Discussions',
        owner: ['platform-features'],
        label: 'feature/comments',
    },
    'currency-rate-dataset': {
        feature: 'Currency rate dataset',
        owner: ['revenue-analytics'],
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
        owner: ['data-warehouse'],
    },
    'data-pipelines': {
        feature: 'Data pipelines',
        owner: ['messaging'],
        label: 'feature/pipeline',
    },
    'data-warehouse': {
        feature: 'Data warehouse',
        owner: ['data-warehouse'],
    },
    'early-access-features': {
        feature: 'Early access features',
        owner: ['feature-flags'],
        label: 'feature/feature-flags',
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
    'group-analytics': {
        feature: 'Group analytics',
        owner: ['customer-analytics'],
    },
    heatmaps: {
        feature: 'Heatmaps',
        owner: ['replay'],
    },
    hogql: {
        feature: 'HogQL',
        owner: ['data-warehouse'],
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
    'max-ai': {
        feature: 'Max AI platform',
        owner: ['max-ai'],
        label: 'feature/max-ai',
    },
    'mcp-server': {
        feature: 'MCP server',
        owner: ['max-ai'],
        label: 'feature/mcp',
    },
    messaging: {
        feature: 'Messaging',
        owner: ['messaging'],
    },
    notebooks: {
        feature: 'Notebooks',
        owner: [],
        notes: (
            <>
                <TeamMember name="David Newell" photo />
            </>
        ),
    },
    onboarding: {
        feature: 'Onboarding',
        owner: ['content'],
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
        owner: ['messaging'],
        label: 'feature/pipelines',
    },
    'pipeline-destinations': {
        feature: 'Pipeline destinations',
        owner: ['messaging'],
        label: 'feature/cdp',
    },
    'pipeline-sources': {
        feature: 'Pipeline sources',
        owner: ['data-warehouse'],
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
        owner: ['data-warehouse'],
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
        owner: ['revenue-analytics'],
    },
    'revenue-data-management': {
        feature: 'Revenue data management',
        owner: ['revenue-analytics'],
    },
    sdks: {
        feature: 'SDKs & client libraries (web, server-side)',
        owner: [],
        notes: (
            <>
                Shared responsibility, with features owned by the relevant small team, or try{' '}
                <PrivateLink url="https://posthog.slack.com/archives/C04MZFDA5KK">
                    #support-client-libraries
                </PrivateLink>
                . There is an engineer assigned to SDK support on a rotating schedule. Check the{' '}
                <PrivateLink url="https://posthog.pagerduty.com/schedules#P7B7NTR">Pager Duty schedule</PrivateLink>.
                <br />
                <br />
                <strong>For Mobile SDK issues, defer to the Mobile group first.</strong>
            </>
        ),
        label: 'feature/libraries',
    },
    'sdks-mobile': {
        feature: 'SDKs (mobile)',
        owner: [''],
        notes: (
            <>
                Shared responsibility with the relevant small team for feature-owned areas.
                <br />
                <br /> Start with the{' '}
                <a href="https://github.com/orgs/PostHog/teams/team-mobile" target="_blank" rel="noopener noreferrer">
                    Mobile group
                </a>{' '}
                for triage, loop in
                <PrivateLink url="https://posthog.slack.com/archives/C04MZFDA5KK">
                    #support-client-libraries
                </PrivateLink>{' '}
                as needed.
            </>
        ),
        label: 'feature/mobile',
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
    settings: {
        feature: 'Settings structure (personal & project)',
        owner: ['platform-ux'],
        notes: <>All teams manage their own settings</>,
        label: 'feature/settings',
    },
    'sql-editor': {
        feature: 'SQL editor',
        owner: ['data-warehouse'],
    },
    'sql-insights': {
        feature: 'SQL insights',
        owner: ['data-warehouse'],
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
    'taxonomic-filters': {
        feature: 'Taxonomic filters',
        owner: ['platform-ux'],
    },
    toolbar: {
        feature: 'Toolbar',
        owner: ['replay'],
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
        owner: ['messaging'],
        label: 'feature/pipelines',
    },
}

export const useFeatureOwnership = ({ teamSlug }: { teamSlug?: string } = {}) => {
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
