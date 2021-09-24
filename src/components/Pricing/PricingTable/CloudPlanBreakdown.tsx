import React from 'react'
import { useValues } from 'kea'
import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'
import { CallToAction } from '../../CallToAction'
import { pricingSliderLogic } from '../../PricingSlider/pricingSliderLogic'
import checkIcon from '../../../images/check.svg'
import { Plan, Section, Features, Price } from './Plan'
import { features } from './Plans'

export const CloudPlanBreakdown = () => {
    const { finalCost, eventNumber } = useValues(pricingSliderLogic)
    const eventNumberWithDelimiter = eventNumber.toLocaleString()

    return (
        <>
            <div className="flex justify-center mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 text-primary">
                    <Plan
                        title="PostHog Cloud"
                        subtitle="Turnkey, hosted solution"
                        className="border border-dashed border-gray-accent-light rounded-sm bg-white bg-opacity-20"
                    >
                        <Section title="Platform">
                            <Features features={features['Platform']} className="grid-cols-1 md:grid-cols-2" />
                        </Section>
                        <Section title="Benefits" className="mt-auto">
                            <Features features={features['Benefits']} />
                        </Section>
                        <Section title="Pricing" className="mt-auto">
                            <Price>
                                ${finalCost}
                                <span className="text-base">
                                    <span className="opacity-50">/mo for</span> {eventNumberWithDelimiter} events
                                </span>
                            </Price>
                        </Section>
                        <CallToAction className="my-7">Deploy now</CallToAction>
                        <span className="text-[15px] opacity-50 text-center">Includes community support on Slack</span>
                    </Plan>
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
                                <div className="opacity-50 text-2xs text-right font-semibold">
                                    Monthly price per event
                                </div>
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
                </div>
            </div>
        </>
    )
}
