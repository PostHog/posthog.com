import React from 'react'
import { ElixirInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const ElixirInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <ElixirInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
