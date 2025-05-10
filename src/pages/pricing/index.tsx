import React from 'react'
import OSTabs from 'components/OSTabs'
import PricingExperiment from 'components/Pricing/PricingExperiment'

export default function Pricing() {
    const tabs = [
        {
            value: 'pricing',
            label: 'Pricing',
            content: <PricingExperiment />,
        },
        {
            value: 'comparison',
            label: 'Comparison',
            content: (
                <div className="">
                    <h2>Comparison</h2>
                    <p>This tab will contain comparison content.</p>
                </div>
            ),
        },
    ]

    return <OSTabs tabs={tabs} defaultValue="pricing" />
}
