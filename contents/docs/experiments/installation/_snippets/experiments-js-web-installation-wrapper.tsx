import React from 'react'
import { getJSWebSteps } from 'onboarding/experiments/js-web.tsx'
import { OnboardingContentWrapper, useMDXComponents } from 'components/Docs/OnboardingContentWrapper'
import { ExperimentImplementationSnippet } from 'onboarding/experiments/_snippets/experiment-implementation.tsx'
import { addNextStepsStep } from './shared-helpers'
import { dedent } from '~/utils'

const ExperimentsJSWebInstallationContent = () => {
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
