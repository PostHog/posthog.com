import React from 'react'
import { Questions } from './Questions'
import { usePost } from 'components/PostLayout/hooks'

type SqueakProps = {
    slug?: string
    limit?: number
    topicId?: number
    parentName?: string
}

export const Squeak = ({ slug, limit, topicId, parentName: parentNameProp }: SqueakProps) => {
    let breadcrumb
    let parentNameFromContext
    try {
        const postContext = usePost()
        breadcrumb = postContext?.breadcrumb
        parentNameFromContext = (breadcrumb && breadcrumb?.length > 0 && breadcrumb[1]?.name) || undefined
    } catch (error) {
        console.error('🔍 DEBUG Squeak: usePost() error =', error)
    }
    const parentName = parentNameProp || parentNameFromContext
    const currentSlug = topicId
        ? undefined
        : slug || typeof window !== 'undefined'
        ? window.location.pathname
        : undefined

    // TODO: Create hubspot contact on sign-up

    return <Questions parentName={parentName} limit={limit} slug={currentSlug} topicId={topicId} />
}
