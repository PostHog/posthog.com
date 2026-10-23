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
        'Replaces: Home/ToolsTicker, Pricing/Redesign/FreeTierTicker, scrolling Pricing/Redesign/CustomerLogos, and .infinite-features-ticker. Pass each old strip item as children. Existing uses remain unchanged.',
        'speed uses pixels per second. The component measures the first group with ResizeObserver. One CSS transform moves the strip; no JavaScript runs each frame.',
        'Each row has one moving strip. It repeats the group enough times to cover the viewport, plus one group for the loop.',
        'The group width includes the trailing gap. The strip moves by exactly that width, at a constant pixel speed.',
        'ResizeObserver updates both widths on resize. A viewport three groups wide uses four groups in total, including the original.',
        'Motion pauses offscreen, in a hidden tab, on focus, and on hover by default. Focus anywhere in the marquee pauses all rows.',
        'There is no pause button. Hover pauses the row by default. Keyboard focus within the marquee pauses all rows until focus leaves.',
        'Reduced motion disables looping motion and shows a manual scroll row. Speed zero and empty content also disable motion. Short rows still scroll.',
        'Reduced motion and the server render show one manual scroll row. Duplicate content is aria-hidden and inert. Do not put IDs or autoplay media in repeated children.',
        'Edge fade uses a static mask on the viewport. The strip has no blur, filter, or backdrop filter. will-change applies only while motion runs.',
        'Actual compositing and GPU cost need a browser profile. Source checks alone cannot establish GPU use. Disable edgeFade if a profile shows mask overhead.',
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
