import React from 'react'
import { IconGraph, IconRewindPlay, IconWarning } from '@posthog/icons'
import { cn } from '../../../../utils'

export const IOS_SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 } as const

export type ProductKey = 'analytics' | 'replay' | 'errors'
export type ExternalKey = 'stripe' | 'zendesk' | 'hubspot'
export type SourceKey = ProductKey | ExternalKey

const CLOUDINARY = 'https://res.cloudinary.com/dmukukwp6/image/upload'

const PRODUCTS: Record<
    ProductKey,
    { Icon: React.ComponentType<{ className?: string }>; className: string; color: string }
> = {
    analytics: { Icon: IconGraph, className: 'text-blue', color: '#2F80FA' },
    replay: { Icon: IconRewindPlay, className: 'text-yellow', color: '#F7A501' },
    errors: { Icon: IconWarning, className: 'text-orange', color: '#EB9D2A' },
}

export const EXTERNAL_SOURCES: { key: ExternalKey; label: string; logo: string; color: string; wide?: boolean }[] = [
    {
        key: 'stripe',
        label: 'Stripe',
        logo: `${CLOUDINARY}/Stripe_Logo_revised_2016_24183d3284.svg`,
        color: '#635BFF',
        wide: true,
    },
    { key: 'zendesk', label: 'Zendesk', logo: `${CLOUDINARY}/zendesk_icon_f56707bc5c.svg`, color: '#1F7A6E' },
    { key: 'hubspot', label: 'HubSpot', logo: `${CLOUDINARY}/hubspot_1_f8248c008e.svg`, color: '#FF7A59' },
]

export const ProductIcon = ({ source, className = 'size-4' }: { source: ProductKey; className?: string }) => {
    const { Icon, className: colorClass } = PRODUCTS[source]
    return <Icon className={cn(className, colorClass)} />
}
