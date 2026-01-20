import React from 'react'
import { WebflowInstallation, BooleanFlagSnippet, MultivariateFlagSnippet } from 'onboarding/feature-flags'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFWebflowInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
            }}
        >
            <WebflowInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
