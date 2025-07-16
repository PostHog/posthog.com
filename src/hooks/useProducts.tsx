import React from 'react'
import { calculatePrice } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { graphql, useStaticQuery } from 'gatsby'
import { useMemo, useState } from 'react'

// Import individual product data
import { productAnalytics } from './productData/product_analytics'
import { sessionReplay } from './productData/session_replay'
import { featureFlags } from './productData/feature_flags'
import { surveys } from './productData/surveys'
import { dataWarehouse } from './productData/data_warehouse'
import { errorTracking } from './productData/error_tracking'
import { cdp } from './productData/cdp'
import { webAnalytics } from './productData/web_analytics'
import { experiments } from './productData/experiments'

const initialProducts = [
    productAnalytics,
    sessionReplay,
    featureFlags,
    surveys,
    dataWarehouse,
    errorTracking,
    cdp,
    webAnalytics,
    experiments,
]

export default function useProducts() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const [products, setProducts] = useState(
        initialProducts.map((product) => {
            const billingData = billingProducts.find((billingProduct: any) => billingProduct.type === product.handle)
            const paidPlan = billingData?.plans.find((plan: any) => plan.tiers)
            const startsAt = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')?.unit_amount_usd
            const freeLimit = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to
            const unit = billingData?.unit
            return {
                ...product,
                cost: 0,
                billingData,
                costByTier: paidPlan?.tiers
                    ? calculatePrice((product as any).volume || 0, paidPlan.tiers).costByTier
                    : [],
                freeLimit,
                startsAt: startsAt && startsAt.length <= 3 ? Number(startsAt).toFixed(2) : startsAt,
                unit,
            }
        })
    )

    const monthlyTotal = useMemo(() => products.reduce((acc, product) => acc + product.cost, 0), [products])

    const setProduct = (handle: string, data: any) => {
        setProducts((products) =>
            products.map((product) => {
                if (product.handle === handle && !(product as any).billedWith) {
                    return {
                        ...product,
                        ...data,
                    }
                }
                return product
            })
        )
    }

    const setVolume = (handle: string, volume: number) => {
        const rounded = Math.round(volume)
        const product = products.find((product) => product.handle === handle)
        const { total, costByTier } = calculatePrice(
            rounded,
            product?.billingData.plans.find((plan: any) => plan.tiers)?.tiers
        )
        setProduct(handle, {
            volume: rounded,
            cost: total,
            costByTier,
        })
    }

    return { products, setVolume, setProduct, monthlyTotal }
}

const allProductsData = graphql`
    query {
        allProductData {
            nodes {
                products {
                    description
                    docs_url
                    image_url
                    icon_key
                    inclusion_only
                    contact_support
                    addons {
                        contact_support
                        description
                        docs_url
                        image_url
                        icon_key
                        inclusion_only
                        name
                        type
                        unit
                        legacy_product
                        features {
                            key
                            name
                            description
                            category
                            limit
                            note
                            entitlement_only
                            is_plan_default
                            unit
                        }
                        plans {
                            description
                            docs_url
                            image_url
                            name
                            plan_key
                            product_key
                            unit
                            flat_rate
                            unit_amount_usd
                            features {
                                key
                                name
                                description
                                category
                                limit
                                note
                                entitlement_only
                                is_plan_default
                                unit
                            }
                            tiers {
                                current_amount_usd
                                current_usage
                                flat_amount_usd
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                    name
                    type
                    unit
                    usage_key
                    legacy_product
                    plans {
                        description
                        docs_url
                        features {
                            key
                            name
                            description
                            category
                            limit
                            note
                            entitlement_only
                            is_plan_default
                            unit
                        }
                        free_allocation
                        image_url
                        included_if
                        name
                        plan_key
                        product_key
                        contact_support
                        unit_amount_usd
                        tiers {
                            current_amount_usd
                            current_usage
                            flat_amount_usd
                            unit_amount_usd
                            up_to
                        }
                        unit
                    }
                }
            }
        }
    }
`
