import React, { useState } from 'react'
import { Button } from 'components/UI/Button'
import { Chip } from 'components/UI/Chip'

const initialTags = ['Product analytics', 'Session replay', 'Feature flags']

export default function ChipRemovable(): JSX.Element {
    const [tags, setTags] = useState(initialTags)

    const removeTag = (tag: string) => setTags((current) => current.filter((item) => item !== tag))

    return (
        <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
                <Chip key={tag} onRemove={() => removeTag(tag)}>
                    {tag}
                </Chip>
            ))}
            {tags.length === 0 && (
                <Button size="sm" onClick={() => setTags(initialTags)}>
                    Reset chips
                </Button>
            )}
        </div>
    )
}
