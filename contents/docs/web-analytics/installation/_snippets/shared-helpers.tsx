import React from 'react'
import { StepDefinition } from 'onboarding/steps'
import WebNextSteps from './web-next-steps.mdx'

/**
 * Adds the "Next steps" step to an array of steps for web SDKs
 */
export const addNextStepsStep = (steps: StepDefinition[]): StepDefinition[] => {
    return [
        ...steps,
        {
            title: 'Next steps',
            badge: 'recommended' as const,
            content: <WebNextSteps />,
        },
    ]
}
