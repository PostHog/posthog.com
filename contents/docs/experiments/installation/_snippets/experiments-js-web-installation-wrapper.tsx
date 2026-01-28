import React from 'react'
import { JSWebInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ExperimentsJSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ ExperimentImplementationSnippet }}>
            <JSWebInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
