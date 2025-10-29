// Data rows for error tracking comparison table
// Use shorthand notation: "product.featureSet.feature" or just specify label/description to override
export const errorTrackingRows = [
    {
        path: 'error_tracking.core.exception_capture',
    },
    {
        path: 'error_tracking.core.error_grouping',
    },
    {
        path: 'error_tracking.core.console_log_capture',
    },
    {
        path: 'error_tracking.core.mobile_sdk_coverage',
    },
    {
        path: 'platform.deployment.self_host',
    },
    {
        path: 'platform.pricing.usage_based_pricing',
    },
    {
        path: 'platform.integrations.ci_cd_integrations',
    },
    {
        path: 'platform.analytics_integration.built_in_analytics',
        label: 'Built-in product analytics',
        description: 'Combine error tracking with product analytics data',
    },
    { path: 'platform.deployment.open_source' },
]
