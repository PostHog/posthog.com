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
}

export default function ToolsTickerStrip({ products, ariaHidden = false }: ToolsTickerStripProps): JSX.Element {
    return (
        <ul aria-hidden={ariaHidden || undefined} className="flex items-center gap-6 pr-6 m-0 p-0 list-none shrink-0">
            {products.map((product) => (
                <li key={product.handle} className="flex items-center gap-1.5 whitespace-nowrap">
                    {product.Icon && <product.Icon className={`size-4 shrink-0 text-${product.color}`} />}
                    <Link
                        to={`/${product.slug}`}
                        state={{ newWindow: true }}
                        tabIndex={ariaHidden ? -1 : undefined}
                        className="text-sm font-semibold"
                    >
                        {product.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
