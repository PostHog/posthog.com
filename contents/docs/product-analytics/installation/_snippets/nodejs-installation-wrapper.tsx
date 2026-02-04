import React from 'react'
import { NodeJSInstallation, NodeEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const NodeJSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ NodeEventCapture }}>
            <NodeJSInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
