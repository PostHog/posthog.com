import React from 'react'
import Link from 'components/Link'
import useProducts from '../../../hooks/useProducts'

// A few products have a marketing slug that doesn't map to /docs/<slug>.
// Point those at the right docs page, keyed on the stable product handle.
const docsUrlOverrides: Record<string, string> = {
    data_warehouse: '/docs/data-warehouse',
    realtime_destinations: '/docs/cdp/destinations',
    posthog_ai: '/docs/posthog-ai',
}

const docsUrlFor = (product: any): string => docsUrlOverrides[product.handle] || `/docs/${product.slug}`

interface AppsListProps {
    className?: string
}

// Renders PostHog's products as a compact, multi-column list of icon links to their docs.
// Sourced from useProducts() (the canonical product set, the same data behind /products) so it
// stays in sync with the real product lineup instead of scraping the docs nav.
export const AppsList = ({ className = '' }: AppsListProps): JSX.Element => {
    const { products } = useProducts()

    return (
        <div data-scheme="primary" className={`columns-2 @md:columns-3 @2xl:columns-4 gap-x-8 ${className}`}>
            {products.map((product: any) => {
                const Icon = product.Icon
                return (
                    <Link
                        key={product.handle || product.name}
                        to={docsUrlFor(product)}
                        className="flex items-center gap-2 py-1.5 break-inside-avoid font-medium text-primary hover:underline"
                    >
                        {Icon && <Icon className={`size-4 shrink-0 text-${product.color || 'primary'}`} />}
                        <span className="text-sm leading-tight">{product.name}</span>
                    </Link>
                )
            })}
        </div>
    )
}

export default AppsList
