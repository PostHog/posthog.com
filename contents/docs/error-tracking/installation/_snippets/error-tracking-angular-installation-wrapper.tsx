import React from 'react'
import { AngularInstallation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingAngularInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <AngularInstallation modifySteps={(steps) => addNextStepsStep(steps, 'angular')} />
        </OnboardingContentWrapper>
    )
}
