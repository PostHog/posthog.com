import React from 'react'
import InfoIcon from '../InfoIcon/Index'
import CheckIcon from '../../images/check.svg'
import XIcon from '../../images/x.svg'
import Tooltip from 'components/Tooltip'

type FeatureAvailabilityProps = {
    availability:
        | {
              openSource?: boolean
              free: boolean
              selfServe: boolean
              boost?: boolean
              scale?: boolean
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
    const diffOpenSource = typeof availability !== 'boolean' && 'openSource' in availability

    const getGridColsClass = () => {
        const count = typeof availability === 'boolean' ? 1 : Object.keys(availability).length
        console.log(count)
        const columnCount = Math.max(3, count) // minimum 3 columns
        return `grid-cols-${columnCount}`
    }

    const gridColsClass = getGridColsClass()

    return (
        <div className="border-t border-b border-solid border-primary dark: py-2 space-y-2 mt-2 mb-5 ">
            <h6 className="text-muted !my-0 font-semibold text-base">Where is this feature available?</h6>

            <div className={`grid grid-flow-col-dense ${gridColsClass} sm:grid-flow-row-dense gap-x-4 items-center`}>
                {diffOpenSource ? (
                    <div>
                        <h5 className="flex items-center space-x-1.5 text-base !my-0">
                            <span>Open-source</span>
                            <Tooltip content="Free and Open-source">
                                <span>
                                    <InfoIcon className="w-4 h-4" />
                                </span>
                            </Tooltip>
                        </h5>
                    </div>
                ) : null}

                <div>
                    <h5 className="flex items-center space-x-1.5 text-base !my-0">
                        {diffOpenSource ? <span>Free</span> : <span>Free / Open-source</span>}
                        <Tooltip content="PostHog Cloud (no credit card added) or FOSS">
                            <span>
                                <InfoIcon className="w-4 h-4" />
                            </span>
                        </Tooltip>
                    </h5>
                </div>

                <div>
                    <h5 className="flex items-center space-x-1.5 text-base !my-0">
                        <span>Paid</span>
                        <Tooltip content="Paid plans on PostHog Cloud (even if you're within the free tier for the month!)">
                            <span>
                                <InfoIcon className="w-4 h-4" />
                            </span>
                        </Tooltip>
                    </h5>
                </div>

                {availability.boost && (
                    <div>
                        <h5 className="flex items-center space-x-1.5 text-base !my-0">
                            <span>Boost</span>
                            <Tooltip content="Available on PostHog Cloud">
                                <span>
                                    <InfoIcon className="w-4 h-4" />
                                </span>
                            </Tooltip>
                        </h5>
                    </div>
                )}

                {availability.scale && (
                    <div>
                        <h5 className="flex items-center space-x-1.5 text-base !my-0">
                            <span>Scale</span>
                            <Tooltip content="Available on PostHog Cloud">
                                <span>
                                    <InfoIcon className="w-4 h-4" />
                                </span>
                            </Tooltip>
                        </h5>
                    </div>
                )}

                <div>
                    <h5 className="flex items-center space-x-1.5 text-base !my-0">
                        <span>Enterprise</span>
                        <Tooltip content="Available on PostHog Cloud">
                            <span>
                                <InfoIcon className="w-4 h-4" />
                            </span>
                        </Tooltip>
                    </h5>
                </div>

                {diffOpenSource ? renderAvailabilityIcon(availability.openSource || false) : null}

                {renderAvailabilityIcon(typeof availability === 'boolean' ? availability : availability.free)}

                {renderAvailabilityIcon(typeof availability === 'boolean' ? availability : availability.selfServe)}

                {availability.boost &&
                    renderAvailabilityIcon(typeof availability === 'boolean' ? availability : availability.boost)}

                {availability.scale &&
                    renderAvailabilityIcon(typeof availability === 'boolean' ? availability : availability.scale)}

                {renderAvailabilityIcon(typeof availability === 'boolean' ? availability : availability.enterprise)}
            </div>
        </div>
    )
}
