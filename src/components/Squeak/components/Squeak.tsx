import React from 'react'
import { Questions } from './Questions'

type SqueakProps = {
    slug?: string
    limit?: number
    topicId?: number
}

export const Squeak = ({ slug, limit, topicId }: SqueakProps) => {
    const currentSlug = topicId
        ? undefined
        : slug || typeof window !== 'undefined'
        ? window.location.pathname
        : undefined

    // TODO: Create hubspot contact on sign-up

    return <Questions limit={limit} slug={currentSlug} topicId={topicId} />
}
