import React from 'react'
import { SvelteInstallation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingSvelteInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <SvelteInstallation modifySteps={(steps) => addNextStepsStep(steps, 'web')} />
        </OnboardingContentWrapper>
    )
}
