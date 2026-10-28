import React from 'react'
import { RelativeTime, useNow } from 'components/UI/RelativeTime'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const offsets = [
    { label: 'Seconds ago', milliseconds: 15_000 },
    { label: 'Minutes ago', milliseconds: 5 * 60_000 },
    { label: 'Yesterday', milliseconds: 24 * 60 * 60_000 },
    { label: 'Days ago', milliseconds: 3 * 24 * 60 * 60_000 },
    { label: 'Years ago', milliseconds: 2 * 365 * 24 * 60 * 60_000 },
]

export default function Relative(): JSX.Element {
    const now = useNow()
    return (
        <DemoRows>
            {offsets.map(({ label, milliseconds }) => (
                <DemoRow key={label} label={label}>
                    {now !== null && <RelativeTime date={now - milliseconds} />}
                </DemoRow>
            ))}
        </DemoRows>
    )
}
