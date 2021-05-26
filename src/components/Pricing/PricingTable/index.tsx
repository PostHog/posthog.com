import React, { useState } from 'react'
import { useActions } from 'kea'
import { Structure } from '../../Structure'
import { CallToAction } from '../../CallToAction'
import { CloudPlanBreakdown } from './CloudPlanBreakdown'
import { SelfHostedPlanBreakdown } from './SelfHostedPlanBreakdown'
import { pricingSliderLogic, PricingOptionType } from '../../PricingSlider/pricingSliderLogic'
import { inverseCurve } from 'components/PricingSlider/LogSlider'

export const PricingTable = () => {
    const [currentPlanType, setCurrentPlanType] = useState('cloud')
    const currentPlanBreakdown = currentPlanType === 'cloud' ? <CloudPlanBreakdown /> : <SelfHostedPlanBreakdown />
    const { setPricingOption, setSliderValue } = useActions(pricingSliderLogic)

    const setPlanType = (type: PricingOptionType, sliderValue: number) => {
        setCurrentPlanType(type)
        setPricingOption(type)
        setSliderValue(inverseCurve(sliderValue))
    }

    return (
        <div className="pricing-hero text-white relative">
            <Structure.SectionFullWidth width="7xl" className="">
                <div className="flex justify-center ">
                    <CallToAction
                        type="button"
                        width="auto"
                        icon="none"
                        onClick={(e) => setPlanType('cloud', 10000)}
                        className={currentPlanType === 'cloud' ? 'active' : ''}
                    >
                        Cloud
                    </CallToAction>
                    <CallToAction
                        type="button"
                        width="auto"
                        icon="none"
                        onClick={(e) => setPlanType('self-hosted', 8000000)}
                        className={currentPlanType === 'self-hosted' ? 'active ml-2' : 'ml-2'}
                    >
                        Self-hosted
                    </CallToAction>
                </div>

                {currentPlanBreakdown}
            </Structure.SectionFullWidth>
        </div>
    )
}
