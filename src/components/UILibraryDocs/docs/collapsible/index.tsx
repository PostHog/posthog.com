import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'collapsible',
    importPath: 'components/UI/Collapsible',
    importNames: ['Collapsible'],
    sourcePath: 'src/components/UI/Collapsible',
    baseUi: [{ label: 'Base UI Collapsible', url: 'https://base-ui.com/react/components/collapsible' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'Use this for one region that you show or hide, such as advanced options. Click the trigger to open and close the panel.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'controlled',
            title: 'Controlled',
            description:
                'Pass open and onOpenChange to keep the state in your component. Here, a button outside the collapsible also opens it.',
            Component: Controlled,
            source: controlledSource,
        },
    ],
    notes: [
        <>
            For a list of sections, such as an FAQ, use <Link to="/components/ui/accordion">Accordion</Link>.
        </>,
    ],
}
