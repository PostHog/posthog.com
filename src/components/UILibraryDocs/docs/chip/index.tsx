import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Plain from './Plain'
import plainSource from '!!../../rawSourceLoader!./Plain.tsx?raw'
import Removable from './Removable'
import removableSource from '!!../../rawSourceLoader!./Removable.tsx?raw'
import WithIcon from './WithIcon'
import withIconSource from '!!../../rawSourceLoader!./WithIcon.tsx?raw'
import WithImage from './WithImage'
import withImageSource from '!!../../rawSourceLoader!./WithImage.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'chip',
    importPath: 'components/UI/Chip',
    importNames: ['Chip'],
    sourcePath: 'src/components/UI/Chip',
    apiNote: 'Chip is a site component, not a Base UI component. It also takes all the props of a <span>.',
    examples: [
        {
            id: 'plain',
            title: 'Plain',
            description: 'A chip with only text.',
            Component: Plain,
            source: plainSource,
        },
        {
            id: 'with-icon',
            title: 'With an icon',
            description: 'Pass icon to show an icon before the text.',
            Component: WithIcon,
            source: withIconSource,
        },
        {
            id: 'with-image',
            title: 'With an image',
            description: 'Pass image (a URL) to show a round image before the text.',
            Component: WithImage,
            source: withImageSource,
        },
        {
            id: 'removable',
            title: 'Removable',
            description: 'Pass onRemove to add a remove button. Remove all the chips to show the reset button.',
            Component: Removable,
            source: removableSource,
        },
    ],
    notes: [
        <>
            <code>Chip</code> is a site component, not a Base UI component. It renders a <code>{'<span>'}</code> and
            takes all <code>{'<span>'}</code> props.
        </>,
        <>
            If you pass both <code>image</code> and <code>icon</code>, only the image shows.
        </>,
        <>
            The image has an empty <code>alt</code>, so the text must name the chip.
        </>,
        <>
            The remove button gets its label from the text, for example &quot;Remove Beta&quot;. If the children are not
            a string, the label is only &quot;Remove&quot;, so pass <code>removeLabel</code>.
        </>,
        <>A long label truncates when the chip is wider than its container.</>,
        <>
            <code>Combobox.Chip</code> uses the same styles. See <Link to="/components/ui/combobox">Combobox</Link>.
        </>,
    ],
    props: [
        {
            component: 'Chip',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'The label. Required.' },
                { name: 'icon', type: 'ReactNode', description: 'An icon before the text.' },
                {
                    name: 'image',
                    type: 'string',
                    description: 'The URL of a round image before the text. It replaces the icon.',
                },
                {
                    name: 'onRemove',
                    type: '() => void',
                    description: 'Adds a remove button. A click on the button calls this function.',
                },
                {
                    name: 'removeLabel',
                    type: 'string',
                    defaultValue: "'Remove <text>'",
                    description: 'The accessible name of the remove button.',
                },
            ],
        },
    ],
}
