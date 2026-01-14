import React from 'react'
import { getElixirSteps } from 'onboarding/product-analytics/elixir.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { dedent } from '~/utils'

const ElixirInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown } = useMDXComponents()

    const steps = addNextStepsStep(getElixirSteps(CodeBlock, Markdown, dedent))

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

export const ElixirInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <ElixirInstallationContent />
        </OnboardingContentWrapper>
    )
}
