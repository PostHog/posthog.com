import React from 'react'
import {
    NodeJSInstallation,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    OverridePropertiesSnippet,
} from 'onboarding/feature-flags'
import { NodeEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const FFNodeJSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                NodeEventCapture,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
                OverridePropertiesSnippet,
            }}
        >
            <NodeJSInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
