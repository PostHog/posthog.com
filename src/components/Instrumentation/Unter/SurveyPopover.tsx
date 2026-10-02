import React, { useEffect, useRef, useState } from 'react'
import { UnterPageId } from '../overlay/types'

interface SurveyPopoverProps {
    /** Which page's badge opened it: the survey copy is page-specific. */
    page: UnterPageId
    onDismiss: () => void
}

interface Survey {
    question: string
    options: string[]
    thanks: string
}

/**
 * One survey per page, so the question fits what the visitor is doing there. Keep
 * these in step with each page's survey annotation, whose DATA table lists these
 * same options (highway.tsx / ride.tsx). RIDE_SURVEY doubles as the fallback, so
 * `page` never needs a non-null assertion.
 */
const RIDE_SURVEY: Survey = {
    question: 'Quick one: what would make Unter better?',
    options: ['Better route options', 'Slower is fine', 'Not enough gaps nearby'],
    thanks: 'Thanks. Passed to the routing team.',
}

const SURVEYS: Partial<Record<UnterPageId, Survey>> = {
    ride: RIDE_SURVEY,
    highway: {
        question: 'Quick one: what would stop you from cutting a hedgehog hole?',
        options: [
            'My landlord',
            "Don't own the tools",
            'The neighbour (ongoing situation)',
            'Nothing. I was born for this',
        ],
        thanks: 'Thanks. The neighbour will never know you said that.',
    },
}

/**
 * Styled like a PostHog survey. Opened by the footer's "Quick survey" badge rather
 * than on arrival, so it never covers the page you're trying to explore. The badge
 * is also what the survey's annotation points at, so that marker is always there.
 *
 * Not a Radix Dialog: this is a mock of someone else's survey widget, and a real one
 * doesn't trap focus or block the page behind it. It does need the two things a
 * keyboard user will reach for, though, which is Escape and a way in.
 */
export default function SurveyPopover({ page, onDismiss }: SurveyPopoverProps): JSX.Element {
    const [answered, setAnswered] = useState(false)
    const rootRef = useRef<HTMLDivElement | null>(null)
    const survey = SURVEYS[page] ?? RIDE_SURVEY

    // Focus moves in on open, so the options are the next thing you tab to rather
    // than something buried after the whole page.
    useEffect(() => {
        rootRef.current?.querySelector<HTMLElement>('button')?.focus()
    }, [])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onDismiss()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onDismiss])

    return (
        <div ref={rootRef} role="dialog" aria-label="Unter survey" className="unter-root un-survey-pop">
            {answered ? (
                <>
                    <p className="un-sq" role="status">
                        {survey.thanks}
                    </p>
                    <button className="un-opt" onClick={onDismiss}>
                        Close
                    </button>
                </>
            ) : (
                <>
                    <p className="un-sq">{survey.question}</p>
                    {survey.options.map((option) => (
                        <button key={option} className="un-opt" onClick={() => setAnswered(true)}>
                            {option}
                        </button>
                    ))}
                </>
            )}
            <button className="un-survey-close" onClick={onDismiss} aria-label="Dismiss survey">
                ✕
            </button>
            <div className="un-powered">survey · posthog</div>
        </div>
    )
}
