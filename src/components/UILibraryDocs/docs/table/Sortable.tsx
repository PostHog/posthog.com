import React, { useState } from 'react'
import { Table } from 'components/UI/Table'
import type { TableSort } from 'components/UI/Table'

type Column = 'name' | 'count'

const events = [
    { name: '$pageview', count: 48210 },
    { name: 'insight viewed', count: 6412 },
    { name: '$autocapture', count: 31904 },
    { name: 'dashboard viewed', count: 3870 },
    { name: 'survey sent', count: 912 },
]

export default function Sortable(): JSX.Element {
    const [column, setColumn] = useState<Column>('count')
    const [direction, setDirection] = useState<Exclude<TableSort, 'none'>>('descending')

    const sortBy = (next: Column) => {
        if (next === column) {
            setDirection(direction === 'ascending' ? 'descending' : 'ascending')
            return
        }
        setColumn(next)
        setDirection(next === 'count' ? 'descending' : 'ascending')
    }

    const sortFor = (key: Column): TableSort => (key === column ? direction : 'none')

    const rows = [...events].sort((a, b) => {
        const order = column === 'name' ? a.name.localeCompare(b.name) : a.count - b.count
        return direction === 'ascending' ? order : -order
    })

    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head sort={sortFor('name')} onSort={() => sortBy('name')}>
                        Event
                    </Table.Head>
                    <Table.Head align="end" sort={sortFor('count')} onSort={() => sortBy('count')}>
                        This week
                    </Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rows.map(({ name, count }) => (
                    <Table.Row key={name}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell align="end">{count.toLocaleString('en-US')}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
