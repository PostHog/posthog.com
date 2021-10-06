import React from 'react'
import { Plan } from './Plan'
import { useValues } from 'kea'
import { PricingSlider } from '../../PricingSlider'
import { pricingSliderLogic } from '../../PricingSlider/pricingSliderLogic'

export const CloudCalculator = () => {
    const { finalCost, eventNumber } = useValues(pricingSliderLogic)
    const eventNumberWithDelimiter = eventNumber.toLocaleString()
    return (
        <Plan title="Calculate your price" subtitle="Pay based on the events you capture each month.">
            <div className="mb-4">
                <div className="flex justify-between items-center mt-7">
                    <div className="mb-0 text-sm text-primary text-opacity-75">Monthly event volume</div>
                    <div className="font-bold text-base">{eventNumberWithDelimiter}</div>
                </div>

                <PricingSlider marks={[10000, 1000000, 10000000, 100000000]} min={10000} max={100000000} />
            </div>

            <div className="mb-2 border border-white border-opacity-10  rounded">
                <div className="flex justify-between items-baseline p-2 rounded mb-1 bg-gray-accent-light">
                    <div className="mb-0 text-xs text-primary font-bold">Event volume</div>
                    <div className="opacity-50 text-2xs text-right font-semibold">Monthly price per event</div>
                </div>
                <dl className="flex justify-between mb-1 p-2">
                    <dt className="mb-0 opacity-75 text-xs font-normal">First 1 million</dt>
                    <dd className="mb-0 font-bold text-xs">Free</dd>
                </dl>
                <dl className="flex justify-between mb-0 p-2">
                    <dt className="mb-0 opacity-75 text-xs font-normal">More than 1 million</dt>
                    <dd className="mb-0 font-bold text-xs">$0.000225</dd>
                </dl>
            </div>
            <div className="flex justify-between items-baseline border-t border-dashed border-gray-accent-light pt-3">
                <div className="text-base mb-0 text-base font-bold">Estimated price</div>
                <div className="mb-0 font-bold flex items-baseline">
                    <div className="text-base">${finalCost}</div>
                    <div className="opacity-50">/mo</div>
                </div>
            </div>
        </Plan>
    )
}
