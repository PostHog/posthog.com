import React from 'react'
import { useValues } from 'kea'
import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'
import { CallToAction } from '../../CallToAction'
import { pricingSliderLogic } from '../../PricingSlider/pricingSliderLogic'

import checkIcon from '../../../images/check.svg'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import './pricing.scss'

export const SelfHostedPlanBreakdown = () => {
    const { finalCost, eventNumber } = useValues(pricingSliderLogic)
    const eventNumberWithDelimiter = eventNumber.toLocaleString()

    return (
        <div className="grid grid-flow-row auto-rows-max mdlg:grid-flow-col mdlg:auto-cols-max justify-center items-start mb-20">
            <div className="flex flex-col border border-gray rounded-xl p-8 mb-8 mdlg:ml-0 mdlg:mr-8 min-w-[320px]">
                <h3 className="text-lg m-0">Open Source</h3>
                <p className="opacity-50 text-sm">Great for startups</p>
                <ul className="list-none pl-0 mb-6">
                    <li className="mb-1">
                        <span className="text-base font-bold">~1 million</span>
                        &nbsp;
                        <span className="text-sm text-opacity-75">tracked users</span>
                        <Tooltip
                            className="pl-1"
                            openClassName="max-w-[100px] border-gray"
                            title="The scale plan includes advanced tools and support to scale PostHog beyond 1 million users"
                        >
                            <InfoCircleOutlined style={{ verticalAlign: 0 }} />
                        </Tooltip>
                    </li>
                    <li className="mb-1">
                        <span className="text-base font-bold">1</span>
                        &nbsp;
                        <span className="text-sm text-opacity-75">project</span>
                    </li>
                    <li className="mb-1">
                        <span className="text-base font-bold">Unlimited</span>
                        &nbsp;
                        <span className="text-sm text-opacity-75">team members</span>
                    </li>
                </ul>
                <ul className="list-none text-opacity-70 text-sm pl-0 mb-6">
                    <li className="flex items-center mb-2 space-x-2">
                        <img src={checkIcon} alt="checkmark" width="20" height="20" className="mt-0" />
                        <span className="">
                            Easy upgrade to <em>Scale</em>
                        </span>
                    </li>
                    <li className="flex items-center mb-2 space-x-2">
                        <img src={checkIcon} alt="checkmark" width="20" height="20" className="mt-0" />
                        <span className="">Community support</span>
                    </li>
                </ul>
                <div className="mt-auto">
                    <div className="opacity-50">Price</div>
                    <div className="flex items-baseline">
                        <div className="text-lg font-bold">Free</div>
                    </div>

                    <div>
                        <CallToAction icon="none" href="/docs/self-host" className="my-4 !w-full">
                            Deploy now
                        </CallToAction>
                    </div>

                    <div className="text-xs text-center text-opacity-50 mt-2">
                        No credit card required <br />
                        &nbsp;
                    </div>
                </div>
            </div>

            <div className="rounded-xl inline-flex flex-col md:flex-row items-center md:items-start">
                <div className="flex justify-center">
                    <div className="inline-flex flex-col xl:flex-row items-center text-primary">
                        <div className="flex-0 border border-white border-opacity-10 rounded-xl p-8 md:mr-8 bg-primary w-full mdlg:min-w-[350px]">
                            <h3 className="text-lg m-0 text-white">Scale</h3>
                            <p className="opacity-50 text-sm text-white">For large userbases or event volume</p>
                            <ul className="list-none pl-0 mb-6 ">
                                <li className="mb-1 text-white">
                                    <span className="text-base font-bold">Unlimited</span>
                                    &nbsp;
                                    <span className="text-sm text-white text-opacity-75">tracked users</span>
                                </li>
                                <li className="mb-1 text-white">
                                    <span className="text-base font-bold">Unlimited</span>
                                    &nbsp;
                                    <span className="text-sm text-white text-opacity-75">projects</span>
                                </li>
                                <li className="mb-1 text-white">
                                    <span className="text-base font-bold">Unlimited</span>
                                    &nbsp;
                                    <span className="text-sm text-white text-opacity-75">team members</span>
                                </li>
                            </ul>
                            <ul className="list-none text-sm pl-0 mb-6 text-white text-opacity-70">
                                <li className="flex items-center mb-2 space-x-2">
                                    <img src={checkIcon} alt="checkmark" width="20" height="20" className="mt-0" />
                                    <span className="">Collaboration features</span>
                                </li>
                                <li className="flex items-center mb-2 space-x-2">
                                    <img src={checkIcon} alt="checkmark" width="20" height="20" className="mt-0" />
                                    <span className="">User permissions</span>
                                </li>
                                <li className="flex items-center mb-2 space-x-2">
                                    <img src={checkIcon} alt="checkmark" width="20" height="20" className="mt-0" />
                                    <span className="">Dedicated support</span>
                                </li>
                            </ul>

                            <div className="opacity-50 text-white">Monthly estimate</div>
                            <div className="flex items-baseline text-white">
                                <div className="text-lg font-bold">${finalCost}</div>
                                <div className="opacity-50">/mo for&nbsp;</div>
                                <div className="opacity-50">{eventNumberWithDelimiter} events</div>
                            </div>

                            <div>
                                <CallToAction
                                    icon="none"
                                    href="https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u"
                                    className="my-4 !w-full"
                                    type="secondary"
                                >
                                    Contact us
                                </CallToAction>
                            </div>

                            <div className="text-center text-xs text-opacity-50 text-white mt-2">
                                $2,000 monthly minimum
                                <br />
                                No setup costs
                            </div>
                        </div>
                        <div className="flex-0 mt-8 xl:mt-0 max-w-lg min-w-[350px]">
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
                                <PricingSlider
                                    marks={[8000000, 10000000, 100000000, 150000000]}
                                    min={8000000}
                                    max={150000000}
                                />
                            </div>

                            <div className="mb-4 border border-white border-opacity-10 rounded">
                                <div className="flex justify-between items-baseline p-2 rounded mb-1 bg-gray-accent-light">
                                    <div className="mb-0 text-xs text-almost-black text-opacity-75">Event volume</div>
                                    <div className="opacity-50 text-2xs text-right">Monthly price per event</div>
                                </div>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-xs">First 10 million</dt>
                                    <dd className="mb-0 font-bold text-xs">$0.000225</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-xs">10-100 million</dt>
                                    <dd className="mb-0 font-bold text-xs">$0.000045</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2">
                                    <dt className="mb-0 opacity-75 text-xs">100 million - 1 billion</dt>
                                    <dd className="mb-0 font-bold text-xs">$0.000009</dd>
                                </dl>
                                <dl className="flex justify-between mb-0 p-2 pb-3">
                                    <dt className="mb-0 opacity-75 text-xs">More than 1 billion</dt>
                                    <dd className="mb-0 font-bold text-xs">Even cheaper</dd>
                                </dl>
                            </div>

                            <div className="flex justify-between items-baseline">
                                <div className="mb-0 text-sm font-bold text-almost-black text-opacity-75">
                                    Monthly minimum price
                                </div>
                                <div className="mb-0 flex items-baseline">
                                    <div className="text-base">${finalCost}</div>
                                    <div className="opacity-50">/mo</div>
                                </div>
                            </div>

                            <hr className="border-gray-accent-light bg-transparent border-dashed border-r-0 border-b-0 border-left-0 my-2 border-t" />

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
            </div>
        </div>
    )
}
