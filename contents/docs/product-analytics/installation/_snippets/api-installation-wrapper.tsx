import React from 'react'
import { APIInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const APIInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <APIInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
