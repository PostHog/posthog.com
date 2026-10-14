import React, { useState, useEffect } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { Link } from 'gatsby'
import { cn } from '../../utils'

const AUTOPLAY_MS = 5000

type Photo = { image: string; alt: string }

type City = {
    /** Tab label + overlay caption. */
    name: string
    /** Photos for this city's builder group. Multiple photos rotate within the tab. */
    photos: Photo[]
    /** Optional pull-quote shown over each photo. */
    quote?: string
    /** Local organizers, credited with links to their LinkedIn profiles. */
    members?: { name: string; href: string }[]
}

// One entry per city, in tab order. Add more photos to a city's `photos` array and they'll
// rotate automatically within that tab.
//
// TODO: paste the real Cloudinary URLs for Toronto, Tel Aviv, and Nakuru (and any extra photos
// for Austin / Córdoba). Any city left with an empty `photos` array renders a "photos coming
// soon" placeholder tile instead of a broken image, so it's safe to ship incrementally.
const CITIES: City[] = [
    {
        name: 'Toronto',
        photos: [
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tor_0_301d80293f.png',
                alt: 'Toronto builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tor_1_2eb783b31b.jpeg',
                alt: 'Toronto builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tor_3_a1c0d84df9.png',
                alt: 'Toronto builders',
            },

            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tor_2_4863caf00e.jpeg',
                alt: 'Toronto builders',
            },
        ],
        quote: 'TechTank TO is an inclusive space for developers, founders, designers, and students to ship',
        members: [
            { name: 'Niki', href: 'https://www.linkedin.com/in/nfereidooni/' },
            { name: 'Danny', href: 'https://www.linkedin.com/in/0916dhkim/' },
        ],
    },
    {
        name: 'Tel Aviv',
        photos: [
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tlv_0_355a700c3d.png',
                alt: 'Tel Aviv builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tlv_1_a0fc4d33fc.jpeg',
                alt: 'Tel Aviv builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tlv_2_0dc566a5b1.png',
                alt: 'Tel Aviv builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/tlv_4_a7d34fd41b.png',
                alt: 'Tel Aviv builders',
            },
        ],
        quote: 'We have a recognizable group of builders in Tel Aviv',
        members: [{ name: 'Jonathan', href: 'https://www.linkedin.com/in/jonathan-harel/' }],
    },
    {
        name: 'Austin',
        photos: [
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/austin_texas_4368805f1b.jpeg',
                alt: 'Austin builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/atx_1_38a0c9e414.jpeg',
                alt: 'Austin builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/atx_2_e80b6c4201.jpeg',
                alt: 'Austin builders',
            },
            { image: 'https://res.cloudinary.com/dmukukwp6/image/upload/atx_3_a596db1d03.png', alt: 'Austin builders' },
        ],
        quote: "The ATX Builders is a space where people can show what they're building, get feedback, and stay accountable",
        members: [{ name: 'Matt', href: 'https://www.linkedin.com/in/mattkuda/' }],
    },
    {
        name: 'Córdoba (Argentina)',
        photos: [
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cdb_0_5ffc1a1109.jpg',
                alt: 'Córdoba builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cdb_1_7dec4e131f.jpg',
                alt: 'Córdoba builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cdb_2_6be5644cac.jpg',
                alt: 'Córdoba builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cdb_3_6209b6d8ea.jpg',
                alt: 'Córdoba builders',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cdb_4_7efb1f11ac.jpg',
                alt: 'Córdoba builders',
            },
        ],
        quote: 'In the Córdoba builder group, we alternate between coding and presentation sessions',
        members: [{ name: 'Diego', href: 'https://www.linkedin.com/in/dpiloni/' }],
    },
    {
        name: 'Nakuru (Kenya)',
        photos: [
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ken_1_5ab6afd943.jpg',
                alt: 'Build Bout Kenya',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ken_2_bf162a932b.jpeg',
                alt: 'Build Bout Kenya',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ken_3_0700448742.png',
                alt: 'Build Bout Kenya',
            },
            {
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ken_4_0e01e30beb.jpg',
                alt: 'Build Bout Kenya',
            },
        ],
        quote: 'Kenyan builders are accountable and working to progress real projects (apps, businesses, creative work)',
        members: [{ name: 'Godfrey', href: 'https://www.linkedin.com/in/godfrey-ejiofor-chidi/' }],
    },
]

const Members = ({ members }: { members: NonNullable<City['members']> }): JSX.Element => (
    <>
        {members.map((m, i) => (
            <React.Fragment key={m.name}>
                {i > 0 && (i === members.length - 1 ? ' & ' : ', ')}
                <Link
                    to={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red dark:text-yellow font-semibold"
                >
                    {m.name}
                </Link>
            </React.Fragment>
        ))}
    </>
)

const aspectClasses = 'aspect-[4/3] sm:aspect-[16/9] xl:aspect-[21/9]'

// A subtle quote caption, shared by every slide. Kept small and centered at the top so it's a
// light touch over the photo rather than blocking the image.
const Overlay = ({ city }: { city: City }): JSX.Element =>
    city.quote ? (
        <div className="absolute inset-x-0 bottom-10 flex justify-center px-4 sm:bottom-12">
            <blockquote className="m-0 max-w-md rounded-md border border-white/20 bg-black/20 px-4 py-1.5 text-center text-xs font-medium leading-snug text-white backdrop-blur-sm sm:text-sm">
                &ldquo;{city.quote}&rdquo;
            </blockquote>
        </div>
    ) : (
        <></>
    )

// Renders one city's photos. Keyed by city in the parent so keen-slider re-inits cleanly when
// the tab changes (avoids stale slide counts). Single-photo cities skip the slider chrome; empty
// cities show a neutral placeholder.
function CitySlider({ city }: { city: City }): JSX.Element {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [paused, setPaused] = useState(false)
    const multi = city.photos.length > 1
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: multi,
        slides: { perView: 1 },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    // Auto-advance on a self-contained interval so container-query resizes can't stall it.
    // Only runs when there's more than one photo. Pauses while hovered or when the tab is hidden.
    useEffect(() => {
        if (!loaded || paused || !multi) return
        const id = setInterval(() => instanceRef.current?.next(), AUTOPLAY_MS)
        return () => clearInterval(id)
    }, [loaded, paused, multi, instanceRef])

    if (city.photos.length === 0) {
        return (
            <div
                className={cn(
                    'relative flex items-center justify-center rounded-none md:rounded-2xl bg-accent',
                    aspectClasses
                )}
            >
                <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
                    {city.name} — photos coming soon
                </span>
            </div>
        )
    }

    return (
        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div ref={sliderRef} className="keen-slider overflow-hidden rounded-none md:rounded-2xl shadow-2xl">
                {city.photos.map((photo, idx) => (
                    <div key={photo.image || idx} className={cn('keen-slider__slide relative', aspectClasses)}>
                        <img
                            src={photo.image}
                            alt={photo.alt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <Overlay city={city} />
                    </div>
                ))}
            </div>

            {multi && loaded && instanceRef.current && (
                <>
                    <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={() => instanceRef.current?.prev()}
                        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        aria-label="Next photo"
                        onClick={() => instanceRef.current?.next()}
                        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                        </svg>
                    </button>

                    <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-10">
                        {city.photos.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                aria-label={`Go to photo ${idx + 1}`}
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

export default function CollectiveCarousel(): JSX.Element {
    const [active, setActive] = useState(0)
    const activeCity = CITIES[active]

    return (
        <div>
            {/* City tabs — switch which builder group's photos are shown. */}
            <div className="not-prose flex flex-wrap gap-2 mb-4">
                {CITIES.map((city, i) => (
                    <button
                        key={city.name}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={active === i}
                        className={cn(
                            'rounded-full px-3.5 py-1.5 text-sm font-semibold border transition-colors',
                            active === i
                                ? 'bg-accent border-primary text-primary'
                                : 'border-transparent text-secondary hover:bg-accent/50'
                        )}
                    >
                        {city.name}
                    </button>
                ))}
            </div>

            {/* Local organizers, credited between the tabs and the photo. */}
            {activeCity.members && (
                <p className="not-prose mb-4 text-sm text-secondary">
                    Organized by <Members members={activeCity.members} />
                </p>
            )}

            {/* Re-mount per city so keen-slider re-inits with the right slide count. */}
            <CitySlider key={activeCity.name} city={activeCity} />
        </div>
    )
}
