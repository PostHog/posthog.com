import { IconFlask, IconGraph, IconMessage, IconRewindPlay, IconToggle } from '@posthog/icons'
import { allProductsData } from 'components/Pricing/Pricing'
import { calculatePrice } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import { useStaticQuery } from 'gatsby'
import { useEffect, useMemo, useState } from 'react'

const getTotalAnalyticsVolume = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce((acc, key) => acc + analyticsData[key].volume, 0)
}

const getTotalAnalyticsCost = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce((acc, key) => acc + analyticsData[key].cost, 0)
}

const getTotalEnhancedPersonsVolume = (analyticsData: any) => {
    return Object.keys(analyticsData).reduce(
        (acc, key) => acc + (analyticsData[key].enhanced ? analyticsData[key].volume : 0),
        0
    )
}

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
        volume: MILLION,
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
        name: 'A/B testing',
        type: 'feature_flags',
        color: 'purple',
        volume: 1000000,
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
]

export default function useProducts() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const [analyticsData, setAnalyticsData] = useState({
        websiteAnalyticsEvents: {
            volume: 0,
            cost: 0,
        },
        productAnalyticsEvents: {
            volume: 0,
            enhanced: true,
            cost: 0,
        },
        mobileAppAnonymousEvents: {
            volume: 0,
            cost: 0,
        },
        mobileAppAuthenticatedEvents: {
            volume: 0,
            enhanced: true,
            cost: 0,
        },
    })

    const [products, setProducts] = useState(
        initialProducts.map((product) => ({
            ...product,
            cost: 0,
            billingData: billingProducts.find((billingProduct: any) => billingProduct.type === product.type),
        }))
    )

    const productAnalyticsProduct = useMemo(() => products.find((product) => product.type === 'product_analytics'), [])
    const productAnalyticsTiers = useMemo(
        () => productAnalyticsProduct?.billingData.plans.find((plan) => plan.tiers).tiers,
        []
    )
    const enhancedPersonsAddonTiers = useMemo(
        () =>
            productAnalyticsProduct?.billingData.addons
                .find((addon) => addon.type === 'enhanced_persons')
                .plans.find((plan) => plan.tiers).tiers,
        []
    )
    const monthlyTotal = useMemo(() => products.reduce((acc, product) => acc + product.cost, 0), [products])

    const setProduct = (type, data) => {
        setProducts((products) =>
            products.map((product) => {
                if (product.type === type) {
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
        setProduct(type, {
            volume: rounded,
            cost: calculatePrice(rounded, product.billingData.plans.find((plan: any) => plan.tiers)?.tiers),
        })
    }

    const setAnalyticsVolume = (type: string, volume: number) => {
        setAnalyticsData((data) => {
            const newAnalyticsData = {
                ...data,
                [type]: {
                    ...data[type],
                    volume: Math.round(volume),
                },
            }
            const totalProductAnalyticsVolume = getTotalAnalyticsVolume(newAnalyticsData)
            const totalCost = calculatePrice(totalProductAnalyticsVolume, productAnalyticsTiers)
            const totalEnhancedPersonsVolume = getTotalEnhancedPersonsVolume(newAnalyticsData)
            const totalEnhancedPersonsCost = calculatePrice(totalEnhancedPersonsVolume, enhancedPersonsAddonTiers)
            Object.keys(newAnalyticsData).forEach((key) => {
                const volume = newAnalyticsData[key].volume
                const percentageOfTotalVolume = (volume / totalProductAnalyticsVolume) * 100
                let cost = (percentageOfTotalVolume / 100) * totalCost
                if (newAnalyticsData[key].enhanced) {
                    const percentageOfEnhancedPersonsVolume = (volume / totalEnhancedPersonsVolume) * 100
                    const enhancedPersonsCost = (percentageOfEnhancedPersonsVolume / 100) * totalEnhancedPersonsCost
                    cost += enhancedPersonsCost
                }
                newAnalyticsData[key].cost = cost || 0
            })
            return newAnalyticsData
        })
    }

    useEffect(() => {
        const totalAnalyticsCost = getTotalAnalyticsCost(analyticsData)
        const totalAnalyticsVolume = getTotalAnalyticsVolume(analyticsData)
        setProduct('product_analytics', { cost: totalAnalyticsCost, volume: totalAnalyticsVolume })
    }, [analyticsData])

    return { products, setVolume, analyticsData, setAnalyticsVolume, monthlyTotal }
}
