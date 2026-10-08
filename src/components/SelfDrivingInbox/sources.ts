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
        Icon: IconWarning,
        token: 'yellow',
        docs: '/docs/error-tracking',
        install: '/docs/error-tracking/installation',
    },
    {
        match: /replay|recording/i,
        label: 'Session Replay',
        Icon: IconRewindPlay,
        token: 'orange',
        docs: '/docs/session-replay',
        install: '/docs/session-replay/installation',
    },
    {
        match: /support|ticket|conversation/i,
        label: 'Support',
        Icon: IconSupport,
        token: 'sky-blue',
        docs: '/docs/support',
    },
    {
        match: /llm|\bai\b/i,
        label: 'AI Observability',
        Icon: IconLlmAnalytics,
        token: 'purple',
        docs: '/docs/ai-observability',
        install: '/docs/ai-observability/installation',
    },
    {
        match: /flag/i,
        label: 'Feature Flags',
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
        Icon: IconDatabase,
        token: 'green',
        docs: '/docs/data-warehouse',
    },
    { match: /group|account|customer/i, label: 'Customer data', Icon: IconPeople, token: 'teal' },
    {
        match: /event|product/i,
        label: 'Product Analytics',
        Icon: IconGraph,
        token: 'blue',
        docs: '/docs/product-analytics',
        install: '/docs/product-analytics/installation',
    },
]

export function productSource(name: string): ProductSource {
    return PRODUCT_SOURCES.find(({ match }) => match.test(name)) ?? { label: name, Icon: IconStack, token: 'primary' }
}
