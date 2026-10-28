import React from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'
import type { RoughAnnotationProps } from 'components/UI/RoughAnnotation'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const markColor = 'tangerine' as const

const marks: Omit<RoughAnnotationProps, 'children'>[] = [
    { type: 'underline', color: markColor },
    { type: 'box', color: markColor, padding: 4 },
    { type: 'circle', color: markColor, padding: 6 },
    { type: 'highlight', color: 'yellow' },
    { type: 'strike-through', color: markColor },
    { type: 'crossed-off', color: markColor },
    { type: 'bracket', color: markColor, brackets: ['left', 'right'], padding: 4 },
]

export default function Types(): JSX.Element {
    return (
        <DemoRows className="text-body-lg">
            {marks.map((mark) => (
                <DemoRow key={mark.type} label={mark.type}>
                    <RoughAnnotation {...mark}>Insights</RoughAnnotation>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
