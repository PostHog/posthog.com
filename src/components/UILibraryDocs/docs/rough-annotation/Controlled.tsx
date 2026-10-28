import React, { useState } from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'
import { Button } from 'components/UI/Button'

export default function Controlled(): JSX.Element {
    const [shown, setShown] = useState(false)
    const [drawn, setDrawn] = useState(false)
    return (
        <div className="flex flex-col items-start gap-4">
            <p className="m-0 text-body-lg">
                Flags let you{' '}
                <RoughAnnotation type="highlight" color="yellow" show={shown} onComplete={() => setDrawn(shown)}>
                    roll out to 5% of users first
                </RoughAnnotation>
                .
            </p>
            <div className="flex items-center gap-3">
                <Button size="sm" onClick={() => setShown((value) => !value)}>
                    {shown ? 'Hide' : 'Show'} the highlight
                </Button>
                <span className="text-caption text-secondary">{drawn && shown ? 'Drawn' : 'Not drawn'}</span>
            </div>
        </div>
    )
}
