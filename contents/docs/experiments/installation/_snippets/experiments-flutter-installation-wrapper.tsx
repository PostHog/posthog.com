import React from 'react'
import { FlutterInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ExperimentsFlutterInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
            }}
        >
            <FlutterInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
