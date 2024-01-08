import React from 'react'

type PriceProps = {
    price: number
}

export function Price(props: PriceProps): React.ReactElement {
    return <div className="inline-block">${props.price.toFixed(2)}</div>
}
