import React from 'react'
import {
    PythonInstallation,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    OverridePropertiesSnippet,
} from 'onboarding/feature-flags'
import { PythonEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFPythonInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                PythonEventCapture,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
                OverridePropertiesSnippet,
            }}
        >
            <PythonInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
