import React from 'react'
import { PythonInstallation } from 'onboarding/error-tracking'
import { PythonEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingPythonInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ PythonEventCapture }}>
            <PythonInstallation
                modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
            />
        </OnboardingContentWrapper>
    )
}
