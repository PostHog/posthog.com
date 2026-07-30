import React, { useEffect, useState } from 'react'

/**
 * Renders a JSON document fetched live from `src`, so docs can show a real published file
 * rather than a hand-copied sample that drifts from it.
 *
 * Fetches client-side on mount rather than at build time on purpose: the point is that a reader
 * sees what the URL serves *now*. A build-time copy would be the same stale snapshot the prose
 * example already was.
 *
 * Fetches only work for same-origin URLs, or cross-origin ones that send CORS headers. A metadata
 * document usually does not, which is why a failure renders as a plain link rather than an error:
 * the document being unreadable from a browser says nothing about whether it's valid.
 */

interface LiveJSONProps {
    /** URL to fetch. Same-origin, or somewhere that sends `Access-Control-Allow-Origin`. */
    src: string
    /** Optional caption above the block. Defaults to the URL itself. */
    label?: string
    /** Tailwind max-height class for the scroll area. */
    maxHeight?: string
}

export default function LiveJSON({ src, label, maxHeight = 'max-h-96' }: LiveJSONProps): JSX.Element {
    const [json, setJson] = useState<string | null>(null)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        let cancelled = false
        void (async () => {
            try {
                const response = await fetch(src)
                const parsed = await response.json()
                if (!cancelled) setJson(JSON.stringify(parsed, null, 2))
            } catch {
                if (!cancelled) setFailed(true)
            }
        })()
        return () => {
            cancelled = true
        }
    }, [src])

    return (
        <div className="my-4">
            <p className="text-sm mb-1 opacity-80">
                {label ? `${label} – ` : ''}
                <a href={src} target="_blank" rel="noreferrer">
                    <code className="text-[13px]">{src}</code>
                </a>
            </p>
            {json && (
                <pre className={`${maxHeight} overflow-auto text-[13px] mb-0`}>
                    <code>{json}</code>
                </pre>
            )}
            {!json && !failed && <p className="text-sm opacity-60 mb-0">Loading…</p>}
            {failed && <p className="text-sm opacity-60 mb-0">Couldn't read that from your browser – open the link.</p>}
        </div>
    )
}
