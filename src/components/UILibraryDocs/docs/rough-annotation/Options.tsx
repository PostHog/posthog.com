import React from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'

const rows = [
    { label: 'strokeWidth={1}', props: { strokeWidth: 1 } },
    { label: 'strokeWidth={4}', props: { strokeWidth: 4 } },
    { label: 'iterations={1}', props: { iterations: 1 } },
    { label: 'iterations={3}', props: { iterations: 3 } },
    { label: 'animationDuration={2000}', props: { animationDuration: 2000 } },
    { label: 'padding={[2, 10]}', props: { padding: [2, 10] as [number, number] } },
]

export default function Options(): JSX.Element {
    return (
        <ul className="m-0 flex list-none flex-col gap-5 p-0 text-lg">
            {rows.map(({ label, props }) => (
                <li key={label} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="w-56 shrink-0 font-code text-sm text-secondary">{label}</span>
                    <span className="text-red dark:text-yellow">
                        <RoughAnnotation type="box" {...props}>
                            Session replay
                        </RoughAnnotation>
                    </span>
                </li>
            ))}
        </ul>
    )
}
