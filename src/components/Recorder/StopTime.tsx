import React, { useEffect } from 'react'

interface Props {
    running: boolean
    duration: number
    setDuration: React.Dispatch<React.SetStateAction<number>>
}

export default function StopTime({ running, duration, setDuration }: Props): React.ReactElement {
    const calculateTimeDuration = (secs: number): string => {
        const hr = Math.floor(secs / 3600).toString()
        let min = Math.floor((secs - parseInt(hr) * 3600) / 60).toString()
        let sec = Math.floor(secs - parseInt(hr) * 3600 - parseInt(min) * 60).toString()

        if (parseInt(min) < 10) {
            min = '0' + min
        }

        if (parseInt(sec) < 10) {
            sec = '0' + sec
        }

        if (parseInt(hr) <= 0) {
            return min + ':' + sec
        }

        return hr + ':' + min + ':' + sec
    }

    useEffect(() => {
        if (!running) return
        const interval = setInterval(() => setDuration((sec) => sec + 1), 1000)
        return () => clearInterval(interval)
    }, [running, setDuration])

    return (
        <div className="ml-1 flex w-10 items-center justify-center">
            <span className="text-sm">{calculateTimeDuration(duration)}</span>
        </div>
    )
}
