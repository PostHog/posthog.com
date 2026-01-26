import React from 'react'
import { PythonInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ExperimentsPythonInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
            }}
        >
            <PythonInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
