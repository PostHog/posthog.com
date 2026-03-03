import React from 'react'
import { SurveysIOSInstallation, SurveysFinalSteps } from 'onboarding/surveys'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'

export const IOSSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                SurveysFinalSteps,
            }}
        >
            <SurveysIOSInstallation />
        </OnboardingContentWrapper>
    )
}
