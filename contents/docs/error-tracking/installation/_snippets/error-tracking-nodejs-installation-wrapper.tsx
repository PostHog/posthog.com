import React from 'react'
import { NodeJSInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingNodeJSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <NodeJSInstallation modifySteps={(steps) => addNextStepsStep(steps, 'node')} />
        </OnboardingContentWrapper>
    )
}
