import React from 'react'
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
            <code>Accordion.Trigger</code> adds a chevron before the label. The chevron turns down when the panel opens,
            the same as in <code>Collapsible</code>. Your <code>children</code> are the label only.
        </>,
        <>
            <code>Accordion.Header</code> renders an <code>{'<h3>'}</code>. To change the heading level, pass{' '}
            <code>{'render={<h2 />}'}</code>.
        </>,
        <>
            <code>Accordion.Panel</code> puts its children in a padded inner element, so the height animation does not
            jump. The first and last paragraphs in the panel have no outer margin.
        </>,
        <>A line separates the items. The accordion has no outer border.</>,
        <>
            Use <Link to="/components/ui/collapsible">Collapsible</Link> for one panel.
        </>,
    ],
}
