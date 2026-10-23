import type { ComponentDoc } from '../../types'
import Tails from './Tails'
import tailsSource from '!!../../rawSourceLoader!./Tails.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'
import Glass from './Glass'
import glassSource from '!!../../rawSourceLoader!./Glass.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'speech-bubble',
    importPath: 'components/UI/SpeechBubble',
    importNames: ['SpeechBubble'],
    sourcePath: 'src/components/UI/SpeechBubble',
    apiNote: 'SpeechBubble accepts div element props and forwards its ref.',
    examples: [
        {
            id: 'tails',
            title: 'Tail positions',
            description: 'All four sides support start, center, and end positions. Point the tail toward the speaker.',
            Component: Tails,
            source: tailsSource,
        },
        {
            id: 'glass',
            title: 'One silhouette on glass',
            description:
                'The bubble and tail share one fill, outline, and shadow. Check this tinted surface in light and dark mode.',
            Component: Glass,
            source: glassSource,
        },
        {
            id: 'sizes',
            title: 'Sizes and lettering',
            description: 'Use the default text or set a font with className.',
            Component: Sizes,
            source: sizesSource,
        },
    ],
    notes: [
        'Replaces: components/SpeechBubble. Change the import to the named library export. The bottom, left, and right tail values stay the same.',
        'One SVG path draws the body and tail. It has one translucent fill, one continuous outline, and one shadow. The fill and outline match the library raised-card surface colors.',
        'A ResizeObserver updates the path when the bubble dimensions change. It keeps the corner radius and tail size constant. It does not animate or measure on every frame.',
        'Server rendering includes the full silhouette. Size measurement updates the decorative path after mount without moving the text or changing the layout.',
        'tail selects a physical side. For top and bottom, start is near the left corner and end is near the right corner. For left and right, start is near the top corner and end is near the bottom corner.',
        'The tail is decorative. Put the speaker name in nearby text when readers need that context.',
        'The tail extends 10px beyond the bubble. Leave space around it and avoid ancestors that clip overflow.',
        'Text wraps inside narrow containers. Set a maximum width for long speech. Avoid fixed widths that exceed the parent.',
        'This component does not announce messages or create a live region. Use Toast for status updates.',
        'Existing call sites stay unchanged. The library adds default padding and text sizes; override them with className when you migrate.',
    ],
    props: [
        {
            component: 'SpeechBubble',
            rows: [
                {
                    name: 'tail',
                    type: "'bottom' | 'top' | 'left' | 'right'",
                    defaultValue: "'bottom'",
                    description: 'Sets the side that points toward the speaker.',
                },
                {
                    name: 'tailAlign',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'center'",
                    description: 'Places the tail near the start corner, at the center, or near the end corner.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the padding and text size.',
                },
                { name: 'children', type: 'ReactNode', description: 'The speaker text or other content.' },
            ],
        },
    ],
}
