import React from 'react'
import {
    DjangoInstallation,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    OverridePropertiesSnippet,
} from 'onboarding/feature-flags'
import { PythonEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFDjangoInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                PythonEventCapture,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
                OverridePropertiesSnippet,
            }}
        >
            <DjangoInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
