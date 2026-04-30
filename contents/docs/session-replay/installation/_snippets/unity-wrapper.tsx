import React from 'react'
import { UnityInstallation } from './unity-installation'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './sr-shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from 'product-analytics/installation/_snippets/js-web-snippets'
import { SessionReplayFinalSteps } from 'onboarding/session-replay'

const SNIPPETS = {
    SessionReplayFinalSteps,
    JSHtmlSnippet: WebsiteJSHtmlSnippet,
    JSInitSnippet: WebsiteJSInitSnippet,
}

export const SRUnityInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <UnityInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)
