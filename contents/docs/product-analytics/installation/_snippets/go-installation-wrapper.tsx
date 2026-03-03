import React from 'react'
import { GoInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const GoInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <GoInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
