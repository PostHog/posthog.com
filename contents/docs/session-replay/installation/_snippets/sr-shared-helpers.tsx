import React from 'react'
import { StepDefinition } from 'onboarding/steps'
import SRNextSteps from './sr-next-steps.mdx'

type StepModifier = (steps: StepDefinition[]) => StepDefinition[]

// Chains multiple modifiers together
export const composeModifiers =
    (...modifiers: StepModifier[]): StepModifier =>
    (steps) =>
        modifiers.reduce((acc, modifier) => modifier(acc), steps)

// Removes steps by title
export const removeSteps =
    (...titles: string[]): StepModifier =>
    (steps) =>
        steps.filter((step) => !titles.includes(step.title))

// Adds "Next steps" at the end
export const addNextSteps: StepModifier = (steps) => [
    ...steps,
    {
        title: 'Next steps',
        badge: 'recommended' as const,
        content: <SRNextSteps />,
    },
]

// Default for session replay
export const addNextStepsStep = composeModifiers(removeSteps('Send events'), addNextSteps)
