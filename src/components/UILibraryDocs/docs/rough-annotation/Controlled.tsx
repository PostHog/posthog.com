import React, { useState } from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'
import { Button } from 'components/UI/Button'

export default function Controlled(): JSX.Element {
    const [shown, setShown] = useState(false)
    const [completed, setCompleted] = useState(0)
    return (
        <div className="flex flex-col items-start gap-4">
            <p className="m-0 text-lg">
                Flags let you{' '}
                <RoughAnnotation
                    type="highlight"
                    color="rgba(247, 165, 1, 0.35)"
                    show={shown}
                    onComplete={() => setCompleted((count) => count + 1)}
                >
                    roll out to 5% of users first
                </RoughAnnotation>
                .
            </p>
            <div className="flex items-center gap-3">
                <Button size="sm" onClick={() => setShown((value) => !value)}>
                    {shown ? 'Hide' : 'Show'} the highlight
                </Button>
                <span className="text-sm text-secondary">onComplete calls: {completed}</span>
            </div>
        </div>
    )
}
