import React from 'react'
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
                'Pass a value from 0 to 100. Progress.Value shows it as a percentage. Click Run export to fill the bar.',
            Component: Determinate,
            source: determinateSource,
        },
        {
            id: 'indeterminate',
            title: 'Indeterminate',
            description: 'Pass value={null} when the task has no known end. The bar shows a moving shimmer.',
            Component: Indeterminate,
            source: indeterminateSource,
        },
        {
            id: 'tones',
            title: 'Tones',
            description: 'Each tone sets the fill for Progress and Meter. The shimmer uses the same color.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'meter',
            title: 'Quota',
            description:
                'The caller selects warning above 80% and error above 95%. Use the buttons to check each threshold.',
            Component: QuotaMeter,
            source: quotaMeterSource,
        },
    ],
    notes: [
        <>
            Use <code>Progress</code> for a task that runs. Use <code>Meter</code> for a fixed amount, such as quota
            use.
        </>,
        <>
            <code>Root</code> is a two-column grid. <code>Label</code> goes on the left and <code>Value</code> goes on
            the right. <code>Track</code> fills the full row below them.
        </>,
        <>
            The indeterminate bar uses the site <code>shimmer</code> animation. When the user prefers reduced motion,
            the shimmer has no movement.
        </>,
    ],
    props: ['Progress.Root', 'Meter.Root'].map((component) => ({
        component,
        rows: [
            {
                name: 'tone',
                type: "'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'",
                defaultValue: "'brand'",
                description: 'Set the indicator color. The caller selects the tone.',
            },
        ],
    })),
}
