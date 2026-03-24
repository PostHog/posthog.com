import React from 'react'
import { FlutterInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingFlutterInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <FlutterInstallation modifySteps={(steps) => addNextStepsStep(steps, 'flutter')} />
        </OnboardingContentWrapper>
    )
}
