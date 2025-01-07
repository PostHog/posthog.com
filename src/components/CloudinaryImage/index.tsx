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

type CloudinaryImageProps = {
    src: string
    width?: number
    className?: string
    imgClassName?: string
} & React.ComponentProps<typeof Image>

export default function CloudinaryImage({ src, width, className = '', imgClassName = '', ...other }: CloudinaryImageProps): JSX.Element {
    const cloudinaryPublicId = isCloudinaryImage(src) && getCloudinaryPublicId(src)
    return cloudinaryPublicId ? (
        <div className={`inline-block ${className}`}>
            <Image
                {...other}
                publicId={cloudinaryPublicId}
                cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
                className={imgClassName}
            >
                {width && <Transformation width={width} crop="scale" />}
            </Image>
        </div>
    ) : (
        <img src={src} width={width} className={`inline-block ${imgClassName}`} {...other} />
    )
}
