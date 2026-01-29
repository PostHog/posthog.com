import React from 'react'
import { ReactNativeInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const ReactNativeInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <ReactNativeInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
