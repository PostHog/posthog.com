import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'

export default function States(): JSX.Element {
    return (
        <div className="flex w-full max-w-md flex-col gap-3">
            <SearchInput aria-label="Search PostHog.com" placeholder="Search PostHog.com" shortcut={['meta', 'k']} />
            <SearchInput aria-label="Search docs" defaultValue="feature flags" loading />
            <SearchInput aria-label="Search archived events" defaultValue="$pageview" disabled />
            <SearchInput aria-label="Saved search" defaultValue="session replay" readOnly />
        </div>
    )
}
