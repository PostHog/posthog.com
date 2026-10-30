import React from 'react'
import { IconPerson } from '@posthog/icons'
import { Button } from 'components/UI/Button'
import { Card } from 'components/UI/Card'
import { Skeleton } from 'components/UI/Skeleton'

export default function Examples(): JSX.Element {
    const [loading, setLoading] = React.useState(true)
    return (
        <div className="flex flex-col items-start gap-4">
            <Button size="sm" onClick={() => setLoading(!loading)}>
                {loading ? 'Show content' : 'Show placeholders'}
            </Button>
            <Card.Root className="w-full max-w-lg" padding="md">
                <div className="flex items-center gap-3">
                    <Skeleton shape="circle" className="size-10 shrink-0" loading={loading}>
                        <span
                            role="img"
                            aria-label="Report owner"
                            className="flex size-10 items-center justify-center rounded-full bg-[rgb(var(--text-primary)/0.08)]"
                        >
                            <IconPerson className="size-5" />
                        </span>
                    </Skeleton>
                    <div className="flex min-w-0 flex-1 flex-col">
                        <Skeleton loading={loading}>
                            <span className="text-heading-sm">Weekly product report</span>
                        </Skeleton>
                        <Skeleton loading={loading}>
                            <span className="text-caption text-secondary">Max Hedgehog · Monday</span>
                        </Skeleton>
                    </div>
                </div>
                <Skeleton loading={loading} className="mt-4">
                    <p className="m-0 text-body text-secondary">
                        Weekly active users grew 12%. Most people leave the signup funnel at the plan step.
                    </p>
                </Skeleton>
                <Skeleton shape="rect" loading={loading} className="mt-4">
                    <div className="flex h-24 flex-col justify-center rounded-md border border-[rgb(var(--text-primary)/0.14)] px-3">
                        <span className="text-caption text-secondary">Weekly active users</span>
                        <strong className="text-heading-md tabular-nums">2,418</strong>
                    </div>
                </Skeleton>
            </Card.Root>
        </div>
    )
}
