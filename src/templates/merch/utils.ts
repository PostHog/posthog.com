import { shopifyHeaders } from '../../lib/shopify'
import type {
    CartItem,
    CartLineInput,
    CreateCartVariables,
    MetafieldValue,
    ShopifyMediaImage,
    ShopifyMediaItem,
    ShopifyProduct,
} from './types'
import { IUrlBuilderArgs, getImageData, IGatsbyImageData } from 'gatsby-plugin-image'

export function getCartVariables(cartItems: CartItem[], discountCode?: string): CreateCartVariables {
    const createCartVariables: CreateCartVariables = {
        input: {
            lines: cartItems.map(
                (item): CartLineInput => ({
                    merchandiseId: item.shopifyId,
                    quantity: item.count,
                })
            ),
        },
    }

    if (discountCode) {
        createCartVariables.input.discountCodes = [discountCode]
    }

    return createCartVariables
}

export function isNotNullish<T>(x: T | null | undefined): x is T {
    return x !== null && x !== undefined
}

export function getProductMetafield(product: ShopifyProduct, key: string): MetafieldValue | undefined {
    const metafield = product.metafields?.find((m) => m.key === key)
    return metafield ? metafield.value : undefined
}

export function getProductImages(media: ShopifyMediaItem[]): ShopifyMediaImage[] | null {
    if (!media || !Array.isArray(media)) return null
    return media
        .filter((m) => m.mediaContentType === 'IMAGE')
        .map((m) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { mediaContentType, ...rest } = m
            return rest
        })
}

export const getAvailableQuantity = async (id: string) => {
    try {
        const { data } = await fetch(`https://${process.env.GATSBY_MYSHOPIFY_URL}/api/2023-10/graphql.json`, {
            method: 'POST',
            headers: shopifyHeaders,
            body: JSON.stringify({
                query: `
                query GetVariantById($id: ID!) {
                    node(id: $id) {
                    ... on ProductVariant {
                        quantityAvailable
                    }
                    }
                }`,
                variables: { id },
            }),
        }).then((res) => res.json())

        return data.node.quantityAvailable
    } catch (error) {
        console.error('Error fetching inventory from Shopify:', error)
        return 0
    }
}

export const itemIsAvailableForSale = async (item: CartItem) => {
    const product = await fetch(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/brilliant/inventory/${
            item.shopifyId.split('gid://shopify/ProductVariant/')[1]
        }`
    ).then((res) => res.json())

    return product?.quantity > 0
}

const validFormats = new Set([`jpg`, `jpeg`, `png`, `webp`, `auto`])

export function urlBuilder({ width, height, baseUrl, format }: IUrlBuilderArgs<unknown>): string {
    if (!validFormats.has(format)) {
        console.warn(`${format} is not a valid format. Valid formats are: ${[...validFormats].join(`, `)}`)
        format = `auto`
    }

    let [basename, version] = baseUrl.split(`?`)

    const dot = basename.lastIndexOf(`.`)
    let ext = ``
    if (dot !== -1) {
        ext = basename.slice(dot + 1)
        basename = basename.slice(0, dot)
    }
    let suffix = ``
    if (format === ext || format === `auto`) {
        suffix = `.${ext}`
    } else {
        suffix = `.${ext}.${format}`
    }

    return `${basename}_${width}x${height}_crop_center${suffix}?${version}`
}

export function getShopifyImage({ image, ...args }: any): IGatsbyImageData {
    const { originalSrc: baseUrl, width: sourceWidth, height: sourceHeight } = image

    return getImageData({
        ...args,
        baseUrl,
        sourceWidth,
        sourceHeight,
        urlBuilder,
        formats: [`auto`],
    })
}
