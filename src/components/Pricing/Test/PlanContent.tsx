import React from 'react'
import { IconCheck } from '@posthog/icons'
import Plans, { CTA as PlanCTA, PricingTiers } from '../Plans'

export const FreePlanContent = ({ onFreeTierClick }) => {
    return (
        <>
            <div>
                <h4 className="text-xl mb-0">Free</h4>
                <p className="text-sm opacity-75">No credit card required</p>

                <ul className="list-none p-0 mb-4 space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                        <IconCheck className="text-green inline-block size-5" />
                        <span>
                            Generous{' '}
                            <button onClick={onFreeTierClick} className="text-red dark:text-yellow font-semibold">
                                monthly free tier
                            </button>
                        </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                        <IconCheck className="text-green inline-block size-5" />
                        Community support
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                        <IconCheck className="text-green inline-block size-5" />1 project, 1-year data retention
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                        <IconCheck className="text-green inline-block size-5" />
                        Unlimited team members
                    </li>
                </ul>
            </div>
            <div className="mt-auto">
                <div className="mb-4">
                    <label className="block opacity-75 text-[15px] mb-1">Cloud region</label>
                    <div className="flex gap-2">
                        <button className="flex-1 flex flex-col items-center py-1.5 px-2 text-sm rounded border border-yellow bg-yellow/25 dark:bg-white/5 font-bold">
                            US (Virginia)
                        </button>
                        <button className="flex-1 flex flex-col items-center py-1.5 px-2 text-sm rounded border border-light hover:border-dark/50 dark:border-dark dark:hover:border-light/50 bg-transparent">
                            EU (Frankfurt)
                        </button>
                    </div>
                </div>
                <PlanCTA intent="free" size="lg" width="full" />
                <p className="text-sm text-center mt-4 mb-0 opacity-75">
                    <strong>128 companies</strong> signed up today
                </p>
            </div>
        </>
    )
}

export const PaidPlanContent = ({ onFreeTierClick }) => {
    return (
        <>
            <div>
                <span className="text-70 text-[15px]">From</span>
                <div className="flex items-baseline">
                    <h4 className="text-xl mb-0">$0</h4>
                    <span className="opacity-70 text-sm">/mo</span>
                </div>
                <p className="text-sm mt-2">
                    <button className="text-red dark:text-yellow font-semibold text-[15px]">Estimate your price</button>
                </p>

                <ul className="list-none p-0 mb-4 space-y-1">
                    <li className="flex items-start gap-2 text-sm">
                        <IconCheck className="text-green inline-block size-5" />
                        <span>
                            Generous{' '}
                            <button onClick={onFreeTierClick} className="text-red dark:text-yellow font-semibold">
                                monthly free tier
                            </button>
                        </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                        <IconCheck className="text-green inline-block size-5" />
                        <span>
                            Then,{' '}
                            <strong className="bg-yellow/50 dark:bg-white/10 p-0.5 font-semibold">
                                usage-based pricing
                            </strong>
                        </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                        <IconCheck className="text-green inline-block size-5" />
                        <span>
                            <strong className="bg-yellow/50 dark:bg-white/10 p-0.5 font-semibold">Email</strong> support
                        </span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                        <IconCheck className="text-green inline-block size-5" />
                        Unlimited team members
                    </li>
                </ul>
            </div>
            <div className="mt-auto">
                <div className="mb-4">
                    <label className="block opacity-75 text-[15px] mb-1">Cloud region</label>
                    <div className="flex gap-2">
                        <button className="flex-1 flex flex-col items-center py-1.5 px-2 text-sm rounded border border-yellow bg-yellow/25 dark:bg-white/5 font-bold">
                            US (Virginia)
                        </button>
                        <button className="flex-1 flex flex-col items-center py-1.5 px-2 text-sm rounded border border-light hover:border-dark/50 dark:border-dark dark:hover:border-light/50 bg-transparent">
                            EU (Frankfurt)
                        </button>
                    </div>
                </div>
                <PlanCTA intent="free" size="lg" width="full" />
                <p className="text-sm text-center mt-4 mb-0 opacity-75">
                    <strong>128 companies</strong> signed up today
                </p>
            </div>
        </>
    )
}
