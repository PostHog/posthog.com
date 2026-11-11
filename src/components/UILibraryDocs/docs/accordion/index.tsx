import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import DisabledItem from './DisabledItem'
import disabledItemSource from '!!../../rawSourceLoader!./DisabledItem.tsx?raw'
import Multiple from './Multiple'
import multipleSource from '!!../../rawSourceLoader!./Multiple.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'accordion',
    importPath: 'components/UI/Accordion',
    importNames: ['Accordion'],
    sourcePath: 'src/components/UI/Accordion',
    baseUi: [{ label: 'Base UI Accordion', url: 'https://base-ui.com/react/components/accordion' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'Use this for a list of sections, such as an FAQ. One item opens at a time by default. defaultValue sets the items that are open at first.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'multiple',
            title: 'Multiple open items',
            description:
                'Use multiple when the user compares the content of two or more items. Set multiple on Accordion.Root to let more than one item stay open.',
            Component: Multiple,
            source: multipleSource,
        },
        {
            id: 'disabled-item',
            title: 'Disabled item',
            description: 'Set disabled on an Accordion.Item to stop it from opening. Its trigger text is muted.',
            Component: DisabledItem,
            source: disabledItemSource,
        },
    ],
    notes: [
        <>
            For one region that you show or hide, such as advanced options, use{' '}
            <Link to="/components/ui/collapsible">Collapsible</Link>.
        </>,
        <>
            <Snippet.Inline>{'Accordion.Header'}</Snippet.Inline> renders an <Snippet.Inline>{'<h3>'}</Snippet.Inline>.
            Pass <Snippet.Inline>{'render={<h2 />}'}</Snippet.Inline> when the page outline needs another level.
        </>,
    ],
}
