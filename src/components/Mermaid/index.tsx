import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch'
import { IconMinus, IconPlus, IconRefresh } from '@posthog/icons'

const ControlButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
    return (
        <button onClick={onClick} className="p-2 border border-primary rounded-md bg-accent">
            {children}
        </button>
    )
}

const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls()

    return (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-1 absolute bottom-0 right-0 z-10">
            <ControlButton onClick={() => zoomIn()}>
                <IconPlus className="w-4" />
            </ControlButton>
            <ControlButton onClick={() => zoomOut()}>
                <IconMinus className="w-4" />
            </ControlButton>
            <ControlButton onClick={() => resetTransform()}>
                <IconRefresh className="w-4" />
            </ControlButton>
        </div>
    )
}

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
        <div className="relative group">
            {loading && (
                <div className="bg-accent flex items-center justify-center size-full rounded-md animate-pulse absolute inset-0" />
            )}
            <TransformWrapper>
                <Controls />
                <TransformComponent contentStyle={{ width: '100%' }} wrapperStyle={{ width: '100%' }}>
                    <div ref={mermaidRef} className={`${loading ? 'invisible' : ''} mermaid-container w-full`}>
                        {children}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}
