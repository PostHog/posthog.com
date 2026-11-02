import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import FieldsetFooter from './FieldsetFooter'
import fieldsetFooterSource from '!!../../rawSourceLoader!./FieldsetFooter.tsx?raw'
import ContactForm from './ContactForm'
import contactFormSource from '!!../../rawSourceLoader!./ContactForm.tsx?raw'
import FieldsetGroup from './FieldsetGroup'
import fieldsetGroupSource from '!!../../rawSourceLoader!./FieldsetGroup.tsx?raw'
import ServerErrors from './ServerErrors'
import serverErrorsSource from '!!../../rawSourceLoader!./ServerErrors.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'form',
    importPath: 'components/UI/Form',
    importNames: ['Form'],
    imports: [{ path: 'components/UI/Fieldset', names: ['Fieldset'] }],
    sourcePath: 'src/components/UI/Form',
    baseUi: [
        { label: 'Base UI Form', url: 'https://base-ui.com/react/components/form' },
        { label: 'Base UI Fieldset', url: 'https://base-ui.com/react/components/fieldset' },
    ],
    examples: [
        {
            id: 'fieldsetfooter',
            title: 'Fieldset footer',
            description: 'Place helper text or actions in Fieldset.Footer below the fields.',
            Component: FieldsetFooter,
            source: fieldsetFooterSource,
        },
        {
            id: 'submit',
            title: 'Submit a form',
            description:
                'Form validates its fields when the user submits. If all fields are valid, onFormSubmit gets the values by field name.',
            Component: ContactForm,
            source: contactFormSource,
        },
        {
            id: 'server-errors',
            title: 'Errors from a server',
            description:
                'Pass errors to Form, with each key a field name. Field.Error shows the message for that field. The message goes away when the user changes the value.',
            Component: ServerErrors,
            source: serverErrorsSource,
        },
        {
            id: 'fieldset',
            title: 'Group fields with a fieldset',
            description:
                'Fieldset.Root draws a border around related fields. Fieldset.Legend is the title of the group. The fields go into two columns when the container is wide.',
            Component: FieldsetGroup,
            source: fieldsetGroupSource,
        },
    ],
    notes: [
        <>
            Give each <Snippet.Inline>{'Field.Root'}</Snippet.Inline> a <Snippet.Inline>{'name'}</Snippet.Inline>. It is
            the key in the submitted values and in <Snippet.Inline>{'errors'}</Snippet.Inline>.
        </>,
        <>
            Fields validate on submit, then again on each change. Set{' '}
            <Snippet.Inline>{'validationMode'}</Snippet.Inline> to validate earlier.
        </>,
        <>
            Group related fields in a <Snippet.Inline>{'Fieldset'}</Snippet.Inline>. Set{' '}
            <Snippet.Inline>{'disabled'}</Snippet.Inline> on it to disable them all.
        </>,
    ],
    props: [
        {
            component: 'Fieldset.Footer',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description:
                        'Helper text or actions below the fields. The footer renders a div with a top divider.',
                },
            ],
        },
        {
            component: 'Fieldset.Legend',
            rows: [
                {
                    name: 'render',
                    type: 'ReactElement | function',
                    defaultValue: '<legend />',
                    description: 'Renders a native legend element. Base UI renders a div.',
                },
            ],
        },
    ],
}
