import React from 'react'
import Link from 'components/Link'

export interface ToolsTickerProduct {
    handle: string
    name: string
    slug: string
    color?: string
    Icon?: React.ComponentType<{ className?: string }>
}

interface ToolsTickerStripProps {
    products: ToolsTickerProduct[]
    ariaHidden?: boolean
    compact?: boolean
}

export default function ToolsTickerStrip({
    products,
    ariaHidden = false,
    compact = false,
}: ToolsTickerStripProps): JSX.Element {
    return (
        <ul
            aria-hidden={ariaHidden || undefined}
            aria-label={compact ? 'PostHog tools' : undefined}
            style={compact ? { counterReset: `remaining-tools ${products.length}` } : undefined}
            className={
                compact
                    ? `grid grid-cols-2 gap-x-3 gap-y-2 list-none p-0 mt-1 mb-3
                    [&>li]:hidden [&>li:nth-child(-n+5)]:flex [&>li:last-child]:flex
                    @[26rem]/tools:grid-cols-3 @[26rem]/tools:[&>li:nth-child(-n+8)]:flex
                    @[35rem]/tools:grid-cols-4 @[35rem]/tools:[&>li:nth-child(-n+11)]:flex
                    @[44rem]/tools:grid-cols-5 @[44rem]/tools:[&>li:nth-child(-n+14)]:flex`
                    : 'flex items-center gap-6 pr-6 m-0 p-0 list-none shrink-0'
            }
        >
            {products.map((product) => (
                <li
                    key={product.handle}
                    title={product.name}
                    className={`flex items-center gap-1.5 whitespace-nowrap ${
                        compact ? 'min-w-0 !m-0 !p-0 [counter-increment:remaining-tools_-1]' : ''
                    }`}
                >
                    {product.Icon && <product.Icon className={`size-4 shrink-0 text-${product.color}`} />}
                    <Link
                        to={`/${product.slug}`}
                        state={{ newWindow: true }}
                        tabIndex={ariaHidden ? -1 : undefined}
                        wrapperClassName={compact ? 'min-w-0' : undefined}
                        className={compact ? 'block truncate text-xs font-semibold' : 'text-sm font-semibold'}
                    >
                        {product.name}
                    </Link>
                </li>
            ))}
            {compact && (
                <li className="items-center !m-0 !p-0">
                    <Link
                        to="/products"
                        state={{ newWindow: true }}
                        className="block text-xs text-secondary underline underline-offset-2 whitespace-nowrap"
                        aria-label={`View all ${products.length} tools`}
                    >
                        and <span className="before:content-[counter(remaining-tools)]" /> more
                    </Link>
                </li>
            )}
        </ul>
    )
}
