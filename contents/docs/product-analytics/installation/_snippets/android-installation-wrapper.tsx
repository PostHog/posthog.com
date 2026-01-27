import React from 'react'
import { AndroidInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const AndroidInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <AndroidInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
