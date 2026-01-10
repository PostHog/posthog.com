import React from 'react'
import { getJSWebSteps } from 'onboarding/product-analytics/js-web.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { JSEventCapture } from 'onboarding/product-analytics/_snippets/js-event-capture.tsx'
import { addNextStepsStep } from './pa-shared-helpers'
import { dedent } from '~/utils'

const JSWebInstallationContent = () => {
    const { Steps, Step, CodeBlock, Markdown, snippets } = useMDXComponents()

    const steps = addNextStepsStep(getJSWebSteps(CodeBlock, Markdown, dedent, snippets))

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
