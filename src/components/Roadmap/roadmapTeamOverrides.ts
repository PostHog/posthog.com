/**
 * Owning small team per Early Access Feature flag key, for the /roadmap team chips and
 * team filter. Checked before the hand-maintained feature-ownership map (useFeatureOwnership),
 * which only covers a handful of roadmap items.
 *
 * Derived 2026-07-20 by cross-referencing each feature flag's creator (project activity log)
 * with current small-team rosters, then correcting for product area where the creator has
 * since changed teams or created the flag on another team's behalf. Values must be valid
 * team slugs from allSqueakTeam (see /teams).
 */
export const ROADMAP_TEAM_OVERRIDES: Record<string, string> = {
    // Betas
    'cdp-microsoft-ads': 'workflows', // CDP destination — pipeline destinations area
    'dashboard-widgets': 'analytics-platform',
    'feature-flag-notifications': 'platform-features', // built on the notifications infra
    'feature-flag-mixed-targeting': 'feature-flags',
    'alerts-anomaly-detection': 'self-driving',
    'llm-analytics-user-feedback': 'ai-observability',
    'sql-editor-vim-mode': 'data-tools',
    'feature-flags-v2': 'feature-flags',
    'flag-evaluation-tags': 'feature-flags',
    'web-analytics-filters-v2': 'web-analytics',
    'web-experiments': 'experiments',
    'end-user-facing-analytics': 'data-modeling', // Endpoints
    'improved-cookieless-mode': 'web-analytics',
    'customer-analytics-roadmap': 'customer-analytics', // corrects the generic web-analytics match
    'llm-analytics-early-adopters': 'ai-observability',
    messaging: 'workflows',
    'cdp-hog-sources': 'workflows',
    'calendar-heatmap-insight': 'web-analytics',
    discussions: 'platform-features', // comments/discussions area

    // Alpha / concept
    tracing: 'apm',
    metrics: 'apm',
    'customer-success-platform': 'customer-analytics',
    'in-app-messenger': 'conversations',
    'managed-duckdb-data-warehouse': 'managed-warehouse',
    'a-posthog-crm': 'customer-analytics',
    'email-surveys': 'surveys',
    'link-tracking': 'web-analytics',
    'web-analytics-api': 'web-analytics',
    'advanced-max-ai-features': 'self-driving',
    streamlit: 'data-modeling',
    'flag-with-tag': 'feature-flags', // user-specified environment tags
    'max-deep-research-alpha': 'self-driving',
    shufflehog: 'marketing',
    'ai-session-replay-summaries': 'replay',
    'b2b-analytics': 'customer-analytics',
    'cookie-banner-product': 'web-analytics',
    'customer-support-product': 'conversations',
    'code-editor': 'posthog-code',
    'toolbar-for-mobile': 'growth', // toolbar area
    'ai-api-access': 'ai-gateway',
    'product-tours': 'surveys',
}
