import React from 'react'
import { getJSWebSteps } from 'onboarding/product-analytics/js-web.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { JSEventCapture } from 'onboarding/product-analytics/_snippets/js-event-capture.tsx'
import { addNextStepsStep } from './pa-shared-helpers'

const JSWebInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getJSWebSteps(components))

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

export const JSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                JSEventCapture,
            }}
        >
            <JSWebInstallationContent />
        </OnboardingContentWrapper>
    )
}
