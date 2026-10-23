import React from 'react'
import { Progress } from 'components/UI/Progress'
import { Meter } from 'components/UI/Meter'
import type { Tone } from 'components/UI/styles'

const tones: Tone[] = ['brand', 'success', 'warning', 'error', 'info', 'neutral']

export default function Tones(): JSX.Element {
    return (
        <div className="flex max-w-sm flex-col gap-4">
            {tones.map((tone) => (
                <div key={tone} className="flex flex-col gap-3">
                    <Progress.Root value={60} tone={tone}>
                        <Progress.Label>Progress: {tone}</Progress.Label>
                        <Progress.Value />
                        <Progress.Track>
                            <Progress.Indicator />
                        </Progress.Track>
                    </Progress.Root>
                    <Progress.Root value={null} tone={tone}>
                        <Progress.Label>Indeterminate: {tone}</Progress.Label>
                        <Progress.Track>
                            <Progress.Indicator />
                        </Progress.Track>
                    </Progress.Root>
                    <Meter.Root value={60} tone={tone}>
                        <Meter.Label>Meter: {tone}</Meter.Label>
                        <Meter.Value />
                        <Meter.Track>
                            <Meter.Indicator />
                        </Meter.Track>
                    </Meter.Root>
                </div>
            ))}
        </div>
    )
}
