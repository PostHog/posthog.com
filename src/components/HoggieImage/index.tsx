import React from 'react'

/** x, y, width, height in the 1000×1000 hoggie art, measured before any mirror. */
export type HoggieCrop = [x: number, y: number, width: number, height: number]

const HOGGIE_SIZE = 1000

export interface HoggieImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** A bundled hoggie PNG: `import hedgehogStopPng from 'hoggies/stop.png'`. */
    src: string
    /** Flips the hoggie to face the other way. */
    mirror?: boolean
    /** Shows only this box of the art. */
    crop?: HoggieCrop
    /** Classes for the wrapper. With `crop`, the wrapper is the visible image, so size it here. */
    className?: string
    /** Classes for the `<img>`. */
    imgClassName?: string
}

/** Renders a `@posthog/brand` hoggie PNG, with an optional mirror and crop done in CSS. */
export default function HoggieImage({
    src,
    mirror = false,
    crop,
    className = '',
    imgClassName = '',
    style,
    ...other
}: HoggieImageProps): JSX.Element {
    const mirrorClass = mirror ? '-scale-x-100' : ''

    if (!crop) {
        return (
            <div className={`inline-block ${className}`}>
                <img src={src} className={`${mirrorClass} ${imgClassName}`} style={style} {...other} />
            </div>
        )
    }

    const [x, y, width, height] = crop
    // The image flips around its own center, so a mirrored crop starts from the other side
    const left = mirror ? HOGGIE_SIZE - x - width : x
    return (
        // The crop window is the visible image, so it takes the image classes too
        <div
            className={`inline-block relative overflow-hidden ${className} ${imgClassName}`}
            style={{ aspectRatio: `${width} / ${height}` }}
        >
            <img
                src={src}
                className={`absolute max-w-none ${mirrorClass}`}
                style={{
                    width: `${(HOGGIE_SIZE / width) * 100}%`,
                    left: `${(-left / width) * 100}%`,
                    top: `${(-y / height) * 100}%`,
                    ...style,
                }}
                {...other}
            />
        </div>
    )
}
