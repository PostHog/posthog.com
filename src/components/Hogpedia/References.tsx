import React from 'react'
import Link from 'components/Link'
import { useHogpediaArticle } from './context'

export type Reference = {
    id: string
    text: string
    url: string
}

/**
 * A footnote mark. `<Ref id="1" />` renders the reference's position in the list and jumps
 * to it. The number comes from the position, not the id, so a gap in the ids cannot make
 * the marker disagree with the numbered list below.
 */
export const Ref = ({ id }: { id: string | number }): JSX.Element | null => {
    const article = useHogpediaArticle()
    const position = (article?.referenceIds || []).indexOf(String(id)) + 1
    if (position === 0) {
        return null
    }
    return (
        <sup className="hp-ref" id={`cite-ref-${id}`}>
            [<a href={`#cite-note-${id}`}>{position}</a>]
        </sup>
    )
}

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
