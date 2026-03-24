import React from 'react'
import {
    GoInstallation,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    OverridePropertiesSnippet,
} from 'onboarding/feature-flags'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFGoInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
                OverridePropertiesSnippet,
            }}
        >
            <GoInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
