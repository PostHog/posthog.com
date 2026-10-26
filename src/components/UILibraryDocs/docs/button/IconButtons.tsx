import React from 'react'
import { IconCopy, IconGear, IconPlus, IconShare, IconTrash } from '@posthog/icons'
import { IconButton } from 'components/UI/Button'

export default function IconButtons(): JSX.Element {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <IconButton key={size} aria-label={`Settings, ${size}`} icon={<IconGear />} size={size} />
            ))}
            <IconButton aria-label="Add" icon={<IconPlus />} appearance="raised" variant="primary" />
            <IconButton aria-label="Share" icon={<IconShare />} appearance="raised" />
            <IconButton aria-label="Delete" icon={<IconTrash />} appearance="raised" variant="primary" disabled />
            <IconButton aria-label="Copy event" icon={<IconCopy />} />
            <IconButton aria-label="Copy unavailable event" icon={<IconCopy />} disabled />
            <IconButton aria-label="Copy event in progress" icon={<IconCopy />} loading />
        </div>
    )
}
