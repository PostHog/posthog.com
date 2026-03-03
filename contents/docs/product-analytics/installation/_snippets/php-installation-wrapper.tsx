import React from 'react'
import { PHPInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const PHPInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <PHPInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
