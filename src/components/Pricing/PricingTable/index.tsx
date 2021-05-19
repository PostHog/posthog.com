import React, { useState } from 'react'

import { Structure } from '../../Structure'
import { PricingSlider } from '../../PricingSlider'
import { CallToAction } from '../../CallToAction'

import { CloudPlanBreakdown } from './CloudPlanBreakdown'
import { SelfHostedPlanBreakdown } from './SelfHostedPlanBreakdown'

import checkIcon from '../../../images/check.svg'

export const PricingTable = () => {
    const [currentPlanType, setCurrentPlantype] = useState('cloud')
    const currentPlanBreakdown = currentPlanType === 'cloud' ? <CloudPlanBreakdown /> : <SelfHostedPlanBreakdown />

    return (
        <div className="pricing-hero text-white">
            <Structure.Section width="4xl" className="py-12">
                <div className="flex justify-center ">
                    <CallToAction
                        type="button"
                        width="auto"
                        icon="none"
                        onClick={(e) => setCurrentPlantype('cloud')}
                        className={currentPlanType === 'cloud' ? 'active' : ''}
                    >
                        Cloud
                    </CallToAction>
                    <CallToAction
                        type="button"
                        width="auto"
                        icon="none"
                        onClick={(e) => setCurrentPlantype('self-hosted')}
                        className={currentPlanType === 'self-hosted' ? 'active' : ''}
                    >
                        Self-hosted
                    </CallToAction>
                </div>

                {currentPlanBreakdown}
            </Structure.Section>
        </div>
    )
}
