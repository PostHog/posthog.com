import React from 'react'

/**
 * `[citation needed]`. The one mark in Hogpedia that points nowhere, which is the joke.
 * Use it only for a lore claim that genuinely has no source.
 */
export default function CitationNeeded({ reason }: { reason?: string }): JSX.Element {
    return (
        <sup className="hp-citation-needed">
            <span title={reason ? `Reason: ${reason}` : 'This claim has no source.'}>[citation needed]</span>
        </sup>
    )
}
