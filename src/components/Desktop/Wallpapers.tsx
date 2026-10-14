import React, { createContext, useContext } from 'react'

/**
 * Wallpapers
 *
 * Renders every desktop scene; visibility is driven by `body[data-wallpaper]`,
 * set from localStorage in theme-init.js before React hydrates (and kept in sync
 * by App.tsx). That way the saved wallpaper paints on first frame — no flash of
 * the default scene.
 *
 * Light ↔ dark within a scene is a CSS fade via the persistent `dark` class.
 * Scene ↔ scene is an instant swap.
 */

const FADE_OPACITY = 'transition-opacity duration-700 ease-in-out'
const FADE_COLORS = 'transition-colors duration-700 ease-in-out'

export const BlurredWallpaperContext = createContext(false)

const BLURRED_IMAGE_WIDTH_PX = 32
const CLOUDINARY_UPLOAD_PATH = '/image/upload/'

const toResizedImageUrl = (url: string, widthPx: number): string =>
    url.replace(CLOUDINARY_UPLOAD_PATH, `${CLOUDINARY_UPLOAD_PATH}w_${widthPx},q_auto,f_auto/`)

const toBlurredImageUrl = (url: string): string => toResizedImageUrl(url, BLURRED_IMAGE_WIDTH_PX)

interface SceneBackgroundProps {
    url: `https://res.cloudinary.com/${string}`
    className: string
    style: React.CSSProperties
}

const SceneBackground = ({ url, className, style }: SceneBackgroundProps) => {
    const isBlurred = useContext(BlurredWallpaperContext)
    return (
        <div
            className={className}
            style={{ ...style, backgroundImage: `url('${isBlurred ? toBlurredImageUrl(url) : url}')` }}
        />
    )
}

interface SceneImageProps {
    src: `https://res.cloudinary.com/${string}`
    width: number
    height: number
    className?: string
    imgClassName?: string
}

const SceneImage = ({ src, width, height, className = '', imgClassName = '' }: SceneImageProps) => {
    const isBlurred = useContext(BlurredWallpaperContext)
    return (
        <div className={`inline-block ${className}`}>
            <img
                loading="lazy"
                src={isBlurred ? toBlurredImageUrl(src) : toResizedImageUrl(src, width)}
                alt=""
                width={width}
                height={height}
                draggable={false}
                className={imgClassName}
                style={{ aspectRatio: `${width} / ${height}` }}
            />
        </div>
    )
}

const Hogzilla = () => (
    <>
        <div
            className={`absolute inset-0 bg-[linear-gradient(268.63deg,#E3E1E4_0%,#FDFDFD_80%,#FDFDFD_100%)] opacity-100 dark:opacity-0 ${FADE_OPACITY}`}
        />
        <div
            className={`absolute inset-0 bg-[linear-gradient(180deg,#141E40_0%,#46368B_100%)] opacity-0 dark:opacity-100 ${FADE_OPACITY}`}
        />
        <SceneImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_hogzilla_359a450fb3.png"
            width={1780}
            height={868}
            className="absolute inset-0 flex items-end justify-end"
            imgClassName="w-full max-w-[1780px] h-auto z-10"
        />
    </>
)

const StartupMonopoly = () => (
    <>
        <div className={`absolute inset-0 bg-[#E7E0DA] dark:bg-[#686E88] ${FADE_COLORS}`} />
        <SceneImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_monopoly_light_6614a8a5d5.jpg"
            width={2967}
            height={1463}
            className={`absolute right-0 top-0 w-[1483.5px] h-[731.5px] max-w-full opacity-100 dark:opacity-0 ${FADE_OPACITY}`}
        />
        <SceneImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_monopoly_dark_26c85ccad8.jpg"
            width={1582}
            height={780}
            className={`absolute right-0 top-0 w-[1483.5px] h-[731.5px] max-w-full opacity-0 dark:opacity-100 ${FADE_OPACITY}`}
        />
    </>
)

const OfficeParty = () => (
    <>
        <SceneBackground
            url="https://res.cloudinary.com/dmukukwp6/image/upload/carpet_light_27d74f73b5.png"
            className="absolute inset-0 opacity-100"
            style={{
                backgroundSize: '200px 198px',
                backgroundRepeat: 'repeat',
            }}
        />
        <SceneBackground
            url="https://res.cloudinary.com/dmukukwp6/image/upload/carpet_dark_f1c9f5ce39.png"
            className={`absolute inset-0 opacity-0 dark:opacity-100 ${FADE_OPACITY}`}
            style={{
                backgroundSize: '200px 198px',
                backgroundRepeat: 'repeat',
            }}
        />
        <SceneImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/office_cc4ae8675f.png"
            width={997}
            height={858}
            className="absolute bottom-24 left-24 md:bottom-12 md:left-36 w-[498.5px] h-[429px]"
        />
    </>
)

const KeyboardGarden = () => (
    <>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDEECD] to-[#FFFEF4]" />

        <SceneBackground
            url="https://res.cloudinary.com/dmukukwp6/image/upload/9000_mobile_bg_light_95ed14e5a3.jpg"
            className={`absolute inset-0 sm:hidden opacity-100 dark:opacity-0 ${FADE_OPACITY}`}
            style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
            }}
        />
        <SceneBackground
            url="https://res.cloudinary.com/dmukukwp6/image/upload/9000_mobile_bg_dark_8a84515f2d.jpg"
            className={`absolute inset-0 sm:hidden opacity-0 dark:opacity-100 ${FADE_OPACITY}`}
            style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
            }}
        />
        <SceneBackground
            url="https://res.cloudinary.com/dmukukwp6/image/upload/9000_bg_light_07316896be.jpg"
            className={`absolute inset-0 hidden sm:block opacity-100 dark:opacity-0 ${FADE_OPACITY}`}
            style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
            }}
        />
        <SceneBackground
            url="https://res.cloudinary.com/dmukukwp6/image/upload/9000_bg_dark_9a32796f77.jpg"
            className={`absolute inset-0 hidden sm:block opacity-0 dark:opacity-100 ${FADE_OPACITY}`}
            style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
            }}
        />

        <div className="absolute grid bottom-24 md:bottom-0 -right-4 xs:right-8 md:right-0">
            <SceneImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_hedge_light_42c729131e.png"
                width={1555}
                height={1262}
                className={`col-start-1 row-start-1 opacity-100 dark:opacity-0 w-full max-w-full md:w-[777px] ${FADE_OPACITY}`}
            />
            <SceneImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/9000_hedge_dark_b36706e924.png"
                width={1555}
                height={1262}
                className={`col-start-1 row-start-1 opacity-0 dark:opacity-100 w-full max-w-full md:w-[777px] ${FADE_OPACITY}`}
            />
        </div>
    </>
)

// Visibility classes written out in full so Tailwind's JIT scanner can see them.
const SCENES: { key: string; Scene: React.FC; visible: string }[] = [
    { key: 'hogzilla', Scene: Hogzilla, visible: 'wallpaper-hogzilla:block' },
    { key: 'startup-monopoly', Scene: StartupMonopoly, visible: 'wallpaper-startup-monopoly:block' },
    { key: 'office-party', Scene: OfficeParty, visible: 'wallpaper-office-party:block' },
    { key: 'keyboard-garden', Scene: KeyboardGarden, visible: 'wallpaper-keyboard-garden:block' },
]

export interface WallpaperGlow {
    light: string
    dark: string
}

export const WALLPAPER_GLOW: Record<string, WallpaperGlow> = {
    'keyboard-garden': { light: '#53FFCB', dark: '#49BAC5' },
    hogzilla: { light: '#FF9528', dark: '#9370F0' },
    'startup-monopoly': { light: '#37B878', dark: '#96B4F0' },
    'office-party': { light: '#FF6E54', dark: '#D084F8' },
}

export const DEFAULT_WALLPAPER_GLOW: WallpaperGlow = WALLPAPER_GLOW['keyboard-garden']

export const getWallpaperGlow = (wallpaper: string): WallpaperGlow =>
    WALLPAPER_GLOW[wallpaper] ?? DEFAULT_WALLPAPER_GLOW

export default function Wallpapers(): JSX.Element {
    return (
        <div className="absolute inset-0 isolate select-none overflow-hidden pointer-events-none">
            {SCENES.map(({ key, Scene, visible }) => (
                <div key={key} className={`hidden ${visible} absolute inset-0`}>
                    <Scene />
                </div>
            ))}
        </div>
    )
}
