import React, { useState } from 'react'
import { Meter } from 'components/UI/Meter'
import { Button } from 'components/UI/Button'
import type { Tone } from 'components/UI/styles'

export default function QuotaMeter(): JSX.Element {
    const [used, setUsed] = useState(62)
    const tone: Tone = used > 95 ? 'error' : used > 80 ? 'warning' : 'brand'
    return (
        <div className="flex max-w-sm flex-col gap-3">
            <Meter.Root value={used} tone={tone}>
                <Meter.Label>Monthly events used</Meter.Label>
                <Meter.Value />
                <Meter.Track>
                    <Meter.Indicator />
                </Meter.Track>
            </Meter.Root>
            <div className="flex flex-wrap gap-2">
                {[62, 80, 81, 95, 96].map((value) => (
                    <Button key={value} size="sm" onClick={() => setUsed(value)} aria-pressed={used === value}>
                        {value}%
                    </Button>
                ))}
            </div>
        </div>
    )
}
