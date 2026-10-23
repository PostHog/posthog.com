import React from 'react'
import { Table } from 'components/UI/Table'

const events = [
    '$pageview',
    '$pageleave',
    '$autocapture',
    '$identify',
    '$groupidentify',
    '$feature_flag_called',
    '$exception',
    '$rageclick',
    '$dead_click',
    '$web_vitals',
    '$survey_shown',
    '$survey_sent',
    '$survey_dismissed',
    '$create_alias',
    '$set',
    '$opt_in',
]

export default function StickyHeader(): JSX.Element {
    return (
        <Table.Root stickyHeader striped density="compact" containerProps={{ className: 'max-h-60' }}>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Event</Table.Head>
                    <Table.Head align="end">Last 30 days</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {events.map((event, index) => (
                    <Table.Row key={event}>
                        <Table.Cell>{event}</Table.Cell>
                        <Table.Cell align="end">
                            {(Math.round(48210 / (index + 1)) * 7).toLocaleString('en-US')}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
