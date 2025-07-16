import React from 'react'
import { StepList, StepDef } from '../../../contents/docs/error-tracking/_snippets/StepList'

export interface ImplementationStepsProps {
    steps?: StepDef[]
    className?: string
}

export default function ImplementationSteps({ steps = [], className = '' }: ImplementationStepsProps) {
    return <StepList steps={steps} />
}
