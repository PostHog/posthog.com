import React from 'react'
import OSButton from 'components/OSButton'

export default function LessonFooter({
    nextLabel,
    children,
}: {
    nextLabel: string
    children: React.ReactNode
}): JSX.Element {
    return (
        <footer className="not-prose mt-10" aria-label="Lesson resources and next lesson">
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <OSButton variant="primary" size="md" disabled>
                    {nextLabel} →
                </OSButton>
                <span className="text-sm text-secondary">Coming soon</span>
            </div>
            <div className="text-sm leading-relaxed text-secondary [&_a]:underline [&_p]:m-0">
                <strong className="mb-2 block text-primary">Explore further</strong>
                {children}
            </div>
        </footer>
    )
}
