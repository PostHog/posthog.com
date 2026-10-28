import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import WithSeparator from './WithSeparator'
import withSeparatorSource from '!!../../rawSourceLoader!./WithSeparator.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'otp-field',
    importPath: 'components/UI/OTPField',
    importNames: ['OTPField'],
    sourcePath: 'src/components/UI/OTPField',
    baseUi: [{ label: 'Base UI OTP Field', url: 'https://base-ui.com/react/components/otp-field' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'Root gets the length of the code. Each Input holds one character. Field.Label names the first input, and each other input has an aria-label.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'with-separator',
            title: 'With a separator',
            description: 'Put a Separator between inputs to show the code in groups.',
            Component: WithSeparator,
            source: withSeparatorSource,
        },
        {
            id: 'states',
            title: 'States',
            description:
                'Empty, filled, invalid, and disabled, in both appearances. Hover and focus the fields to see those states.',
            Component: AppearanceStates,
            source: appearanceStatesSource,
        },
    ],
    notes: [
        <>
            Set <Snippet.Inline>{'length'}</Snippet.Inline> to the number of inputs.
        </>,
        <>
            Label the first input with <Snippet.Inline>{'Field.Label'}</Snippet.Inline>. Give each other input an{' '}
            <Snippet.Inline>{'aria-label'}</Snippet.Inline>, such as &quot;Character 2 of 6&quot;.
        </>,
    ],
    props: [
        {
            component: 'OTPField.Root',
            rows: [
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description: 'Sets the shape of every input. Line shows each character slot as a bottom line.',
                },
            ],
        },
    ],
}
