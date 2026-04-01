import React from 'react'
import { ReactInstallation, JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from './js-web-snippets'

export const ReactInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                JSHtmlSnippet: WebsiteJSHtmlSnippet,
                JSInitSnippet: WebsiteJSInitSnippet,
            }}
        >
            <ReactInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
