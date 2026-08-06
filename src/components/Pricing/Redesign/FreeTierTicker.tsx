import React, { useEffect, useRef, useState } from 'react'
import FreeTier from 'components/Pricing/Test/FreeTier'

/**
 * The monthly free-tier allowances as a single-row, auto-scrolling marquee.
 *
 * Same technique as `components/Home/ToolsTicker` (see its README): the strip is
 * rendered twice inside a `flex w-max` track and the shared
 * `tools-ticker-marquee` keyframe animates it from `translateX(0)` to
 * `translateX(-50%)` — exactly one copy's width — so the loop is seamless for any
 * number of items.
 *
 * Edge fades use CSS `mask-image` rather than an overlaid gradient. That matters
 * here: an overlay has to guess the background colour, and this section sits on
 * the window's translucent backdrop, where a solid gradient reads as a grey/white
 * block. A mask makes the pixels genuinely transparent, so it works on any
 * background and in both colour modes.
 */

/** Scroll speed. Duration is derived from measured width so apparent speed stays
 *  constant no matter how many items `FreeTier` renders or how wide their labels are. */
const PIXELS_PER_SECOND = 55

/** Gap between items. Must match `STRIP_TRAILING_CLASS` below or the seam shows. */
const STRIP_GAP_CLASS = 'gap-12'
const STRIP_TRAILING_CLASS = 'pr-12'

const Strip = ({ ariaHidden = false, innerRef }: { ariaHidden?: boolean; innerRef?: React.Ref<HTMLDivElement> }) => (
    <div
        ref={innerRef}
        aria-hidden={ariaHidden || undefined}
        className={`flex items-start shrink-0 [&>*]:shrink-0 ${STRIP_GAP_CLASS} ${STRIP_TRAILING_CLASS}`}
    >
        <FreeTier />
    </div>
)

export default function FreeTierTicker(): JSX.Element {
    const stripRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [durationSeconds, setDurationSeconds] = useState<number | null>(null)

    useEffect(() => {
        const element = stripRef.current
        if (!element) return

        const measure = () => {
            const width = element.scrollWidth
            if (width > 0) {
                setDurationSeconds(width / PIXELS_PER_SECOND)
            }
        }

        measure()
        // Labels reflow (and icon fonts load) after first paint, so remeasure.
        const observer = new ResizeObserver(measure)
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            className="relative overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,#000_2rem,#000_calc(100%-2rem),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_2rem,#000_calc(100%-2rem),transparent)]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            <div
                className="flex w-max py-2 motion-reduce:[animation:none!important]"
                style={
                    durationSeconds
                        ? {
                              animation: `tools-ticker-marquee ${durationSeconds}s linear infinite`,
                              animationPlayState: isPaused ? 'paused' : 'running',
                          }
                        : undefined
                }
            >
                <Strip innerRef={stripRef} />
                {/* Duplicate exists only to make the loop seamless; hidden from AT. */}
                <Strip ariaHidden />
            </div>
        </div>
    )
}
