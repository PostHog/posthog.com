import React from 'react'
import { SurveysReactNativeInstallation, SurveysFinalSteps } from 'onboarding/surveys'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'

export const ReactNativeSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                SurveysFinalSteps,
            }}
        >
            <SurveysReactNativeInstallation />
        </OnboardingContentWrapper>
    )
}
