import React from 'react'
import Link from 'components/Link'
import { Table } from 'components/UI/Table'

const rows = [
    {
        trigger: 'Any control',
        content: 'A short text label',
        component: 'Tooltip',
        url: '/components/ui/tooltip',
        opens: 'Hover, focus',
    },
    {
        trigger: 'A link',
        content: 'A rich preview of the link target',
        component: 'PreviewCard',
        url: '/components/ui/preview-card',
        opens: 'Hover, focus',
    },
    {
        trigger: 'Not a link',
        content: 'Rich content, with or without controls',
        component: 'Popover with openOnHover',
        url: '/components/ui/popover',
        opens: 'Hover, click, tap, keyboard',
    },
]

export default function HoverSurfaceGuide(): JSX.Element {
    return (
        <>
            Choose the component from the trigger and the content. A hover card on a trigger that is not a link hides
            its content from touch users, so use a popover there.
            <Table.Root density="compact" containerProps={{ className: 'not-prose my-3' }}>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Trigger</Table.Head>
                        <Table.Head>Content</Table.Head>
                        <Table.Head>Component</Table.Head>
                        <Table.Head>Opens on</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows.map((row) => (
                        <Table.Row key={row.component}>
                            <Table.Cell>{row.trigger}</Table.Cell>
                            <Table.Cell>{row.content}</Table.Cell>
                            <Table.Cell className="[&_a]:font-semibold [&_a]:underline">
                                <Link to={row.url}>{row.component}</Link>
                            </Table.Cell>
                            <Table.Cell>{row.opens}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}
