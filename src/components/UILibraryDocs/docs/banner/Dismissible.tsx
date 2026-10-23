import React, { useState } from 'react'
import { Banner } from 'components/UI/Banner'
import { Button } from 'components/UI/Button'

export default function Dismissible(): JSX.Element {
    const [dismissed, setDismissed] = useState(false)
    return dismissed ? (
        <Button onClick={() => setDismissed(false)}>Show notice</Button>
    ) : (
        <div className="flex flex-col gap-3">
            <Banner.Root tone="warning">
                <Banner.Icon />
                <Banner.Title>Scheduled maintenance</Banner.Title>
                <Banner.Content>
                    Ingestion pauses for 10 minutes at 00:00 UTC on Sunday. No events are lost.
                </Banner.Content>
                <Banner.Close onDismiss={() => setDismissed(true)} />
            </Banner.Root>
            <Banner.Root tone="brand">
                <Banner.Icon />
                <Banner.Content>PostHog AI can now write SQL insights for you.</Banner.Content>
                <Banner.Close onDismiss={() => setDismissed(true)} />
            </Banner.Root>
        </div>
    )
}
