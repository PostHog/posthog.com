import React from 'react'
import { ReactNativeInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingReactNativeInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <ReactNativeInstallation modifySteps={(steps) => addNextStepsStep(steps, 'react-native')} />
        </OnboardingContentWrapper>
    )
}
