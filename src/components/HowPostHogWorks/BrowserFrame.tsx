import React from 'react'

interface BrowserFrameProps {
    bodyRef: React.RefObject<HTMLDivElement>
    className?: string
    children: React.ReactNode
    url?: string
}

// Fake browser chrome that frames the Snuffl demo site as "someone else's
// website". The body is the positioning context for the demo's floating
// widgets and the instrumentation overlay stage.
export default function BrowserFrame({
    bodyRef,
    className = '',
    children,
    url = 'snuffl.com',
}: BrowserFrameProps): JSX.Element {
    return (
        <div className={`flex flex-col rounded-md border border-primary overflow-hidden shadow-xl ${className}`}>
            <div className="flex items-center gap-2 px-3 py-2 bg-accent border-b border-primary shrink-0">
                <div className="flex gap-1.5" aria-hidden>
                    <span className="size-3 rounded-full bg-red" />
                    <span className="size-3 rounded-full bg-yellow" />
                    <span className="size-3 rounded-full bg-green-2" />
                </div>
                <div className="flex-1 flex justify-center">
                    <span className="px-4 py-0.5 rounded-full bg-primary border border-primary text-xs text-secondary font-code select-none">
                        {url}
                    </span>
                </div>
                <div className="w-14" aria-hidden />
            </div>
            <div ref={bodyRef} className="snuffl-frame relative flex-1 min-h-0">
                {children}
            </div>
        </div>
    )
}
