import React from 'react'
import { pricing, pricingLabels } from './constants'

export default function Breakdown({ pricingOption, description }) {
    const breakdown = pricing[pricingOption]
    return (
        <div>
            <h4 className="text-base font-bold m-0 ">Volume discounts</h4>
            <p className="text-sm text-black/60">{description}</p>
            <ul className="grid gap-y-1 m-0 p-0">
                {breakdown.map((price, index) => {
                    const label = pricingLabels[price[0]]
                    return (
                        <li
                            key={index}
                            className="flex items-center space-x-2 justify-between opacity-50 border-b border-dashed border-gray-accent-light pb-2 last:pb-0 last:border-b-0"
                        >
                            <p className="text-[14px] font-medium m-0">{label || '100 million - 1 billion'}</p>
                            <p className="text-[14px] font-medium m-0">{price[1] === 0 ? 'Free' : `$${price[1]}`}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
