import React from 'react'
import { getReactNativeSteps } from 'onboarding/product-analytics/react-native.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { dedent } from '../../../../../src/utils'

const ReactNativeInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, snippets, Tab } = useMDXComponents()

    const steps = addNextStepsStep(getReactNativeSteps(CodeBlock, Markdown, dedent, snippets, Tab))

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
