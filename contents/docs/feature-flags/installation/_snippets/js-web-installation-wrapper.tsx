import React from 'react'
import { getJSWebSteps } from 'onboarding/feature-flags/js-web.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { BooleanFlagSnippet } from 'onboarding/feature-flags/_snippets/boolean-flag.tsx'
import { MultivariateFlagSnippet } from 'onboarding/feature-flags/_snippets/multivariate-flag.tsx'
import { FlagPayloadSnippet } from 'onboarding/feature-flags/_snippets/flag-payload.tsx'
import { OnFeatureFlagsCallbackSnippet } from 'onboarding/feature-flags/_snippets/on-feature-flags-callback.tsx'
import { ReloadFlagsSnippet } from 'onboarding/feature-flags/_snippets/reload-flags.tsx'
import { addNextStepsStep } from './shared-helpers'

const JSWebInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, dedent, snippets } = useMDXComponents()

    // Get the base steps and add next steps
    const steps = addNextStepsStep(getJSWebSteps(CodeBlock, Markdown, dedent, snippets))

    // Render the steps
    return (
        <Steps>
            {steps.map((step, index) => (
                <Step key={index} title={step.title} badge={step.badge}>
                    {step.content}
                </Step>
            ))}
        </Steps>
    )
}

export const JSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
                FlagPayloadSnippet,
                OnFeatureFlagsCallbackSnippet,
                ReloadFlagsSnippet,
            }}
        >
            <JSWebInstallationContent />
        </OnboardingContentWrapper>
    )
}
