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
        a: "If your dog fits through a 13cm gap, that is not your dog. That's a hedgehog.",
    },
    {
        q: 'Do badgers use the gaps?',
        a: 'Badgers make their own arrangements (they always have).',
    },
    {
        q: 'Can I close the gap in winter?',
        a: "Sure? But by December we bet you'll be leaving out a saucer of water and snacks.",
    },
]

// Native details/summary on purpose: the overlay's autocapture annotation
// points at real <summary> elements, the same thing autocapture would log.
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
