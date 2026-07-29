import * as React from 'react'
import { ScrollArea as RadixScrollArea } from 'radix-ui'
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
                const mutableViewportRef = viewportRef as React.MutableRefObject<HTMLDivElement | null>
                mutableViewportRef.current = node
            }
        },
        [viewportRef]
    )

    return (
        <RadixScrollArea.Root
            type="scroll"
            data-scheme={dataScheme}
            className={`app-scroll-area relative overflow-hidden h-full flex-1 [&>div>div]:!block ${
                fullWidth ? 'max-w-screen' : ''
            } ${className}`}
            style={style}
        >
            <RadixScrollArea.Viewport
                ref={setViewportRef}
                // Radix derives the viewport's overflow from Root state that only flips to
                // `scroll` in the Scrollbar's effect, so server-rendered markup ships
                // `overflow: hidden` and nothing scrolls until hydration. Both scrollbars below
                // are unconditional, so both axes always end up `scroll` anyway — setting them
                // here (Radix spreads `style` last) makes that true in the SSR'd HTML too.
                style={{ overflowX: 'scroll', overflowY: 'scroll' }}
                className={`app-scroll-viewport size-full ${viewportClasses} ${fadeHeight ? `pb-${fadeHeight}` : ''}`}
            >
                {fullWidth ? <div>{children}</div> : children}
            </RadixScrollArea.Viewport>
            <RadixScrollArea.Scrollbar className="app-scrollbar" orientation="vertical">
                <RadixScrollArea.Thumb className="app-scrollbar-thumb" />
            </RadixScrollArea.Scrollbar>
            <RadixScrollArea.Scrollbar className="app-scrollbar" orientation="horizontal">
                <RadixScrollArea.Thumb className="app-scrollbar-thumb" />
            </RadixScrollArea.Scrollbar>
            <RadixScrollArea.Corner className="app-scrollbar-corner" />
            {fadeHeight > 0 && (
                <div className="block pointer-events-none">
                    <div
                        className={`scrollarea-fade absolute bottom-0 left-0 right-0 h-${fadeHeight} bg-gradient-to-b from-[color-mix(in_srgb,rgb(var(--bg))_0%,transparent)] via-[color-mix(in_srgb,rgb(var(--bg))_75%,transparent)] to-[rgb(var(--bg))]`}
                    />
                </div>
            )}
            {fadeX && <HorizontalScrollFades showStart={showStart} showEnd={showEnd} />}
        </RadixScrollArea.Root>
    )
}

export default ScrollArea
