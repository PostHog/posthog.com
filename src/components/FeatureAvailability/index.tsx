import React from 'react'
import './FeatureAvailability.scss'
import { CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined } from '@ant-design/icons'

type AvailablePlans = 'free' | 'standard' | 'enterpriseCloud' | 'startup' | 'openSource' | 'scale' | 'enterprise'

interface PlanInterface {
    key: AvailablePlans
    name: string
}

const PLANS: Record<'cloud' | 'hosted', PlanInterface[]> = {
    cloud: [
        {
            key: 'free',
            name: 'Free',
        },
        {
            key: 'standard',
            name: 'Standard',
        },
        {
            key: 'enterpriseCloud',
            name: 'Enterprise',
        },
        {
            key: 'startup',
            name: 'Startup',
        },
    ],
    hosted: [
        {
            key: 'openSource',
            name: 'Open source',
        },
        {
            key: 'scale',
            name: 'Scale',
        },
        {
            key: 'enterprise',
            name: 'Enterprise',
        },
    ],
}

interface FeatureAvailabilityProps {
    allPlans?: boolean
    availablePlans?: AvailablePlans[]
}

function Plan({ available, name }: { available?: boolean; name: string }): JSX.Element {
    return (
        <li className={!available ? 'unavailable' : ''}>
            {available ? <CheckCircleFilled /> : <CloseCircleFilled />}
            {name} plan
        </li>
    )
}

export function FeatureAvailability({ allPlans, availablePlans }: FeatureAvailabilityProps): JSX.Element {
    return (
        <div className="feature-availability">
            <h4>Where is this feature available?</h4>

            <div className="feature-availability-inner">
                {allPlans ? (
                    <ul>
                        <li>Available on all plans</li>
                    </ul>
                ) : (
                    <>
                        <div>
                            <h5>
                                Cloud
                                <a href="/pricing?realm=cloud">
                                    <InfoCircleOutlined />
                                </a>
                            </h5>
                            <ul>
                                {PLANS.cloud.map((plan) => (
                                    <Plan
                                        key={plan.key}
                                        available={availablePlans?.includes(plan.key)}
                                        name={plan.name}
                                    />
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5>
                                Self-hosted
                                <a href="/pricing?realm=self-hosted">
                                    <InfoCircleOutlined />
                                </a>
                            </h5>
                            <ul>
                                {PLANS.hosted.map((plan) => (
                                    <Plan
                                        key={plan.key}
                                        available={availablePlans?.includes(plan.key)}
                                        name={plan.name}
                                    />
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
