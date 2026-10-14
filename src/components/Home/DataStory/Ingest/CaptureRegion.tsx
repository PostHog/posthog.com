import React, { useEffect, useRef } from 'react'
import { useDataLine } from './context'

export default function CaptureRegion({ children }: { children: React.ReactNode }): JSX.Element {
    const engine = useDataLine()
    const regionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        engine.setCaptureRegion(regionRef.current)
        return () => engine.setCaptureRegion(null)
    }, [engine])

    return <div ref={regionRef}>{children}</div>
}
