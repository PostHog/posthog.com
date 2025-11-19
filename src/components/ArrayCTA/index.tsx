import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { SignupCTA } from 'components/SignupCTA'
import OSButton from 'components/OSButton'

export const ArrayCTA = () => {
    return (
        <div data-scheme="secondary" className="bg-primary border border-primary rounded p-4 pb-8 mb-4">
            <p className="font-bold text-center relative text-lg mb-0">Want to just try it already?</p>
            <p className="text-xs text-center text-secondary mt-1 mb-6">(Sorry for the shameless CTA.)</p>
            <div className="flex flex-col @sm:flex-row justify-center items-center gap-2 xl:gap-4">
                <SignupCTA text="Try PostHog - free" size="md" />
                <OSButton variant="secondary" asLink to="/talk-to-a-human" size="md" state={{ newWindow: true }}>
                    Schedule a demo
                </OSButton>
            </div>
        </div>
    )
}
