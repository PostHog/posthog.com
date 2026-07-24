import React from 'react'

const QUESTIONS: { q: string; a: string }[] = [
    {
        q: 'Will the hedgehogs pay me?',
        a: 'No. Payment is in karma and the occasional slug left as a tip, which you will not want.',
    },
    {
        q: 'Is 13cm really enough?',
        a: "It's the official spec. Big enough for any hedgehog, small enough that your dog stays a dog owner's problem.",
    },
    {
        q: 'What about my dog?',
        a: 'If your dog fits through a 13cm gap, that is not a dog. That is a hedgehog, and it already has an account.',
    },
    {
        q: 'Do badgers use the gaps?',
        a: 'Badgers make their own arrangements. They always have.',
    },
    {
        q: 'Can I close the gap in winter?',
        a: "You can. You won't. By December you'll be leaving out a saucer of water and checking the crossing counts before bed.",
    },
]

// Native details/summary on purpose: the overlay's autocapture annotation
// points at real <summary> elements, the same thing autocapture would log.
export default function Faq(): JSX.Element {
    return (
        <section className="sn-faq" data-snuffl-id="host-faq">
            <h2 className="sn-h2">Top questions from hosts</h2>
            {QUESTIONS.map(({ q, a }) => (
                <details key={q}>
                    <summary>{q}</summary>
                    <div className="sn-a">{a}</div>
                </details>
            ))}
        </section>
    )
}
