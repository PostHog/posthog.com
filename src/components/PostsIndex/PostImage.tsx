import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { IconNewspaper } from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import { PostSummary } from './types'

type PostImageProps = {
    post: PostSummary
    /** Applied to the image wrapper (Gatsby/Cloudinary render one). */
    className?: string
    /** Applied to the `<img>` itself — where object-fit/cropping belongs. */
    imgClassName?: string
    /** Requested width when falling back to a Cloudinary URL. */
    width?: number
}

/**
 * A post's featured image, degrading through the shapes it can arrive in:
 * processed Gatsby image → Cloudinary URL → raw URL → placeholder.
 */
export default function PostImage({
    post,
    className = '',
    imgClassName = '',
    width = 800,
}: PostImageProps): JSX.Element {
    const image = getImage(post.frontmatter.featuredImage?.childImageSharp ?? null)
    const publicURL = post.frontmatter.featuredImage?.publicURL

    return image ? (
        <GatsbyImage image={image} alt={post.frontmatter.title} className={className} imgClassName={imgClassName} />
    ) : publicURL?.startsWith('https://res.cloudinary.com/') ? (
        <CloudinaryImage
            src={publicURL as `https://res.cloudinary.com/${string}`}
            width={width}
            alt={post.frontmatter.title}
            className={`!block ${className}`}
            imgClassName={imgClassName}
            loading="lazy"
        />
    ) : publicURL ? (
        <img src={publicURL} alt={post.frontmatter.title} loading="lazy" className={`${className} ${imgClassName}`} />
    ) : (
        <div className={`flex min-h-32 items-center justify-center bg-accent ${className}`}>
            <IconNewspaper className="size-8 text-muted" />
        </div>
    )
}
