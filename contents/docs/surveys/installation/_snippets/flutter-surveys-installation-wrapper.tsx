import React from 'react'
import { SurveysFlutterInstallation, SurveysFinalSteps } from 'onboarding/surveys'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'

export const FlutterSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={{ SurveysFinalSteps }}>
            <SurveysFlutterInstallation />
        </OnboardingContentWrapper>
    )
}
