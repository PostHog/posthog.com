import React from 'react'

import usePostHog from '../../hooks/usePostHog'

import OSButton from 'components/OSButton'

import { useEntry } from './bookContext'

/** An aside with an optional button, kept subordinate to the chapter's own CTA. */
export default function Callout({
    to,
    label,
    title,
    children,
}: {
    /** Where the button goes. Omit for a callout with no action. */
    to?: string
    /** Button text. Ignored without `to`. */
    label?: string
    /** A bold first line, e.g. "Prerequisites" above a short list. */
    title?: string
    children: React.ReactNode
}): JSX.Element {
    const posthog = usePostHog()
    const entry = useEntry()?.entry
    const hasAction = Boolean(to && label)

    return (
        // Same box as a figure, so it reads as part of the book.
        <aside className="my-[0.8em] rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4">
            {/* A div, not a p, so the children can be a list. */}
            <div
                className={`m-0 text-[0.9em] leading-relaxed text-secondary [&>*:last-child]:mb-0 [&_ul]:my-1 ${
                    hasAction ? 'mb-3' : ''
                }`}
            >
                {title && <strong className="block text-primary">{title}</strong>}
                {children}
            </div>
            {hasAction && (
                <OSButton
                    asLink
                    to={to}
                    variant="secondary"
                    size="md"
                    onClick={() =>
                        posthog?.capture('pocket_guide_interaction', {
                            kind: 'callout_click',
                            guide: entry?.url,
                            destination: to,
                            placement: 'callout',
                        })
                    }
                >
                    {label}
                </OSButton>
            )}
        </aside>
    )
}
