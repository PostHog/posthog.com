import React from 'react'

import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'
import { CallToAction } from '../../CallToAction'

import checkIcon from '../../../images/check.svg'

export const CloudPlanBreakdown = () => {
    return (
        <Structure.Section width="4xl" className="py-12">
            <div className="flex justify-center">
                <div className="bg-deep-blue bg-opacity-30 rounded-lg p-8 inline-flex flex-col md:flex-row items-center text-white">
                    <div className="flex-0 border border-white border-opacity-10 rounded p-8 bg-royal-blue">
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
                        <h3 className="text-lg my-2">PostHog Cloud</h3>
                        <p className="opacity-50">Turnkey, hosted solution</p>
                        <ul className="list-none text-white text-opacity-70 text-sm pl-0">
                            <li className="flex align-center mb-2">
                                <img src={checkIcon} alt="checkmark" width="20" height="20" className="flex-0 mr-2" />
                                <span className="">Hosted by PostHog</span>
                            </li>
                            <li className="flex align-center mb-2">
                                <img src={checkIcon} alt="checkmark" width="20" height="20" className="flex-0 mr-2" />
                                <span className="">Automatic upgrades</span>
                            </li>
                            <li className="flex align-center">
                                <img src={checkIcon} alt="checkmark" width="20" height="20" className="flex-0 mr-2" />
                                <span className="">Start using immediately</span>
                            </li>
                        </ul>

                        <div className="opacity-50">Monthly estimate</div>
                        <div className="flex items-baseline">
                            <div className="text-lg font-bold">$0</div> {/* price value from slider */}
                            <div className="opacity-50">/mo for&nbsp;</div>
                            <div className="opacity-50">1,000,000 events</div> {/* event value from slider */}
                        </div>
                        <div className="text-xs">First 1 million events free - every month!</div>

                        <div className="p-2 border border-white my-4 text-center">
                            Get started {/* use 'primary' button, like in landingpage hero */}
                        </div>

                        <div className="text-center text-xs text-opacity-75 mt-2">
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
                                <div className="font-bold">1,000,000</div> {/* event value from slider */}
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
                                <div className="opacity-50 text-xs text-right">Monthly price per event</div>
                            </div>
                            <dl className="flex justify-between mb-0">
                                <dt className="mb-0 opacity-75 text-sm">First 1 million</dt>
                                <dd className="mb-0 font-bold">Free</dd>
                            </dl>
                            <dl className="flex justify-between mb-0">
                                <dt className="mb-0 opacity-75 text-sm">More than 1 million</dt>
                                <dd className="mb-0 font-bold">$0.000225</dd>
                            </dl>
                        </div>

                        <div className="flex justify-between">
                            <h4 className="text-base mb-0 text-lg font-bold">Estimated price</h4>
                            <div className="mb-0 font-bold flex items-baseline">
                                <div className="text-lg">$0</div> {/* price value from slider */}
                                <div className="opacity-50">/mo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Structure.Section>
    )
}
