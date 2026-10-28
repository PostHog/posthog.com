import Customers from './Customers'
import customersSource from '!!../../rawSourceLoader!./Customers.tsx?raw'
import Tools from './Tools'
import toolsSource from '!!../../rawSourceLoader!./Tools.tsx?raw'
import type { ComponentDoc } from '../../types'

export const doc: ComponentDoc = {
    slug: 'marquee',
    importPath: 'components/UI/Marquee',
    importNames: ['Marquee'],
    sourcePath: 'src/components/UI/Marquee',
    examples: [
        {
            id: 'customers',
            title: 'Customer logos',
            description: 'A calm logo row scrolls at a constant speed, even in wide containers.',
            Component: Customers,
            source: customersSource,
        },
        {
            id: 'tools',
            title: 'Two tool rows',
            description: 'The second row moves in the opposite direction. Keyboard focus pauses both rows.',
            Component: Tools,
            source: toolsSource,
        },
    ],
    notes: [
        'Use a marquee for decorative content that repeats, such as customer logos. Do not put content that users must read or click in it.',
        'Children are copied to fill the row. Do not put IDs or autoplaying media in them.',
    ],
    props: [
        {
            component: 'Marquee',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'The logo, tool, or fact items.' },
                { name: 'label', type: 'string', description: 'Names the scroll region for screen readers.' },
                {
                    name: 'direction',
                    type: "'left' | 'right'",
                    defaultValue: "'left'",
                    description: 'Sets the direction.',
                },
                {
                    name: 'speed',
                    type: 'number',
                    defaultValue: '40',
                    description: 'Sets pixels per second. Zero disables motion.',
                },
                { name: 'gap', type: 'number', defaultValue: '32', description: 'Sets the gap in pixels.' },
                {
                    name: 'edgeFade',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Adds a static edge mask while motion is enabled.',
                },
                {
                    name: 'pauseOnHover',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Pauses motion while the pointer is over the row. Focus always pauses motion.',
                },
                {
                    name: 'secondRow',
                    type: 'ReactNode',
                    description:
                        'Adds a second row with the opposite direction. Focus within either row pauses both rows.',
                },
                { name: 'className', type: 'string', description: 'Adds classes to the outer element.' },
            ],
        },
    ],
}
