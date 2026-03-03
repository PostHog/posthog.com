import React from 'react'
import { PythonInstallation, PythonEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

export const PythonInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ PythonEventCapture }}>
            <PythonInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
