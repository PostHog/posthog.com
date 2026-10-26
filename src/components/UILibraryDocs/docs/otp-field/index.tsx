import React from 'react'
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
            Put one <code>OTPField.Input</code> in <code>OTPField.Root</code> for each character, and set{' '}
            <code>length</code> to the same number.
        </>,
        <>
            Give each input after the first an <code>aria-label</code>, for example &quot;Character 2 of 6&quot;. The
            first input ignores <code>aria-label</code>. Label it with <code>Field.Label</code> or a{' '}
            <code>{'<label>'}</code>.
        </>,
        <>
            Put <code>OTPField.Separator</code> between inputs to show the code in groups.
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
