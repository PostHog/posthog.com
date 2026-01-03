import React from 'react'
import { getPythonSteps } from 'onboarding/feature-flags/python.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { BooleanFlagSnippet } from 'onboarding/feature-flags/_snippets/boolean-flag.tsx'
import { MultivariateFlagSnippet } from 'onboarding/feature-flags/_snippets/multivariate-flag.tsx'
import { FlagPayloadSnippet } from 'onboarding/feature-flags/_snippets/flag-payload.tsx'
import { OverridePropertiesSnippet } from 'onboarding/feature-flags/_snippets/override-properties.tsx'
import { addNextStepsStep } from './shared-helpers'

const PythonInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, dedent, snippets, Tab } = useMDXComponents()

    // Get the base steps and add next steps
    const steps = addNextStepsStep(getPythonSteps(CodeBlock, Markdown, dedent, snippets, Tab))

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

export const PythonInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                BooleanFlagSnippet,
                MultivariateFlagSnippet,
                FlagPayloadSnippet,
                OverridePropertiesSnippet,
            }}
        >
            <PythonInstallationContent />
        </OnboardingContentWrapper>
    )
}
