import { shopifyHeaders, shopifyStorefrontUrl } from 'lib/shopify'
import { useEffect, useState } from 'react'
import type { ProductVariantOption, ProductVariantSelection, SelectedOptions, ShopifyProductVariant } from './types'

type getVariantOptionArgs = {
    name: string
    variant: ShopifyProductVariant
    options: ProductVariantOption[]
}

type setOptionAtIndexArgs = [index: number, option: ProductVariantOption, val: string]

export function useProduct(
    id: string
): [SelectedOptions, (...args: setOptionAtIndexArgs) => void, ProductVariantSelection[], ShopifyProductVariant] {
    const { product, loading } = useFetchProductOptions(id)

    const [selectedVariant, setSelectedVariant] = useState()

    const [selectedOptions, setSelectedOptions] = useState([])

    useEffect(() => {
        if (!product) return
        const initialVariant = product.variants.find((v) => v.availableForSale) || product.variants[0]
        setSelectedVariant(initialVariant)
        setSelectedOptions(
            product.options.map((_, index) =>
                getVariantOption({
                    name: product.options[index].name,
                    value: initialVariant.selectedOptions[index].value,
                    options: product.options,
                })
            )
        )
    }, [product])

    useEffect(() => {
        if (!product) return
        const newVariant = product.variants.find((v) => {
            return v.selectedOptions.every((o) => {
                return selectedOptions.some((so) => {
                    return so.option.name === o.name && so.selectedValue === o.value
                })
            })
        })
        setSelectedVariant(newVariant)
    }, [selectedOptions])

    if (!product) return [null, null, null, null, loading]

    const selections = selectedOptions.map((so) => so.selected).filter(Boolean) as ProductVariantSelection[]

    const setOptionAtIndex = (...args: setOptionAtIndexArgs) => {
        const [index, option, value] = args

        setSelectedOptions((prev) => {
            return prev.map((opt, i) => {
                return i === index
                    ? getVariantOption({
                          name: option.name,
                          value,
                          options: product.options,
                      })
                    : opt
            })
        })
    }

    const outOfStock = selectedVariant?.quantityAvailable <= 0 && !selectedVariant?.currentlyNotInStock

    return [selectedOptions, setOptionAtIndex, selections, selectedVariant, loading, outOfStock]
}

function getVariantOption({ name, value, options }: getVariantOptionArgs): {
    selectedValue: string
    option: ProductVariantOption
} {
    const variantOption = options.find((opt) => opt.name.toLowerCase() === name.toLowerCase()) || options[0]

    return { selectedValue: value, option: variantOption }
}

function useFetchProductOptions(id: string) {
    const [productData, setProductData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            const requestBody = {
                query: `
                {
                    node(id: "${id}") {
                        ... on Product {
                            availableForSale
                            options {
                                id
                                name
                                values 
                            }
                            tags
                            totalInventory
                            variants(first: 250) {
                                edges {
                                    node {
                                        availableForSale
                                        currentlyNotInStock
                                        id
                                        price {
                                            amount
                                        }
                                        product {
                                            tags
                                        }
                                        quantityAvailable
                                        selectedOptions {
                                            name
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                `,
            }

            try {
                const response = await fetch(shopifyStorefrontUrl, {
                    method: 'POST',
                    headers: shopifyHeaders,
                    body: JSON.stringify(requestBody),
                })

                const json = await response.json()
                const product = getProduct(json.data)
                setProductData(product)
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        setTimeout(() => fetchProduct(), 500)
    }, [])

    return { product: productData, loading }
}

function getProduct(product) {
    return {
        ...product.node,
        variants: getVariants(product.node.variants),
    }
}

function getVariants(variants) {
    return variants.edges.map((e) => e.node)
}
