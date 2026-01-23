import React from 'react'
import {
    RubyInstallation,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    OverridePropertiesSnippet,
} from 'onboarding/feature-flags'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFRubyInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
                OverridePropertiesSnippet,
            }}
        >
            <RubyInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
