import React from 'react'
import { getReactSteps } from 'onboarding/product-analytics/react.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { JSEventCapture } from 'onboarding/product-analytics/_snippets/js-event-capture.tsx'
import { addNextStepsStep } from './pa-shared-helpers'

const ReactInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getReactSteps(components))

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

export const ReactInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
            }}
        >
            <ReactInstallationContent />
        </OnboardingContentWrapper>
    )
}
