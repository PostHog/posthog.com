import React from 'react'
import { NextJSInstallation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingNextJSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <NextJSInstallation modifySteps={(steps) => addNextStepsStep(steps, 'nextjs')} />
        </OnboardingContentWrapper>
    )
}
