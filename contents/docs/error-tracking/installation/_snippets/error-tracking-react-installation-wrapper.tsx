import React from 'react'
import { ReactInstallation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingReactInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <ReactInstallation modifySteps={(steps) => addNextStepsStep(steps, 'react')} />
        </OnboardingContentWrapper>
    )
}
