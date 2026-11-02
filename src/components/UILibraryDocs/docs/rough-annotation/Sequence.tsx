import React from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'

export default function Sequence(): JSX.Element {
    return (
        <p className="m-0 text-heading-lg font-bold">
            <RoughAnnotation type="underline" color="tangerine">
                Capture
            </RoughAnnotation>
            ,{' '}
            <RoughAnnotation type="underline" color="tangerine" delay={600}>
                analyze
            </RoughAnnotation>
            , and{' '}
            <RoughAnnotation type="circle" color="tangerine" padding={6} delay={1200}>
                ship
            </RoughAnnotation>
            .
        </p>
    )
}
