import React from 'react'
import { Skeleton } from 'components/UI/Skeleton'
import { Button } from 'components/UI/Button'
import { IconPerson } from '@posthog/icons'

export default function Examples(): JSX.Element {
    const [loading, setLoading] = React.useState(true)
    return (
        <div className="flex w-full max-w-sm flex-col gap-4">
            <Skeleton shape="text" width="60%" loading={loading}>
                <h3 className="m-0 text-base font-semibold">Weekly product report</h3>
            </Skeleton>
            <Skeleton shape="text" lines={3} loading={loading}>
                <p className="m-0 text-sm text-secondary">
                    Review your most used features, compare weekly active users, and find where people leave your signup
                    funnel.
                </p>
            </Skeleton>
            <Skeleton shape="rect" height={64} loading={loading}>
                <div className="flex min-h-16 flex-col justify-center rounded-md border border-[rgb(var(--text-primary)/0.14)] px-3">
                    <span className="text-sm text-secondary">Weekly active users</span>
                    <strong className="text-lg tabular-nums">2,418</strong>
                </div>
            </Skeleton>
            <Skeleton shape="circle" className="size-8" loading={loading}>
                <span
                    role="img"
                    aria-label="Report owner"
                    className="flex size-8 items-center justify-center rounded-full bg-[rgb(var(--text-primary)/0.08)]"
                >
                    <IconPerson className="size-5" />
                </span>
            </Skeleton>
            <Skeleton loading={loading}>
                <p className="m-0">Your insights are ready.</p>
            </Skeleton>
            <Button className="self-start" onClick={() => setLoading(!loading)}>
                Toggle content
            </Button>
        </div>
    )
}
