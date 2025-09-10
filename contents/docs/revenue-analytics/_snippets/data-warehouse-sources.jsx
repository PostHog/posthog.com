import React from 'react'
import List from 'components/List'

const DataWarehouseSources = () => {
    const platforms = [
        {
            label: 'Stripe',
            title: 'Stripe',
            url: '/docs/cdp/sources/stripe',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/stripe_5_M7_G5_HUZ_78e9db283e.png',
        },
        {
            label: 'Chargebee',
            title: 'Chargebee',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/chargebee_DYJTQLJ_4_61eab736bc.png',
            badge: 'Coming soon',
        },
        {
            label: 'Polar',
            title: 'Polar', 
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/polar_AOGZF_3_CR_261be8507a.png',
            badge: 'Coming soon',
        },
        {
            label: 'RevenueCat',
            title: 'RevenueCat',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/revenuecat_WQJWO_62_R_b8d6cc4f49.png',
            badge: 'Coming soon',
        },
    ]

    return <List className="grid sm:grid-cols-2" items={platforms} />
}
export default DataWarehouseSources
