import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import CheckboxItems from './CheckboxItems'
import checkboxItemsSource from '!!../../rawSourceLoader!./CheckboxItems.tsx?raw'
import Items from './Items'
import itemsSource from '!!../../rawSourceLoader!./Items.tsx?raw'
import RadioItems from './RadioItems'
import radioItemsSource from '!!../../rawSourceLoader!./RadioItems.tsx?raw'
import Submenu from './Submenu'
import submenuSource from '!!../../rawSourceLoader!./Submenu.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'menu',
    importPath: 'components/UI/Menu',
    importNames: ['Menu'],
    sourcePath: 'src/components/UI/Menu',
    baseUi: [{ label: 'Base UI Menu', url: 'https://base-ui.com/react/components/menu' }],
    examples: [
        {
            id: 'items',
            title: 'Items',
            description:
                'Put an icon before the text of a Menu.Item. Menu.Separator divides groups of items. A disabled item is muted.',
            Component: Items,
            source: itemsSource,
        },
        {
            id: 'checkbox-items',
            title: 'Checkbox items',
            description: 'Menu.CheckboxItem turns a setting on or off. It shows a check mark when it is on.',
            Component: CheckboxItems,
            source: checkboxItemsSource,
        },
        {
            id: 'radio-items',
            title: 'Radio items',
            description:
                'Put Menu.RadioItem parts in a Menu.RadioGroup to select one value. Menu.GroupLabel names the group.',
            Component: RadioItems,
            source: radioItemsSource,
        },
        {
            id: 'submenu',
            title: 'Submenu',
            description:
                'Put a Menu.SubmenuTrigger and a Menu.Popup in a Menu.SubmenuRoot. The trigger shows a chevron.',
            Component: Submenu,
            source: submenuSource,
        },
    ],
    notes: [
        <>
            <code>Menu.CheckboxItem</code> and <code>Menu.RadioItem</code> render their own check mark and dot.{' '}
            <code>Menu.SubmenuTrigger</code> renders its own chevron.
        </>,
        <>
            Put each <code>Menu.GroupLabel</code> in a <code>Menu.Group</code>.
        </>,
        <>
            Use <code>Menu.LinkItem</code> for an item that goes to a page.
        </>,
        <>
            <code>Menu.Popup</code> combines Base UI&apos;s <code>Portal</code>, <code>Positioner</code>, and{' '}
            <code>Popup</code>. Pass positioner props, such as <code>side</code>, <code>align</code>, and{' '}
            <code>sideOffset</code>, to it.
        </>,
        <>
            <code>Menu.Popup</code> sets <code>sideOffset</code> to 4. In a submenu, pass{' '}
            <code>{'sideOffset={0}'}</code> so that the submenu touches its parent menu.
        </>,
        <>
            The popup renders at the end of <code>{'<body>'}</code>, outside the window that opened it. It sets{' '}
            <code>data-scheme=&quot;primary&quot;</code>, so its colors match the site theme.
        </>,
        <>
            <code>Menu.Trigger</code> renders a plain <code>{'<button>'}</code>. Pass{' '}
            <code>{'render={<Button />}'}</code> to show a library button.
        </>,
        <>
            For a menu that opens on right-click, use <Link to="/components/ui/context-menu">ContextMenu</Link>. For a
            row of menus, use <Link to="/components/ui/menubar">Menubar</Link>.
        </>,
    ],
    props: [
        {
            component: 'Menu.Popup',
            rows: [
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '4',
                    description: 'The gap between the trigger and the menu, in pixels.',
                },
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the menu renders into. The default is the document body.',
                },
            ],
        },
    ],
}
