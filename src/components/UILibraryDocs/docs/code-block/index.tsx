import React from 'react'
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

const migrationRows = [
    ['children: LanguageOption[]', 'snippets', 'Add a unique id to each option. Keep code and language.'],
    ['SingleCodeBlock children + language', 'snippets={[{ id, code, language }]}', 'Use one snippet.'],
    [
        'currentLanguage / onChange',
        'value / onValueChange',
        'Replace the selected LanguageOption with its snippet id. The callback returns an id, not a LanguageOption.',
    ],
    ['file / label', 'fileName / label', 'Set these fields on each snippet.'],
    [
        'showLineNumbers / lineNumberStart',
        'lineNumbers / lineNumberStart',
        'The displayed starting number remains configurable.',
    ],
    ['showCopy / onCopy', 'showCopy / onCopy', 'The callback runs only after a successful copy.'],
    [
        'selector',
        'Library Tabs',
        'Tabs scroll horizontally without a visible scrollbar. Keyboard focus reveals tabs. There is no dropdown mode.',
    ],
    ['showLabel / showTitle', 'Always-visible header', 'The header identifies the code and holds the copy action.'],
    ['// HIGHLIGHT', 'highlightedLines', 'Remove the marker from code. Supply one-based line positions.'],
    [
        '// + or # + / // - or # -',
        'addedLines / removedLines',
        'Remove the markers from code. Supply one-based line positions.',
    ],
    [
        'focusOnLines',
        'No direct equivalent',
        'maxHeight limits long blocks. It does not fold code around a selected range.',
    ],
    ['tooltips / // TIP:', 'Not implemented', 'Keep line tooltip behavior in a future site adapter.'],
    [
        'showAskAI / runInPostHog',
        'Site adapter',
        'Keep AI actions and SQL editor links outside this display component.',
    ],
    [
        'Project placeholders',
        'Prepare code before render',
        'Replace project values in the adapter. Copy preserves the supplied code.',
    ],
    [
        'MdxCodeBlock / MultiLanguage',
        'Future MDX adapter',
        'Convert pre/code children and fence metadata into snippets. Keep Mermaid separate.',
    ],
]

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
            description:
                'The second file starts selected. Resize the window to check horizontal tabs without a visible scrollbar.',
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
            description:
                'Line metadata uses one-based positions. The displayed numbers can start at a different value.',
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
        'The header uses the file name, then the label, then the language label. A single file also shows its language. Unknown languages display as plain text.',
        'Use value and onValueChange for controlled selection. Use defaultValue for initial selection. className merges with the root styles.',
        'Each mounted snippet retains its expansion state. ResizeObserver measures the content height. The focusable region supports horizontal and vertical scrolling.',
        'The solid white and near-black surfaces isolate code from glass. File tabs join the code pane. plainCode removes global code styles.',
        'The existing CodeBlock lightTheme and darkTheme supply familiar syntax colors. CSS variables switch colors with the site theme.',
        'Copy preserves whitespace and copies the complete active snippet, even when the viewport is collapsed. It excludes line numbers and diff markers.',
        'maxHeight uses pixels. Show more appears only when code exceeds this height. CSS animates the height; reduced motion disables the transition.',
        'Use unique, stable snippet ids. Empty lists render nothing. An absent selection falls back to the first snippet.',
        'The owner selected the solid editor design for stable contrast and familiar docs syntax. Line numbers use a separate gutter.',
        'Tabs scroll horizontally without a visible scrollbar. Selection, keyboard focus, and container resizing reveal the active tab. Code panes retain scrollbars.',
        'Highlights and diff lines use a one-pixel marker and a tinted fill. Diff signs provide a second visual cue.',
        'Do not mark the same line as both added and removed. Diff lines have signs and screen reader labels, in addition to color.',
        <div key="migration">
            <h3>Migration from the old CodeBlock</h3>
            <p>
                The old src/components/CodeBlock remains in use. This table maps its props to the library API. Existing
                MDX mappings remain unchanged.
            </p>
            <div className="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Old API</th>
                            <th>New API</th>
                            <th>Migration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {migrationRows.map(([oldApi, newApi, description]) => (
                            <tr key={oldApi}>
                                <td>{oldApi}</td>
                                <td>{newApi}</td>
                                <td>{description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p>
                MDX templates map pre and MultiLanguage to MdxCodeBlock. That adapter reads language-* classes and fence
                metadata from code children.
            </p>
            <p>
                A future adapter must parse those inputs, remove annotation markers, replace project values, and
                preserve Mermaid handling.
            </p>
        </div>,
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
