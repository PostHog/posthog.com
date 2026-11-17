import React from 'react'
import { IconFlask } from '@posthog/icons'
import { Badge } from 'components/UI/Badge'

export default function BadgeLinks(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Badge href="/docs/feature-flags" color="blue">
                Feature flags
            </Badge>
            <Badge href="/roadmap" color="purple" icon={<IconFlask />}>
                Beta
            </Badge>
            <Badge href="/pricing" color="green" appearance="soft">
                Free tier
            </Badge>
        </div>
    )
}
