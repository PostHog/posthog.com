import React from 'react'
import { getJSWebSteps } from 'onboarding/experiments/js-web.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { ExperimentImplementationSnippet } from 'onboarding/experiments/_snippets/experiment-implementation.tsx'
import { addNextStepsStep } from './shared-helpers'

const ExperimentsJSWebInstallationContent = () => {
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

export const ExperimentsJSWebInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper
            snippets={{
                ExperimentImplementationSnippet,
            }}
        >
            <ExperimentsJSWebInstallationContent />
        </OnboardingContentWrapper>
    )
}
