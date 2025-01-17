import React from 'react'
import { Image, Transformation, Placeholder } from 'cloudinary-react'

interface CloudinaryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
    width?: number
    placeholder?: 'none' | 'blurred' | 'pixelate' | 'vectorize' | 'dominantColor'
    className?: string
    imgClassName?: string
}

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
    ...other
}: {
    src: `https://res.cloudinary.com/${string}`
    width?: number
    className?: string
    imgClassName?: string
} & React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element {
    const cloudinaryPublicId = isCloudinaryImage(src) && getCloudinaryPublicId(src)
    const placeholderType =
        placeholder === 'blurred' ? 'blur' : placeholder === 'dominantColor' ? 'predominant' : placeholder

    return cloudinaryPublicId ? (
        <div className={`inline-block ${className}`}>
            <Image
                {...other}
                publicId={cloudinaryPublicId}
                cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
                className={imgClassName}
                secure
            >
                {width && <Transformation width={width} crop="scale" />}
                {placeholder !== 'none' && <Placeholder type={placeholderType} />}
            </Image>
        </div>
    ) : (
        <img src={src} width={width} className={`inline-block ${imgClassName}`} {...other} />
    )
}
