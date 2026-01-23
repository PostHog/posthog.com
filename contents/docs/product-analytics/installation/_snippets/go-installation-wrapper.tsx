import React from 'react'
import { getGoSteps } from 'onboarding/product-analytics/go.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const GoInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getGoSteps(components))

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
