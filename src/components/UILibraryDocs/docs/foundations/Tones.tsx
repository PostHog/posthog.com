import React from 'react'
import { Badge } from 'components/UI/Badge'
import { Note } from 'components/UI/Note'
import { statusColors } from 'components/UI/colors'
import type { StatusAlias } from 'components/UI/colors'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const statuses: StatusAlias[] = ['info', 'success', 'warning', 'error']

export default function Tones(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="soft · many labels">
                {statuses.map((status) => (
                    <Badge key={status} appearance="soft" color={statusColors[status]}>
                        {status}
                    </Badge>
                ))}
            </DemoRow>
            <DemoRow label="solid · one label">
                {statuses.map((status) => (
                    <Badge key={status} appearance="solid" color={statusColors[status]}>
                        {status}
                    </Badge>
                ))}
            </DemoRow>
            <DemoRow label="Message" fill>
                <Note.Root color="error" size="sm">
                    <Note.Title>Payment failed</Note.Title>
                    Errors use coral everywhere. Destructive buttons keep their own red.
                </Note.Root>
            </DemoRow>
        </DemoRows>
    )
}
