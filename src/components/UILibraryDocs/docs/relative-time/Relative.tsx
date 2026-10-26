import React from 'react'
import { RelativeTime, useNow } from 'components/UI/RelativeTime'

const offsets = [
    { label: 'Seconds', milliseconds: 15_000 },
    { label: 'Minutes', milliseconds: 5 * 60_000 },
    { label: 'Yesterday', milliseconds: 24 * 60 * 60_000 },
    { label: 'Days', milliseconds: 3 * 24 * 60 * 60_000 },
    { label: 'Years', milliseconds: 2 * 365 * 24 * 60 * 60_000 },
]

export default function Relative(): JSX.Element {
    const now = useNow()
    return (
        <dl className="flex flex-col gap-3">
            {offsets.map(({ label, milliseconds }) => (
                <div key={label} className="flex flex-wrap gap-3">
                    <dt className="text-secondary">{label}</dt>
                    <dd className="m-0">{now !== null && <RelativeTime date={now - milliseconds} />}</dd>
                </div>
            ))}
        </dl>
    )
}
