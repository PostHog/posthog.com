import { IconArrowLeft, IconArrowRight } from '@posthog/icons'
import React, { useRef } from 'react'

const buttonClasses =
    'absolute top-1/2 -translate-y-1/2 opacity-75 group-hover:opacity-100 transition-opacity rounded border border-primary bg-accent p-1 border-b-2 hover:-mt-px active:mt-0 active:scale-[.99]'

/** One slide at a time, in a scroll-snap track. The arrows wrap around at either end. */
export default function ImageSlider({ children }: { children: JSX.Element[] | JSX.Element }) {
    const track = useRef<HTMLDivElement>(null)

    const go = (direction: 1 | -1) => {
        const element = track.current
        if (!element) return
        const { scrollLeft, clientWidth, scrollWidth } = element
        const atEnd = direction === 1 && scrollLeft + clientWidth >= scrollWidth - 1
        const atStart = direction === -1 && scrollLeft <= 0
        const left = atEnd ? 0 : atStart ? scrollWidth : scrollLeft + direction * clientWidth
        element.scrollTo({ left, behavior: 'smooth' })
    }

    return (
        <div className="relative group mb-4 px-8 @xl:px-12">
            <div ref={track} className="flex items-start overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {React.Children.map(children, (child) => (
                    <div className="w-full shrink-0 snap-start [&_img]:mx-auto">{child}</div>
                ))}
            </div>
            <button aria-label="Previous" onClick={() => go(-1)} className={`${buttonClasses} left-0`}>
                <IconArrowLeft className="size-5 opacity-70" />
            </button>
            <button aria-label="Next" onClick={() => go(1)} className={`${buttonClasses} right-0`}>
                <IconArrowRight className="size-5 opacity-70" />
            </button>
        </div>
    )
}
