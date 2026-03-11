import React from 'react'
import { WebInstallation, JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const JSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ JSEventCapture }}>
            <WebInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
