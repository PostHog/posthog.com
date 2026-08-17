import React from 'react'
import { useIconSet, iconSetImage, iconSetMetrics } from './iconSets'

/**
 * TEMPORARY — desktop icon preview: a baked render instead of a frosted-glass glyph.
 *
 * The artwork ships as square transparent PNGs served from `static/desktop-icons/`,
 * one folder per candidate set (see `iconSets.ts`). The active set comes from the
 * IconSetSwitcher overlay, so every icon swaps at once.
 *
 * Each set carries a different amount of built-in padding, so the rendered box size is
 * per-set (tuned in `iconSets.ts`) to keep the visible artwork at a consistent weight.
 * The image then overflows a shorter layout box — `iconSetMetrics` crops the set's
 * transparent top/bottom margin out of flow — so the caption sits tight under the
 * artwork rather than under the empty canvas below it.
 * Matches the glyph icons' hover pop (`group-hover:scale-[1.03]`).
 *
 * Once a set is picked: drop the switcher, hard-code the winning folder, and move the
 * files to Cloudinary by pointing `iconSetImage` at the Cloudinary path.
 */

interface RenderedIconProps {
    /** File name without extension, e.g. `home` → /desktop-icons/<set>/home.png */
    name: string
    className?: string
}

export default function RenderedIcon({ name, className = '' }: RenderedIconProps) {
    const set = useIconSet()
    const { imageSize, boxWidth, boxHeight, offsetTop } = iconSetMetrics(set)

    return (
        <span
            className={`relative inline-block transition-transform duration-200 ease-out group-hover:scale-[1.03] ${className}`}
            style={{ width: boxWidth, height: boxHeight }}
        >
            <img
                src={iconSetImage(set.key, name)}
                alt=""
                width={imageSize}
                height={imageSize}
                draggable={false}
                className="absolute left-0 block max-w-none"
                style={{ width: imageSize, height: imageSize, top: offsetTop }}
            />
        </span>
    )
}
