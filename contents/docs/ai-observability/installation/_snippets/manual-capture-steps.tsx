import React from 'react'
import { StepDefinition } from 'onboarding/steps'
import { addNextStepsStep } from './shared-helpers'
import TracingProxiedInferencePaths from './tracing-proxied-inference-paths.mdx'

export const addManualCaptureSteps = (steps: StepDefinition[]): StepDefinition[] =>
    addNextStepsStep([
        ...steps,
        {
            title: 'Tracing proxied inference paths',
            badge: 'recommended',
            content: <TracingProxiedInferencePaths />,
        },
    ])
