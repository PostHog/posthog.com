import React from 'react'
import { IconAsterisk } from '@posthog/icons'
import { getTool } from '../../data/tools'

// Data modeling has no product page. It will be billed as data warehouse, but that rate
// is not final, so the pricing page shows no price. Same shape as Marketing analytics
// (`billedWith`), without a parent billing product to inherit a rate from.
export const dataModeling = {
    ...getTool('data_modeling'),
    name: 'Data Modeling',
    parentIcon: 'dataBlender',
    Icon: IconAsterisk,
    type: 'data_modeling',
    color: 'red',
    colorSecondary: 'red',
    seo: {
        title: 'Transform, enrich, and model your data',
        description: 'Get your data in the exact shape you need it.',
    },
    // No docs page of its own. The docs app list links every useProducts entry.
    hideFromAppsList: true,
    billingDescription: <p className="m-0">Billed with data warehouse. Free for now.</p>,
    billedWith: 'Data warehouse',
    freeAllocationText: 'Free for now',
}
