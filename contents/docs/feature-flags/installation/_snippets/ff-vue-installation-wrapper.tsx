import React from 'react'
import { VueInstallation, BooleanFlagSnippet, MultivariateFlagSnippet } from 'onboarding/feature-flags'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFVueInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
            }}
        >
            <VueInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
