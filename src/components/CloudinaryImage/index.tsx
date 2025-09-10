import React, { useMemo } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { placeholder as placeholderPlugin } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'

const cloudName = process.env.GATSBY_CLOUDINARY_CLOUD_NAME
const cloudinaryUrlPattern = new RegExp(`https://res.cloudinary.com/${cloudName}/`)
const publicIdPattern = /https:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/

const placeholders = {
    blurred: 'blur',
    dominantColor: 'predominant',
    none: undefined,
} as const

const myCld = new Cloudinary({
    cloud: {
        cloudName,
    },
})

const isCloudinaryImage = (url: string): boolean => {
    return cloudinaryUrlPattern.test(url)
}

const getCloudinaryPublicId = (url: string): string | null => {
    const match = url.match(publicIdPattern)
    return match ? match[1] : null
}

interface CloudinaryImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
    src: `https://res.cloudinary.com/${string}`
    width?: number
    placeholder?: keyof typeof placeholders
    className?: string
    imgClassName?: string
}

export default function CloudinaryImage({
    src,
    width,
    className = '',
    imgClassName = '',
    placeholder,
    ...other
}: CloudinaryImageProps): JSX.Element | null {
    const cloudinaryPublicId = isCloudinaryImage(src) && getCloudinaryPublicId(src)
    const placeholderType = placeholder && placeholders[placeholder]

    const cldImg = useMemo(() => {
        if (!cloudinaryPublicId) return null
        const img = myCld.image(cloudinaryPublicId)
        if (width) {
            img.resize(scale().width(width))
        }
        return img
    }, [cloudinaryPublicId, width])

    return !cloudinaryPublicId ? (
        <img src={src} className={`inline-block ${imgClassName}`} {...other} />
    ) : cldImg ? (
        <div className={`inline-block ${className}`}>
            <AdvancedImage
                cldImg={cldImg}
                plugins={placeholderType ? [placeholderPlugin({ mode: placeholderType })] : []}
            />
        </div>
    ) : null
}
