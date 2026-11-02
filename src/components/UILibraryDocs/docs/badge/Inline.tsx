import React from 'react'
import { Badge } from 'components/UI/Badge'

export default function BadgeInline(): JSX.Element {
    return (
        <div className="flex max-w-lg flex-col gap-4 text-primary">
            <h3 className="m-0 text-xl font-bold">
                Session replay{' '}
                <Badge size="inline" color="purple">
                    Beta
                </Badge>
            </h3>
            <p className="m-0 text-[15px] leading-relaxed">
                Mobile replay is{' '}
                <Badge size="inline" color="green" appearance="soft" href="/docs/session-replay/mobile">
                    New
                </Badge>{' '}
                and works with React Native, iOS, and Android. Web replay is{' '}
                <Badge size="inline" color="blue">
                    GA
                </Badge>
                .
            </p>
            <p className="m-0 text-xs leading-normal text-secondary">
                Small text with a{' '}
                <Badge size="inline" color="yellow">
                    Paid
                </Badge>{' '}
                badge.
            </p>
        </div>
    )
}
