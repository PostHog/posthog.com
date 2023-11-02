import { Close } from 'components/Icons/Icons'
import Modal from 'components/Modal'
import { useActions, useValues } from 'kea'
import React, { useEffect } from 'react'
import { CLOUD_MINIMUM_PRICING } from '../constants'
import { PricingSlider } from '../PricingSlider'
import { pricingSliderLogic } from '../PricingSlider/pricingSliderLogic'
import { Plan } from './Plan'
import { Cloud } from './Plans'

export default function CloudModal({ setOpen, open, hideActions, hideBadge }) {
    const { finalMonthlyCost } = useValues(pricingSliderLogic)
    const { setPricingOption } = useActions(pricingSliderLogic)
    const monthlyMinimumPrice = CLOUD_MINIMUM_PRICING.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
    useEffect(() => {
        if (open) {
            setPricingOption('cloud')
        }
    })
    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="absolute w-full max-w-[1045px] top-0 p-0 sm:p-8 left-1/2 -translate-x-1/2">
                <div className="relative bg-white p-6 sm:p-9 lg:p-14 rounded-md shadow-lg">
                    <div className="flex flex-col md:flex-row md:space-x-14 sm:space-y-6 md:space-y-0 items-start">
                        <Cloud
                            hideCalculator
                            hideActions={hideActions}
                            hideBadge={hideBadge}
                            className="!pt-0 !pb-0 !pl-0 !pr-0 flex-grow w-full md:w-auto hidden sm:block"
                        />
                        <Plan
                            title="Calculate your price"
                            subtitle="Pay based on the events you capture each month."
                            className=" rounded-sm lg:flex-shrink-0 w-full md:w-auto"
                        >
                            <div className="mb-4">
                                <div className="flex justify-between items-center mt-7">
                                    <div className="mb-0 text-sm text-primary text-opacity-75">
                                        Monthly event volume (millions)
                                    </div>
                                </div>

                                <PricingSlider
                                    marks={[1000000, 2000000, 10000000, 100000000, 1000000000]}
                                    min={1000000}
                                    max={1000000000}
                                    defaultValue={1000000}
                                    pricingOption={'cloud'}
                                />
                            </div>

                            <div className="mb-4 border border-white/10 rounded">
                                <div className="flex justify-between items-baseline p-2 rounded mb-1 bg-gray-accent-light">
                                    <div className="mb-0 text-sm text-primary/75 dark:text-primary-dark/75">
                                        Event volume
                                    </div>
                                    <div className="opacity-50 text-2xs text-right">Monthly price per event</div>
                                </div>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-sm">First 1 million</dt>
                                    <dd className="mb-0 font-bold text-sm">Free</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-sm">1-10 million</dt>
                                    <dd className="mb-0 font-bold text-sm">$0.000225</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-sm">10-100 million</dt>
                                    <dd className="mb-0 font-bold text-sm">$0.000075</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2 pb-3">
                                    <dt className="mb-0 opacity-75 text-sm">More than 100 million</dt>
                                    <dd className="mb-0 font-bold text-sm">$0.000025</dd>
                                </dl>
                            </div>

                            <div className="flex justify-between items-baseline">
                                <div className="mb-0 text-sm font-bold text-primary/75 dark:text-primary-dark/75">
                                    Monthly minimum price
                                </div>
                                <div className="mb-0 flex items-baseline">
                                    <div className="text-lg">{monthlyMinimumPrice}</div>
                                    <div className="opacity-50">/mo</div>
                                </div>
                            </div>

                            <hr className="border-gray-accent-light bg-transparent border-dashed border-r-0 border-b-0 border-left-0 my-2 border-t" />

                            <div className="flex justify-between items-baseline">
                                <div className="text-lg mb-0 font-bold">Estimated price</div>
                                <div className="mb-0 font-bold flex items-baseline">
                                    <div className="text-lg">${finalMonthlyCost}</div>
                                    <div className="opacity-50">/mo</div>
                                </div>
                            </div>
                        </Plan>
                    </div>
                    <button
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-6 lg:right-6"
                        onClick={() => setOpen(false)}
                    >
                        <Close className="w-3 h-3 sm:w-auto sm:h-auto text-white" />
                    </button>
                </div>
            </div>
        </Modal>
    )
}
