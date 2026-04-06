import React from 'react'
import {
    // Web SDK installations
    WebInstallation,
    ReactInstallation,
    ReactRouterInstallation,
    RemixInstallation,
    // Mobile SDK installations
    AndroidInstallation,
    IOSInstallation,
    FlutterInstallation,
    ReactNativeInstallation,
    // Server SDK installations
    NodeJSInstallation,
    PythonInstallation,
    RubyInstallation,
    PHPInstallation,
    GoInstallation,
    ElixirInstallation,
    // Other installations
    APIInstallation,
    // Snippet components
    JSEventCapture,
    NodeEventCapture,
    PythonEventCapture,
} from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from './js-web-snippets'

const JS_SNIPPETS = {
    JSEventCapture,
    JSHtmlSnippet: WebsiteJSHtmlSnippet,
    JSInitSnippet: WebsiteJSInitSnippet,
}

// Web SDK wrappers
export const JSWebInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <WebInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ReactInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <ReactInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const PAReactRouterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <ReactRouterInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const PARemixInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={JS_SNIPPETS}>
        <RemixInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Mobile SDK wrappers
export const AndroidInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <AndroidInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const IOSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <IOSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const FlutterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <FlutterInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ReactNativeInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <ReactNativeInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Server SDK wrappers
export const NodeJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ NodeEventCapture }}>
        <NodeJSInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const PythonInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ PythonEventCapture }}>
        <PythonInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const RubyInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <RubyInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const PHPInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <PHPInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const GoInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <GoInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ElixirInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <ElixirInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

// Other wrappers
export const APIInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <APIInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)
