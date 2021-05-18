import React from 'react'

import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'

import checkIcon from '../../../images/check.svg'

export const PricingTable = () => {
    return (
        <div className="pricing-hero text-white">
            <Structure.Section width="4xl" className="py-12">
                {/* start: Cloud plan tab */}
                <div className="flex justify-center">
                    <div className="bg-deep-blue bg-opacity-30 rounded-lg p-8 inline-flex flex-col md:flex-row items-center text-white">
                        <div className="flex-0 border border-white border-opacity-10 rounded p-8 bg-royal-blue">
                            <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 42 24"
                                width="42"
                                height="24"
                            >
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
                                    <img
                                        src={checkIcon}
                                        alt="checkmark"
                                        width="20"
                                        height="20"
                                        className="flex-0 mr-2"
                                    />
                                    <span className="">Hosted by PostHog</span>
                                </li>
                                <li className="flex align-center mb-2">
                                    <img
                                        src={checkIcon}
                                        alt="checkmark"
                                        width="20"
                                        height="20"
                                        className="flex-0 mr-2"
                                    />
                                    <span className="">Automatic upgrades</span>
                                </li>
                                <li className="flex align-center">
                                    <img
                                        src={checkIcon}
                                        alt="checkmark"
                                        width="20"
                                        height="20"
                                        className="flex-0 mr-2"
                                    />
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
                {/* end: Cloud plan tab */}

                <br />
                <br />
                <br />

                {/* start: Self-hosted plans tab */}
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
                                    <div className="text-lg">$2,000</div>{' '}
                                    {/* price value from slider, minimum of $2,000 */}
                                    <div className="opacity-50">/mo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end: Self-hosted plans tab */}
            </Structure.Section>
        </div>
    )
}
