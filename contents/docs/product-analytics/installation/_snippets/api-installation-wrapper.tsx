import React from 'react'
import { getAPISteps } from 'onboarding/product-analytics/api.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const APIInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getAPISteps(components))

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
