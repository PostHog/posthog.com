import type { ComponentDoc } from '../../types'
import Examples from './Examples'
import examplesSource from '!!../../rawSourceLoader!./Examples.tsx?raw'
import Inline from './Inline'
import inlineSource from '!!../../rawSourceLoader!./Inline.tsx?raw'
import Tones from './Tones'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'

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
            description: 'Show one command, multiple commands, or code without prompts.',
            Component: Examples,
            source: examplesSource,
        },
        {
            id: 'inline',
            title: 'Inline code',
            description: 'Snippet.Inline puts code, URLs, and values inside a sentence. It wraps long values.',
            Component: Inline,
            source: inlineSource,
        },
        {
            id: 'tones',
            title: 'Accents',
            description: 'The neutral style is the default. Use tone to accent a key command or value.',
            Component: Tones,
            source: tonesSource,
        },
    ],
    notes: [
        'Snippet replaces InlineCode. Use Snippet.Inline for code in a sentence and the block for a command to copy.',
        'Replaces: the inline code helper in Products/ReaderViewProduct/helpers.tsx. Use tone="brand" for its orange look.',
        'Use one accent per section at most. The neutral style suits most technical copy.',
        'Inline code is 0.82em, so it scales with headings and body text.',
        'The copy button copies every line with newline separators. It excludes the prompts.',
        'Prompts are hidden from assistive technology and cannot be selected.',
        'Long lines scroll horizontally. Keyboard users can focus the code region.',
        'The copy button announces copy results through a polite live region.',
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
                    name: 'tone',
                    type: "'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'",
                    defaultValue: "'neutral'",
                    description: 'Sets the fill, border, and text color.',
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
                    name: 'tone',
                    type: "'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'",
                    defaultValue: "'neutral'",
                    description: 'Sets the fill, border, and text color.',
                },
                { name: 'children', type: 'ReactNode', description: 'The code text.' },
            ],
        },
    ],
}
