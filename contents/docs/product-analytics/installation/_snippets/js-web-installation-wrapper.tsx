import React from 'react'
import { WebInstallation, JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from './js-web-snippets'

export const JSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                JSHtmlSnippet: WebsiteJSHtmlSnippet,
                JSInitSnippet: WebsiteJSInitSnippet,
            }}
        >
            <WebInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
