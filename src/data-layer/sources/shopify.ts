// Merch store data from the Shopify Admin API: MerchNavigation, ShopifyProduct, ShopifyCollection.
//
// ShopifyCollection.products is `[{ shopifyId }]`: join with `nodes('ShopifyProduct')` by `shopifyId`.
// ShopifyProduct.featuredImage is set here (it was a `@proxy` of featuredMedia.preview.image).
// `imageProducts` (a resolver over the `image_products` metafield) is left to the query.
import type { Source } from '../index'
import { env } from '../env'
import { fetchJson } from '../http'
import type {
    MerchNavigationNode,
    ShopifyCollectionNode,
    ShopifyMedia,
    ShopifyMetafield,
    ShopifyProductNode,
    ShopifyProductVariant,
} from '../types'

/* Shopify Admin GraphQL responses. Connections are `{ nodes }`, and money is a decimal string. */

export interface Connection<T> {
    nodes: T[]
}

export interface ShopifyApiVariant extends Omit<ShopifyProductVariant, 'media' | 'price'> {
    media: Connection<ShopifyMedia>
    price: string
}

export interface ShopifyApiProduct extends Omit<
    ShopifyProductNode,
    'id' | 'media' | 'metafields' | 'priceRangeV2' | 'variants' | 'featuredImage'
> {
    media: Connection<ShopifyMedia>
    metafields: Connection<ShopifyMetafield>
    priceRangeV2: { maxVariantPrice: { amount: string }; minVariantPrice: { amount: string } }
}

export interface MerchNavigationResponse {
    metaobjects: {
        edges: {
            node: {
                fields: {
                    references: { edges: { node: { __typename: string; title: string; handle: string; id: string } }[] }
                }[]
            }
        }[]
    }
}

export interface VariantsResponse {
    productVariants: Connection<ShopifyApiVariant> & { pageInfo: { hasNextPage: boolean; endCursor: string | null } }
}

export interface CollectionResponse {
    collectionByHandle: { handle: string; products: Connection<ShopifyApiProduct> }
}

const IMAGE = 'preview { image { width height originalSrc } }'

const PRODUCT_FIELDS = `
    description
    descriptionHtml
    featuredMedia { ${IMAGE} }
    handle
    id
    media(first: 250) { nodes { mediaContentType ${IMAGE} } }
    metafields(first: 250) { nodes { value key namespace } }
    options { shopifyId: id name values }
    priceRangeV2 { maxVariantPrice { amount } minVariantPrice { amount } }
    shopifyId: id
    status
    title
    tags
    totalInventory
    createdAt
    category { id name level parentId }`

const VARIANT_FIELDS = `
    inventoryPolicy
    availableForSale
    media(first: 250) { nodes { ${IMAGE} } }
    price
    product { shopifyId: id title featuredMedia { ${IMAGE} } }
    selectedOptions { name value }
    shopifyId: id
    sku
    title`

async function shopify<T>(query: string): Promise<T> {
    const url = `https://${env('PUBLIC_MYSHOPIFY_URL')}/admin/api/${env(
        'PUBLIC_SHOPIFY_ADMIN_API_VERSION'
    )}/graphql.json`
    const { data, errors } = await fetchJson<{ data?: T; errors?: unknown }>(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': env('SHOPIFY_APP_PASSWORD') ?? '' },
        body: JSON.stringify({ query }),
    })
    if (!data) throw new Error(`Shopify: ${JSON.stringify(errors)}`)
    return data
}

async function fetchVariants(): Promise<ShopifyApiVariant[]> {
    const variants: ShopifyApiVariant[] = []
    let cursor: string | null = null
    for (;;) {
        const after: string = cursor ? `, after: "${cursor}"` : ''
        const { productVariants }: VariantsResponse = await shopify<VariantsResponse>(
            `{ productVariants(first: 250${after}) { pageInfo { hasNextPage endCursor } nodes { ${VARIANT_FIELDS} } } }`
        )
        variants.push(...productVariants.nodes)
        if (!productVariants.pageInfo.hasNextPage) return variants
        cursor = productVariants.pageInfo.endCursor
    }
}

// Shopify sends prices as decimal strings. Nodes store them as numbers.
const variantNode = (variant: ShopifyApiVariant): ShopifyProductVariant => ({
    ...variant,
    media: variant.media.nodes,
    price: Number(variant.price),
})

function productNode(product: ShopifyApiProduct, variants: ShopifyProductVariant[]): ShopifyProductNode {
    const { maxVariantPrice, minVariantPrice } = product.priceRangeV2
    return {
        ...product,
        media: product.media.nodes,
        metafields: product.metafields.nodes,
        priceRangeV2: {
            maxVariantPrice: { amount: Number(maxVariantPrice.amount) },
            minVariantPrice: { amount: Number(minVariantPrice.amount) },
        },
        variants,
        featuredImage: product.featuredMedia?.preview?.image ?? null,
        id: `shopify-product-${product.shopifyId}`,
    }
}

function collectionNode(handle: string, products: { shopifyId: string }[]): ShopifyCollectionNode {
    return {
        id: `shopify-collection-${handle}`,
        handle,
        products: products.map((product) => ({ shopifyId: product.shopifyId })),
    }
}

export const shopifySource: Source = {
    name: 'shopify',
    types: ['MerchNavigation', 'ShopifyProduct', 'ShopifyCollection'],
    requires: ['PUBLIC_MYSHOPIFY_URL', 'PUBLIC_SHOPIFY_ADMIN_API_VERSION', 'SHOPIFY_APP_PASSWORD'],
    async fetch() {
        const navigation = await shopify<MerchNavigationResponse>(`{
            metaobjects(type: "merch_navigation", first: 100) {
                edges { node { fields { references(first: 5) { edges { node {
                    __typename
                    ... on Collection { title handle id }
                } } } } } }
            }
        }`)
        // "All products" (frontpage) always comes first
        const MerchNavigation: MerchNavigationNode[] = navigation.metaobjects.edges[0].node.fields[0].references.edges
            .map(({ node }) => ({ title: node.title, handle: node.handle }))
            .sort((a, b) => (a.handle === 'frontpage' ? -1 : b.handle === 'frontpage' ? 1 : 0))
            .map((collection, i) => ({
                id: `merch-navigation-${i}`,
                url: `/merch/${collection.handle}`,
                ...collection,
            }))

        const variants = (await fetchVariants()).map(variantNode)
        const products = new Map<string, ShopifyProductNode>()
        const ShopifyCollection = await Promise.all(
            ['frontpage', 'kits'].map(async (handle) => {
                const { collectionByHandle } = await shopify<CollectionResponse>(
                    `{ collectionByHandle(handle: "${handle}") { handle products(first: 250) { nodes { ${PRODUCT_FIELDS} } } } }`
                )
                const active = collectionByHandle.products.nodes.filter(
                    (product) => product.status === 'ACTIVE' && !!product.featuredMedia
                )
                for (const product of active) {
                    const productVariants = variants.filter(
                        (variant) => variant.product.shopifyId === product.shopifyId
                    )
                    // A product in both collections is one node
                    products.set(product.shopifyId, productNode(product, productVariants))
                }
                return collectionNode(collectionByHandle.handle, active)
            })
        )
        return { MerchNavigation, ShopifyProduct: [...products.values()], ShopifyCollection }
    },
    fake() {
        const image = (originalSrc: string): ShopifyMedia => ({
            preview: { image: { width: 1000, height: 1000, originalSrc } },
        })
        const product = (
            n: number,
            title: string,
            handle: string,
            price: number,
            src: string,
            sizes: string[] | null
        ) => {
            const shopifyId = `gid://shopify/Product/${1000 + n}`
            const featuredMedia = image(src)
            const optionName = sizes ? 'Size' : 'Title'
            const values = sizes ?? ['Default Title']
            const variants: ShopifyProductVariant[] = values.map((value, i) => ({
                inventoryPolicy: 'DENY',
                availableForSale: true,
                media: [featuredMedia],
                price,
                product: { shopifyId, title, featuredMedia },
                selectedOptions: [{ name: optionName, value }],
                shopifyId: `gid://shopify/ProductVariant/${3000 + n * 10 + i}`,
                sku: `${handle}-${value}`.toLowerCase(),
                title: value,
            }))
            const node: ShopifyProductNode = {
                id: `shopify-product-${shopifyId}`,
                shopifyId,
                handle,
                title,
                description: `${title}, from the PostHog merch store.`,
                descriptionHtml: `<p>${title}, from the PostHog merch store.</p>`,
                status: 'ACTIVE',
                tags: [],
                totalInventory: 100,
                createdAt: '2026-01-01T00:00:00Z',
                category: null,
                featuredMedia,
                featuredImage: featuredMedia.preview?.image ?? null,
                media: [{ mediaContentType: 'IMAGE', ...featuredMedia }],
                metafields: [],
                options: [{ shopifyId: `gid://shopify/ProductOption/${2000 + n}`, name: optionName, values }],
                priceRangeV2: { maxVariantPrice: { amount: price }, minVariantPrice: { amount: price } },
                variants,
            }
            return node
        }
        const shirts = ['S', 'M', 'L', 'XL']
        const shopifyFiles = 'https://cdn.shopify.com/s/files/1/0452/0935/4401/files'
        const frontpage = [
            product(
                1,
                'Caution tee',
                'caution-tee',
                30,
                `${shopifyFiles}/cautiontee4_1000x1000_crop_center.jpg?v=1732041736`,
                shirts
            ),
            product(
                2,
                'Dark mode tee',
                'dark-mode-tee',
                30,
                `${shopifyFiles}/darkmode_tee_5_1000x1000_crop_center.jpg?v=1732211354`,
                shirts
            ),
            product(
                3,
                'Laptop sticker',
                'posthog-sticker',
                5,
                'https://res.cloudinary.com/dmukukwp6/image/upload/laptop_sticker_6c15a03be1.png',
                null
            ),
        ]
        const kits = [
            product(
                4,
                'New hire kit',
                'new-hire-kit',
                0,
                'https://res.cloudinary.com/dmukukwp6/image/upload/merch_store_a97f57c226.png',
                null
            ),
        ]
        const MerchNavigation: MerchNavigationNode[] = [
            { id: 'merch-navigation-0', url: '/merch/frontpage', title: 'All products', handle: 'frontpage' },
        ]
        return {
            MerchNavigation,
            ShopifyProduct: [...frontpage, ...kits],
            ShopifyCollection: [collectionNode('frontpage', frontpage), collectionNode('kits', kits)],
        }
    },
}
