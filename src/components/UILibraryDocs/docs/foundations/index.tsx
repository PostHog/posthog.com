import React from 'react'
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
        <>
            Fields and buttons share three heights: sm is 26px, md is 36px, and lg is 44px. Text areas use the same text
            sizes and padding scale.
        </>,
        <>
            Site windows are frosted glass, so the color behind a field changes with the wallpaper. Fields use a
            see-through white fill (50% in light mode, 8% in dark mode), so they are lighter than the window. Do not use
            a gray fill: a gray field looks disabled.
        </>,
        <>
            Borders, dividers, and hover fills use the text color at low opacity, for example{' '}
            <code>rgb(var(--text-primary)/0.16)</code>. They work on every wallpaper.
        </>,
        <>
            Focus is an orange border and a soft orange glow. Disabled is a dashed border, a hatched fill, and 70%
            opacity.
        </>,
        <>
            Only floating surfaces (popups, dialogs, drawers, and toasts) use the solid <code>bg-primary</code>, because
            they sit above other content.
        </>,
        <>
            Overlay shadows use three steps in <code>styles.ts</code>: small (<code>overlayShadowSm</code>), medium (
            <code>overlayShadowMd</code>), and large (<code>overlayShadowLg</code>). Popups and toasts also get a 1px
            bottom edge in the border color: <code>raisedOverlayShadowMd</code>.
        </>,
        <>
            Animations use transitions on <code>transform</code>, <code>opacity</code>, colors, SVG strokes, and panel
            heights. Every animated part has <code>motion-reduce:transition-none</code>.
        </>,
        <>
            Popups animate with Base UI&apos;s <code>data-[starting-style]</code> and <code>data-[ending-style]</code>{' '}
            attributes. They skip the animation only for <code>data-instant=&quot;group&quot;</code> and{' '}
            <code>&quot;trigger-change&quot;</code>.
        </>,
    ],
}
