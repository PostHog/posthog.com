import type { CartResponse, CreateCartResponse, CreateCartVariables } from 'templates/merch/types'

type ShopifyHeaders = {
    Accept: string
    'Content-Type': string
    'X-Shopify-Storefront-Access-Token': string
}

const shopifyURL = process.env.GATSBY_MYSHOPIFY_URL
const shopifyStorefrontAPIVersion = process.env.GATSBY_SHOPIFY_STOREFRONT_API_VERSION
const shopifyStorefrontAPIPassword = process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN

const shopifyStorefrontUrl = `https://${shopifyURL}/api/${shopifyStorefrontAPIVersion}/graphql.json`

const shopifyHeaders: ShopifyHeaders = {
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

export const createCartQuery = (variables: CreateCartVariables): Promise<CreateCartResponse | void> =>
    fetch(shopifyStorefrontUrl, {
        method: 'POST',
        headers: shopifyHeaders,
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
            const cartCreate = res.data as CreateCartResponse
            if (cartCreate.userErrors) {
                const error = new Error(res.userErrors[0].message)
                error.name = 'Shopify ApiError'

                throw error
            }

            return cartCreate.cartCreate.cart
        })
        .catch((e) => {
            if (e.name === 'ApiError') {
                // API error
            } else {
                // Fetch request or Some other error
            }
        })

export const getCartQuery = async (id) =>
    await fetch(shopifyStorefrontUrl, {
        method: 'POST',
        headers: shopifyHeaders,
        body: JSON.stringify({
            query: GET_CART,
            variables: { id },
        }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            return res.json()
        })
        .then((res) => {
            const cart = res.data as CartResponse
            if (cart?.userErrors) {
                const error = new Error(res.userErrors[0].message)
                error.name = 'Shopify ApiError'

                throw error
            }
            return cart.cart
        })
        .catch((e) => {
            throw new Error(e)
        })
