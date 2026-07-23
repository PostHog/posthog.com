import * as React from 'react'
import { useHorizontalScrollFade, HorizontalScrollFades } from '../../hooks/useHorizontalScrollFade'

interface ScrollAreaProps {
    children: React.ReactNode
    className?: string
    dataScheme?: string
    fadeOverflow?: boolean | number
    /** Show left/right edge fades that hint at horizontally scrollable content (only appear when the viewport overflows). */
    fadeX?: boolean
    style?: React.CSSProperties
    fullWidth?: boolean
    viewportClasses?: string
    /** Ref to the scrolling viewport node — e.g. to persist/restore scroll position. */
    viewportRef?: React.Ref<HTMLDivElement>
}

const ScrollArea = ({
    children,
    className = '',
    dataScheme,
    fadeOverflow = false,
    fadeX = false,
    style,
    fullWidth = false,
    viewportClasses = '',
    viewportRef,
}: ScrollAreaProps) => {
    const fadeHeight = fadeOverflow === true ? 8 : fadeOverflow || 0
    const { ref: fadeRef, showStart, showEnd } = useHorizontalScrollFade(fadeX)

    // The horizontal fade needs its own ref on the viewport while still
    // honouring any `viewportRef` the caller passed.
    const setViewportRef = React.useCallback(
        (node: HTMLDivElement | null) => {
            fadeRef.current = node
            if (typeof viewportRef === 'function') {
                viewportRef(node)
            } else if (viewportRef) {
                ;(viewportRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            }
        },
        [viewportRef]
    )

    return (
        <div
            data-scheme={dataScheme}
            className={`relative overflow-hidden h-full flex-1 ${fullWidth ? 'max-w-screen' : ''} ${className}`}
            style={style}
        >
            <div
                ref={setViewportRef}
                // Kept for backwards-compatibility: many components locate the
                // scrolling viewport via `.closest('[data-radix-scroll-area-viewport]')`
                // (virtualization, scroll restoration, scroll-to-element, IO roots).
                // This is now a native scroller, but the contract is preserved.
                data-radix-scroll-area-viewport=""
                className={`app-scroll-viewport size-full overflow-auto ${viewportClasses} ${
                    fadeHeight ? `pb-${fadeHeight}` : ''
                }`}
            >
                {/* Inner wrapper mirrors the extra node Radix's Viewport used to
                    render (min-width: 100%, block). Callers target it via
                    descendant selectors like `[&>div>div]`, so the DOM nesting
                    (wrapper → viewport → content) must be preserved. */}
                <div className="block min-w-full">{children}</div>
            </div>
            {fadeHeight > 0 && (
                <div className="block pointer-events-none">
                    <div
                        className={`scrollarea-fade absolute bottom-0 left-0 right-0 h-${fadeHeight} bg-gradient-to-b from-[color-mix(in_srgb,rgb(var(--bg))_0%,transparent)] via-[color-mix(in_srgb,rgb(var(--bg))_75%,transparent)] to-[rgb(var(--bg))]`}
                    />
                </div>
            )}
            {fadeX && <HorizontalScrollFades showStart={showStart} showEnd={showEnd} />}
        </div>
    )
}

export default ScrollArea
