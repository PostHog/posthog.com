import { useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'

export const usePlatform = () => {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const product = billingProducts.find((product) => product.type === 'platform_and_support')

    // Note(@zach): Filter out the enterprise add-on until we are ready to show it
    const addons = product?.addons.filter((addon) => addon.name !== 'Enterprise')
    product.addons = addons

    return product
}
