import React from 'react'
import { Progress } from 'components/UI/Progress'

export default function ProgressIndeterminate(): JSX.Element {
    return (
        <Progress.Root value={null} className="max-w-sm">
            <Progress.Label>Loading insights</Progress.Label>
            <Progress.Track>
                <Progress.Indicator />
            </Progress.Track>
        </Progress.Root>
    )
}
