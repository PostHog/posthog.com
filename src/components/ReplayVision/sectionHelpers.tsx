import React from 'react'
import { IconPop } from 'components/Code/IconPop'

// Shared presentational helpers for the Replay Vision narrative sections
// ("The old way", "The PostHog way"). Mirrors the inline helpers used on the
// PostHog Code marketing page.

export function SectionLabel({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl mb-4">{children}</h2>
}

// Inline icon that sits in the text flow (e.g. the tombstone / logomark in a heading).
export function InlineIcon({
    icon: Icon,
    children,
    className = '',
}: {
    icon: React.ComponentType<{ className?: string }>
    children?: React.ReactNode
    className?: string
}) {
    return (
        <span className="inline-flex items-baseline gap-0.5 whitespace-nowrap">
            <IconPop>
                <Icon className={`size-7 inline-block align-middle relative top-1.5 ${className}`} />
            </IconPop>
            {children}
        </span>
    )
}

// Keyboard-key / badge styling (e.g. the "▶ Play" or "Merge ↵" chip).
export function KeyBadge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-sans font-medium align-middle mx-0.5 relative -top-0.5 bg-[#1d1f27] text-white dark:bg-white dark:text-[#1d1f27]">
            {children}
        </span>
    )
}
