import React from 'react'
import { IconSearch } from '@posthog/icons'
import { EmptyState } from 'components/UI/EmptyState'

export default function Small(): JSX.Element {
    return (
        <EmptyState.Root size="sm" outlined>
            <EmptyState.Icon>
                <IconSearch />
            </EmptyState.Icon>
            <EmptyState.Title>No team members</EmptyState.Title>
            <EmptyState.Description>Team members appear here after they join.</EmptyState.Description>
        </EmptyState.Root>
    )
}
