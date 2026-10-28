import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Examples from './Examples'
import examplesSource from '!!../../rawSourceLoader!./Examples.tsx?raw'
import Inline from './Inline'
import inlineSource from '!!../../rawSourceLoader!./Inline.tsx?raw'
import Colors from './Colors'
import InlineColors from './InlineColors'
import inlineColorsSource from '!!../../rawSourceLoader!./InlineColors.tsx?raw'
import colorsSource from '!!../../rawSourceLoader!./Colors.tsx?raw'
import CopyOnClick from './CopyOnClick'
import copyOnClickSource from '!!../../rawSourceLoader!./CopyOnClick.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'snippet',
    importPath: 'components/UI/Snippet',
    importNames: ['Snippet'],
    sourcePath: 'src/components/UI/Snippet',
    apiNote:
        'Snippet is a site component. The block takes div element props and supplies the copy button. Snippet.Inline takes code element props.',
    examples: [
        {
            id: 'examples',
            title: 'Examples',
            description: 'One command, several commands, or a line without a prompt.',
            Component: Examples,
            source: examplesSource,
        },
        {
            id: 'inline',
            title: 'Inline code',
            description: 'Snippet.Inline puts code, URLs, and values inside a sentence. Long values wrap.',
            Component: Inline,
            source: inlineSource,
        },
        {
            id: 'colors',
            title: 'Colors',
            description:
                'Gray is the default and lets the surface show through. White and the brand colors are opaque.',
            Component: Colors,
            source: colorsSource,
        },
        {
            id: 'inline-colors',
            title: 'Every inline color',
            description: 'Every color, as inline code.',
            Component: InlineColors,
            source: inlineColorsSource,
        },
        {
            id: 'copy-on-click',
            title: 'Copy on click',
            description:
                'By default, a click selects the whole snippet. With copyOnClick, a click also copies it. Use it for values that people copy often, such as tokens and install commands.',
            Component: CopyOnClick,
            source: copyOnClickSource,
        },
    ],
    notes: [
        <>
            Use Snippet for a command to copy, and <Snippet.Inline>{'Snippet.Inline'}</Snippet.Inline> for code in a
            sentence. For multi-line code, use <Link to="/components/ui/code-block">CodeBlock</Link>.
        </>,
        'Use gray in most cases, and one other color per section at most. The colors are decoration and have no status meaning.',
    ],
    props: [
        {
            component: 'Snippet',
            rows: [
                {
                    name: 'text',
                    type: 'string | readonly string[]',
                    description: 'The code or command lines. Required.',
                },
                {
                    name: 'prompt',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Show a dollar prompt before each line.',
                },
                {
                    name: 'color',
                    type: "'gray' | 'white' | 'blue' | 'cobalt' | 'coral' | 'corn-blue' | 'green' | 'lemon' | 'lime' | 'purple' | 'tangerine' | 'teal' | 'violet' | 'yellow'",
                    defaultValue: "'gray'",
                    description: 'Sets the fill, border, and text color.',
                },
                {
                    name: 'copyOnClick',
                    type: 'boolean',
                    defaultValue: 'false',
                    description:
                        'Copies the snippet when the user clicks it. Without it, a click selects the whole snippet.',
                },
                {
                    name: 'onCopy',
                    type: '() => void',
                    description: 'Runs after the copy button writes to the clipboard.',
                },
            ],
        },
        {
            component: 'Snippet.Inline',
            rows: [
                {
                    name: 'color',
                    type: "'gray' | 'white' | 'blue' | 'cobalt' | 'coral' | 'corn-blue' | 'green' | 'lemon' | 'lime' | 'purple' | 'tangerine' | 'teal' | 'violet' | 'yellow'",
                    defaultValue: "'gray'",
                    description: 'Sets the fill, border, and text color.',
                },
                {
                    name: 'copyOnClick',
                    type: 'boolean',
                    defaultValue: 'false',
                    description:
                        'Copies the snippet when the user clicks it. Without it, a click selects the whole snippet.',
                },
                {
                    name: 'onCopy',
                    type: '() => void',
                    description: 'Runs after a click copies the text. Needs copyOnClick.',
                },
                { name: 'children', type: 'ReactNode', description: 'The code text.' },
            ],
        },
    ],
}
