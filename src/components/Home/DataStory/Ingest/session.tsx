import React from 'react'
import { IconGraph, IconRewindPlay, IconWarning } from '@posthog/icons'
import { cn } from '../../../../utils'
import { LOGOS } from '../../../../constants/logos'

type ProductKey = 'analytics' | 'replay' | 'errors'
type ExternalKey = 'stripe' | 'zendesk' | 'hubspot'
export type SourceKey = ProductKey | ExternalKey

const PRODUCTS: Record<ProductKey, { Icon: React.ComponentType<{ className?: string }>; className: string }> = {
    analytics: { Icon: IconGraph, className: 'text-blue' },
    replay: { Icon: IconRewindPlay, className: 'text-yellow' },
    errors: { Icon: IconWarning, className: 'text-orange' },
}

export const EXTERNAL_SOURCES: { key: ExternalKey; logo: string; wide?: boolean }[] = [
    { key: 'stripe', logo: LOGOS.stripe, wide: true },
    { key: 'zendesk', logo: LOGOS.zendesk },
    { key: 'hubspot', logo: LOGOS.hubspot },
]

export const ProductIcon = ({ source, className = 'size-4' }: { source: ProductKey; className?: string }) => {
    const { Icon, className: colorClass } = PRODUCTS[source]
    return <Icon className={cn('[&_[clip-path]]:![clip-path:none]', className, colorClass)} />
}
