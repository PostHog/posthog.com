import React from 'react'
import { Banner } from 'components/UI/Banner'
import type { StatusAlias } from 'components/UI/colors'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const banners: { tone: StatusAlias; title: string; body: string }[] = [
    { tone: 'neutral', title: 'Read-only project', body: 'Ask a project admin for access to change settings.' },
    { tone: 'info', title: 'New SDK version', body: 'posthog-js 1.200 adds faster feature flag loading.' },
    { tone: 'success', title: 'Export ready', body: 'Your CSV export of 12,408 events is ready to download.' },
    { tone: 'warning', title: 'Billing limit near', body: 'This project used 92% of its event limit this month.' },
    { tone: 'error', title: 'Ingestion delayed', body: 'Events from the last 20 minutes can appear late.' },
    { tone: 'brand', title: 'DevEx week', body: 'Every product ships something new this week.' },
]

export default function Tones(): JSX.Element {
    return (
        <DemoRows className="@md:items-start">
            {banners.map(({ tone, title, body }) => (
                <DemoRow key={tone} label={tone} fill>
                    <Banner.Root color={tone}>
                        <Banner.Icon />
                        <Banner.Title>{title}</Banner.Title>
                        <Banner.Content>{body}</Banner.Content>
                    </Banner.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
