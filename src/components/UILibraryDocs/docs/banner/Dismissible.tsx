import React, { useState } from 'react'
import { Banner } from 'components/UI/Banner'
import { Button } from 'components/UI/Button'

type NoticeId = 'maintenance' | 'ai'

export default function Dismissible(): JSX.Element {
    const [dismissed, setDismissed] = useState<NoticeId[]>([])
    const dismiss = (id: NoticeId) => setDismissed((current) => [...current, id])
    return (
        <div className="flex flex-col items-start gap-3">
            {!dismissed.includes('maintenance') && (
                <Banner.Root color="warning">
                    <Banner.Icon />
                    <Banner.Title>Scheduled maintenance</Banner.Title>
                    <Banner.Content>
                        Ingestion pauses for 10 minutes at 00:00 UTC on Sunday. No events are lost.
                    </Banner.Content>
                    <Banner.Close onDismiss={() => dismiss('maintenance')} />
                </Banner.Root>
            )}
            {!dismissed.includes('ai') && (
                <Banner.Root color="brand">
                    <Banner.Icon />
                    <Banner.Content>PostHog AI can now write SQL insights for you.</Banner.Content>
                    <Banner.Close onDismiss={() => dismiss('ai')} />
                </Banner.Root>
            )}
            {dismissed.length > 0 && <Button onClick={() => setDismissed([])}>Show notices</Button>}
        </div>
    )
}
