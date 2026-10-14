import React from 'react'
import Link from 'components/Link'
import { useToolsProducts } from 'components/Home/ToolsTicker'
import type { ToolsTickerProduct } from 'components/Home/ToolsTicker/ToolsTickerStrip'

const DISPLAY_NAMES: Record<string, string> = { cdp: 'Data pipelines' }

export default function ProductChips({ handles }: { handles: string[] }): JSX.Element {
    const products: ToolsTickerProduct[] = useToolsProducts(handles)
    return (
        <ul className="not-prose m-0 flex list-none flex-wrap gap-1.5 p-0">
            {products.map((product) => (
                <li key={product.handle} className="m-0 p-0">
                    <Link
                        to={`/${product.slug}`}
                        state={{ newWindow: true }}
                        className="flex items-center gap-1.5 rounded-full border border-primary bg-primary px-2 py-0.5 text-xs font-semibold text-primary hover:bg-accent"
                    >
                        {product.Icon && <product.Icon className={`size-3.5 shrink-0 text-${product.color}`} />}
                        {DISPLAY_NAMES[product.handle] ?? product.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
