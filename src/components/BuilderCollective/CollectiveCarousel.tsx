import React, { useState, useEffect } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { Link } from 'gatsby'
import { cn } from '../../utils'

const AUTOPLAY_MS = 5000

type Collective = {
    city: string
    image: string
    alt: string
    /** TODO: replace each placeholder quote below with a real one from the crew */
    quote: string
    members: { name: string; href: string }[]
    accent: string // brand token, e.g. 'bg-red'
}

// TODO: swap the placeholder `quote` strings for real quotes from each collective.
const COLLECTIVES: Collective[] = [
    {
        city: 'Córdoba (Argentina)',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cordoba_argentina_a2fd8972b1.jpg',
        alt: 'Córdoba builders',
        quote: 'We had a great 4 hours together applying agentic engineering principles',
        members: [{ name: 'Diego', href: 'https://www.linkedin.com/in/dpiloni/' }],
        accent: 'bg-red',
    },
    {
        city: 'Austin (Texas)',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/austin_texas_4368805f1b.jpeg',
        alt: 'Austin builders',
        quote: 'The ATX Builders came hungry to build and get cooking',
        members: [{ name: 'Matt', href: 'https://www.linkedin.com/in/mattkuda/' }],
        accent: 'bg-blue',
    },
    {
        city: 'Lisbon (Portugal)',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/lisbon_portugal_072bdd3613.png',
        alt: 'Lisbon builders',
        quote: 'I experienced the power of the builder group IRL',
        members: [{ name: 'Daniel', href: 'https://www.linkedin.com/in/zaltsman/' }],
        accent: 'bg-teal',
    },
]

const Members = ({ members }: { members: Collective['members'] }): JSX.Element => (
    <>
        {members.map((m, i) => (
            <React.Fragment key={m.name}>
                {i > 0 && (i === members.length - 1 ? ' & ' : ', ')}
                <Link to={m.href} className="text-white underline decoration-white/40 hover:decoration-white">
                    {m.name}
                </Link>
            </React.Fragment>
        ))}
    </>
)

export default function CollectiveCarousel(): JSX.Element {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [paused, setPaused] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slides: { perView: 1 },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    // Auto-advance on a self-contained interval so container-query resizes can't
    // stall it. Pauses while hovered or when the tab is hidden.
    useEffect(() => {
        if (!loaded || paused) return
        const id = setInterval(() => instanceRef.current?.next(), AUTOPLAY_MS)
        return () => clearInterval(id)
    }, [loaded, paused, instanceRef])

    return (
        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div ref={sliderRef} className="keen-slider overflow-hidden rounded-none md:rounded-2xl shadow-2xl">
                {COLLECTIVES.map((collective) => (
                    <div
                        key={collective.city}
                        className="keen-slider__slide relative aspect-[4/3] sm:aspect-[16/9] xl:aspect-[21/9]"
                    >
                        <img
                            src={collective.image}
                            alt={collective.alt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Darken from the bottom so the quote stays readable over any photo */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-20">
                            <span
                                className={cn(
                                    'inline-flex self-start items-center text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-4 opacity-90',
                                    collective.accent
                                )}
                            >
                                {collective.city}
                            </span>
                            <blockquote className="m-0 max-w-3xl text-white font-bold leading-tight text-xl sm:text-xl lg:text-2xl xl:text-3xl">
                                &ldquo;{collective.quote}&rdquo;
                            </blockquote>
                            <footer className="mt-5 sm:mt-7 text-white/90 text-base sm:text-lg">
                                <Members members={collective.members} /> — {collective.city}
                            </footer>
                        </div>
                    </div>
                ))}
            </div>

            {loaded && instanceRef.current && (
                <>
                    <button
                        type="button"
                        aria-label="Previous collective"
                        onClick={() => instanceRef.current?.prev()}
                        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Next collective"
                        onClick={() => instanceRef.current?.next()}
                        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                        </svg>
                    </button>

                    <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-10">
                        {COLLECTIVES.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                aria-label={`Go to slide ${idx + 1}`}
                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                className={cn(
                                    'h-2 rounded-full transition-all duration-300',
                                    currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
