import React from 'react'
import { IOSInstallation, BooleanFlagSnippet, MultivariateFlagSnippet } from 'onboarding/feature-flags'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFIOSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
            }}
        >
            <IOSInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
