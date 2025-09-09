import React from 'react'
import List from 'components/List'

const DataWarehouseSources = () => {
    const platforms = [
        {
            label: 'Stripe',
            title: 'Stripe',
            url: '/docs/cdp/sources/stripe',
            image: 'https://app.posthog.com/static/assets/stripe-5M7G5HUZ.png',
        },
        {
            label: 'Chargebee',
            title: 'Chargebee',
            image: 'https://app.posthog.com/static/assets/chargebee-DYJTQLJ4.png',
            badge: 'Coming soon',
        },
        {
            label: 'Polar',
            title: 'Polar', 
            image: 'https://app.posthog.com/static/assets/polar-AOGZF3CR.png',
            badge: 'Coming soon',
        },
        {
            label: 'RevenueCat',
            title: 'RevenueCat',
            image: 'https://app.posthog.com/static/assets/revenuecat-WQJWO62R.png',
            badge: 'Coming soon',
        },
    ]

    return <List className="grid sm:grid-cols-2" items={platforms} />
}
export default DataWarehouseSources
