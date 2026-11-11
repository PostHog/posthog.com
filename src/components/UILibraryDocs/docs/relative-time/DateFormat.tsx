import React from 'react'
import { RelativeTime } from 'components/UI/RelativeTime'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function DateFormat(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="en-US (default)">
                <RelativeTime date="2024-06-15T14:30:00Z" format="date" />
            </DemoRow>
            <DemoRow label="fr-FR">
                <RelativeTime date="2024-06-15T14:30:00Z" format="date" locale="fr-FR" />
            </DemoRow>
        </DemoRows>
    )
}
