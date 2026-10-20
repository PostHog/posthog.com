import React, { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconCheck, IconCheckCircle, IconComment, IconPullRequest } from '@posthog/icons'
import { cn } from '../../../../utils'
import { useEventClock } from '../timeline'
import { ScrollToLatest } from '../Query/AgentWindow'
import { STEP_GRID, STEP_TEXT } from '../stepLayout'
import {
    CHECKS_SHOWN_AT,
    CheckChart,
    CheckList,
    ENTER,
    InlineTitle,
    LOOP_BOUNDARIES,
    LOOP_FADE_OUT_AT,
    LOOP_MS,
    MERGE_BOX_SHOWN_AT,
    MERGE_BOX_EXIT_MS,
    MERGED_EVENT_AT,
    MERGE_SETTLED_AT,
    MERGED_AT,
    MergeBox,
    PR,
    PR_OPENED_AT,
    PostHogAvatar,
    REPORT_NUMBER,
    RESOLVED_AT,
    RESTING_MOMENT,
    SOAK_AT,
    StatusPill,
    UserAvatar,
} from './loop'

const MERGE_COMMIT = '3f9a1c2'

const PR_TABS = [
    { label: 'Conversation', count: 3, active: true },
    { label: 'Commits', count: 1, active: false },
    { label: 'Files changed', count: 1, active: false },
]

const DIFFSTAT_BLOCKS = 5

const DiffStat = () => {
    const addedBlocks = Math.round((PR.additions / (PR.additions + PR.deletions)) * DIFFSTAT_BLOCKS)
    return (
        <span className="ml-auto flex shrink-0 items-center gap-1.5 py-2 font-semibold">
            <span className="text-green">+{PR.additions}</span>
            <span className="text-red">−{PR.deletions}</span>
            <span className="flex gap-px">
                {Array.from({ length: DIFFSTAT_BLOCKS }, (_, index) => (
                    <span
                        key={index}
                        className={cn(
                            'size-2 @3xl:size-2.5 rounded-[1px]',
                            index < addedBlocks ? 'bg-green' : 'bg-red'
                        )}
                    />
                ))}
            </span>
        </span>
    )
}

const PrHeader = ({ elapsed }: { elapsed: number }) => {
    const merged = elapsed >= MERGED_AT
    return (
        <div className="shrink-0 border-b border-primary bg-accent">
            <div className="flex items-start gap-2 px-4 pb-2 pt-3">
                <div className="min-w-0 flex-1">
                    <p className="m-0 text-sm @3xl:text-[17.5px] font-bold leading-snug">
                        <InlineTitle text={PR.title} /> <span className="font-normal text-secondary">#{PR.number}</span>
                    </p>
                    <p className="m-0 mt-0.5 flex flex-wrap items-center gap-1 text-xs @3xl:text-[15px] text-secondary">
                        <PostHogAvatar className="size-4 @3xl:size-5 [&_img]:w-2.5" />
                        <span className="font-semibold text-primary">PostHog</span>
                        {merged ? ' · merged into ' : ' wants to merge into '}
                        <code className="!border-0 !bg-primary !px-1 font-code">main</code>
                        {merged && ' by you'}
                    </p>
                </div>
                <StatusPill merged={merged} />
            </div>
            <div className="flex gap-3 overflow-hidden px-4 text-xs @3xl:text-[15px]">
                {PR_TABS.map(({ label, count, active }) => (
                    <span
                        key={label}
                        className={cn(
                            'flex shrink-0 items-center gap-1 border-b-2 py-2',
                            active ? 'border-[#F54E00] font-semibold text-primary' : 'border-transparent text-secondary'
                        )}
                    >
                        {label}
                        <span className="rounded-full bg-primary px-1.5 text-[10px] @3xl:text-[12.5px]">{count}</span>
                    </span>
                ))}
                <DiffStat />
            </div>
        </div>
    )
}

const RailItem = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
    <motion.div {...ENTER} className="relative flex gap-2.5 pb-3">
        <span className="relative z-10 flex size-6 @3xl:size-[30px] shrink-0 items-center justify-center rounded-full border border-primary bg-primary">
            {icon}
        </span>
        <div className="min-w-0 flex-1 pt-0.5">{children}</div>
    </motion.div>
)

const PullRequestConversation = ({ elapsed }: { elapsed: number }) => {
    const mergeSettled = elapsed >= MERGE_SETTLED_AT
    return (
        <div className="flex h-[clamp(26rem,62cqw,44rem)] flex-col overflow-hidden rounded-lg border border-primary bg-primary shadow-xl">
            <PrHeader elapsed={elapsed} />
            <motion.div
                className="flex min-h-0 flex-1 flex-col"
                initial={false}
                animate={{ opacity: elapsed >= LOOP_FADE_OUT_AT ? 0 : 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <ScrollToLatest className="px-4 pt-3">
                    <div className="relative">
                        <span className="absolute bottom-3 left-3 top-3 border-l border-primary" aria-hidden="true" />
                        {elapsed >= PR_OPENED_AT && (
                            <RailItem icon={<PostHogAvatar className="size-6 @3xl:size-[30px] border-0" />}>
                                <div className="overflow-hidden rounded-md border border-primary">
                                    <p className="m-0 border-b border-primary bg-accent px-2.5 py-1 text-xs @3xl:text-[15px]">
                                        <span className="font-semibold">PostHog</span> opened this from Inbox report #
                                        {REPORT_NUMBER}
                                    </p>
                                    <p className="m-0 px-2.5 py-2 text-xs @3xl:text-[15px]">
                                        <code className="font-code">plan</code> is undefined when checkout loads before
                                        pricing, so Pro upgrades throw. Adds a guard and a test.
                                    </p>
                                </div>
                            </RailItem>
                        )}
                        {elapsed >= CHECKS_SHOWN_AT && (
                            <RailItem icon={<IconCheckCircle className="size-3.5 @3xl:size-[17.5px] text-green" />}>
                                <CheckList elapsed={elapsed} />
                            </RailItem>
                        )}
                        {elapsed >= MERGED_EVENT_AT && (
                            <RailItem icon={<IconPullRequest className="size-3.5 @3xl:size-[17.5px] text-purple" />}>
                                <p className="m-0 flex items-center gap-1.5 text-xs @3xl:text-[15px] text-secondary">
                                    <UserAvatar className="size-4 @3xl:size-5" />
                                    <span className="font-semibold text-primary">You</span> merged commit{' '}
                                    <code className="font-code">{MERGE_COMMIT}</code> into main
                                </p>
                            </RailItem>
                        )}
                        {elapsed >= SOAK_AT && (
                            <RailItem icon={<IconComment className="size-3.5 @3xl:size-[17.5px] text-secondary" />}>
                                <p className="m-0 mb-1.5 text-xs @3xl:text-[15px] text-secondary">
                                    <span className="font-semibold text-primary">PostHog</span> commented 1 week later
                                </p>
                                <CheckChart elapsed={elapsed} />
                            </RailItem>
                        )}
                        {elapsed >= RESOLVED_AT && (
                            <RailItem icon={<IconCheck className="size-3.5 @3xl:size-[17.5px] text-green" />}>
                                <p className="m-0 text-xs @3xl:text-[15px] text-secondary">
                                    <span className="font-semibold text-primary">PostHog</span> resolved Inbox report #
                                    {REPORT_NUMBER}
                                </p>
                            </RailItem>
                        )}
                    </div>
                    <AnimatePresence initial={false}>
                        {!mergeSettled && elapsed >= MERGE_BOX_SHOWN_AT && (
                            <motion.div
                                key="merge-box"
                                {...ENTER}
                                exit={{
                                    ...ENTER.exit,
                                    transition: { duration: MERGE_BOX_EXIT_MS / 1000, ease: 'easeIn' },
                                }}
                                className="pb-3"
                            >
                                <MergeBox elapsed={elapsed} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ScrollToLatest>
            </motion.div>
        </div>
    )
}

export default function SelfDriveStep({
    index,
    title,
    description,
}: {
    index: number
    title: string
    description: React.ReactNode
}): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const elapsed = useEventClock(containerRef, {
        loopMs: LOOP_MS,
        boundaries: LOOP_BOUNDARIES,
        restingMs: RESTING_MOMENT,
    })

    return (
        <div className="@container mt-16">
            <div ref={containerRef} className={STEP_GRID}>
                <div className={STEP_TEXT}>
                    <h3 className="!mt-0">
                        {index + 1}. {title}
                    </h3>
                    <p>{description}</p>
                </div>
                <div className="not-prose @container w-full" aria-hidden="true">
                    <PullRequestConversation elapsed={elapsed} />
                </div>
            </div>
        </div>
    )
}
