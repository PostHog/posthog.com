import type { ComponentDoc } from '../../types'
import Values from './Values'
import valuesSource from '!!../../rawSourceLoader!./Values.tsx?raw'
import Widths from './Widths'
import widthsSource from '!!../../rawSourceLoader!./Widths.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'middle-truncate',
    importPath: 'components/UI/MiddleTruncate',
    importNames: ['MiddleTruncate'],
    sourcePath: 'src/components/UI/MiddleTruncate',
    apiNote: 'MiddleTruncate accepts span element props. Pass the full string as children.',
    examples: [
        {
            id: 'values',
            title: 'URLs, paths, keys, and events',
            description: 'Keep the end visible. CopyButton copies the full value.',
            Component: Values,
            source: valuesSource,
        },
        {
            id: 'widths',
            title: 'Available width',
            description: 'CSS updates the text when the container width changes.',
            Component: Widths,
            source: widthsSource,
        },
    ],
    notes: [
        'Set a width or constrain the parent. Use min-w-0 on parent flex and grid items.',
        'endChars reserves the last characters. The suffix uses at most half the available width when a prefix exists.',
        'The prefix shows an ellipsis when it overflows. Very narrow fields also clip the start of the suffix.',
        'The full string stays in the DOM. Screen readers receive it once. The native title shows it on pointer hover.',
        'Select text and copy to receive the full value, even for a partial selection. Pair with CopyButton for a keyboard and touch action.',
        'This component targets left-to-right identifiers. Use normal text for prose or bidirectional language.',
        'The component uses CSS clipping. It needs no measurement, observer, or effect. Truncation does not conceal secrets.',
    ],
    props: [
        {
            component: 'MiddleTruncate',
            rows: [
                { name: 'children', type: 'string', description: 'The full value to display and copy.' },
                {
                    name: 'endChars',
                    type: 'number',
                    defaultValue: '16',
                    description: 'Sets the suffix length in Unicode code points. Values below one become one.',
                },
                { name: 'title', type: 'string', defaultValue: 'children', description: 'Sets the native hover text.' },
                { name: 'className', type: 'string', description: 'Sets width, font, and other span styles.' },
            ],
        },
    ],
}
