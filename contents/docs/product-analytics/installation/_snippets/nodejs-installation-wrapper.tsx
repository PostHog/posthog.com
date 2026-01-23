import React from 'react'
import { getNodeJSSteps } from 'onboarding/product-analytics/nodejs.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { NodeEventCapture } from 'onboarding/product-analytics/_snippets/node-event-capture.tsx'
import { addNextStepsStep } from './pa-shared-helpers'

const NodeJSInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getNodeJSSteps(components))

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

export const NodeJSInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                NodeEventCapture,
            }}
        >
            <NodeJSInstallationContent />
        </OnboardingContentWrapper>
    )
}
