import React, { useState } from 'react'
import { useActions } from 'kea'
import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'
import { CallToAction } from '../../CallToAction'
import { CloudPlanBreakdown } from './CloudPlanBreakdown'
import { SelfHostedPlanBreakdown } from './SelfHostedPlanBreakdown'
import { pricingSliderLogic, PricingOptionType } from '../../PricingSlider/pricingSliderLogic'

import checkIcon from '../../../images/check.svg'

export const PricingTable = () => {
    const [currentPlanType, setCurrentPlanType] = useState('cloud')
    const currentPlanBreakdown = currentPlanType === 'cloud' ? <CloudPlanBreakdown /> : <SelfHostedPlanBreakdown />
    const { setPricingOption } = useActions(pricingSliderLogic)

    const setPlanType = (type: PricingOptionType) => {
        setCurrentPlanType(type)
        setPricingOption(type)
    }

    return (
        <div className="pricing-hero text-white">
            <Structure.SectionFullWidth width="7xl" className="">
                <div className="flex justify-center ">
                    <CallToAction
                        type="button"
                        width="auto"
                        icon="none"
                        onClick={(e) => setPlanType('cloud')}
                        className={currentPlanType === 'cloud' ? 'active' : ''}
                    >
                        Cloud
                    </CallToAction>
                    <CallToAction
                        type="button"
                        width="auto"
                        icon="none"
                        onClick={(e) => setPlanType('self-hosted')}
                        className={currentPlanType === 'self-hosted' ? 'active' : ''}
                    >
                        Self-hosted
                    </CallToAction>
                </div>

                {currentPlanBreakdown}
            </Structure.SectionFullWidth>
        </div>
    )
}
