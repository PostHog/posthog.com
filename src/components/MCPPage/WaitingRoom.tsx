import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import CloudinaryImage from 'components/CloudinaryImage'

interface Magazine {
    title: string
    src: `https://res.cloudinary.com/${string}`
    // Shown when a visitor picks the cover up. One dry sentence about a headline on the cover.
    caption: string
}

const magazines: Magazine[] = [
    {
        title: 'Hogue',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogue_701c84c736.png',
        caption: 'Is context the new black? Only if it fits in the window.',
    },
    {
        title: 'AQ',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/aq_9af49d76fc.png',
        caption: 'He rewrote everything in Rust and has never once been asked why.',
    },
    {
        title: 'National Hographic',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/national_hographic_7d97b3de60.png',
        caption: 'Deep in the context window, a lone agent forages for tokens.',
    },
    {
        title: 'AI Gamer',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_gamer_ea2be63169.png',
        caption: 'The top tip for tokenminning is to read less.',
    },
    {
        title: 'Playhog',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/playhog_4b59e297a6.png',
        caption: 'The interview with a post-UI PostHog user has no screenshots.',
    },
    {
        title: 'Hogmopolitan',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogmopolitan_23568c9a3c.png',
        caption: "The quiz result says it's your API key.",
    },
    {
        title: 'Popular Mechagents',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/popular_mechagents_cb12cbbe9b.png',
        caption: 'The future is, as promised, both over-engineered and still in beta.',
    },
    {
        title: 'TOOL',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/tool_4dbaa920ae.png',
        caption: 'Agent of the year went to a unicycle with a satellite dish? smh',
    },
]

// The row shows four covers on a wide window and two on a narrow one. The rest scroll in.
const VISIBLE = 4

// The row holds three copies of the covers. The visitor stays in the middle copy: after a scroll ends, the row
// jumps by one copy length, which looks the same, so the loop has no end.
const COPIES = 3
const PAGE_ANIMATION_MS = 700

// Each slot has its own angle. A cover straightens when you point at it or pick it.
const tilts = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3']
const tiltFor = (position: number): string => tilts[position % tilts.length]

const shadow = 'shadow-md'
const shadowLifted = 'shadow-xl'

function shuffle(): number[] {
    const order = magazines.map((_, index) => index)
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
    }
    return order
}

export default function WaitingRoom(): JSX.Element {
    // The shuffle runs after mount, so the server HTML and the first client render match.
    const [picked, setPicked] = useState<number[] | null>(null)
    const [active, setActive] = useState<number | null>(null)
    const scroller = useRef<HTMLUListElement>(null)
    const settleTimer = useRef<ReturnType<typeof setTimeout>>()
    const reducedMotion = usePrefersReducedMotion()

    const lastPaged = useRef(0)
    const target = useRef(0)

    const isPaging = () => Date.now() - lastPaged.current < PAGE_ANIMATION_MS

    // The row has padding at both ends, so the copy width comes from the cover width and not from scrollWidth.
    const copyWidth = (el: HTMLElement) =>
        (el.firstElementChild as HTMLElement).getBoundingClientRect().width * magazines.length

    // Every position in the first or third copy has an identical twin in the middle copy.
    // The cover width has a fraction and scrollLeft does not, so the edges allow 1 px.
    const toMiddleCopy = (el: HTMLElement) => {
        const width = copyWidth(el)
        if (el.scrollLeft < width - 1) el.scrollLeft += width
        else if (el.scrollLeft >= width * 2 - 1) el.scrollLeft -= width
    }

    useLayoutEffect(() => {
        const el = scroller.current
        if (picked && el) el.scrollLeft = copyWidth(el)
    }, [picked])

    useEffect(() => () => clearTimeout(settleTimer.current), [])

    const settle = () => {
        clearTimeout(settleTimer.current)
        settleTimer.current = setTimeout(() => {
            const el = scroller.current
            if (!el) return
            if (isPaging()) settle()
            else toMiddleCopy(el)
        }, 150)
    }

    const page = (direction: 1 | -1) => {
        const el = scroller.current
        const cover = el?.firstElementChild as HTMLElement | undefined
        if (!el || !cover) return
        const unit = cover.getBoundingClientRect().width
        if (!isPaging()) {
            toMiddleCopy(el)
            target.current = Math.round(el.scrollLeft / unit) * unit
        }
        target.current += direction * Math.round(el.clientWidth / unit) * unit
        lastPaged.current = Date.now()
        el.scrollTo({ left: target.current, behavior: reducedMotion ? 'auto' : 'smooth' })
    }

    useEffect(() => {
        setPicked(shuffle())
    }, [])

    return (
        <section id="waiting-room" className="scroll-mt-20 not-prose mb-20">
            <div className="flex items-end gap-4 border-b border-primary @2xl/reader-content:gap-6">
                {/* The hog's seat is at 90% of the image height. The shift puts it on the line and lets the feet hang below. */}
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/sitting_reading_hog_abeb5be4fe.png"
                    alt=""
                    loading="lazy"
                    width={300}
                    className="pointer-events-none w-28 shrink-0 translate-y-[10%] @2xl/reader-content:w-36"
                    imgClassName="block w-full"
                />
                <SectionHeading
                    className="!mb-0 min-w-0 flex-1"
                    lede="For agents waiting to be tool-called into the next chat window. Help yourself to something to read."
                >
                    The waiting room
                </SectionHeading>
            </div>

            <div className="mt-6 flex items-center gap-2">
                <OSButton
                    icon={<IconChevronLeft />}
                    size="md"
                    className="shrink-0"
                    aria-label="Previous magazines"
                    onClick={() => page(-1)}
                />
                <ul
                    ref={scroller}
                    onScroll={settle}
                    aria-label="Magazines"
                    className="scrollbar-hide m-0 flex list-none min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto scroll-px-2 px-2 pb-12 pt-8"
                >
                    {(picked
                        ? Array.from({ length: COPIES }, () => picked).flat()
                        : Array.from({ length: VISIBLE }, () => null)
                    ).map((index, position) => {
                        const isCopy = picked !== null && Math.floor(position / magazines.length) !== 1
                        const magazine = index === null ? null : magazines[index]
                        const isActive = index !== null && index === active
                        return (
                            <li
                                key={index === null ? `empty-${position}` : `${position}`}
                                aria-hidden={isCopy || undefined}
                                className={`relative m-0 shrink-0 basis-1/2 snap-start list-none p-0 px-4 hover:z-10 @2xl/reader-content:basis-1/4 ${
                                    isActive ? 'z-20' : ''
                                } ${position % 2 === 1 ? '@2xl/reader-content:mt-8' : ''}`}
                            >
                                {magazine ? (
                                    <button
                                        type="button"
                                        onClick={() => setActive(index)}
                                        tabIndex={isCopy ? -1 : undefined}
                                        aria-pressed={isActive}
                                        className="group flex cursor-pointer rounded-sm border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red dark:focus-visible:outline-yellow"
                                    >
                                        <CloudinaryImage
                                            src={magazine.src}
                                            width={500}
                                            alt={`${magazine.title} magazine cover`}
                                            className="w-full"
                                            imgClassName={`relative block w-full aspect-[10/13] object-cover rounded-sm transition-all duration-200 ease-out motion-safe:group-hover:-translate-y-2 group-hover:rotate-0 motion-safe:group-hover:scale-105 group-hover:shadow-xl ${
                                                isActive
                                                    ? `rotate-0 ${shadowLifted} motion-safe:-translate-y-2 motion-safe:scale-105`
                                                    : `${tiltFor(position)} ${shadow}`
                                            }`}
                                            loading="lazy"
                                        />
                                    </button>
                                ) : (
                                    <div className="aspect-[10/13] w-full rounded-sm bg-accent" aria-hidden />
                                )}
                            </li>
                        )
                    })}
                </ul>
                <OSButton
                    icon={<IconChevronRight />}
                    size="md"
                    className="shrink-0"
                    aria-label="More magazines"
                    onClick={() => page(1)}
                />
            </div>

            <p
                role="status"
                aria-live="polite"
                className="mx-auto mb-0 mt-2 min-h-12 max-w-xl text-center text-sm text-secondary @xl/reader-content:text-base"
            >
                {active === null ? 'Go on, pick one up.' : magazines[active].caption}
            </p>
        </section>
    )
}
