import React from 'react'
import Link from 'components/Link'

const PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g

/**
 * Renders the Markdown links inside a frontmatter string.
 *
 * Frontmatter is plain YAML, so a value like an infobox row cannot hold JSX. This keeps
 * those values linkable without a second content format.
 */
export default function MdxLinks({ text }: { text: string }): JSX.Element {
    const parts: React.ReactNode[] = []
    let cursor = 0
    let match: RegExpExecArray | null

    PATTERN.lastIndex = 0
    while ((match = PATTERN.exec(text)) !== null) {
        if (match.index > cursor) {
            parts.push(text.slice(cursor, match.index))
        }
        const [, label, url] = match
        parts.push(
            <Link
                key={`${url}-${match.index}`}
                to={url}
                externalNoIcon
                className={url.startsWith('http') ? 'hp-external' : undefined}
            >
                {label}
            </Link>
        )
        cursor = match.index + match[0].length
    }
    if (cursor < text.length) {
        parts.push(text.slice(cursor))
    }

    return <>{parts}</>
}
