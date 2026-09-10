import React, { useEffect, useRef } from 'react'
import {
    BuildingSection,
    MODULES,
    STACK_FLOORS,
    OFFSETS,
    BASE_OFFSETS,
    BASE_MODULES,
    FLOOR_QUERIES,
} from './buildingStack'
import './buildingStack.css'

const SOURCES = {
    'single-story-1': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_single_story_1_11a0ee640d.svg',
    'single-story-2': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_single_story_2_ff0e6ddb4b.svg',
    'single-story-3': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_single_story_3_d4655aa781.svg',
    'double-story-1': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_double_story_1_0c55885a12.svg',
    'double-story-2': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_double_story_2_d6d0998e8a.svg',
    'double-story-3': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_double_story_3_21a278817f.svg',
}

const DARK_SOURCES: Record<keyof typeof SOURCES, string> = {
    'single-story-1': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_single_story_1_dark_f1749430db.svg',
    'single-story-2': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_single_story_2_dark_c866156d4d.svg',
    'single-story-3': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_single_story_3_dark_6633ec7772.svg',
    'double-story-1': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_double_story_1_dark_bca8f75719.svg',
    'double-story-2': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_double_story_2_dark_8637ee0d1b.svg',
    'double-story-3': 'https://res.cloudinary.com/dmukukwp6/image/upload/flat_double_story_3_dark_af5b70d807.svg',
}

const hedgehog = 'https://res.cloudinary.com/dmukukwp6/image/upload/atlas_hog_00bfae9921.svg'
const darkHedgehog = 'https://res.cloudinary.com/dmukukwp6/image/upload/atlas_hog_dark_08202dd9d6.svg'
const cloud1 = 'https://res.cloudinary.com/dmukukwp6/image/upload/cloud_1_6ec7ea72d6.svg'
const cloud2 = 'https://res.cloudinary.com/dmukukwp6/image/upload/cloud_2_553c4f548d.svg'
const star = 'https://res.cloudinary.com/dmukukwp6/image/upload/star_d5d59b3685.svg'

/** Both sources share geometry; the site's pre-paint theme class selects the image. */
function ThemedArt({
    src,
    darkSrc,
    className = '',
    ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { darkSrc: string }): JSX.Element {
    return (
        <>
            <img {...props} src={src} alt="" className={`${className} dark:hidden`} />
            <img {...props} src={darkSrc} alt="" className={`${className} hidden dark:block`} />
        </>
    )
}

/** One parallax origin stays mounted when CSS switches clouds to smaller stars. */
function SkyArt({ src, speed, className }: { src: string; speed: string; className: string }): JSX.Element {
    return (
        <div data-cloud-speed={speed} className={className}>
            <ThemedArt src={src} darkSrc={star} className="w-full" />
        </div>
    )
}

/** Follow the Editor's own scroll viewport, including when the app is resized. */
export function EnterpriseScene({ children }: { children: React.ReactNode }): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scene = ref.current
        const viewport = scene?.closest('[data-radix-scroll-area-viewport]')
        if (!scene || !viewport) return
        const clouds = Array.from(scene.querySelectorAll<HTMLElement>('[data-cloud-speed]'))
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
        let frame = 0
        const paint = () => {
            frame = 0
            if (motionPreference.matches) {
                clouds.forEach((cloud) => (cloud.style.transform = 'none'))
                return
            }
            const center = viewport.getBoundingClientRect().top + viewport.clientHeight / 2
            clouds.forEach((cloud) => {
                const parent = cloud.parentElement
                if (!parent) return
                const origin = parent.getBoundingClientRect().top + cloud.offsetTop
                const shift = Math.max(-120, Math.min(120, (center - origin) * Number(cloud.dataset.cloudSpeed)))
                cloud.style.transform = `translate3d(0, ${shift}px, 0)`
            })
        }
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(paint)
        }
        viewport.addEventListener('scroll', schedule, { passive: true })
        motionPreference.addEventListener('change', schedule)
        const observer = new ResizeObserver(schedule)
        observer.observe(viewport)
        observer.observe(scene)
        schedule()
        return () => {
            viewport.removeEventListener('scroll', schedule)
            motionPreference.removeEventListener('change', schedule)
            observer.disconnect()
            cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <div className="@container not-prose overflow-x-clip text-pretty text-primary">
            <style>{FLOOR_QUERIES}</style>
            <div
                ref={ref}
                className="enterprise-building-scene relative isolate mx-auto w-full max-w-6xl px-4 @xl:px-8"
            >
                {children}
            </div>
        </div>
    )
}

type BuildingStyle = React.CSSProperties & { [key: `--${string}`]: number | string }

/** The landing card owns its shadow, so it needs no portal or measured offset. */
export function BuildingShadow({ section }: { section: 'top' | 'middle' }): JSX.Element {
    const art = MODULES[BASE_MODULES[section]]
    return (
        <div
            aria-hidden="true"
            data-building-shadow={section}
            className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden rounded-md @3xl:block"
            style={{ '--base-offset': BASE_OFFSETS[section], '--base-x': art.baseX / art.width } as BuildingStyle}
        >
            <div className="building-shadow-column">
                <svg
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    className="building-shadow overflow-visible opacity-25 dark:opacity-40"
                >
                    <path d="M0 -5H100L50 14Z" fill="black" />
                </svg>
            </div>
        </div>
    )
}

/** All floors and both themes are present at first paint; CSS reveals extra floors. */
export function BuildingArt({
    section,
    className = '',
}: {
    section: BuildingSection
    className?: string
}): JSX.Element {
    let riseBefore = 0
    const floors = [...STACK_FLOORS[section], { name: BASE_MODULES[section], minRatio: 0 }]
    return (
        <div
            aria-hidden="true"
            data-building-stack={section}
            className={`building-stack pointer-events-none relative col-start-2 row-start-1 hidden min-h-0 self-stretch @3xl:block ${className}`}
            style={{ '--base-offset': BASE_OFFSETS[section] } as BuildingStyle}
        >
            {section === 'top' && (
                <SkyArt src={cloud1} speed="0.05" className="absolute -right-3 top-[14%] z-0 w-12 dark:w-6" />
            )}
            <div className="building-layout" data-section={section}>
                {floors.map(({ name }, index) => {
                    const art = MODULES[name]
                    const last = index === floors.length - 1
                    const offset = last ? BASE_OFFSETS[section] : OFFSETS[index % OFFSETS.length]
                    const style: BuildingStyle = {
                        '--art-ratio': art.height / art.width,
                        '--base-x': art.baseX / art.width,
                        '--offset': offset,
                        '--lift': last ? 0 : Math.abs(offset) * 0.45,
                        ...(!last && { '--index': index, '--rise-before': riseBefore }),
                    }
                    riseBefore += art.rise / art.width
                    return (
                        <div
                            key={index}
                            className="building-floor"
                            data-floor-index={last ? 'base' : index}
                            style={style}
                        >
                            <ThemedArt
                                src={SOURCES[name]}
                                darkSrc={DARK_SOURCES[name]}
                                data-building-module={name}
                                data-base-y={art.baseY / art.height}
                                width={art.width}
                                height={art.height}
                                className="h-full w-full max-w-none drop-shadow-lg"
                            />
                        </div>
                    )
                })}
            </div>
            {section === 'bottom' && (
                <ThemedArt src={hedgehog} darkSrc={darkHedgehog} className="building-hog z-50 max-w-none" />
            )}
            {section === 'top' && (
                <SkyArt src={cloud2} speed="0.035" className="absolute -left-6 top-[55%] z-40 w-10 dark:w-5" />
            )}
            {section === 'middle' && (
                <>
                    <SkyArt src={cloud1} speed="0.035" className="absolute -left-5 top-[24%] z-0 w-10 dark:w-5" />
                    <SkyArt
                        src={cloud2}
                        speed="0.09"
                        className="absolute -right-20 top-[67%] z-40 w-16 dark:-right-12 dark:w-8"
                    />
                </>
            )}
            {section === 'bottom' && (
                <SkyArt src={cloud1} speed="0.07" className="absolute -left-7 top-[24%] z-0 w-14 dark:w-7" />
            )}
            {(section === 'top' || section === 'bottom') && (
                <div
                    className={`absolute right-full z-20 mr-10 w-28 text-center text-xs italic uppercase leading-relaxed text-secondary ${
                        section === 'top' ? 'bottom-12 rotate-6' : 'bottom-5 -rotate-6'
                    }`}
                >
                    {section === 'top' ? (
                        <>
                            <svg
                                viewBox="0 0 100 70"
                                className="mb-2 ml-auto h-12 w-20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M12 64Q25 20 86 12m-9-6 10 6-7 9" />
                            </svg>
                            Go higher with PostHog
                        </>
                    ) : (
                        <>
                            Let us do the heavy lifting
                            <svg
                                viewBox="0 0 100 70"
                                className="ml-auto mt-2 h-12 w-20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M10 8Q28 56 88 56m-9-8 10 8-9 8" />
                            </svg>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
