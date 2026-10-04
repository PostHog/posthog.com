import { billingProducts } from '../Pricing'

export const usePlatform = () => {
    const product = billingProducts.find((product) => product.type === 'platform_and_support')!

    const addons = (product.addons ?? []).filter((addon) => !addon.legacy_product)
    product.addons = addons

    return product as typeof product & { addons: typeof addons }
}
