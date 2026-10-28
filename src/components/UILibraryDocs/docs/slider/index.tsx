import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'
import Range from './Range'
import rangeSource from '!!../../rawSourceLoader!./Range.tsx?raw'
import Step from './Step'
import stepSource from '!!../../rawSourceLoader!./Step.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'slider',
    importPath: 'components/UI/Slider',
    importNames: ['Slider'],
    sourcePath: 'src/components/UI/Slider',
    baseUi: [{ label: 'Base UI Slider', url: 'https://base-ui.com/react/components/slider' }],
    examples: [
        {
            id: 'basic',
            title: 'Label and value',
            description:
                'Slider.Label names the slider. Slider.Value shows the value, and its digits roll when the value changes.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'step',
            title: 'Step and maximum',
            description: 'Set max and step on Slider.Root. This slider moves in steps of 50, from 0 to 5,000.',
            Component: Step,
            source: stepSource,
        },
        {
            id: 'range',
            title: 'Range',
            description:
                'Pass an array of two values, and add one Slider.Thumb for each value. Slider.Indicator fills the track between the thumbs.',
            Component: Range,
            source: rangeSource,
        },
        {
            id: 'disabled',
            title: 'Disabled',
            description: 'Set disabled on Slider.Root. The track and the thumb get 50% opacity.',
            Component: Disabled,
            source: disabledSource,
        },
    ],
    notes: [
        <>
            Give each thumb an <Snippet.Inline>{'aria-label'}</Snippet.Inline>. In a range slider, also set{' '}
            <Snippet.Inline>{'index'}</Snippet.Inline> on each thumb.
        </>,
        <>
            When the exact number matters, show <Snippet.Inline>{'Slider.Value'}</Snippet.Inline> or use a{' '}
            <Link to="/components/ui/number-field">NumberField</Link>.
        </>,
    ],
    props: [
        {
            component: 'Slider.Value',
            rows: [
                {
                    name: 'children',
                    type: '(formattedValues, values) => ReactNode',
                    defaultValue: 'An odometer',
                    description: 'Renders the value. Pass a function to replace the rolling digits.',
                },
            ],
        },
    ],
}
