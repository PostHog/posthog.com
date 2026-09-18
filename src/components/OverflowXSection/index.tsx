import React from 'react'
import { useHorizontalScrollFade } from '../../hooks/useHorizontalScrollFade'

interface OverflowXSectionProps {
    children: any
}

// Mirrors the horizontal extent + gutters of the legacy TABLE_CLASSES constant,
// but split so the negative margins live on the (relative) wrapper and the
// scroll + padding live on the inner viewport. This lets the edge fades sit at
// the true scroll edges.
const NEGATIVE_MARGIN_CLASSES = '-mx-5 lg:-mx-6 xl:-mx-12'
const VIEWPORT_CLASSES = 'min-w-full overflow-x-auto px-5 lg:px-6 xl:px-12'

export const OverflowXSection = ({ children }: OverflowXSectionProps) => {
    const { ref, showStart, showEnd } = useHorizontalScrollFade()
    const maskImage = showStart
        ? showEnd
            ? 'linear-gradient(to right, transparent, #000 2rem, #000 calc(100% - 2rem), transparent)'
            : 'linear-gradient(to right, transparent, #000 2rem)'
        : showEnd
        ? 'linear-gradient(to right, #000 calc(100% - 2rem), transparent)'
        : undefined

    return (
        <div className={`relative ${NEGATIVE_MARGIN_CLASSES}`}>
            <div ref={ref} className={VIEWPORT_CLASSES} style={{ maskImage, WebkitMaskImage: maskImage }}>
                {children}
            </div>
        </div>
    )
}
