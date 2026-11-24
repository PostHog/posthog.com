import React from 'react'
import { IconClockRewind, IconColumns, IconMemory, IconRefresh, IconShield } from '@posthog/icons'
import { Card } from 'components/UI/Card'

const POINTS = [
    {
        title: 'Schema changes, handled',
        description: 'Someone adds a column upstream, and the sync keeps going.',
        icon: IconColumns,
    },
    {
        title: 'Retries and rate limits',
        description: "We deal with flaky APIs and rate limits, so you don't have to write backoff logic.",
        icon: IconRefresh,
    },
    {
        title: 'Incremental syncs that scale',
        description: 'Incremental syncs only move rows that changed since the last run.',
        icon: IconClockRewind,
    },
    {
        title: 'Reliable volume syncs',
        description: "Memory scales with the batch, so a 500M-row table doesn't need a huge machine.",
        icon: IconMemory,
    },
    {
        title: 'Security you can tick off',
        description:
            'We encrypt credentials at rest, and you can connect with a read-only user. SOC 2 certified, EU data residency, and a HIPAA BAA if you need one.',
        icon: IconShield,
    },
]

export default function SourcesPlumbing(): JSX.Element {
    return (
        <section className="not-prose">
            <h2 className="m-0 text-2xl font-bold text-primary @2xl/reader-content:text-3xl">
                Leave the plumbing to us
            </h2>
            <p className="mb-0 mt-3 max-w-prose text-lg text-secondary">
                Setting up a sync takes minutes. Keeping it running is the part we take off your hands.
            </p>
            <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 @2xl/reader-content:grid-cols-2">
                {POINTS.map((point) => {
                    const Icon = point.icon
                    return (
                        <li key={point.title}>
                            <Card.Root className="h-full">
                                <Card.TitleBar icon={<Icon className="text-muted" />}>{point.title}</Card.TitleBar>
                                <Card.Description>{point.description}</Card.Description>
                            </Card.Root>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
