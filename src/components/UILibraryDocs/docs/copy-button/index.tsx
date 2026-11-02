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
            title: 'Text sources',
            description: 'Pass text for a fixed value, or getText to compute the value when the user clicks.',
            Component: Examples,
            source: examplesSource,
        },
    ],
    notes: [
        'Use a label that names what is copied, such as "Copy API key".',
        'Copying needs a secure context (HTTPS). When the browser blocks it, the button shows an error icon.',
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
                    name: 'appearance',
                    type: "'flat' | 'raised' | 'outline'",
                    defaultValue: "'raised'",
                    description: 'The shape: flat, raised 3D, or outlined.',
                },
                {
                    name: 'variant',
                    type: "'primary' | 'secondary' | 'danger'",
                    defaultValue: "'secondary'",
                    description: 'The meaning and color: brand orange, neutral, or destructive red.',
                },
                { name: 'onCopy', type: '() => void', description: 'Runs after a successful clipboard write.' },
                {
                    name: 'actionsRef',
                    type: 'React.Ref<{ copy(): void }>',
                    description: 'Gives a ref whose copy() copies the text without a click.',
                },
            ],
        },
    ],
}
