import React from 'react'
import { Table } from 'components/UI/Table'

const events = [
    { name: '$pageview', count: '1,284,302' },
    { name: '$autocapture', count: '902,118' },
    { name: '$identify', count: '64,930' },
    { name: '$feature_flag_called', count: '41,207' },
]

export default function Density(): JSX.Element {
    return (
        <div className="grid gap-5 @[44rem]:grid-cols-2">
            {(['default', 'compact'] as const).map((density) => (
                <Table.Root key={density} density={density} striped>
                    <Table.Caption>{density === 'compact' ? 'Compact rows' : 'Default rows'}</Table.Caption>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Event</Table.Head>
                            <Table.Head align="end">Last 30 days</Table.Head>
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
            ))}
        </div>
    )
}
