import { IconFlask, IconGraph, IconMessage, IconRewindPlay, IconToggle } from '@posthog/icons'
import { allProductsData } from 'components/Pricing/Pricing'
import { sliderCurve } from 'components/Pricing/PricingSlider/Slider'
import { calculatePrice } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import { useStaticQuery } from 'gatsby'
import { useState } from 'react'

const initialProducts = [
    {
        Icon: IconGraph,
        name: 'Analytics',
        type: 'product_analytics',
        color: 'blue',
        slider: {
            marks: [MILLION, TEN_MILLION, FIFTY_MILLION, MAX_PRODUCT_ANALYTICS],
            min: MILLION,
            max: MAX_PRODUCT_ANALYTICS,
        },
    },
    {
        Icon: IconRewindPlay,
        name: 'Session replay',
        type: 'session_replay',
        color: 'yellow',
        slider: {
            marks: [5000, 25000, 120000, 500000],
            min: 5000,
            max: 500000,
        },
    },
    {
        Icon: IconToggle,
        name: 'Feature flags',
        type: 'feature_flags',
        color: 'green',
        slider: {
            marks: [1000000, 10000000, 100000000, 1000000000],
            min: 1000000,
            max: 1000000000,
        },
    },
    {
        Icon: IconFlask,
        name: 'A/B testing',
        type: 'feature_flags',
        color: 'purple',
    },
    {
        Icon: IconMessage,
        name: 'Surveys',
        type: 'surveys',
        color: 'red',
        slider: {
            marks: [250, 2000, 15000, 100000],
            min: 250,
            max: 100000,
        },
    },
]

export default function useProducts() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const [products, setProducts] = useState(
        initialProducts.map((product) => ({
            ...product,
            cost: 0,
            volume: null as number | null,
            billingData: billingProducts.find((billingProduct: any) => billingProduct.type === product.type),
        }))
    )

    const setVolume = (type: string, volume: number) => {
        setProducts((products) =>
            products.map((product) => {
                if (product.type === type) {
                    return {
                        ...product,
                        volume,
                        cost: calculatePrice(
                            sliderCurve(volume),
                            product.billingData.plans.find((plan: any) => plan.tiers)?.tiers
                        ),
                    }
                }
                return product
            })
        )
    }

    return { products, setVolume }
}
