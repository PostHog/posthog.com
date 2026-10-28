import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
            description: 'Set multiple on Root. Selected items show as chips that wrap with the input.',
            Component: Multiple,
            source: multipleSource,
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
            Use Combobox when the list is long enough to need filtering, more than about 10 options, or when the user
            picks several values. For a short list, use <Link to="/components/ui/select">Select</Link>. For free text
            with suggestions, use <Link to="/components/ui/autocomplete">Autocomplete</Link>.
        </>,
        <>
            Put <Snippet.Inline>{'Empty'}</Snippet.Inline> next to <Snippet.Inline>{'List'}</Snippet.Inline> inside{' '}
            <Snippet.Inline>{'Popup'}</Snippet.Inline>, not in the list.
        </>,
        <>
            Name each <Snippet.Inline>{'ChipRemove'}</Snippet.Inline> after its chip, for example &quot;Remove Session
            replay&quot;.
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
                        'Sets the field shape. Keep inset for forms. Use line for light or inline editing, such as renaming in place, filters, and quick settings.',
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
                            <Snippet.Inline>{'`Remove ${product}`'}</Snippet.Inline>.
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
