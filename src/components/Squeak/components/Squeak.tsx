import React, { useRef } from 'react'
import root from 'react-shadow/styled-components'

import { Questions } from './Questions'
import { Theme } from './Theme'

type SqueakProps = {
    slug?: string
    limit?: number
    onSubmit: () => void
    onLoad: () => void
    topics?: boolean
    onSignUp: (() => any) | (() => Promise<any>)
    topicId?: number
    profileLink?: (profile: any) => string
}

export const Squeak = ({ slug, limit, onSubmit, onLoad, topics = true, onSignUp, topicId }: SqueakProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const currentSlug = topicId
        ? undefined
        : slug || typeof window !== 'undefined'
        ? window.location.pathname
        : undefined

    return (
        <root.div ref={containerRef}>
            <Theme containerRef={containerRef} />
            <div className="squeak">
                <Questions
                    onSignUp={onSignUp}
                    onLoad={onLoad}
                    topics={topics}
                    onSubmit={onSubmit}
                    limit={limit}
                    slug={currentSlug}
                    topicId={topicId}
                />
            </div>
        </root.div>
    )
}
