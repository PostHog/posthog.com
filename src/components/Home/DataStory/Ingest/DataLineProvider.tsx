import React, { useEffect, useRef, useState } from 'react'
import { DataLineContext } from './context'
import { DataLineEngine } from './engine'

export default function DataLineProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [engine] = useState(() => new DataLineEngine())
    const objectsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const objects = objectsRef.current
        return objects ? engine.attach(objects) : undefined
    }, [engine])

    return (
        <DataLineContext.Provider value={engine}>
            {children}
            <div ref={objectsRef} aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden" />
        </DataLineContext.Provider>
    )
}
