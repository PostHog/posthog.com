import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'
import type { FieldAppearance } from 'components/UI/styles'

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <SearchInput appearance={appearance} aria-label="Search members" placeholder="Search members" />
            <SearchInput appearance={appearance} aria-label="Search docs" defaultValue="feature flags" />
            <SearchInput appearance={appearance} aria-label="Search events" defaultValue="$pageview" aria-invalid />
            <SearchInput
                appearance={appearance}
                aria-label="Search archived events"
                defaultValue="$pageview"
                disabled
            />
        </div>
    )
}

export default function States(): JSX.Element {
    return (
        <div className="grid gap-8 @2xl:grid-cols-2">
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold">Inset (default)</span>
                <StateColumn appearance="inset" />
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold">Line</span>
                <StateColumn appearance="line" />
            </div>
        </div>
    )
}
