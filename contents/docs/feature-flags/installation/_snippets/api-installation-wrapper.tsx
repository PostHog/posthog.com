import React from 'react'
import { getAPISteps } from 'onboarding/feature-flags/api.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './shared-helpers'

const APIInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, dedent } = useMDXComponents()

    // Get the base steps and add next steps
    const steps = addNextStepsStep(getAPISteps(CodeBlock, Markdown, dedent))

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

export const APIInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <APIInstallationContent />
        </OnboardingContentWrapper>
    )
}
