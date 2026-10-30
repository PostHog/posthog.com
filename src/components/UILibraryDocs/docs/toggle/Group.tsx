import React, { useState } from 'react'
import { Toggle, ToggleGroup } from 'components/UI/Toggle'
import type { ToggleAppearance, ToggleVariant } from 'components/UI/Toggle'

const looks = [
    { label: 'flat', appearance: 'flat', variant: 'secondary' },
    { label: 'raised primary', appearance: 'raised', variant: 'primary' },
    { label: 'raised secondary', appearance: 'raised', variant: 'secondary' },
] as const

function ViewSwitcher({ appearance, variant }: { appearance: ToggleAppearance; variant: ToggleVariant }): JSX.Element {
    const [view, setView] = useState(['list'])

    return (
        <ToggleGroup
            appearance={appearance}
            variant={variant}
            value={view}
            onValueChange={setView}
            required
            aria-label="View"
        >
            <Toggle value="list">List</Toggle>
            <Toggle value="grid">Grid</Toggle>
            <Toggle value="table" disabled>
                Table
            </Toggle>
        </ToggleGroup>
    )
}

export default function ToggleGroupExample(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {looks.map(({ label, appearance, variant }) => (
                <div key={label} className="flex flex-wrap items-center gap-3">
                    <span className="w-36 shrink-0 font-code text-caption text-secondary">{label}</span>
                    <ViewSwitcher appearance={appearance} variant={variant} />
                    <ToggleGroup
                        appearance={appearance}
                        variant={variant}
                        disabled
                        defaultValue={['list']}
                        aria-label="Unavailable view"
                    >
                        <Toggle value="list">List</Toggle>
                        <Toggle value="grid">Grid</Toggle>
                    </ToggleGroup>
                </div>
            ))}
        </div>
    )
}
