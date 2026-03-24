import React from 'react'
import { JSEventCapture } from 'onboarding/product-analytics'
import {
    SurveysFlutterInstallation,
    SurveysIOSInstallation,
    SurveysReactNativeInstallation,
    SurveysWebInstallation,
    SurveysFinalSteps,
} from 'onboarding/surveys'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'

const SURVEYS_SNIPPETS_WEB = {
    SurveysFinalSteps,
    JSEventCapture,
}

const SURVEYS_SNIPPETS_MOBILE = {
    SurveysFinalSteps,
}

export const FlutterSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_MOBILE}>
            <SurveysFlutterInstallation />
        </OnboardingContentWrapper>
    )
}

export const IOSSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_MOBILE}>
            <SurveysIOSInstallation />
        </OnboardingContentWrapper>
    )
}

export const ReactNativeSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_MOBILE}>
            <SurveysReactNativeInstallation />
        </OnboardingContentWrapper>
    )
}

export const WebSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysWebInstallation />
        </OnboardingContentWrapper>
    )
}
