import { IGatsbyImageData } from 'gatsby-plugin-image'
import { ShopifyProductVariant } from './types'

export function getLineItemImage(variant: ShopifyProductVariant): IGatsbyImageData | null {
    if (variant.media.length) {
        return variant.media[0].preview.image.localFile.childImageSharp.gatsbyImageData
    }

    if (variant.product.featuredMedia) {
        return variant.product.featuredMedia.preview.image.localFile.childImageSharp.gatsbyImageData
    }

    return null
}

export function shopifyGidToId(gid: string): string {
    return gid.replace(/gid:\/\/shopify\/\w+\//, '')
}

export function getProduct(product) {
    return {
        ...product,
        variants: product.variants.map((v) => getVariant(v, product)),
    }
}

export function getVariant(variant, product) {
    return {
        ...variant,
        product: {
            ...variant.product,
            tags: product.tags,
        },
    }
}
