import React from 'react'
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
            In a range slider, set <code>index</code> on each <code>Slider.Thumb</code>. Server-side rendering needs it
            to place the thumbs.
        </>,
        <>
            Give each <code>Slider.Thumb</code> an <code>aria-label</code>. In a range slider, the labels tell the two
            thumbs apart.
        </>,
        <>
            <code>Slider.Value</code> rolls each digit as a column of 0–9 that CSS draws with <code>content</code>. The
            digits are thus not DOM text. A hidden copy of the value is there for screen readers.
        </>,
        <>
            Each step of the roll is one line height, so keep that line height a whole number of pixels. The default{' '}
            <code>text-sm</code> gives 20px.
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
