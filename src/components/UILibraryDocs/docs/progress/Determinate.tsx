import React, { useEffect, useState } from 'react'
import { Button } from 'components/UI/Button'
import { Progress } from 'components/UI/Progress'

const EXPORT_STEP_MS = 400
const STARTING_PROGRESS = 40

export default function ProgressDeterminate(): JSX.Element {
    const [exported, setExported] = useState(STARTING_PROGRESS)
    const [running, setRunning] = useState(false)

    useEffect(() => {
        if (!running) {
            return
        }
        const timer = window.setInterval(() => {
            setExported((current) => Math.min(100, current + 7 + Math.round(Math.random() * 13)))
        }, EXPORT_STEP_MS)
        return () => window.clearInterval(timer)
    }, [running])

    useEffect(() => {
        if (exported === 100) {
            setRunning(false)
        }
    }, [exported])

    const runExport = () => {
        setExported(0)
        setRunning(true)
    }

    return (
        <div className="flex max-w-sm flex-col items-start gap-3">
            <Progress.Root value={exported}>
                <Progress.Label>Export events</Progress.Label>
                <Progress.Value />
                <Progress.Track>
                    <Progress.Indicator />
                </Progress.Track>
            </Progress.Root>
            <Button size="sm" onClick={runExport} disabled={running}>
                Run export
            </Button>
        </div>
    )
}
