import React from 'react'

type PriceProps = {
    price: number
}

export function Price(props: PriceProps): React.ReactElement {
    return <strong>${props.price.toFixed(2)}</strong>
}
