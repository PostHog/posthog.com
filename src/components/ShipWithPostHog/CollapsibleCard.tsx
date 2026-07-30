import React, { useState } from 'react'
import { IconChevronRight } from '@posthog/icons'

interface CollapsibleCardProps {
    title: string
    icon?: React.ReactNode
    /** Right-aligned header content – a count, a summary line, an "Add" button. */
    meta?: React.ReactNode
    children: React.ReactNode
    defaultOpen?: boolean
    className?: string
}

/**
 * The bordered, collapsible panel the detail view is built from – Summary, CI checks,
 * Reviewers, Evidence.
 *
 * Hand-rolled rather than using `components/RadixUI/Accordion` for two reasons: that
 * component renders its items as one hairline-divided stack rather than separate
 * cards, and its trigger gives the whole row to the label with a plus/minus pinned
 * right, which leaves nowhere for the counts and controls these headers carry.
 */
export default function CollapsibleCard({
    title,
    icon,
    meta,
    children,
    defaultOpen = true,
    className = '',
}: CollapsibleCardProps): JSX.Element {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className={`rounded-md border border-primary bg-primary ${className}`}>
            <div className="flex items-center gap-2 px-3 py-2">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    className="group flex min-w-0 flex-1 items-center gap-1.5 text-left"
                >
                    <IconChevronRight
                        className={`size-4 shrink-0 text-secondary transition-transform ${open ? 'rotate-90' : ''}`}
                    />
                    {icon}
                    <span className="truncate text-sm font-semibold text-primary group-hover:underline">{title}</span>
                    {/* Fills the gap to the right-hand controls, as the app's panel headers do. */}
                    <span aria-hidden className="ml-1 h-px min-w-4 flex-1 bg-border" />
                </button>
                {meta && <div className="flex shrink-0 items-center gap-2 text-xs text-secondary">{meta}</div>}
            </div>
            {open && <div className="border-t border-primary px-3 py-3">{children}</div>}
        </div>
    )
}
