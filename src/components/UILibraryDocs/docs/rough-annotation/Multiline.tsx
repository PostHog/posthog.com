import React from 'react'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'

export default function Multiline(): JSX.Element {
    return (
        <p className="m-0 max-w-sm text-lg leading-relaxed">
            "We replaced four tools with PostHog.{' '}
            <RoughAnnotation type="highlight" color="rgba(247, 165, 1, 0.35)" multiline>
                Now every team looks at the same numbers, from the same events, in the same place.
            </RoughAnnotation>
            "
        </p>
    )
}
