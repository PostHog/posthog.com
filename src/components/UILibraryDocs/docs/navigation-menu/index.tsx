import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'
import ListLinks from './ListLinks'
import listLinksSource from '!!../../rawSourceLoader!./ListLinks.tsx?raw'
import Outlined from './Outlined'
import outlinedSource from '!!../../rawSourceLoader!./Outlined.tsx?raw'
import Plain from './Plain'
import plainSource from '!!../../rawSourceLoader!./Plain.tsx?raw'

const containerType = 'HTMLElement | ShadowRoot | RefObject | null'

export const doc: ComponentDoc = {
    slug: 'navigation-menu',
    importPath: 'components/UI/NavigationMenu',
    importNames: ['NavigationMenu'],
    sourcePath: 'src/components/UI/NavigationMenu',
    baseUi: [{ label: 'Base UI Navigation Menu', url: 'https://base-ui.com/react/components/navigation-menu' }],
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
            description:
                'Set appearance="outlined" on List to draw a border. Each Trigger opens its Content in the shared Popup.',
            Component: Outlined,
            source: outlinedSource,
        },
        {
            id: 'plain',
            title: 'Plain',
            description: 'Set appearance="plain" on List to remove the border.',
            Component: Plain,
            source: plainSource,
        },
        {
            id: 'list-links',
            title: 'Links in the list',
            description:
                'A Link in the List looks like a trigger. For an internal link, render a Gatsby Link. For an external link, use href.',
            Component: ListLinks,
            source: listLinksSource,
        },
    ],
    notes: [
        <>
            Use <code>NavigationMenu</code> for site navigation (links). Use{' '}
            <Link to="/components/ui/menubar">Menubar</Link> for app commands.
        </>,
        <>
            Put <code>NavigationMenu.Icon</code> inside each <code>Trigger</code> to show the chevron.
        </>,
        <>
            Put one <code>NavigationMenu.Popup</code> after the <code>List</code>. It shows the <code>Content</code> of
            the open item.
        </>,
        <>
            Set <code>appearance</code> on <code>List</code>. The default is raised. The popup keeps its own solid
            overlay surface.
        </>,
        <>
            <code>Link</code> looks like a menu row inside <code>Content</code>, and like a trigger in the{' '}
            <code>List</code>. A click on a link closes the menu.
        </>,
        <>
            <code>components/Link</code> does not forward its ref. For an internal link, pass{' '}
            <code>{'render={<GatsbyLink to="/path" />}'}</code> (from <code>gatsby</code>) to{' '}
            <code>NavigationMenu.Link</code>.
        </>,
    ],
    props: [
        {
            component: 'NavigationMenu.List',
            rows: [
                {
                    name: 'appearance',
                    type: "'plain' | 'outlined' | 'raised'",
                    defaultValue: "'raised'",
                    description: 'Sets the list surface. Raised adds a translucent fill and a shadow.',
                },
            ],
        },
        {
            component: 'NavigationMenu.Link',
            rows: [
                {
                    name: 'closeOnClick',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Closes the menu when the user clicks the link. The Base UI default is false.',
                },
            ],
        },
        {
            component: 'NavigationMenu.Popup',
            rows: [
                {
                    name: 'align',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'start'",
                    description:
                        'Aligns the popup with the start edge of the open trigger. The Base UI default is center.',
                },
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '4',
                    description: 'The gap between the list and the popup, in pixels.',
                },
                {
                    name: 'collisionAvoidance',
                    type: 'CollisionAvoidance',
                    defaultValue: "{ side: 'none' }",
                    description: 'The popup stays below the list. It does not flip to the other side.',
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
