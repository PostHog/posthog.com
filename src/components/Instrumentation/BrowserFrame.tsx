import React from 'react'

interface BrowserFrameProps {
    bodyRef: React.RefObject<HTMLDivElement>
    className?: string
    children: React.ReactNode
    url?: string
}

// Fake browser chrome that frames the Unter demo site as "someone else's
// website". The body is the positioning context for the demo's floating
// widgets and the instrumentation overlay stage.
export default function BrowserFrame({
    bodyRef,
    className = '',
    children,
    url = 'unter.co.uk',
}: BrowserFrameProps): JSX.Element {
    return (
        <div className={`flex flex-col rounded-md border border-primary overflow-hidden shadow-xl ${className}`}>
            {/* A 1fr/auto/1fr grid rather than flex, so the URL stays centered whatever
                width the hint beside it takes up. */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-2 bg-accent border-b border-primary shrink-0">
                <div className="flex gap-1.5" aria-hidden>
                    <span className="size-3 rounded-full bg-red" />
                    <span className="size-3 rounded-full bg-yellow" />
                    <span className="size-3 rounded-full bg-green-2" />
                </div>
                <span className="px-4 py-0.5 rounded-full bg-primary border border-primary text-xs text-secondary font-code select-none">
                    {url}
                </span>
                {/* Nothing else says the demo has four pages, and every page instruments
                    different tools. The arrow points at the site's own nav, directly
                    below, which is what there is to click. */}
                <span className="justify-self-end text-xs text-secondary text-right leading-tight">
                    Every page is instrumented differently, click through them ↓
                </span>
            </div>
            <div ref={bodyRef} className="unter-frame relative flex-1 min-h-0">
                {children}
            </div>
        </div>
    )
}
