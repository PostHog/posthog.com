import React from 'react'
import { Badge } from 'components/UI/Badge'
import { Table } from 'components/UI/Table'

const flags = [
    { key: 'new-onboarding-flow', enabled: true, rollout: 100 },
    { key: 'pricing-page-v2', enabled: true, rollout: 25 },
    { key: 'hedgehog-mode', enabled: false, rollout: 0 },
]

export default function Basic(): JSX.Element {
    return (
        <Table.Root>
            <Table.Caption>Feature flags in this project</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Flag</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head align="end">Rollout</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {flags.map(({ key, enabled, rollout }) => (
                    <Table.Row key={key}>
                        <Table.Head scope="row" className="font-code">
                            {key}
                        </Table.Head>
                        <Table.Cell>
                            <Badge tone={enabled ? 'success' : 'neutral'}>{enabled ? 'Enabled' : 'Disabled'}</Badge>
                        </Table.Cell>
                        <Table.Cell align="end">{rollout}%</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell colSpan={3} className="font-normal text-secondary">
                        3 flags, 2 enabled
                    </Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table.Root>
    )
}
