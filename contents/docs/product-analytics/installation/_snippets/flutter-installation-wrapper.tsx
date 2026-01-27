import React from 'react'
import { FlutterInstallation } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const FlutterInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <FlutterInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
