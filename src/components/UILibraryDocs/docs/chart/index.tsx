import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Line from './Line'
import lineSource from '!!../../rawSourceLoader!./Line.tsx?raw'
import Bar from './Bar'
import barSource from '!!../../rawSourceLoader!./Bar.tsx?raw'
import Sparklines from './Sparklines'
import sparklinesSource from '!!../../rawSourceLoader!./Sparklines.tsx?raw'
import Share from './Share'
import shareSource from '!!../../rawSourceLoader!./Share.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'chart',
    importPath: 'components/UI/Chart',
    importNames: ['LineChart', 'BarChart', 'Sparkline', 'PieChart', 'BarList'],
    sourcePath: 'src/components/UI/Chart',
    apiNote:
        'Charts come from @posthog/quill-charts, the PostHog app chart library. The library versions add the site colors and theme, so you do not pass a theme. Every other prop is the Quill chart prop.',
    examples: [
        {
            id: 'line',
            title: 'Line chart',
            description: 'One series per line. Hover to see the values for a point.',
            Component: Line,
            source: lineSource,
        },
        {
            id: 'bar',
            title: 'Bar chart',
            description: 'Compare values across categories.',
            Component: Bar,
            source: barSource,
        },
        {
            id: 'sparklines',
            title: 'Sparklines',
            description: 'A small trend line next to a number.',
            Component: Sparklines,
            source: sparklinesSource,
        },
        {
            id: 'share',
            title: 'Share of a total',
            description: 'PieChart and BarList show how a total splits into parts.',
            Component: Share,
            source: shareSource,
        },
    ],
    notes: [
        <>
            Give each chart a height, such as <Snippet.Inline>{'h-64'}</Snippet.Inline>. The chart fills its box.{' '}
            <Snippet.Inline>{'Sparkline'}</Snippet.Inline> takes a <Snippet.Inline>{'height'}</Snippet.Inline> prop
            instead (120px by default).
        </>,
        'Use a line chart for change over time, a bar chart to compare categories, and a BarList for a ranked share of a total. Use a pie chart only for a few parts of one whole.',
        <>
            Series colors come from the site palette in order. Pass <Snippet.Inline>{'color'}</Snippet.Inline> on a
            series only when a color must mean something specific.
        </>,
        <>
            For other charts and props, see the <Link to="https://quill-storybook.pages.dev">Quill Storybook</Link>.
        </>,
    ],
}
