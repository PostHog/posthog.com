import React from 'react'
import Link from 'components/Link'

export type Reference = {
    id: string
    text: string
    url: string
}

/**
 * A footnote mark. `<Ref id="1" />` in an article renders `[1]` and jumps to the list.
 */
export const Ref = ({ id }: { id: string | number }): JSX.Element => (
    <sup className="hp-ref" id={`cite-ref-${id}`}>
        [<a href={`#cite-note-${id}`}>{id}</a>]
    </sup>
)

/**
 * The numbered reference list. Every entry needs a URL to a first-party PostHog source,
 * so a reader can always check the claim.
 */
export default function References({ references }: { references?: Reference[] }): JSX.Element | null {
    if (!references || references.length === 0) {
        return null
    }

    return (
        <ol className="hp-references">
            {references.map((reference) => (
                <li key={reference.id} id={`cite-note-${reference.id}`}>
                    <a href={`#cite-ref-${reference.id}`} className="hp-backlink" aria-label="Jump up">
                        ^
                    </a>
                    <Link
                        to={reference.url}
                        externalNoIcon
                        className={reference.url.startsWith('http') ? 'hp-external' : undefined}
                    >
                        {reference.text}
                    </Link>
                </li>
            ))}
        </ol>
    )
}
