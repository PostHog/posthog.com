import React from 'react'
import Link from 'components/Link'
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
            Give each <code>Field.Root</code> a <code>name</code>. <code>Form</code> uses the name as the key in the
            values and in <code>errors</code>.
        </>,
        <>
            Inside a <code>Form</code>, a field validates when the user submits. After that, it validates again on each
            change. To validate earlier, set <code>validationMode</code> on <code>Form</code> or on{' '}
            <code>Field.Root</code>. See <Link to="/components/ui/field">Field</Link>.
        </>,
        <>
            <code>Fieldset.Legend</code> renders a native <code>{'<legend>'}</code>, so the browser cuts a gap in the
            border for it. The legend has a transparent background. This overrides the global{' '}
            <code>fieldset legend</code> style, so the legend also works on see-through windows.
        </>,
        <>
            Set <code>disabled</code> on <code>Fieldset.Root</code> to disable all the fields in it.
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
