import React from 'react'
import { ReactInstallation, JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const ReactInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <ReactInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
