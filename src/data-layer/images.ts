// Cloudinary images as responsive image data under `childImageSharp.gatsbyImageData`, the shape
// components read. See src/components/Image.
import { CLOUDINARY_CLOUD_NAME } from './env'
import { getPublicID } from './utils'

export interface CloudinaryAsset {
    cloudName: string
    publicId: string
    originalWidth?: number
    originalHeight?: number
    originalFormat?: string
}

export interface ImageData {
    src: string
    srcSet?: string
    width?: number
    height?: number
    layout?: 'constrained' | 'fixed' | 'fullWidth'
}

export interface ImageOptions {
    width?: number
    height?: number
    layout?: ImageData['layout']
    transformations?: string[]
}

const DEFAULT_TRANSFORMATIONS = ['c_fill', 'g_auto', 'q_auto']

function cloudinaryUrl(
    asset: CloudinaryAsset,
    width?: number,
    height?: number,
    transformations = DEFAULT_TRANSFORMATIONS
) {
    const parts = ['f_auto', ...transformations, width && `w_${width}`, height && `h_${height}`].filter(Boolean)
    return `https://res.cloudinary.com/${asset.cloudName}/image/upload/${parts.join(',')}/${asset.publicId}`
}

/** Builds responsive image data for a Cloudinary asset, like the `gatsbyImageData(...)` resolver did. */
export function imageData(asset: CloudinaryAsset | null | undefined, options: ImageOptions = {}): ImageData | null {
    if (!asset?.publicId) return null
    const { transformations = DEFAULT_TRANSFORMATIONS, layout = 'constrained' } = options
    let { width, height } = options
    const ratio = asset.originalWidth && asset.originalHeight ? asset.originalHeight / asset.originalWidth : undefined
    if (width && !height && ratio) height = Math.round(width * ratio)
    if (!width && height && ratio) width = Math.round(height / ratio)
    if (!width && !height) {
        width = asset.originalWidth
        height = asset.originalHeight
    }
    const at = (scale: number) =>
        cloudinaryUrl(asset, width && Math.round(width * scale), height && Math.round(height * scale), transformations)
    return {
        src: at(1),
        srcSet: width ? `${at(1)} 1x, ${at(2)} 2x` : undefined,
        width,
        height,
        layout,
    }
}

export function isCloudinaryUrl(value: unknown): value is string {
    if (typeof value !== 'string') return false
    try {
        return new URL(value).hostname === 'res.cloudinary.com' && value.includes('/upload/')
    } catch {
        return false
    }
}

/** A frontmatter image URL as an image node: `{ publicURL, childImageSharp }`. */
export function imageNode(url: string) {
    const asset: CloudinaryAsset = { cloudName: CLOUDINARY_CLOUD_NAME(), publicId: getPublicID(url) }
    return {
        publicURL: url,
        childImageSharp: { ...asset, gatsbyImageData: imageData(asset) },
    }
}

/** A Strapi media field ({ data: { attributes } }) as the Cloudinary transformer extended it. */
export function strapiImageNode(media: any) {
    const attributes = media?.data?.attributes
    const publicId = attributes?.provider_metadata?.public_id
    if (!publicId) return media ?? null
    const asset: CloudinaryAsset = {
        cloudName: CLOUDINARY_CLOUD_NAME(),
        publicId,
        originalWidth: attributes.width,
        originalHeight: attributes.height,
        originalFormat: attributes.ext?.replace('.', ''),
    }
    return { ...media, ...asset, gatsbyImageData: imageData(asset) }
}
