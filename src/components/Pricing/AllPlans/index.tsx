import { CallToAction } from 'components/CallToAction'
import React, { useState } from 'react'
import { PlanComparison } from '../PlanComparison'
import { CloudIcon, SelfHostIcon } from '../PricingTable/Calculator'

interface IPlan {
    title: string
    description: string
    pricing: {
        event: number
        monthly?: number
    }
    getStartedURL: string
    demo: {
        title: string
        url: string
    }
}

const cloudPlans: IPlan[] = [
    {
        title: 'Self-serve',
        description: 'with community support',
        pricing: {
            event: 0.000225,
        },
        getStartedURL: '',
        demo: {
            title: 'Join a group demo',
            url: '',
        },
    },
    {
        title: 'Enterprise',
        description: 'with dedicated, proactive support',
        pricing: {
            event: 0.0003,
            monthly: 300,
        },
        getStartedURL: '',
        demo: {
            title: 'Book a demo',
            url: '',
        },
    },
]

const selfHostPlans: IPlan[] = [
    {
        title: 'Self-serve',
        description: 'with community support',
        pricing: {
            event: 0.0003,
        },
        getStartedURL: '',
        demo: {
            title: 'Book a demo',
            url: '',
        },
    },
    {
        title: 'Enterprise',
        description: 'with dedicated, proactive support',
        pricing: {
            event: 0.00045,
            monthly: 450,
        },
        getStartedURL: '',
        demo: {
            title: 'Book a demo',
            url: '',
        },
    },
]

const Plan = (plan: IPlan) => {
    return (
        <li>
            <h4 className="m-0 text-lg">{plan.title}</h4>
            <p className="m-0 text-black/50 font-medium">{plan.description}</p>
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
            <CallToAction type="primary" width="full" className="shadow-md" to={plan.getStartedURL}>
                Get started
            </CallToAction>
            <CallToAction
                className="bg-white !border border-gray-accent-light text-black mt-3 shadow-md"
                width="full"
                to={plan.demo.url}
            >
                {plan.demo.title}
            </CallToAction>
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
                    <p className="m-0 text-black/50 font-medium">{subtitle}</p>
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
            <div className="flex">
                <div className="grow-0 shrink-0 basis-[150px]">Hello</div>
                <div className="flex-1 grid md:grid-cols-2 md:gap-x-6 md:gap-y-0 gap-y-10 mt-9">
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
            </div>
            <div className="mt-9">
                {showComparison && <PlanComparison />}
                <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="p-3 w-full font-semibold text-black/50 bg-gray-accent rounded-sm ml-[150px]"
                >
                    {showComparison ? 'Hide' : 'Show'} full comparison
                </button>
            </div>
        </>
    )
}
