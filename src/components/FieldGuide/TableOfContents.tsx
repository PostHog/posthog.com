import React from 'react'
import { TreeMenu } from 'components/TreeMenu'
import { ALL_SPECIES } from './speciesData'

// Field-guide navigation, rendered with the same TreeMenu the docs/handbook
// sidebars use, so hover, spacing, icons, and the active state all match the site.
const NAV = [
    { name: 'The Field Guide' }, // section label
    { name: 'Contents', url: '/field-guide' },
    { name: 'Foreword', url: '/field-guide/foreword' },
    { name: 'How to use this guide', url: '/field-guide#how-to-use' },
    {
        name: 'The species',
        url: '/field-guide#the-species',
        children: ALL_SPECIES.map((s) => ({ name: s.name, url: s.route })),
    },
    { name: 'Closing note', url: '/field-guide/closing-note' },
]

export default function TableOfContents(): JSX.Element {
    return <TreeMenu items={NAV} />
}
