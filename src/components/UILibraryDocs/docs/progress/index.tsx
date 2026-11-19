import type { ComponentDoc } from '../../types'
import Determinate from './Determinate'
import determinateSource from '!!../../rawSourceLoader!./Determinate.tsx?raw'
import Indeterminate from './Indeterminate'
import indeterminateSource from '!!../../rawSourceLoader!./Indeterminate.tsx?raw'
import QuotaMeter from './QuotaMeter'
import quotaMeterSource from '!!../../rawSourceLoader!./QuotaMeter.tsx?raw'
import Tones from './Tones'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'progress',
    importPath: 'components/UI/Progress',
    importNames: ['Progress'],
    imports: [{ path: 'components/UI/Meter', names: ['Meter'] }],
    sourcePath: 'src/components/UI/Progress',
    sourcePaths: ['src/components/UI/Meter'],
    baseUi: [
        { label: 'Base UI Progress', url: 'https://base-ui.com/react/components/progress' },
        { label: 'Base UI Meter', url: 'https://base-ui.com/react/components/meter' },
    ],
    examples: [
        {
            id: 'determinate',
            title: 'Determinate',
            description:
                'Use this for a task that runs and has a known end, such as an export. Pass a value from 0 to 100. Progress.Value shows it as a percentage.',
            Component: Determinate,
            source: determinateSource,
        },
        {
            id: 'indeterminate',
            title: 'Indeterminate',
            description:
                'Use this when you cannot know how long the task takes. Pass value={null}. The bar shows a moving shimmer.',
            Component: Indeterminate,
            source: indeterminateSource,
        },
        {
            id: 'colors',
            title: 'Colors',
            description:
                'Use the default brand color in most places. Colors have no fixed meaning, so pick another one only to match the page. The shimmer uses the same color.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'meter',
            title: 'Meter thresholds',
            description:
                'Use Meter for an amount that does not run, such as quota use. This demo changes the color above 80% and above 95%.',
            Component: QuotaMeter,
            source: quotaMeterSource,
        },
    ],
    notes: ['Use Progress for a task that is running. Use Meter for a fixed amount, such as quota use or storage.'],
    props: ['Progress.Root', 'Meter.Root'].map((component) => ({
        component,
        rows: [
            {
                name: 'color',
                type: "'gray' | 'brand' | 'blue' | 'cobalt' | 'coral' | 'corn-blue' | 'green' | 'lemon' | 'lime' | 'purple' | 'tangerine' | 'teal' | 'violet' | 'yellow'",
                defaultValue: "'brand'",
                description: 'Sets the indicator color.',
            },
        ],
    })),
}
