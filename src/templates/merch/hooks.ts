import { useState } from 'react'
import type {
    ProductVariantOption,
    ProductVariantSelection,
    SelectedOptions,
    ShopifyProduct,
    ShopifyProductVariant,
} from './types'

type getVariantOptionArgs = {
    name: string
    variant: ShopifyProductVariant
    options: ProductVariantOption[]
}

function getVariantOption({ name, variant, options }: getVariantOptionArgs): {
    selectedValue: string
    selected: ProductVariantSelection | null
    option: ProductVariantOption
} {
    const variantOption = options.find((opt) => opt.name.toLowerCase() === name.toLowerCase()) || options[0]

    const initialVariantOptionValue = variant.selectedOptions.find(
        (o) => o.name.toLowerCase() === name?.toLowerCase()
    )?.value

    const initialVariantOption = variantOption.values.find((value) => value === initialVariantOptionValue) || ''

    const selectedValue = initialVariantOption

    let selected: ProductVariantSelection | null = null

    if (name && selectedValue) {
        selected = { name, value: selectedValue }
    }

    return { selectedValue, selected, option: variantOption }
}

type setOptionAtIndexArgs = [index: number, option: ProductVariantOption, val: string]

export function useProduct({
    product,
}: {
    product: ShopifyProduct
}): [SelectedOptions, (...args: setOptionAtIndexArgs) => void, ProductVariantSelection[], ShopifyProductVariant] {
    const { options, variants } = product

    const initialVariant = variants.find((v) => v.availableForSale) || variants[0]

    const [selectedOptions, setSelectedOptions] = useState(
        options.map((_, index) =>
            getVariantOption({
                name: options[index].name,
                variant: initialVariant,
                options: options,
            })
        )
    )

    const [selectedVariant, setSelectedVariant] = useState(initialVariant)

    const selections = selectedOptions.map((so) => so.selected).filter(Boolean) as ProductVariantSelection[]

    const setOptionAtIndex = (...args: setOptionAtIndexArgs) => {
        const [index, option, val] = args
        const newVariant =
            variants.find(
                (variant) => variant.selectedOptions.findIndex((o) => o.name === option.name && o.value === val) > -1
            ) || product.variants[0]

        setSelectedVariant(newVariant)

        setSelectedOptions((prev) =>
            prev.map((opt, idx) =>
                idx === index
                    ? getVariantOption({
                          name: option.name,
                          variant: newVariant,
                          options: options,
                      })
                    : opt
            )
        )
    }

    return [selectedOptions, setOptionAtIndex, selections, selectedVariant]
}
