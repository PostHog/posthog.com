import React from 'react'
import {
    // Web SDK installations
    JSWebInstallation,
    NextJSInstallation,
    HTMLSnippetInstallation,
    ReactInstallation,
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
    // No-code installations
    WebflowInstallation,
    FramerInstallation,
    BubbleInstallation,
    // Snippets
    SessionReplayFinalSteps,
} from 'onboarding/session-replay'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './sr-shared-helpers'

const SNIPPETS = {
    SessionReplayFinalSteps,
}

// Web SDK wrappers
export const SRJSWebInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <JSWebInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRNextJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <NextJSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRHTMLSnippetInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <HTMLSnippetInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRReactInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <ReactInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRVueInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <VueInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRAngularInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <AngularInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRAstroInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <AstroInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRSvelteInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <SvelteInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRNuxtInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <NuxtInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRRemixInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <RemixInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Mobile SDK wrappers
export const SRIOSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <IOSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRAndroidInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <AndroidInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRFlutterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <FlutterInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRReactNativeInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <ReactNativeInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// No-code wrappers
export const SRWebflowInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <WebflowInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRFramerInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <FramerInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const SRBubbleInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={SNIPPETS}>
        <BubbleInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)
