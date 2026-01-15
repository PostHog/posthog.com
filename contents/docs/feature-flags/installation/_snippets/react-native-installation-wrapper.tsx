import React from 'react'
import { ReactNativeInstallation, BooleanFlagSnippet, MultivariateFlagSnippet } from 'onboarding/feature-flags'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ReactNativeInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
            }}
        >
            <ReactNativeInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
