import React from 'react'
import { getPythonSteps } from 'onboarding/product-analytics/python.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { PythonEventCapture } from 'onboarding/product-analytics/_snippets/python-event-capture.tsx'
import { addNextStepsStep } from './pa-shared-helpers'

const PythonInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getPythonSteps(components))

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

export const PythonInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                PythonEventCapture,
            }}
        >
            <PythonInstallationContent />
        </OnboardingContentWrapper>
    )
}
