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
    Workflows: { handle: 'workflows' },
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
