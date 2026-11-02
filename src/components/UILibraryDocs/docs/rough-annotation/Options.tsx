import React from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const rows = [
    { label: 'strokeWidth={1}', props: { strokeWidth: 1 } },
    { label: 'strokeWidth={4}', props: { strokeWidth: 4 } },
    { label: 'iterations={1}', props: { iterations: 1 } },
    { label: 'iterations={3}', props: { iterations: 3 } },
    { label: 'padding={[4, 12]}', props: { padding: [4, 12] as [number, number] } },
]

export default function Options(): JSX.Element {
    return (
        <DemoRows className="text-body-lg @md:grid-cols-[11rem_minmax(0,1fr)]">
            {rows.map(({ label, props }) => (
                <DemoRow key={label} label={label}>
                    <span className="px-3 py-1">
                        <RoughAnnotation type="box" color="tangerine" padding={6} {...props}>
                            Session replay
                        </RoughAnnotation>
                    </span>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
