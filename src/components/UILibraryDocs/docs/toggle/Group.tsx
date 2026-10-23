import React, { useState } from 'react'
import { Toggle, ToggleGroup } from 'components/UI/Toggle'
import type { ToggleVariant } from 'components/UI/Toggle'

function ViewSwitcher({ variant }: { variant: ToggleVariant }): JSX.Element {
    const [view, setView] = useState(['list'])

    return (
        <ToggleGroup
            variant={variant}
            value={view}
            onValueChange={(next) => {
                if (next.length > 0) {
                    setView(next)
                }
            }}
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
            {(['default', 'primary', 'secondary'] as const).map((variant) => (
                <div key={variant} className="flex flex-wrap items-center gap-3">
                    <code className="w-24 text-sm">{variant}</code>
                    <ViewSwitcher variant={variant} />
                    <ToggleGroup variant={variant} disabled defaultValue={['list']} aria-label="Unavailable view">
                        <Toggle value="list">List</Toggle>
                        <Toggle value="grid">Grid</Toggle>
                    </ToggleGroup>
                </div>
            ))}
        </div>
    )
}
