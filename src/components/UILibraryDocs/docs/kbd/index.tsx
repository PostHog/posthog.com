import type { ComponentDoc } from '../../types'
import Examples from './Examples'
import examplesSource from '!!../../rawSourceLoader!./Examples.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'kbd',
    importPath: 'components/UI/Kbd',
    importNames: ['Kbd'],
    sourcePath: 'src/components/UI/Kbd',
    apiNote: 'These are site components. Kbd takes kbd element props. Kbd.Shortcut takes span element props.',
    examples: [
        {
            id: 'examples',
            title: 'Examples',
            description: 'Show one key or a group of keys. Set the platform explicitly.',
            Component: Examples,
            source: examplesSource,
        },
    ],
    notes: [
        'Keycaps describe keys. They are not buttons and do not run commands.',
        'Shortcut groups have an accessible name that spells out the keys.',
        'The default platform is mac. On other platforms, modifier keys show as words: Ctrl, Alt, Shift, Enter. No platform detection runs during rendering.',
        'This component covers the keycap display from KeyboardShortcut. Existing uses stay unchanged.',
    ],
    props: [
        {
            component: 'Kbd',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'The key label.' },
                {
                    name: 'size',
                    type: "'sm' | 'md'",
                    defaultValue: "'md'",
                    description: 'The keycap height and text size.',
                },
            ],
        },
        {
            component: 'Kbd.Shortcut',
            rows: [
                { name: 'keys', type: 'readonly string[]', description: 'The keys in display order. Required.' },
                {
                    name: 'platform',
                    type: "'mac' | 'other'",
                    defaultValue: "'mac'",
                    description: 'Use Control and Alt labels on other platforms.',
                },
                { name: 'size', type: "'sm' | 'md'", defaultValue: "'md'", description: 'The size of each keycap.' },
            ],
        },
    ],
}
