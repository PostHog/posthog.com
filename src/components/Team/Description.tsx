import React from 'react'

export default function Description({
    description,
    tagline,
    handleChange,
    values,
    editing,
}: {
    description: string
    tagline?: string
    handleChange: (e: React.ChangeEvent<any>) => void
    values: any
    editing: boolean
}): JSX.Element | null {
    return editing ? (
        <div className="space-y-2">
            <textarea
                rows={5}
                name="description"
                onChange={handleChange}
                placeholder="Description"
                value={values.description}
                className="w-full p-2 text-[15px] rounded-md bg-white dark:bg-accent-dark border border-input resize-none"
            />
            <textarea
                rows={2}
                name="tagline"
                onChange={handleChange}
                placeholder="Tagline"
                value={values.tagline}
                className="w-full p-2 text-[15px] rounded-md bg-white dark:bg-accent-dark border border-input resize-none"
            />
        </div>
    ) : (description || tagline) ? (
        <div className="space-y-2">
            {tagline && (
                <p className="my-2 md:mb-4 text-[15px] text-secondary"><em>{tagline}</em></p>
            )}
            {description && (
                <p className="my-2 md:mb-4 text-[15px]" dangerouslySetInnerHTML={{ __html: description }} />
            )}
        </div>
    ) : null
}
