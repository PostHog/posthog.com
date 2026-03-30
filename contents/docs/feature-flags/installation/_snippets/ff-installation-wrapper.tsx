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
    RubyOnRailsInstallation,
    GoInstallation,
    PHPInstallation,
    LaravelInstallation,
    DjangoInstallation,
    // API installation
    APIInstallation,
    // No-code installations
    WebflowInstallation,
    FramerInstallation,
    BubbleInstallation,
    // Snippets
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    FlagPayloadSnippet,
    OverridePropertiesSnippet,
    OnFeatureFlagsCallbackSnippet,
    ReloadFlagsSnippet,
} from 'onboarding/feature-flags'
import { JSEventCapture, NodeEventCapture, PythonEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from 'product-analytics/installation/_snippets/js-web-snippets'

// Snippet sets
const JS_SNIPPETS = {
    JSEventCapture,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
}

const JS_WEB_SNIPPETS = {
    JSEventCapture,
    JSHtmlSnippet: WebsiteJSHtmlSnippet,
    JSInitSnippet: WebsiteJSInitSnippet,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    FlagPayloadSnippet,
    OnFeatureFlagsCallbackSnippet,
    ReloadFlagsSnippet,
}

const REACT_SNIPPETS = {
    JSEventCapture,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    FlagPayloadSnippet,
}

const MOBILE_SNIPPETS = {
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
}

const NODE_SNIPPETS = {
    NodeEventCapture,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    OverridePropertiesSnippet,
}

const PYTHON_SNIPPETS = {
    PythonEventCapture,
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    OverridePropertiesSnippet,
}

const BACKEND_SNIPPETS = {
    BooleanFlagSnippet,
    MultivariateFlagSnippet,
    OverridePropertiesSnippet,
}

// Web SDK wrappers
export const FFJSWebInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_WEB_SNIPPETS}>
        <WebInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFNextJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <NextJSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFReactInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={REACT_SNIPPETS}>
        <ReactInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFReactRouterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={REACT_SNIPPETS}>
        <ReactRouterInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFVueInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <VueInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFAngularInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <AngularInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFAstroInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <AstroInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFSvelteInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <SvelteInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFNuxtInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <NuxtInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFRemixInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <RemixInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Mobile SDK wrappers
export const FFIOSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={MOBILE_SNIPPETS}>
        <IOSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFAndroidInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={MOBILE_SNIPPETS}>
        <AndroidInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFFlutterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={MOBILE_SNIPPETS}>
        <FlutterInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFReactNativeInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={MOBILE_SNIPPETS}>
        <ReactNativeInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Backend SDK wrappers
export const FFNodeJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={NODE_SNIPPETS}>
        <NodeJSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFPythonInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={PYTHON_SNIPPETS}>
        <PythonInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFDjangoInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={PYTHON_SNIPPETS}>
        <DjangoInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFRubyInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={BACKEND_SNIPPETS}>
        <RubyInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFRubyOnRailsInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={BACKEND_SNIPPETS}>
        <RubyOnRailsInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFGoInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={BACKEND_SNIPPETS}>
        <GoInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFPHPInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={BACKEND_SNIPPETS}>
        <PHPInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFLaravelInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={BACKEND_SNIPPETS}>
        <LaravelInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// API wrapper
export const FFAPIInstallationWrapper = () => (
    <OnboardingContentWrapper>
        <APIInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// No-code wrappers
export const FFWebflowInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <WebflowInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFFramerInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <FramerInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FFBubbleInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <BubbleInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)
