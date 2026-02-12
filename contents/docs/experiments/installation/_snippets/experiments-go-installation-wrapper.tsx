import React from 'react'
import { GoInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ExperimentsGoInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
            }}
        >
            <GoInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
