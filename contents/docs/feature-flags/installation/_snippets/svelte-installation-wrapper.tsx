import React from 'react'
import { SvelteInstallation, BooleanFlagSnippet, MultivariateFlagSnippet } from 'onboarding/feature-flags'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const SvelteInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
            }}
        >
            <SvelteInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
