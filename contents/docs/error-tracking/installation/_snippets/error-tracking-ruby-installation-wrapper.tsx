import React from 'react'
import { RubyInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingRubyInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <RubyInstallation
                modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
            />
        </OnboardingContentWrapper>
    )
}
