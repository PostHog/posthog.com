import React from 'react'
import InfoIcon from '../InfoIcon/Index'
import CheckIcon from '../../images/check.svg'
import XIcon from '../../images/x.svg'
import Link from 'components/Link'

type FeatureAvailabilityProps = {
    availability:
        | {
              free: boolean
              selfServe: boolean
              enterprise: boolean
          }
        | boolean
}

const renderAvailabilityIcon = (isAvailable: boolean) => {
    return isAvailable ? (
        <img src={CheckIcon} alt="Available" className="h-4 w-4 mr-2" aria-hidden="true" />
    ) : (
        <img src={XIcon} alt="Not available" className="h-4 w-4 mr-2" aria-hidden="true" />
    )
}

export function FeatureAvailability({ availability }: FeatureAvailabilityProps): JSX.Element {
    return (
        <div className="border-t border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark py-3 space-y-1 mt-2 mb-5 ">
            <h6 className="text-primary/50 dark:text-primary-dark/50 !my-0 font-semibold text-base">
                Where is this feature available?
            </h6>

            <div className="grid grid-flow-col-dense grid-rows-3 grid-cols-2 sm:grid-flow-row-dense sm:grid-cols-3 sm:grid-rows-2 gap-x-4">
                <div>
                    <h5 className="flex items-center space-x-1 text-base !mt-0 mb-2">
                        <span>Free / Open-source</span>
                        <Link
                            to="/pricing?realm=self-hosted"
                            className="!pb-0 group hover:!bg-none active:!bg-none focus:!bg-none"
                        >
                            <InfoIcon className="w-4 h-4 opacity-75 group-hover:opacity-100 relative transform transition-all group-hover:scale-[1.2] active:top-[1px] active:scale-[1.1]" />
                        </Link>
                    </h5>
                </div>
                <div className="">
                    <h5 className="flex items-center space-x-1 text-base !mt-0 mb-2">
                        <span>Self-serve</span>
                        <Link
                            to="/pricing?realm=cloud"
                            className="!pb-0 group hover:!bg-none active:!bg-none focus:!bg-none"
                        >
                            <InfoIcon className="w-4 h-4 opacity-75 group-hover:opacity-100 relative transform transition-all group-hover:scale-[1.2] active:top-[1px] active:scale-[1.1]" />
                        </Link>
                    </h5>
                </div>

                <div className="">
                    <h5 className="flex items-center space-x-1 text-base !mt-0 mb-2">
                        <span>Enterprise</span>
                        <Link
                            to="/pricing?realm=cloud"
                            className="!pb-0 group hover:!bg-none active:!bg-none focus:!bg-none"
                        >
                            <InfoIcon className="w-4 h-4 opacity-75 group-hover:opacity-100 relative transform transition-all group-hover:scale-[1.2] active:top-[1px] active:scale-[1.1]" />
                        </Link>
                    </h5>
                </div>

                {renderAvailabilityIcon(typeof availability === 'boolean' ? availability : availability.free)}

                {renderAvailabilityIcon(typeof availability === 'boolean' ? availability : availability.selfServe)}

                {renderAvailabilityIcon(typeof availability === 'boolean' ? availability : availability.enterprise)}
            </div>
        </div>
    )
}
