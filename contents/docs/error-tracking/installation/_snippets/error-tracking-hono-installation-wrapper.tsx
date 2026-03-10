import React from 'react'
import { HonoInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingHonoInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <HonoInstallation
                modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
            />
        </OnboardingContentWrapper>
    )
}
