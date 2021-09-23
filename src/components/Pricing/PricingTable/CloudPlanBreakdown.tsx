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
                <div className="grid grid-cols-2 text-primary">
                    {/* <div className="flex-0 w-full border border-white border-opacity-10 rounded-xl p-8 bg-almost-black text-white min-w-[320px]">
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
                                href="https://app.posthog.com/signup?src=pricing-page"
                                className="my-4 !w-full"
                            >
                                Get started
                            </CallToAction>
                        </div>

                        <div className="text-center text-xs text-opacity-50 text-white mt-2">
                            {eventNumber === 10000 ? 'Self-serve. No credit card required.' : 'Completely self-serve'}
                        </div>
                    </div> */}
                    <Plan
                        title="PostHog Cloud"
                        subtitle="Turnkey, hosted solution"
                        className="border border-dashed border-gray-accent-light rounded-sm bg-white bg-opacity-20"
                    >
                        <Section title="Platform">
                            <Features features={features['Platform']} className="grid-cols-2" />
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
