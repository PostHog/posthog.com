import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'switch',
    importPath: 'components/UI/Switch',
    importNames: ['Switch'],
    sourcePath: 'src/components/UI/Switch',
    baseUi: [{ label: 'Base UI Switch', url: 'https://base-ui.com/react/components/switch' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description: 'Put Switch.Thumb in Switch.Root. When the switch is on, the track is orange.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'controlled',
            title: 'Controlled',
            description: 'Pass checked and onCheckedChange to keep the state in your component.',
            Component: Controlled,
            source: controlledSource,
        },
        {
            id: 'disabled',
            title: 'Disabled',
            description: 'A disabled switch has 50% opacity. Add text-muted to the label yourself.',
            Component: Disabled,
            source: disabledSource,
        },
    ],
    notes: [
        <>
            Use a switch for a setting that takes effect at once. In a form that the user submits, use a{' '}
            <Link to="/components/ui/checkbox">Checkbox</Link>.
        </>,
        <>
            Put <code>Switch.Root</code> and its text in a <code>{'<label>'}</code>. Then a click on the text toggles
            the switch.
        </>,
        <>
            <code>Switch.Thumb</code> renders a raised face with two grip lines. The face moves down a little when the
            user presses the switch.
        </>,
    ],
    props: [
        {
            component: 'Switch.Thumb',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: 'A raised face',
                    description: 'The face of the thumb. Pass children to replace it.',
                },
            ],
        },
    ],
}
