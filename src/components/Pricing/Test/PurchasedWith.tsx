import { IconArrowLeft, IconArrowRight } from '@posthog/icons'
import React, { useEffect, useRef } from 'react'
import { SectionHeader, section } from './Sections'
import ScrollArea from 'components/RadixUI/ScrollArea'

const CARD_GAP = 16
const LOOP_COPIES = 5
const LOOP_MIDDLE_INDEX = Math.floor(LOOP_COPIES / 2)
const LOOP_RESET_DELAY = 100

const purchasedWith = [
    {
        name: 'Supabase',
        description: 'Postgres database development platform',
        logo: 'https://obuldanrptloktxcffvn.supabase.co/storage/v1/object/public/supabase-brand-assets/logos/supabase-logo-icon.svg',
    },
    {
        name: 'Digital Ocean',
        description: 'Cloud infrastructure for developers',
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/DO_Logo_icon_blue_0ade9109b2.svg',
    },
    {
        name: 'Vercel',
        description: 'Build and deploy web experiences',
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/vercel_icon_dark_1023f19025.svg',
    },
    {
        name: 'Ashby',
        description: 'All-in-one recruiting software for ambitious teams.',
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/ashby_e4a768e087.svg',
    },
    {
        name: 'Algolia',
        description: 'AI-powered search and discovery',
        logo: 'https://res.cloudinary.com/dmukukwp6/image/upload/Algolia_mark_blue_f25812a7a2.svg',
    },
]

export default function PurchasedWith() {
    const carouselRef = useRef<HTMLDivElement>(null)
    const cycleWidthRef = useRef(0)

    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return

        let scrollEndTimer: ReturnType<typeof setTimeout> | undefined

        const normalizeLoopPosition = () => {
            const cycleWidth = cycleWidthRef.current
            if (!cycleWidth) return

            let nextScrollLeft = carousel.scrollLeft
            while (nextScrollLeft < cycleWidth) nextScrollLeft += cycleWidth
            while (nextScrollLeft >= cycleWidth * (LOOP_COPIES - 2)) nextScrollLeft -= cycleWidth

            if (Math.abs(nextScrollLeft - carousel.scrollLeft) > 1) {
                carousel.scrollLeft = nextScrollLeft
            }
        }

        const measureCarousel = () => {
            const cycleStarts = carousel.querySelectorAll<HTMLElement>('[data-carousel-cycle-start]')
            if (cycleStarts.length < 2) return

            const nextCycleWidth = cycleStarts[1].offsetLeft - cycleStarts[0].offsetLeft
            if (nextCycleWidth <= 0) return

            const previousCycleWidth = cycleWidthRef.current
            carousel.scrollLeft = previousCycleWidth
                ? (carousel.scrollLeft / previousCycleWidth) * nextCycleWidth
                : cycleStarts[LOOP_MIDDLE_INDEX].offsetLeft - cycleStarts[0].offsetLeft
            cycleWidthRef.current = nextCycleWidth
            normalizeLoopPosition()
        }

        const handleScroll = () => {
            if (scrollEndTimer) clearTimeout(scrollEndTimer)
            scrollEndTimer = setTimeout(normalizeLoopPosition, LOOP_RESET_DELAY)
        }

        measureCarousel()
        carousel.addEventListener('scroll', handleScroll, { passive: true })

        const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measureCarousel)
        resizeObserver?.observe(carousel)
        if (carousel.firstElementChild) resizeObserver?.observe(carousel.firstElementChild)

        return () => {
            if (scrollEndTimer) clearTimeout(scrollEndTimer)
            carousel.removeEventListener('scroll', handleScroll)
            resizeObserver?.disconnect()
        }
    }, [])

    const scrollByCard = (direction: -1 | 1) => {
        const carousel = carouselRef.current
        const card = carousel?.querySelector('li')
        if (!carousel || !card) return

        carousel.scrollBy({
            left: direction * (card.getBoundingClientRect().width + CARD_GAP),
            behavior: 'smooth',
        })
    }

    return (
        <section className={`not-prose mb-8 @2xl:mb-12 ${section}`}>
            <SectionHeader>
                <h2>Frequently purchased with...</h2>
            </SectionHeader>
            <p>
                These are some products that pair well with PostHog to help you find product-market fit and maybe even
                get to an IPO. (In fact, we use them ourselves!)
            </p>
            <div className="relative mt-4 overflow-hidden rounded-xl border border-primary bg-accent/70 shadow-lg backdrop-blur-md">
                <ScrollArea viewportRef={carouselRef} viewportClasses="scrollbar-hide">
                    <ul
                        id="purchased-with-carousel"
                        className="!m-0 list-none !px-4 @md:!px-12 py-4 gap-4 grid grid-flow-col auto-cols-max snap-x snap-mandatory"
                    >
                        {Array.from({ length: LOOP_COPIES }, (_, cycleIndex) => (
                            <React.Fragment key={cycleIndex}>
                                {purchasedWith.map((product, productIndex) => {
                                    const { name, description, logo } = product
                                    return (
                                        <li
                                            key={`${cycleIndex}-${name}`}
                                            data-carousel-cycle-start={productIndex === 0 ? '' : undefined}
                                            aria-hidden={cycleIndex !== LOOP_MIDDLE_INDEX}
                                            className="w-72 @xl:w-80 shrink-0 snap-start rounded-lg border border-primary bg-primary/80 p-4 shadow-sm backdrop-blur-sm"
                                        >
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="size-8 relative">
                                                    <img
                                                        className="inset-0 absolute object-contain"
                                                        src={logo}
                                                        alt={`${name} logo`}
                                                    />
                                                </div>
                                                <h5 className="m-0">{name}</h5>
                                            </div>
                                            <p className="m-0 text-[15px] text-secondary leading-tight">
                                                {description}
                                            </p>
                                        </li>
                                    )
                                })}
                            </React.Fragment>
                        ))}
                    </ul>
                </ScrollArea>

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-accent/95 via-accent/70 to-accent/0"
                />
                <button
                    type="button"
                    aria-label="Previous products"
                    aria-controls="purchased-with-carousel"
                    onClick={() => scrollByCard(-1)}
                    className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-primary bg-primary/80 p-2 shadow-md backdrop-blur-md transition hover:-translate-y-[calc(50%+1px)] active:-translate-y-1/2"
                >
                    <IconArrowLeft className="size-5" />
                </button>

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-accent/95 via-accent/70 to-accent/0"
                />
                <button
                    type="button"
                    aria-label="Next products"
                    aria-controls="purchased-with-carousel"
                    onClick={() => scrollByCard(1)}
                    className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-primary bg-primary/80 p-2 shadow-md backdrop-blur-md transition hover:-translate-y-[calc(50%+1px)] active:-translate-y-1/2"
                >
                    <IconArrowRight className="size-5" />
                </button>
            </div>
        </section>
    )
}
