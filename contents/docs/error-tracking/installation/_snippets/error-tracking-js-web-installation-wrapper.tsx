import React from 'react'
import { WebInstallation } from 'onboarding/error-tracking'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from 'product-analytics/installation/_snippets/js-web-snippets'

export const ErrorTrackingJSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
                JSHtmlSnippet: WebsiteJSHtmlSnippet,
                JSInitSnippet: WebsiteJSInitSnippet,
            }}
        >
            <WebInstallation modifySteps={(steps) => addNextStepsStep(steps, 'web')} />
        </OnboardingContentWrapper>
    )
}
