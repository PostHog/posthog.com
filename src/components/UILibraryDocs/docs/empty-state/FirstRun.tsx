import React, { useState } from 'react'
import { IconPlus } from '@posthog/icons'
import { EmptyState } from 'components/UI/EmptyState'
import { Button } from 'components/UI/Button'

export default function FirstRun(): JSX.Element {
    const [created, setCreated] = useState(false)
    return (
        <EmptyState.Root>
            <EmptyState.Icon>
                <IconPlus />
            </EmptyState.Icon>
            <EmptyState.Title>{created ? 'Your first topic is ready' : 'Start a conversation'}</EmptyState.Title>
            <EmptyState.Description>
                {created ? 'This example confirms the action.' : 'Create the first topic for your team.'}
            </EmptyState.Description>
            <EmptyState.Actions>
                <Button variant="primary" onClick={() => setCreated(true)}>
                    Create topic
                </Button>
            </EmptyState.Actions>
        </EmptyState.Root>
    )
}
