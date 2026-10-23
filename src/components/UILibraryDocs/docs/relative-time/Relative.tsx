import React, { useEffect, useState } from 'react'
import { RelativeTime } from 'components/UI/RelativeTime'

const offsets = [
    { label: 'Seconds', milliseconds: 15_000 },
    { label: 'Minutes', milliseconds: 5 * 60_000 },
    { label: 'Yesterday', milliseconds: 24 * 60 * 60_000 },
    { label: 'Days', milliseconds: 3 * 24 * 60 * 60_000 },
    { label: 'Years', milliseconds: 2 * 365 * 24 * 60 * 60_000 },
]

export default function Relative(): JSX.Element {
    const [now, setNow] = useState<number | null>(null)
    useEffect(() => setNow(Date.now()), [])
    return (
        <dl className="flex flex-col gap-3">
            {offsets.map(({ label, milliseconds }) => (
                <div key={label} className="flex flex-wrap gap-3">
                    <dt className="text-secondary">{label}</dt>
                    <dd className="m-0">
                        {now === null ? 'Loading example…' : <RelativeTime date={now - milliseconds} />}
                    </dd>
                </div>
            ))}
        </dl>
    )
}
