import React from 'react'
import { WebInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from 'product-analytics/installation/_snippets/js-web-snippets'

export const ExperimentsJSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
                JSHtmlSnippet: WebsiteJSHtmlSnippet,
                JSInitSnippet: WebsiteJSInitSnippet,
            }}
        >
            <WebInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
