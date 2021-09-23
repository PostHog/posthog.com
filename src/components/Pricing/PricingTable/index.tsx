import React, { useState } from 'react'
import { useActions } from 'kea'
import { Structure } from '../../Structure'
import { CloudPlanBreakdown } from './CloudPlanBreakdown'
import { SelfHostedPlanBreakdown } from './SelfHostedPlanBreakdown'
import { pricingSliderLogic, PricingOptionType } from '../../PricingSlider/pricingSliderLogic'
import { inverseCurve } from 'components/PricingSlider/LogSlider'
import Chip from 'components/Chip'

export const PricingTable = ({ showScaleByDefault = false }: { showScaleByDefault?: boolean }) => {
    const CLOUD_PLAN = 'cloud'
    const SELF_HOSTED_PLAN = 'self-hosted'
    const [currentPlanType, setCurrentPlanType] = useState(SELF_HOSTED_PLAN)
    const currentPlanBreakdown = currentPlanType === 'cloud' ? <CloudPlanBreakdown /> : <SelfHostedPlanBreakdown />
    const { setPricingOption, setSliderValue } = useActions(pricingSliderLogic)

    const setPlanType = (type: PricingOptionType, sliderValue: number) => {
        setCurrentPlanType(type)
        setPricingOption(type)
        setSliderValue(inverseCurve(sliderValue))
    }

    return (
        <div className="pricing-hero relative ">
            <Structure.SectionFullWidth width="7xl" className="">
                <div className="flex justify-center space-x-2 max-w-md mx-auto my-12">
                    <Chip
                        size="md"
                        onClick={(e) => setPlanType(SELF_HOSTED_PLAN, 8000000)}
                        active={currentPlanType === SELF_HOSTED_PLAN}
                    >
                        Self-hosted
                    </Chip>
                    <Chip
                        size="md"
                        onClick={(e) => setPlanType(CLOUD_PLAN, 10000)}
                        active={currentPlanType === CLOUD_PLAN}
                    >
                        Cloud
                    </Chip>
                </div>

                {currentPlanBreakdown}
            </Structure.SectionFullWidth>
        </div>
    )
}
