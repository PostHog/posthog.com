import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Appearances from './Appearances'
import appearancesSource from '!!../../rawSourceLoader!./Appearances.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'
import Invalid from './Invalid'
import invalidSource from '!!../../rawSourceLoader!./Invalid.tsx?raw'
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
                'Field.Root connects a label, a control, and a description. Field.Control is a styled text input.',
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
                'Set validationMode="onBlur" to validate when the field loses focus. A Field.Error with match shows its text for one validity error.',
            Component: Validation,
            source: validationSource,
        },
        {
            id: 'invalid',
            title: 'Invalid state',
            description:
                'Set invalid on Field.Root when your code finds an error, for example a name that is taken. The control gets a red border, or a yellow border in dark mode.',
            Component: Invalid,
            source: invalidSource,
        },
        {
            id: 'disabled',
            title: 'Disabled',
            description:
                'Set disabled on Field.Root. The control gets a dashed border, a hatched fill, and 70% opacity. The label becomes muted.',
            Component: Disabled,
            source: disabledSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Select sm, md, or lg. The button uses the same size.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'appearances',
            title: 'Appearances',
            description:
                'Inset is the default for forms. Soft suits fields inside cards and popovers, where a second inset box looks heavy. For a search bar, use SearchInput, which also has pill and floating shapes.',
            Component: Appearances,
            source: appearancesSource,
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
                    type: "'inset' | 'soft'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Keep inset for forms. Use soft inside cards, popovers, and dialogs.',
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
                    type: "'inset' | 'soft'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Keep inset for forms. Use soft inside cards, popovers, and dialogs.',
                },
            ],
        },
    ],
    notes: [
        <>
            Use the default <code>inset</code> appearance for form fields. Use <code>soft</code> when the field sits
            inside a card, a popover, or a dialog. Do not mix appearances in one form. For a search bar, use{' '}
            <Link to="/components/ui/search-input">SearchInput</Link>.
        </>,
        <>
            The default <code>validationMode</code> is <code>onSubmit</code>. A field outside a form thus never shows
            its errors. Put the field in a <Link to="/components/ui/form">Form</Link>, or set{' '}
            <code>validationMode=&quot;onBlur&quot;</code> or <code>&quot;onChange&quot;</code>.
        </>,
        <>
            <code>Field.Error</code> without <code>match</code> shows the message from the browser. Set{' '}
            <code>match</code> to a validity key, for example <code>valueMissing</code>, to show your own text. Set{' '}
            <code>match</code> to <code>true</code> to show the message at all times.
        </>,
        <>
            Other controls also work inside <code>Field.Root</code>. They get the label, the validation, and the error
            state of the field. See <Link to="/components/ui/textarea">Textarea</Link> and{' '}
            <Link to="/components/ui/number-field">NumberField</Link>.
        </>,
        <>
            Fields have a see-through fill, so they work on the frosted windows of the site. See{' '}
            <Link to="/components/ui/foundations">Fields and motion</Link>.
        </>,
    ],
}
