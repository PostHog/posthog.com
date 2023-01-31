import { DocsPageSurvey } from 'components/DocsPageSurvey'
import React from 'react'
import { usePost } from './hooks'

export default function Survey(): JSX.Element | null {
    const { contentContainerClasses } = usePost()
    return (
        <div className="py-8 border-t border-gray-accent-light dark:border-gray-accent-dark border-dashed">
            <div className={contentContainerClasses}>
                <DocsPageSurvey />
            </div>
        </div>
    )
}
