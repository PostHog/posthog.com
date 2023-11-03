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
