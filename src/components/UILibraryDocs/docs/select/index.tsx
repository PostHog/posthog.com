import React from 'react'
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
    slug: 'select',
    importPath: 'components/UI/Select',
    importNames: ['Select'],
    sourcePath: 'src/components/UI/Select',
    baseUi: [{ label: 'Base UI Select', url: 'https://base-ui.com/react/components/select' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description: 'Pass items to Select.Root. Select.Value uses the items to show the label of the value.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'groups',
            title: 'Groups and separators',
            description:
                'Put related items in a Group with a GroupLabel. A Separator divides sections. A disabled item stays in the list, but the user cannot select it.',
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
            Pass <code>items</code> to <code>Select.Root</code>. Without it, <code>Select.Value</code> shows the raw
            value (for example <code>us</code>), not the label.
        </>,
        <>
            <code>Select.Popup</code> renders the list and the scroll arrows. Put <code>Item</code>, <code>Group</code>,
            and <code>Separator</code> directly in <code>Popup</code>.
        </>,
        <>
            <code>Select.Item</code> renders a check mark and the item text. Its children become the text.
        </>,
        <>
            <code>Popup</code> renders the Base UI <code>Portal</code>, <code>Positioner</code>, and <code>Popup</code>{' '}
            together. It takes the positioner props, for example <code>side</code> and <code>align</code>, and the
            portal <code>container</code> prop.
        </>,
        <>
            When the user opens the select with a mouse, the popup covers the trigger and aligns the selected item with
            it. Set <code>alignItemWithTrigger={'{false}'}</code> on <code>Popup</code> to open it below the trigger.
        </>,
    ],
    props: [
        {
            component: 'Select.Root',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the trigger height, the chevron, and the item text size in the list.',
                },
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the trigger shape. Keep inset for forms. Use line for a lighter form that must not look like a card or a section.',
                },
            ],
        },
        {
            component: 'Select.Trigger',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: 'Root size',
                    description: 'Overrides the size from Root for the trigger only.',
                },
            ],
        },
        {
            component: 'Select.Icon',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: '<IconChevronDown />',
                    description: 'The icon in the trigger. Pass children to replace the chevron.',
                },
            ],
        },
        {
            component: 'Select.Popup',
            rows: [
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '4',
                    description: 'The gap between the trigger and the popup, in pixels.',
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
