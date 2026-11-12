import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import StandaloneInput from './StandaloneInput'
import standaloneInputSource from '!!../../rawSourceLoader!./StandaloneInput.tsx?raw'
import Validation from './Validation'
import validationSource from '!!../../rawSourceLoader!./Validation.tsx?raw'

import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'field',
    importPath: 'components/UI/Field',
    importNames: ['Field'],
    imports: [{ path: 'components/UI/Input', names: ['Input'] }],
    sourcePath: 'src/components/UI/Field',
    baseUi: [
        { label: 'Base UI Field', url: 'https://base-ui.com/react/components/field' },
        { label: 'Base UI Input', url: 'https://base-ui.com/react/components/input' },
    ],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'Use this for a single line of text, such as a name or an email. Field.Root connects a label, a control, and a description.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'input',
            title: 'Input without a field',
            description:
                'Import Input from components/UI/Input when there is no visible label. It has the same style as Field.Control. Give it an aria-label.',
            Component: StandaloneInput,
            source: standaloneInputSource,
        },
        {
            id: 'validation',
            title: 'Validation',
            description:
                'Type an invalid email, then press Tab. validationMode="onBlur" checks the field when it loses focus.',
            Component: Validation,
            source: validationSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description:
                'Use md by default, and match the size of the buttons beside the field. Use lg only for a single hero field, such as a newsletter sign-up. sm, md, and lg are 26, 36, and 44 pixels high.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'states',
            title: 'States',
            description:
                'Use inset by default. Use line for light or inline editing, such as renaming in place, filters, and quick settings. Use one appearance per form. Set invalid or disabled on Field.Root for the other states.',
            Component: AppearanceStates,
            source: appearanceStatesSource,
        },
    ],
    props: [
        {
            component: 'Field.Control',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the text size, padding, and control height.',
                },
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Keep inset for forms. Use line for light or inline editing, such as renaming in place, filters, and quick settings.',
                },
            ],
        },
        {
            component: 'Input',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the text size, padding, and control height.',
                },
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Keep inset for forms. Use line for light or inline editing, such as renaming in place, filters, and quick settings.',
                },
            ],
        },
    ],
    notes: [
        <>
            A field outside a <Link to="/components/ui/form">Form</Link> validates only on submit, so it never shows
            errors. Put it in a form, or set <Snippet.Inline>{'validationMode'}</Snippet.Inline> to{' '}
            <Snippet.Inline>{'"onBlur"'}</Snippet.Inline> or <Snippet.Inline>{'"onChange"'}</Snippet.Inline>.
        </>,
        <>
            <Snippet.Inline>{'Field.Error'}</Snippet.Inline> without <Snippet.Inline>{'match'}</Snippet.Inline> shows
            the browser message. Set <Snippet.Inline>{'match'}</Snippet.Inline> to a validity key, such as{' '}
            <Snippet.Inline>{'valueMissing'}</Snippet.Inline>, to write your own message.
        </>,
        <>
            For a search box, use <Link to="/components/ui/search-input">SearchInput</Link>.
        </>,
    ],
}
