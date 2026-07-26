import React, { useState } from 'react'

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
 */
export default function SurveyPopover({ onDismiss }: SurveyPopoverProps): JSX.Element {
    const [answered, setAnswered] = useState(false)

    return (
        <div className="unter-root un-survey-pop" data-unter-id="survey-pop">
            {answered ? (
                <>
                    <p className="un-sq">Thanks. The neighbour will never know you said that.</p>
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
