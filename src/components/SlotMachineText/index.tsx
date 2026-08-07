import React, { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'

export interface SlotMachineTextProps {
    /** Words cycled through the vertical scroller, in order. The last word is held longer before looping. */
    words: string[]
    /** Static content rendered before the scroller (e.g. an icon + label). */
    prefix?: React.ReactNode
    /** ms each word rests before scrolling to the next. */
    interval?: number
    /** ms the final word is held before the reel loops back to the start. */
    holdDuration?: number
    /** ms the scroll transition between words takes. */
    transitionDuration?: number
    /** Class on the outer inline-flex wrapper (font size/weight live here). */
    className?: string
    /** Class applied to each scrolling word (e.g. a color or gradient). */
    wordClassName?: string
    /** Word announced to assistive tech (the animated reel is aria-hidden). Defaults to the last word. */
    srWord?: string
}

/**
 * One line of text ending in a vertical "slot machine" word scroller.
 * The reel cycles `words` in order, holds on the last word, then loops seamlessly.
 * Respects `prefers-reduced-motion` (renders the final word statically).
 */
export function SlotMachineText({
    words,
    prefix,
    interval = 1200,
    holdDuration = 2400,
    transitionDuration = 550,
    className = '',
    wordClassName = '',
    srWord,
}: SlotMachineTextProps): JSX.Element {
    const prefersReducedMotion = usePrefersReducedMotion()
    const listRef = useRef<HTMLSpanElement>(null)
    const [step, setStep] = useState(0)
    const [index, setIndex] = useState(0)
    const [animate, setAnimate] = useState(true)

    const total = words.length
    const lastWord = srWord ?? words[total - 1] ?? ''
    // Duplicate the first word at the end so looping from the last word back to the first scrolls seamlessly.
    const reel = [...words, words[0] ?? '']

    // Measure one word's rendered height so the reel translates exactly one line per step,
    // and keep it accurate across responsive font-size changes.
    useEffect(() => {
        const measure = () => {
            const first = listRef.current?.children[0] as HTMLElement | undefined
            if (first) setStep(first.offsetHeight)
        }
        measure()
        if (typeof ResizeObserver === 'undefined' || !listRef.current) return
        const ro = new ResizeObserver(measure)
        ro.observe(listRef.current)
        return () => ro.disconnect()
    }, [words])

    // Drive the reel.
    useEffect(() => {
        if (prefersReducedMotion) return
        if (index === total) {
            // Sitting on the duplicated first word: let the scroll finish, then snap back to the real first word.
            const t = setTimeout(() => {
                setAnimate(false)
                setIndex(0)
            }, transitionDuration)
            return () => clearTimeout(t)
        }
        if (!animate) {
            // Re-enable the transition on the frame after a snap so the reset is invisible.
            const r = requestAnimationFrame(() => setAnimate(true))
            return () => cancelAnimationFrame(r)
        }
        const isLast = index === total - 1
        const t = setTimeout(() => setIndex((i) => i + 1), isLast ? holdDuration : interval)
        return () => clearTimeout(t)
    }, [index, animate, prefersReducedMotion, total, interval, holdDuration, transitionDuration])

    if (prefersReducedMotion) {
        return (
            <span className={`inline-flex items-center gap-2 ${className}`}>
                {prefix}
                <span className={wordClassName}>{lastWord}</span>
            </span>
        )
    }

    return (
        <span className={`inline-flex items-center gap-2 ${className}`}>
            {prefix}
            <span
                className="relative inline-block overflow-hidden"
                style={{ height: step ? `${step}px` : '1.2em' }}
                aria-hidden="true"
            >
                <span
                    ref={listRef}
                    className="flex flex-col"
                    style={{
                        transform: `translateY(-${index * step}px)`,
                        transition: animate
                            ? `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
                            : 'none',
                    }}
                >
                    {reel.map((word, i) => (
                        <span key={`${word}-${i}`} className={`block whitespace-nowrap ${wordClassName}`}>
                            {word}
                        </span>
                    ))}
                </span>
            </span>
            {/* Static word for assistive tech (the animated reel above is aria-hidden). */}
            <span className="sr-only">{lastWord}</span>
        </span>
    )
}

export default SlotMachineText
