import React, { useEffect } from 'react'
import mermaid from 'mermaid'

export default function Mermaid({ children }: { children: string }): JSX.Element {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true })
        mermaid.contentLoaded()
    }, [])

    return <div className="mermaid">{children}</div>
}
