import React from 'react'
import { getPHPSteps } from 'onboarding/product-analytics/php.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const PHPInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getPHPSteps(components))

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
