import React from 'react'
import { APIInstallation } from 'onboarding/feature-flags'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const APIInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <APIInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
