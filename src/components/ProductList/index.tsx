import React, { useMemo } from 'react'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import useProduct from 'hooks/useProduct'

type SourceValue = boolean | string | { value: boolean | string; color: string }

function unwrapValue(sv: SourceValue): boolean | string {
    return typeof sv === 'object' && sv !== null && 'value' in sv ? sv.value : sv
}

function Indicator({ color, text }: { color: string; text: string }) {
    return (
        <Tooltip delay={0} trigger={<span className={`size-2 rounded-full bg-${color} inline-block`} />}>
            {text}
        </Tooltip>
    )
}

export default function ProductList({
    products,
    sourceField,
    sourceValues,
    urlPrefix = '/',
    className,
    itemClassName,
    iconSize = 'size-6',
}: {
    products?: string[]
    sourceField?: string
    sourceValues?: SourceValue[]
    urlPrefix?: string
    className?: string
    itemClassName?: string
    iconSize?: string
}) {
    const allProducts = useProduct()
    const productList = Array.isArray(allProducts) ? allProducts : []

    const colorMap = useMemo(() => {
        const map: Record<string, string> = {}
        if (!sourceValues) return map
        for (const sv of sourceValues) {
            if (typeof sv === 'object' && sv !== null && 'value' in sv && typeof sv.value === 'string') {
                map[sv.value] = sv.color
            }
        }
        return map
    }, [sourceValues])

    const resolved = useMemo(() => {
        const rawValues = sourceValues?.map(unwrapValue)

        if (products) {
            const manual = products.map((handle) => productList.find((p: any) => p.handle === handle)).filter(Boolean)

            if (sourceField && rawValues) {
                return manual.filter((p: any) => rawValues.includes(p[sourceField]))
            }
            return manual
        }

        if (sourceField && rawValues) {
            const buckets = rawValues.map((val) => productList.filter((p: any) => p[sourceField] === val))
            return buckets.flat()
        }

        return []
    }, [products, sourceField, sourceValues, productList])

    return (
        <ul className={`list-none m-0 p-0 ${className ?? ''}`}>
            {resolved.map((product: any) => {
                const fieldValue = sourceField ? product[sourceField] : undefined
                const indicatorText = typeof fieldValue === 'string' ? fieldValue : undefined
                const indicatorColor = indicatorText ? colorMap[indicatorText] : undefined

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
                                {indicatorColor && indicatorText && (
                                    <Indicator color={indicatorColor} text={indicatorText} />
                                )}
                            </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
