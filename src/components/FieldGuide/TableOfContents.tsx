import React from 'react'
import { TreeMenu } from 'components/TreeMenu'
import { ALL_SPECIES } from './speciesData'

const CORAL = '#E1554E'

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
        defaultOpen: true,
        children: ALL_SPECIES.map((s) => ({ name: s.name, url: s.route })),
    },
    { name: 'Closing note', url: '/field-guide/closing-note' },
]

export default function TableOfContents(): JSX.Element {
    return (
        <div className="fg-toc">
            <TreeMenu items={NAV} />
            <style>{`
                /* Coral hover to match the field guide's accent, overriding TreeMenu's grey tint */
                .fg-toc a:hover,
                .fg-toc button:hover {
                    background-color: rgba(225, 85, 78, 0.12) !important;
                    color: ${CORAL} !important;
                }
                .fg-toc a:hover [data-sidebar-label],
                .fg-toc a:hover svg,
                .fg-toc button:hover [data-sidebar-label],
                .fg-toc button:hover svg {
                    color: ${CORAL} !important;
                }
            `}</style>
        </div>
    )
}
