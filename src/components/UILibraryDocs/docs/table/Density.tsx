import React from 'react'
import { Table } from 'components/UI/Table'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'

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
                <div key={density} className="flex min-w-0 flex-col gap-2">
                    <DemoLabel>{density}</DemoLabel>
                    <Table.Root density={density} striped aria-label={`${density} rows`}>
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
                </div>
            ))}
        </div>
    )
}
