import React from 'react'
import { PHPInstallation, ExperimentImplementationSnippet } from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ExperimentsPHPInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
            }}
        >
            <PHPInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
