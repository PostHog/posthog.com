import React from 'react'
import { IconCheck } from '@posthog/icons'
import { Badge } from 'components/UI/Badge'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function WithIcon(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Icon">
                <Badge color="green" icon={<IconCheck />}>
                    Beta
                </Badge>
            </DemoRow>
            <DemoRow label="128px wide">
                <div className="flex w-32 min-w-0 rounded border border-dashed border-[rgb(var(--text-primary)/0.2)] p-1">
                    <Badge title="A long release label that exceeds the available space">
                        A long release label that exceeds the available space
                    </Badge>
                </div>
            </DemoRow>
        </DemoRows>
    )
}
