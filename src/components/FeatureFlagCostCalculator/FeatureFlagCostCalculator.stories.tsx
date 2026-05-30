import React from 'react'
import { FeatureFlagCostCalculator } from './index'

export default {
    title: 'Components/FeatureFlagCostCalculator',
    component: FeatureFlagCostCalculator,
}

export const Default = (): JSX.Element => (
    <div className="max-w-2xl mx-auto p-6">
        <FeatureFlagCostCalculator />
    </div>
)
