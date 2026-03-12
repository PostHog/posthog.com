import React from 'react'
import { WebInstallation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingJSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <WebInstallation modifySteps={(steps) => addNextStepsStep(steps, 'web')} />
        </OnboardingContentWrapper>
    )
}
