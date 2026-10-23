import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'
import Outlined from './Outlined'
import outlinedSource from '!!../../rawSourceLoader!./Outlined.tsx?raw'
import Plain from './Plain'
import plainSource from '!!../../rawSourceLoader!./Plain.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'menubar',
    importPath: 'components/UI/Menubar',
    importNames: ['Menubar'],
    sourcePath: 'src/components/UI/Menubar',
    baseUi: [{ label: 'Base UI Menubar', url: 'https://base-ui.com/react/components/menubar' }],
    examples: [
        {
            id: 'surfaces',
            title: 'Surfaces',
            description: 'Choose plain, outlined, or raised. Raised adds a translucent fill and a shadow.',
            Component: Surfaces,
            source: surfacesSource,
        },
        {
            id: 'outlined',
            title: 'Outlined',
            description: 'Set surface="outlined" to draw a border around the bar.',
            Component: Outlined,
            source: outlinedSource,
        },
        {
            id: 'plain',
            title: 'Plain',
            description: 'Set variant="plain" to remove the border. Use it for a bar in a window header.',
            Component: Plain,
            source: plainSource,
        },
    ],
    notes: [
        <>
            Each menu is a <code>Menu.Root</code> from <Link to="/components/ui/menu">Menu</Link>. Use{' '}
            <code>Menubar.Trigger</code> as its trigger. Use <code>Menu.Popup</code> and <code>Menu.Item</code> for its
            content.
        </>,
        <>Inside a menubar, each popup opens below its trigger and aligns with the start edge of the trigger.</>,
        <>When the user moves from one open menu to the next, the popups change with no animation.</>,
        <>
            Use <code>Menubar</code> for app commands. Use{' '}
            <Link to="/components/ui/navigation-menu">NavigationMenu</Link> for site navigation.
        </>,
    ],
    props: [
        {
            component: 'Menubar.Root',
            rows: [
                {
                    name: 'surface',
                    type: "'plain' | 'outlined' | 'raised'",
                    defaultValue: "'raised'",
                    description:
                        'Sets the bar surface. Takes priority over variant. Raised adds a translucent fill and a shadow.',
                },
                {
                    name: 'variant',
                    type: "'outlined' | 'plain'",
                    description: 'Compatibility alias for surface. Use surface in new code.',
                },
            ],
        },
    ],
}
