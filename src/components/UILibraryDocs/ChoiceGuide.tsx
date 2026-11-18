import React from 'react'
import Link from 'components/Link'
import { Table } from 'components/UI/Table'

export const ruleOfThumb =
    'These are defaults, not laws. Break one when you have a good reason, or when it makes the design more cohesive or more interesting.'

type Choice = { component: string; url: string; cells: string[] }

function ChoiceTable({ intro, columns, rows }: { intro: string; columns: string[]; rows: Choice[] }): JSX.Element {
    return (
        <>
            {intro}
            <Table.Root density="compact" containerProps={{ className: 'not-prose my-3' }}>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Component</Table.Head>
                        {columns.map((column) => (
                            <Table.Head key={column}>{column}</Table.Head>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows.map((row) => (
                        <Table.Row key={row.component}>
                            <Table.Cell className="whitespace-nowrap [&_a]:font-semibold [&_a]:underline">
                                <Link to={row.url}>{row.component}</Link>
                            </Table.Cell>
                            {row.cells.map((cell, index) => (
                                <Table.Cell key={index}>{cell}</Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}

const ui = (slug: string): string => `/components/ui/${slug}`

export function HoverSurfaceGuide(): JSX.Element {
    return (
        <ChoiceTable
            intro="Choose the component from the trigger and the content. A hover card on a trigger that is not a link hides its content from touch users, so use a popover there."
            columns={['Trigger', 'Content', 'Opens on']}
            rows={[
                {
                    component: 'Tooltip',
                    url: ui('tooltip'),
                    cells: ['Any control', 'A short text label', 'Hover, focus'],
                },
                {
                    component: 'PreviewCard',
                    url: ui('preview-card'),
                    cells: ['A link', 'A rich preview of the link target', 'Hover, focus'],
                },
                {
                    component: 'Popover with openOnHover',
                    url: ui('popover'),
                    cells: ['Not a link', 'Rich content, with or without controls', 'Hover, click, tap, keyboard'],
                },
            ]}
        />
    )
}

export function InputChoiceGuide(): JSX.Element {
    return (
        <ChoiceTable
            intro="Choose the input from the number of options and what the user picks."
            columns={['Use it for']}
            rows={[
                { component: 'Radio', url: ui('radio'), cells: ['One choice from 2 or 3 options that stay visible.'] },
                {
                    component: 'Select',
                    url: ui('select'),
                    cells: ['One choice from 4 to about 10 options, or fewer options when space is tight.'],
                },
                {
                    component: 'Combobox',
                    url: ui('combobox'),
                    cells: ['One or more choices from a long list, with typing to filter.'],
                },
                {
                    component: 'Autocomplete',
                    url: ui('autocomplete'),
                    cells: ['Free text, with suggestions that the user can ignore.'],
                },
                {
                    component: 'Choicebox',
                    url: ui('choicebox'),
                    cells: ['A choice where each option needs a description, such as a plan.'],
                },
                {
                    component: 'Checkbox',
                    url: ui('checkbox'),
                    cells: ['An on or off value in a form that the user submits.'],
                },
                { component: 'Switch', url: ui('switch'), cells: ['A setting that applies at once.'] },
            ]}
        />
    )
}

export function StatusChoiceGuide(): JSX.Element {
    return (
        <ChoiceTable
            intro="Choose the component from where the message sits and what the user does with it."
            columns={['Use it for']}
            rows={[
                {
                    component: 'Badge',
                    url: ui('badge'),
                    cells: ['A status or category that the user reads, such as Beta.'],
                },
                {
                    component: 'Chip',
                    url: ui('chip'),
                    cells: ['A thing the user can open or act on, such as a person, a filter, or a selected value.'],
                },
                {
                    component: 'Note',
                    url: ui('note'),
                    cells: ['Context inside content, such as a tip in a docs page.'],
                },
                {
                    component: 'Banner',
                    url: ui('banner'),
                    cells: ['A notice about the whole page, at the top. One at a time.'],
                },
                { component: 'Toast', url: ui('toast'), cells: ['Brief feedback after an action.'] },
            ]}
        />
    )
}
