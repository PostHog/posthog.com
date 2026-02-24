import React from 'react'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import useProduct from 'hooks/useProduct'

export interface IndicatorDef {
    color: string
    tooltip?: string
    label?: string
}

interface ProductEntry {
    handle: string
    indicator?: IndicatorDef
}

function Indicator({ color, tooltip, label }: { color: string; tooltip?: string; label?: string }) {
    const dot = <span className={`size-2 rounded-full bg-${color} inline-block`} />

    if (tooltip) {
        return (
            <Tooltip delay={0} trigger={dot}>
                {tooltip}
            </Tooltip>
        )
    }

    if (label) {
        return (
            <span className="inline-flex items-center gap-1">
                {dot}
                <span className="text-xs text-muted">{label}</span>
            </span>
        )
    }

    return dot
}

export default function ProductList({ products, className }: { products: ProductEntry[]; className?: string }) {
    const allProducts = useProduct()

    const resolved = products
        .map(({ handle, indicator }) => {
            const product = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined
            return product ? { ...product, indicator } : null
        })
        .filter(Boolean)

    return (
        <ul className={`list-none m-0 p-0 ${className ?? ''}`}>
            {resolved.map((product: any) => (
                <li key={product.handle}>
                    <Link to={`/docs/${product.slug}`} className="group flex items-center space-x-2 relative">
                        {product.Icon && <product.Icon className={`size-6 text-${product.color} shrink-0`} />}
                        <span className="flex items-center gap-1.5">
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap group-hover:underline">
                                {product.name}
                            </span>
                            {product.indicator && <Indicator {...product.indicator} />}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
