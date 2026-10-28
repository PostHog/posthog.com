import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
            Use Menu for actions. To choose a value, use <Link to="/components/ui/select">Select</Link>. For site
            navigation, use <Link to="/components/ui/navigation-menu">NavigationMenu</Link>.
        </>,
        <>
            Use <Snippet.Inline>{'Menu.LinkItem'}</Snippet.Inline> for an item that opens a page.
        </>,
        <>
            In a submenu, pass <Snippet.Inline>{'sideOffset={0}'}</Snippet.Inline> to{' '}
            <Snippet.Inline>{'Menu.Popup'}</Snippet.Inline>, so it touches its parent menu.
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
