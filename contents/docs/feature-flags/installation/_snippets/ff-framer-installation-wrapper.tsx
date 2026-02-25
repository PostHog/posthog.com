import React from 'react'
import { FramerInstallation, BooleanFlagSnippet, MultivariateFlagSnippet } from 'onboarding/feature-flags'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFFramerInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
            }}
        >
            <FramerInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
