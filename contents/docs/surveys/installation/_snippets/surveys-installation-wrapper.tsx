import React from 'react'
import { JSEventCapture } from 'onboarding/product-analytics'
import {
    SurveysAngularInstallation,
    SurveysAstroInstallation,
    SurveysBubbleInstallation,
    SurveysFlutterInstallation,
    SurveysFramerInstallation,
    SurveysIOSInstallation,
    SurveysNextJSInstallation,
    SurveysNuxtInstallation,
    SurveysReactInstallation,
    SurveysReactNativeInstallation,
    SurveysReactRouterInstallation,
    SurveysRemixInstallation,
    SurveysSvelteInstallation,
    SurveysVueInstallation,
    SurveysWebflowInstallation,
    SurveysWebInstallation,
    SurveysFinalSteps,
} from 'onboarding/surveys'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from 'product-analytics/installation/_snippets/js-web-snippets'

const SURVEYS_SNIPPETS_WEB = {
    SurveysFinalSteps,
    JSEventCapture,
    JSHtmlSnippet: WebsiteJSHtmlSnippet,
    JSInitSnippet: WebsiteJSInitSnippet,
}

const SURVEYS_SNIPPETS_MOBILE = {
    SurveysFinalSteps,
}

export const SurveysAngularInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysAngularInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysAstroInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysAstroInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysBubbleInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysBubbleInstallation />
        </OnboardingContentWrapper>
    )
}

export const FlutterSurveysInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_MOBILE}>
            <SurveysFlutterInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysFramerInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysFramerInstallation />
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

export const SurveysNextJSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysNextJSInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysNuxtInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysNuxtInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysReactInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysReactInstallation />
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

export const SurveysReactRouterInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysReactRouterInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysRemixInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysRemixInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysSvelteInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysSvelteInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysVueInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysVueInstallation />
        </OnboardingContentWrapper>
    )
}

export const SurveysWebflowInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper snippets={SURVEYS_SNIPPETS_WEB}>
            <SurveysWebflowInstallation />
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
