import React from 'react'
import { getFlutterSteps } from 'onboarding/product-analytics/flutter.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const FlutterInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getFlutterSteps(components))

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

export const FlutterInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <FlutterInstallationContent />
        </OnboardingContentWrapper>
    )
}
