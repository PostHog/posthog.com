import React from 'react'
import { RubyOnRailsInstallation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingRubyOnRailsInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <RubyOnRailsInstallation
                modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
            />
        </OnboardingContentWrapper>
    )
}
