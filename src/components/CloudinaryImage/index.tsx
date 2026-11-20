import React from 'react'
import { Image, Transformation } from 'cloudinary-react'

const isCloudinaryImage = (url: string): boolean => {
    const cloudinaryUrlPattern = new RegExp(`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}/`)
    return cloudinaryUrlPattern.test(url)
}

const getCloudinaryPublicId = (url: string): string | null => {
    const cloudinaryUrlPattern =
        /https:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/
    const match = url.match(cloudinaryUrlPattern)
    return match ? match[1] : null
}

export default function CloudinaryImage({
    src,
    width,
    className = '',
    imgClassName = '',
    placeholder,
    objectFit,
    objectPosition,
    ...other
}: {
    /** A Cloudinary URL, or a bundled image URL (an imported file). */
    src: string
    width?: number
    className?: string
    imgClassName?: string
    objectFit?: 'cover' | 'contain'
    objectPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center'
} & React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
    const isCloudinary = isCloudinaryImage(src)
    const cloudinaryPublicId = isCloudinary && getCloudinaryPublicId(src)
    const hasCommas = src?.includes(',')
    if (cloudinaryPublicId && !hasCommas) {
        return (
            <div className={`inline-block ${className}`}>
                <Image
                    {...other}
                    publicId={cloudinaryPublicId}
                    cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
                    className={imgClassName}
                    secure
                >
                    {width && <Transformation width={width} crop="scale" />}
                </Image>
            </div>
        )
    }
    // A bundled file (for example a brand hoggie PNG) lays out like a Cloudinary image: the same
    // wrapper and classes, with `width` as the display width Cloudinary would have scaled to.
    if (!isCloudinary) {
        return (
            <div className={`inline-block ${className}`}>
                <img src={src} width={width} className={imgClassName} {...other} />
            </div>
        )
    }
    return <img src={src} width={width} className={`inline-block ${imgClassName}`} {...other} />
}
