import React from 'react'

const TagPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`rounded-full border px-3 py-1 text-[13px] font-medium transition-colors ${
            active
                ? 'border-red bg-red text-white'
                : 'border-input text-secondary hover:border-primary hover:text-primary'
        }`}
    >
        {label}
    </button>
)

type TagFilterProps = {
    tags: string[]
    /** `null` means "All". */
    activeTag: string | null
    onChange: (tag: string | null) => void
}

/** Row of tag pills, with an "All" reset. Clicking the active tag clears it. */
export default function TagFilter({ tags, activeTag, onChange }: TagFilterProps): JSX.Element {
    return (
        <div className="my-4 flex flex-wrap gap-1.5">
            <TagPill label="All" active={!activeTag} onClick={() => onChange(null)} />
            {tags.map((tag) => (
                <TagPill
                    key={tag}
                    label={tag}
                    active={activeTag === tag}
                    onClick={() => onChange(activeTag === tag ? null : tag)}
                />
            ))}
        </div>
    )
}
