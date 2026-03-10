import React from 'react'
import { HonoInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingHonoInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <HonoInstallation modifySteps={addNextStepsStep} />
        </OnboardingContentWrapper>
    )
}
