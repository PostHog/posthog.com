import React from 'react'
import { Questions } from './Questions'
import { usePost } from 'components/PostLayout/hooks'
import { useApp } from '../../../context/App'

type SqueakProps = {
    slug?: string
    limit?: number
    topicId?: number
}

export const Squeak = ({ slug, limit, topicId }: SqueakProps) => {
    const { breadcrumb } = usePost()
    const { location } = useApp()
    const parentName = (breadcrumb && breadcrumb?.length > 0 && breadcrumb[1]?.name) || undefined
    const currentSlug = topicId ? undefined : slug || location?.pathname || undefined

    return <Questions parentName={parentName} limit={limit} slug={currentSlug} topicId={topicId} />
}
