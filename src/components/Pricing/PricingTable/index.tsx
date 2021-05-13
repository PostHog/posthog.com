import React from 'react'

import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'

import checkIcon from '../../../images/check.svg'

export const PricingTable = () => {
    return (
        <div className="pricing-hero text-white">
            <Structure.Section width="4xl" className="py-12">
                <div className="flex justify-center">
                    <div className="border border-white rounded p-8 inline-flex flex-col md:flex-row items-center text-white">
                        <div className="flex-0 border border-white rounded p-4">
                            <h3>PostHog Cloud</h3>
                            <p className="opacity-50">Turnkey, hosted solution</p>
                            <ul className="list-none">
                                <li className="flex align-center">
                                    <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                                    <span>Hosted by PostHog</span>
                                </li>
                                <li className="flex align-center">
                                    <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                                    <span>Automatic upgrades</span>
                                </li>
                                <li className="flex align-center">
                                    <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                                    <span>Start using immediately</span>
                                </li>
                            </ul>

                            <div className="opacity-50">Monthly estimate</div>
                            <div className="flex items-baseline">
                                <div className="text-lg">$0</div> {/* price value from slider */}
                                <div className="opacity-50">/mo for&nbsp;</div>
                                <div className="opacity-50">1,000,000 events</div> {/* event value from slider */}
                            </div>
                            <div className="text-xs">First 1 million events free - every month!</div>

                            <div className="p-2 border border-white my-4 text-center">
                                Get started {/* use 'primary' button, like in landingpage hero */}
                            </div>

                            <div className="text-center text-xs mt-2">
                                No credit card required.
                                <br />
                                Completely self-serve.
                            </div>
                        </div>
                        <div className="flex-0 mt-8 md:mt-0 md:ml-8 max-w-lg">
                            <h3>Calculate your price</h3>
                            <p className="text-sm">Pay based on the events you capture each month.</p>

                            <div className="mb-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="mb-0 text-base">Monthly event volume</h4>
                                    <div className="text-bold">1,000,000</div> {/* event value from slider */}
                                </div>
                                slider
                                <br />
                                <div className="text-sm opacity-50">
                                    &lt;1 million, 1 million, 10 million, 100 million
                                    {/* Ideal: slider labels should be spaced realistically based on values, not evenly */}
                                </div>
                            </div>

                            <div className="p-2 mb-4 border border-white">
                                <div className="flex justify-between items-center">
                                    <h4 className="mb-0 text-base">Event volume pricing</h4>
                                    <div className="opacity-50 text-xs">Monthly price per event</div>
                                </div>
                                <dl className="flex justify-between mb-0">
                                    <dt className="mb-0 opacity-75 text-sm">Up to 1 million</dt>
                                    <dd className="mb-0 text-bold">Free</dd>
                                </dl>
                                <dl className="flex justify-between mb-0">
                                    <dt className="mb-0 opacity-75 text-sm">First 10 million</dt>
                                    <dd className="mb-0 text-bold">$0.000225</dd>
                                </dl>
                            </div>

                            <div className="flex justify-between">
                                <h4 className="text-base mb-0 text-lg text-bold">Estimated price</h4>
                                <div className="mb-0 text-bold flex items-baseline">
                                    <div className="text-lg">$0</div> {/* price value from slider */}
                                    <div className="opacity-50">/mo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Structure.Section>
        </div>
    )
}
