import React from 'react'
import { BubbleInstallation, BooleanFlagSnippet, MultivariateFlagSnippet } from 'onboarding/feature-flags'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFBubbleInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
            }}
        >
            <BubbleInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
