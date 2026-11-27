import React from 'react'

/** A box in the art: x, y, width, and height, in the units of the 1000×1000 PNG, measured before the mirror. */
export type HoggieCrop = [x: number, y: number, width: number, height: number]

// The brand draws each hoggie PNG on a 1000×1000 canvas. Three are narrower (`burning-money`, `mailbox`,
// `workmaxxing`), so do not crop those.
const ART_SIZE = 1000

type BaseProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'className'> & {
    /** A bundled hoggie PNG: `import hedgehogStopPng from 'hoggies/stop.png'`. */
    src: string
    /** Flips the hoggie to face the other way. */
    mirror?: boolean
    /** Classes for the box that holds the image. Put size, position, and float classes here. */
    className?: string
}

type FullArt = {
    crop?: undefined
    /** Classes for the `<img>`. */
    imgClassName?: string
}

type CroppedArt = {
    /** Shows only this box of the art. The box is the visible image, so size it with `className`. */
    crop: HoggieCrop
    imgClassName?: never
}

export type HoggieImageProps = BaseProps & (FullArt | CroppedArt)

/** Shows a `@posthog/brand` hoggie PNG. CSS does the mirror and the crop, so no extra image files are needed. */
export default function HoggieImage({
    src,
    mirror = false,
    crop,
    className = '',
    imgClassName = '',
    alt = '',
    style,
    ...imgProps
}: HoggieImageProps): JSX.Element {
    const flip = mirror ? '-scale-x-100' : ''

    if (!crop) {
        return (
            <span className={`inline-block ${className}`}>
                <img {...imgProps} src={src} alt={alt} className={`${flip} ${imgClassName}`} style={style} />
            </span>
        )
    }

    // The box is a window with the crop's aspect ratio. The image inside is larger, and negative margins move it so the
    // crop fills the window. A margin in percent is a percent of the box width, also for `margin-top`.
    const [x, y, width, height] = crop
    // The flip turns the image around its own center, so a mirrored crop starts from the other side
    const left = mirror ? ART_SIZE - x - width : x
    return (
        <span className={`inline-block overflow-hidden ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
            <img
                {...imgProps}
                src={src}
                alt={alt}
                className={`block max-w-none ${flip}`}
                style={{
                    ...style,
                    width: `${(ART_SIZE / width) * 100}%`,
                    marginLeft: `${(-left / width) * 100}%`,
                    marginTop: `${(-y / width) * 100}%`,
                }}
            />
        </span>
    )
}
