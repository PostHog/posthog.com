import { kea } from 'kea'
import { BillingProductV2Type, BillingV2PlanType } from 'types'

import type { pricingLogicType } from './pricingLogicType'

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
