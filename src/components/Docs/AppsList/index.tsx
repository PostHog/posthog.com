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

// Metrics are OSButton's `md` from simpleSizeClasses – one rung below the docs page's Surfaces row.
const CHIP =
    'flex items-center gap-1 rounded border border-primary bg-accent px-1.5 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary'

interface AppsListProps {
    className?: string
    /** `columns` (default) flows down text columns; `chips` wraps bordered pills left to right. */
    variant?: 'columns' | 'chips'
}

// Sourced from useProducts(), the canonical set behind /products, so it never drifts from the lineup.
export const AppsList = ({ className = '', variant = 'columns' }: AppsListProps): JSX.Element => {
    const { products } = useProducts()

    if (variant === 'chips') {
        return (
            <div data-scheme="primary" className={`flex flex-wrap gap-2 ${className}`}>
                {products.map((product: any) => {
                    const Icon = product.Icon
                    return (
                        <Link key={product.handle || product.name} to={docsUrlFor(product)} className={CHIP}>
                            {Icon && <Icon className={`size-4 shrink-0 text-${product.color || 'primary'}`} />}
                            <span className="leading-tight">{product.name}</span>
                        </Link>
                    )
                })}
            </div>
        )
    }

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
