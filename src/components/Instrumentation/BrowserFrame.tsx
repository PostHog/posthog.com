import React from 'react'

interface BrowserFrameProps {
    bodyRef: React.RefObject<HTMLDivElement>
    className?: string
    children: React.ReactNode
    url?: string
    /**
     * Draw the fake browser chrome. Off for a cropped close-up, which is a detail *of* a
     * site rather than a site, and where a second window frame is the "OS in an OS" problem.
     * The `.unter-frame` element stays either way – it carries `container-name: unter`, so
     * every Unter container query is measured against it.
     */
    chrome?: boolean
}

// Fake browser chrome that frames the Unter demo site as "someone else's
// website". The body is the positioning context for the demo's floating
// widgets and the instrumentation overlay stage.
export default function BrowserFrame({
    bodyRef,
    className = '',
    children,
    url = 'unter.co.uk',
    chrome = true,
}: BrowserFrameProps): JSX.Element {
    if (!chrome) {
        return (
            <div className={`@container w-full overflow-hidden ${className}`}>
                <div ref={bodyRef} className="unter-frame relative w-full">
                    {children}
                </div>
            </div>
        )
    }
    return (
        // Its own @container, so the hint below hides on frame width rather than page
        // width. Keyed off the page container it was overlapping the URL whenever the
        // sidebar was taking a bigger share than the breakpoint assumed.
        <div
            className={`@container flex flex-col rounded-md border border-primary overflow-hidden shadow-xl ${className}`}
        >
            {/* Three columns, outer two equal, so the URL lands dead center however wide
                the hint beside it is. `min-w-0` is what makes them equal: a bare `1fr`
                still floors at min-content, so the hint's column grew and pushed the URL
                off center (and eventually under the hint). */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 py-2 bg-accent border-b border-primary shrink-0">
                <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                    <div className="flex gap-1.5 shrink-0" aria-hidden>
                        <span className="size-3 rounded-full bg-red" />
                        <span className="size-3 rounded-full bg-yellow" />
                        <span className="size-3 rounded-full bg-green-2" />
                    </div>
                    {/* Nothing else says the demo has four pages, each instrumenting
                        different tools. It sits on the left so the arrow points down at
                        the site's own nav, which is the thing to click. Hidden on a frame
                        too narrow to fit it and the centered URL side by side (below roughly
                        672px its column starts clipping the text). */}
                    <span className="hidden @2xl:inline shrink-0 text-xs text-secondary leading-tight">
                        Each page is instrumented differently ↓
                    </span>
                </div>
                <span className="px-4 py-0.5 rounded-full bg-primary border border-primary text-xs text-secondary font-code select-none">
                    {url}
                </span>
                <div aria-hidden />
            </div>
            <div ref={bodyRef} className="unter-frame relative flex-1 min-h-0">
                {children}
            </div>
        </div>
    )
}
