import React, { useState } from 'react'
import { useActions } from 'kea'
import { Structure } from '../../Structure'
import { CallToAction } from '../../CallToAction'
import { CloudPlanBreakdown } from './CloudPlanBreakdown'
import { SelfHostedPlanBreakdown } from './SelfHostedPlanBreakdown'
import { pricingSliderLogic, PricingOptionType } from '../../PricingSlider/pricingSliderLogic'
import { inverseCurve } from 'components/PricingSlider/LogSlider'

export const PricingTable = ({ showScaleByDefault = false }: { showScaleByDefault?: boolean }) => {
    const CLOUD_PLAN = 'cloud'
    const SELF_HOSTED_PLAN = 'self-hosted'
    const [currentPlanType, setCurrentPlanType] = useState(showScaleByDefault ? SELF_HOSTED_PLAN : CLOUD_PLAN)
    const currentPlanBreakdown = currentPlanType === 'cloud' ? <CloudPlanBreakdown /> : <SelfHostedPlanBreakdown />
    const { setPricingOption, setSliderValue } = useActions(pricingSliderLogic)

    const setPlanType = (type: PricingOptionType, sliderValue: number) => {
        setCurrentPlanType(type)
        setPricingOption(type)
        setSliderValue(inverseCurve(sliderValue))
    }

    return (
        <div className="pricing-hero text-white relative ">
            <Structure.SectionFullWidth width="7xl" className="">
                <div className="flex justify-center max-w-md mx-auto mb-20">
                    <CallToAction
                        type="button"
                        width="auto"
                        icon="none"
                        outline
                        onClick={(e) => setPlanType(CLOUD_PLAN, 10000)}
                        className={
                            currentPlanType === CLOUD_PLAN ? 'active' : 'hover:text-almost-black text-almost-black'
                        }
                    >
                        Cloud
                    </CallToAction>
                    <CallToAction
                        type="button"
                        width="auto"
                        icon="none"
                        outline
                        onClick={(e) => setPlanType(SELF_HOSTED_PLAN, 8000000)}
                        className={
                            currentPlanType === SELF_HOSTED_PLAN
                                ? 'active ml-2'
                                : 'ml-2 hover:text-almost-black text-almost-black'
                        }
                    >
                        Self-hosted
                    </CallToAction>
                </div>

                {currentPlanBreakdown}
            </Structure.SectionFullWidth>
        </div>
    )
}
