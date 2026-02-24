import React from 'react'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import useProduct from 'hooks/useProduct'

function Indicator({ color, text }: { color: string; text: string }) {
    return (
        <Tooltip delay={0} trigger={<span className={`size-2 rounded-full bg-${color} inline-block`} />}>
            {text}
        </Tooltip>
    )
}

export default function ProductList({
    products,
    urlPrefix = '/docs/',
    indicatorField,
    indicatorColors,
    className,
    itemClassName,
    iconSize = 'size-6',
}: {
    products: string[]
    urlPrefix?: string
    indicatorField?: string
    indicatorColors?: Record<string, string>
    className?: string
    itemClassName?: string
    iconSize?: string
}) {
    const allProducts = useProduct()

    const resolved = products
        .map((handle) => {
            const product = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined
            return product ?? null
        })
        .filter(Boolean)

    return (
        <ul className={`list-none m-0 p-0 ${className ?? ''}`}>
            {resolved.map((product: any) => {
                const fieldValue = indicatorField ? product[indicatorField] : undefined
                const indicatorText = typeof fieldValue === 'string' ? fieldValue : undefined
                const indicatorColor = indicatorText && indicatorColors?.[indicatorText]

                return (
                    <li key={product.handle}>
                        <Link
                            to={`${urlPrefix}${product.slug}`}
                            className={itemClassName ?? 'group flex items-center space-x-2 relative'}
                        >
                            {product.Icon && <product.Icon className={`${iconSize} text-${product.color} shrink-0`} />}
                            <span className="flex items-center gap-1.5">
                                <span className="overflow-hidden text-ellipsis whitespace-nowrap group-hover:underline">
                                    {product.name}
                                </span>
                                {indicatorColor && <Indicator color={indicatorColor} text={indicatorText} />}
                            </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
