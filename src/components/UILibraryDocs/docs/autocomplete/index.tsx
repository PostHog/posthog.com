import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
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
            description: 'Pass grouped items to Root. Each group shows a heading above its items.',
            Component: Groups,
            source: groupsSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'sm, md, and lg match the button heights: 26, 36, and 44 pixels.',
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
            Use Autocomplete when the user can type any value and the list only suggests. To pick from a fixed list, use{' '}
            <Link to="/components/ui/select">Select</Link> for a short list or{' '}
            <Link to="/components/ui/combobox">Combobox</Link> for a long one.
        </>,
        'The list opens when the user types or presses an arrow key, not on click.',
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
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Keep inset for forms. Use line for light or inline editing, such as renaming in place, filters, and quick settings.',
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
