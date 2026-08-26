// Maps Squeak topic slugs to the docs page for that product area. Only topics
// with an unambiguous docs home belong here — general topics (bugs, more,
// uncategorized, community) are intentionally left out.
export const CHANGELOG_TOPIC_DOCS: Record<string, string> = {
    api: '/docs/api',
    apps: '/docs/cdp',
    'batch-exports': '/docs/cdp/batch-exports',
    cdp: '/docs/cdp',
    cohorts: '/docs/data/cohorts',
    dashboards: '/docs/product-analytics/dashboards',
    'data-pipelines': '/docs/cdp',
    'data-warehouse': '/docs/data-warehouse',
    desktop: '/docs/posthog-desktop',
    endpoints: '/docs/endpoints',
    'error-tracking': '/docs/error-tracking',
    'events-actions': '/docs/data/events',
    experiments: '/docs/experiments',
    'feature-flags': '/docs/feature-flags',
    funnels: '/docs/product-analytics/funnels',
    groups: '/docs/product-analytics/group-analytics',
    heatmaps: '/docs/toolbar/heatmaps',
    hogql: '/docs/sql',
    inbox: '/docs/self-driving/inbox',
    'llm-analytics': '/docs/ai-observability',
    'max-ai': '/docs/posthog-ai',
    mcp: '/docs/model-context-protocol',
    notebooks: '/docs/notebooks',
    paths: '/docs/product-analytics/paths',
    'people-and-properties': '/docs/data/persons',
    pricing: '/docs/billing',
    'product-analytics': '/docs/product-analytics',
    retention: '/docs/product-analytics/retention',
    sdks: '/docs/libraries',
    'self-driving': '/docs/self-driving',
    'session-replay': '/docs/session-replay',
    sessions: '/docs/data/sessions',
    slack: '/docs/slack',
    surveys: '/docs/surveys',
    toolbar: '/docs/toolbar',
    trends: '/docs/product-analytics/trends',
    'web-analytics': '/docs/web-analytics',
    workflows: '/docs/workflows',
}

type ChangelogDocsSource = {
    description?: string
    cta?: { label?: string; url?: string }
    topic?: { data?: { attributes?: { label?: string; slug?: string } } }
}

export const stripPostHogOrigin = (url: string): string => url.replace(/^https?:\/\/(www\.)?posthog\.com/, '')

// The docs page for a changelog entry: an explicit docs CTA wins, then the
// first /docs link written into the description, then the topic's docs home.
export const getChangelogDocsPath = (roadmap: ChangelogDocsSource): string | null => {
    const ctaPath = stripPostHogOrigin(roadmap.cta?.url || '')
    if (ctaPath.startsWith('/docs/')) return ctaPath

    const descriptionMatch = roadmap.description?.match(/\]\((?:https?:\/\/(?:www\.)?posthog\.com)?(\/docs\/[^)\s]+)\)/)
    if (descriptionMatch) return descriptionMatch[1]

    const topicSlug = roadmap.topic?.data?.attributes?.slug
    return (topicSlug && CHANGELOG_TOPIC_DOCS[topicSlug]) || null
}
