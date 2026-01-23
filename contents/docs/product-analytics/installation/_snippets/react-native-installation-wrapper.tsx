import React from 'react'
import { getReactNativeSteps } from 'onboarding/product-analytics/react-native.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const ReactNativeInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getReactNativeSteps(components))

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

export const ReactNativeInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <ReactNativeInstallationContent />
        </OnboardingContentWrapper>
    )
}
