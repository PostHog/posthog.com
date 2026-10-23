import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Variants from './Variants'
import variantsSource from '!!../../rawSourceLoader!./Variants.tsx?raw'
import States from './States'
import statesSource from '!!../../rawSourceLoader!./States.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'split-button',
    importPath: 'components/UI/SplitButton',
    importNames: ['SplitButton'],
    imports: [{ path: 'components/UI/Menu', names: ['Menu'] }],
    sourcePath: 'src/components/UI/SplitButton',
    apiNote:
        'SplitButton composes ButtonGroup, Button, and Menu. Root accepts Base UI Menu root props. Button accepts library Button props. Trigger accepts Menu trigger props except render and children. Popup accepts Menu popup props.',
    baseUi: [{ label: 'Base UI Menu', url: 'https://base-ui.com/react/components/menu' }],
    examples: [
        {
            id: 'basic',
            title: 'Save with related actions',
            description: 'The main button saves the insight. The menu offers related save actions.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'variants',
            title: 'Every variant and size',
            description:
                'Both segments share the group appearance. Raised faces move independently above one underside.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'states',
            title: 'Disabled and pending actions',
            description:
                'Root disabled blocks both actions and fades the whole group. Button loading leaves the menu available without a disabled fade.',
            Component: States,
            source: statesSource,
        },
    ],
    notes: [
        'A disabled segment keeps its raised face opaque and dims only its content. An open menu keeps the outer corner rounded.',
        'Root accepts controlled open state and other Base UI Menu root props. Button forwards its ref to the main action.',
        'Trigger supplies the chevron. It does not accept render or children. Popup defaults to align="end".',
        'Keep Button and Trigger in that order as direct rendered children of Root. Popup renders in a portal.',
        'Use Menu parts inside Popup. Base UI manages keyboard navigation, dismissal, and focus return.',
        'Set variant and size on Root. The group overrides the appearance on each segment.',
        'The menu trigger stays pushed down while its menu is open.',
        'Button loading alone leaves the menu available. Set disabled on Root when all related actions must wait.',
        'Use type="submit" on Button for a form action. Trigger opens the menu without submitting the form.',
        'Give Trigger a specific aria-label when the page has several action menus.',
    ],
    props: [
        {
            component: 'SplitButton.Root',
            rows: [
                {
                    name: 'variant',
                    type: "'default' | 'primary' | 'secondary' | 'danger'",
                    defaultValue: "'default'",
                    description: 'Sets the appearance of both segments.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the size of both segments.',
                },
                {
                    name: 'disabled',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Disables the main action and the menu trigger.',
                },
                { name: 'className', type: 'string', description: 'Classes for the joined ButtonGroup.' },
            ],
        },
        {
            component: 'SplitButton.Button',
            rows: [
                {
                    name: 'loading',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows a spinner and blocks the main action.',
                },
            ],
        },
        {
            component: 'SplitButton.Trigger',
            rows: [
                {
                    name: 'aria-label',
                    type: 'string',
                    defaultValue: "'More actions'",
                    description: 'The accessible name of the menu trigger.',
                },
            ],
        },
        {
            component: 'SplitButton.Popup',
            rows: [
                {
                    name: 'align',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'end'",
                    description: 'Aligns the menu with its trigger.',
                },
            ],
        },
    ],
}
