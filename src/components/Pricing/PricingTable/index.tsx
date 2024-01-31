import { useLocation } from '@reach/router'
import Chip from 'components/Chip'
import { inverseCurve } from 'components/Pricing/PricingSlider/Slider'
import { useActions } from 'kea'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { Structure } from '../../Structure'
import { PricingOptionType, pricingSliderLogic } from '../PricingSlider/pricingSliderLogic'
import { CloudPlanBreakdown } from './CloudPlanBreakdown'
import { SelfHostedPlanBreakdown } from './SelfHostedPlanBreakdown'

export const PricingTable = () => {
    const CLOUD_PLAN = 'cloud'
    const SELF_HOSTED_PLAN = 'self-hosted'
    const [currentPlanType, setCurrentPlanType] = useState(CLOUD_PLAN)
    const currentPlanBreakdown = currentPlanType === 'cloud' ? <CloudPlanBreakdown /> : <SelfHostedPlanBreakdown />
    const { setSliderValue, setPricingOption } = useActions(pricingSliderLogic)
    const location = useLocation()

    const setPlanType = (type: PricingOptionType, sliderValue: number) => {
        setCurrentPlanType(type)
        if (type === 'cloud') setPricingOption('cloud')
        setSliderValue(inverseCurve(sliderValue))
    }

    useEffect(() => {
        const realm = queryString.parse(location.search)?.realm
        if (realm === CLOUD_PLAN || realm === SELF_HOSTED_PLAN) setCurrentPlanType(realm)
    }, [location])

    return (
        <div className="pricing-hero relative ">
            <Structure.SectionFullWidth width="7xl" className="">
                <div className="flex justify-center space-x-2 max-w-md mx-auto mb-12 md:mb-20">
                    <Chip
                        size="md"
                        onClick={(e) => setPlanType(CLOUD_PLAN, 1000000)}
                        active={currentPlanType === CLOUD_PLAN}
                    >
                        Cloud
                    </Chip>
                    <Chip
                        size="md"
                        onClick={(e) => setPlanType(SELF_HOSTED_PLAN, 1000000)}
                        active={currentPlanType === SELF_HOSTED_PLAN}
                    >
                        Self-hosted
                    </Chip>
                </div>

                {currentPlanBreakdown}
            </Structure.SectionFullWidth>
        </div>
    )
}
