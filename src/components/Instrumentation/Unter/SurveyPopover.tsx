import React, { useEffect, useRef, useState } from 'react'

interface SurveyPopoverProps {
    onDismiss: () => void
}

const OPTIONS = [
    'My landlord',
    "Don't own the tools",
    'The neighbour (ongoing situation)',
    'Nothing. I was born for this',
]

/**
 * Styled like a PostHog survey. Opened by the footer's "Quick survey" badge rather
 * than on arrival, so it never covers the page you're trying to explore. The badge
 * is also what the survey's annotation points at, so that marker is always there.
 *
 * Not a Radix Dialog: this is a mock of someone else's survey widget, and a real one
 * doesn't trap focus or block the page behind it. It does need the two things a
 * keyboard user will reach for, though, which is Escape and a way in.
 */
export default function SurveyPopover({ onDismiss }: SurveyPopoverProps): JSX.Element {
    const [answered, setAnswered] = useState(false)
    const rootRef = useRef<HTMLDivElement | null>(null)

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
                        Thanks. The neighbour will never know you said that.
                    </p>
                    <button className="un-opt" onClick={onDismiss}>
                        Close
                    </button>
                </>
            ) : (
                <>
                    <p className="un-sq">Quick one: what nearly stopped you from cutting the hole?</p>
                    {OPTIONS.map((option) => (
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
