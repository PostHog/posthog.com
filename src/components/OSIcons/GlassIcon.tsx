import React, { useId } from 'react'

/** One sub-shape of a glyph. Multi-segment glyphs (e.g. the PostHog hedgehog) pass an array. */
export type GlyphPart = { d: string; fillRule?: 'nonzero' | 'evenodd' }

export interface GlassIconProps {
    /**
     * Glyph shape. A single fill `d` string, or — for glyphs made of multiple
     * overlapping segments (e.g. a logo) — an array of `{ d, fillRule }` parts.
     * Author in the 36-unit design canvas (or pass a matching `viewBox`).
     */
    path: string | GlyphPart[]
    /** SVG viewBox (defaults to the 36×36 design canvas) */
    viewBox?: string
    /** Fill rule for the glyph when `path` is a string (use `evenodd` for cut-out holes) */
    fillRule?: 'nonzero' | 'evenodd'
    /** Optional externally-hosted image rendered inside the silhouette (clipped to it) */
    image?: string
    /** Glass frost opacity over the shape (and over `image` when present). Default 0.5. */
    fillOpacity?: number
    /** Backdrop blur radius in px. Default 1.3 (≈ the export's blur at 36px). */
    blur?: number
    /** Hover glow color in light mode (CSS color string) */
    glowColor?: string
    /** Hover glow color in dark mode (CSS color string) */
    glowColorDark?: string
    /** Additional className for the wrapper (size lives here — default `size-9` / 36px) */
    className?: string
    /** Arbitrary SVG content clipped into the silhouette (rendered under the glass fill) */
    children?: React.ReactNode
}

/**
 * Frosted-glass desktop icon. Faithfully reproduces the two-layer Figma export as
 * two stacked copies of the same glyph:
 *
 *   - Layer A (bottom): backdrop-blur frost + white fill @ `fillOpacity` + a thin
 *     soft white edge aligned just OUTSIDE the shape, with two knockout drop shadows.
 *   - Layer B (top): a thin bright white highlight aligned just INSIDE the edge, with
 *     no shadow (its shadow would read as an unwanted inner shadow at this size).
 *
 * Stroke + shadow are CONSTANT in the 36-unit design canvas (the export uses
 * stroke-width 0.5, shadow dy 1, blurs 1 & 0.5), so author every glyph at that scale.
 * Stroke alignment uses SVG masks off a double-width stroke (each mask keeps one half).
 *
 * Multi-segment glyphs (an array of parts) are flattened into ONE shape: a single
 * union fill + a single drop shadow around the whole outer silhouette, with each
 * segment's bevel drawn by per-segment masked strokes. Overlapping segments (the
 * hedgehog spines) are separated by crisp light bevels, NOT by per-segment shadows
 * (those would stack into dark grooves and break the single-glyph read). Each part
 * keeps its own `fillRule`, so `nonzero` spines coexist with an `evenodd` cut-out
 * (the hedgehog's eye).
 *
 * The frost is a plain HTML element (NOT an SVG `<foreignObject>`, where browsers
 * refuse to render `backdrop-filter`) clipped to the silhouette via an
 * objectBoundingBox clipPath. The drop shadows use the export's
 * `feComposite operator="out"` knockout so they don't bleed through the translucent
 * fill and darken the frosted interior.
 *
 * Hover (driven by the `group` on the parent AppLink) gives a subtle zoom pop.
 */
export default function GlassIcon({
    path,
    viewBox = '0 0 36 36',
    fillRule = 'nonzero',
    image,
    fillOpacity = 0.5,
    blur = 1.3,
    glowColor = '#53FFCB',
    glowColorDark = '#49BAC5',
    className = '',
    children,
}: GlassIconProps) {
    const id = useId().replace(/:/g, '')
    const frostClipId = `${id}-frost`
    const shapeClipId = `${id}-shape`
    const shadowId = `${id}-shadow`

    const parts: GlyphPart[] = typeof path === 'string' ? [{ d: path, fillRule }] : path

    const [vbX, vbY, vbW, vbH] = viewBox.split(/\s+/).map(Number)
    // Longest viewBox side — drives the aspect-preserving frost mapping below.
    const M = Math.max(vbW, vbH)

    // Constant in the 36-unit design canvas (export: stroke 0.5, shadow dy 1,
    // blurs 1 & 0.5). strokeW is doubled because each mask keeps one half.
    const strokeW = 1
    const shOffset = 1
    const shBlur1 = 1
    const shBlur2 = 0.5

    const mX = vbX - 2
    const mY = vbY - 2
    const mW = vbW + 4
    const mH = vbH + 4

    return (
        <span className={`relative inline-flex items-center justify-center size-9 ${className}`}>
            {/* Soft glow behind the shape, revealed on hover (slow fade in). Light/dark colors are
                stacked and toggled by the `dark` class so the glow matches the active wallpaper. The
                light span is suppressed in dark mode by the higher-specificity `dark:group-hover:opacity-0`. */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-1 rounded-[40%] blur-md opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-60 dark:group-hover:opacity-0"
                style={{ backgroundColor: glowColor }}
            />
            <span
                aria-hidden
                className="pointer-events-none absolute inset-1 rounded-[40%] blur-md opacity-0 transition-opacity duration-700 ease-out dark:group-hover:opacity-60"
                style={{ backgroundColor: glowColorDark }}
            />

            {/* Layer A frost: real backdrop blur, clipped to the silhouette. Hidden until
                hover so the expensive backdrop-filter doesn't tank idle perf. */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden group-hover:block scale-[1.03]"
                style={{
                    backdropFilter: `blur(${blur}px)`,
                    WebkitBackdropFilter: `blur(${blur}px)`,
                    clipPath: `url(#${frostClipId})`,
                }}
            />

            <svg
                viewBox={viewBox}
                fill="none"
                // Default preserveAspectRatio (xMidYMid meet) keeps non-square glyphs
                // undistorted; the frost clip below uses the same aspect-preserving mapping.
                className="relative block size-full overflow-visible transition-transform duration-200 ease-out group-hover:scale-[1.03]"
            >
                <defs>
                    {/* Normalized clip (0–1) for the HTML frost div. Maps the glyph into the
                        box exactly like the SVG's "meet" — scale by 1/M, centered. */}
                    <clipPath id={frostClipId} clipPathUnits="objectBoundingBox">
                        {parts.map((p, i) => (
                            <path
                                key={i}
                                d={p.d}
                                fillRule={p.fillRule}
                                transform={`translate(${0.5 - (vbX + vbW / 2) / M} ${
                                    0.5 - (vbY + vbH / 2) / M
                                }) scale(${1 / M})`}
                            />
                        ))}
                    </clipPath>

                    {/* Per-segment bevel masks (off a double-width stroke, each keeps one half):
                        `mo${i}` keeps the soft OUTER edge of segment i (white rect minus that
                        segment), `mi${i}` keeps the bright INNER highlight (segment i in white).
                        Per-segment — not unioned — so each stacked layer is beveled (and casts its
                        shadow) independently, giving the inter-segment depth Figma shows. */}
                    {parts.map((p, i) => (
                        <React.Fragment key={i}>
                            <mask id={`${id}-mo${i}`} maskUnits="userSpaceOnUse" x={mX} y={mY} width={mW} height={mH}>
                                <rect x={mX} y={mY} width={mW} height={mH} fill="white" />
                                <path d={p.d} fill="black" fillRule={p.fillRule} />
                            </mask>
                            <mask id={`${id}-mi${i}`} maskUnits="userSpaceOnUse" x={mX} y={mY} width={mW} height={mH}>
                                <path d={p.d} fill="white" fillRule={p.fillRule} />
                            </mask>
                        </React.Fragment>
                    ))}

                    {/* User-space clip for the optional embedded image */}
                    <clipPath id={shapeClipId}>
                        {parts.map((p, i) => (
                            <path key={i} d={p.d} fillRule={p.fillRule} />
                        ))}
                    </clipPath>

                    {/* Two stacked dark-green (#033003) drop shadows, faithfully reproduced from
                        the export. The `feComposite operator="out"` knockout removes each shadow
                        from BEHIND the shape, so it only shows outside the silhouette — without it
                        the shadow bleeds through the translucent fill and darkens the frosted
                        interior. */}
                    <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        {/* shadow 1 — dark green #033003 @ 1 */}
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={shOffset} />
                        <feGaussianBlur stdDeviation={shBlur1} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.0117647 0 0 0 0 0.188235 0 0 0 0 0.0117647 0 0 0 1 0"
                        />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="shadow1" />
                        {/* shadow 2 — dark green #033003 @ 0.25 */}
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dy={shOffset} />
                        <feGaussianBlur stdDeviation={shBlur2} />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.0117647 0 0 0 0 0.188235 0 0 0 0 0.0117647 0 0 0 0.25 0"
                        />
                        <feBlend mode="normal" in2="shadow1" result="shadow2" />
                        {/* source composited on top of both shadows */}
                        <feBlend mode="normal" in="SourceGraphic" in2="shadow2" result="shape" />
                    </filter>
                </defs>

                {/* Optional embedded image and arbitrary content, clipped to the shape */}
                {(image || children) && (
                    <g clipPath={`url(#${shapeClipId})`}>
                        {image && (
                            <image
                                href={image}
                                x={vbX}
                                y={vbY}
                                width={vbW}
                                height={vbH}
                                preserveAspectRatio="xMidYMid slice"
                            />
                        )}
                        {children}
                    </g>
                )}

                {/* Layer A: a single union fill + outside-aligned soft white edges, with ONE drop
                    shadow around the whole outer silhouette. The fill is grouped under one opacity
                    so overlapping segments don't double-up, and the strokes use PER-SEGMENT masks so
                    each segment keeps its own bevel. For a multi-segment glyph (the hedgehog spines)
                    that means the segments are separated by crisp light bevels — NOT by per-segment
                    shadows, which would stack into dark grooves and break the single-glyph read. */}
                <g filter={`url(#${shadowId})`}>
                    <g opacity={fillOpacity}>
                        {parts.map((p, i) => (
                            <path key={i} d={p.d} fill="white" fillRule={p.fillRule} />
                        ))}
                    </g>
                    {parts.map((p, i) => (
                        <path
                            key={i}
                            d={p.d}
                            fill="none"
                            stroke="white"
                            strokeOpacity={0.55}
                            strokeWidth={strokeW}
                            mask={`url(#${id}-mo${i})`}
                        />
                    ))}
                </g>

                {/* Layer B: inside-aligned white highlights. No drop shadow — the export gives this
                    layer one too, but its shadow falls just inside the edge and reads as an unwanted
                    inner shadow at this size. The outer lift comes from Layer A. */}
                <g>
                    {parts.map((p, i) => (
                        <path
                            key={i}
                            d={p.d}
                            fill="none"
                            stroke="white"
                            strokeWidth={strokeW}
                            mask={`url(#${id}-mi${i})`}
                        />
                    ))}
                </g>
            </svg>
        </span>
    )
}
