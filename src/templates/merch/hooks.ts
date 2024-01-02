import { useState } from 'react'
import type { ProductVariantOption, ProductVariantSelection, ShopifyProduct, ShopifyProductVariant } from './types'

type getVariantOptionArgs = {
    name: string
    variant: ShopifyProductVariant | undefined
    options: ProductVariantOption[]
}

function getVariantOption({ name, variant, options }: getVariantOptionArgs):
    | { selectedValue: null; selected: null; option: null }
    | {
          selectedValue: string
          selected: ProductVariantSelection | undefined
          option: ProductVariantOption | undefined
      } {
    if (!variant) {
        return { selectedValue: null, selected: null, option: null }
    }

    const variantOption = options.find((opt) => opt.name.toLowerCase() === name.toLowerCase() || null)

    const initialVariantOptionValue = variant?.selectedOptions?.find(
        (o) => o.name.toLowerCase() === name?.toLowerCase()
    )?.value

    const initialVariantOption = variantOption?.values.find((value) => value === initialVariantOptionValue)

    const selectedValue = initialVariantOption === 'Default Title' ? null : initialVariantOption ?? null

    let selected
    if (name && selectedValue) {
        selected = { name, value: selectedValue }
    }

    return { selectedValue, selected, option: variantOption }
}

export function useProduct({
    product,
}: {
    product: ShopifyProduct
}): [ProductVariantOption[], void, ProductVariantSelection, ShopifyProductVariant] {
    const { options, variants } = product

    const initialVariant = variants.find((v) => v.availableForSale)

    const [selectedOptions, setSelectedOptions] = useState(
        options.map((_, index) =>
            getVariantOption({
                name: options[index]?.name,
                variant: initialVariant,
                options: options,
            })
        )
    )

    const [selectedVariant, setSelectedVariant] = useState(initialVariant)

    const selections = selectedOptions.map((so) => so.selected).filter(Boolean)

    const setOptionAtIndex = (index: number, option: ProductVariantOption, val: string) => {
        const newVariant = selections.length
            ? variants.find(
                  (variant) => variant.selectedOptions.findIndex((o) => o.name === option.name && o.value === val) > -1
              )
            : product.variants[0]

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

    // return the selected options and the function to modify an option at a specific index
    return [selectedOptions, setOptionAtIndex, selections, selectedVariant]
}
