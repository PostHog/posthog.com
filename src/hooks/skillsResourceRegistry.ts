import React from 'react'
import { IconGraph } from '@posthog/icons'

export type SkillResourceRef = {
    handle: string
    label?: string
    href?: string
}

export type ResolvedResource = {
    handle: string
    name: string
    Icon: React.ComponentType<{ className?: string }>
    color: string
    href: string | null
    isCapability: boolean
}

type AliasTarget = SkillResourceRef

/** Maps vibed display strings from the original skills draft to canonical handles */
export const SKILL_RESOURCE_ALIASES: Record<string, AliasTarget> = {
    Conversations: { handle: 'support', label: 'Conversations' },
    'Session replay': { handle: 'session_replay' },
    Logs: { handle: 'logs' },
    'Error tracking': { handle: 'error_tracking' },
    'Activity log': { handle: 'activity', label: 'Activity log' },
    Profiles: { handle: 'profiles' },
    'Feature flags': { handle: 'feature_flags' },
    'Web analytics': { handle: 'web_analytics' },
    Heatmaps: { handle: 'heatmaps' },
    'Product analytics': { handle: 'product_analytics' },
    Experiments: { handle: 'experiments' },
    Dashboards: { handle: 'dashboards' },
    Funnels: { handle: 'funnels' },
    Surveys: { handle: 'surveys' },
    'User paths': { handle: 'user_paths' },
    Stickiness: { handle: 'stickiness' },
    Lifecycle: { handle: 'lifecycle' },
    'Revenue tracking': { handle: 'revenue_analytics' },
    CDP: { handle: 'cdp' },
    'Email destinations': { handle: 'realtime_destinations', label: 'Email destinations' },
    'SMS destinations': { handle: 'realtime_destinations', label: 'SMS destinations' },
    'Sources & ELT': { handle: 'data_in' },
    Warehouse: { handle: 'data_warehouse' },
    'Data modeling': { handle: 'data_modeling' },
    'SQL editor': { handle: 'sql_editor' },
    'Reverse ETL': { handle: 'data_out' },
    'LLM Traces': { handle: 'llm_traces' },
    Generations: { handle: 'llm_generations' },
    Evals: { handle: 'llm_evals' },
    Notebooks: { handle: 'notebooks' },
    Cohorts: { handle: 'product_analytics', label: 'Cohorts', href: '/docs/data/cohorts' },
    'Event tracking': {
        handle: 'product_analytics',
        label: 'Event tracking',
        href: '/docs/getting-started/send-events',
    },
    Actions: { handle: 'product_analytics', label: 'Actions', href: '/docs/data/actions' },
    Insights: { handle: 'product_analytics', label: 'Insights', href: '/docs/product-analytics/insights' },
    Subscriptions: { handle: 'dashboards', label: 'Subscriptions', href: '/docs/product-analytics/subscriptions' },

    // --- Added for the comprehensive skills dataset (tools_used vocabulary) ---
    Workflows: { handle: 'workflow_builder', label: 'Workflows' },
    'LLM Observability': { handle: 'ai_observability', label: 'LLM observability' },
    Tracing: { handle: 'trace_monitoring', label: 'Tracing' },
    'APM/Tracing': { handle: 'trace_monitoring', label: 'APM / Tracing' },
    'Group Analytics': { handle: 'group_analytics' },
    'Customer Analytics': { handle: 'group_analytics', label: 'Customer analytics' },
    'Session Replay': { handle: 'session_replay' },
    'Error Tracking': { handle: 'error_tracking' },
    'Product Analytics': { handle: 'product_analytics' },
    'Web Analytics': { handle: 'web_analytics' },
    'Data Warehouse': { handle: 'data_warehouse' },
    'Data Pipelines': { handle: 'data_warehouse', label: 'Data pipelines' },
    'Data Schema': { handle: 'data_warehouse', label: 'Data schema' },
    'Feature Flags': { handle: 'feature_flags' },
    'Early Access Features': { handle: 'early_access' },
    'Replay Vision': { handle: 'session_replay', label: 'Replay Vision' },
    Persons: { handle: 'profiles', label: 'Persons', href: '/docs/data/persons' },
    Events: { handle: 'product_analytics', label: 'Events', href: '/docs/getting-started/send-events' },
    Properties: { handle: 'product_analytics', label: 'Properties', href: '/docs/data/properties' },
    SQL: { handle: 'sql_editor', label: 'SQL' },
    'User Interviews': { handle: 'user_interviews' },
    'Platform Features': { handle: 'platform_packages', label: 'Platform features' },
    'Reverse Proxy': { handle: 'api', label: 'Reverse proxy', href: '/docs/advanced/proxy' },
    Docs: { handle: 'docs', label: 'Docs', href: '/docs' },
    Endpoints: { handle: 'endpoints', href: '/endpoints' },
}

/**
 * Maps a PostHog MCP tool handle (e.g. `query-session-recordings-list`) to the
 * product handle it belongs to, so `flow` steps can render with the right
 * product icon and link. Prefix-based and deterministic; the build-time
 * ingested skills (AgentSkill nodes) can fill any gaps this misses.
 */
const MCP_TOOL_PRODUCT_RULES: Array<[RegExp, string]> = [
    [/^session-recording|^query-session-recordings/, 'session_replay'],
    [/^vision-scanners/, 'session_replay'],
    [/error-tracking|^query-error-tracking/, 'error_tracking'],
    [/feature-flag|scheduled-changes|early-access-feature/, 'feature_flags'],
    [/^experiment/, 'experiments'],
    [/^survey/, 'surveys'],
    [/^llma-|^query-llm|get-llm-total-costs/, 'ai_observability'],
    [/^apm-|^query-apm/, 'trace_monitoring'],
    [/^cdp-|^hog-flows|^workflows/, 'cdp'],
    [/^query-logs|^logs-/, 'logs'],
    [
        /external-data|^batch-export|^file-download-batch|^view-|sql-variables|data-warehouse|hogql-schema/,
        'data_warehouse',
    ],
    [/^execute-sql|^query-generate-hogql|^query-validate/, 'data_warehouse'],
    [/^cohorts/, 'product_analytics'],
    [/^notebook/, 'notebooks'],
    [/^dashboard|^subscriptions/, 'dashboards'],
    [/^insight/, 'product_analytics'],
    [
        /^query-trends|^query-funnel|^query-retention|^query-paths|^query-lifecycle|^query-stickiness|^query-run/,
        'product_analytics',
    ],
    [/^event-definition|^properties-list|^property-definitions|^read-data-schema|^action/, 'product_analytics'],
    [/^persons/, 'profiles'],
    [/^conversations|^inbox/, 'support'],
    [/^web-analytics/, 'web_analytics'],
    [/^accounts|^usage-metrics/, 'group_analytics'],
    [/^sdk-doctor/, 'session_replay'],
    [/^user-interview/, 'user_interviews'],
    [/^early-access/, 'early_access'],
    [/^endpoint/, 'endpoints'],
    [/^docs-search/, 'docs'],
    [/^integration/, 'cdp'],
    [/^proxy-/, 'api'],
    [/^early-access-feature/, 'early_access'],
]

export function mcpToolToProductHandle(tool: string): string | null {
    const t = tool.trim()
    for (const [pattern, handle] of MCP_TOOL_PRODUCT_RULES) {
        if (pattern.test(t)) return handle
    }
    return null
}

export function toolStringToResource(tool: string): SkillResourceRef {
    const alias = SKILL_RESOURCE_ALIASES[tool]
    if (alias) return { ...alias }
    const normalized = tool.toLowerCase().replace(/\s+/g, '_')
    return { handle: normalized, label: tool }
}

function productHref(product: { slug?: string }, ref: SkillResourceRef): string | null {
    if (ref.href) return ref.href
    if (!product.slug) return null
    return product.slug.startsWith('docs/') ? `/${product.slug}` : `/${product.slug}`
}

export function resolveSkillResource(
    ref: SkillResourceRef,
    allProducts: Array<{
        handle: string
        name: string
        Icon?: React.ComponentType<{ className?: string }>
        color?: string
        slug?: string
    }>
): ResolvedResource | null {
    const product = allProducts.find((p) => p.handle === ref.handle)
    if (!product?.Icon || !product.color) {
        return null
    }

    const isCapability = Boolean(ref.label)
    const name = ref.label || product.name
    const href = productHref(product, ref)

    return {
        handle: ref.handle,
        name,
        Icon: product.Icon,
        color: product.color,
        href,
        isCapability,
    }
}

export function resolveSkillResources(
    refs: SkillResourceRef[],
    allProducts: Parameters<typeof resolveSkillResource>[1]
): ResolvedResource[] {
    return refs.map((ref) => resolveSkillResource(ref, allProducts)).filter((r): r is ResolvedResource => r !== null)
}

/** Fallback when handle is missing from product catalog */
export function fallbackResolvedResource(ref: SkillResourceRef): ResolvedResource {
    return {
        handle: ref.handle,
        name: ref.label || ref.handle.replace(/_/g, ' '),
        Icon: IconGraph,
        color: 'gray',
        href: ref.href || null,
        isCapability: Boolean(ref.label),
    }
}
