import React, { lazy, Suspense } from 'react'
import type { GalaxyCanvasProps } from './GalaxyCanvas'

const GalaxyCanvasInner =
    typeof window !== 'undefined' ? lazy(() => import('./GalaxyCanvas')) : ((() => null) as React.FC<GalaxyCanvasProps>)

export default function GalaxyCanvasLazy(props: GalaxyCanvasProps): JSX.Element {
    if (typeof window === 'undefined') {
        return (
            <div className="flex items-center justify-center w-full h-full text-accent font-mono text-xs">
                CALIBRATING TELEMETRY...
            </div>
        )
    }

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center w-full h-full text-accent font-mono text-xs uppercase tracking-widest animate-pulse">
                    › Initialising sublight engines...
                </div>
            }
        >
            <GalaxyCanvasInner {...props} />
        </Suspense>
    )
}
