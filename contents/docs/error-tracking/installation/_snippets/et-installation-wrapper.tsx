import React from 'react'
import {
    // Web SDK installations
    WebInstallation,
    NextJSInstallation,
    ReactInstallation,
    AngularInstallation,
    SvelteInstallation,
    NuxtInstallation,
    Nuxt36Installation,
    Nuxt37Installation,
    // Backend SDK installations
    NodeJSInstallation,
    PythonInstallation,
    RubyInstallation,
    RubyOnRailsInstallation,
    HonoInstallation,
    APIInstallation,
    // Mobile SDK installations
    IOSInstallation,
    AndroidInstallation,
    FlutterInstallation,
    ReactNativeInstallation,
} from 'onboarding/error-tracking'
import { JSEventCapture, PythonEventCapture } from 'onboarding/product-analytics'
import { OnboardingContentWrapper } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'
import { WebsiteJSHtmlSnippet, WebsiteJSInitSnippet } from 'product-analytics/installation/_snippets/js-web-snippets'

// Web SDK wrappers
export const ErrorTrackingJSWebInstallationWrapper = () => (
    <OnboardingContentWrapper
        snippets={{
            JSEventCapture,
            JSHtmlSnippet: WebsiteJSHtmlSnippet,
            JSInitSnippet: WebsiteJSInitSnippet,
        }}
    >
        <WebInstallation modifySteps={(steps) => addNextStepsStep(steps, 'web')} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingNextJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ JSEventCapture }}>
        <NextJSInstallation modifySteps={(steps) => addNextStepsStep(steps, 'nextjs')} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingReactInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ JSEventCapture }}>
        <ReactInstallation modifySteps={(steps) => addNextStepsStep(steps, 'react')} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingAngularInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ JSEventCapture }}>
        <AngularInstallation modifySteps={(steps) => addNextStepsStep(steps, 'angular')} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingSvelteInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ JSEventCapture }}>
        <SvelteInstallation modifySteps={(steps) => addNextStepsStep(steps, 'web')} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingNuxtInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ JSEventCapture }}>
        <Nuxt37Installation modifySteps={(steps) => addNextStepsStep(steps, 'nuxt')} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingNuxt36InstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ JSEventCapture }}>
        <Nuxt36Installation modifySteps={(steps) => addNextStepsStep(steps, 'nuxt')} />
    </OnboardingContentWrapper>
)

// Backend SDK wrappers
export const ErrorTrackingNodeJSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <NodeJSInstallation modifySteps={(steps) => addNextStepsStep(steps, 'node')} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingPythonInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ PythonEventCapture }}>
        <PythonInstallation
            modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
        />
    </OnboardingContentWrapper>
)

export const ErrorTrackingRubyInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <RubyInstallation
            modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
        />
    </OnboardingContentWrapper>
)

export const ErrorTrackingRubyOnRailsInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{ JSEventCapture }}>
        <RubyOnRailsInstallation
            modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
        />
    </OnboardingContentWrapper>
)

export const ErrorTrackingHonoInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <HonoInstallation modifySteps={addNextStepsStep} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingAPIInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <APIInstallation
            modifySteps={(steps) => addNextStepsStep(steps).filter((s) => s.title !== 'Upload source maps')}
        />
    </OnboardingContentWrapper>
)

// Mobile SDK wrappers
export const ErrorTrackingIOSInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <IOSInstallation
            modifySteps={(steps) =>
                addNextStepsStep(steps, undefined, {
                    mappingsUrl: '/docs/error-tracking/upload-source-maps/ios',
                    mappingsLabel: 'Upload dSYMs',
                    mappingsDescription:
                        "Great, you're capturing exceptions! The next step is to upload dSYM files so PostHog can symbolicate your crash reports and generate accurate stack traces.",
                })
            }
        />
    </OnboardingContentWrapper>
)

export const ErrorTrackingAndroidInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <AndroidInstallation
            modifySteps={(steps) =>
                addNextStepsStep(steps, undefined, {
                    mappingsUrl: '/docs/error-tracking/upload-mappings/android',
                    mappingsLabel: 'Upload mapping files',
                    mappingsDescription:
                        "Great, you're capturing exceptions! The next step is to upload ProGuard/R8 mapping files so PostHog can deobfuscate your stack traces.",
                })
            }
        />
    </OnboardingContentWrapper>
)

export const ErrorTrackingFlutterInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <FlutterInstallation modifySteps={(steps) => addNextStepsStep(steps, 'flutter')} />
    </OnboardingContentWrapper>
)

export const ErrorTrackingReactNativeInstallationWrapper = () => (
    <OnboardingContentWrapper snippets={{}}>
        <ReactNativeInstallation modifySteps={(steps) => addNextStepsStep(steps, 'react-native')} />
    </OnboardingContentWrapper>
)
