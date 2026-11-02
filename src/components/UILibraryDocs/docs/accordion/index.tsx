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
                'One item opens at a time. defaultValue sets the items that are open when the accordion first shows.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'multiple',
            title: 'Multiple open items',
            description: 'Set multiple on Accordion.Root to let more than one item stay open.',
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
            Use Accordion for a set of related panels. For a single panel, use{' '}
            <Link to="/components/ui/collapsible">Collapsible</Link>.
        </>,
        <>
            <Snippet.Inline>{'Accordion.Header'}</Snippet.Inline> renders an <Snippet.Inline>{'<h3>'}</Snippet.Inline>.
            Pass <Snippet.Inline>{'render={<h2 />}'}</Snippet.Inline> when the page outline needs another level.
        </>,
    ],
}
