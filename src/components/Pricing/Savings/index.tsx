import React from 'react'

import { Structure } from '../../Structure'

import checkIcon from '../../../images/check.svg'

export const Savings = () => {
    return (
        <div className="pricing-hero text-white text-center relative">
            <Structure.Section width="4xl" className="py-12">
                <Structure.SectionHeader
                    titleTag="h3"
                    title="Save thousands with a single platform"
                    leadText="Here's a typical startup analytics stack with 5,000,000 events/mo. For larger companies, these numbers grow exponentially."
                />
            </Structure.Section>
        </div>
    )
}
