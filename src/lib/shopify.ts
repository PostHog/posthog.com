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

export const CREATE_CART = `
  mutation CartCreateMutation($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
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
