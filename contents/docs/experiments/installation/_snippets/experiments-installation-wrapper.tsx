import React from 'react'
import {
    // Web SDK installations
    WebInstallation,
    NextJSInstallation,
    ReactInstallation,
    ReactRouterInstallation,
    VueInstallation,
    AngularInstallation,
    AstroInstallation,
    SvelteInstallation,
    NuxtInstallation,
    RemixInstallation,
    // Mobile SDK installations
    IOSInstallation,
    AndroidInstallation,
    FlutterInstallation,
    ReactNativeInstallation,
    // Backend SDK installations
    NodeJSInstallation,
    PythonInstallation,
    RubyInstallation,
    PHPInstallation,
    GoInstallation,
    DjangoInstallation,
    LaravelInstallation,
    // No-code installations
    WebflowInstallation,
    FramerInstallation,
    BubbleInstallation,
    // Snippets
    ExperimentImplementationSnippet,
} from 'onboarding/experiments'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from 'product-analytics/installation/_snippets/js-web-snippets'

const SNIPPETS = {
    ExperimentImplementationSnippet,
}

const JS_WEB_SNIPPETS = {
    ExperimentImplementationSnippet,
    JSHtmlSnippet: WebsiteJSHtmlSnippet,
    JSInitSnippet: WebsiteJSInitSnippet,
}

// Web SDK wrappers
export const ExperimentsJSWebInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_WEB_SNIPPETS}>
        <WebInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsNextJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <NextJSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsReactInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <ReactInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsReactRouterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_WEB_SNIPPETS}>
        <ReactRouterInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsVueInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <VueInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsAngularInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <AngularInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsAstroInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <AstroInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsSvelteInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <SvelteInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsNuxtInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <NuxtInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsRemixInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <RemixInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Mobile SDK wrappers
export const ExperimentsIOSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <IOSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsAndroidInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <AndroidInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsFlutterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <FlutterInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsReactNativeInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <ReactNativeInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Backend SDK wrappers
export const ExperimentsNodeJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <NodeJSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsPythonInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <PythonInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsRubyInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <RubyInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsPHPInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <PHPInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsGoInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <GoInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsDjangoInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <DjangoInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsLaravelInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <LaravelInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// No-code wrappers
export const ExperimentsWebflowInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <WebflowInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsFramerInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <FramerInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ExperimentsBubbleInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <BubbleInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)
