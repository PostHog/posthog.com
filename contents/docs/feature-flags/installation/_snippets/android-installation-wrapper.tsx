import React from 'react'
import { AndroidInstallation, BooleanFlagSnippet, MultivariateFlagSnippet } from 'onboarding/feature-flags'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const AndroidInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
            }}
        >
            <AndroidInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
