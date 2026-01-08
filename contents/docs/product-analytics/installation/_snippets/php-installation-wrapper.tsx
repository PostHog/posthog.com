import React from 'react'
import { getPHPSteps } from 'onboarding/product-analytics/php.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const PHPInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, dedent, snippets, Tab } = useMDXComponents()

    const steps = addNextStepsStep(getPHPSteps(CodeBlock, Markdown, dedent, snippets, Tab))

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

export const PHPInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <PHPInstallationContent />
        </OnboardingContentWrapper>
    )
}
