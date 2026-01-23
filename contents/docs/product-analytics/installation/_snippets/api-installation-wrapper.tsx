import React from 'react'
import { getAPISteps } from 'onboarding/product-analytics/api.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { dedent } from '~/utils'

const APIInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, CalloutBox } = useMDXComponents()

    const steps = addNextStepsStep(getAPISteps(CodeBlock, Markdown, CalloutBox, dedent))

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

export const APIInstallationWrapper = () => {
    return (
        <OnboardingContentWrapper>
            <APIInstallationContent />
        </OnboardingContentWrapper>
    )
}
