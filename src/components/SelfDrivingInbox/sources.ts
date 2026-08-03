import React from 'react'

import {
    IconCode,
    IconDatabase,
    IconGraph,
    IconLlmAnalytics,
    IconPeople,
    IconPullRequest,
    IconRewindPlay,
    IconStack,
    IconSupport,
    IconToggle,
    IconWarning,
} from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>

export interface ProductSource {
    /** Canonical name, so "Your feature flags" and "Feature Flags" collapse to one rail row. */
    label: string
    /** A PostHog tool, as opposed to context like your codebase. Only tools get a rail row. */
    tool?: boolean
    Icon: IconComponent
    /** Bare project token, e.g. `purple`, so callers build `text-`/`border-`/`bg-` themselves. */
    token: string
    docs?: string
    /** Setup page, linked from a requirement that names this tool. */
    install?: string
}

/**
 * PostHog product surfaces resolved from free text, since `category` and `watches[].name` are
 * both author-written. One table for both, so a product looks the same everywhere it appears.
 */
const PRODUCT_SOURCES: (ProductSource & { match: RegExp })[] = [
    {
        match: /error|exception/i,
        label: 'Error Tracking',
        tool: true,
        Icon: IconWarning,
        token: 'yellow',
        docs: '/docs/error-tracking',
        install: '/docs/error-tracking/installation',
    },
    {
        match: /replay|recording/i,
        label: 'Session Replay',
        tool: true,
        Icon: IconRewindPlay,
        token: 'orange',
        docs: '/docs/session-replay',
        install: '/docs/session-replay/installation',
    },
    {
        match: /support|ticket|conversation/i,
        label: 'Support',
        tool: true,
        Icon: IconSupport,
        token: 'sky-blue',
        docs: '/docs/support',
    },
    {
        match: /llm|\bai\b/i,
        label: 'AI Observability',
        tool: true,
        Icon: IconLlmAnalytics,
        token: 'purple',
        docs: '/docs/ai-observability',
        install: '/docs/ai-observability/installation',
    },
    {
        match: /flag/i,
        label: 'Feature Flags',
        tool: true,
        Icon: IconToggle,
        token: 'seagreen',
        docs: '/docs/feature-flags',
        install: '/docs/feature-flags/installation',
    },
    {
        match: /codebase|repo|code/i,
        label: 'Your codebase',
        Icon: IconCode,
        token: 'red',
        docs: '/docs/self-driving/context',
    },
    {
        match: /issue tracker|linear|github/i,
        label: 'Issue tracker',
        Icon: IconPullRequest,
        token: 'purple',
        docs: '/docs/self-driving/context',
    },
    {
        match: /billing|warehouse|revenue|stripe/i,
        label: 'Data Warehouse',
        tool: true,
        Icon: IconDatabase,
        token: 'green',
        docs: '/docs/data-warehouse',
    },
    { match: /group|account|customer/i, label: 'Customer data', tool: true, Icon: IconPeople, token: 'teal' },
    {
        match: /event|product/i,
        label: 'Product Analytics',
        tool: true,
        Icon: IconGraph,
        token: 'blue',
        docs: '/docs/product-analytics',
        install: '/docs/product-analytics/installation',
    },
]

export function productSource(name: string): ProductSource {
    return PRODUCT_SOURCES.find(({ match }) => match.test(name)) ?? { label: name, Icon: IconStack, token: 'primary' }
}

/** Canonical product a free-text category or signal-source name belongs to. */
export function productLabel(name: string): string {
    return productSource(name).label
}

/** Whether a free-text name resolves to a PostHog tool rather than to context. */
export function isTool(name: string): boolean {
    return Boolean(productSource(name).tool)
}
