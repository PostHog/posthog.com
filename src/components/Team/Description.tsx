import React from 'react'

export default function Description({
    description,
    handleChange,
    values,
    editing,
}: {
    description: string
    handleChange: (e: React.ChangeEvent<any>) => void
    values: any
    editing: boolean
}): JSX.Element | null {
    return editing ? (
        <textarea
            rows={5}
            name="description"
            onChange={handleChange}
            placeholder="Description"
            value={values.description}
            className="w-full p-2 text-[15px] rounded-md bg-white dark:bg-accent-dark border border-border dark:border-dark mb-2 resize-none"
        />
    ) : description ? (
        <p className="my-2 md:mb-4 text-[15px]" dangerouslySetInnerHTML={{ __html: description }} />
    ) : null
}
