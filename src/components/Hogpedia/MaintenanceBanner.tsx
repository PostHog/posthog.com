import React from 'react'
import Link from 'components/Link'

/**
 * The boxed notices that sat above a 2007 article. Frontmatter turns them on with a
 * `notices` list, so a writer never has to hand-build one.
 *
 * Each notice links to the Hogpedia page that explains it, so no notice is a dead end.
 */
export type NoticeName = 'stub' | 'neutrality' | 'originalResearch' | 'lore' | 'tone' | 'citations'

type Notice = {
    icon: string
    severity: 'hp-notice-style' | 'hp-notice-content' | ''
    body: React.ReactNode
}

const NOTICES: Record<NoticeName, Notice> = {
    stub: {
        icon: '🌱',
        severity: 'hp-notice-style',
        body: (
            <>
                This article is a <b>stub</b>. You can help Hogpedia by{' '}
                <Link to="https://github.com/PostHog/posthog.com/tree/master/contents/hogpedia" externalNoIcon>
                    expanding it
                </Link>
                .
            </>
        ),
    },
    neutrality: {
        icon: '⚖️',
        severity: 'hp-notice-content',
        body: (
            <>
                <b>The neutrality of this article is disputed.</b> Relevant discussion may be found on the discussion
                page. Do not remove this message until the dispute is resolved.
            </>
        ),
    },
    originalResearch: {
        icon: '🔍',
        severity: 'hp-notice-content',
        body: (
            <>
                <b>This article may contain original research.</b> Statements consist of one person's recollection of a
                Slack thread. Please improve it by adding a source that is not a Slack thread.
            </>
        ),
    },
    lore: {
        icon: '🦔',
        severity: '',
        body: (
            <>
                <b>This article documents company lore.</b> It is written in the same register as the rest of Hogpedia,
                but the subject is an in-joke and not a product. For the products, see{' '}
                <Link to="/hogpedia/category/products">Category: Products</Link>.
            </>
        ),
    },
    tone: {
        icon: '✍️',
        severity: 'hp-notice-style',
        body: (
            <>
                <b>The tone of this article may be inappropriate.</b> It treats a trivial subject with total gravity.
                Editors have decided this is correct and closed the discussion.
            </>
        ),
    },
    citations: {
        icon: '📄',
        severity: 'hp-notice-style',
        body: (
            <>
                <b>This article needs additional citations.</b> Some claims rest on a single handbook page. See{' '}
                <Link to="/handbook">the PostHog Handbook</Link> for the primary source.
            </>
        ),
    },
}

export default function MaintenanceBanner({ notices }: { notices?: string[] }): JSX.Element | null {
    const valid = (notices || []).filter((name): name is NoticeName => name in NOTICES)
    if (valid.length === 0) {
        return null
    }

    return (
        <>
            {valid.map((name) => {
                const notice = NOTICES[name]
                return (
                    <div key={name} className={`hp-notice ${notice.severity}`} role="note">
                        <span className="hp-notice-icon" aria-hidden="true">
                            {notice.icon}
                        </span>
                        <span className="hp-notice-text">{notice.body}</span>
                    </div>
                )
            })}
        </>
    )
}
