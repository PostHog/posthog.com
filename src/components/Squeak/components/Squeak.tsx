import React from 'react'
import { Questions } from './Questions'
import { usePost } from 'components/PostLayout/hooks'

type SqueakProps = {
    slug?: string
    limit?: number
    topicId?: number
}

export const Squeak = ({ slug, limit, topicId }: SqueakProps) => {
    const { breadcrumb } = usePost()
    const parentName = (breadcrumb && breadcrumb?.length > 0 && breadcrumb[1]?.name) || undefined
    const currentSlug = topicId
        ? undefined
        : slug || typeof window !== 'undefined'
        ? window.location.pathname
        : undefined

    // TODO: Create hubspot contact on sign-up

    return <Questions parentName={parentName} limit={limit} slug={currentSlug} topicId={topicId} />
}
