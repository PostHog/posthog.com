import React, { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CloudinaryImage from 'components/CloudinaryImage'

type Layer = {
    src: `https://res.cloudinary.com/${string}`
    /** Natural image width in px. Sets the layer's width relative to the others. */
    naturalWidth: number
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
        openLeft: 0,
        tuck: 19.5,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/4_slice_17f56d54c6.png',
        naturalWidth: 1012,
        openLeft: 14,
        tuck: 14,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/3_slice_a5fde2abfa.png',
        naturalWidth: 1027,
        openLeft: 27,
        tuck: 10.5,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/2_slice_ef37167f3a.png',
        naturalWidth: 1037,
        openLeft: 40,
        tuck: 7,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/1_slice_80f9cf3a3b.png',
        naturalWidth: 1023,
        openLeft: 53,
        tuck: 3.5,
    },
    {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/front_hog_b2e22c2f66.png',
        naturalWidth: 1103,
        openLeft: 65.5,
        tuck: 0,
    },
]

// The front hog spans the last 34.5% of the container when open, and sits in the middle when closed
const FRONT_WIDTH = 34.5
const SCALE = FRONT_WIDTH / 1103
const FRONT_CLOSED_LEFT = (100 - FRONT_WIDTH) / 2
// Shifts the closed stack right by half its spread, so it sits in the middle of the container
const CLOSED_CENTERING = Math.max(...LAYERS.map(({ tuck }) => tuck)) / 2
// Requested from Cloudinary in place of the ~1,100px originals. Enough for a 2x screen at max-w-3xl.
const IMAGE_WIDTH = 600
const BACK_HEIGHT = 1321
const ASPECT_RATIO = 100 / (BACK_HEIGHT * SCALE)

interface SlicedHogProps {
    className?: string
    /** Read by assistive tech in place of the images. */
    label?: string
}

/**
 * A hedgehog that opens into slices when it scrolls into view, then floats. Click it to close and open it again.
 * With reduced motion, it starts open, does not float, and a click switches state without animation.
 */
export default function SlicedHog({
    className = '',
    label = 'A hedgehog cut into slices, each one a different kind of data',
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

    // Once open and on screen, the slices drift up and down, each on its own cycle
    const floating = open && onScreen && !shouldReduceMotion

    return (
        <button
            ref={ref}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-pressed={open}
            aria-label={label}
            className={`relative block w-full cursor-pointer select-none ${className}`}
            style={{ aspectRatio: ASPECT_RATIO }}
        >
            {LAYERS.map(({ src, naturalWidth, openLeft, tuck }, index) => {
                const width = naturalWidth * SCALE
                const closedLeft = FRONT_CLOSED_LEFT + CLOSED_CENTERING - tuck
                // Percent of the layer's own width, which is what a translateX percentage resolves against
                const closedOffset = ((closedLeft - openLeft) / width) * 100
                // The outer layers lead, and the middle slices follow
                const delay = Math.abs(index - (LAYERS.length - 1) / 2) * -0.06 + 0.18

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
                        {/* A separate element, so the float on y never fights the spring on x */}
                        <motion.div
                            initial={false}
                            animate={floating ? { y: ['0%', '-1.5%', '0%'] } : { y: '0%' }}
                            transition={
                                floating
                                    ? {
                                          duration: 3 + index * 0.4,
                                          delay: 0.9 + index * 0.2,
                                          repeat: Infinity,
                                          ease: 'easeInOut',
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
