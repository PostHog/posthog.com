import React from 'react'
import { Table } from 'components/UI/Table'

const events = [
    { name: '$pageview', count: '48,210' },
    { name: '$autocapture', count: '31,904' },
    { name: 'insight viewed', count: '6,412' },
]

export default function Surfaces(): JSX.Element {
    return (
        <div className="grid gap-5 @[52rem]:grid-cols-3">
            {(['plain', 'outlined', 'raised'] as const).map((surface) => (
                <div key={surface} className="flex min-w-0 flex-col gap-2">
                    <span className="text-sm font-medium capitalize text-secondary">{surface}</span>
                    <Table.Root surface={surface}>
                        <Table.Header>
                            <Table.Row>
                                <Table.Head>Event</Table.Head>
                                <Table.Head align="end">This week</Table.Head>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {events.map(({ name, count }) => (
                                <Table.Row key={name}>
                                    <Table.Cell>{name}</Table.Cell>
                                    <Table.Cell align="end">{count}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>
            ))}
        </div>
    )
}
