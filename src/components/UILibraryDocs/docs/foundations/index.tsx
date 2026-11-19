import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Appearances from './Appearances'
import appearancesSource from '!!../../rawSourceLoader!./Appearances.tsx?raw'
import Depth from './Depth'
import depthSource from '!!../../rawSourceLoader!./Depth.tsx?raw'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'
import FieldStates from './FieldStates'
import fieldStatesSource from '!!../../rawSourceLoader!./FieldStates.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'
import States from './States'
import statesSource from '!!../../rawSourceLoader!./States.tsx?raw'
import Focus from './Focus'
import focusSource from '!!../../rawSourceLoader!./Focus.tsx?raw'
import Motion from './Motion'
import motionSource from '!!../../rawSourceLoader!./Motion.tsx?raw'
import Grain from './Grain'
import grainSource from '!!../../rawSourceLoader!./Grain.tsx?raw'
import Glass from './Glass'
import glassSource from '!!../../rawSourceLoader!./Glass.tsx?raw'
import Tones from './Tones'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'
import Radius from './Radius'
import radiusSource from '!!../../rawSourceLoader!./Radius.tsx?raw'
import Overflow from './Overflow'
import overflowSource from '!!../../rawSourceLoader!./Overflow.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'foundations',
    sourcePath: 'src/components/UI/styles.ts',
    examples: [
        {
            id: 'appearances',
            title: 'Flat, outline, and raised',
            description:
                'Buttons, button groups, toggles, and tabs share these looks. For buttons, use raised by default, flat in toolbars and in actions that repeat in a list, and outline for a secondary action next to a raised one.',
            Component: Appearances,
            source: appearancesSource,
        },
        {
            id: 'depth',
            title: 'Depth',
            description:
                'Light comes from above. Sunken surfaces have a darker top edge: a darker top border in light mode, and a dark inner line in dark mode. Raised surfaces have a dark lip under the bottom edge. Floating surfaces cast a soft shadow.',
            Component: Depth,
            source: depthSource,
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
            id: 'field-states',
            title: 'Field states',
            description:
                'Enabled fields are lighter than the window. Invalid fields get a red border. Disabled fields get a dashed border and a hatched fill.',
            Component: FieldStates,
            source: fieldStatesSource,
        },
        {
            id: 'disabled',
            title: 'Disabled',
            description:
                'Small controls fade to 50%. Fields, cards, and outline buttons get a dashed border and diagonal lines. Raised buttons keep their shape and get diagonal lines on the face. Menu items and text triggers turn muted.',
            Component: Disabled,
            source: disabledSource,
        },
        {
            id: 'states',
            title: 'Hover, press, and latched',
            description:
                'Neutral controls darken by the text color: 6% on hover, 12% while pressed, and 10% when latched on, such as a pressed toggle or an open menu trigger. Press changes are instant. Orange means checked.',
            Component: States,
            source: statesSource,
        },
        {
            id: 'focus',
            title: 'Focus',
            description:
                'Keyboard focus shows a ring 2px outside the control. Fields show an orange border and glow. A control at the edge of something that clips or scrolls uses a ring inside its edge instead.',
            Component: Focus,
            source: focusSource,
        },
        {
            id: 'motion',
            title: 'Motion',
            description:
                'Most motion uses CSS or the Web Animations API. An open Combobox runs one short frame loop while its field grows, and skips it under reduced motion.',
            Component: Motion,
            source: motionSource,
        },
        {
            id: 'grain',
            title: 'Grain',
            description:
                'Containers and floating surfaces get a fine noise texture. Fields, tracks, flat controls, and small labels stay smooth.',
            Component: Grain,
            source: grainSource,
        },
        {
            id: 'glass',
            title: 'Glass',
            description:
                'Floating controls over images use liquid glass. Dialogs use a blurred frosted surface. When the user reduces transparency, both become solid.',
            Component: Glass,
            source: glassSource,
        },
        {
            id: 'tones',
            title: 'Status colors',
            description:
                'Status names resolve to brand colors: info is blue, success is green, warning is yellow, and error is coral. Use soft when many labels show together, and solid for one label that must stand out.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description:
                'Fields and buttons share three heights: sm is 26px, md is 36px, and lg is 44px. Use md by default, sm in toolbars, table rows, and cards, and lg only for a hero. Use one size in a row.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'radius',
            title: 'Corner radius',
            description:
                'Small controls use 4px corners. Medium and large controls use 6px. Cards and sections use 8px. Chips and pills are fully round.',
            Component: Radius,
            source: radiusSource,
        },
        {
            id: 'overflow',
            title: 'Long text',
            description:
                'One-line labels in controls and navigation cut off with an ellipsis and show the full text on hover. Messages and descriptions wrap instead.',
            Component: Overflow,
            source: overflowSource,
        },
    ],
    notes: [
        'Fields use a see-through white fill, so they work on every wallpaper. Do not give a field a gray fill, because gray reads as disabled.',
        <>
            For your own borders and dividers, use the text color at low opacity, such as{' '}
            <Snippet.Inline>{'rgb(var(--text-primary)/0.16)'}</Snippet.Inline>, not a fixed gray.
        </>,
        <>
            Use the shared classes in <Snippet.Inline>{'styles.ts'}</Snippet.Inline> for every pattern on this page. Do
            not copy their values. Tailwind only builds class names that appear in full in the source, so share a value
            through a named class or a theme entry, never by inserting part of a class name.
        </>,
        <>
            Draw a raised lip as a hard outer shadow, and reserve the space for it with{' '}
            <Snippet.Inline>{'edgeSpace'}</Snippet.Inline>, so a parent that clips or scrolls does not cut it off.
        </>,
        <>
            Every movement needs a reduced-motion rule, such as{' '}
            <Snippet.Inline>{'motion-reduce:transition-none'}</Snippet.Inline>. Decorative loops stop. A spinner keeps
            turning slowly, because it is the only sign that work is in progress.
        </>,
        <>
            Every see-through surface needs a solid fallback under{' '}
            <Snippet.Inline>{'reduce-transparency:'}</Snippet.Inline>. Bars and tracks use{' '}
            <Snippet.Inline>{'barForcedTrack'}</Snippet.Inline> and{' '}
            <Snippet.Inline>{'barForcedIndicator'}</Snippet.Inline> so they stay visible in forced-colors mode.
        </>,
    ],
    props: [
        {
            component: 'Appearance and depth',
            rows: [
                {
                    name: 'surfaceAppearances',
                    type: 'plain | outlined | raised',
                    description:
                        'Container looks for menubars, toolbars, tables, and similar. Use raised on the window, plain inside a card, and outlined in a Section.',
                },
                {
                    name: 'controlSurface, sunkenTopEdge',
                    type: 'darker top border',
                    description: 'Sunken surfaces: fields, checkbox boxes, inset cards, and snippets.',
                },
                {
                    name: 'roundControlSurface, trackSurface',
                    type: 'inset top shadow',
                    description: 'Radio boxes, switches, and slider and progress tracks.',
                },
                {
                    name: 'cardLevels',
                    type: '1 raised, 2 sunken',
                    description: 'Cards. Level 1 is raised; a card nested inside it becomes level 2 and sinks in.',
                },
                {
                    name: 'edgeSpace',
                    type: "'mb-px'",
                    description: 'Reserves the 1px under a raised lip. Level 1 cards already include it.',
                },
                {
                    name: 'overlayShadowSm, raisedOverlayShadowMd, overlayShadowLg',
                    type: 'soft shadows',
                    description: 'Floating surfaces: tooltips, popups and toasts, dialogs and drawers.',
                },
            ],
        },
        {
            component: 'States',
            rows: [
                {
                    name: 'neutralHover, neutralPress, neutralLatched',
                    type: '6% · 12% · 10%',
                    description:
                        'Neutral hover, instant press, and latched tints. flatPressable combines hover and press.',
                },
                {
                    name: 'disabledControl',
                    type: '50% fade',
                    description: 'Disabled checkboxes, radios, switches, and sliders.',
                },
                {
                    name: 'fieldState, bg-hatch',
                    type: 'dashed border + hatch',
                    description:
                        'Disabled fields and cards. Use the bg-hatch class with any variant for the diagonal lines.',
                },
                {
                    name: 'focusRing, insetFocusRing',
                    type: 'outline outside · inside',
                    description: 'Use the inside ring for a control at a clipping or scrolling edge.',
                },
            ],
        },
        {
            component: 'Material, color, and shape',
            rows: [
                {
                    name: 'grainSurface',
                    type: "'ui-grain'",
                    description: 'Noise texture for containers and floating surfaces.',
                },
                {
                    name: 'liquidGlassSurface, dialogSurface',
                    type: 'blur + fallback',
                    description:
                        'Glass for floating controls and for dialogs. Both turn solid under reduced transparency.',
                },
                {
                    name: 'statusColors, resolveColor',
                    type: 'status → color',
                    description:
                        'Turns info, success, warning, and error into brand colors for badges, notes, and toasts.',
                },
                {
                    name: 'controlRadius',
                    type: 'sm 4px · md 6px · lg 6px',
                    description: 'Corners for buttons, fields, and button groups.',
                },
                {
                    name: 'TruncatedText, wrapText',
                    type: 'ellipsis · wrap',
                    description: 'One-line control and navigation labels, and wrapping content text.',
                },
            ],
        },
    ],
}
