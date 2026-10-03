import React from 'react'

import { IconChevronDown, IconPlus } from '@posthog/icons'

/**
 * An input in miniature. `value` renders as filled text, `placeholder` as the app's muted
 * example; `select` adds the chevron that marks a dropdown rather than a free text field.
 */
export function Control({
    value,
    placeholder,
    select = false,
}: {
    value?: string
    placeholder?: string
    select?: boolean
}): JSX.Element {
    return (
        <div className="flex items-center justify-between gap-2 rounded border border-primary bg-primary px-2 py-1">
            <span className={`text-[0.75em] leading-snug ${value ? 'text-primary' : 'text-secondary opacity-70'}`}>
                {value ?? placeholder}
            </span>
            {select && <IconChevronDown className="size-3 shrink-0 text-secondary" aria-hidden="true" />}
        </div>
    )
}

/** The app's inline "add a condition" button, which is all these rows offer until one exists. */
export function AddButton({ label }: { label: string }): JSX.Element {
    return (
        <span className="inline-flex shrink-0 select-none items-center gap-1 rounded border border-primary px-1.5 py-0.5 text-[0.65em] font-semibold leading-none text-secondary">
            <IconPlus className="size-2.5" aria-hidden="true" />
            {label}
        </span>
    )
}
