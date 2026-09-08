import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BuildingSection, layoutBuilding, MODULES } from './buildingStack'

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
        <div className="@container not-prose text-pretty text-primary">
            <div ref={ref} className="relative isolate mx-auto w-full max-w-6xl px-4 @xl:px-8">
                {children}
            </div>
        </div>
    )
}

/** Artwork stays out of the reading and pointer order. The copy remains real text. */
export function BuildingArt({
    section,
    className = '',
    landingRef,
}: {
    section: BuildingSection
    className?: string
    landingRef?: React.RefObject<HTMLElement>
}): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState({ width: 0, height: 0, landingLeft: 0 })
    useEffect(() => {
        const node = ref.current
        if (!node) return
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect
            const landingLeft = landingRef?.current
                ? node.getBoundingClientRect().left - landingRef.current.getBoundingClientRect().left
                : 0
            setSize((previous) =>
                previous.width === width && previous.height === height && previous.landingLeft === landingLeft
                    ? previous
                    : { width, height, landingLeft }
            )
        })
        observer.observe(node)
        return () => observer.disconnect()
    }, [landingRef])
    const stack = layoutBuilding(section, size.width, size.height)
    const base = stack?.modules[stack.modules.length - 1]
    return (
        <div
            ref={ref}
            aria-hidden="true"
            data-building-stack={section}
            className={`pointer-events-none relative col-start-2 row-start-1 hidden min-h-0 self-stretch @3xl:block ${className}`}
        >
            {base &&
                landingRef?.current &&
                createPortal(
                    <div
                        aria-hidden="true"
                        data-building-shadow={section}
                        className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden rounded-md @3xl:block"
                    >
                        <svg
                            viewBox="0 0 100 20"
                            preserveAspectRatio="none"
                            className="absolute top-0 overflow-visible opacity-25 dark:opacity-40"
                            style={{
                                left: size.landingLeft + base.left,
                                width: base.width,
                                height: base.width * 0.2,
                                filter: `blur(${base.width * 0.025}px)`,
                            }}
                        >
                            <path d="M0 -5H100L50 14Z" fill="black" />
                        </svg>
                    </div>,
                    landingRef.current
                )}
            {section === 'top' && (
                <SkyArt src={cloud1} speed="0.05" className="absolute -right-3 top-[14%] z-0 w-12 dark:w-6" />
            )}
            {stack?.modules.map((module, index) => (
                <ThemedArt
                    key={`${module.name}-${index}`}
                    src={SOURCES[module.name]}
                    darkSrc={DARK_SOURCES[module.name]}
                    alt=""
                    data-building-module={module.name}
                    data-base-y={MODULES[module.name].baseY / MODULES[module.name].height}
                    width={MODULES[module.name].width}
                    height={MODULES[module.name].height}
                    className="absolute max-w-none drop-shadow-lg"
                    style={{
                        top: module.top,
                        left: module.left,
                        width: module.width,
                        height: module.height,
                        zIndex: index + 10,
                    }}
                />
            ))}
            {section === 'bottom' && stack && (
                <ThemedArt
                    src={hedgehog}
                    darkSrc={darkHedgehog}
                    className="absolute z-50 max-w-none"
                    style={stack.hog}
                />
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
