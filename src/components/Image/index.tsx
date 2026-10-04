// Responsive image rendering for data-layer images (Cloudinary and Shopify). Data from src/data-layer
// has the `childImageSharp.gatsbyImageData` shape, and components pass those objects to `getImage`.
import React from 'react'

export interface ResponsiveImageData {
    src: string
    srcSet?: string
    sizes?: string
    width?: number
    height?: number
    layout?: 'constrained' | 'fixed' | 'fullWidth'
}

type ImageNode = {
    gatsbyImageData?: ResponsiveImageData | null
    childImageSharp?: { gatsbyImageData?: ResponsiveImageData | null } | null
    publicURL?: string | null
}

export type ImageDataLike = ResponsiveImageData | ImageNode | null | undefined

export function getImage(data: ImageDataLike | string): ResponsiveImageData | undefined {
    // Anything that is not image data (a URL string, for example) yields nothing.
    if (!data || typeof data !== 'object') return undefined
    if ('src' in data && typeof data.src === 'string') return data
    const node = data as ImageNode
    return (
        node.gatsbyImageData ??
        node.childImageSharp?.gatsbyImageData ??
        (node.publicURL ? { src: node.publicURL } : undefined)
    )
}

export interface UrlBuilderArgs {
    baseUrl: string
    width: number
    height: number
    format: string
}

/** Builds image data from a remote image and a URL builder. */
export function getImageData({
    baseUrl,
    sourceWidth,
    sourceHeight,
    urlBuilder,
    formats = ['auto'],
}: {
    baseUrl: string
    sourceWidth: number
    sourceHeight: number
    urlBuilder: (args: UrlBuilderArgs) => string
    formats?: string[]
}): ResponsiveImageData {
    const format = formats[0] ?? 'auto'
    const at = (scale: number) =>
        urlBuilder({
            baseUrl,
            width: Math.round(sourceWidth * scale),
            height: Math.round(sourceHeight * scale),
            format,
        })
    return {
        src: at(1),
        srcSet: `${at(1)} 1x, ${at(2)} 2x`,
        width: sourceWidth,
        height: sourceHeight,
        layout: 'constrained',
    }
}

type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'>

export interface ResponsiveImageProps extends ImgProps {
    image?: ResponsiveImageData
    alt: string
    imgClassName?: string
    imgStyle?: React.CSSProperties
    objectFit?: React.CSSProperties['objectFit']
    objectPosition?: React.CSSProperties['objectPosition']
}

export function ResponsiveImage({
    image,
    alt,
    className,
    imgClassName,
    style,
    imgStyle,
    objectFit = 'cover',
    objectPosition = '50% 50%',
    loading = 'lazy',
    ...rest
}: ResponsiveImageProps): JSX.Element | null {
    if (!image) return null
    const { src, srcSet, sizes, width, height, layout = 'constrained' } = image
    const wrapperStyle: React.CSSProperties =
        layout === 'fixed'
            ? { width, height, ...style }
            : layout === 'constrained'
              ? { maxWidth: width, ...style }
              : (style ?? {})
    return (
        <div className={`relative overflow-hidden ${className ?? ''}`} style={wrapperStyle}>
            <img
                src={src}
                srcSet={srcSet}
                sizes={sizes}
                width={width}
                height={height}
                alt={alt}
                loading={loading}
                decoding="async"
                className={imgClassName}
                style={{ width: '100%', height: '100%', objectFit, objectPosition, ...imgStyle }}
                {...rest}
            />
        </div>
    )
}

export default ResponsiveImage
