import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'

interface PaymentPlatformsProps {
    columns?: 2 | 3 | 4
}

const PaymentPlatforms = ({ columns = 2 }: PaymentPlatformsProps) => {
    const columnClassMap = {
        2: '@md:grid-cols-2',
        3: '@md:grid-cols-3',
        4: '@md:grid-cols-4',
    }

    const platforms = usePlatformList('docs/revenue-analytics/payment-platforms', 'payment platform')

    // Add "Coming soon" platforms that don't have dedicated pages
    const comingSoonPlatforms = [
        {
            label: 'Chargebee',
            url: '#',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/chargebee_DYJTQLJ_4_61eab736bc.png',
            badge: 'Coming soon',
        },
        {
            label: 'Polar',
            url: '#',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/polar_AOGZF_3_CR_261be8507a.png',
            badge: 'Coming soon',
        },
        {
            label: 'RevenueCat',
            url: '#',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/revenuecat_WQJWO_62_R_b8d6cc4f49.png',
            badge: 'Coming soon',
        },
    ]

    return (
        <List
            className={`grid gap-4 grid-cols-2 ${columnClassMap[columns]} not-prose`}
            items={[...platforms, ...comingSoonPlatforms]}
        />
    )
}
export default PaymentPlatforms
