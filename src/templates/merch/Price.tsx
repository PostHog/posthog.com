import React from 'react'

type PriceProps = {
    price: string | number | null
}

export const Price = ({ price }: PriceProps): React.ReactElement | null => {
    const validPrice = typeof price === 'string' ? parseFloat(price) : price
    return validPrice !== null && !isNaN(validPrice) ? <strong>${validPrice.toFixed(2)}</strong> : null
}
