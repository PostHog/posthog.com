import React from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'

export default function Sequence(): JSX.Element {
    return (
        <p className="m-0 text-2xl font-bold leading-relaxed [--mark-color:theme(colors.red)] dark:[--mark-color:theme(colors.yellow)]">
            <RoughAnnotation type="underline" color="var(--mark-color)">
                Capture
            </RoughAnnotation>
            ,{' '}
            <RoughAnnotation type="underline" color="var(--mark-color)" delay={600}>
                analyze
            </RoughAnnotation>
            , and{' '}
            <RoughAnnotation type="circle" color="var(--mark-color)" padding={6} delay={1200}>
                ship
            </RoughAnnotation>
            .
        </p>
    )
}
