import React from 'react'
import { Nuxt36Installation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingNuxt36InstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <Nuxt36Installation modifySteps={(steps) => addNextStepsStep(steps, 'nuxt')} />
        </OnboardingContentWrapper>
    )
}
