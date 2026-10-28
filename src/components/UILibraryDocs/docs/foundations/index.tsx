import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import FieldStates from './FieldStates'
import fieldStatesSource from '!!../../rawSourceLoader!./FieldStates.tsx?raw'
import Motion from './Motion'
import motionSource from '!!../../rawSourceLoader!./Motion.tsx?raw'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'foundations',
    sourcePath: 'src/components/UI/styles.ts',
    examples: [
        {
            id: 'field-states',
            title: 'Field states',
            description:
                'Enabled fields are lighter than the window. Invalid fields get a red border. Disabled fields get a dashed border and a hatched fill.',
            Component: FieldStates,
            source: fieldStatesSource,
        },
        {
            id: 'surfaces',
            title: 'One surface for every field',
            description:
                'Inputs, checkbox and radio boxes, switch and progress tracks, and chips all use the same see-through white fill.',
            Component: Surfaces,
            source: surfacesSource,
        },
        {
            id: 'motion',
            title: 'Motion',
            description: 'Components animate with CSS only. No JavaScript runs per frame.',
            Component: Motion,
            source: motionSource,
        },
    ],
    notes: [
        'Fields and buttons share three heights: sm is 26px, md is 36px (the default), and lg is 44px. Use one size in a row.',
        'Fields use a see-through white fill, so they work on every wallpaper. Do not give a field a gray fill, because gray reads as disabled.',
        <>
            For your own borders and dividers, use the text color at low opacity, such as{' '}
            <Snippet.Inline>{'rgb(var(--text-primary)/0.16)'}</Snippet.Inline>, not a fixed gray.
        </>,
        <>
            Use the shared classes in <Snippet.Inline>{'styles.ts'}</Snippet.Inline> for focus rings, surfaces, and
            shadows. Do not copy their values.
        </>,
        <>
            Animate only <Snippet.Inline>{'transform'}</Snippet.Inline>, <Snippet.Inline>{'opacity'}</Snippet.Inline>,
            and colors, and add <Snippet.Inline>{'motion-reduce:transition-none'}</Snippet.Inline>.
        </>,
    ],
}
