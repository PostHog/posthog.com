import React from 'react'
import type { GlowColor } from 'components/Glow'

/**
 * A single entry in a product's `productMenu` (or `pricingMenu`). Defined on
 * the product data (e.g. `src/hooks/productData/session_replay.tsx`) and
 * consumed by `ProductReaderView` + `ProductNav`.
 *
 * `slug` is the anchor id used for in-page and cross-page navigation, and
 * doubles as the lookup key when rendering content (unless an explicit
 * `template` is provided).
 *
 * `template` is the key into the template registry that renders this section.
 * If omitted, it defaults to `slug` — so `{ slug: 'overview', name: 'Overview' }`
 * renders with the `overview` template.
 */
export interface ProductNavItem {
    slug: string
    name: string
    /**
     * Lookup key into the shared template registry. Used when `component` is
     * not provided (e.g. for hook-driven menus). Defaults to `slug`.
     */
    template?: string
    /**
     * Direct component reference rendered for this section. When provided,
     * takes precedence over the template registry lookup. Pages typically use
     * this so the menu and rendering live in one place.
     */
    component?: React.ComponentType<SectionComponentProps & Record<string, any>>
    /**
     * Optional per-section props passed through to the rendered component.
     * Useful for slot-specific data (e.g. `props: { slides: [...] }` for
     * carousel sections).
     */
    props?: Record<string, unknown>
    icon?: React.ReactNode
    /**
     * Consecutive items sharing the same `group` value are wrapped together in
     * a styled container by `ProductReaderView` (e.g. `'divided'` renders them
     * inside a `divide-y` panel with even vertical padding). Items without a
     * `group` render as standalone siblings.
     */
    group?: string
    /**
     * When true, the section is still rendered on the page but excluded from
     * the sidebar nav. Useful for legacy/in-progress sections that should be
     * visible during migration but not surfaced as anchors.
     */
    hideFromNav?: boolean
}

/**
 * Resolves a `ProductNavItem` to the template key that should render it,
 * falling back to the slug.
 */
export const resolveTemplate = (item: ProductNavItem): string => item.template || item.slug

export interface SectionComponentProps {
    /** HTML id applied to the `<section>` element; comes from the menu item's slug. */
    id: string
    productData: any
    customers: any[]
    customerSlugs: string[]
    hasCaseStudy: (slug: string) => boolean
    allProducts: any[]
}

/**
 * Tab-strip color tokens for a carousel slide. Same shape `TabbedCarouselTab`
 * already expects for `color` / `activeText` / `progressBar`.
 */
export interface CarouselSlideStyle {
    /** Tailwind background class for the active tab (and the slide frame when `showActiveBg`). */
    color: string
    /** Tailwind text color for the active tab. */
    activeText: string
    /** Tailwind background class for the active tab's progress bar. */
    progressBar: string
}

/**
 * Inline image config used by `CarouselSlide`. Provide this OR the string
 * shorthand (a key into `productData.screenshots`) on the slide's `image`.
 *
 * Three usage modes:
 *
 * - Direct URLs: `{ src, srcDark? }` — fully self-contained, no catalog reference.
 * - Catalog ref: `{ ref: 'filters' }` — pulls src/srcDark/alt from `productData.screenshots[ref]`.
 * - Catalog ref + overrides: `{ ref: 'filters', maxWidth: 'max-w-none', imgClassName: 'border-0' }`
 *   — keeps the catalog as the single source of truth for the screenshot URLs while letting this
 *   particular slide override styling. Overrides on this object win over the catalog entry.
 */
export interface ImageConfig {
    /** Direct URL to the light-mode image. Mutually exclusive with `ref`. */
    src?: string
    /** Optional dark-mode source. When set and the theme is dark, this is used instead of `src`. */
    srcDark?: string
    /**
     * Mobile-specific source URL. When set alongside `src`, the mobile image is shown below
     * the breakpoint defined by `srcMobileBreakpoint` (default `'2xl'`) and `src` is shown above it.
     * Only applies to the `stack` layout. Ignored when `srcMobile` is absent (single image, all sizes).
     */
    srcMobile?: string
    /** Dark-mode variant of `srcMobile`. Falls through to `srcMobile` when omitted. */
    srcMobileDark?: string
    /**
     * Container-query breakpoint at which the mobile image is swapped for the desktop image (`src`).
     * All values reference the named `reader-content` container. Defaults to `'2xl'`.
     *
     * - `'2xl'` — switch at ≥42rem container width (default)
     * - `'3xl'` — switch at ≥48rem
     * - `'4xl'` — switch at ≥56rem (use when the desktop image is very wide)
     */
    srcMobileBreakpoint?: '2xl' | '3xl' | '4xl'
    /**
     * Lookup key into `productData.screenshots`. The matching entry's `src`/`srcDark`/`alt` are
     * merged in as defaults; any other fields on this config override them. Mutually exclusive
     * with `src`.
     */
    ref?: string
    alt?: string
    /** Tailwind max-width class. Default depends on layout. */
    maxWidth?: string
    /** Image alignment within its container. Default: 'left'. */
    align?: 'left' | 'center' | 'right'
    /** Skip the default background and border of the framed wrapper in the `stack` layout. Padding is still controlled by `framePadding`. */
    frameless?: boolean
    /**
     * Replaces the default `p-4` padding on the stack image frame. Use this to set
     * responsive or directional padding independently of the background and border.
     * Pass `''` to remove all frame padding.
     */
    framePadding?: string
    /**
     * Extra classes on the wrapper div around the image. Appended after the renderer's
     * defaults so later utilities win on Tailwind's last-wins rule for utilities of the
     * same property.
     */
    containerClassName?: string
    /**
     * Extra classes on the `<img>` element itself. Same append-after-defaults behavior
     * as `containerClassName`.
     */
    imgClassName?: string
    /**
     * Float-layout only: wrap in `<Glow>`. `true` uses `productData.color`; pass a
     * specific `GlowColor` to override.
     */
    glow?: boolean | GlowColor
}

/** Bullet item for the optional bullet list inside a slide body. */
export interface SlideBullet {
    title: string
    description?: React.ReactNode | string
}

/**
 * Single carousel slide config. Combines tab-strip styling with body content.
 * Templates (`Applications`, `TopFeatures`, etc.) read arrays of these from
 * productData hook files and pass them through `<CarouselSlide>` for rendering.
 */
export type CarouselSlide = CarouselSlideStyle & {
    /** Becomes the carousel tab's `value`; used as the React key and tab anchor. */
    slug: string
    /** Tab-strip text. */
    label: React.ReactNode
    /** Tab-strip icon (imported as JSX in productData). */
    icon?: React.ReactNode
    /**
     * `stack`: image always renders below the prose, full-width within the slide.
     * `float`: at narrow container sizes the image stacks above; at `@2xl/reader-content`+
     *          it floats right and the prose wraps around it. Glow halo is opt-in via `image.glow`.
     */
    layout: 'stack' | 'float'
    /** Body content. */
    heading?: string
    description?: React.ReactNode | string
    bullets?: SlideBullet[]
    /**
     * Image reference. String resolves `productData.screenshots[key]`; object is inline.
     * Omit if the slide is prose-only.
     */
    image?: string | ImageConfig
    /** Extra classes on the slide root. Appended after defaults so `!p-0` etc. work. */
    className?: string
}
