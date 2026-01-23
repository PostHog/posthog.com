import React from 'react'
import { getAndroidSteps } from 'onboarding/product-analytics/android.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const AndroidInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getAndroidSteps(components))

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

export const AndroidInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <AndroidInstallationContent />
        </OnboardingContentWrapper>
    )
}
