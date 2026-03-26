import React from 'react'
import {
    WebInstallation,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    FlagPayloadSnippet,
    OnFeatureFlagsCallbackSnippet,
    ReloadFlagsSnippet,
} from 'onboarding/feature-flags'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from 'product-analytics/installation/_snippets/js-web-snippets'

export const FFJSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                JSHtmlSnippet: WebsiteJSHtmlSnippet,
                JSInitSnippet: WebsiteJSInitSnippet,
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
                FlagPayloadSnippet,
                OnFeatureFlagsCallbackSnippet,
                ReloadFlagsSnippet,
            }}
        >
            <WebInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
