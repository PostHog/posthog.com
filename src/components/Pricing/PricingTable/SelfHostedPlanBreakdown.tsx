import React from 'react'
import cntl from 'cntl'

const plans = [
    {
        title: 'Open source',
        subtitle: 'Great for startups - limited to 1 project',
        features: [
            {
                title: 'Platform',
                features: ['Dashboards', 'Event autocapture', 'Annotations', 'API', 'Plugins', 'Data I/O'],
            },
            {
                title: 'Account & support',
                features: ['Community Slack support', 'Easy upgrade to Scale'],
            },
        ],
    },
]

function FeatureTitle({ title }) {
    return (
        <h4 className="opacity-50 border-b border-dashed border-gray-accent-light pb-2 font-semibold text-[15px] mb-3 mt-7">
            {title}
        </h4>
    )
}

function Feature({ title, features }) {
    return (
        <>
            <FeatureTitle title={title} />
            <ul className="p-0 list-none m-0">
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </>
    )
}

export const SelfHostedPlanBreakdown = () => {
    return (
        <div className="grid grid-cols-3">
            {plans.map((plan, index) => {
                return (
                    <div key={index}>
                        <h3 className="my-1">{plan.title}</h3>
                        <p className="font-[15px] m-0">{plan.subtitle}</p>
                        {plan.features.map((feature, index) => {
                            return <Feature key={index} title={feature.title} features={feature.features} />
                        })}
                    </div>
                )
            })}
        </div>
    )
}
