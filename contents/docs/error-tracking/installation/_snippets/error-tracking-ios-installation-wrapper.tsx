import React from 'react'
import { IOSInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingIOSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <IOSInstallation modifySteps={(steps) => addNextStepsStep(steps, 'ios')} />
        </OnboardingContentWrapper>
    )
}
