import { shopifyHeaders, shopifyStorefrontUrl } from 'lib/shopify'
import { useEffect, useState } from 'react'
import type {
    ProductVariantOption,
    SelectedOption,
    SelectedOptions,
    StorefrontProduct,
    StorefrontProductOption,
    StorefrontProductVariant,
    StorefrontProductVariantEdge,
    StorefrontProductVariantNode,
    StorefrontProductVariantsEdges,
    StorefrontShopRequestBody,
    StorefrontShopResponse,
    VariantSelectedOption,
} from './types'

type getVariantOptionArgs = {
    name: string
    value: string
    options: StorefrontProductOption[]
}

type setOptionAtIndexArgs = [index: number, option: ProductVariantOption, val: string]

export function useProduct(id: string): {
    selectedOptions: SelectedOptions | null | undefined
    setOptionAtIndex: (...args: setOptionAtIndexArgs) => void
    selectedVariant: StorefrontProductVariant | null | undefined
    loading: boolean
    outOfStock: boolean
} {
    const { product, loading } = useFetchProductOptions(id)

    const [selectedVariant, setSelectedVariant] = useState<StorefrontProductVariant | null>()

    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions | null>()

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
            return v.selectedOptions.every((o: VariantSelectedOption) => {
                return selectedOptions?.some((so: SelectedOption) => {
                    return so.option.name === o.name && so.selectedValue === o.value
                })
            })
        })
        setSelectedVariant(newVariant)
    }, [selectedOptions])

    const setOptionAtIndex = (...args: setOptionAtIndexArgs) => {
        if (!product) return
        const [index, option, value] = args

        setSelectedOptions((prev) => {
            return prev?.map((opt, i) => {
                return i === index
                    ? getVariantOption({
                          name: option.name,
                          value,
                          options: product?.options,
                      })
                    : opt
            })
        })
    }

    const outOfStock = selectedVariant
        ? selectedVariant?.quantityAvailable <= 0 && !selectedVariant?.currentlyNotInStock
        : false

    return { selectedOptions, setOptionAtIndex, selectedVariant, loading, outOfStock }
}

function getVariantOption({ name, value, options }: getVariantOptionArgs): {
    selectedValue: string
    option: ProductVariantOption
} {
    const variantOption = options.find((opt) => opt.name.toLowerCase() === name.toLowerCase()) || options[0]

    return { selectedValue: value, option: variantOption }
}

function useFetchProductOptions(id: string): { product: StorefrontProduct | null; loading: boolean } {
    const [productData, setProductData] = useState<StorefrontProduct | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>()

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

                const json = (await response.json()) as StorefrontShopRequestBody
                const responseData = getProduct(json.data)
                setProductData(responseData)
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

function getProduct(responseData: StorefrontShopResponse): StorefrontProduct {
    return {
        ...responseData.node,
        variants: getVariants(responseData.node.variants),
    }
}

function getVariants(variants: StorefrontProductVariantsEdges): StorefrontProductVariantNode[] {
    return variants.edges.map((e: StorefrontProductVariantEdge) => e.node)
}
