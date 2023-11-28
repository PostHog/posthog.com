import React from 'react'
import { TrackedCTA } from 'components/CallToAction'

export const PricingCTA = ({ dark = false, className = '' }: { dark?: boolean; className?: string }): JSX.Element => {
    return (
        <TrackedCTA
            event={{
                name: `clicked to view pricing`,
                type: 'homepage',
            }}
            type="secondary"
            to={'/pricing'}
        >
            <span>View pricing</span>
        </TrackedCTA>
    )
}
