import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Files from './Files'
import filesSource from '!!../../rawSourceLoader!./Files.tsx?raw'
import Languages from './Languages'
import languagesSource from '!!../../rawSourceLoader!./Languages.tsx?raw'
import LineChanges from './LineChanges'
import lineChangesSource from '!!../../rawSourceLoader!./LineChanges.tsx?raw'
import LongFiles from './LongFiles'
import longFilesSource from '!!../../rawSourceLoader!./LongFiles.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'code-block',
    importPath: 'components/UI/CodeBlock',
    importNames: ['CodeBlock'],
    sourcePath: 'src/components/UI/CodeBlock',
    apiNote:
        'CodeBlock is a site component. It accepts div attributes and a div ref. Import CodeSnippet and CodeBlockProps as types.',
    examples: [
        {
            id: 'basic',
            title: 'A file',
            description: 'The header shows the file name, language, and copy action.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'files',
            title: 'Multiple files',
            description: 'One tab per file. Set defaultValue to choose the first selected file.',
            Component: Files,
            source: filesSource,
        },
        {
            id: 'languages',
            title: 'Languages',
            description: 'Use arrow keys to change tabs. Tabs scroll when the container is narrow.',
            Component: Languages,
            source: languagesSource,
        },
        {
            id: 'line-changes',
            title: 'Highlights and changes',
            description: 'Highlight lines, and mark lines as added or removed. Line numbers can start at any value.',
            Component: LineChanges,
            source: lineChangesSource,
        },
        {
            id: 'long-files',
            title: 'Long blocks and long lines',
            description: 'Show more expands tall code. Focus the code region to scroll with the keyboard.',
            Component: LongFiles,
            source: longFilesSource,
        },
    ],
    notes: [
        <>
            Use CodeBlock for multi-line code and file tabs. For a command to copy, use{' '}
            <Link to="/components/ui/snippet">Snippet</Link>. For code in a sentence, use{' '}
            <Snippet.Inline>{'Snippet.Inline'}</Snippet.Inline>.
        </>,
        <>
            Give each snippet a stable, unique <Snippet.Inline>{'id'}</Snippet.Inline>.
        </>,
        <>
            Set <Snippet.Inline>{'maxHeight'}</Snippet.Inline> for long files. The Show more control appears only when
            the code is taller.
        </>,
    ],
    props: [
        {
            component: 'CodeBlock',
            rows: [
                {
                    name: 'snippets',
                    type: 'readonly CodeSnippet[]',
                    description: 'The code files or language options.',
                },
                {
                    name: 'value / defaultValue',
                    type: 'string',
                    defaultValue: 'First snippet id',
                    description: 'The controlled or initial active snippet id.',
                },
                {
                    name: 'onValueChange',
                    type: '(id: string) => void',
                    description:
                        'Runs when the user selects a snippet. Returns its id, not the old LanguageOption object.',
                },
                {
                    name: 'lineNumbers',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows the line-number gutter.',
                },
                {
                    name: 'lineNumberStart',
                    type: 'number',
                    defaultValue: '1',
                    description: 'Sets the first displayed number. It does not change line metadata positions.',
                },
                {
                    name: 'maxHeight',
                    type: 'number',
                    description:
                        'Limits the collapsed code height in pixels. Show more reveals the complete snippet. Omit it to show all code.',
                },
                {
                    name: 'showCopy',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows the library CopyButton.',
                },
                { name: 'onCopy', type: '() => void', description: 'Runs after the clipboard write succeeds.' },
                { name: 'className', type: 'string', description: 'Merges classes with the solid editor surface.' },
                { name: 'ref', type: 'Ref<HTMLDivElement>', description: 'References the outer div.' },
            ],
        },
        {
            component: 'CodeSnippet',
            rows: [
                { name: 'id', type: 'string', description: 'A unique, stable id for selection and expansion state.' },
                {
                    name: 'code',
                    type: 'string',
                    description: 'The complete source text. Whitespace remains unchanged.',
                },
                {
                    name: 'language',
                    type: 'string',
                    defaultValue: 'Plain text',
                    description: 'A Prism language or an alias from the existing language map.',
                },
                {
                    name: 'fileName / label',
                    type: 'string',
                    description: 'Sets the header or tab text. The file name takes priority.',
                },
                {
                    name: 'highlightedLines',
                    type: 'readonly number[]',
                    description:
                        'One-based positions of highlighted lines. Each line has a tinted fill and a one-pixel marker.',
                },
                {
                    name: 'addedLines / removedLines',
                    type: 'readonly number[]',
                    description: 'One-based positions of diff lines. These fields do not alter the code.',
                },
            ],
        },
    ],
}
