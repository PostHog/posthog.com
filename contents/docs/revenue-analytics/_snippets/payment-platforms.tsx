import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'
import { getLogo } from 'constants/logos'

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
            image: getLogo('chargebee'),
            badge: 'Coming soon',
        },
        {
            label: 'Polar',
            url: '#',
            image: getLogo('polar'),
            badge: 'Coming soon',
        },
        {
            label: 'RevenueCat',
            url: '#',
            image: getLogo('revenuecat'),
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
