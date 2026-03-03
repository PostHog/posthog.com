import React from 'react'
import { SurveysWebInstallation, SurveysFinalSteps } from 'onboarding/surveys'
import { JSEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'

export const WebSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                SurveysFinalSteps,
                JSEventCapture,
            }}
        >
            <SurveysWebInstallation />
        </OnboardingContentWrapper>
    )
}
