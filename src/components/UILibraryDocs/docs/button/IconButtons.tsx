import React from 'react'
import { IconCopy, IconGear, IconPlus, IconTrash } from '@posthog/icons'
import { IconButton } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function IconButtons(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Sizes">
                {(['sm', 'md', 'lg'] as const).map((size) => (
                    <IconButton key={size} aria-label={`Settings, ${size}`} icon={<IconGear />} size={size} />
                ))}
            </DemoRow>
            <DemoRow label="Variants">
                <IconButton aria-label="Copy" icon={<IconCopy />} />
                <IconButton aria-label="Add" icon={<IconPlus />} variant="primary" />
                <IconButton aria-label="Delete" icon={<IconTrash />} variant="danger" />
            </DemoRow>
            <DemoRow label="States">
                <IconButton aria-label="Copy unavailable" icon={<IconCopy />} disabled />
                <IconButton aria-label="Copy in progress" icon={<IconCopy />} loading />
            </DemoRow>
        </DemoRows>
    )
}
