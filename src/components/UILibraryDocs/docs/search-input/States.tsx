import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function States(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Shortcut">
                <SearchInput
                    aria-label="Search PostHog.com"
                    placeholder="Search PostHog.com"
                    shortcut={['meta', 'k']}
                    className="max-w-md"
                />
            </DemoRow>
            <DemoRow label="Loading">
                <SearchInput aria-label="Search docs" defaultValue="feature flags" loading className="max-w-md" />
            </DemoRow>
            <DemoRow label="Disabled">
                <SearchInput
                    aria-label="Search archived events"
                    defaultValue="$pageview"
                    disabled
                    className="max-w-md"
                />
            </DemoRow>
            <DemoRow label="Read-only">
                <SearchInput aria-label="Saved search" defaultValue="session replay" readOnly className="max-w-md" />
            </DemoRow>
        </DemoRows>
    )
}
