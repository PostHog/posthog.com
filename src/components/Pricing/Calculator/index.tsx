import { TrackedCTA } from 'components/CallToAction'
import { useActions, useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import {
    CLOUD_MINIMUM_PRICING,
    CLOUD_ENTERPRISE_MINIMUM_PRICING,
    ENTERPRISE_MINIMUM_PRICING,
    SCALE_MINIMUM_PRICING,
    pricing,
    pricingLabels,
} from '../constants'
import { PricingSlider } from '../PricingSlider'
import { prettyInt, sliderCurve } from '../PricingSlider/LogSlider'
import { pricingSliderLogic } from '../PricingSlider/pricingSliderLogic'
import { motion } from 'framer-motion'
import Link from 'components/Link'
import Toggle from 'components/Toggle'

interface IPricingOptions {
    minimumPrice: number
    title: string
    subtitle: string
    badge: string
    breakdown?: number[]
    icon: React.ReactNode
    mainCTA: {
        title: string
        url: string
    }
    demoCTA?: {
        title: string
        url: string
    }
}

interface IconProps {
    className?: string
}

export const CloudIcon = ({ className = '' }: IconProps) => {
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

export const SelfHostIcon = ({ className = '' }: IconProps) => {
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

const cloudOptions = {
    minimumPrice: CLOUD_MINIMUM_PRICING,
    title: 'PostHog Cloud',
    subtitle: 'Turnkey, hosted by PostHog',
    badge: 'Self-Serve',
    icon: <CloudIcon className="opacity-30 w-[36px]" />,
    mainCTA: {
        title: 'Get started',
        url: 'https://app.posthog.com/signup',
    },
    demoCTA: {
        title: 'Join a group demo',
        url: '/signup/self-host/get-in-touch?plan=cloud&demo=group#demo',
    },
}

const cloudEnterpriseOptions = {
    minimumPrice: CLOUD_ENTERPRISE_MINIMUM_PRICING,
    title: 'PostHog Cloud',
    subtitle: 'Managed & supported by PostHog',
    badge: 'Enterprise',
    icon: <CloudIcon className="opacity-30 w-[36px]" />,
    mainCTA: {
        title: 'Get in touch',
        url: '/signup/self-host/get-in-touch?plan=enterprise#contact',
    },
    demoCTA: {
        title: 'Book a demo',
        url: '/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo',
    },
}

const cloudEnterpriseOptions2 = {
    minimumPrice: ENTERPRISE_MINIMUM_PRICING,
    title: 'PostHog',
    subtitle: 'Deploy to your infrastructure or private cloud',
    badge: 'Enterprise',
    icon: <SelfHostIcon className="opacity-30 w-[36px]" />,

    mainCTA: {
        title: 'Get in touch',
        url: '/signup/cloud/enterprise',
    },
    demoCTA: {
        title: 'Book a demo',
        url: '/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo',
    },
}

const selfHostedOptions = {
    minimumPrice: SCALE_MINIMUM_PRICING,
    title: 'PostHog Self-Hosted',
    subtitle: 'Deploy to your infrastructure or private cloud',
    badge: 'Self-Serve',
    icon: <SelfHostIcon className="opacity-30 w-[36px]" />,
    mainCTA: {
        title: 'Get started',
        url: 'https://license.posthog.com/',
    },
    demoCTA: {
        title: 'Join a group demo',
        url: '/signup/self-host/get-in-touch?plan=self-host&demo=group#demo',
    },
}

const selfHostedEnterpriseOptions = {
    minimumPrice: ENTERPRISE_MINIMUM_PRICING,
    title: 'PostHog',
    subtitle: 'Deploy to your infrastructure or private cloud',
    badge: 'Enterprise',
    icon: <SelfHostIcon className="opacity-30 w-[36px]" />,
    mainCTA: {
        title: 'Get started',
        url: 'https://license.posthog.com/?price_id=price_1L1AeWEuIatRXSdzj0Y5ioOU',
    },
    demoCTA: {
        title: 'Book a demo',
        url: '/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo',
    },
}

export default function Calculator({
    selfHost,
    enterprise,
    enterpriseMode,
    handleEnterpriseModeChange,
    setCurrentModal,
}: {
    selfHost: boolean
    enterprise: boolean
    enterpriseMode: boolean
    handleEnterpriseModeChange: (checked: boolean) => void
    setCurrentModal: (currentModal: string) => void
}) {
    const { finalMonthlyCost, sliderValue, pricingOption } = useValues(pricingSliderLogic)
    const [optionDetails, setOptionDetails] = useState<IPricingOptions | undefined>(cloudOptions)
    const breakdown = pricing[pricingOption]
    const monthlyMinimumPrice =
        optionDetails &&
        optionDetails.minimumPrice.toLocaleString('en-US', {
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
            pricingOption = 'self-hosted-enterprise'
        }
        if (!selfHost && enterprise) {
            optionDetails = cloudEnterpriseOptions2
            pricingOption = 'cloud-enterprise'
        }
        if (!selfHost && !enterprise) {
            optionDetails = cloudOptions
            pricingOption = 'cloud'
        }
        if (selfHost && !enterprise) {
            optionDetails = selfHostedOptions
            pricingOption = 'self-hosted'
        }
        setPricingOption(pricingOption)
        setOptionDetails(optionDetails)
    }, [selfHost, enterprise])

    useEffect(() => {
        setSliderValue(13.815510557964274)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="bg-transparent w-full"
        >
            <div>
                <div className="pb-6 mb-6 border-b border-gray-accent-light border-dashed">
                    <div className="flex justify-between items-center">
                        <h4 className="text-base m-0 ">Enterprise mode</h4>
                        <Toggle checked={enterpriseMode} onChange={handleEnterpriseModeChange} />
                    </div>
                    <p className="text-sm m-0 text-black/60 my-1">
                        Starts at $450/mo and comes with SSO, advanced permissions, and a dedicated Slack channel for
                        support
                    </p>
                    <button className="font-semibold text-red text-sm" onClick={() => setCurrentModal('enterprise')}>
                        Details
                    </button>
                </div>
                <h4 className="text-base font-bold m-0 ">Estimate your price</h4>
                <p className="text-sm font-bold m-0 text-black/60">Monthly event volume</p>
                <div className="mb-12 mt-3">
                    <PricingSlider
                        marks={[1000000, 2000000, 10000000, 100000000, 1000000000]}
                        min={1000000}
                        max={1000000000}
                    />
                </div>
                {pricingOption && (
                    <>
                        <ul className="grid gap-y-2 m-0 p-0">
                            {breakdown.map((price, index) => {
                                const label = pricingLabels[price[0]]
                                return (
                                    <li
                                        key={index}
                                        className="flex items-center space-x-2 justify-between opacity-50 border-b border-dashed border-gray-accent-light pb-2 last:pb-0 last:border-b-0"
                                    >
                                        <p className="text-[14px] font-medium m-0">
                                            {label || '100 million - 1 billion'}
                                        </p>
                                        <p className="text-[14px] font-medium m-0">
                                            {price[1] === 0 ? (enterpriseMode ? 'Included' : 'Free') : `$${price[1]}`}
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                )}

                <p className="text-sm text-center pt-4 pb-0 m-0 text-black/50">
                    B2C company with millions of users?
                    <br />
                    <Link to="/signup/b2c" className="font-bold">
                        Apply for a volume pricing plan
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}
