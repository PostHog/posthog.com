import React from 'react'
import { Table } from 'components/UI/Table'

const sources = [
    { name: 'Web (posthog-js)', events: '2,481,903', share: '62.4%' },
    { name: 'iOS', events: '812,440', share: '20.4%' },
    { name: 'Android', events: '401,227', share: '10.1%' },
    { name: 'Backend (posthog-python)', events: '282,019', share: '7.1%' },
]

export default function Pricing(): JSX.Element {
    return (
        <Table.Root>
            <Table.Caption>Events by source, last 30 days</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Source</Table.Head>
                    <Table.Head align="end">Events</Table.Head>
                    <Table.Head align="end">Share</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sources.map(({ name, events, share }) => (
                    <Table.Row key={name}>
                        <Table.Head scope="row">{name}</Table.Head>
                        <Table.Cell align="end">{events}</Table.Cell>
                        <Table.Cell align="end">{share}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Head scope="row">Total</Table.Head>
                    <Table.Cell align="end">3,977,589</Table.Cell>
                    <Table.Cell align="end">100.0%</Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table.Root>
    )
}
