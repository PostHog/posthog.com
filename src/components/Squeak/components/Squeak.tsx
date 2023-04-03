import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'

import { Questions } from './Questions'
import { Theme } from './Theme'

type SqueakProps = {
    slug?: string
    limit?: number
    topicId?: number
}

export const Squeak = ({ slug, limit, topicId }: SqueakProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const currentSlug = topicId
        ? undefined
        : slug || typeof window !== 'undefined'
        ? window.location.pathname
        : undefined

    // TODO: Create hubspot contact on sign-up

    return (
        <root.div ref={containerRef}>
            <Theme containerRef={containerRef} />
            <div className="squeak">
                <Questions limit={limit} slug={currentSlug} topicId={topicId} />
            </div>
        </root.div>
    )
}
