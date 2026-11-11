import React, { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CloudinaryImage from 'components/CloudinaryImage'

type Layer = {
    src: `https://res.cloudinary.com/${string}`
    /** Natural image size in px. Sets the layer's size relative to the others. */
    naturalWidth: number
    naturalHeight: number
    /** Left edge when open, as a percent of the container width. */
    openLeft: number
    /** How far left of the front hog it sits when closed, in percent. Small gaps keep it looking sliced. */
    tuck: number
}

// Back to front, so later layers paint on top. Spacing traced from the reference artwork.
const LAYERS: Layer[] = [
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/back_hog_203f4b58bd.png',
        naturalWidth: 1111,
        naturalHeight: 1321,
        openLeft: 0,
        tuck: 19.5,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/4_slice_17f56d54c6.png',
        naturalWidth: 1012,
        naturalHeight: 1224,
        openLeft: 14,
        tuck: 14,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/3_slice_a5fde2abfa.png',
        naturalWidth: 1027,
        naturalHeight: 1233,
        openLeft: 27,
        tuck: 10.5,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/2_slice_ef37167f3a.png',
        naturalWidth: 1037,
        naturalHeight: 1255,
        openLeft: 40,
        tuck: 7,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/1_slice_80f9cf3a3b.png',
        naturalWidth: 1023,
        naturalHeight: 1234,
        openLeft: 53,
        tuck: 3.5,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/front_hog_b2e22c2f66.png',
        naturalWidth: 1103,
        naturalHeight: 1299,
        openLeft: 65.5,
        tuck: 0,
    },
]

// The front hog spans the last 34.5% of the container when open, and sits in the middle when closed
const FRONT_WIDTH = 34.5
const SCALE = FRONT_WIDTH / LAYERS[LAYERS.length - 1].naturalWidth
const FRONT_CLOSED_LEFT = (100 - FRONT_WIDTH) / 2
// Widens the gaps in the closed stack, so a sliver of each slice stays visible
const CLOSED_SPREAD = 1.5
// Shifts the closed stack right by half its spread, so it sits in the middle of the container
const CLOSED_CENTERING = (Math.max(...LAYERS.map(({ tuck }) => tuck)) * CLOSED_SPREAD) / 2
// Requested from Cloudinary in place of the ~1,100px originals. Enough for a 2x screen at max-w-3xl.
const IMAGE_WIDTH = 600
// How far each step from the middle moves when it breathes, as a percent of the layer's width
const BREATH = 2.5
// The container is as tall as the tallest layer
const ASPECT_RATIO = 100 / (Math.max(...LAYERS.map(({ naturalHeight }) => naturalHeight)) * SCALE)

interface SlicedHogProps {
    className?: string
    /** Read by assistive tech in place of the images. */
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

    // With reduced motion there is no reveal to wait for, so it starts open
    useEffect(() => {
        if (inView || shouldReduceMotion) {
            setOpen(true)
        }
    }, [inView, shouldReduceMotion])

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
            style={{ aspectRatio: ASPECT_RATIO }}
        >
            {LAYERS.map(({ src, naturalWidth, openLeft, tuck }, index) => {
                const width = naturalWidth * SCALE
                const closedLeft = FRONT_CLOSED_LEFT + CLOSED_CENTERING - tuck * CLOSED_SPREAD
                // Percent of the layer's own width, which is what a translateX percentage resolves against
                const closedOffset = ((closedLeft - openLeft) / width) * 100
                // Signed distance from the middle of the stack: the outer layers lead the reveal and move most when it breathes
                const spread = index - (LAYERS.length - 1) / 2
                const delay = 0.18 - Math.abs(spread) * 0.06

                return (
                    <motion.div
                        key={src}
                        className="absolute top-0"
                        style={{ left: `${openLeft}%`, width: `${width}%`, zIndex: index }}
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
                            <CloudinaryImage
                                src={src}
                                width={IMAGE_WIDTH}
                                alt=""
                                className="w-full"
                                imgClassName="w-full"
                            />
                        </motion.div>
                    </motion.div>
                )
            })}
        </button>
    )
}
