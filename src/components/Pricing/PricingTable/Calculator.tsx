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
    icon: React.ReactNode
}

interface IconProps {
    className?: string
}

const CloudIcon = ({ className = '' }: IconProps) => {
    return (
        <svg
            className={className}
            width="36"
            height="24"
            viewBox="0 0 36 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.7322 11.3038C31.5466 6.10751 26.536 2.58203 21.6184 3.97451C16.979 -2.98357 6.12288 -0.107886 5.75316 8.33519C-2.96856 10.7469 -1.2978 23.9236 7.88785 23.9236H29.5991C36.9283 23.9236 38.5062 13.5314 31.7338 11.3052L31.7322 11.3038Z"
                fill="black"
            />
        </svg>
    )
}

const SelfHostIcon = ({ className = '' }: IconProps) => {
    return (
        <svg
            className={className}
            width="32"
            height="26"
            viewBox="0 0 32 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32 5C32 2.23875 29.7612 0 27 0H5C2.23875 0 -4.07046e-07 2.23875 -4.07046e-07 5V7C-4.07046e-07 9.76125 2.23875 12 5 12H15V16.0998C13.2025 16.4648 11.7549 17.7936 11.2211 19.5248C11.1499 19.5085 11.0761 19.4998 10.9999 19.4998H0.999869C0.447356 19.4998 -0.000131607 19.9473 -0.000131607 20.4998C-0.000131607 21.0523 0.447356 21.4998 0.999869 21.4998H11.0248C11.2748 24.026 13.4073 25.9996 15.9999 25.9996C18.5924 25.9996 20.725 24.0259 20.9749 21.4998H30.9999C31.5524 21.4998 31.9999 21.0523 31.9999 20.4998C31.9999 19.9473 31.5524 19.4998 30.9999 19.4998H20.9999C20.9236 19.4998 20.8499 19.5085 20.7786 19.5248C20.2449 17.7935 18.7974 16.4648 16.9997 16.0998V12H26.9997C29.761 12 31.9997 9.76125 31.9997 7L32 5ZM4 6C4 4.89501 4.89501 4 6 4C7.10499 4 8 4.89501 8 6C8 7.10499 7.10499 8 6 8C4.89501 8 4 7.10499 4 6ZM12 4C10.895 4 10 4.89501 10 6C10 7.10499 10.895 8 12 8C13.105 8 14 7.10499 14 6C14 4.89501 13.105 4 12 4Z"
                fill="black"
            />
        </svg>
    )
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
    subtitle: 'Turnkey, hosted by PostHog',
    badge: 'Self-serve',
    breakdown: [0, 0.000225, 0.000075, 0.000025],
    icon: <CloudIcon className="opacity-30 w-[36px]" />,
}

const cloudEnterpriseOptions = {
    title: 'PostHog Cloud',
    subtitle: 'Managed & supported by PostHog',
    badge: 'Enterprise',
    breakdown: [300, 0.0003, 0.0001, 0.00003, 0.000006],
    icon: <CloudIcon className="opacity-30 w-[36px]" />,
}

const selfHostedOptions = {
    title: 'PostHog Self-hosted',
    subtitle: 'Deploy to your infrastructure or private cloud',
    badge: 'Self serve',
    icon: <SelfHostIcon className="opacity-30 w-[36px]" />,
}

const selfHostedEnterpriseOptions = {
    title: 'PostHog Self-hosted',
    subtitle: 'Deploy to your infrastructure or private cloud',
    badge: 'Enterprise',
    breakdown: [450, 0.00045, 0.00009, 0.000018, 0.0000036],
    icon: <SelfHostIcon className="opacity-30 w-[36px]" />,
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
            optionDetails = selfHostedEnterpriseOptions
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
            optionDetails = selfHostedOptions
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
            <div className="flex">
                <span className="inline-block mr-2">{optionDetails?.icon}</span>
                <div>
                    <div className="flex items-center flex-wrap">
                        <h3 className="m-0 text-lg mr-2">{optionDetails?.title}</h3>
                        <span
                            className={`text-[11px] py-1 px-2 rounded-sm border border-primary/50 opacity-50 font-normal leading-none`}
                        >
                            {optionDetails?.badge}
                        </span>
                    </div>
                    <p className="m-0 text-black/50 font-medium">{optionDetails?.subtitle}</p>
                </div>
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
