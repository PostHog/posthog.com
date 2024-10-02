import { IconDatabase, IconFlask, IconGraph, IconMessage, IconRewindPlay, IconToggle } from '@posthog/icons'
import { allProductsData } from 'components/Pricing/Pricing'
import { calculatePrice } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import { useStaticQuery } from 'gatsby'
import { useMemo, useState } from 'react'

const initialProducts = [
    {
        Icon: IconGraph,
        name: 'Analytics',
        type: 'product_analytics',
        color: 'blue',
        slider: {
            marks: [0, MILLION, TEN_MILLION, FIFTY_MILLION, MAX_PRODUCT_ANALYTICS],
            min: 0,
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
        volume: 5000,
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
        volume: 1000000,
    },
    {
        Icon: IconFlask,
        name: 'Experiments',
        type: 'feature_flags',
        color: 'purple',
        billedWith: 'Feature flags',
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
        volume: 250,
    },
    {
        Icon: IconDatabase,
        name: 'Data warehouse',
        type: 'data_warehouse',
        color: 'purple',
        slider: {
            marks: [1000000, 10000000, 100000000, 1000000000],
            min: 1000000,
            max: 1000000000,
        },
        volume: 1000000,
    },
]

export default function useProducts() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const [products, setProducts] = useState(
        initialProducts.map((product) => {
            const billingData = billingProducts.find((billingProduct: any) => billingProduct.type === product.type)
            const paidPlan = billingData?.plans.find((plan: any) => plan.tiers)
            const startsAt = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')?.unit_amount_usd
            const freeLimit = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to
            return {
                ...product,
                cost: 0,
                billingData,
                costByTier: calculatePrice(product.volume || 0, paidPlan?.tiers).costByTier,
                freeLimit,
                startsAt: startsAt.length <= 3 ? Number(startsAt).toFixed(2) : startsAt,
            }
        })
    )

    const monthlyTotal = useMemo(() => products.reduce((acc, product) => acc + product.cost, 0), [products])

    const setProduct = (type, data) => {
        setProducts((products) =>
            products.map((product) => {
                if (product.type === type && !product.billedWith) {
                    return {
                        ...product,
                        ...data,
                    }
                }
                return product
            })
        )
    }

    const setVolume = (type: string, volume: number) => {
        const rounded = Math.round(volume)
        const product = products.find((product) => product.type === type)
        const { total, costByTier } = calculatePrice(
            rounded,
            product?.billingData.plans.find((plan: any) => plan.tiers)?.tiers
        )
        setProduct(type, {
            volume: rounded,
            cost: total,
            costByTier,
        })
    }

    return { products, setVolume, setProduct, monthlyTotal }
}
