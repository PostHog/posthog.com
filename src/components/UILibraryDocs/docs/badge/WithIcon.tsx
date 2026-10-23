import React from 'react'
import { IconCheck } from '@posthog/icons'
import { Badge } from 'components/UI/Badge'

export default function WithIcon(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Badge tone="success" icon={<IconCheck />}>
                Beta
            </Badge>
            <div className="flex w-32 min-w-0">
                <Badge title="A long release label that exceeds the available space">
                    A long release label that exceeds the available space
                </Badge>
            </div>
        </div>
    )
}
