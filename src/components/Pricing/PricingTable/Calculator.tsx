import { CallToAction } from 'components/CallToAction'
import { useActions, useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import { CLOUD_MINIMUM_PRICING, CLOUD_ENTERPRISE_MINIMUM_PRICING } from '../constants'
import { PricingSlider } from '../PricingSlider'
import { prettyInt, sliderCurve } from '../PricingSlider/LogSlider'
import { pricingSliderLogic } from '../PricingSlider/pricingSliderLogic'
import { motion } from 'framer-motion'

interface IPricingOptions {
    title: string
    subtitle: string
    badge: string
    breakdown?: number[]
}

const breakdownLabels = [
    'First 1 million',
    '1-10 million',
    '10-100 million',
    '100 million - 1 billion',
    'More than 1 billion',
]

const cloudOptions = {
    title: 'PostHog Cloud',
    subtitle: 'Turnkey, hosted & managed by PostHog',
    badge: 'Self-serve',
    breakdown: [0, 0.000225, 0.000075, 0.000025],
}

const cloudEnterpriseOptions = {
    title: 'PostHog Cloud Enterprise',
    subtitle: 'Turnkey, hosted solution with added benefits',
    badge: 'Includes Cloud features',
    breakdown: [300, 0.0003, 0.0001, 0.00003, 0.000006],
}

const openSourceOptions = {
    title: 'Open Source',
    subtitle: 'Great for startups',
    badge: 'Limited to 1 project',
}

const openSourceEnterpriseOptions = {
    title: 'Open Source Enterprise',
    subtitle: 'Your IT & legal teams will be very pleased',
    badge: 'Includes open source features',
    breakdown: [450, 0.00045, 0.00009, 0.000018, 0.0000036],
}

export default function Calculator({ selfHost, enterprise }: { selfHost: boolean; enterprise: boolean }) {
    const { finalMonthlyCost, sliderValue } = useValues(pricingSliderLogic)
    const [optionDetails, setOptionDetails] = useState<IPricingOptions | undefined>(cloudOptions)
    const [showFullBreakdown, setShowFullBreakdown] = useState(false)
    const breakdown = showFullBreakdown ? optionDetails?.breakdown : optionDetails?.breakdown?.slice(0, 2)
    const monthlyMinimumPrice = (
        !selfHost && enterprise ? CLOUD_ENTERPRISE_MINIMUM_PRICING : CLOUD_MINIMUM_PRICING
    ).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })

    const { setPricingOption, setSliderValue } = useActions(pricingSliderLogic)

    useEffect(() => {
        let optionDetails
        let pricingOption
        if (selfHost && enterprise) {
            optionDetails = openSourceEnterpriseOptions
            pricingOption = 'enterprise'
        }
        if (!selfHost && enterprise) {
            optionDetails = cloudEnterpriseOptions
            pricingOption = 'cloud-enterprise'
        }
        if (!selfHost && !enterprise) {
            optionDetails = cloudOptions
            pricingOption = 'cloud'
        }
        if (selfHost && !enterprise) {
            optionDetails = openSourceOptions
        } else {
            setPricingOption(pricingOption)
        }
        setOptionDetails(optionDetails)
    }, [selfHost, enterprise])

    useEffect(() => {
        setSliderValue(13.815510557964274)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="py-7 px-8 bg-white shadow-lg rounded-md md:max-w-[476px] w-full mx-auto"
        >
            <div>
                <div className="flex space-x-2 items-center">
                    <h3 className="m-0 text-lg">{optionDetails?.title}</h3>
                    <span
                        className={`text-[11px] py-1 px-2 rounded-sm border border-primary/50 opacity-50 font-normal leading-none`}
                    >
                        {optionDetails?.badge}
                    </span>
                </div>
                <p className="m-0 text-black/50 font-medium">{optionDetails?.subtitle}</p>
            </div>
            <div className="mt-5">
                <div className="flex items-center space-x-2 justify-between mb-3">
                    <p className="text-[15px] font-bold m-0">Monthly event volume</p>
                    <p className="text-[15px] font-bold m-0">
                        {prettyInt(sliderCurve(sliderValue))} events
                        <span className="text-[13px] opacity-50">/mo</span>
                    </p>
                </div>
                <div className="mb-12">
                    <PricingSlider />
                </div>
                {breakdown && (
                    <>
                        <ul className="grid gap-y-3 m-0 p-0">
                            {breakdown.map((price, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="flex items-center space-x-2 justify-between opacity-50 border-b border-dashed border-gray-accent-light pb-2 last:pb-0 last:border-b-0"
                                    >
                                        <p className="text-[14px] font-medium m-0">{breakdownLabels[index]}</p>
                                        <p className="text-[14px] font-medium m-0">${price}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <button
                            onClick={() => setShowFullBreakdown(!showFullBreakdown)}
                            className="p-2 w-full font-semibold text-black/50 bg-tan rounded-sm mt-4"
                        >
                            {showFullBreakdown ? 'Hide' : 'See'} full breakdown
                        </button>
                        <div className="flex items-center space-x-2 justify-between my-4 pb-2 border-b border-gray-accent-light border-dashed">
                            <p className="text-[15px] font-bold m-0">+ Monthly minimum</p>
                            <p className="text-[15px] font-bold m-0">
                                {selfHost && !enterprise ? '$0' : monthlyMinimumPrice}
                            </p>
                        </div>
                    </>
                )}
                <div className="flex space-x-2 justify-between items-center">
                    <h4 className="text-base m-0 font-bold leading-tight">
                        Estimated price
                        <br />
                        <span className="text-[13px] opacity-60 font-semibold">for 1 million events</span>
                        <span className="text-[12px] font-medium opacity-50">/mo</span>
                    </h4>
                    <p className="text[20px] font-bold">
                        ${selfHost && !enterprise ? 0 : finalMonthlyCost}
                        <span className="font-medium text-[15px] opacity-50">/mo</span>
                    </p>
                </div>
                <div className="mt-7">
                    <CallToAction type="primary" width="full" className="shadow-md">
                        Get started
                    </CallToAction>
                    <CallToAction
                        className="bg-white !border border-gray-accent-light text-black mt-3 shadow-md"
                        width="full"
                    >
                        Join a group demo
                    </CallToAction>
                </div>
            </div>
        </motion.div>
    )
}
