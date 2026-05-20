import React from 'react'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { BrowseMode } from './types'

const browseModeOptions: ToggleOption[] = [
    { label: 'Task', value: 'task' },
    { label: 'Product', value: 'product' },
]

export default function SkillsBrowseHeader({
    browseMode,
    onBrowseModeChange,
}: {
    browseMode: BrowseMode
    onBrowseModeChange: (mode: BrowseMode) => void
}) {
    return (
        <div className="flex-shrink-0 border-b border-primary p-2">
            <ToggleGroup
                title="Browse by"
                hideTitle
                options={browseModeOptions}
                value={browseMode}
                onValueChange={(v) => onBrowseModeChange(v as BrowseMode)}
                className="w-full"
            />
        </div>
    )
}
