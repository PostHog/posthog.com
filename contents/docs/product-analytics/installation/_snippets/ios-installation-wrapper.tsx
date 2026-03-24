import React from 'react'
import { IOSInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const IOSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <IOSInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
