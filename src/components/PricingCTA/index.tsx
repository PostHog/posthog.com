import React from 'react'
import { TrackedCTA } from 'components/CallToAction'

export const PricingCTA = ({ dark = false, className = '' }: { dark?: boolean; className?: string }): JSX.Element => {
    const darkClasses = `${className} text-[15px] group justify-center font-semibold text-white py-2 px-3 rounded-sm hover:!text-white bg-white/0 border border-solid border-white/20 hover:bg-white/30 inline-flex space-x-2 items-center relative active:top-[0.5px] active:scale-[.98] !w-full md:!w-44 shadow-xl`
    const lightClasses = `${className} text-[15px] group justify-center font-semibold py-2 px-3 rounded-sm inline-flex space-x-2 items-center relative active:top-[0.5px] active:scale-[.98]  !w-full md:!w-44 shadow-xl`

    return (
        <TrackedCTA
            event={{
                name: `clicked to view pricing`,
                type: 'homepage',
            }}
            type="secondary"
            to={'/pricing'}
            className={dark ? darkClasses : lightClasses}
        >
            <span>View pricing</span>
        </TrackedCTA>
    )
}
