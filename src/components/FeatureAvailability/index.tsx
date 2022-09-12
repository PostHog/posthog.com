import React from 'react'
import InfoIcon from '../InfoIcon/Index'
import CheckIcon from '../../images/check.svg'
import XIcon from '../../images/x.svg'
import WarningIcon from '../../images/warning.svg'
import Link from '../Link'

type FeatureAvailabilityProps = {
    availability: unknown
}

export function FeatureAvailability(): JSX.Element {
    return (
        <div className="border-t border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark pt-4 pb-1 space-y-2 -mt-2 mb-5">
            <h6 className="text-primary/50 dark:text-primary-dark/50 !mt-0 mb-2 pb-1 font-semibold text-base">
                Where is this feature available?
            </h6>
            <div className="grid grid-cols-3 gap-x-4">
                <div>
                    <h5 className="flex items-center space-x-1 text-base !mt-0 mb-2">
                        <span>Free / Open-source plan</span>
                        <Link
                            href="/pricing?realm=self-hosted"
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
                            href="/pricing?realm=cloud"
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
                            href="/pricing?realm=cloud"
                            className="!pb-0 group hover:!bg-none active:!bg-none focus:!bg-none"
                        >
                            <InfoIcon className="w-4 h-4 opacity-75 group-hover:opacity-100 relative transform transition-all group-hover:scale-[1.2] active:top-[1px] active:scale-[1.1]" />
                        </Link>
                    </h5>
                </div>

                <div>
                    <img src={CheckIcon} alt="Available" className="h-4 w-4 mr-2" aria-hidden="true" />
                </div>

                <div>
                    <img src={WarningIcon} alt="Available" className="h-4 w-4 mr-2" aria-hidden="true" />
                </div>

                <div>
                    <img src={XIcon} alt="Not available" className="h-4 w-4 mr-2" aria-hidden="true" />
                </div>
            </div>
        </div>
    )
}
