import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

export default function Mermaid({ children }: { children: string }): JSX.Element {
    const [loading, setLoading] = useState(true)
    const mermaidRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        mermaid.initialize({ startOnLoad: false })
        if (mermaidRef.current && !mermaidRef.current.hasAttribute('data-rendered')) {
            mermaid.run({
                nodes: [mermaidRef.current],
                postRenderCallback: () => {
                    setLoading(false)
                    mermaidRef.current?.setAttribute('data-rendered', 'true')
                },
            })
        }
    }, [])
    return (
        <div className="relative">
            {loading && (
                <div className="bg-accent dark:bg-accent-dark flex items-center justify-center size-full rounded-md animate-pulse absolute inset-0" />
            )}
            <div ref={mermaidRef} className={`${loading ? 'invisible' : ''} mermaid-container`}>
                {children}
            </div>
        </div>
    )
}
