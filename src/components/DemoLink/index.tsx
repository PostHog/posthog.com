import React from 'react'
import { TrackedCTA } from 'components/CallToAction'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from '../../hooks/usePostHog'

export const DemoLink = ({ dark = false, className = '' }: { dark?: boolean; className?: string }): JSX.Element => {
    const posthog = usePostHog()
    const darkClasses = `${className} text-[15px] group justify-center font-semibold text-white py-2 px-3 rounded-sm hover:!text-white bg-white/0 border border-solid border-white/20 hover:bg-white/30 inline-flex space-x-2 items-center relative active:top-[0.5px] active:scale-[.98] !w-full md:!w-44 shadow-xl`
    const lightClasses = `${className} text-[15px] group justify-center font-semibold py-2 px-3 rounded-sm inline-flex space-x-2 items-center relative active:top-[0.5px] active:scale-[.98]  !w-full md:!w-44 shadow-xl`

    return (
        <RenderInClient
            placeholder={
                <TrackedCTA
                    event={{ name: `clicked to view pricing`, type: 'homepage' }}
                    type="secondary"
                    to={'/pricing'}
                    className={dark ? darkClasses : lightClasses}
                >
                    <span>-</span>
                </TrackedCTA>
            }
            render={() => (
                <TrackedCTA
                    event={{
                        name: `clicked to view ${
                            posthog?.getFeatureFlag('web-pricing-cta') === 'test' ? 'pricing' : 'demo booking page'
                        }`,
                        type: 'homepage',
                    }}
                    type="secondary"
                    to={posthog?.getFeatureFlag('web-pricing-cta') === 'test' ? '/pricing' : '/book-a-demo'}
                    className={dark ? darkClasses : lightClasses}
                >
                    <span>
                        {posthog?.getFeatureFlag('web-pricing-cta') === 'test' ? 'View our pricing' : 'Schedule a call'}
                    </span>
                </TrackedCTA>
            )}
        />
    )
}
