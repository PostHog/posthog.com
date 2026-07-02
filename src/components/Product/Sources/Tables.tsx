import Markdown from 'components/Squeak/components/Markdown'
import React from 'react'

interface SourceTable {
    name?: string | null
    label?: string | null
    description?: string | null
    sync_methods?: (string | null)[] | null
    incremental_fields?: (string | null)[] | null
    primary_keys?: (string | null)[] | null
}

const joinOrDash = (values?: (string | null)[] | null): string => {
    const filtered = (values ?? []).filter(Boolean) as string[]
    return filtered.length ? filtered.join(', ') : '—'
}

export default function SourceTables({ tables }: { tables: SourceTable[] | null | undefined }): JSX.Element {
    if (!tables?.length) {
        return (
            <p>
                The tables available from this source are discovered from your account when you connect it, so the exact
                list depends on your data. Once connected, you can pick which tables to sync from the{' '}
                <a href="https://app.posthog.com/data-management/sources">sources tab</a>.
            </p>
        )
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Table</th>
                    <th>Description</th>
                    <th>Sync method</th>
                    <th>Incremental field</th>
                    <th>Primary key</th>
                </tr>
            </thead>
            <tbody>
                {tables.map((table) => (
                    <tr key={table.name}>
                        <td>
                            <code className="dark:text-white bg-accent text-inherit p-1 rounded !whitespace-normal">
                                {table.label || table.name}
                            </code>
                        </td>
                        <td>{table.description ? <Markdown>{table.description}</Markdown> : '—'}</td>
                        <td>{joinOrDash(table.sync_methods)}</td>
                        <td>{joinOrDash(table.incremental_fields)}</td>
                        <td>{joinOrDash(table.primary_keys)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
