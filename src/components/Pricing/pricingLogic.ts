import { kea } from 'kea'
import { BillingProductV2Type, BillingV2PlanType } from 'types'

import type { pricingLogicType } from './pricingLogicType'

export const TEN_THOUSAND = 10000
export const ONE_FIFTY_THOUSAND = 150000
export const MILLION = 1000000
export const THREE_MILLION = 3000000
export const FIVE_MILLION = 5000000
export const TEN_MILLION = 10000000
export const TWENTY_MILLION = 20000000
export const TWENTY_FIVE_MILLION = 25000000
export const FIFTY_MILLION = 50000000
export const HUNDRED_MILLION = 100000000
export const BILLION = 1000000000
export const MAX_PRODUCT_ANALYTICS = FIFTY_MILLION
export const MAX_SESSION_REPLAY = ONE_FIFTY_THOUSAND
export const MAX_FEATURE_FLAGS = TEN_MILLION
export const MAX_SURVEYS = TEN_THOUSAND

export const product_type_to_max_events = {
    product_analytics: MAX_PRODUCT_ANALYTICS,
    session_replay: MAX_SESSION_REPLAY,
    feature_flags: MAX_FEATURE_FLAGS,
    surveys: MAX_SURVEYS,
}

export const pricingLogic = kea<pricingLogicType>({
    actions: {
        setAvailablePlans: (plans: BillingV2PlanType[]) => ({ plans }),
    },
    loaders: ({ actions }) => ({
        availableProducts: [
            [] as BillingProductV2Type[],
            {
                loadAvailableProducts: async () => {
                    const url = `${process.env.BILLING_SERVICE_URL + '/api/products-v2'}`
                    const headers = {
                        'Content-Type': 'application/json',
                    }
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: headers,
                    })
                    return response.json().then((data) => {
                        actions.setAvailablePlans(data.products?.[0]?.plans)
                        return data.products
                    })
                },
            },
        ],
    }),
    reducers: {
        availablePlans: [
            [] as BillingV2PlanType[],
            {
                setAvailablePlans: (_, { plans }: { plans: BillingV2PlanType[] }) => plans,
            },
        ],
    },
    events: ({ actions }) => ({
        afterMount: () => {
            actions.loadAvailableProducts()
        },
    }),
})
