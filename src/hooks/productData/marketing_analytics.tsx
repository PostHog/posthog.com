import React from 'react'
import { IconMegaphone } from '@posthog/icons'

// Marketing analytics lives inside web analytics and has no product page of its own. Its ad
// platform data comes in through Sources, so usage is billed as rows synced. Listed here so the
// pricing table and calculator show it as "Billed with Sources", the same way Evaluations point
// at AI Observability.
export const marketingAnalytics = {
    name: 'Marketing analytics',
    Icon: IconMegaphone,
    description: 'Measure ad spend and ROAS across your marketing channels.',
    handle: 'marketing_analytics',
    type: 'marketing_analytics',
    color: 'orange',
    colorSecondary: 'orange',
    category: 'analytics',
    slug: 'web-analytics',
    // No landing page of its own, so product links go to its docs instead of /web-analytics.
    url: '/docs/web-analytics/marketing-analytics',
    status: 'beta',
    // Ad platform syncs are billed as Sources (`data_warehouse`) rows.
    billingType: 'data_warehouse',
    // Keeps it sorted next to Sources in the pricing calculator.
    sharesFreeTier: 'data_warehouse',
    freeAllocationText: 'Shared with Sources',
    billingDescription: (
        <p className="m-0">
            Marketing analytics is in beta. Syncing data from your ad platforms counts as Sources rows, so it shares
            Sources' pricing and free tier.
        </p>
    ),
    billedWith: 'Sources',
    billedWithSlug: 'warehouse',
}
