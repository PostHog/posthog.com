import React, { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type Layer = {
    /** First and last path index in the brand art, which paints its paths back to front. */
    paths: [number, number]
    /** Paths from the art's translucent shade group that belong to this layer. */
    shade?: number[]
    /** Moves the clip line. Each slice's fur reaches left over the previous slice, which looks right
     * when stacked but floats loose when the layers fan out, so the layer is clipped just left of its edge. */
    clip?: number
    /** Left edge of the visible art, in SVG units. */
    artLeft: number
}

// Back to front, cut from the @posthog/brand "slices" hoggie. The art shows the open state. Path 239
// is the shared ground shadow, which can't follow layers that move apart, so no layer uses it.
const LAYERS: Layer[] = [
    { paths: [0, 56], shade: [240], artLeft: 25 },
    { paths: [57, 76], clip: -100, artLeft: 180 },
    { paths: [77, 96], clip: 0, artLeft: 282 },
    { paths: [97, 134], clip: 107, artLeft: 390 },
    { paths: [135, 167], clip: 220, artLeft: 513 },
    { paths: [168, 236], shade: [237, 238], clip: 340, artLeft: 640 },
]
// The box around the whole art, in SVG units. Every layer uses it, so the layers line up.
const VIEW_BOX = { x: 25, y: 312, width: 943, height: 421 }
const FRONT_ART_WIDTH = 328

const FRONT = LAYERS[LAYERS.length - 1]
const toPercent = (units: number) => (units / VIEW_BOX.width) * 100
// The front hog spans the last third of the container when open, and sits in the middle when closed
const FRONT_WIDTH = toPercent(FRONT_ART_WIDTH)
const FRONT_CLOSED_LEFT = (100 - FRONT_WIDTH) / 2
// How much of the open spacing each layer keeps when closed. Small gaps keep it looking sliced.
const CLOSED_TUCK = 0.3
// Widens the gaps in the closed stack, so a sliver of each slice stays visible
const CLOSED_SPREAD = 1.5
const OFFSETS = LAYERS.map(({ artLeft }) => {
    // How far left of the front hog the layer sits in the art, as a percent of the container
    const tuck = toPercent(FRONT.artLeft - artLeft) * CLOSED_TUCK
    return { openLeft: toPercent(artLeft - VIEW_BOX.x), tuck }
})
// Shifts the closed stack right by half its spread, so it sits in the middle of the container
const CLOSED_CENTERING = (Math.max(...OFFSETS.map(({ tuck }) => tuck)) * CLOSED_SPREAD) / 2
// How far each step from the middle moves when it breathes: 2.5% of a slice's width. Each layer
// is as wide as the container, so the value is in container percent.
const BREATH = 2.5 * (FRONT_WIDTH / 100)

let instanceCount = 0

// Splits the brand art into one SVG body per layer, with a clip path for each layer that needs one.
const buildLayers = (body: string, idPrefix: string): string[] => {
    const paths = body.match(/<path\b[^>]*?\/?>(?:<\/path>)?/g) ?? []
    const shadeTag = body.match(/<g\b[^>]*>/)?.[0] ?? '<g>'
    return LAYERS.map(({ paths: [first, last], shade = [], clip }, index) => {
        const inner =
            paths.slice(first, last + 1).join('') +
            (shade.length ? `${shadeTag}${shade.map((i) => paths[i]).join('')}</g>` : '')
        if (clip === undefined) return inner
        // The line runs along the edge of the code slice: x = 399 + clip - 0.213 * y
        const id = `${idPrefix}-${index}`
        const polygon = `${399 + clip},0 1000,0 1000,1000 ${399 + clip - 213},1000`
        return `<defs><clipPath id="${id}"><polygon points="${polygon}"/></clipPath></defs><g clip-path="url(#${id})">${inner}</g>`
    })
}

interface SlicedHogProps {
    className?: string
    /** Read by assistive tech in place of the art. */
    label?: string
    /** Shown as a tooltip on hover. */
    title?: string
}

/**
 * A hedgehog that opens into slices when it scrolls into view, then floats and breathes. Click it to close and open it again.
 * With reduced motion, it starts open, stays still, and a click switches state without animation.
 */
export default function SlicedHog({
    className = '',
    label = 'A hedgehog cut into slices, each one a different kind of data',
    title,
}: SlicedHogProps): JSX.Element {
    const shouldReduceMotion = useReducedMotion()
    const [revealRef, inView] = useInView({ threshold: 0.5, triggerOnce: true })
    // Tracked separately, so the float stops while the hog is off screen
    const [visibleRef, onScreen] = useInView({ threshold: 0 })
    const ref = useCallback(
        (node: HTMLButtonElement | null) => {
            revealRef(node)
            visibleRef(node)
        },
        [revealRef, visibleRef]
    )
    const [open, setOpen] = useState(false)
    const [layers, setLayers] = useState<string[] | null>(null)
    // Clip path ids must be unique on the page
    const [idPrefix] = useState(() => `sliced-hog-${++instanceCount}`)

    // The art is about 260 KB of gzipped path data, so it loads in its own chunk after hydration,
    // not in the page bundle or the server HTML
    useEffect(() => {
        let cancelled = false
        import('@posthog/brand/hoggies/svg/slices').then(({ body }: { body: string }) => {
            if (!cancelled) setLayers(buildLayers(body, idPrefix))
        })
        return () => {
            cancelled = true
        }
    }, [idPrefix])

    // With reduced motion there is no reveal to wait for, so it starts open. Either way it waits for the art.
    useEffect(() => {
        if (layers && (inView || shouldReduceMotion)) {
            setOpen(true)
        }
    }, [layers, inView, shouldReduceMotion])

    // Once open and on screen, the slices float and breathe
    const floating = open && onScreen && !shouldReduceMotion

    return (
        <button
            ref={ref}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-pressed={open}
            aria-label={label}
            title={title}
            className={`relative block w-full cursor-pointer select-none ${className}`}
            style={{ aspectRatio: VIEW_BOX.width / VIEW_BOX.height }}
        >
            {layers?.map((markup, index) => {
                const { openLeft, tuck } = OFFSETS[index]
                const closedLeft = FRONT_CLOSED_LEFT + CLOSED_CENTERING - tuck * CLOSED_SPREAD
                // Each layer is as wide as the container, so the shift in container percent is also
                // the translateX percent
                const closedOffset = closedLeft - openLeft
                // Signed distance from the middle of the stack: the outer layers lead the reveal and move most when it breathes
                const spread = index - (LAYERS.length - 1) / 2
                const delay = 0.18 - Math.abs(spread) * 0.06

                return (
                    <motion.div
                        key={index}
                        className="absolute inset-0"
                        style={{ zIndex: index }}
                        initial={false}
                        animate={{ x: open ? '0%' : `${closedOffset}%` }}
                        transition={
                            shouldReduceMotion
                                ? { duration: 0 }
                                : { type: 'spring', stiffness: 140, damping: 16, delay: open ? delay : 0 }
                        }
                    >
                        {/* A separate element, so the idle motion never fights the open/close spring */}
                        <motion.div
                            className="size-full"
                            initial={false}
                            animate={
                                floating
                                    ? {
                                          y: ['0%', '-1.5%', '0%'],
                                          x: ['0%', `${-spread * BREATH}%`, `${spread * BREATH}%`, '0%'],
                                      }
                                    : { y: '0%', x: '0%' }
                            }
                            transition={
                                floating
                                    ? {
                                          // Each layer floats on its own cycle, out of step with the others
                                          y: {
                                              duration: 3 + index * 0.4,
                                              delay: 0.9 + index * 0.2,
                                              repeat: Infinity,
                                              ease: 'easeInOut',
                                          },
                                          // All layers breathe together: squeeze in, burst out, settle
                                          x: {
                                              duration: 2.4,
                                              times: [0, 0.35, 0.7, 1],
                                              delay: 2,
                                              repeat: Infinity,
                                              repeatDelay: 3,
                                              ease: 'easeInOut',
                                          },
                                      }
                                    : { duration: 0.3 }
                            }
                        >
                            <svg
                                viewBox={`${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.width} ${VIEW_BOX.height}`}
                                fill="none"
                                aria-hidden="true"
                                className="block size-full"
                                dangerouslySetInnerHTML={{ __html: markup }}
                            />
                        </motion.div>
                    </motion.div>
                )
            })}
        </button>
    )
}
