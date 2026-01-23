import React from 'react'
import { getRubySteps } from 'onboarding/product-analytics/ruby.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'

const RubyInstallationContent = () => {
    const components = useMDXComponents()
    const { Steps, Step } = components

    const steps = addNextStepsStep(getRubySteps(components))

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

export const RubyInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <RubyInstallationContent />
        </OnboardingContentWrapper>
    )
}
