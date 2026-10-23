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
            description: 'Hover over a time or focus it to see the exact local and UTC times.',
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
        'The native time element includes an ISO dateTime value. The library Tooltip shows the exact time.',
        'The server and the first client render show an absolute date in UTC. Relative text appears after mount.',
        'Times less than an hour from the current time update once per minute. The interval stops on unmount.',
        'Intl.RelativeTimeFormat uses numeric="auto". It can show words such as yesterday or tomorrow.',
        'Months use 30 days. Years use 365 days. These units show approximate elapsed time.',
        'Use an ISO string with a time zone or a numeric timestamp to avoid ambiguous date parsing.',
        'Invalid dates show Invalid date without a tooltip.',
        'The time accepts keyboard focus. A dotted underline appears only on hover.',
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
                { name: 'tabIndex', type: 'number', defaultValue: '0', description: 'Sets keyboard focus order.' },
            ],
        },
    ],
}
