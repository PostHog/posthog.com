import React from 'react'

type Product = {
    Icon?: React.ComponentType<{ className?: string }>
    color?: string
    colorDark?: string
}

// A product's icon in its own colors, with the dark-mode color when the product has one
export default function ProductIcon({
    product,
    className = '',
}: {
    product?: Product | null
    className?: string
}): JSX.Element | null {
    if (!product?.Icon) return null
    const { Icon, color, colorDark } = product
    return <Icon className={`${className} text-${color}${colorDark ? ` dark:text-${colorDark}` : ''}`} />
}
