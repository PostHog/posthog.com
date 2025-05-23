import { useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'

export const usePlatform = () => {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const product = billingProducts.find((product) => product.type === 'platform_and_support')

    const addons = product.addons.filter((addon: any) => !addon.legacy_product)
    product.addons = addons

    return product
}
