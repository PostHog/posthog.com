// Data rows for error tracking comparison table
// Use shorthand notation: "product.featureSet.feature" or just specify label/description to override
export const errorTrackingRows = [
    {
        path: 'error_tracking.core.exception_capture',
        label: 'Real-time error capture',
        description: 'Capture and report errors as they happen in production',
    },
    {
        path: 'error_tracking.core.error_grouping',
        label: 'Grouping & deduplication',
        description: 'Automatically group similar errors and remove duplicates',
    },
    {
        path: 'platform.support.console_log_capture',
        label: 'Console log capture',
        description: 'Capture console logs alongside error events',
    },
    {
        path: 'platform.support.mobile_sdk_coverage',
        label: 'Mobile SDK coverage',
        description: 'SDKs for iOS, Android, and mobile frameworks',
    },
    {
        path: 'platform.deployment.self_host',
        label: 'Self-host option',
        description: 'Deploy and run on your own infrastructure',
    },
    {
        path: 'platform.pricing.usage_based_pricing',
        label: 'Usage-based pricing',
        description: 'Pay only for what you use with flexible pricing',
    },
    {
        path: 'platform.integrations.ci_cd_integrations',
        label: 'Integrations (CI/CD, issue tracking)',
        description: 'Connect with development tools and workflows',
    },
    {
        path: 'platform.analytics_integration.built_in_analytics',
        label: 'Built-in product analytics',
        description: 'Combine error tracking with product analytics data',
    },
    { path: 'platform.deployment.open_source', label: 'Open-source', description: 'Fully open-source codebase' },
]
