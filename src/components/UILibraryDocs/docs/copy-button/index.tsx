import type { ComponentDoc } from '../../types'
import Examples from './Examples'
import examplesSource from '!!../../rawSourceLoader!./Examples.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'copy-button',
    importPath: 'components/UI/CopyButton',
    importNames: ['CopyButton'],
    sourcePath: 'src/components/UI/CopyButton',
    apiNote:
        'This site component takes IconButton props for a button element. It supplies the icon, accessible name, and copy behavior.',
    examples: [
        {
            id: 'examples',
            title: 'Examples',
            description: 'Copy fixed or computed text. The last example shows a disabled button.',
            Component: Examples,
            source: examplesSource,
        },
    ],
    notes: [
        'The button announces Copied or Copy failed through a polite live region.',
        'The result icon stays visible for two seconds. On default and secondary buttons, the check is green and the error icon is red. Reduced motion disables the transition.',
        'Clipboard access needs a secure context and browser permission. A failed write shows the error icon.',
        'Use a label that describes the text. getText runs when the user activates the button.',
    ],
    props: [
        {
            component: 'CopyButton',
            rows: [
                { name: 'text', type: 'string', description: 'The text to copy. Use text or getText.' },
                {
                    name: 'getText',
                    type: '() => string',
                    description: 'Returns the text when the user activates the button.',
                },
                { name: 'label', type: 'string', defaultValue: "'Copy'", description: 'The accessible button name.' },
                { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'sm'", description: 'The IconButton size.' },
                {
                    name: 'variant',
                    type: "'default' | 'primary' | 'secondary' | 'danger'",
                    defaultValue: "'default'",
                    description: 'The IconButton appearance.',
                },
                { name: 'onCopy', type: '() => void', description: 'Runs after a successful clipboard write.' },
            ],
        },
    ],
}
