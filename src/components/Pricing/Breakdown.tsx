import React from 'react'
import { pricing, pricingLabels } from './constants'

const formatNumber = (num: number, length: number) => String(num).padEnd(length, '0')

export default function Breakdown({ pricingOption, description = null, priceLength }) {
    const breakdown = pricing[pricingOption]

    return (
        <div>
            <h4 className="text-base font-bold m-0 ">Volume discounts</h4>
            {description ? <p className="text-sm text-black/60">{description}</p> : null}
            <ul className="grid gap-y-1 mt-2 p-0">
                {breakdown.map((price, index) => {
                    const label = pricingLabels[price[0]]
                    return (
                        <li
                            key={index}
                            className="flex items-center space-x-2 justify-between text-black/50 border-b border-dashed border-gray-accent-light pb-2 last:pb-0 last:border-b-0"
                        >
                            <p className="text-sm font-medium m-0">{label || '100 million - 1 billion'}</p>
                            <p className="font-bold m-0 text-black/100">
                                {price[1] === 0 ? 'Free' : `$${formatNumber(price[1], priceLength)}`}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
