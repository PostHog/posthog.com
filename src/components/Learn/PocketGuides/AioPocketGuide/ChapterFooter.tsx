import React from 'react'
import { CTA } from '../UIButton'
import { Setup } from '../Action'
import LessonFooter from '../LessonFooter'

/** AIO's chapter handoff: next chapter, setup command, then reference links. */
export default function AioChapterFooter({
    nextLabel,
    nextHref,
    children,
}: {
    nextLabel?: string
    nextHref?: string
    children: React.ReactNode
}): JSX.Element {
    return (
        <div className="not-prose mt-10" aria-label="Chapter resources">
            {nextLabel && nextHref && (
                <CTA to={nextHref} external={false}>
                    {nextLabel} →
                </CTA>
            )}
            <Setup />
            <LessonFooter>{children}</LessonFooter>
        </div>
    )
}
