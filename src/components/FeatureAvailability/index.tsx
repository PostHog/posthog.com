import React from 'react'
import InfoIcon from '../InfoIcon/Index'
import CheckIcon from '../../images/check.svg'
import MinusIcon from '../../images/x.svg'
import WarningIcon from '../../images/warning.svg'
import Link from '../Link'

type AvailablePlans = 'free' | 'standard' | 'enterpriseCloud' | 'startup' | 'openSource' | 'scale' | 'enterprise'

interface PlanInterface {
    key: AvailablePlans
    name: string
}

const PLANS: Record<'cloud' | 'selfHosted', PlanInterface[]> = {
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
    selfHosted: [
        {
            key: 'openSource',
            name: 'Open-source',
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
    /* Restricted plan means there are some limitations to the specific functionality available for that feature.
        Example: Paths is available for everyone, but advanced display features or end point selection is not available on free tiers.
        TODO: Support clarifying restricions.
    */
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
        <li
            className={
                restricted
                    ? 'restricted flex items-center !text-sm'
                    : available
                    ? 'flex items-center !text-sm'
                    : 'unavailable flex items-center !text-sm'
            }
        >
            {restricted ? (
                <>
                    <img src={WarningIcon} alt="Restriction apply" className="h-4 w-4 mr-2" aria-hidden="true" />
                </>
            ) : available ? (
                <>
                    <img src={CheckIcon} alt="Available" className="h-4 w-4 mr-2" aria-hidden="true" />
                </>
            ) : (
                <>
                    <img src={MinusIcon} alt="Not available" className="h-4 w-4 mr-2" aria-hidden="true" />
                </>
            )}
            {name}
            {restricted}
        </li>
    )
}

export function FeatureAvailability({
    allPlans,
    availablePlans,
    restrictedPlans,
}: FeatureAvailabilityProps): JSX.Element {
    return (
        <div className="border-t border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark py-4 space-y-2 my-4">
            <h6 className="text-gray !mt-0 pb-1 font-semibold text-sm">Where is this feature available?</h6>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h5 className="flex items-center space-x-1 !mt-0">
                        <span>Self-hosted plans</span>
                        <Link
                            href="/pricing?realm=self-hosted"
                            className="!pb-0 group hover:!bg-none active:!bg-none focus:!bg-none"
                        >
                            <InfoIcon className="w-3 h-3 opacity-75 group-hover:opacity-100 relative transform transition-all group-hover:scale-[1.2] active:top-[1px] active:scale-[1.1]" />
                        </Link>
                    </h5>
                    <ul className="p-0 mb-0">
                        {PLANS.selfHosted.map((plan) => (
                            <Plan
                                key={plan.key}
                                available={allPlans || availablePlans?.includes(plan.key)}
                                name={plan.name}
                                restricted={restrictedPlans?.includes(plan.key)}
                            />
                        ))}
                    </ul>
                </div>
                <div className="col-span-2">
                    <h5 className="flex items-center space-x-1 !mt-0">
                        <span>Cloud plans</span>
                        <Link
                            href="/pricing?realm=cloud"
                            className="!pb-0 group hover:!bg-none active:!bg-none focus:!bg-none"
                        >
                            <InfoIcon className="w-3 h-3 opacity-75 group-hover:opacity-100 relative transform transition-all group-hover:scale-[1.2] active:top-[1px] active:scale-[1.1]" />
                        </Link>
                    </h5>
                    <ul className="pl-0 mb-0 grid sm:grid-cols-2">
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
            </div>
        </div>
    )
}
