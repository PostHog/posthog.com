import React from 'react'
import { Image, Transformation } from 'cloudinary-react'

const isCloudinaryImage = (url: string): boolean => {
    const cloudinaryUrlPattern = new RegExp(`https://res.cloudinary.com/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}/`)
    return cloudinaryUrlPattern.test(url)
}

const getCloudinaryPublicId = (url: string): string | null => {
    const cloudinaryUrlPattern = /https:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video)\/upload\/(?:v\d+\/)?([^/.]+)/
    const match = url.match(cloudinaryUrlPattern)
    return match ? match[1] : null
}

export default function CloudinaryImage({ src, width = 600, ...other }) {
    const cloudinaryPublicId = isCloudinaryImage(src) && getCloudinaryPublicId(src)
    return cloudinaryPublicId ? (
        <Image {...other} publicId={cloudinaryPublicId} cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}>
            <Transformation width={width} crop="scale" />
        </Image>
    ) : null
}
