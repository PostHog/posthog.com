import * as React from 'react'
import { ScrollArea as RadixScrollArea } from 'radix-ui'
import { useHorizontalScrollFade, HorizontalScrollFades } from '../../hooks/useHorizontalScrollFade'
import { useAppSettings } from '../../context/App'

// There is no media query for scrollbar visibility, so the OS preference has to be measured:
// overlay scrollbars reserve no space, classic ones do. The probe lives in a shadow root because
// Blink puts an element into custom-scrollbar mode — always classic, never overlay — as soon as any
// author `::-webkit-scrollbar` rule matches it, and ours match `*`. Shadow encapsulation keeps those
// rules out so the measurement sees the real native scrollbar. Probed once per session.
let systemScrollbarsVisible: boolean | null = null

const detectSystemScrollbars = (): boolean => {
    if (systemScrollbarsVisible !== null) return systemScrollbarsVisible
    if (typeof document === 'undefined') return false

    const host = document.createElement('div')
    host.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:100px;height:100px'
    document.body.appendChild(host)

    const probe = document.createElement('div')
    // scrollbar-width/-color inherit across the shadow boundary, so reset them here too.
    probe.style.cssText = 'width:100px;height:100px;overflow:scroll;scrollbar-width:auto;scrollbar-color:auto'
    host.attachShadow({ mode: 'open' }).appendChild(probe)

    systemScrollbarsVisible = probe.offsetWidth - probe.clientWidth > 0
    host.remove()
    return systemScrollbarsVisible
}

interface ScrollAreaProps {
    children: React.ReactNode
    className?: string
    dataScheme?: string
    fadeOverflow?: boolean | number
    /** Show left/right edge fades that hint at horizontally scrollable content (only appear when the viewport overflows). */
    fadeX?: boolean
    style?: React.CSSProperties
    fullWidth?: boolean
    /** Marks this viewport as the page's scroll root, so posthog-js measures scroll depth against it. */
    isScrollRoot?: boolean
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
    isScrollRoot = false,
    viewportClasses = '',
    viewportRef,
}: ScrollAreaProps) => {
    const fadeHeight = fadeOverflow === true ? 8 : fadeOverflow || 0
    const { ref: fadeRef, showStart, showEnd } = useHorizontalScrollFade(fadeX)
    const { siteSettings } = useAppSettings()
    const scrollbars = siteSettings.scrollbars ?? 'auto'
    const [systemVisible, setSystemVisible] = React.useState(() => systemScrollbarsVisible ?? false)

    React.useEffect(() => {
        if (scrollbars === 'system') {
            setSystemVisible(detectSystemScrollbars())
        }
    }, [scrollbars])

    const scrollRootRef = React.useRef<HTMLDivElement | null>(null)

    // The horizontal fade needs its own ref on the viewport while still
    // honouring any `viewportRef` the caller passed.
    const setViewportRef = React.useCallback(
        (node: HTMLDivElement | null) => {
            fadeRef.current = node
            scrollRootRef.current = node
            if (typeof viewportRef === 'function') {
                viewportRef(node)
            } else if (viewportRef) {
                const mutableViewportRef = viewportRef as React.MutableRefObject<HTMLDivElement | null>
                mutableViewportRef.current = node
            }
        },
        [viewportRef]
    )

    // posthog-js measures scroll depth against the first element matching its
    // `scroll_root_selector` and does no scrollability check of its own. A page renders
    // either windowed (this viewport scrolls) or full page (the document scrolls), so only
    // claim the marker while this viewport is the element that actually scrolls.
    React.useEffect(() => {
        const node = scrollRootRef.current
        if (!isScrollRoot || !node) return

        const sync = () => {
            if (node.scrollHeight > node.clientHeight) {
                node.setAttribute('data-scroll-root', '')
            } else {
                node.removeAttribute('data-scroll-root')
            }
        }

        sync()
        const observer = new ResizeObserver(sync)
        observer.observe(node)
        if (node.firstElementChild) {
            observer.observe(node.firstElementChild)
        }
        return () => observer.disconnect()
    }, [isScrollRoot, children])

    return (
        <RadixScrollArea.Root
            // Radix `auto` keeps the rail visible while content overflows; `scroll` fades it out
            // once scrolling stops. Never `always`, which mounts a hit-testable rail even on
            // containers that don't overflow.
            type={scrollbars === 'show' || (scrollbars === 'system' && systemVisible) ? 'auto' : 'scroll'}
            data-scheme={dataScheme}
            className={`app-scroll-area relative overflow-hidden h-full flex-1 [&>div>div]:!block ${
                fullWidth ? 'max-w-screen' : ''
            } ${className}`}
            style={style}
        >
            <RadixScrollArea.Viewport
                ref={setViewportRef}
                tabIndex={-1}
                // Radix derives the viewport's overflow from Root state that only flips to
                // `scroll` in the Scrollbar's effect, so server-rendered markup ships
                // `overflow: hidden` and nothing scrolls until hydration. Both scrollbars below
                // are unconditional, so both axes always end up `scroll` anyway — setting them
                // here (Radix spreads `style` last) makes that true in the SSR'd HTML too.
                style={{ overflowX: 'scroll', overflowY: 'scroll' }}
                className={`app-scroll-viewport size-full outline-none ${viewportClasses} ${
                    fadeHeight ? `pb-${fadeHeight}` : ''
                }`}
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
