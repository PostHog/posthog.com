import React from 'react'
import { IconRewindPlay, IconGraph, IconDashboard } from '@posthog/icons'
import Link from 'components/shared/ui/Link'
import { InlineCode } from 'components/Products/ReaderViewProduct/helpers'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

interface WorksWithItem {
    name: string
    to: string
    Icon: React.ComponentType<{ className?: string }>
    color: string
    description: React.ReactNode
}

const items: WorksWithItem[] = [
    {
        name: 'Session Replay',
        to: '/session-replay',
        Icon: IconRewindPlay,
        color: 'text-yellow',
        description:
            "The recordings your scanners watch; point Replay Vision at any set of sessions you're already capturing.",
    },
    {
        name: 'Product Analytics',
        to: '/product-analytics',
        Icon: IconGraph,
        color: 'text-blue',
        description: (
            <>
                Every observation lands as a <InlineCode>$recording_observed</InlineCode> event, so you can trend and
                break down what scanners find like any other insight.
            </>
        ),
    },
    {
        name: 'Dashboards & Alerts',
        to: '/dashboards',
        Icon: IconDashboard,
        color: 'text-salmon',
        description:
            "Put frustration scores or dead-end counts on a dashboard, and get alerted when a scanner's output crosses a threshold.",
    },
]

const WorksWithSection = ({ id }: SectionComponentProps) => {
    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Works with other PostHog tools</h2>
            <p className="text-base text-secondary leading-relaxed m-0 mb-4">
                Use Replay Vision with these other PostHog apps to get more out of every session.
            </p>
            <ul className="list-none space-y-4 pl-0">
                {items.map(({ name, to, Icon, color, description }) => (
                    <li key={name}>
                        <Link to={to} state={{ newWindow: true }} className="flex items-center gap-2">
                            <span className={`inline-block size-6 ${color}`}>
                                <Icon />
                            </span>
                            <h3 className="!text-lg font-bold text-primary underline">{name}</h3>
                        </Link>
                        <p className="text-sm text-secondary m-0 pl-8">{description}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default WorksWithSection
