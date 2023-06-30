import { DocsPageSurvey } from 'components/DocsPageSurvey'
import React from 'react'
import { usePost } from './hooks'

export default function Survey(): JSX.Element | null {
    const { contentContainerClasses } = usePost()
    return (
        <div className={contentContainerClasses}>
            <DocsPageSurvey />
        </div>
    )
}
