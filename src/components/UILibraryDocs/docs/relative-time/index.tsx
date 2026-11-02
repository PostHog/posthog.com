import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Relative from './Relative'
import relativeSource from '!!../../rawSourceLoader!./Relative.tsx?raw'
import DateFormat from './DateFormat'
import dateFormatSource from '!!../../rawSourceLoader!./DateFormat.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'relative-time',
    importPath: 'components/UI/RelativeTime',
    importNames: ['RelativeTime'],
    sourcePath: 'src/components/UI/RelativeTime',
    apiNote: 'RelativeTime is a site component. It accepts native time element props, except children and dateTime.',
    examples: [
        {
            id: 'relative',
            title: 'Relative dates',
            description: 'Hover over a time, tap it, or press Enter on it to see the exact local and UTC times.',
            Component: Relative,
            source: relativeSource,
        },
        {
            id: 'date-format',
            title: 'Date format',
            description: 'Use format="date" to show an absolute date. The locale sets the date format.',
            Component: DateFormat,
            source: dateFormatSource,
        },
    ],
    notes: [
        'Pass an ISO string with a time zone, or a timestamp, so the date is not ambiguous.',
        'The first render shows an absolute date in UTC. The relative text appears after the page loads.',
        <>
            Set <Snippet.Inline>{'tooltip={false}'}</Snippet.Inline> where the exact time popup would get in the way.
        </>,
    ],
    props: [
        {
            component: 'RelativeTime',
            rows: [
                {
                    name: 'date',
                    type: 'Date | string | number',
                    description: 'The date to show. Required. Numbers are milliseconds since the Unix epoch.',
                },
                {
                    name: 'locale',
                    type: 'string',
                    defaultValue: "'en-US'",
                    description: 'Sets the locale for relative and absolute date formats.',
                },
                {
                    name: 'format',
                    type: "'relative' | 'date'",
                    defaultValue: "'relative'",
                    description: 'Selects relative text or an absolute UTC date.',
                },
                {
                    name: 'tooltip',
                    type: 'boolean',
                    defaultValue: 'true',
                    description:
                        'Shows the exact local and UTC time on hover, tap, or Enter. Set it to false to render plain text.',
                },
                { name: 'tabIndex', type: 'number', defaultValue: '0', description: 'Sets keyboard focus order.' },
            ],
        },
    ],
}
