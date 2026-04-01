import React from 'react'
import { APIInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingAPIInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <APIInstallation
                modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
            />
        </OnboardingContentWrapper>
    )
}
