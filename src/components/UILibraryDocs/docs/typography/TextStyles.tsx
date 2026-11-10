import React from 'react'

export default function TextStyles(): JSX.Element {
    return (
        <div className="flex max-w-[65ch] flex-col gap-3">
            <p className="m-0 text-15 text-primary">Primary is for content: body text, titles, and values.</p>
            <p className="m-0 text-sm text-secondary">Secondary is for supporting text, such as descriptions.</p>
            <p className="m-0 text-sm text-muted">
                Muted is for placeholders, disabled text, and quiet marks, such as separators and group labels.
            </p>
            <p className="m-0 text-sm font-semibold">
                Semibold is for titles, labels, and short phrases that must stand out.
            </p>
            <p className="m-0 text-sm font-bold">Bold is for headings and dialog titles.</p>
        </div>
    )
}
