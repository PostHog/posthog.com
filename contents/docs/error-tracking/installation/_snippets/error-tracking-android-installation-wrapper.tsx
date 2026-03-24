import React from 'react'
import { AndroidInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingAndroidInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <AndroidInstallation
                modifySteps={(steps) =>
                    addNextStepsStep(steps, undefined, {
                        mappingsUrl: '/docs/error-tracking/upload-mappings/android',
                        mappingsLabel: 'Upload mapping files',
                    })
                }
            />
        </OnboardingContentWrapper>
    )
}
