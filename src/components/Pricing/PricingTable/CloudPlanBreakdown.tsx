import React from 'react'
import { useValues } from 'kea'
import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'
import { CallToAction } from '../../CallToAction'
import { AllTheFeaturesCloud } from '../../AllTheFeaturesCloud'
import { pricingSliderLogic } from '../../PricingSlider/pricingSliderLogic'

import checkIcon from '../../../images/check.svg'

export const CloudPlanBreakdown = () => {
    const { finalCost, eventNumber } = useValues(pricingSliderLogic)
    const eventNumberWithDelimiter = eventNumber.toLocaleString()

    return (
        <>
            <div className="flex justify-center mb-20">
                <div className="inline-flex flex-col md:flex-row items-center text-almost-black backdrop-filter backdrop-blur-sm">
                    <div className="flex-0 border border-white border-opacity-10 rounded p-8 bg-almost-black text-white">
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 24" width="42" height="24">
                            <path
                                d="M0 17.143L6.867 24H0v-6.857zm0-1.714L8.583 24h6.867L0 8.572v6.857zm0-8.571L17.166 24h6.866L0 0v6.858zm8.583 0L25.75 24v-6.857L8.583.001v6.857zM17.166 0v6.857l8.583 8.57V8.573L17.166 0z"
                                fill="#fff"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M36.51 19.318a6.635 6.635 0 004.689 1.939V24H26.964V9.784l9.547 9.534zm-4.053.567a1.372 1.372 0 11-2.744-.001 1.372 1.372 0 012.744.002z"
                                fill="#fff"
                            />
                            <path
                                d="M0 24h6.866L0 17.143V24zM8.584 8.572L0 0v6.857l8.583 8.57V8.573zM0 8.571v6.857L8.583 24v-6.857L0 8.57zM17.166 8.571L8.583 0v6.857l8.583 8.571V8.571z"
                                fill="#fff"
                            />
                            <path
                                d="M8.582 24h6.866l-6.866-6.857V24zM8.582 8.571v6.857L17.165 24v-6.858l-8.583-8.57z"
                                fill="#fff"
                            />
                        </svg>
                        <h3 className="text-lg my-2 text-white">PostHog Cloud</h3>
                        <p className="opacity-50">Turnkey, hosted solution</p>
                        <ul className="list-none text-white text-opacity-70 text-sm pl-0 mb-6">
                            <li className="flex items-center mb-2 space-x-2">
                                <img src={checkIcon} alt="checkmark" width="20" height="20" className="mt-0" />
                                <span className="">Hosted by PostHog</span>
                            </li>
                            <li className="flex items-center mb-2 space-x-2">
                                <img src={checkIcon} alt="checkmark" width="20" height="20" className="mt-0" />
                                <span className="">Automatic upgrades</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <img src={checkIcon} alt="checkmark" width="20" height="20" className="mt-0" />
                                <span className="">Start using immediately</span>
                            </li>
                        </ul>

                        <div className="opacity-50">Monthly estimate</div>
                        <div className="flex items-baseline">
                            <div className="text-lg font-bold">${finalCost}</div>
                            <div className="opacity-50">/mo for&nbsp;</div>
                            <div className="opacity-50">{eventNumberWithDelimiter} events</div>
                        </div>

                        <div className="free-allotment-callout relative text-white bg-white bg-opacity-30 rounded py-1 px-2 text-xs mt-2 mb-4 inline-flex">
                            First 1 million events free - every month!
                        </div>

                        <div>
                            <CallToAction
                                type="secondary"
                                icon="none"
                                href="https://app.posthog.com/signup?src=pricing-page"
                                className="my-4"
                            >
                                Get started
                            </CallToAction>
                        </div>

                        <div className="text-center text-xs text-opacity-50 text-white mt-2">
                            {eventNumber === 10000 ? 'Self-serve. No credit card required.' : 'Completely self-serve'}
                        </div>
                    </div>
                    <div className="flex-0 mt-8 md:mt-0 md:ml-8 max-w-lg px-4 md:px-0">
                        <h3 className="mb-1 text-lg">Calculate your price</h3>
                        <p className="text-sm text-almost-black text-opacity-60">
                            Pay based on the events you capture each month.
                        </p>

                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <div className="mb-0 text-sm font-bold text-almost-black text-opacity-75">
                                    Monthly event volume
                                </div>
                                <div className="font-bold text-base">{eventNumberWithDelimiter}</div>
                            </div>

                            <div className="text-xs">
                                <PricingSlider
                                    marks={[10000, 1000000, 10000000, 100000000]}
                                    min={10000}
                                    max={100000000}
                                />
                            </div>
                        </div>

                        <div className="mb-4 border border-white border-opacity-10  rounded">
                            <div className="flex justify-between items-baseline p-2 rounded mb-1 bg-gray-accent-light">
                                <div className="mb-0 text-xs text-almost-black text-opacity-75">Event volume</div>
                                <div className="opacity-50 text-2xs text-right">Monthly price per event</div>
                            </div>
                            <dl className="flex justify-between mb-1 p-2">
                                <dt className="mb-0 opacity-75 text-xs">First 1 million</dt>
                                <dd className="mb-0 font-bold text-xs">Free</dd>
                            </dl>
                            <dl className="flex justify-between mb-0 p-2">
                                <dt className="mb-0 opacity-75 text-xs">More than 1 million</dt>
                                <dd className="mb-0 font-bold text-xs">$0.000225</dd>
                            </dl>
                        </div>

                        <hr className="border-gray-accent-light bg-transparent border-dashed border-r-0 border-b-0 border-left-0 mb-2" />

                        <div className="flex justify-between items-baseline">
                            <div className="text-base mb-0 text-base font-bold">Estimated price</div>
                            <div className="mb-0 font-bold flex items-baseline">
                                <div className="text-base">${finalCost}</div>
                                <div className="opacity-50">/mo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
