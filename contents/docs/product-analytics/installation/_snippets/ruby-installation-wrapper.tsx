import React from 'react'
import { getRubySteps } from 'onboarding/product-analytics/ruby.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { dedent } from '~/utils'

const RubyInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown } = useMDXComponents()

    const steps = addNextStepsStep(getRubySteps(CodeBlock, Markdown, dedent))

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
