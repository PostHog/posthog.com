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
        other?: string
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
        title: 'Scale',
        description: 'with community support & volume discounts',
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
        title: 'Scale Plus',
        description: 'SSO, project permissions, dashboard permissions',
        pricing: {
            event: 0.0005626,
            monthly: 450,
        },
        mainCTA: {
            title: 'Get started',
            url: 'https://app.posthog.com/signup',
        },
        pricingOption: 'scale-plus',
    },
]

const enterprisePlans: IPlan[] = [
    {
        title: 'Enterprise',
        description: 'Priority support, advanced permissions, team training',
        pricing: {
            other: 'Contact us',
            event: 0,
        },
        mainCTA: {
            title: 'Book a call',
            url: '/book-a-demo',
        },
        pricingOption: 'enterprise',
    },
]

const Plan = ({ plan }: { plan: IPlan }) => {
    return (
        <li className="flex flex-col">
            <h4 className="m-0 text-base">{plan.title}</h4>
            <div className="my-2">
                <h5 className="text-sm opacity-50 m-0 font-medium">Pricing</h5>
                <p className="m-0">
                    {plan.pricing.monthly ? (
                        <span>
                            <strong>${plan.pricing.monthly}</strong>
                            <span className="text-[13px] opacity-50">/mo</span>
                            <span className="inline-block opacity-50 mx-2">{plan.pricing.event ? '+' : ''}</span>
                        </span>
                    ) : (
                        plan.pricing.other && (
                            <span>
                                <strong>{plan.pricing.other}</strong>
                            </span>
                        )
                    )}
                    <span>
                        <strong>{plan.pricing.event ? `$${plan.pricing.event}` : ''}</strong>
                        <span className="text-[13px] opacity-50">{plan.pricing.event ? '/event' : ''}</span>
                    </span>
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
    className = '',
}: {
    title: string
    subtitle: string
    Icon: any
    plans: IPlan[]
    className?: string
}) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex">
                <Icon className="opacity-30 w-[36px] mr-2" />
                <div>
                    <h3 className="m-0 text-lg">{title}</h3>
                    <p className="m-0 text-black/50 font-medium text-[14px]">{subtitle}</p>
                </div>
            </div>
            <ul
                className={`grow list-none grid m-0 p-0 sm:gap-x-6 sm:gap-y-0 gap-y-6 mt-5 pt-9 border-gray-accent-light border-dashed border-t sm:grid-cols-${plans.length}`}
            >
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
                className={`grid md:grid-cols-3 md:gap-x-6 md:gap-y-0 gap-y-10 my-9 transition-all ${
                    showComparison ? 'lg:ml-[180px]' : ''
                }`}
            >
                <PlanSection
                    className="md:col-span-2"
                    title="Standard"
                    subtitle="Everything you need to build great products"
                    Icon={CloudIcon}
                    plans={cloudPlans}
                />
                <PlanSection
                    className="md:col-span-1"
                    title="Enterprise"
                    subtitle="+ Security, compliance, and permissioning"
                    Icon={SelfHostIcon}
                    plans={enterprisePlans}
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
