import React, { useState } from 'react'
import { IconSearch } from '@posthog/icons'
import { EmptyState } from 'components/UI/EmptyState'
import { Button } from 'components/UI/Button'

export default function NoResults(): JSX.Element {
    const [reset, setReset] = useState(false)
    return (
        <EmptyState.Root outlined>
            <EmptyState.Icon>
                <IconSearch />
            </EmptyState.Icon>
            <EmptyState.Title>{reset ? 'Search cleared' : 'No results found'}</EmptyState.Title>
            <EmptyState.Description>
                {reset ? 'Enter a new search to find a team member.' : 'Try a different search or clear the filters.'}
            </EmptyState.Description>
            <EmptyState.Actions>
                <Button variant="secondary" onClick={() => setReset(true)}>
                    Reset filters
                </Button>
            </EmptyState.Actions>
        </EmptyState.Root>
    )
}
