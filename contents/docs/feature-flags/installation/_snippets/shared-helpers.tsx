import React from 'react'
import { StepDefinition } from 'onboarding/steps'
import FFNextSteps from './ff-next-steps.mdx'

/**
 * Adds the "Next steps" step to an array of steps
 */
export const addNextStepsStep = (steps: StepDefinition[]): StepDefinition[] => {
    return [
        ...steps,
        {
            title: 'Next steps',
            badge: 'recommended' as const,
            content: <FFNextSteps />,
        },
    ]
}
