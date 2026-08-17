import React, { useState } from 'react'
import { ICON_SETS, useIconSet, setIconSet, iconSetImage, iconSetMetrics } from 'components/OSIcons/iconSets'

/**
 * TEMPORARY — floating overlay to flip between candidate desktop icon sets.
 *
 * Built to be thrown away: it owns no shared state, touches no context, and is mounted
 * from one line in `components/Desktop/index.tsx`. Delete this file, that line, and
 * `OSIcons/iconSets.ts` + `OSIcons/RenderedIcon.tsx` once a set is chosen.
 *
 * Each row previews the set's own `home` icon so the styles can be compared without
 * cycling through all four.
 */

/** Thumbnail box size. The art is previewed at its tuned per-set size inside this box. */
const THUMB_BOX = 40

export default function IconSetSwitcher() {
    const activeSet = useIconSet()
    const [open, setOpen] = useState(true)

    if (!open) {
        return (
            <button
                data-scheme="primary"
                onClick={() => setOpen(true)}
                className="fixed bottom-4 right-4 z-[9999] px-2 py-1 rounded border border-primary bg-primary text-primary text-xs font-medium hover:bg-accent"
            >
                Icon set: {activeSet.label}
            </button>
        )
    }

    return (
        <div
            data-scheme="primary"
            className="fixed bottom-4 right-4 z-[9999] w-56 rounded border border-primary bg-primary shadow-lg"
        >
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-primary">
                <span className="text-xs font-semibold text-primary">Icon set</span>
                <button
                    onClick={() => setOpen(false)}
                    aria-label="Hide icon set switcher"
                    className="text-xs text-secondary hover:text-primary px-1 leading-none"
                >
                    &times;
                </button>
            </div>

            <ul className="list-none m-0 p-1 space-y-px">
                {ICON_SETS.map((set) => {
                    const isActive = set.key === activeSet.key
                    // Same crop the desktop uses, so a row previews the real cropped icon.
                    const { imageSize, boxWidth, boxHeight, offsetTop } = iconSetMetrics(set)
                    return (
                        <li key={set.key}>
                            <button
                                onClick={() => setIconSet(set.key)}
                                aria-pressed={isActive}
                                className={`w-full flex items-center gap-2 p-1 rounded text-left border ${
                                    isActive ? 'bg-accent border-primary' : 'border-transparent hover:bg-accent'
                                }`}
                            >
                                {/*
                                    The cropped box can be wider than THUMB_BOX (the canvas keeps
                                    its side padding), so center and clip — only transparent margin
                                    is cut, never artwork.
                                */}
                                <span
                                    className="flex-shrink-0 flex items-center justify-center overflow-hidden"
                                    style={{ width: THUMB_BOX, height: THUMB_BOX }}
                                >
                                    <span
                                        className="relative block flex-shrink-0"
                                        style={{ width: boxWidth, height: boxHeight }}
                                    >
                                        <img
                                            src={iconSetImage(set.key, 'home')}
                                            alt=""
                                            width={imageSize}
                                            height={imageSize}
                                            className="absolute left-0 block max-w-none"
                                            style={{ width: imageSize, height: imageSize, top: offsetTop }}
                                        />
                                    </span>
                                </span>
                                <span className="min-w-0">
                                    <span className="block text-xs font-medium text-primary leading-tight">
                                        {set.label}
                                    </span>
                                    <span className="block text-[11px] text-secondary leading-tight">{set.note}</span>
                                </span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
