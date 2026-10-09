import type { Cart, CartCreateReponse, CartResponse, CreateCartVariables } from 'templates/merch/types'

type ShopifyHeaders = {
    Accept: string
    'Content-Type': string
    'X-Shopify-Storefront-Access-Token': string
}

const shopifyURL = process.env.GATSBY_MYSHOPIFY_URL
const shopifyStorefrontAPIVersion = process.env.GATSBY_SHOPIFY_STOREFRONT_API_VERSION
const shopifyStorefrontAPIPassword = process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN

export const shopifyStorefrontUrl = `https://${shopifyURL}/api/${shopifyStorefrontAPIVersion}/graphql.json`

export const shopifyHeaders: ShopifyHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    'X-Shopify-Storefront-Access-Token': shopifyStorefrontAPIPassword!,
}

/**
 * Create a cart and return its checkout URL, along with the cart's line items.
 * At this point we need to validate the cart's line items to make sure they are
 * still available for sale.
 *
 * TODO: Decide on how to handle unavailable items. Should we remove them from the cart
 * with some kind of promp? If not, it will error in checkout where we won't have
 * control.
 */
export const CREATE_CART = `
    mutation CartCreateMutation($input: CartInput!) {
        cartCreate(input: $input) {
            cart {
                checkoutUrl
                id
                lines(first: 250) {
                    edges {
                        node {
                            quantity
                            merchandise {
                                ... on ProductVariant {
                                    availableForSale
                                    compareAtPriceV2 {
                                        amount
                                        currencyCode
                                    }
                                    currentlyNotInStock
                                    id
                                    image {
                                        altText
                                        height
                                        id
                                        originalSrc
                                        transformedSrc
                                        width
                                    }
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                    product {
                                        id
                                        handle
                                        productType
                                        title
                                        vendor
                                    }
                                    quantityAvailable
                                    selectedOptions {
                                        name
                                        value
                                    }
                                    sku
                                    title
                                    weight
                                    weightUnit
                                    }
                              }
                        }
                    }
                    pageInfo {
                        hasNextPage
                        hasPreviousPage

                    }
                }
            }
            userErrors {
                code
                field
                message
            }
        }
    }
`

export const GET_CART = `
  query getCart($id: ID!) {
    cart(id: $id) {
        checkoutUrl
      id
      lines(first: 250) {
        edges {
            node {
                quantity
                merchandise {
                    ... on ProductVariant {
                        availableForSale
                        compareAtPriceV2 {
                            amount
                            currencyCode
                        }
                        currentlyNotInStock
                        id
                        image {
                            altText
                            height
                            id
                            originalSrc
                            transformedSrc
                            width
                        }
                        priceV2 {
                            amount
                            currencyCode
                        }
                        product {
                            id
                            handle
                            productType
                            title
                            vendor
                        }
                        quantityAvailable
                        selectedOptions {
                            name
                            value
                        }
                        sku
                        title
                        weight
                        weightUnit
                        }
                  }
            }
        }
        pageInfo {
            hasNextPage
            hasPreviousPage

        }
    }
    }
  }
  `

type StorefrontResponse<TData> = {
    data?: TData
    errors?: { message: string }[]
}

/**
 * Post a document to the Storefront API. Rejects if the request fails or if the
 * API reports an error, so the caller can tell the shopper what went wrong.
 */
async function postToStorefront<TData>(query: string, variables?: Record<string, unknown>): Promise<TData> {
    const response = await fetch(shopifyStorefrontUrl, {
        method: 'POST',
        headers: shopifyHeaders,
        body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
        throw new Error(`Shopify request failed with status ${response.status}`)
    }

    const { data, errors } = (await response.json()) as StorefrontResponse<TData>

    if (errors?.length) {
        throw new Error(errors[0].message)
    }

    if (!data) {
        throw new Error('Shopify returned no data')
    }

    return data
}

export const createCartQuery = async (variables: CreateCartVariables): Promise<Cart> => {
    const { cartCreate } = await postToStorefront<CartCreateReponse>(CREATE_CART, variables)

    if (cartCreate.userErrors?.length) {
        throw new Error(cartCreate.userErrors[0].message)
    }

    if (!cartCreate.cart) {
        throw new Error('Shopify returned no cart')
    }

    return cartCreate.cart
}

export const getCartQuery = async (id: string): Promise<Cart | null> => {
    const { cart } = await postToStorefront<CartResponse>(GET_CART, { id })

    return cart
}
