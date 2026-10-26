import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
import Multiple from './Multiple'
import multipleSource from '!!../../rawSourceLoader!./Multiple.tsx?raw'
import Single from './Single'
import singleSource from '!!../../rawSourceLoader!./Single.tsx?raw'

const containerType = 'HTMLElement | ShadowRoot | RefObject | null'

import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'combobox',
    importPath: 'components/UI/Combobox',
    importNames: ['Combobox'],
    sourcePath: 'src/components/UI/Combobox',
    baseUi: [{ label: 'Base UI Combobox', url: 'https://base-ui.com/react/components/combobox' }],
    examples: [
        {
            id: 'single',
            title: 'Single value',
            description:
                'The user types to filter the list. A click on the input opens the list. Clear removes the value. Empty shows when no item matches.',
            Component: Single,
            source: singleSource,
        },
        {
            id: 'multiple',
            title: 'Multiple values with chips',
            description:
                'Set multiple on Root. Value gives the selected items to its children. Put a Chip for each item and the Input in Chips, so that they wrap together.',
            Component: Multiple,
            source: multipleSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Select sm, md, or lg. The button uses the same size.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'states',
            title: 'States',
            description:
                'Empty, filled, invalid, and disabled, in both appearances. Hover and focus the fields to see those states.',
            Component: AppearanceStates,
            source: appearanceStatesSource,
        },
    ],
    notes: [
        <>
            Put <code>Input</code> inside <code>InputGroup</code>. The group draws the border and the focus ring.{' '}
            <code>Input</code> has no border.
        </>,
        <>
            <code>Popup</code> does not contain <code>List</code>. Put <code>Empty</code> and <code>Status</code> next
            to <code>List</code> inside <code>Popup</code>.
        </>,
        <>
            For multiple selection, put the chips and the <code>Input</code> inside <code>Chips</code>.{' '}
            <code>Combobox.Chip</code> uses the same styles as <Link to="/components/ui/chip">Chip</Link>.
        </>,
        <>
            While the list is open below the field, a new row of chips scrolls the page up by the same height, so the
            list stays in place and every chip stays visible.
        </>,
        <>
            <code>Clear</code> and <code>ChipRemove</code> show an icon by default. Pass <code>children</code> to
            replace it.
        </>,
        <>
            Combobox has no arrow button. A click on the input opens the list, and the arrow keys open it from the
            keyboard.
        </>,
        <>
            <code>Popup</code> renders the Base UI <code>Portal</code>, <code>Positioner</code>, and <code>Popup</code>{' '}
            together. It takes the positioner props, for example <code>side</code> and <code>align</code>, and the
            portal <code>container</code> prop.
        </>,
        <>
            For free text with suggestions, use <Link to="/components/ui/autocomplete">Autocomplete</Link>.
        </>,
    ],
    props: [
        {
            component: 'Combobox.InputGroup',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the text size, padding, and control height.',
                },
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Keep inset for forms. Use line for a lighter form that must not look like a card or a section.',
                },
            ],
        },
        {
            component: 'Combobox.Clear',
            rows: [
                {
                    name: 'aria-label',
                    type: 'string',
                    defaultValue: "'Clear'",
                    description: 'The accessible name of the clear button.',
                },
            ],
        },
        {
            component: 'Combobox.ChipRemove',
            rows: [
                {
                    name: 'aria-label',
                    type: 'string',
                    defaultValue: "'Remove'",
                    description: (
                        <>
                            The accessible name of the remove button. Name the chip in it, for example{' '}
                            <code>{'`Remove ${product}`'}</code>.
                        </>
                    ),
                },
            ],
        },
        {
            component: 'Combobox.Empty',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: "'No results'",
                    description: 'The message when no item matches the input.',
                },
            ],
        },
        {
            component: 'Combobox.Popup',
            rows: [
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '4',
                    description: 'The gap between the input and the popup, in pixels.',
                },
                {
                    name: 'container',
                    type: containerType,
                    description: 'The element that the popup renders into. The default is the document body.',
                },
            ],
        },
    ],
}
