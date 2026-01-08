import React from 'react'
import { getGoSteps } from 'onboarding/product-analytics/go.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { dedent } from '../../../../../src/utils'

const GoInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, snippets, Tab } = useMDXComponents()

    const steps = addNextStepsStep(getGoSteps(CodeBlock, Markdown, dedent, snippets, Tab))

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

export const GoInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <GoInstallationContent />
        </OnboardingContentWrapper>
    )
}
