import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Groups from './Groups'
import groupsSource from '!!../../rawSourceLoader!./Groups.tsx?raw'

const containerType = 'HTMLElement | ShadowRoot | RefObject | null'

import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'autocomplete',
    importPath: 'components/UI/Autocomplete',
    importNames: ['Autocomplete'],
    sourcePath: 'src/components/UI/Autocomplete',
    baseUi: [{ label: 'Base UI Autocomplete', url: 'https://base-ui.com/react/components/autocomplete' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'The user can type any text. The list shows the items that match. The value does not have to be one of the items.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'groups',
            title: 'Groups',
            description:
                'Pass a list of groups to Root. List gives each group to its children. Each Group gets its own items, and Collection renders them.',
            Component: Groups,
            source: groupsSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Select sm, md, or lg. The button uses the same size.',
            Component: Sizes,
            source: sizesSource,
        },
    ],
    notes: [
        <>
            Autocomplete uses the same input group, popup, and list styles as{' '}
            <Link to="/components/ui/combobox">Combobox</Link>. Put <code>Input</code> inside <code>InputGroup</code>,
            and put <code>Empty</code> next to <code>List</code> inside <code>Popup</code>.
        </>,
        <>
            Items have no check mark, because Autocomplete does not keep a selection. To select from a fixed list, use{' '}
            <Link to="/components/ui/combobox">Combobox</Link>.
        </>,
        <>
            The popup opens when the user types or presses an arrow key. It does not open when the user clicks the
            input.
        </>,
        <>
            <code>Popup</code> renders the Base UI <code>Portal</code>, <code>Positioner</code>, and <code>Popup</code>{' '}
            together. It takes the positioner props, for example <code>side</code> and <code>align</code>, and the
            portal <code>container</code> prop.
        </>,
    ],
    props: [
        {
            component: 'Autocomplete.InputGroup',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the text size, padding, and control height.',
                },
            ],
        },
        {
            component: 'Autocomplete.Clear',
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
            component: 'Autocomplete.Empty',
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
            component: 'Autocomplete.Popup',
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
