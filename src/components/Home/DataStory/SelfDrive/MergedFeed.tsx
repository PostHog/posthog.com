import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconPullRequest } from '@posthog/icons'
import { cn } from '../../../../utils'
import Emphasis from '../Emphasis'
import { IOS_SPRING, transform } from '../timeline'
import { repositoryLabel, titleSummary, timeAgo, useSelfDrivingFeed } from './useSelfDrivingFeed'

const VISIBLE_ROWS = 5
const SKELETON_TITLE_WIDTHS = ['w-4/5', 'w-3/5', 'w-11/12', 'w-2/3', 'w-3/4']

const SkeletonBar = ({ className }: { className: string }) => (
    <span className={cn('inline-block h-[0.75em] animate-pulse rounded bg-accent align-middle', className)} />
)

const RowNumber = ({ index }: { index: number }) => (
    <span className="w-5 shrink-0 pt-0.5 text-right font-code text-sm text-secondary tabular-nums">{index + 1}</span>
)

const SkeletonFeed = () => (
    <div className="not-prose grid gap-8 @2xl:grid-cols-12 @2xl:items-start" aria-hidden="true">
        <div className="@2xl:col-span-4">
            <p className="m-0 text-7xl font-bold leading-none">
                <SkeletonBar className="w-[2.2ch]" />
            </p>
            <p className="m-0 mt-3">
                <SkeletonBar className="w-full" />
                <SkeletonBar className="w-2/3" />
            </p>
        </div>
        <ol className="m-0 list-none divide-y divide-primary p-0 @2xl:col-span-8">
            {SKELETON_TITLE_WIDTHS.map((width, index) => (
                <li key={index} className="m-0 flex gap-4 py-3">
                    <RowNumber index={index} />
                    <span className="min-w-0 flex-1">
                        <span className="block text-lg leading-snug">
                            <SkeletonBar className={width} />
                        </span>
                        <span className="mt-0.5 block text-sm">
                            <SkeletonBar className="w-40" />
                        </span>
                    </span>
                </li>
            ))}
        </ol>
    </div>
)

const ARRIVE = {
    initial: { opacity: 0, transform: transform({ y: -10 }) },
    animate: { opacity: 1, transform: transform() },
    exit: { opacity: 0 },
    transition: IOS_SPRING,
}

export default function MergedFeed(): JSX.Element {
    const sectionRef = useRef<HTMLDivElement>(null)
    const {
        feed: { pullRequests, mergedLast7Days },
        loading,
        now,
    } = useSelfDrivingFeed(sectionRef)

    return (
        <div ref={sectionRef} className="@container mx-auto mt-24 max-w-[58rem]">
            <h3 className="!mt-0">Self-driving in PostHog, right now</h3>
            <p>
                We run PostHog on PostHog. These pull requests came from Inbox reports on our own product. PostHog wrote
                each one, and an engineer reviewed and merged it.
            </p>
            {loading ? (
                <SkeletonFeed />
            ) : pullRequests.length > 0 ? (
                <div className="not-prose grid gap-8 @2xl:grid-cols-12 @2xl:items-start">
                    <div className="@2xl:col-span-4">
                        <p className="m-0 text-7xl font-bold leading-none tracking-tight tabular-nums">
                            <Emphasis className="bg-blue/10 px-3 text-blue dark:bg-blue/20">
                                {mergedLast7Days ?? pullRequests.length}
                            </Emphasis>
                        </p>
                        <p className="m-0 mt-3 text-secondary">
                            pull requests that PostHog wrote and a person merged
                            {mergedLast7Days !== null ? ' in the last 7 days' : ''}
                        </p>
                    </div>
                    <ol className="m-0 list-none divide-y divide-primary p-0 @2xl:col-span-8">
                        <AnimatePresence initial={false}>
                            {pullRequests.slice(0, VISIBLE_ROWS).map((pullRequest, index) => {
                                const summary = titleSummary(pullRequest.title, pullRequest.number)
                                return (
                                    <motion.li key={pullRequest.url} layout="position" {...ARRIVE} className="m-0">
                                        <a
                                            href={pullRequest.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex gap-4 py-3 text-primary"
                                        >
                                            <RowNumber index={index} />
                                            <span className="min-w-0">
                                                <span className="block text-lg font-semibold leading-snug group-hover:underline">
                                                    {summary}
                                                </span>
                                                <span className="mt-0.5 flex items-center gap-1.5 text-sm text-secondary">
                                                    <IconPullRequest className="size-3.5 text-purple" />
                                                    {repositoryLabel(pullRequest.repository)} #{pullRequest.number}
                                                    <span aria-hidden="true">·</span>
                                                    {timeAgo(pullRequest.mergedAt, now)}
                                                </span>
                                            </span>
                                        </a>
                                    </motion.li>
                                )
                            })}
                        </AnimatePresence>
                    </ol>
                </div>
            ) : null}
        </div>
    )
}
