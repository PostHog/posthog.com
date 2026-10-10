import React from 'react'

const QUESTIONS: { q: string; a: string }[] = [
    {
        q: 'Will the hedgehogs pay me?',
        a: 'No (sorry). They have no money and no way to thank you.',
    },
    {
        q: 'Is 13cm really enough?',
        a: "It's the unofficial, official spec. Big enough for any hedgehog, small enough that it's not too noticeable.",
    },
    {
        q: 'What about my dog?',
        a: "If your dog fits through a 13cm gap, that's not your dog. That's a hedgehog.",
    },
    {
        q: 'Can I close the gap in winter?',
        a: "Sure? But by December we bet you'll be leaving out a saucer of water and snacks.",
    },
]

/* Native details/summary on purpose, and `cursor: pointer` in unter.css is what
   makes the autocapture annotation true: shouldCaptureDomEvent returns early for
   any element whose computed cursor is `pointer` on a click, before it ever checks
   the tag name. A <summary> isn't in autocaptureCompatibleElements, so without
   that style these rows would go uncaptured. */
export default function Faq(): JSX.Element {
    return (
        <section className="un-faq" data-unter-id="host-faq">
            <h2 className="un-h2">Top questions from hosts</h2>
            {QUESTIONS.map(({ q, a }) => (
                <details key={q}>
                    <summary>{q}</summary>
                    <div className="un-a">{a}</div>
                </details>
            ))}
        </section>
    )
}
