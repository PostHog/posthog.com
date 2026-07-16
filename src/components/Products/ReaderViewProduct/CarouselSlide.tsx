import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import { useApp } from '../../../context/App'
import type { CarouselSlide as CarouselSlideType, ImageConfig } from './types'

/**
 * Default padding shared by both layouts. Sits on the prose container in `stack`
 * mode and on the slide root in `float` mode (so the floating image picks it up too).
 * Override per-slide via `slide.className` (e.g. `'p-0'` for full-bleed slides).
 */
const SLIDE_PADDING = '@container p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10'

const FRAME_BG = 'bg-tan dark:bg-dark'
const FRAME_PADDING = 'p-4'
const FRAME_BORDER = 'border-t border-primary'
const STACK_IMAGE_DEFAULTS = 'h-auto border border-secondary rounded-md'

const ALIGN_MAP: Record<NonNullable<ImageConfig['align']>, string> = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
}

/**
 * Resolve a slide's `image` reference into a concrete `ImageConfig`:
 *
 * - String shorthand `image: 'filters'` looks up `productData.screenshots.filters`.
 * - Object with `ref`: merges `productData.screenshots[ref]` as the base, then overlays
 *   any other fields on the object so this slide can override styling without losing the
 *   catalog reference.
 * - Object with direct `src`/`srcDark`: returned as-is.
 */
const resolveImage = (image: string | ImageConfig | undefined, productData: any): ImageConfig | null => {
    if (!image) return null
    if (typeof image === 'string') return productData?.screenshots?.[image] ?? null
    if (image.ref) {
        const base = productData?.screenshots?.[image.ref]
        if (!base) return null
        // Drop `ref` itself from the spread so it doesn't end up on the resolved object.
        const { ref: _ref, ...overrides } = image
        return { ...base, ...overrides }
    }
    return image
}

/** Pick the appropriate src based on the active theme. Falls back to `src` when no `srcDark` exists. */
const pickSrc = (img: ImageConfig, isDark: boolean) => (isDark && img.srcDark ? img.srcDark : (img.src as string))

/** Tailwind classes for hiding the mobile image and showing the desktop image at each breakpoint. */
const MOBILE_BREAKPOINT: Record<
    NonNullable<ImageConfig['srcMobileBreakpoint']>,
    { mobileHide: string; desktopShow: string }
> = {
    '2xl': { mobileHide: '@2xl/reader-content:hidden', desktopShow: 'hidden @2xl/reader-content:block' },
    '3xl': { mobileHide: '@3xl/reader-content:hidden', desktopShow: 'hidden @3xl/reader-content:block' },
    '4xl': { mobileHide: '@4xl/reader-content:hidden', desktopShow: 'hidden @4xl/reader-content:block' },
}

const SlideBullets = ({ bullets }: { bullets?: { title: string; description?: React.ReactNode | string }[] }) => {
    if (!bullets || bullets.length === 0) return null
    return (
        <ul className="space-y-4 mb-4">
            {bullets.map((b, i) => (
                <li key={i}>
                    <strong>{b.title}</strong> {b.description}
                </li>
            ))}
        </ul>
    )
}

const Description = ({ description }: { description?: React.ReactNode | string }) => {
    if (description == null) return null
    if (typeof description === 'string') return <p>{description}</p>
    return <>{description}</>
}

interface CarouselSlideProps {
    slide: CarouselSlideType
    productData: any
}

/**
 * Renders the body of a `TabbedCarousel` tab from a `CarouselSlide` config.
 *
 * Two layouts are supported:
 *
 * - `stack`: heading + prose + bullets above; image (if any) sits in a framed wrapper
 *   below at full slide width. Image framing defaults to `bg-tan dark:bg-dark p-4
 *   border-t border-primary` with the inner img bordered + rounded. Set
 *   `image.frameless: true` for full-bleed images.
 *
 * - `float`: at narrow container sizes the image stacks above the prose; at
 *   `@2xl/reader-content`+ it floats right and the prose flows around it. Glow halo
 *   is opt-in via `image.glow: true | GlowColor`.
 *
 * All defaults are overridable via `slide.className`, `image.containerClassName`,
 * and `image.imgClassName`.
 */
export default function CarouselSlide({ slide, productData }: CarouselSlideProps) {
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const image = resolveImage(slide.image, productData)

    if (slide.layout === 'stack') {
        const bp = image?.srcMobile ? MOBILE_BREAKPOINT[image.srcMobileBreakpoint ?? '2xl'] : null
        const imgDefaults = `${image?.frameless ? 'h-auto' : STACK_IMAGE_DEFAULTS}${
            image?.imgClassName ? ` ${image.imgClassName}` : ''
        }`
        const desktopClass = `w-full ${image?.maxWidth ?? '@2xl/reader-content:max-w-3xl'} ${
            ALIGN_MAP[image?.align ?? 'left']
        }`

        return (
            <div className={`text-base text-primary/90${slide.className ? ` ${slide.className}` : ''}`}>
                <div className={SLIDE_PADDING}>
                    {slide.heading && <h3 className="mb-2 pr-8">{slide.heading}</h3>}
                    <Description description={slide.description} />
                    <SlideBullets bullets={slide.bullets} />
                </div>
                {image && (
                    <div
                        className={[
                            image.frameless ? '' : FRAME_BG,
                            image.frameless ? image.framePadding ?? '' : image.framePadding ?? FRAME_PADDING,
                            image.frameless ? '' : FRAME_BORDER,
                            image.containerClassName ?? '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >
                        {bp && (
                            <CloudinaryImage
                                src={
                                    (isDark && image.srcMobileDark
                                        ? image.srcMobileDark
                                        : image.srcMobile) as `https://res.cloudinary.com/${string}`
                                }
                                alt={image.alt || productData?.name}
                                className={`w-full ${bp.mobileHide}`}
                                imgClassName={imgDefaults}
                            />
                        )}
                        <CloudinaryImage
                            src={pickSrc(image, isDark) as `https://res.cloudinary.com/${string}`}
                            alt={image.alt || productData?.name}
                            className={bp ? `${desktopClass} ${bp.desktopShow}` : desktopClass}
                            imgClassName={imgDefaults}
                        />
                    </div>
                )}
            </div>
        )
    }

    // 'float' layout
    // Glow is keyed off the inline image config (string-shorthand images can't carry glow);
    // resolved color falls back to the product's own brand color.
    const inlineImage = typeof slide.image === 'object' ? slide.image : null
    const showGlow = !!inlineImage?.glow
    const glowColor = typeof inlineImage?.glow === 'string' ? inlineImage.glow : productData?.color

    return (
        <div className={`${SLIDE_PADDING}${slide.className ? ` ${slide.className}` : ''}`}>
            {image && (
                <div
                    className={`${
                        image.maxWidth ?? 'max-w-md @2xl:max-w-sm @3xl:max-w-md'
                    } @2xl:float-right transition-all leading-[0] mb-4 @2xl:mb-0 @2xl:ml-4 @3xl:ml-8 @4xl/reader-content:ml-10${
                        image.containerClassName ? ` ${image.containerClassName}` : ''
                    }`}
                >
                    {showGlow ? (
                        <Glow color={glowColor} intensity="soft" className="rounded border border-secondary">
                            <CloudinaryImage
                                src={pickSrc(image, isDark) as `https://res.cloudinary.com/${string}`}
                                alt={image.alt || productData?.name}
                                className="w-full"
                                imgClassName={`h-auto${image.imgClassName ? ` ${image.imgClassName}` : ''}`}
                            />
                        </Glow>
                    ) : (
                        <CloudinaryImage
                            src={pickSrc(image, isDark) as `https://res.cloudinary.com/${string}`}
                            alt={image.alt || productData?.name}
                            className="w-full rounded border border-secondary"
                            imgClassName={`h-auto${image.imgClassName ? ` ${image.imgClassName}` : ''}`}
                        />
                    )}
                </div>
            )}
            <div className="text-base text-primary/90">
                {slide.heading && <h3 className="mb-4">{slide.heading}</h3>}
                <Description description={slide.description} />
                <SlideBullets bullets={slide.bullets} />
            </div>
        </div>
    )
}
