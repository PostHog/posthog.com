import { useStaticQuery } from 'gatsby'
import { allProductsData } from '../Pricing'

export const usePlatform = () => {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    return billingProducts.find((product) => product.type === 'platform_and_support')
}
