import type { ComponentDoc } from '../../types'
import States from './States'
import statesSource from '!!../../rawSourceLoader!./States.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'search-input',
    importPath: 'components/UI/SearchInput',
    importNames: ['SearchInput'],
    sourcePath: 'src/components/UI/SearchInput',
    apiNote:
        'SearchInput accepts Input props except render. Its ref points to the input. className styles the outer field.',
    examples: [
        {
            id: 'states',
            title: 'Search states',
            description: 'The spinner replaces the search icon. Disabled and read-only fields cannot clear.',
            Component: States,
            source: statesSource,
        },
        {
            id: 'sizes',
            title: 'Field sizes',
            description: 'Use the same sizes as other fields.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'controlled',
            title: 'Filter events',
            description: 'Use onValueChange for text changes and clear actions.',
            Component: Controlled,
            source: controlledSource,
        },
    ],
    notes: [
        'Supply a visible label or aria-label. A placeholder does not replace a label.',
        'Use value and onValueChange for controlled use. Use defaultValue for uncontrolled use.',
        'The clear button appears when the field has text. Escape clears text and keeps focus. Empty Escape can reach a parent dialog.',
        'onKeyDown runs first. Call preventDefault to override Escape. Escape does not clear during text composition.',
        'The shortcut hint hides when the input has focus or text. It is a hint only. Register the shortcut in the parent.',
        'Pass combobox roles and ARIA props for result navigation. The parent owns results, filters, and debounce timing.',
        'onValueChange includes clear actions. Native onChange only reports input changes. Loading does not disable typing.',
    ],
    props: [
        {
            component: 'SearchInput',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the height to 26, 36, or 44 pixels.',
                },
                {
                    name: 'value / defaultValue',
                    type: 'string',
                    description: 'Sets controlled text or initial uncontrolled text.',
                },
                {
                    name: 'onValueChange',
                    type: '(value: string) => void',
                    description: 'Receives the text after typing or clearing.',
                },
                {
                    name: 'loading',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows Spinner in place of the search icon.',
                },
                {
                    name: 'loadingLabel / clearLabel',
                    type: 'string',
                    defaultValue: "'Searching' / 'Clear search'",
                    description: 'Sets the accessible status and button labels.',
                },
                {
                    name: 'shortcut',
                    type: 'readonly string[]',
                    description: 'Shows Kbd.Shortcut while the input is empty and unfocused.',
                },
                { name: 'inputClassName', type: 'string', description: 'Adds classes to the input element.' },
            ],
        },
    ],
}
