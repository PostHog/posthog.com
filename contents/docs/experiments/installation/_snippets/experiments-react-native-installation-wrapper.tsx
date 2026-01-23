import React from 'react'
import { ReactNativeInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ExperimentsReactNativeInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
            }}
        >
            <ReactNativeInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
