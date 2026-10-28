import React from 'react'
import { Heading } from 'components/UI/Typography'
import { Table } from 'components/UI/Table'
import type { DocPropsGroup } from './types'
import { proseLinks } from './styles'

export default function PropsTable({ component, rows }: DocPropsGroup): JSX.Element {
    return (
        <div className="flex flex-col gap-2">
            <Heading level={3} size="sm" className="font-code">
                {component}
            </Heading>
            <Table.Root className="min-w-[40rem] table-fixed">
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
                            <Table.Cell className="break-words font-code text-mono text-secondary">{type}</Table.Cell>
                            <Table.Cell className="break-words font-code text-mono text-secondary">
                                {defaultValue ?? '–'}
                            </Table.Cell>
                            <Table.Cell className={proseLinks}>{description}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}
