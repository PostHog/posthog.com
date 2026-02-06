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
    TanStackInstallation,
    // Mobile SDK installations
    IOSInstallation,
    AndroidInstallation,
    FlutterInstallation,
    ReactNativeInstallation,
    // No-code installations
    GoogleTagManagerInstallation,
    ShopifyInstallation,
    WebflowInstallation,
    WordpressInstallation,
    FramerInstallation,
    BubbleInstallation,
    DocusaurusInstallation,
    // Snippets
    WebFinalSteps,
    MobileFinalSteps,
} from 'onboarding/web-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

const WEB_SNIPPETS = {
    WebFinalSteps,
}

const MOBILE_SNIPPETS = {
    MobileFinalSteps,
}

// Web SDK wrappers
export const WAJSWebInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <JSWebInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WANextJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <NextJSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAHTMLSnippetInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <HTMLSnippetInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAReactInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <ReactInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAVueInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <VueInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAAngularInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <AngularInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAAstroInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <AstroInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WASvelteInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <SvelteInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WANuxtInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <NuxtInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WARemixInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <RemixInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WATanStackInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <TanStackInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Mobile SDK wrappers
export const WAIOSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={MOBILE_SNIPPETS}>
        <IOSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAAndroidInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={MOBILE_SNIPPETS}>
        <AndroidInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAFlutterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={MOBILE_SNIPPETS}>
        <FlutterInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAReactNativeInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={MOBILE_SNIPPETS}>
        <ReactNativeInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// No-code wrappers
export const WAGoogleTagManagerInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <GoogleTagManagerInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAShopifyInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <ShopifyInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAWebflowInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <WebflowInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAWordPressInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <WordpressInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WAFramerInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <FramerInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WABubbleInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <BubbleInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const WADocusaurusInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={WEB_SNIPPETS}>
        <DocusaurusInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)
