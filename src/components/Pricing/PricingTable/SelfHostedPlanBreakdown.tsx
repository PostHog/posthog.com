import React from 'react'

import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'
import { CallToAction } from '../../CallToAction'

import checkIcon from '../../../images/check.svg'

export const SelfHostedPlanBreakdown = () => {
    return (
        <Structure.Section width="4xl" className="py-12">
            <div className="flex justify-center">
                <div className="flex-0 border border-white rounded p-4 m-8 ml-0">
                    <h3>Free</h3>
                    <p className="opacity-50">Great for startups</p>

                    <div>
                        <span className="text-base font-bold">1 million</span> tracked users
                    </div>
                    <div>
                        <span className="text-base font-bold">1</span> project
                    </div>
                    <div>
                        <span className="text-base font-bold">3</span> team members
                    </div>

                    <ul className="list-none mt-4">
                        <li className="flex align-center">
                            <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                            <span>
                                Easy upgrade to <em>Scale</em>
                            </span>
                        </li>
                        <li className="flex align-center">
                            <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                            <span>Community support</span>
                        </li>
                        <li className="flex align-center hidden">
                            <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                            <span></span>
                        </li>
                    </ul>

                    <div className="opacity-50">Price</div>
                    <div className="flex items-baseline">
                        <div className="text-lg font-bold">Free</div>{' '}
                        {/* this note was a freebie! no calculation needed here. */}
                    </div>

                    <div className="p-2 border border-white my-4 text-center">
                        Contact us {/* use 'primary' button, like in landingpage hero */}
                    </div>

                    <div className="text-center text-xs mt-2">No credit card required</div>
                </div>

                <div className="border border-white rounded p-8 inline-flex flex-col md:flex-row items-center text-white">
                    <div className="flex-0 border border-white rounded p-4">
                        <h3>Scale</h3>
                        <p className="opacity-50">For large userbase or event volumes</p>

                        <div>
                            <span className="text-base font-bold">Unlimited</span> tracked users
                        </div>
                        <div>
                            <span className="text-base font-bold">Unlimited</span> projects
                        </div>
                        <div>
                            <span className="text-base font-bold">Unlimited</span> team members
                        </div>

                        <ul className="list-none mt-4">
                            <li className="flex align-center">
                                <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                                <span>Collaboration features</span>
                            </li>
                            <li className="flex align-center">
                                <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                                <span>User permissions</span>
                            </li>
                            <li className="flex align-center">
                                <img src={checkIcon} alt="checkmark" className="flex-0 mr-2" />
                                <span>Dedicated support</span>
                            </li>
                        </ul>

                        <div className="opacity-50">Monthly estimate</div>
                        <div className="flex items-baseline">
                            <div className="text-lg font-bold">$2,000</div>{' '}
                            {/* price value from slider, minimum of $2,000 */}
                            <div className="opacity-50">/mo for&nbsp;</div>
                            <div className="opacity-50">8,000,000 events</div> {/* event value from slider */}
                        </div>

                        <div className="p-2 border border-white my-4 text-center">
                            Contact us {/* use 'primary' button, like in landingpage hero */}
                        </div>

                        <div className="text-center text-xs mt-2">
                            $2,000 monthly minimum
                            <br />
                            No setup fees
                        </div>
                    </div>
                    <div className="flex-0 mt-8 md:mt-0 md:ml-8 max-w-lg">
                        <h3>Calculate your price</h3>
                        <p className="text-sm">Pay based on the events you capture each month.</p>

                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <h4 className="mb-0 text-base">Monthly event volume</h4>
                                <div className="font-bold">8,000,000</div> {/* event value from slider */}
                            </div>
                            slider
                            <br />
                            <div className="text-sm opacity-50">
                                &lt;8 million, 10 million, 100 million, 150 million
                                {/* Ideal: slider labels should be spaced realistically based on values, not evenly */}
                            </div>
                        </div>

                        <div className="p-2 mb-4 border border-white">
                            <div className="flex justify-between items-center">
                                <h4 className="mb-0 text-base">Event volume pricing</h4>
                                <div className="opacity-50 text-xs text-right">Monthly price per event</div>
                            </div>
                            <dl className="flex justify-between mb-0">
                                <dt className="mb-0 opacity-75 text-sm">First 10 million</dt>
                                <dd className="mb-0 font-bold">Free</dd>
                            </dl>
                            <dl className="flex justify-between mb-0">
                                <dt className="mb-0 opacity-75 text-sm">10-100 million</dt>
                                <dd className="mb-0 font-bold">$0.000045</dd>
                            </dl>
                            <dl className="flex justify-between mb-0">
                                <dt className="mb-0 opacity-75 text-sm">100 million - 1 billion</dt>
                                <dd className="mb-0 font-bold">$0.000009</dd>
                            </dl>
                            <dl className="flex justify-between mb-0">
                                <dt className="mb-0 opacity-75 text-sm">More than 1 billion events</dt>
                                <dd className="mb-0 font-bold">Even cheaper</dd>
                            </dl>
                        </div>

                        <div className="flex justify-between">
                            <h4 className="text-base mb-0 text-lg font-bold">Monthly minimum price</h4>
                            <div className="mb-0 font-bold flex items-baseline">
                                <div className="text-lg">$2,000</div>
                            </div>
                        </div>

                        <div className="text-white">----------</div>

                        <div className="flex justify-between">
                            <h4 className="text-base mb-0 text-lg font-bold">Estimated price</h4>
                            <div className="mb-0 font-bold flex items-baseline">
                                <div className="text-lg">$2,000</div> {/* price value from slider, minimum of $2,000 */}
                                <div className="opacity-50">/mo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Structure.Section>
    )
}
