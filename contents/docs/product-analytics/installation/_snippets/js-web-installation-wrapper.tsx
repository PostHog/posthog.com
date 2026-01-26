import React from 'react'
import { JSWebInstallation, JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const JSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <JSWebInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
