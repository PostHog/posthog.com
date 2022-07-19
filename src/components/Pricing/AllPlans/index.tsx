import { CallToAction, TrackedCTA } from 'components/CallToAction'
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
            event: 0.000225,
        },
        mainCTA: {
            title: 'Get started',
            url: 'https://app.posthog.com/signup',
        },
        demoCTA: {
            title: 'Join a group demo',
            url: '/signup/self-host/get-in-touch?plan=cloud&demo=group#demo',
        },
        pricingOption: 'cloud',
    },
    {
        title: 'Enterprise',
        description: 'with dedicated, proactive support',
        pricing: {
            event: 0.0003,
            monthly: 300,
        },
        mainCTA: {
            title: 'Get in touch',
            url: '/signup/self-host/get-in-touch?plan=enterprise#contact',
        },
        demoCTA: {
            title: 'Book a demo',
            url: '/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo',
        },
        pricingOption: 'cloud-enterprise',
    },
]

const selfHostPlans: IPlan[] = [
    {
        title: 'Self-serve',
        description: 'with community support',
        pricing: {
            event: 0.0003,
        },
        mainCTA: {
            title: 'Get started',
            url: '/signup/self-host/deploy',
        },
        demoCTA: {
            title: 'Join a group demo',
            url: '/signup/self-host/get-in-touch?plan=self-host&demo=group#demo',
        },
        pricingOption: 'scale',
    },
    {
        title: 'Enterprise',
        description: 'with dedicated, proactive support',
        pricing: {
            event: 0.00045,
            monthly: 450,
        },
        mainCTA: {
            title: 'Get started',
            url: 'https://license.posthog.com/?price_id=price_1L1AeWEuIatRXSdzj0Y5ioOU',
        },
        demoCTA: {
            title: 'Book a demo',
            url: '/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo',
        },
        pricingOption: 'enterprise',
    },
]

const Plan = (plan: IPlan) => {
    return (
        <li>
            <h4 className="m-0 text-lg">{plan.title}</h4>
            <p className="m-0 text-black/50 font-medium text-[14px]">{plan.description}</p>
            <div className="my-7">
                <h5 className="text-[15px] opacity-50 m-0 font-medium">Pricing</h5>
                <p className="m-0">
                    {plan.pricing.monthly && (
                        <>
                            <strong>${plan.pricing.monthly}</strong>
                            <span className="text-[13px] opacity-50">/monthly</span>
                            <span className="inline-block opacity-50 mx-2">+</span>
                        </>
                    )}
                    <span>
                        <strong>${plan.pricing.event}</strong>
                        <span className="text-[13px] opacity-50">/event</span>
                    </span>
                </p>
            </div>
            <TrackedCTA
                event={{ name: `clicked ${plan.mainCTA.title}`, type: plan.pricingOption }}
                type="primary"
                width="full"
                className="shadow-md"
                to={plan.mainCTA.url}
            >
                {plan.mainCTA.title}
            </TrackedCTA>
            {plan.demoCTA && (
                <TrackedCTA
                    event={{ name: `clicked ${plan.demoCTA?.title}`, type: plan.pricingOption }}
                    className="bg-white !border border-gray-accent-light !text-black mt-3 shadow-md"
                    width="full"
                    to={plan.demoCTA?.url}
                >
                    {plan.demoCTA?.title}
                </TrackedCTA>
            )}
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
            <ul className="list-none grid sm:grid-cols-2 m-0 p-0 sm:gap-x-6 sm:gap-y-0 gap-y-6 mt-5 pt-9 border-gray-accent-light border-dashed border-t">
                {plans.map((plan) => {
                    return <Plan key={plan.title} {...plan} />
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
                    className="p-3 w-full font-semibold text-black/50 bg-gray-accent rounded-sm"
                >
                    Show full comparison
                </button>
            )}
        </>
    )
}
