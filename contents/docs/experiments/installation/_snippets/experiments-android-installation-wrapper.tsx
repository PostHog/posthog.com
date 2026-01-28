import React from 'react'
import { AndroidInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ExperimentsAndroidInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
            }}
        >
            <AndroidInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
