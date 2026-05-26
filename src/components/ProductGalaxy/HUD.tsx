import React from 'react'

interface HUDProps {
    nodeCount: number
    edgeCount: number
    selectedCount: number
    focusedName?: string | null
}

// The HUD sits on top of the always-dark canvas, so explicit light-on-dark colors
// are correct here regardless of the page theme. Warm `light-7` gray for chrome,
// amber `orange` for the active labels — phosphor-monitor amber, not neon teal.
export default function HUD({ nodeCount, edgeCount, selectedCount, focusedName }: HUDProps): JSX.Element {
    return (
        <div className="pointer-events-none absolute top-2 left-2 right-2 z-10 flex flex-wrap items-start justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-orange">
            <div className="border border-light-7/40 bg-black/70 backdrop-blur-sm px-2 py-1 leading-snug">
                <div className="flex gap-4 text-light-7">
                    <span>
                        NODES: <span className="text-orange">{nodeCount.toString().padStart(2, '0')}</span>
                    </span>
                    <span>
                        LINKS: <span className="text-orange">{edgeCount.toString().padStart(2, '0')}</span>
                    </span>
                    <span>
                        FLEET: <span className="text-orange">{selectedCount.toString().padStart(2, '0')}</span>
                    </span>
                </div>
                <div className="text-orange/80 mt-0.5">
                    {focusedName ? `› SCANNING: ${focusedName.toUpperCase()}` : '› AWAITING CONTACT'}
                </div>
            </div>
            <div className="border border-light-7/40 bg-black/70 backdrop-blur-sm px-2 py-1 flex flex-col gap-0.5 leading-snug text-light-7">
                <span>› DRAG TO ROTATE</span>
                <span>› SCROLL TO ZOOM</span>
                <span>› CLICK NODE TO ADD/REMOVE</span>
            </div>
        </div>
    )
}
