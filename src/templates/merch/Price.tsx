import React from 'react'

type PriceProps = {
    price: number | null
}

export function Price(props: PriceProps): React.ReactElement | null {
    if (!props.price) return null

    return <strong>${props.price.toFixed(2)}</strong>
}
