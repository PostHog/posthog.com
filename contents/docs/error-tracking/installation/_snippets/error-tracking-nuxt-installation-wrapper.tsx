import React from 'react'
import { Nuxt37Installation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingNuxtInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <Nuxt37Installation modifySteps={(steps) => addNextStepsStep(steps, 'nuxt')} />
        </OnboardingContentWrapper>
    )
}
