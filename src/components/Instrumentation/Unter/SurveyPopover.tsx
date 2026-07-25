import React, { useState } from 'react'

interface SurveyPopoverProps {
    onDismiss: () => void
}

const OPTIONS = [
    'My landlord',
    "Don't own a jigsaw",
    'The neighbour (ongoing situation)',
    'Nothing. I was born for this',
]

/**
 * Styled like a PostHog popover survey. Its own annotation says the real thing is
 * targeted to fire after `highway_signup_completed`, so that's exactly when this
 * one shows up rather than greeting you on arrival.
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
