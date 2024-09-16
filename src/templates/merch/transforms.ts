import { IGatsbyImageData } from 'gatsby-plugin-image'
import { ShopifyProduct, ShopifyProductVariant } from './types'
import { getShopifyImage } from 'gatsby-source-shopify'

export function getLineItemImage(variant: ShopifyProductVariant): IGatsbyImageData | null {
    if (variant.media.length) {
        return getShopifyImage({ image: variant.media[0].preview.image })
    }

    if (variant.product.featuredMedia) {
        return getShopifyImage({ image: variant.product.featuredMedia.preview.image })
    }

    return null
}

export function shopifyGidToId(gid: string): string {
    return gid.replace(/gid:\/\/shopify\/\w+\//, '')
}

export function getProduct(product: ShopifyProduct): ShopifyProduct {
    return {
        ...product,
        variants: product.variants.map((v) => getVariant(v, product)),
    }
}

export function getVariant(variant: ShopifyProductVariant, product: ShopifyProduct): ShopifyProductVariant {
    return {
        ...variant,
        product: {
            ...variant.product,
            tags: product.tags,
        },
    }
}
