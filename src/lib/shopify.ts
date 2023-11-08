import type { CreateCartResponse, CreateCartVariables } from 'templates/merch/types'

type ShopifyHeaders = {
    Accept: string
    'Content-Type': string
    'X-Shopify-Storefront-Access-Token': string
}

const SHOPIFY_GRAPHQL_URL = `https://${process.env.GATSBY_MYSHOPIFY_URL}/api/2022-10/graphql.json`

const SHOPIFY_HEADERS: ShopifyHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    'X-Shopify-Storefront-Access-Token': process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN!,
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
    }
`

export const createCartQuery = (variables: CreateCartVariables): Promise<CreateCartResponse | void> =>
    fetch(SHOPIFY_GRAPHQL_URL, {
        method: 'POST',
        headers: SHOPIFY_HEADERS,
        body: JSON.stringify({
            query: CREATE_CART,
            variables,
        }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            return res.json()
        })
        .then((res) => {
            const { cartCreate } = res.data as CreateCartResponse
            if (cartCreate.userErrors) {
                const error = new Error(res.userErrors[0].message)
                error.name = 'Shopify ApiError'

                throw error
            }

            return res.data
        })
        .catch((e) => {
            if (e.name === 'ApiError') {
                // API error
            } else {
                // Fetch request or Some other error
            }
        })
