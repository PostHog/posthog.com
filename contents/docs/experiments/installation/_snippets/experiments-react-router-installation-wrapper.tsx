import React from 'react'
import { ReactRouterInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ExperimentsReactRouterInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
            }}
        >
            <ReactRouterInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
