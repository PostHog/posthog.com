import React, { useEffect, useRef, useState } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'

/**
 * Wallpapers
 *
 * Renders the desktop OS wallpaper ("scene") behind everything. Two transitions:
 *
 * 1. Light ↔ dark within a scene (700ms fade) — pure CSS. Both light and dark
 *    layers are always rendered and stacked; the persistent `dark` class on <body>
 *    drives `dark:` opacity/color transitions.
 * 2. Scene ↔ scene (500ms horizontal push) — React-managed. The incoming scene
 *    slides in from the right while the outgoing one is pushed off to the left.
 *    Only the active scene (plus the outgoing one mid-slide) is mounted, so each
 *    visitor only loads the images for scenes they actually view.
 *
 * When `reduceMotion` (the `performanceBoost` setting) is on, transitions are
 * dropped and scenes swap instantly.
 */

const WALLPAPER_SLIDE_MS = 500

// Light/dark fade helpers — class strings are written out in full so Tailwind's
// JIT scanner can see them.
const fadeOpacity = (reduceMotion?: boolean) => (reduceMotion ? '' : 'transition-opacity duration-700 ease-in-out')
const fadeColors = (reduceMotion?: boolean) => (reduceMotion ? '' : 'transition-colors duration-700 ease-in-out')

interface SceneProps {
    reduceMotion?: boolean
}

const Hogzilla = ({ reduceMotion }: SceneProps) => (
    <>
        {/* Background gradient (light) */}
        <div
            className={`absolute inset-0 bg-[linear-gradient(268.63deg,#E3E1E4_0%,#FDFDFD_80%,#FDFDFD_100%)] opacity-100 dark:opacity-0 ${fadeOpacity(
                reduceMotion
            )}`}
        />
        {/* Background gradient (dark) */}
        <div
            className={`absolute inset-0 bg-[linear-gradient(180deg,#141E40_0%,#46368B_100%)] opacity-0 dark:opacity-100 ${fadeOpacity(
                reduceMotion
            )}`}
        />
        <CloudinaryImage
            loading="lazy"
            src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_hogzilla_359a450fb3.png"
            alt=""
            width={1780}
            height={868}
            className="absolute inset-0 flex items-end justify-end"
            imgClassName="w-full max-w-[1780px] h-auto z-10"
        />
    </>
)

const StartupMonopoly = ({ reduceMotion }: SceneProps) => (
    <>
        <div className={`absolute inset-0 bg-[#E7E0DA] dark:bg-[#686E88] ${fadeColors(reduceMotion)}`} />
        <CloudinaryImage
            loading="lazy"
            src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_monopoly_light_6614a8a5d5.jpg"
            alt=""
            width={2967}
            height={1463}
            className={`absolute right-0 top-0 w-[1483.5px] h-[731.5px] max-w-full opacity-100 dark:opacity-0 ${fadeOpacity(
                reduceMotion
            )}`}
        />
        <CloudinaryImage
            loading="lazy"
            src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_monopoly_dark_26c85ccad8.jpg"
            alt=""
            width={1582}
            height={782}
            className={`absolute right-0 top-0 w-[1483.5px] h-[731.5px] max-w-full opacity-0 dark:opacity-100 ${fadeOpacity(
                reduceMotion
            )}`}
        />
    </>
)

const OfficeParty = ({ reduceMotion }: SceneProps) => (
    <>
        <div
            className="absolute inset-0 opacity-100"
            style={{
                backgroundImage: "url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_light_27d74f73b5.png')",
                backgroundSize: '200px 198px',
                backgroundRepeat: 'repeat',
            }}
        />
        <div
            className={`absolute inset-0 opacity-0 dark:opacity-100 ${fadeOpacity(reduceMotion)}`}
            style={{
                backgroundImage: "url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_dark_f1c9f5ce39.png')",
                backgroundSize: '200px 198px',
                backgroundRepeat: 'repeat',
            }}
        />
        <CloudinaryImage
            loading="lazy"
            src="https://res.cloudinary.com/dmukukwp6/image/upload/office_cc4ae8675f.png"
            alt=""
            width={997}
            height={858}
            className="absolute bottom-24 left-24 md:bottom-12 md:left-36 w-[498.5px] h-[429px]"
        />
    </>
)

const KeyboardGarden = ({ reduceMotion }: SceneProps) => (
    <>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDEECD] to-[#FFFEF4]" />

        {/* Mobile background (light) */}
        <div
            className={`absolute inset-0 sm:hidden opacity-100 dark:opacity-0 ${fadeOpacity(reduceMotion)}`}
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dmukukwp6/image/upload/9000_mobile_bg_light_95ed14e5a3.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
            }}
        />

        {/* Mobile background (dark) */}
        <div
            className={`absolute inset-0 sm:hidden opacity-0 dark:opacity-100 ${fadeOpacity(reduceMotion)}`}
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dmukukwp6/image/upload/9000_mobile_bg_dark_8a84515f2d.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
            }}
        />

        {/* Desktop background (light) */}
        <div
            className={`absolute inset-0 hidden sm:block opacity-100 dark:opacity-0 ${fadeOpacity(reduceMotion)}`}
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dmukukwp6/image/upload/9000_bg_light_07316896be.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
            }}
        />

        {/* Desktop background (dark) */}
        <div
            className={`absolute inset-0 hidden sm:block opacity-0 dark:opacity-100 ${fadeOpacity(reduceMotion)}`}
            style={{
                backgroundImage: "url('https://res.cloudinary.com/dmukukwp6/image/upload/9000_bg_dark_9a32796f77.jpg')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
            }}
        />

        {/* Hedge scene — light/dark stacked in a single grid cell so layout sizing is preserved */}
        <div className="absolute grid bottom-24 md:bottom-0 -right-4 xs:right-8 md:right-0">
            {/* Hedge scene (light) */}
            <CloudinaryImage
                loading="lazy"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_hedge_light_42c729131e.png"
                width={1555}
                height={1262}
                className={`col-start-1 row-start-1 opacity-100 dark:opacity-0 w-full max-w-full md:w-[777px] ${fadeOpacity(
                    reduceMotion
                )}`}
                draggable={false}
            />
            {/* Hedge scene (dark) */}
            <CloudinaryImage
                loading="lazy"
                src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_hedge_dark_b36706e924.png"
                width={1555}
                height={1262}
                className={`col-start-1 row-start-1 opacity-0 dark:opacity-100 w-full max-w-full md:w-[777px] ${fadeOpacity(
                    reduceMotion
                )}`}
                draggable={false}
            />
        </div>
    </>
)

const WALLPAPER_COMPONENTS: Record<string, React.FC<SceneProps>> = {
    hogzilla: Hogzilla,
    'startup-monopoly': StartupMonopoly,
    'office-party': OfficeParty,
    'keyboard-garden': KeyboardGarden,
}

export interface WallpaperGlow {
    light: string
    dark: string
}

// Hover-glow colors for desktop GlassIcons, per wallpaper. Any wallpaper not
// listed here falls back to keyboard-garden (see getWallpaperGlow).
export const WALLPAPER_GLOW: Record<string, WallpaperGlow> = {
    'keyboard-garden': { light: '#53FFCB', dark: '#49BAC5' },
    // Fire breath (light) / night-sky purple from the dark gradient (dark)
    hogzilla: { light: '#FF9528', dark: '#9370F0' },
    // Board green (light) / cool periwinkle from the dark scene (dark)
    'startup-monopoly': { light: '#37B878', dark: '#96B4F0' },
    // Warm carpet coral (light) / party purple from the dark carpet (dark)
    'office-party': { light: '#FF6E54', dark: '#D084F8' },
}

export const DEFAULT_WALLPAPER_GLOW: WallpaperGlow = WALLPAPER_GLOW['keyboard-garden']

export const getWallpaperGlow = (wallpaper: string): WallpaperGlow =>
    WALLPAPER_GLOW[wallpaper] ?? DEFAULT_WALLPAPER_GLOW

interface WallpapersProps {
    wallpaper: string
    reduceMotion?: boolean
}

export default function Wallpapers({ wallpaper, reduceMotion }: WallpapersProps): JSX.Element {
    // Scenes currently in the DOM, in slide order: outgoing scene(s) first, the
    // active scene last (incoming scenes are appended). The incoming scene is
    // appended to the right of the active one, then `active` flips so it slides in.
    const [mounted, setMounted] = useState<string[]>([wallpaper])
    // The scene that should occupy the screen (translate-x-0). Lags `wallpaper` by
    // a frame so a freshly mounted scene slides in from the right edge.
    const [active, setActive] = useState<string>(wallpaper)

    const pruneTimeout = useRef<ReturnType<typeof setTimeout>>()
    const raf = useRef<number>()
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        clearTimeout(pruneTimeout.current)
        if (raf.current) cancelAnimationFrame(raf.current)

        if (reduceMotion) {
            setMounted([wallpaper])
            setActive(wallpaper)
            return
        }

        // Mount the incoming scene to the right (offscreen) of the current one.
        setMounted((prev) => (prev.includes(wallpaper) ? prev : [...prev, wallpaper]))

        // Next frame, flip the active scene so the push animates: the incoming
        // scene slides from the right to center, the outgoing one off to the left.
        raf.current = requestAnimationFrame(() => {
            raf.current = requestAnimationFrame(() => setActive(wallpaper))
        })

        // Once the slide is done, drop the outgoing scene(s).
        pruneTimeout.current = setTimeout(() => {
            setMounted([wallpaper])
        }, WALLPAPER_SLIDE_MS + 50)
    }, [wallpaper, reduceMotion])

    useEffect(
        () => () => {
            clearTimeout(pruneTimeout.current)
            if (raf.current) cancelAnimationFrame(raf.current)
        },
        []
    )

    return (
        <div className="fixed inset-0 -z-10 select-none overflow-hidden">
            {mounted.map((name, index) => {
                const Scene = WALLPAPER_COMPONENTS[name]
                if (!Scene) return null
                const activeIndex = mounted.indexOf(active)
                // Active = centered; scenes before it are pushed off left, scenes
                // after it wait offscreen right (incoming, before the active flip).
                const position =
                    index === activeIndex
                        ? 'translate-x-0'
                        : index < activeIndex
                        ? '-translate-x-full'
                        : 'translate-x-full'
                return (
                    <div
                        key={name}
                        className={`absolute inset-0 pointer-events-none ${
                            reduceMotion ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
                        } ${position}`}
                    >
                        <Scene reduceMotion={reduceMotion} />
                    </div>
                )
            })}
        </div>
    )
}
