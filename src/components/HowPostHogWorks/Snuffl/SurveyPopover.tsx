import React, { useState } from 'react'

const OPTIONS = [
    'My landlord',
    "Don't own a jigsaw",
    'The neighbour (ongoing situation)',
    'Nothing. I was born for this',
]

// Styled like a PostHog popover survey — the surveys annotation explains
// that the real thing ships zero code.
export default function SurveyPopover(): JSX.Element | null {
    const [answered, setAnswered] = useState(false)
    const [dismissed, setDismissed] = useState(false)

    if (dismissed) return null

    return (
        <div className="snuffl-root sn-survey-pop" data-snuffl-id="survey-pop">
            {answered ? (
                <>
                    <p className="sn-sq">Thanks. The neighbour will never know you said that.</p>
                    <button className="sn-opt" onClick={() => setDismissed(true)}>
                        Close
                    </button>
                </>
            ) : (
                <>
                    <p className="sn-sq">Quick one — what nearly stopped you from cutting the hole?</p>
                    {OPTIONS.map((option) => (
                        <button key={option} className="sn-opt" onClick={() => setAnswered(true)}>
                            {option}
                        </button>
                    ))}
                </>
            )}
            <div className="sn-powered">survey · posthog</div>
        </div>
    )
}
