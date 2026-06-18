import React from 'react'
import Link from 'components/Link'
import * as Icons from '@posthog/icons'
import { docsMenu } from '../../../navs'
import { useActiveFeatureFlags, filterMenuByFlags } from '../../../hooks/useActiveFeatureFlags'

// Docs URLs that are surfaces (Slack, MCP, PostHog Code), not browseable product apps.
// Web (app.posthog.com) is excluded automatically because it isn't a /docs/ URL.
const surfaceUrls = new Set(['/docs/slack', '/docs/model-context-protocol', '/docs/posthog-code'])

// Top-level docs sections that aren't product apps.
const excludedNames = new Set([
    'Start here',
    'Self-driving',
    'Self-driving product',
    'Platform',
    'Product OS',
    'Reference',
])

// Apps = the product docs, derived from the docs nav.
// Respect feature-flag gating so flag-only products (e.g. Replay Vision) stay hidden.
const getAllProducts = (activeFlags: string[] | null): any[] =>
    (filterMenuByFlags(docsMenu.children, activeFlags) || []).filter(
        (child: any) =>
            !excludedNames.has(child.name) &&
            typeof child.url === 'string' &&
            child.url.startsWith('/docs/') &&
            !surfaceUrls.has(child.url)
    )

interface AppsListProps {
    className?: string
}

// Renders the PostHog product apps as a compact, multi-column list of icon links.
// Shared by the docs landing page and the self-driving "Web app" surface page.
export const AppsList = ({ className = '' }: AppsListProps): JSX.Element => {
    const activeFlags = useActiveFeatureFlags()

    return (
        <div data-scheme="primary" className={`columns-2 @md:columns-3 @2xl:columns-4 gap-x-8 ${className}`}>
            {getAllProducts(activeFlags).map((product: any) => {
                const Icon = product.icon ? (Icons[product.icon as keyof typeof Icons] as any) : Icons.IconBook
                return (
                    <Link
                        key={product.name}
                        to={product.url}
                        className="flex items-center gap-2 py-1.5 break-inside-avoid font-medium text-primary hover:underline"
                    >
                        <Icon className={`size-4 shrink-0 text-${product.color || 'primary'}`} />
                        <span className="text-sm leading-tight">{product.name}</span>
                    </Link>
                )
            })}
        </div>
    )
}

export default AppsList
