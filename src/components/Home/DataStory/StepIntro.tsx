import React from 'react'

export const STEP_COUNT = 4

export default function StepIntro({
    step,
    title,
    children,
}: {
    step: number
    title: string
    children: React.ReactNode
}): JSX.Element {
    return (
        <>
            <p className="not-prose m-0 mb-1 font-mono text-xs uppercase tracking-wide text-secondary">
                Step {step} of {STEP_COUNT}
            </p>
            <h2 className="mt-0">{title}</h2>
            <p className="max-w-3xl">{children}</p>
        </>
    )
}
