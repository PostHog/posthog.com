import React from 'react'
import { Table } from 'components/UI/Table'
import type { DocPropsGroup } from './types'

export default function PropsTable({ component, rows }: DocPropsGroup): JSX.Element {
    return (
        <div>
            <h3 className="font-code">{component}</h3>
            <Table.Root className="not-prose min-w-[40rem] table-fixed">
                <colgroup>
                    <col className="w-40" />
                    <col className="w-56" />
                    <col className="w-32" />
                    <col />
                </colgroup>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Prop</Table.Head>
                        <Table.Head>Type</Table.Head>
                        <Table.Head>Default</Table.Head>
                        <Table.Head>Description</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows.map(({ name, type, defaultValue, description }) => (
                        <Table.Row key={name}>
                            <Table.Head scope="row" className="break-words font-code">
                                {name}
                            </Table.Head>
                            <Table.Cell className="break-words font-code text-13 text-secondary">{type}</Table.Cell>
                            <Table.Cell className="break-words font-code text-13 text-secondary">
                                {defaultValue ?? '–'}
                            </Table.Cell>
                            <Table.Cell className="[&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2">
                                {description}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}
