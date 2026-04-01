import React from 'react'
import { IOSInstallation } from 'onboarding/error-tracking'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

export const ErrorTrackingIOSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{}}>
            <IOSInstallation
                modifySteps={(steps) =>
                    addNextStepsStep(steps, undefined, {
                        mappingsUrl: '/docs/error-tracking/upload-source-maps/ios',
                        mappingsLabel: 'Upload dSYMs',
                        mappingsDescription:
                            "Great, you're capturing exceptions! The next step is to upload dSYM files so PostHog can symbolicate your crash reports and generate accurate stack traces.",
                    })
                }
            />
        </OnboardingContentWrapper>
    )
}
