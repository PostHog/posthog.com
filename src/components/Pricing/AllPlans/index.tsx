import { TrackedCTA } from 'components/CallToAction'
import React, { useState } from 'react'
import { PlanComparison } from '../PlanComparison'
import { CloudIcon, SelfHostIcon } from '../Calculator/index'
import { motion } from 'framer-motion'

interface IPlan {
    title: string
    description: string
    pricing: {
        event: number
        monthly?: number
    }
    mainCTA: {
        title: string
        url: string
    }
    demoCTA?: {
        title: string
        url: string
    }
    pricingOption: string
}

const cloudPlans: IPlan[] = [
    {
        title: 'Self-serve',
        description: 'with community support',
        pricing: {
            event: 0.00045,
        },
        mainCTA: {
            title: 'Get started',
            url: 'https://app.posthog.com/signup',
        },
        pricingOption: 'cloud',
    },
    {
        title: 'with Enterprise package',
        description: 'Slack-based priority support, SSO, advanced permissions',
        pricing: {
            event: 0.00045,
            monthly: 450,
        },
        mainCTA: {
            title: 'Get in touch',
            url: '/signup/cloud/enterprise',
        },
        pricingOption: 'cloud-enterprise',
    },
]

const selfHostPlans: IPlan[] = [
    {
        title: 'Self-serve',
        description: 'with community support',
        pricing: {
            event: 0.00045,
        },
        mainCTA: {
            title: 'Get started',
            url: 'https://license.posthog.com/',
        },
        pricingOption: 'self-hosted',
    },
    {
        title: 'with Enterprise package',
        description: 'Slack-based priority support, SSO, advanced permissions',
        pricing: {
            event: 0.00045,
            monthly: 450,
        },
        mainCTA: {
            title: 'Get started',
            url: 'https://license.posthog.com/?price_id=price_1L1AeWEuIatRXSdzj0Y5ioOU',
        },
        pricingOption: 'self-hosted-enterprise',
    },
    {
        title: 'Open Source',
        description: 'Limited, but free forever',
        pricing: {
            event: '0',
        },
        mainCTA: {
            title: 'Visit GitHub',
            url: 'https://github.com/PostHog/posthog',
        },
        pricingOption: 'open-source',
    },
]

const Plan = ({ plan }: { plan: IPlan }) => {
    return (
        <li className="flex flex-col">
            <h4 className="m-0 text-base">{plan.title}</h4>
            <div className="my-2">
                <h5 className="text-sm opacity-50 m-0 font-medium">Starts at</h5>
                <p className="m-0">
                    {plan.pricing.monthly && (
                        <>
                            <strong>${plan.pricing.monthly}</strong>
                            <span className="text-[13px] opacity-50">/mo</span>
                            <span className="inline-block opacity-50 mx-2">+</span>
                        </>
                    )}
                </p>
            </div>
            <p className="m-0 pb-4 text-black/50 font-medium leading-tight text-sm">{plan.description}</p>
            <TrackedCTA
                event={{ name: `clicked ${plan.mainCTA.title}`, type: plan.pricingOption }}
                type="primary"
                width="full"
                className="shadow-md mt-auto"
                to={plan.mainCTA.url}
                size="sm"
            >
                {plan.mainCTA.title}
            </TrackedCTA>
        </li>
    )
}

const PlanSection = ({
    title,
    subtitle,
    Icon,
    plans,
}: {
    title: string
    subtitle: string
    Icon: any
    plans: IPlan[]
}) => {
    return (
        <div>
            <div className="flex">
                <Icon className="opacity-30 w-[36px] mr-2" />
                <div>
                    <h3 className="m-0 text-lg">{title}</h3>
                    <p className="m-0 text-black/50 font-medium text-[14px]">{subtitle}</p>
                </div>
            </div>
            <ul className="list-none grid sm:grid-cols-3 m-0 p-0 sm:gap-x-6 sm:gap-y-0 gap-y-6 mt-5 pt-9 border-gray-accent-light border-dashed border-t">
                {plans.map((plan) => {
                    return <Plan key={plan.title} plan={plan} />
                })}
            </ul>
        </div>
    )
}

export default function AllPlans() {
    const [showComparison, setShowComparison] = useState(false)
    return (
        <>
            <div
                className={`grid md:grid-cols-2 md:gap-x-6 md:gap-y-0 gap-y-10 my-9 transition-all ${
                    showComparison ? 'lg:ml-[180px]' : ''
                }`}
            >
                <PlanSection
                    title="PostHog Cloud"
                    subtitle="Turnkey, hosted & managed by PostHog"
                    Icon={CloudIcon}
                    plans={cloudPlans}
                />
                <PlanSection
                    title="Self-hosted"
                    subtitle="Deploy to your private cloud or infrastructure"
                    Icon={SelfHostIcon}
                    plans={selfHostPlans}
                />
            </div>
            {showComparison && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="mb-9">
                    <PlanComparison />
                </motion.div>
            )}
            {!showComparison && (
                <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="p-3 w-full font-semibold text-black/50 bg-gray-accent rounded-sm text-sm"
                >
                    Show full comparison
                </button>
            )}
        </>
    )
}
