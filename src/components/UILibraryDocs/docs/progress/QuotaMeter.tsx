import React, { useState } from 'react'
import { Meter } from 'components/UI/Meter'
import { Button } from 'components/UI/Button'
import type { ColorName } from 'components/UI/colors'

export default function QuotaMeter(): JSX.Element {
    const [used, setUsed] = useState(62)
    const color: ColorName = used > 95 ? 'coral' : used > 80 ? 'tangerine' : 'brand'
    return (
        <div className="flex max-w-sm flex-col gap-3">
            <Meter.Root value={used} color={color}>
                <Meter.Label>Monthly events used</Meter.Label>
                <Meter.Value />
                <Meter.Track>
                    <Meter.Indicator />
                </Meter.Track>
            </Meter.Root>
            <div className="flex flex-wrap gap-2">
                {[62, 85, 97].map((value) => (
                    <Button key={value} size="sm" onClick={() => setUsed(value)} aria-pressed={used === value}>
                        {value}%
                    </Button>
                ))}
            </div>
        </div>
    )
}
