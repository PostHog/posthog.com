import React from 'react'
import { getIOSSteps } from 'onboarding/product-analytics/ios.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const IOSInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, dedent, snippets, Tab } = useMDXComponents()

    const steps = addNextStepsStep(getIOSSteps(CodeBlock, Markdown, dedent, snippets, Tab))

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

export const IOSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <IOSInstallationContent />
        </OnboardingContentWrapper>
    )
}
