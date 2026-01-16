import React from 'react'
import { getAndroidSteps } from 'onboarding/product-analytics/android.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { addNextStepsStep } from './pa-shared-helpers'
import { dedent } from '~/utils'

const AndroidInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown } = useMDXComponents()

    const steps = addNextStepsStep(getAndroidSteps(CodeBlock, Markdown, dedent))

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
