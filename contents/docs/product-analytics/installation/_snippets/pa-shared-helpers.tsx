import React from 'react'
import PANextSteps from './pa-next-steps.mdx'

export interface StepDefinition {
    title: string
    badge?: 'required' | 'optional' | 'recommended'
    content: React.ReactNode
}

/**
 * Adds the "Next steps" step to an array of steps
 */
export const addNextStepsStep = (steps: StepDefinition[]): StepDefinition[] => {
    return [
        ...steps,
        {
            title: 'Next steps',
            badge: 'recommended' as const,
            content: <PANextSteps />,
        },
    ]
}
