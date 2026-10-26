import React from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'
import type { RoughAnnotationProps } from 'components/UI/RoughAnnotation'

const markColor = 'var(--mark-color)'
const highlightColor = 'rgba(247, 165, 1, 0.35)'

const marks: Omit<RoughAnnotationProps, 'children'>[] = [
    { type: 'underline', color: markColor },
    { type: 'box', color: markColor, padding: 4 },
    { type: 'circle', color: markColor, padding: 6 },
    { type: 'highlight', color: highlightColor },
    { type: 'strike-through', color: markColor },
    { type: 'crossed-off', color: markColor },
    { type: 'bracket', color: markColor, brackets: ['left', 'right'], padding: 4 },
]

export default function Types(): JSX.Element {
    return (
        <ul className="m-0 grid list-none gap-x-8 gap-y-5 p-0 text-lg [--mark-color:theme(colors.red)] @md:grid-cols-2 dark:[--mark-color:theme(colors.yellow)]">
            {marks.map((mark) => (
                <li key={mark.type} className="flex items-baseline gap-4">
                    <span className="w-28 shrink-0 font-code text-sm text-secondary">{mark.type}</span>
                    <RoughAnnotation {...mark}>Insights</RoughAnnotation>
                </li>
            ))}
        </ul>
    )
}
