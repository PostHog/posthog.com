import React from 'react'
import { StepDefinition } from 'onboarding/steps'
import VerifyLLMEventsStep from './verify-llm-events-step.mdx'
import NextStepsResources from './llma-next-steps.mdx'

/**
 * Adds the "Next steps" step to an array of steps
 */
export const addNextStepsStep = (steps: StepDefinition[]): StepDefinition[] => {
    return [
        ...steps,
        {
            title: 'Verify traces and generations',
            subtitle: 'Confirm LLM events are being sent to PostHog',
            badge: 'recommended',
            content: <VerifyLLMEventsStep />,
            checkpoint: true,
        },
        {
            title: 'Next steps',
            badge: 'recommended',
            content: <NextStepsResources />,
        },
    ]
}
