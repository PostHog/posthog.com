import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'

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
            description:
                'Raised is the default. Use outlined or plain only where a raised bar does not fit, such as inside another raised surface.',
            Component: Surfaces,
            source: surfacesSource,
        },
    ],
    notes: [
        <>
            Use Menubar for app-style command menus. For site navigation, use{' '}
            <Link to="/components/ui/navigation-menu">NavigationMenu</Link>.
        </>,
    ],
    props: [
        {
            component: 'Menubar.Root',
            rows: [
                {
                    name: 'appearance',
                    type: "'plain' | 'outlined' | 'raised'",
                    defaultValue: "'raised'",
                    description: 'Sets the bar surface. Raised adds a translucent fill and a shadow.',
                },
            ],
        },
    ],
}
