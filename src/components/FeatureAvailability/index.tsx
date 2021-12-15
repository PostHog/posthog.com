import React from 'react'
import './FeatureAvailability.scss'
import { CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, MinusCircleFilled } from '@ant-design/icons'

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
            key: 'startup',
            name: 'Startup',
        },
        {
            key: 'standard',
            name: 'Standard',
        },
        {
            key: 'enterpriseCloud',
            name: 'Enterprise',
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
    restrictedPlans?: AvailablePlans[]
}

function Plan({
    available,
    name,
    restricted,
}: {
    available?: boolean
    name: string
    restricted?: boolean
}): JSX.Element {
    return (
        <li className={restricted ? 'restricted' : available ? '' : 'unavailable'}>
            {restricted ? <MinusCircleFilled /> : available ? <CheckCircleFilled /> : <CloseCircleFilled />}
            {name} plan{restricted && '*'}
        </li>
    )
}

export function FeatureAvailability({
    allPlans,
    availablePlans,
    restrictedPlans,
}: FeatureAvailabilityProps): JSX.Element {
    return (
        <div className="feature-availability">
            <h4>Where is this feature available?</h4>

            <div className="feature-availability-inner">
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
                                available={allPlans || availablePlans?.includes(plan.key)}
                                name={plan.name}
                                restricted={restrictedPlans?.includes(plan.key)}
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
                                available={allPlans || availablePlans?.includes(plan.key)}
                                name={plan.name}
                                restricted={restrictedPlans?.includes(plan.key)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
