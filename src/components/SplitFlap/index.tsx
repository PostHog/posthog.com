import { useAnimation, motion, AnimationControls, MotionStyle } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export interface ISplitFlap {
    stagger?: number
    from?: number
    to: number
    randomize?: boolean
    length?: number
    perspective?: string
    startDelay?: number
    onAnimationEnd?: () => void
}

const wrapperClasses = `w-full flex items-center justify-center overflow-hidden bg-black before:absolute before:left-0 before:w-full before:h-full before:content-[''] before:from-white/0 after:content-[''] after:left-0 after:w-full after:bg-white/25 after:absolute`

const contentClasses = `m-0 text-4xl font-bold text-yellow relative`

const range = (start: number, stop: number, step = 1) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

const randomRange = (start: number, stop: number, length: number = stop) => [
    start,
    ...Array.from({ length: length - 2 }, () => Math.floor(Math.random() * (start - stop) + stop)),
    stop,
]

const Flap = ({
    controls,
    index,
    className = '',
    children,
    style,
    onAnimationComplete,
}: {
    style: MotionStyle
    children: React.ReactNode
    index: number
    controls: AnimationControls
    className?: string
    onAnimationComplete?: () => void
    last?: boolean
}) => {
    return (
        <motion.div
            onAnimationComplete={() => {
                onAnimationComplete && onAnimationComplete()
            }}
            animate={controls}
            custom={index}
            style={style}
            className={`${wrapperClasses} after:h-[.5px] before:to-white/20 absolute h-1/2 ${className}`}
        >
            {children}
        </motion.div>
    )
}

const Flaps = ({
    number,
    numbers,
    index,
    inView,
    handleAnimationComplete,
    stagger,
    ready,
}: {
    number: number
    numbers: number[]
    index: number
    stagger: number
    inView: boolean
    ready: boolean
    handleAnimationComplete: (complete: boolean) => void
} & MotionStyle) => {
    const next = numbers[index + 1]
    const topControls = useAnimation()
    const bottomControls = useAnimation()

    const animate = async () => {
        await topControls.start((i) => {
            return {
                rotateX: '-90deg',
                transition: {
                    delay: i * stagger,
                    bounce: false,
                },
            }
        })
        await bottomControls.start({
            rotateX: '0deg',
            transition: {
                bounce: false,
            },
        })
    }

    useEffect(() => {
        ready && inView && animate()
    }, [inView, ready])

    return next || next === 0 ? (
        <>
            <Flap
                controls={topControls}
                index={index}
                style={{ transformOrigin: 'bottom', rotateX: '0deg', zIndex: numbers.length - index }}
                className="top-0 before:top-0 before:bg-gradient-to-b after:bottom-0 rounded-tl-sm rounded-tr-sm"
            >
                <p className={`${contentClasses} translate-y-1/2`}>{number}</p>
            </Flap>

            <Flap
                onAnimationComplete={() => {
                    if (index === numbers.length - 2) {
                        handleAnimationComplete(true)
                    }
                }}
                style={{ transformOrigin: 'top', rotateX: '90deg', zIndex: numbers.length }}
                controls={bottomControls}
                index={index}
                className="bottom-0 before:bottom-0 before:bg-gradient-to-t after:top-0 rounded-br-sm rounded-bl-sm"
            >
                <p className={`${contentClasses} -translate-y-1/2`}>{next}</p>
            </Flap>
        </>
    ) : null
}

export default function SplitFlap({
    stagger = 0.2,
    from = 1,
    to,
    randomize,
    length,
    perspective = '20rem',
    startDelay,
    onAnimationEnd,
}: ISplitFlap): JSX.Element {
    const [ready, setReady] = useState(!startDelay)
    const { ref, inView } = useInView({ triggerOnce: true })
    const [animationComplete, setAnimationComplete] = useState(false)
    const reverse = from > to
    const numbers = reverse
        ? randomize
            ? randomRange(to, from, length)
            : range(to, from)
        : (length && length > 0) || randomize
        ? randomRange(from, to, length)
        : range(from, to)

    useEffect(() => {
        if (startDelay && inView) {
            const timer = setTimeout(() => {
                setReady(true)
            }, startDelay)
            return () => clearTimeout(timer)
        }
    }, [inView])

    const handleAnimationComplete = (complete: boolean) => {
        setAnimationComplete(complete)
        onAnimationEnd && onAnimationEnd()
    }

    return (
        <div style={{ perspective }} ref={ref} className="relative w-20 h-20">
            <div
                className={`${wrapperClasses} w-full h-full relative before:top-0 before:bg-gradient-to-b before:via-white/20 before:to-white/0 after:top-1/2 after:-translate-y-1/2 shadow-xl rounded-sm after:h-[1px]`}
            >
                <p className={contentClasses}>
                    <span>{to}</span>
                </p>
            </div>
            {!animationComplete && (
                <>
                    <div
                        className={`${wrapperClasses} h-1/2 bottom-0 before:bottom-0 before:bg-gradient-to-t before:to-white/20 after:top-0 absolute rounded-br-sm rounded-bl-sm after:h-[.5px]`}
                    >
                        <p className={`${contentClasses} -translate-y-1/2`}>{from}</p>
                    </div>
                    {(reverse ? numbers.reverse() : numbers).map((number, index) => {
                        return (
                            <Flaps
                                ready={ready}
                                handleAnimationComplete={handleAnimationComplete}
                                inView={inView}
                                key={index}
                                numbers={numbers}
                                index={index}
                                number={number}
                                stagger={stagger}
                            />
                        )
                    })}
                </>
            )}
        </div>
    )
}
